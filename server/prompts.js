// prompts.js — turns docs/rag.md into the RAG enhancer prompt library.
// docs/rag.md is the single source of truth: the 7 numbered sections map,
// in order, to the 7 enhancement modes used by the UI.
//
// The file is re-parsed automatically whenever it changes on disk — edit
// docs/rag.md and the next request picks it up, no rebuild or restart.

const fs = require('fs');
const path = require('path');

const RAG_PATH = path.join(__dirname, '..', 'docs', 'rag.md');

// Section order in rag.md → mode id used by the frontend (see MODE_DATA).
const ORDER = [
  'studio', 'lighting', 'golden', 'restore', 'people', 'watermark', 'fourk',
  'rembrandt', 'cinematic', 'aesthetic', 'minimal',
];

function parse(raw) {
  // Each section: "## 1. TITLE\n\n<body…>" up to the next "## N." or EOF.
  const sections = [];
  const re = /##\s*\d+\.\s*(.+?)\n([\s\S]*?)(?=\n##\s*\d+\.|\n*$)/g;
  let m;
  while ((m = re.exec(raw)) !== null) {
    const title = m[1].trim();
    const body = m[2].replace(/-{3,}/g, '').trim();
    if (body) sections.push({ title, body });
  }

  // Null prototype: lookups like ['__proto__'] return undefined, not Object members.
  const byMode = Object.create(null);
  sections.forEach((s, i) => {
    const id = ORDER[i];
    if (id) byMode[id] = { title: s.title, prompt: s.body };
  });
  return byMode;
}

let cache = { mtimeMs: -1, prompts: Object.create(null) };

// Returns the current prompt library, re-parsing docs/rag.md if it changed.
function prompts() {
  let mtimeMs;
  try {
    mtimeMs = fs.statSync(RAG_PATH).mtimeMs;
  } catch (_) {
    return cache.prompts; // file missing — keep what we have
  }
  if (mtimeMs !== cache.mtimeMs) {
    try {
      const parsed = parse(fs.readFileSync(RAG_PATH, 'utf8'));
      cache = { mtimeMs, prompts: parsed };
      console.log(`Loaded ${Object.keys(parsed).length} RAG prompt(s) from docs/rag.md`);
    } catch (err) {
      console.error('rag.md reload failed, keeping previous prompts:', err.message);
      cache.mtimeMs = mtimeMs; // don't retry the same broken file every call
    }
  }
  return cache.prompts;
}

function promptFor(modeId) {
  const entry = prompts()[modeId];
  return entry && entry.prompt ? entry : null;
}

// Parse once at startup.
prompts();

module.exports = { promptFor, prompts, ORDER };
