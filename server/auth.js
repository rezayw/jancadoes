// auth.js — email/password auth backed by SQLite, issuing signed JWTs.
//
// Every register/login mints a fresh HS256 JWT identifying the user
// (`sub` = email) with a unique `jti`. Tokens are stateless — verified by
// signature, issuer, and expiry. Logout records the `jti` in the
// revoked_tokens table, so a logged-out token stays dead across restarts.

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const db = require('./db');

const TOKEN_TTL = 7 * 24 * 60 * 60; // 7 days, in seconds
const ISSUER = 'jancadoes';
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const DATA_DIR = path.join(__dirname, '..', 'data');

// ─── Prepared statements ─────────────────────────────────────────────
const q = {
  getUser:    db.prepare('SELECT * FROM users WHERE email = ?'),
  addUser:    db.prepare('INSERT INTO users (email,name,salt,hash,created_at) VALUES (?,?,?,?,?)'),
  countUsers: db.prepare('SELECT COUNT(*) AS c FROM users'),
  getMeta:    db.prepare('SELECT value FROM meta WHERE key = ?'),
  setMeta:    db.prepare('INSERT INTO meta (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value = excluded.value'),
  isRevoked:  db.prepare('SELECT 1 FROM revoked_tokens WHERE jti = ?'),
  revoke:     db.prepare('INSERT OR IGNORE INTO revoked_tokens (jti,exp,revoked_at) VALUES (?,?,?)'),
  prune:      db.prepare('DELETE FROM revoked_tokens WHERE exp < ?'),
};

// Already-expired revoked rows can't be reused — drop them on startup.
q.prune.run(Math.floor(Date.now() / 1000));

// ─── One-time migration from the legacy data/users.json ──────────────
(function migrateLegacyUsers() {
  const jsonPath = path.join(DATA_DIR, 'users.json');
  if (!fs.existsSync(jsonPath) || q.countUsers.get().c > 0) return;
  try {
    const old = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const importAll = db.transaction((users) => {
      for (const u of Object.values(users)) {
        q.addUser.run(u.email, u.name, u.salt, u.hash, u.createdAt || new Date().toISOString());
      }
    });
    importAll(old);
    fs.renameSync(jsonPath, `${jsonPath}.migrated`);
    console.log(`Migrated ${Object.keys(old).length} account(s) from users.json to SQLite.`);
  } catch (err) {
    console.error('users.json migration skipped:', err.message);
  }
})();

// ─── Signing secret (persisted in the meta table) ────────────────────
function loadSecret() {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
  const row = q.getMeta.get('jwt_secret');
  if (row) return row.value;

  let secret;
  try { secret = fs.readFileSync(path.join(DATA_DIR, '.jwt-secret'), 'utf8').trim(); }
  catch (_) { /* no legacy secret */ }
  if (!secret) secret = crypto.randomBytes(32).toString('hex');
  q.setMeta.run('jwt_secret', secret);
  return secret;
}
const JWT_SECRET = loadSecret();

// ─── JWT (HS256) ─────────────────────────────────────────────────────
function b64url(input) {
  return Buffer.from(input).toString('base64url');
}

function sign(data) {
  return b64url(crypto.createHmac('sha256', JWT_SECRET).update(data).digest());
}

function signJWT(claims) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = b64url(JSON.stringify({
    ...claims,
    iss: ISSUER,
    jti: crypto.randomBytes(12).toString('hex'),
    iat: now,
    exp: now + TOKEN_TTL,
  }));
  const data = `${header}.${body}`;
  return `${data}.${sign(data)}`;
}

function verifyJWT(token) {
  const parts = String(token || '').split('.');
  if (parts.length !== 3) return null;

  // Only accept explicit HS256 — never trust the header's alg blindly.
  let header;
  try { header = JSON.parse(Buffer.from(parts[0], 'base64url')); }
  catch (_) { return null; }
  if (!header || header.alg !== 'HS256' || header.typ !== 'JWT') return null;

  const data = `${parts[0]}.${parts[1]}`;
  const expected = sign(data);
  if (
    parts[2].length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(parts[2]), Buffer.from(expected))
  ) {
    return null;
  }

  let payload;
  try { payload = JSON.parse(Buffer.from(parts[1], 'base64url')); }
  catch (_) { return null; }
  if (payload.iss !== ISSUER) return null;
  if (!payload.sub || !payload.jti) return null;
  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

// ─── Passwords ───────────────────────────────────────────────────────
function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function publicUser(u) {
  return { email: u.email, name: u.name };
}

function startSession(u) {
  return { token: signJWT({ sub: u.email, name: u.name }), user: publicUser(u) };
}

// ─── Public API ──────────────────────────────────────────────────────
function register({ email, password, name }) {
  email = String(email || '').trim().toLowerCase();
  password = String(password || '');
  name = String(name || '').trim();
  if (!EMAIL_RE.test(email) || email.length > 254) throw new Error('Enter a valid email address.');
  if (password.length < 6) throw new Error('Password must be at least 6 characters.');
  if (password.length > 200) throw new Error('Password is too long (max 200 characters).');
  if (name.length > 60) throw new Error('Name is too long (max 60 characters).');
  if (q.getUser.get(email)) throw new Error('That email is already registered — try logging in.');

  const salt = crypto.randomBytes(16).toString('hex');
  const u = {
    email,
    name: name || email.split('@')[0],
    salt,
    hash: hashPassword(password, salt),
    created_at: new Date().toISOString(),
  };
  q.addUser.run(u.email, u.name, u.salt, u.hash, u.created_at);
  return startSession(u);
}

function login({ email, password }) {
  email = String(email || '').trim().toLowerCase();
  const u = q.getUser.get(email);
  if (!u) throw new Error('No account found for that email.');

  const attempt = hashPassword(String(password || ''), u.salt);
  const ok =
    attempt.length === u.hash.length &&
    crypto.timingSafeEqual(Buffer.from(attempt), Buffer.from(u.hash));
  if (!ok) throw new Error('Incorrect password.');
  return startSession(u);
}

function logout(token) {
  const payload = verifyJWT(token);
  if (payload) q.revoke.run(payload.jti, payload.exp, new Date().toISOString());
}

// Resolve a bearer token to its user, or null if invalid/expired/revoked.
function userForToken(token) {
  const payload = verifyJWT(token);
  if (!payload || q.isRevoked.get(payload.jti)) return null;
  const u = q.getUser.get(payload.sub);
  return u ? publicUser(u) : null;
}

function tokenFromHeader(req) {
  const h = req.headers.authorization || '';
  return h.startsWith('Bearer ') ? h.slice(7) : '';
}

// Express middleware — blocks the request unless a valid JWT is present.
function requireAuth(req, res, next) {
  const user = userForToken(tokenFromHeader(req));
  if (!user) {
    return res.status(401).json({ error: 'Please sign in to enhance photos.' });
  }
  req.user = user;
  next();
}

module.exports = { register, login, logout, userForToken, requireAuth, tokenFromHeader };
