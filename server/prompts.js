// prompts.js — turns docs/rag.md into the RAG enhancer prompt library.
// docs/rag.md is the single source of truth: the 7 numbered sections map,
// in order, to the 7 enhancement modes used by the UI.

const fs = require('fs');
const path = require('path');

const RAG_PATH = path.join(__dirname, '..', 'docs', 'rag.md');

// Section order in rag.md → mode id used by the frontend (see MODE_DATA in ui-modes.jsx)
const ORDER = ['studio', 'lighting', 'golden', 'restore', 'people', 'watermark', 'fourk'];

function loadPrompts() {
  const raw = fs.readFileSync(RAG_PATH, 'utf8');

  // Each section looks like:  ## 1. TITLE \n\n <body...> \n --- \n
  const sections = [];
  const re = /##\s*\d+\.\s*(.+?)\n([\s\S]*?)(?=\n##\s*\d+\.|\n*$)/g;
  let m;
  while ((m = re.exec(raw)) !== null) {
    const title = m[1].trim();
    const body = m[2].replace(/-{3,}/g, '').trim();
    if (body) sections.push({ title, body });
  }

  // Null prototype: lookups like PROMPTS['__proto__'] / ['toString']
  // return undefined instead of inherited Object members.
  const byMode = Object.create(null);
  sections.forEach((s, i) => {
    const id = ORDER[i];
    if (id) byMode[id] = { title: s.title, prompt: s.body };
  });
  return byMode;
}

const PROMPTS = loadPrompts();

function promptFor(modeId) {
  const entry = PROMPTS[modeId];
  return entry && entry.prompt ? entry : null;
}

module.exports = { PROMPTS, promptFor, ORDER };
