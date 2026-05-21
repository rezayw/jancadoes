// wireframe-kit.jsx — sketchy low-fi primitives for the Jancadoes wireframes.
// Hand-drawn vibe: wobbly borders, hatched placeholders, scribbled buttons,
// margin-note annotations, hand-drawn arrows. Honors a global `wfStyle`
// (sketch | clean) and `wfPalette` (warm | mono | dusk) read off
// document.documentElement via CSS vars.

(function injectKit() {
  if (document.getElementById('wf-kit-styles')) return;
  const s = document.createElement('style');
  s.id = 'wf-kit-styles';
  s.textContent = `
    :root{
      --wf-paper: #f7f1e3;
      --wf-paper-2: #fdf9ee;
      --wf-ink: #2a2520;
      --wf-ink-soft: #6b5e4f;
      --wf-line: #2a2520;
      --wf-sage: #b8c89c;
      --wf-tan:  #d9b48a;
      --wf-mustard: #e9c96a;
      --wf-accent: var(--wf-sage);
      --wf-hatch: rgba(42,37,32,.18);
    }
    [data-palette="mono"]{
      --wf-paper:#f4f1ec; --wf-paper-2:#fafaf7;
      --wf-sage:#cfcec9; --wf-tan:#bcb6ac; --wf-mustard:#d8d2c5;
    }
    [data-palette="dusk"]{
      --wf-paper:#ebe6dc; --wf-paper-2:#f4f0e6;
      --wf-sage:#a6b5a2; --wf-tan:#b89e85; --wf-mustard:#d6bf72;
      --wf-ink:#262220;
    }
    [data-mode="clean"]{
      --wf-hatch: rgba(42,37,32,.1);
    }

    .wf{
      font-family: "Kalam","Patrick Hand","Architects Daughter",cursive,system-ui;
      color: var(--wf-ink);
      background: var(--wf-paper);
      width:100%; height:100%;
      position:relative;
      overflow:hidden;
      box-sizing:border-box;
    }
    .wf, .wf *{ box-sizing:border-box; }
    .wf .mono{ font-family:"JetBrains Mono","IBM Plex Mono",ui-monospace,monospace; font-weight:400; }
    .wf .hand{ font-family:"Caveat","Kalam",cursive; }

    /* Paper grain for sketch mode */
    [data-mode="sketch"] .wf::before{
      content:""; position:absolute; inset:0; pointer-events:none;
      background-image:
        radial-gradient(circle at 20% 30%, rgba(42,37,32,.04) 0, transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(42,37,32,.05) 0, transparent 50%);
    }

    /* Wobbly stroke base */
    .wf-box, .wf-btn, .wf-input, .wf-card, .wf-pill, .wf-circle{
      border: 1.5px solid var(--wf-line);
      background: var(--wf-paper-2);
    }
    [data-mode="sketch"] .wf-box,
    [data-mode="sketch"] .wf-btn,
    [data-mode="sketch"] .wf-input,
    [data-mode="sketch"] .wf-card,
    [data-mode="sketch"] .wf-pill{
      border-radius: 12px 14px 11px 13px / 13px 12px 14px 11px;
    }
    [data-mode="clean"] .wf-box,
    [data-mode="clean"] .wf-btn,
    [data-mode="clean"] .wf-input,
    [data-mode="clean"] .wf-card,
    [data-mode="clean"] .wf-pill{
      border-radius: 10px;
      border-width: 1px;
    }

    /* Image placeholder — diagonal hatching */
    .wf-img{
      position:relative; overflow:hidden;
      background:
        repeating-linear-gradient(45deg,
          transparent 0 10px,
          var(--wf-hatch) 10px 11px),
        var(--wf-paper-2);
      border: 1.5px solid var(--wf-line);
      display:flex; align-items:center; justify-content:center;
    }
    [data-mode="sketch"] .wf-img{ border-radius: 12px 16px 11px 14px / 14px 11px 15px 12px; }
    [data-mode="clean"]  .wf-img{ border-radius: 10px; border-width:1px; }
    .wf-img .lbl{
      font-family:"JetBrains Mono",ui-monospace,monospace;
      font-size:10px; letter-spacing:.05em;
      background: var(--wf-paper-2);
      padding: 2px 6px; border:1px solid var(--wf-line);
      color: var(--wf-ink-soft);
      transform: rotate(-1deg);
    }
    [data-mode="clean"] .wf-img .lbl{ transform:none; }

    /* Buttons */
    .wf-btn{
      display:inline-flex; align-items:center; justify-content:center; gap:6px;
      padding: 6px 14px;
      font: 600 14px/1 "Kalam",cursive;
      background: var(--wf-paper-2);
      color: var(--wf-ink);
      cursor:default;
      position:relative;
      transition: transform .08s;
    }
    .wf-btn.primary{ background: var(--wf-accent); }
    .wf-btn.warm{ background: var(--wf-mustard); }
    .wf-btn.tan{ background: var(--wf-tan); }
    .wf-btn.ghost{ background: transparent; }
    [data-mode="sketch"] .wf-btn::after{
      content:""; position:absolute; left:3px; right:-3px; bottom:-3px; height:6px;
      background: var(--wf-ink); opacity:.85;
      border-radius: 4px 6px 5px 7px;
      z-index:-1;
    }

    /* Inputs */
    .wf-input{
      padding: 6px 10px;
      background: var(--wf-paper-2);
      font:14px/1.3 "Kalam",cursive;
      color: var(--wf-ink-soft);
    }

    /* Pills / tags */
    .wf-pill{
      display:inline-flex; align-items:center; gap:6px;
      padding: 2px 9px;
      font: 500 12px/1.2 "Kalam",cursive;
      background: var(--wf-paper-2);
    }
    .wf-pill.sage{ background: var(--wf-sage); }
    .wf-pill.tan { background: var(--wf-tan); }
    .wf-pill.warm{ background: var(--wf-mustard); }

    /* Circular */
    .wf-circle{
      border-radius: 999px;
      display:inline-flex; align-items:center; justify-content:center;
    }

    /* Navbar */
    .wf-nav{
      display:flex; align-items:center; justify-content:space-between;
      padding: 14px 28px;
      border-bottom: 1.5px dashed var(--wf-line);
    }
    [data-mode="clean"] .wf-nav{ border-bottom-style:solid; border-bottom-width:1px; }
    .wf-nav .logo{
      font: 700 22px/1 "Caveat",cursive;
      letter-spacing: .01em;
    }
    .wf-nav .logo::before{
      content:""; display:inline-block; width:14px; height:14px;
      background: var(--wf-accent); margin-right:8px;
      border: 1.5px solid var(--wf-line);
      vertical-align:-2px;
      border-radius: 4px 6px 5px 7px;
    }
    .wf-nav ul{ display:flex; gap:18px; list-style:none; margin:0; padding:0;
      font: 500 13px/1 "Kalam",cursive; }

    /* Annotations: wavy underline + post-it style */
    .wf-anno{
      display: var(--wf-anno-display, inline-flex);
      font: 500 12px/1.25 "Caveat","Kalam",cursive;
      color: #8a4a2a;
      align-items:center; gap:6px;
    }
    [data-anno="off"]{ --wf-anno-display: none; }
    [data-anno="off"] .wf-anno-block{ display:none; }
    .wf-anno-block{
      position:absolute;
      font: 600 13px/1.2 "Caveat",cursive;
      color: #8a4a2a;
      max-width: 160px;
      pointer-events:none;
    }
    .wf-anno-block .arrow{ display:block; }

    /* Hand-drawn arrow (uses SVG via reusable component below) */

    /* Scribble line */
    .wf-rule{
      height: 0; border-top: 1.5px dashed var(--wf-line); margin: 6px 0;
    }
    [data-mode="clean"] .wf-rule{ border-top-style:solid; border-top-width:1px; }

    /* "Brand" small text stamp */
    .wf-stamp{
      display:inline-block;
      padding: 1px 5px;
      border: 1.2px solid var(--wf-ink);
      font: 600 9px/1 "JetBrains Mono",monospace;
      letter-spacing:.1em;
      text-transform:uppercase;
      transform: rotate(-2deg);
      background: var(--wf-paper-2);
    }

    /* Generic flex helpers */
    .wf-row{ display:flex; align-items:center; }
    .wf-col{ display:flex; flex-direction:column; }
    .wf-gap-4{ gap:4px; } .wf-gap-6{ gap:6px; } .wf-gap-8{ gap:8px; }
    .wf-gap-10{ gap:10px; } .wf-gap-12{ gap:12px; } .wf-gap-16{ gap:16px; }
    .wf-grow{ flex:1; }

    /* Sketchy "checkbox" */
    .wf-check{
      width:14px; height:14px; border:1.5px solid var(--wf-line);
      background: var(--wf-paper-2);
      border-radius: 3px 5px 4px 6px;
      display:inline-block;
      position:relative;
    }
    .wf-check.on::after{
      content:"✓"; position:absolute; inset:0;
      display:flex; align-items:center; justify-content:center;
      font: 700 13px/1 "Kalam",cursive; color: var(--wf-ink);
    }
  `;
  document.head.appendChild(s);
})();

// ─── Reusable primitives ────────────────────────────────────────────

function WFArrow({ d = "M 0 0 C 20 -10, 60 -20, 90 0", width = 100, height = 40, style }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible', ...style }}>
      <path d={d} fill="none" stroke="#8a4a2a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M -8 -4 L 0 0 L -6 5" fill="none" stroke="#8a4a2a" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
        transform={`translate(${width-2}, ${height/2}) rotate(0)`} />
    </svg>
  );
}

// Hand-drawn callout arrow with text label
function WFAnno({ children, x, y, w = 160, arrowTo, rotate = -3 }) {
  return (
    <div className="wf-anno-block" style={{ left: x, top: y, width: w, transform: `rotate(${rotate}deg)` }}>
      <span>{children}</span>
      {arrowTo && <svg className="arrow" width={arrowTo.w || 50} height={arrowTo.h || 30}
        style={{ marginTop: 2, marginLeft: arrowTo.ml || 0, overflow: 'visible' }}>
        <path d={arrowTo.d || "M 4 4 Q 20 25 40 20"} fill="none" stroke="#8a4a2a"
          strokeWidth="1.4" strokeLinecap="round" />
        <path d={`M ${(arrowTo.tx||40)-6} ${(arrowTo.ty||20)-4} L ${arrowTo.tx||40} ${arrowTo.ty||20} L ${(arrowTo.tx||40)-4} ${(arrowTo.ty||20)+5}`}
          fill="none" stroke="#8a4a2a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>}
    </div>
  );
}

// Photo placeholder with hatched fill + label
function WFPhoto({ label = "photo", w = "100%", h = "100%", tint, style, children }) {
  return (
    <div className="wf-img" style={{ width: w, height: h, background: tint, ...style }}>
      {children || <span className="lbl">{label}</span>}
    </div>
  );
}

// "Before / After" mini-pair (used in catalogs/results)
function WFBeforeAfter({ w = 200, h = 120 }) {
  return (
    <div style={{ display: 'flex', gap: 0, width: w, height: h, border: '1.5px solid var(--wf-line)',
      borderRadius: '12px 14px 11px 13px / 13px 12px 14px 11px', overflow:'hidden' }}>
      <div style={{ flex: 1, background:
        `repeating-linear-gradient(45deg, transparent 0 8px, var(--wf-hatch) 8px 9px)` }} />
      <div style={{ width: 1, background: 'var(--wf-line)' }} />
      <div style={{ flex: 1, background:
        `repeating-linear-gradient(45deg, transparent 0 8px, rgba(184,200,156,.45) 8px 9px),
         repeating-linear-gradient(-45deg, transparent 0 8px, rgba(233,201,106,.35) 8px 9px)` }} />
    </div>
  );
}

// Sketchy navbar — used at top of every Landing variant
function WFNav({ active = "Home" }) {
  return (
    <div className="wf-nav">
      <div className="logo">Jancadoes</div>
      <ul>
        {["Home","Features","Pricing","Gallery"].map(x => (
          <li key={x} style={{ position:'relative', paddingBottom: 3 }}>
            {x}
            {x === active && <svg width="100%" height="6" viewBox="0 0 60 6" style={{ position:'absolute', left:0, bottom:-2 }}>
              <path d="M 2 3 Q 15 0, 30 3 T 58 3" fill="none" stroke="var(--wf-ink)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>}
          </li>
        ))}
      </ul>
      <div className="wf-row wf-gap-8">
        <span className="wf-btn ghost" style={{ fontSize: 13 }}>Login</span>
        <span className="wf-btn primary" style={{ fontSize: 13 }}>Register</span>
      </div>
    </div>
  );
}

// Sketchy "device" frame (used for mobile callouts within wireframes)
function WFPhone({ children, w = 200, h = 380 }) {
  return (
    <div style={{
      width: w, height: h,
      border: '2px solid var(--wf-line)',
      borderRadius: '24px 28px 22px 26px / 26px 22px 28px 24px',
      background: 'var(--wf-paper-2)',
      padding: '14px 10px',
      position: 'relative',
      boxShadow: '3px 3px 0 -1px var(--wf-line)',
    }}>
      <div style={{ position:'absolute', top: 6, left: '50%', transform:'translateX(-50%)',
        width: 50, height: 5, background: 'var(--wf-line)', borderRadius: 4 }} />
      {children}
    </div>
  );
}

// Section heading inside an artboard
function WFSectionLabel({ children }) {
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginBottom: 6 }}>
      <span className="wf-stamp">SECTION</span>
      <span className="hand" style={{ fontSize: 18 }}>{children}</span>
    </div>
  );
}

Object.assign(window, {
  WFArrow, WFAnno, WFPhoto, WFBeforeAfter, WFNav, WFPhone, WFSectionLabel
});
