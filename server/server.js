// server.js — serves the Jancadoes static site and exposes /api/enhance,
// which runs the uploaded photo through OpenAI gpt-image-1 using the
// RAG prompt that matches the chosen mode (docs/rag.md).

const path = require('path');
const express = require('express');
const multer = require('multer');
const { promptFor, prompts } = require('./prompts');
const auth = require('./auth');

const ROOT = path.join(__dirname, '..');
const PORT = process.env.PORT || 8000;

// The API key lives in .env (see .env / docker-compose env_file).
const API_KEY =
  process.env.GPT_OPENAPI_API_KEY ||
  process.env.OPENAI_API_KEY ||
  '';

// gpt-image-1 output knobs — tune via env if desired.
const IMAGE_QUALITY = process.env.IMAGE_QUALITY || 'high';
const IMAGE_SIZE = process.env.IMAGE_SIZE || 'auto';
// input_fidelity=high keeps faces/detail faithful — a gpt-image-1-only knob,
// only sent for gpt-image-1 models (gpt-image-2 manages fidelity natively).
const INPUT_FIDELITY = process.env.INPUT_FIDELITY || 'high';

// Models — gpt-image-2 is OpenAI's latest image editor; gpt-5 (most capable
// current model) drives the `auto` mode picker. Both overridable via env.
const IMAGE_MODEL = process.env.IMAGE_MODEL || 'gpt-image-2';
const AUTO_MODEL = process.env.AUTO_MODEL || 'gpt-5';
// Reasoning effort for the auto-pick classifier — higher = more accurate.
const AUTO_REASONING = process.env.AUTO_REASONING || 'medium';

const app = express();
app.use(express.json({ limit: '256kb' })); // auth bodies are tiny

const MAX_UPLOAD = 25 * 1024 * 1024; // 25 MB

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_UPLOAD, files: 1 },
  // Reject anything that isn't an image before it reaches the handler.
  fileFilter: (_req, file, cb) => {
    if (/^image\//.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only image files are allowed (JPG, PNG, or WEBP).'));
  },
});

// Strip a client-supplied filename down to something safe to forward.
function safeName(name) {
  const base = path.basename(String(name || '')).replace(/[^\w.\-]/g, '_').slice(0, 80);
  return base || 'photo.png';
}

// ─── Static site ────────────────────────────────────────────────────
app.use(express.static(ROOT, { extensions: ['html'] }));
app.get('/', (_req, res) => res.sendFile(path.join(ROOT, 'jancadoes-ui.html')));

// Healthcheck — also reports whether the key + prompts are wired up.
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    keyConfigured: Boolean(API_KEY),
    modes: Object.keys(prompts()),
  });
});

// ─── Rate limiting — brute-force guard for the auth endpoints ────────
const RL_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RL_MAX = 12;                   // attempts per IP per window
const rlHits = new Map();            // ip -> { count, resetAt }

function rateLimit(req, res, next) {
  const now = Date.now();
  if (rlHits.size > 5000) {
    for (const [k, v] of rlHits) if (v.resetAt < now) rlHits.delete(k);
  }
  const ip = req.ip || (req.socket && req.socket.remoteAddress) || 'unknown';
  let rec = rlHits.get(ip);
  if (!rec || rec.resetAt < now) {
    rec = { count: 0, resetAt: now + RL_WINDOW_MS };
    rlHits.set(ip, rec);
  }
  rec.count += 1;
  if (rec.count > RL_MAX) {
    const retry = Math.ceil((rec.resetAt - now) / 1000);
    res.set('Retry-After', String(retry));
    return res.status(429).json({
      error: `Too many attempts — please wait ${Math.ceil(retry / 60)} minute(s) and try again.`,
    });
  }
  next();
}

// ─── Auth ────────────────────────────────────────────────────────────
app.post('/api/register', rateLimit, (req, res) => {
  try {
    res.json(auth.register(req.body || {}));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/login', rateLimit, (req, res) => {
  try {
    res.json(auth.login(req.body || {}));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/logout', (req, res) => {
  auth.logout(auth.tokenFromHeader(req));
  res.json({ ok: true });
});

app.get('/api/me', (req, res) => {
  res.json({ user: auth.userForToken(auth.tokenFromHeader(req)) });
});

// ─── Auto mode: ask a vision model which mode fits the photo ─────────
async function pickMode(buffer, mimeType) {
  const choices = Object.entries(prompts())
    .map(([id, p]) => `- ${id}: ${p.title}`)
    .join('\n');

  const body = {
    model: AUTO_MODEL,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text:
              'Pick the single best photo-enhancement mode for this image. ' +
              'Reply with JSON {"mode":"<id>"} only. Modes:\n' + choices,
          },
          {
            type: 'image_url',
            image_url: { url: `data:${mimeType};base64,${buffer.toString('base64')}` },
          },
        ],
      },
    ],
    response_format: { type: 'json_object' },
    reasoning_effort: AUTO_REASONING,
    max_completion_tokens: 3000,
  };

  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`Auto-pick failed (${r.status})`);
  const data = await r.json();
  const choice = data && data.choices && data.choices[0];
  let id = 'golden';
  try {
    id = JSON.parse(choice.message.content).mode;
  } catch (_) {
    /* malformed response — fall through to default */
  }
  return promptFor(id) ? id : 'golden';
}

// ─── Run the photo through gpt-image-1 with the RAG prompt ───────────
async function enhance(buffer, mimeType, filename, prompt) {
  const form = new FormData();
  form.append('model', IMAGE_MODEL);
  form.append('prompt', prompt);
  form.append('size', IMAGE_SIZE);
  form.append('quality', IMAGE_QUALITY);
  form.append('output_format', 'png'); // lossless result
  // input_fidelity is a gpt-image-1-only parameter — gpt-image-2 rejects it.
  if (IMAGE_MODEL === 'gpt-image-1' || IMAGE_MODEL === 'gpt-image-1-mini') {
    form.append('input_fidelity', INPUT_FIDELITY);
  }
  form.append('image', new Blob([buffer], { type: mimeType }), filename);

  const r = await fetch('https://api.openai.com/v1/images/edits', {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}` },
    body: form,
  });

  const data = await r.json();
  if (!r.ok) {
    const msg = data && data.error ? data.error.message : `OpenAI error (${r.status})`;
    throw new Error(msg);
  }
  const out = data && Array.isArray(data.data) && data.data[0];
  if (!out || !out.b64_json) throw new Error('OpenAI returned no image.');
  return out.b64_json;
}

// ─── Enhance endpoint ────────────────────────────────────────────────
app.post('/api/enhance', auth.requireAuth, upload.single('image'), async (req, res) => {
  const started = Date.now();
  try {
    if (!API_KEY) {
      return res.status(500).json({
        error: 'No API key configured. Set GPT_OPENAPI_API_KEY in .env.',
      });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded.' });
    }

    // `mode` is a multipart text field — coerce defensively before use.
    let modeId = String(req.body.mode || 'golden').trim().toLowerCase().slice(0, 32);
    const { buffer, mimetype, originalname } = req.file;

    if (modeId === 'auto') {
      modeId = await pickMode(buffer, mimetype);
    }

    const entry = promptFor(modeId);
    if (!entry) {
      return res.status(400).json({ error: 'Unknown enhancement mode.' });
    }

    const b64 = await enhance(buffer, mimetype, safeName(originalname), entry.prompt);

    res.json({
      image: `data:image/png;base64,${b64}`,
      mode: modeId,
      modeTitle: entry.title,
      ms: Date.now() - started,
    });
  } catch (err) {
    console.error('enhance error:', err.message);
    res.status(502).json({ error: err.message });
  }
});

// Friendlier multer errors (e.g. file too large).
app.use((err, _req, res, _next) => {
  res.status(400).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Jancadoes running on http://localhost:${PORT}`);
  console.log(`  API key: ${API_KEY ? 'configured' : 'MISSING — set GPT_OPENAPI_API_KEY'}`);
  console.log(`  models: ${IMAGE_MODEL} (enhance) · ${AUTO_MODEL} (auto-pick)`);
  console.log(`  image: quality=${IMAGE_QUALITY} · size=${IMAGE_SIZE}`);
  console.log(`  RAG modes: ${Object.keys(prompts()).join(', ')}`);
});
