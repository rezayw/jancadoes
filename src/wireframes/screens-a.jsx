// screens-a.jsx — Hero, Upload, Mode Selection (3 variations each)

// ─── HERO (Landing) ─────────────────────────────────────────────────

function HeroA() {
  return (
    <div className="wf">
      <WFNav active="Home" />
      <div style={{ display:'grid', gridTemplateColumns:'1.1fr 1fr', gap: 32, padding: '36px 36px 0' }}>
        <div>
          <span className="wf-stamp">Hero · Classic split</span>
          <h1 className="hand" style={{ fontSize: 44, lineHeight: 1.05, margin:'14px 0 8px', fontWeight: 700 }}>
            Transform Your Photos<br/>
            <span style={{ background:'var(--wf-mustard)', padding:'0 8px', display:'inline-block', transform:'rotate(-1deg)' }}>with Jancadoes</span>
          </h1>
          <p style={{ color:'var(--wf-ink-soft)', fontSize: 15, lineHeight:1.5, maxWidth: 320, margin:'8px 0 18px' }}>
            Studio-grade enhancement in one tap — restore, relight, upscale &amp; more. <span className="hand" style={{color:'var(--wf-ink)'}}>tanpa skill editing.</span>
          </p>
          <div className="wf-row wf-gap-10" style={{ marginTop: 8 }}>
            <span className="wf-btn primary">⤴ Upload Photo</span>
            <span className="wf-btn warm">◉ Try Camera</span>
          </div>
          <div className="wf-row wf-gap-8" style={{ marginTop: 22, alignItems:'center' }}>
            <div className="wf-row" style={{ gap: -6 }}>
              {[0,1,2].map(i => <span key={i} className="wf-circle" style={{ width: 22, height: 22, background:'var(--wf-tan)', marginLeft: i?-6:0 }} />)}
            </div>
            <span style={{ fontSize: 12, color:'var(--wf-ink-soft)' }}>★★★★★ 12k photos enhanced today</span>
          </div>
        </div>
        <div style={{ position:'relative' }}>
          <WFPhoto label="hero illustration" w="100%" h={260} />
          <div style={{ position:'absolute', right: -8, bottom: -16,
            background:'var(--wf-paper-2)', padding:6, border:'1.5px solid var(--wf-line)',
            borderRadius:'10px 12px 9px 11px', transform:'rotate(3deg)' }}>
            <WFBeforeAfter w={140} h={80} />
            <div className="mono" style={{ fontSize:9, textAlign:'center', marginTop:4 }}>before / after</div>
          </div>
          <WFAnno x={260} y={-10} w={130} rotate={4}
            arrowTo={{ d:"M 0 10 Q -20 0 -45 -8", tx:-45, ty:-8 }}>
            Jancadoes sample of enhancement
          </WFAnno>
        </div>
      </div>
    </div>
  );
}

function HeroB() {
  // The drag-into-AI-lens metaphor
  return (
    <div className="wf">
      <WFNav active="Home" />
      <div style={{ position:'relative', height: 'calc(100% - 60px)', padding: '24px 36px' }}>
        <span className="wf-stamp">Hero · Drop-into-lens</span>
        <div className="hand" style={{ textAlign:'center', fontSize: 32, lineHeight:1.1, marginTop:14, fontWeight:700 }}>
          Drop a photo. <span style={{ color:'#8a4a2a' }}>Watch it transform.</span>
        </div>
        {/* The lens */}
        <div style={{ position:'relative', margin:'18px auto 0', width: 280, height: 200 }}>
          <div className="wf-circle" style={{ width: 200, height: 200, position:'absolute', left:40,
            border:'2.5px solid var(--wf-line)', background:
            'radial-gradient(circle at 35% 35%, var(--wf-paper-2) 0 30%, var(--wf-sage) 30% 60%, var(--wf-tan) 60% 100%)' }}>
            <div className="wf-circle" style={{ width:60, height:60, background:'var(--wf-paper-2)',
              border:'1.5px solid var(--wf-line)' }}>
              <span className="hand" style={{ fontSize: 14, lineHeight: 1, textAlign:'center' }}>Janca<br/>does</span>
            </div>
          </div>
          {/* Floating photo cards */}
          {[
            { x: -10, y: 10, rot: -10 },
            { x: 240, y: 0, rot: 8 },
            { x: -20, y: 130, rot: 6 },
            { x: 250, y: 140, rot: -7 },
          ].map((p,i) => (
            <div key={i} style={{ position:'absolute', left: p.x, top: p.y, transform:`rotate(${p.rot}deg)` }}>
              <WFPhoto w={50} h={40} label="" />
            </div>
          ))}
          {/* Drop target ring */}
          <div className="wf-circle" style={{ width: 260, height: 260, position:'absolute', left:10, top:-30,
            border:'2px dashed #8a4a2a', background:'transparent', pointerEvents:'none' }} />
        </div>
        <div className="wf-row wf-gap-10" style={{ justifyContent:'center', marginTop: 14 }}>
          <span className="wf-btn primary">Choose File</span>
          <span className="wf-btn" style={{ background:'transparent' }}>or paste URL</span>
        </div>
        <WFAnno x={500} y={150} w={170} rotate={5}
          arrowTo={{ d:"M 0 0 Q -40 10 -80 18", tx:-80, ty:18 }}>
          photos magnetically pulled toward the lens (hover anim)
        </WFAnno>
        <WFAnno x={60} y={290} w={150} rotate={-3}
          arrowTo={{ d:"M 20 0 Q 30 -20 60 -40", tx:60, ty:-40 }}>
          drop zone is the whole lens
        </WFAnno>
      </div>
    </div>
  );
}

function HeroC() {
  // Conversational / prompt-first — wild
  return (
    <div className="wf">
      <WFNav active="Home" />
      <div style={{ padding: '38px 36px 0', textAlign:'center' }}>
        <span className="wf-stamp">Hero · Prompt-first (wild)</span>
        <div className="hand" style={{ fontSize: 18, color:'var(--wf-ink-soft)', marginTop: 18 }}>
          good morning. what should we fix today?
        </div>
        {/* Giant prompt input */}
        <div className="wf-input" style={{
          maxWidth: 540, margin:'18px auto 0', padding: '18px 20px',
          textAlign:'left', fontSize: 18, color:'var(--wf-ink-soft)',
          minHeight: 110, position:'relative'
        }}>
          <span style={{ opacity: .55 }}>Drop a photo here, or describe what to enhance…</span>
          <span style={{ position:'absolute', left: 252, top: 22, width: 2, height: 22, background:'var(--wf-ink)', animation:'none' }} />
          <div className="wf-row wf-gap-8" style={{ position:'absolute', left: 18, bottom: 14 }}>
            <span className="wf-pill">📎 attach</span>
            <span className="wf-pill">◉ camera</span>
            <span className="wf-pill">🔗 url</span>
          </div>
          <span className="wf-btn primary" style={{ position:'absolute', right: 14, bottom: 12 }}>Enhance ↵</span>
        </div>
        {/* Suggestion chips */}
        <div className="wf-row wf-gap-8" style={{ justifyContent:'center', flexWrap:'wrap', marginTop: 18, maxWidth: 540, marginLeft:'auto', marginRight:'auto' }}>
          {["fix bad lighting", "golden hour please", "restore foto lama", "remove background people", "upscale ke 4K"].map(t =>
            <span key={t} className="wf-pill tan" style={{ fontSize: 12 }}>{t}</span>
          )}
        </div>
        <WFAnno x={20} y={130} w={150} rotate={-4}
          arrowTo={{ d:"M 30 10 Q 80 30 130 40", tx:130, ty:40 }}>
          no headline. input IS the hero. accepts text OR file drag.
        </WFAnno>
        <WFAnno x={560} y={210} w={140} rotate={3}
          arrowTo={{ d:"M 0 10 Q -30 30 -70 40", tx:-70, ty:40 }}>
          chips map to the 7 modes
        </WFAnno>
      </div>
    </div>
  );
}

// ─── UPLOAD / CAMERA ────────────────────────────────────────────────

function UploadA() {
  return (
    <div className="wf">
      <div style={{ padding: '28px 36px' }}>
        <WFSectionLabel>Upload · Standard dropzone</WFSectionLabel>
        <div style={{ display:'grid', gridTemplateColumns:'1.7fr 1fr', gap: 20, marginTop: 12 }}>
          <div style={{
            border:'2px dashed var(--wf-line)', borderRadius:'14px 18px 13px 16px',
            background: 'repeating-linear-gradient(45deg, transparent 0 14px, rgba(42,37,32,.06) 14px 15px), var(--wf-paper-2)',
            padding: '38px 24px', textAlign:'center', position:'relative', minHeight: 280
          }}>
            <div className="wf-circle" style={{ width: 56, height: 56, margin:'0 auto', background:'var(--wf-sage)' }}>
              <span className="hand" style={{ fontSize: 28 }}>↑</span>
            </div>
            <div className="hand" style={{ fontSize: 26, marginTop: 14 }}>Drag &amp; drop your photo</div>
            <div style={{ fontSize: 13, color:'var(--wf-ink-soft)', marginTop: 6 }}>or</div>
            <div className="wf-row wf-gap-10" style={{ justifyContent:'center', marginTop: 12 }}>
              <span className="wf-btn primary">Browse files</span>
              <span className="wf-btn warm">◉ Open Camera</span>
            </div>
            <div className="mono" style={{ fontSize: 11, color:'var(--wf-ink-soft)', marginTop: 18 }}>
              JPG · PNG · WEBP · max 20MB
            </div>
          </div>
          <div className="wf-col wf-gap-10">
            <div className="wf-box" style={{ padding: 12 }}>
              <div className="hand" style={{ fontSize: 16, marginBottom: 6 }}>Tips for best result</div>
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, lineHeight: 1.5, color:'var(--wf-ink-soft)' }}>
                <li>Use original, uncropped photos</li>
                <li>Minimum 800×600 recommended</li>
                <li>Avoid heavy filters first</li>
              </ul>
            </div>
            <div className="wf-box" style={{ padding: 12 }}>
              <div className="hand" style={{ fontSize: 16, marginBottom: 6 }}>Privacy</div>
              <div style={{ fontSize: 12, color:'var(--wf-ink-soft)' }}>Files auto-deleted after 24h. Tidak dipakai untuk training.</div>
            </div>
          </div>
        </div>
        <WFAnno x={36} y={130} w={150} rotate={-3}
          arrowTo={{ d:"M 30 20 Q 60 40 100 60", tx:100, ty:60 }}>
          on hover the dashed border turns sage + scales 1.02
        </WFAnno>
      </div>
    </div>
  );
}

function UploadB() {
  // Camera-first viewfinder
  return (
    <div className="wf">
      <div style={{ padding: '24px 36px' }}>
        <WFSectionLabel>Upload · Camera-first viewfinder</WFSectionLabel>
        {/* Tabs */}
        <div className="wf-row wf-gap-4" style={{ marginTop: 8 }}>
          <span className="wf-pill warm" style={{ fontWeight: 600 }}>◉ Camera</span>
          <span className="wf-pill">📎 Upload</span>
          <span className="wf-pill">🔗 URL</span>
          <span className="wf-pill">🖼 Library</span>
        </div>
        {/* Viewfinder */}
        <div style={{ position:'relative', marginTop: 10, height: 320,
          border:'1.5px solid var(--wf-line)', borderRadius:'14px',
          background: 'var(--wf-ink)', overflow:'hidden' }}>
          {/* Live photo placeholder */}
          <div style={{ position:'absolute', inset:14, borderRadius:10,
            background: `
              radial-gradient(circle at 30% 40%, rgba(217,180,138,.55) 0 25%, transparent 26%),
              repeating-linear-gradient(135deg, rgba(255,255,255,.04) 0 14px, transparent 14px 28px),
              linear-gradient(180deg, #3a2f25 0%, #1c1612 100%)` }} />
          {/* Rule of thirds */}
          <svg style={{ position:'absolute', inset:14, width:'calc(100% - 28px)', height:'calc(100% - 28px)' }} viewBox="0 0 300 200" preserveAspectRatio="none">
            <line x1="100" y1="0" x2="100" y2="200" stroke="rgba(255,255,255,.4)" strokeWidth=".7" strokeDasharray="3 4" />
            <line x1="200" y1="0" x2="200" y2="200" stroke="rgba(255,255,255,.4)" strokeWidth=".7" strokeDasharray="3 4" />
            <line x1="0"   y1="66" x2="300" y2="66" stroke="rgba(255,255,255,.4)" strokeWidth=".7" strokeDasharray="3 4" />
            <line x1="0"   y1="133" x2="300" y2="133" stroke="rgba(255,255,255,.4)" strokeWidth=".7" strokeDasharray="3 4" />
          </svg>
          {/* Focus reticle */}
          <div style={{ position:'absolute', left:'42%', top:'40%', width: 60, height: 60,
            border:'1.5px solid rgba(233,201,106,.85)', borderRadius:6 }} />
          {/* Top HUD */}
          <div className="mono" style={{ position:'absolute', left: 24, top: 24, color:'#fff', fontSize: 11, letterSpacing:'.1em' }}>
            ● REC · 1080p · auto
          </div>
          <div className="mono" style={{ position:'absolute', right: 24, top: 24, color:'#fff', fontSize: 11 }}>
            ISO 200 · f/1.8
          </div>
          {/* Bottom controls */}
          <div className="wf-row" style={{ position:'absolute', bottom: 18, left: 0, right: 0, justifyContent:'space-between', padding:'0 30px', alignItems:'center' }}>
            <div className="wf-circle" style={{ width: 40, height: 40, background:'rgba(255,255,255,.18)', color:'#fff', border:'1.5px solid rgba(255,255,255,.4)' }}>↻</div>
            <div className="wf-circle" style={{ width: 64, height: 64, background:'#fff', border:'3px solid rgba(255,255,255,.6)', outline:'2px solid #fff', outlineOffset: 3 }} />
            <div className="wf-circle" style={{ width: 40, height: 40, background:'rgba(255,255,255,.18)', color:'#fff', border:'1.5px solid rgba(255,255,255,.4)' }}>⚡</div>
          </div>
        </div>
        <WFAnno x={500} y={120} w={170} rotate={4}
          arrowTo={{ d:"M 0 0 Q -40 20 -80 40", tx:-80, ty:40 }}>
          live preview with rule-of-thirds + Jancadoes focus reticle that follows subjects
        </WFAnno>
      </div>
    </div>
  );
}

function UploadC() {
  // Photo desk / multi-pick metaphor
  return (
    <div className="wf">
      <div style={{ padding: '24px 36px' }}>
        <WFSectionLabel>Upload · Photo desk (wild)</WFSectionLabel>
        <div className="hand" style={{ fontSize: 16, color:'var(--wf-ink-soft)', marginTop: 4 }}>
          drag any photo to the tray — or scatter from your library
        </div>
        <div style={{ position:'relative', marginTop: 14, height: 330,
          background:
          `repeating-linear-gradient(0deg, transparent 0 30px, rgba(42,37,32,.03) 30px 31px),
           repeating-linear-gradient(90deg, transparent 0 30px, rgba(42,37,32,.03) 30px 31px),
           var(--wf-paper-2)`,
          border:'1.5px solid var(--wf-line)', borderRadius:'14px', overflow:'hidden' }}>
          {/* Scattered photos */}
          {[
            { x: 24, y: 18, w: 110, h: 80, rot: -7 },
            { x: 150, y: 36, w: 90, h: 110, rot: 5 },
            { x: 260, y: 12, w: 80, h: 64, rot: -3 },
            { x: 40, y: 130, w: 130, h: 90, rot: 4 },
            { x: 200, y: 170, w: 100, h: 80, rot: -6 },
            { x: 340, y: 90, w: 100, h: 80, rot: 8 },
          ].map((p,i) => (
            <div key={i} style={{ position:'absolute', left:p.x, top:p.y, transform:`rotate(${p.rot}deg)`,
              boxShadow:'3px 4px 0 -1px var(--wf-line)' }}>
              <WFPhoto w={p.w} h={p.h} label={i===1?"★ selected":""} tint={i===1?"var(--wf-sage)":undefined} />
            </div>
          ))}
          {/* Tray on right */}
          <div style={{ position:'absolute', right: 16, top: 16, bottom: 16, width: 180,
            border:'2px dashed var(--wf-line)', borderRadius: '12px',
            background:'var(--wf-paper)', padding: 10 }}>
            <div className="wf-stamp">TRAY · 1 of 5</div>
            <div className="hand" style={{ fontSize: 14, marginTop: 6, marginBottom: 8 }}>drop here →</div>
            <div style={{ height: 100, background:'var(--wf-sage)',
              border:'1.5px solid var(--wf-line)', borderRadius: 10,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize: 11 }} className="mono">selected.jpg</div>
            <div style={{ height: 56, marginTop:8, border:'1.5px dashed var(--wf-line)', borderRadius:10, opacity:.6 }} />
            <div style={{ height: 56, marginTop:8, border:'1.5px dashed var(--wf-line)', borderRadius:10, opacity:.4 }} />
            <span className="wf-btn primary" style={{ width:'100%', marginTop: 10, fontSize:12 }}>Continue →</span>
          </div>
        </div>
        <WFAnno x={36} y={460} w={180} rotate={-2}
          arrowTo={{ d:"M 30 -10 Q 60 -30 100 -55", tx:100, ty:-55 }}>
          scattered = source. tray = chosen. multi-batch enhance.
        </WFAnno>
      </div>
    </div>
  );
}

// ─── MODE SELECTION ─────────────────────────────────────────────────

const MODES = [
  { name: "Phone → Studio",   short: "studio lighting + bg" },
  { name: "Correct Lighting", short: "fix exposure" },
  { name: "Golden Hour",      short: "warm portrait glow" },
  { name: "Restore Old",      short: "fix damage / blur" },
  { name: "Remove People",    short: "clear background" },
  { name: "Remove Watermark", short: "auto-detect + erase" },
  { name: "4K Enhancer",      short: "upscale resolution" },
];

function ModesA() {
  return (
    <div className="wf">
      <div style={{ padding: '24px 36px' }}>
        <WFSectionLabel>Mode Select · Card grid</WFSectionLabel>
        <div className="hand" style={{ fontSize: 16, color:'var(--wf-ink-soft)' }}>
          pick one — or “let Jancadoes decide” at the bottom
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 10, marginTop: 14 }}>
          {MODES.map((m,i) => (
            <div key={m.name} className="wf-card" style={{ padding: 10,
              background: i===2 ? 'var(--wf-mustard)' : 'var(--wf-paper-2)' }}>
              <div className="wf-circle" style={{ width: 32, height: 32, background:'var(--wf-tan)' }}>
                <span className="mono" style={{ fontSize: 10 }}>{String(i+1).padStart(2,'0')}</span>
              </div>
              <div className="hand" style={{ fontSize: 15, marginTop: 8, lineHeight: 1.1 }}>{m.name}</div>
              <div style={{ fontSize: 11, color:'var(--wf-ink-soft)', marginTop: 2 }}>{m.short}</div>
              <div className="wf-rule" style={{ marginTop: 10, marginBottom: 6 }} />
              <span className="mono" style={{ fontSize: 10 }}>{i===2 ? '✓ selected' : 'select →'}</span>
            </div>
          ))}
          <div className="wf-card" style={{ padding: 10, borderStyle:'dashed', background:'var(--wf-sage)' }}>
            <div className="hand" style={{ fontSize: 22, lineHeight:1 }}>✨</div>
            <div className="hand" style={{ fontSize: 15, marginTop: 8 }}>Let Jancadoes decide</div>
            <div style={{ fontSize: 11, color:'var(--wf-ink-soft)', marginTop: 2 }}>auto-detect best mode</div>
          </div>
        </div>
        <WFAnno x={560} y={120} w={150} rotate={4}
          arrowTo={{ d:"M 0 10 Q -30 0 -55 -10", tx:-55, ty:-10 }}>
          mustard fill = selected state. hover lifts card 2px.
        </WFAnno>
      </div>
    </div>
  );
}

function ModesB() {
  // Radial wheel
  const cx = 360, cy = 270, R = 140;
  return (
    <div className="wf">
      <div style={{ padding: '24px 36px' }}>
        <WFSectionLabel>Mode Select · Radial wheel</WFSectionLabel>
        <div className="hand" style={{ fontSize: 16, color:'var(--wf-ink-soft)' }}>
          spin / scroll to cycle modes — selected one zooms forward
        </div>
        <div style={{ position:'relative', height: 380, marginTop: 4 }}>
          <svg style={{ position:'absolute', inset: 0, width: '100%', height: '100%' }}>
            <circle cx={cx} cy={cy} r={R+30} fill="none" stroke="var(--wf-line)" strokeWidth="1" strokeDasharray="2 5" />
            <circle cx={cx} cy={cy} r={R-30} fill="none" stroke="var(--wf-line)" strokeWidth="1" strokeDasharray="2 5" />
          </svg>
          {/* Center: selected mode card */}
          <div style={{ position:'absolute', left: cx-80, top: cy-60, width: 160, height: 120 }}>
            <div className="wf-card" style={{ padding: 12, background:'var(--wf-mustard)', height:'100%', textAlign:'center' }}>
              <div className="wf-stamp">SELECTED</div>
              <div className="hand" style={{ fontSize: 20, marginTop: 6 }}>Golden Hour</div>
              <div style={{ fontSize: 11, color:'var(--wf-ink-soft)' }}>warm portrait glow</div>
              <span className="wf-btn primary" style={{ marginTop: 8, fontSize: 12 }}>Apply ▶</span>
            </div>
          </div>
          {/* Surrounding mode dots */}
          {MODES.map((m,i) => {
            const ang = (i / MODES.length) * Math.PI * 2 - Math.PI/2;
            const x = cx + Math.cos(ang) * R;
            const y = cy + Math.sin(ang) * R;
            const selected = i === 2;
            return (
              <div key={m.name} style={{ position:'absolute', left: x-30, top: y-30, width: 60, height: 60 }}>
                <div className="wf-circle" style={{ width: 60, height: 60,
                  background: selected ? 'var(--wf-mustard)' : 'var(--wf-paper-2)',
                  fontSize: 9, textAlign:'center', padding:6, lineHeight:1.1 }}>
                  <span className="hand" style={{ fontSize: 12 }}>{m.name.split(' ')[0]}</span>
                </div>
              </div>
            );
          })}
        </div>
        <WFAnno x={36} y={130} w={170} rotate={-3}
          arrowTo={{ d:"M 50 30 Q 90 60 130 80", tx:130, ty:80 }}>
          drag = rotate the wheel. selected stays at top.
        </WFAnno>
      </div>
    </div>
  );
}

function ModesC() {
  // Before/After thumbnail catalog
  return (
    <div className="wf">
      <div style={{ padding: '24px 36px' }}>
        <WFSectionLabel>Mode Select · Visual catalog (wild)</WFSectionLabel>
        <div className="hand" style={{ fontSize: 16, color:'var(--wf-ink-soft)' }}>
          see what each mode does — preview, then choose
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 12, marginTop: 14 }}>
          {MODES.map((m,i) => (
            <div key={m.name} style={{ position:'relative' }}>
              <WFBeforeAfter w="100%" h={92} />
              <div className="wf-row" style={{ justifyContent:'space-between', marginTop: 6 }}>
                <span className="hand" style={{ fontSize: 14 }}>{m.name}</span>
                {i===3 && <span className="wf-pill warm" style={{ fontSize: 10, padding:'1px 6px' }}>★</span>}
              </div>
              <div className="mono" style={{ fontSize: 10, color:'var(--wf-ink-soft)' }}>before · after</div>
            </div>
          ))}
        </div>
        <div className="wf-row wf-gap-10" style={{ marginTop: 18, justifyContent:'flex-end' }}>
          <span className="wf-pill">↺ compare on my photo</span>
          <span className="wf-btn primary">Apply Restore Old →</span>
        </div>
        <WFAnno x={36} y={130} w={180} rotate={-3}
          arrowTo={{ d:"M 40 30 Q 80 50 130 60", tx:130, ty:60 }}>
          hover = animate the slider on the thumbnail. visual selection, no icons.
        </WFAnno>
      </div>
    </div>
  );
}

Object.assign(window, {
  HeroA, HeroB, HeroC,
  UploadA, UploadB, UploadC,
  ModesA, ModesB, ModesC,
});
