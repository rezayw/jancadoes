// screens-b.jsx — Processing, Result, History (3 variations each)

// ─── PROCESSING ─────────────────────────────────────────────────────

function ProcessingA() {
  return (
    <div className="wf">
      <div style={{ padding: '24px 36px' }}>
        <WFSectionLabel>Processing · Progress bar</WFSectionLabel>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 24, marginTop: 14, alignItems:'center' }}>
          <WFPhoto label="source.jpg (preview)" w="100%" h={240} />
          <div className="wf-col wf-gap-10">
            <div className="hand" style={{ fontSize: 26, lineHeight:1.1 }}>
              Enhancing your image<span className="hand" style={{ color:'#8a4a2a' }}>…</span>
            </div>
            <div style={{ fontSize: 13, color:'var(--wf-ink-soft)' }}>
              Mode: <b style={{ color:'var(--wf-ink)' }}>Golden Hour Portrait</b> · sebentar ya
            </div>
            {/* Progress bar */}
            <div style={{ position:'relative', height: 18, border:'1.5px solid var(--wf-line)',
              borderRadius: '10px 12px 9px 11px', background:'var(--wf-paper-2)', marginTop: 8 }}>
              <div style={{ position:'absolute', left:2, top:2, bottom:2, width:'62%',
                background:'var(--wf-sage)', borderRadius:'8px' }} />
              <div className="mono" style={{ position:'absolute', right: 8, top: 1, fontSize: 11 }}>62%</div>
            </div>
            <div className="mono" style={{ fontSize: 11, color:'var(--wf-ink-soft)' }}>
              ✓ preprocess  ✓ noise reduce  ▶ Jancadoes inference  ○ render
            </div>
            <div className="wf-row wf-gap-8" style={{ marginTop: 6 }}>
              <span className="wf-pill">⏱ ~14s left</span>
              <span className="wf-pill tan">notify me</span>
            </div>
            <span className="wf-btn ghost" style={{ alignSelf:'flex-start', marginTop: 6, fontSize: 12, textDecoration:'underline' }}>
              cancel
            </span>
          </div>
        </div>
        <WFAnno x={400} y={120} w={150} rotate={3}
          arrowTo={{ d:"M 0 0 Q -30 30 -50 50", tx:-50, ty:50 }}>
          steps tick off one-by-one. ETA updates live.
        </WFAnno>
      </div>
    </div>
  );
}

function ProcessingB() {
  // Pixel scan visualization
  return (
    <div className="wf">
      <div style={{ padding: '24px 36px' }}>
        <WFSectionLabel>Processing · Pixel scan</WFSectionLabel>
        <div className="hand" style={{ fontSize: 16, color:'var(--wf-ink-soft)' }}>
          Jancadoes is reading every pixel — watch it work
        </div>
        <div style={{ position:'relative', marginTop: 12, height: 300,
          border:'1.5px solid var(--wf-line)', borderRadius:14, overflow:'hidden',
          background:`
            repeating-linear-gradient(45deg, transparent 0 8px, var(--wf-hatch) 8px 9px),
            var(--wf-paper-2)` }}>
          {/* Pixel grid overlay */}
          <svg style={{ position:'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <pattern id="px" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="none" stroke="rgba(42,37,32,.12)" strokeWidth=".5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#px)" />
          </svg>
          {/* "Active" pixels */}
          {[
            [60,60],[80,60],[60,80],[100,80],[120,100],[140,80],
            [200,140],[220,140],[240,160],[260,140],[280,160],
            [340,180],[360,180],[380,200]
          ].map(([x,y], i) => (
            <div key={i} style={{ position:'absolute', left:x, top:y, width:20, height:20,
              background:'var(--wf-mustard)', opacity:.7,
              border:'1px solid var(--wf-line)' }} />
          ))}
          {/* Scan line */}
          <div style={{ position:'absolute', left: 0, right: 0, top: 175, height: 3,
            background:'#8a4a2a', boxShadow:'0 0 20px rgba(138,74,42,.45)' }} />
          {/* Scan glow */}
          <div style={{ position:'absolute', left: 0, right: 0, top: 60, height: 120,
            background:'linear-gradient(180deg, transparent 0, rgba(138,74,42,.08) 60%, transparent 100%)' }} />
          {/* HUD */}
          <div className="mono" style={{ position:'absolute', left: 14, top: 14, fontSize: 11, color:'var(--wf-ink)',
            background:'var(--wf-paper-2)', border:'1px solid var(--wf-line)', padding:'3px 7px', borderRadius: 6 }}>
            ▶ inferring · layer 12/18
          </div>
          <div className="mono" style={{ position:'absolute', right: 14, top: 14, fontSize: 11,
            background:'var(--wf-paper-2)', border:'1px solid var(--wf-line)', padding:'3px 7px', borderRadius: 6 }}>
            74%
          </div>
          <div className="mono" style={{ position:'absolute', left: 14, bottom: 14, fontSize: 10, color:'var(--wf-ink-soft)' }}>
            {`{ mode: golden_hour, denoise: 0.4, exposure: +0.6 }`}
          </div>
        </div>
        <WFAnno x={36} y={90} w={170} rotate={-3}
          arrowTo={{ d:"M 50 30 Q 80 50 120 60", tx:120, ty:60 }}>
          scan line sweeps top→bottom. mustard tiles = currently being modified.
        </WFAnno>
      </div>
    </div>
  );
}

function ProcessingC() {
  // Neural net / node map
  const cx = 380, cy = 220;
  const nodes = [
    [80, 100, 'sage'],   [80, 200, 'sage'],   [80, 300, 'sage'],
    [220, 80, 'tan'],    [220, 160, 'tan'],   [220, 240, 'tan'],   [220, 320, 'tan'],
    [360, 130, 'warm'],  [360, 220, 'warm'],  [360, 310, 'warm'],
    [500, 180, 'sage'],  [500, 260, 'sage'],
    [620, 220, 'tan'],
  ];
  const fillFor = (k) => k==='sage'?'var(--wf-sage)':k==='tan'?'var(--wf-tan)':'var(--wf-mustard)';
  return (
    <div className="wf">
      <div style={{ padding: '24px 36px' }}>
        <WFSectionLabel>Processing · Neural net visualization (wild)</WFSectionLabel>
        <div className="hand" style={{ fontSize: 16, color:'var(--wf-ink-soft)' }}>
          your photo is flowing through the model — every layer visible
        </div>
        <div style={{ position:'relative', marginTop: 8, height: 320,
          border:'1.5px solid var(--wf-line)', borderRadius:14, background:'var(--wf-paper-2)' }}>
          {/* Connections */}
          <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} viewBox="0 0 720 360">
            {nodes.slice(0,3).map((a,i) => nodes.slice(3,7).map((b,j) =>
              <line key={`a-${i}-${j}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="rgba(42,37,32,.25)" strokeWidth=".7" />
            ))}
            {nodes.slice(3,7).map((a,i) => nodes.slice(7,10).map((b,j) =>
              <line key={`b-${i}-${j}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="rgba(42,37,32,.25)" strokeWidth=".7" />
            ))}
            {nodes.slice(7,10).map((a,i) => nodes.slice(10,12).map((b,j) =>
              <line key={`c-${i}-${j}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#8a4a2a" strokeWidth="1.2" strokeDasharray="3 3" />
            ))}
            {nodes.slice(10,12).map((a,i) =>
              <line key={`d-${i}`} x1={a[0]} y1={a[1]} x2={nodes[12][0]} y2={nodes[12][1]} stroke="rgba(42,37,32,.25)" strokeWidth=".7" />
            )}
          </svg>
          {nodes.map((n,i) => (
            <div key={i} className="wf-circle" style={{ position:'absolute', left:n[0]-14, top:n[1]-14,
              width: 28, height: 28, background: fillFor(n[2]),
              border:'1.2px solid var(--wf-line)' }} />
          ))}
          {/* Tiny source photo at input */}
          <div style={{ position:'absolute', left: 16, top: 16 }}>
            <WFPhoto w={50} h={42} label="" />
            <div className="mono" style={{ fontSize: 9, textAlign:'center', marginTop: 2 }}>input</div>
          </div>
          <div style={{ position:'absolute', right: 16, bottom: 16 }}>
            <div className="mono" style={{ fontSize: 9, textAlign:'center', marginBottom: 2 }}>output</div>
            <WFPhoto w={50} h={42} label="" tint="var(--wf-sage)" />
          </div>
          {/* Log */}
          <div style={{ position:'absolute', right: 16, top: 16, width: 170,
            background:'var(--wf-paper)', border:'1px solid var(--wf-line)', padding: 8, borderRadius: 8 }}>
            <div className="mono" style={{ fontSize: 10, lineHeight: 1.6 }}>
              <div>▶ conv2d_3 ………… 0.21s</div>
              <div>▶ attention_5 …… 0.44s</div>
              <div style={{ color:'#8a4a2a' }}>● upsample_2 …… running</div>
              <div style={{ opacity:.4 }}>○ render</div>
            </div>
          </div>
        </div>
        <WFAnno x={36} y={100} w={170} rotate={-3}
          arrowTo={{ d:"M 50 40 Q 80 60 110 80", tx:110, ty:80 }}>
          nodes light up as inference progresses. dashed line = current layer.
        </WFAnno>
      </div>
    </div>
  );
}

// ─── RESULT (Before / After) ────────────────────────────────────────

function ResultA() {
  return (
    <div className="wf">
      <div style={{ padding: '24px 36px' }}>
        <WFSectionLabel>Result · Split-slider compare</WFSectionLabel>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 200px', gap: 16, marginTop: 12 }}>
          <div style={{ position:'relative', height: 290, border:'1.5px solid var(--wf-line)', borderRadius: 14, overflow:'hidden' }}>
            {/* Before half */}
            <div style={{ position:'absolute', inset: 0,
              background:`repeating-linear-gradient(45deg, transparent 0 10px, var(--wf-hatch) 10px 11px), var(--wf-paper-2)` }} />
            {/* After half clipped */}
            <div style={{ position:'absolute', inset: 0, clipPath:'inset(0 0 0 55%)',
              background:`repeating-linear-gradient(45deg, transparent 0 10px, rgba(184,200,156,.6) 10px 11px),
                          repeating-linear-gradient(-45deg, transparent 0 10px, rgba(233,201,106,.4) 10px 11px),
                          var(--wf-paper-2)` }} />
            {/* Labels */}
            <div className="wf-stamp" style={{ position:'absolute', left: 12, top: 12 }}>BEFORE</div>
            <div className="wf-stamp" style={{ position:'absolute', right: 12, top: 12, background:'var(--wf-mustard)' }}>AFTER</div>
            {/* Slider handle */}
            <div style={{ position:'absolute', left:'55%', top: 0, bottom: 0, width: 2, background:'var(--wf-line)' }} />
            <div className="wf-circle" style={{ position:'absolute', left:'55%', top:'50%',
              width: 36, height: 36, marginLeft:-18, marginTop:-18, background:'var(--wf-paper-2)' }}>
              <span style={{ fontSize: 16 }}>⇆</span>
            </div>
          </div>
          <div className="wf-col wf-gap-8">
            <div className="hand" style={{ fontSize: 20, lineHeight: 1.1 }}>Looking sharp!</div>
            <div style={{ fontSize: 12, color:'var(--wf-ink-soft)' }}>Mode: Golden Hour · 8.3s</div>
            <span className="wf-btn primary" style={{ marginTop: 6 }}>⤓ Download HD</span>
            <span className="wf-btn warm">↻ Enhance Again</span>
            <span className="wf-btn ghost" style={{ border:'1.5px solid var(--wf-line)' }}>Try another mode</span>
            <div className="wf-rule" />
            <div className="mono" style={{ fontSize: 10, color:'var(--wf-ink-soft)' }}>
              4032×3024 · 2.4MB
            </div>
            <div className="wf-row wf-gap-6" style={{ marginTop: 4 }}>
              <span className="wf-pill" style={{ fontSize: 10 }}>📋 copy</span>
              <span className="wf-pill" style={{ fontSize: 10 }}>↗ share</span>
            </div>
          </div>
        </div>
        <WFAnno x={300} y={130} w={140} rotate={-4}
          arrowTo={{ d:"M 0 0 Q -20 30 -40 50", tx:-40, ty:50 }}>
          drag handle to scrub between B / A
        </WFAnno>
      </div>
    </div>
  );
}

function ResultB() {
  // Time dial (Restore-themed but works for any mode)
  return (
    <div className="wf">
      <div style={{ padding: '24px 36px' }}>
        <WFSectionLabel>Result · Time dial (wild)</WFSectionLabel>
        <div className="hand" style={{ fontSize: 16, color:'var(--wf-ink-soft)' }}>
          turn the dial — see your photo morph at every level
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap: 18, marginTop: 12, alignItems:'flex-start' }}>
          <WFPhoto label="photo · enhanced at level 7" w="100%" h={250} tint="var(--wf-sage)" />
          <div className="wf-col wf-gap-8">
            <div className="wf-stamp">ENHANCEMENT LEVEL</div>
            <div className="hand" style={{ fontSize: 42, lineHeight:1, color:'#8a4a2a' }}>07</div>
            <div style={{ fontSize: 12, color:'var(--wf-ink-soft)', marginTop: -4 }}>of 10 · sweet spot ✓</div>
            {/* Dial */}
            <div style={{ position:'relative', width: 180, height: 110, marginTop: 6 }}>
              <svg viewBox="0 0 180 110" width="180" height="110">
                <path d="M 10 100 A 80 80 0 0 1 170 100" fill="none" stroke="var(--wf-line)" strokeWidth="1.5" />
                {Array.from({length: 11}).map((_,i) => {
                  const a = Math.PI - (i/10)*Math.PI;
                  const x1 = 90 + Math.cos(a)*78, y1 = 100 - Math.sin(a)*78;
                  const x2 = 90 + Math.cos(a)*88, y2 = 100 - Math.sin(a)*88;
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--wf-line)" strokeWidth={i===7?2:1} />;
                })}
                {/* Needle */}
                <line x1="90" y1="100" x2={90 + Math.cos(Math.PI - 0.7*Math.PI)*70} y2={100 - Math.sin(Math.PI - 0.7*Math.PI)*70}
                  stroke="#8a4a2a" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="90" cy="100" r="6" fill="var(--wf-mustard)" stroke="var(--wf-line)" strokeWidth="1.2" />
              </svg>
              <div className="mono" style={{ position:'absolute', left:0, bottom:-14, fontSize: 9, color:'var(--wf-ink-soft)' }}>raw</div>
              <div className="mono" style={{ position:'absolute', right:0, bottom:-14, fontSize: 9, color:'var(--wf-ink-soft)' }}>full Janca</div>
            </div>
            <div className="wf-row wf-gap-6" style={{ marginTop: 18 }}>
              <span className="wf-btn primary" style={{ fontSize: 12 }}>⤓ Save</span>
              <span className="wf-btn" style={{ fontSize: 12 }}>↻ Re-mode</span>
            </div>
          </div>
        </div>
        <WFAnno x={420} y={400} w={170} rotate={-3}
          arrowTo={{ d:"M 30 -10 Q 0 -30 -30 -50", tx:-30, ty:-50 }}>
          dial = single-slider Jancadoes strength. discrete tick stops with haptic feel.
        </WFAnno>
      </div>
    </div>
  );
}

function ResultC() {
  // Peel reveal
  return (
    <div className="wf">
      <div style={{ padding: '24px 36px' }}>
        <WFSectionLabel>Result · Peel-back reveal (wild)</WFSectionLabel>
        <div className="hand" style={{ fontSize: 16, color:'var(--wf-ink-soft)' }}>
          peel back the corner — like polaroid film, see the after underneath
        </div>
        <div style={{ position:'relative', marginTop: 12, height: 290 }}>
          {/* After (underneath) */}
          <div style={{ position:'absolute', left: 60, top: 10, width: 440, height: 270,
            border:'1.5px solid var(--wf-line)', borderRadius: 14,
            background:`repeating-linear-gradient(45deg, transparent 0 10px, rgba(184,200,156,.6) 10px 11px),
                        repeating-linear-gradient(-45deg, transparent 0 10px, rgba(233,201,106,.4) 10px 11px),
                        var(--wf-paper-2)`,
            boxShadow:'4px 5px 0 -1px var(--wf-line)' }}>
            <div className="wf-stamp" style={{ position:'absolute', left: 14, bottom: 14, background:'var(--wf-mustard)' }}>AFTER</div>
          </div>
          {/* Before (on top, with peeled corner) */}
          <div style={{ position:'absolute', left: 60, top: 10, width: 440, height: 270,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 38% 100%, 0 62%)',
            border:'1.5px solid var(--wf-line)', borderRadius: 14,
            background:`repeating-linear-gradient(45deg, transparent 0 10px, var(--wf-hatch) 10px 11px), var(--wf-paper-2)` }}>
            <div className="wf-stamp" style={{ position:'absolute', left: 14, top: 14 }}>BEFORE</div>
          </div>
          {/* Peel triangle */}
          <svg style={{ position:'absolute', left: 60, top: 10 }} width="200" height="270" viewBox="0 0 200 270">
            <path d="M 0 168 L 168 270 L 0 270 Z" fill="var(--wf-paper)" stroke="var(--wf-line)" strokeWidth="1.5" />
            <path d="M 0 168 L 168 270" fill="none" stroke="var(--wf-line)" strokeWidth="1" strokeDasharray="3 3" />
          </svg>
          {/* Compare toolbar */}
          <div style={{ position:'absolute', right: 20, top: 10, width: 180 }} className="wf-col wf-gap-8">
            <span className="wf-btn primary" style={{ fontSize: 12 }}>⤓ Download</span>
            <span className="wf-btn warm" style={{ fontSize: 12 }}>↻ Enhance Again</span>
            <span className="wf-pill" style={{ fontSize: 11 }}>◐ peel · hold</span>
            <span className="wf-pill" style={{ fontSize: 11 }}>⇆ slider compare</span>
            <span className="wf-pill" style={{ fontSize: 11 }}>▦ side by side</span>
            <div className="mono" style={{ fontSize: 10, color:'var(--wf-ink-soft)', marginTop: 4 }}>
              tap any to swap views
            </div>
          </div>
        </div>
        <WFAnno x={50} y={350} w={180} rotate={-2}
          arrowTo={{ d:"M 60 -10 Q 90 -40 130 -70", tx:130, ty:-70 }}>
          drag corner to control peel amount. release = snaps to fully revealed.
        </WFAnno>
      </div>
    </div>
  );
}

// ─── HISTORY ────────────────────────────────────────────────────────

const HIST = [
  { d: 'today · 14:32', mode: 'Golden Hour', tag:'warm' },
  { d: 'today · 11:08', mode: 'Restore Old', tag:'tan' },
  { d: 'yesterday',     mode: 'Phone → Studio', tag:'sage' },
  { d: '2d ago',        mode: '4K Enhancer', tag:'warm' },
  { d: '3d ago',        mode: 'Remove People', tag:'tan' },
  { d: '5d ago',        mode: 'Watermark', tag:'sage' },
];

function HistoryA() {
  return (
    <div className="wf">
      <div style={{ padding: '24px 36px' }}>
        <WFSectionLabel>Recent History · Gallery grid</WFSectionLabel>
        <div className="wf-row" style={{ justifyContent:'space-between', alignItems:'baseline' }}>
          <div className="hand" style={{ fontSize: 16, color:'var(--wf-ink-soft)' }}>your last 30 enhancements</div>
          <div className="wf-row wf-gap-6">
            <span className="wf-pill">All</span>
            <span className="wf-pill warm">Golden Hour</span>
            <span className="wf-pill">Restore</span>
            <span className="wf-pill">Upscale</span>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 12, marginTop: 14 }}>
          {HIST.map((h,i) => (
            <div key={i} className="wf-card" style={{ padding: 8, position:'relative' }}>
              <WFPhoto w="100%" h={120} label="" />
              <div className="wf-row" style={{ justifyContent:'space-between', marginTop: 6 }}>
                <span className="hand" style={{ fontSize: 14 }}>{h.mode}</span>
                <span className={`wf-pill ${h.tag}`} style={{ fontSize: 10, padding:'1px 5px' }}>✓</span>
              </div>
              <div className="mono" style={{ fontSize: 10, color:'var(--wf-ink-soft)' }}>{h.d}</div>
              <div className="wf-row wf-gap-4" style={{ marginTop: 6 }}>
                <span className="wf-pill" style={{ fontSize: 10, padding:'1px 5px' }}>⤓</span>
                <span className="wf-pill" style={{ fontSize: 10, padding:'1px 5px' }}>↻</span>
                <span className="wf-pill" style={{ fontSize: 10, padding:'1px 5px' }}>↗</span>
              </div>
            </div>
          ))}
        </div>
        <WFAnno x={520} y={120} w={140} rotate={3}
          arrowTo={{ d:"M 0 10 Q -20 30 -40 50", tx:-40, ty:50 }}>
          quick filter by mode used
        </WFAnno>
      </div>
    </div>
  );
}

function HistoryB() {
  // Vertical timeline
  return (
    <div className="wf">
      <div style={{ padding: '24px 36px' }}>
        <WFSectionLabel>Recent History · Timeline</WFSectionLabel>
        <div className="hand" style={{ fontSize: 16, color:'var(--wf-ink-soft)' }}>everything you've enhanced, chronological</div>
        <div style={{ position:'relative', marginTop: 14, paddingLeft: 80, paddingRight: 8 }}>
          {/* Timeline spine */}
          <div style={{ position:'absolute', left: 64, top: 0, bottom: 0, width: 1.5, background:'var(--wf-line)' }} />
          {HIST.map((h,i) => (
            <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 80px', gap: 16, marginBottom: 14, position:'relative' }}>
              <div className="mono" style={{ position:'absolute', left:-80, top: 12, width: 60, textAlign:'right',
                fontSize: 11, color:'var(--wf-ink-soft)' }}>{h.d}</div>
              <div className="wf-circle" style={{ position:'absolute', left:-22, top: 14, width: 14, height: 14,
                background: h.tag==='warm'?'var(--wf-mustard)':h.tag==='sage'?'var(--wf-sage)':'var(--wf-tan)',
                border:'1.5px solid var(--wf-line)' }} />
              <div className="wf-card" style={{ padding: 10, display:'grid', gridTemplateColumns:'80px 1fr', gap: 10 }}>
                <WFPhoto w={80} h={56} label="" />
                <div>
                  <div className="hand" style={{ fontSize: 15 }}>{h.mode}</div>
                  <div className="mono" style={{ fontSize: 10, color:'var(--wf-ink-soft)' }}>4032×3024 · 2.4MB</div>
                  <div className="wf-row wf-gap-4" style={{ marginTop: 4 }}>
                    <span className="wf-pill" style={{ fontSize: 9, padding:'1px 4px' }}>⤓</span>
                    <span className="wf-pill" style={{ fontSize: 9, padding:'1px 4px' }}>↻ redo</span>
                    <span className="wf-pill" style={{ fontSize: 9, padding:'1px 4px' }}>compare</span>
                  </div>
                </div>
              </div>
              <div />
            </div>
          ))}
        </div>
        <WFAnno x={500} y={120} w={150} rotate={4}
          arrowTo={{ d:"M 0 10 Q -30 30 -60 50", tx:-60, ty:50 }}>
          dot color = mode category. inline redo.
        </WFAnno>
      </div>
    </div>
  );
}

function HistoryC() {
  // Film strip / contact sheet
  return (
    <div className="wf">
      <div style={{ padding: '24px 36px' }}>
        <WFSectionLabel>Recent History · Film strip (wild)</WFSectionLabel>
        <div className="hand" style={{ fontSize: 16, color:'var(--wf-ink-soft)' }}>
          your enhancements as a contact sheet — scrub left/right
        </div>
        {/* Film strip */}
        <div style={{ marginTop: 16, background:'#2a2520', border:'1.5px solid var(--wf-line)',
          borderRadius: 6, padding: '14px 8px', position:'relative' }}>
          {/* Sprocket holes top */}
          <div className="wf-row" style={{ justifyContent:'space-around', position:'absolute', left: 0, right: 0, top: 4 }}>
            {Array.from({length: 16}).map((_,i) =>
              <div key={i} style={{ width: 10, height: 5, background:'var(--wf-paper)', borderRadius: 1 }} />
            )}
          </div>
          <div className="wf-row" style={{ justifyContent:'space-around', position:'absolute', left: 0, right: 0, bottom: 4 }}>
            {Array.from({length: 16}).map((_,i) =>
              <div key={i} style={{ width: 10, height: 5, background:'var(--wf-paper)', borderRadius: 1 }} />
            )}
          </div>
          <div className="wf-row wf-gap-6" style={{ padding: '14px 4px', overflow:'hidden' }}>
            {HIST.concat(HIST).slice(0,7).map((h,i) => (
              <div key={i} style={{ flex: '0 0 130px', position:'relative' }}>
                <WFPhoto w={130} h={92} label="" tint={i===2?'var(--wf-sage)':undefined} />
                <div className="mono" style={{ position:'absolute', left: 4, top: 4, fontSize: 8,
                  background:'rgba(0,0,0,.6)', color:'#fff', padding:'1px 4px', borderRadius: 2 }}>
                  #{String(28-i).padStart(3,'0')}
                </div>
                <div className="mono" style={{ fontSize: 9, color:'var(--wf-paper-2)', marginTop: 4, textAlign:'center' }}>
                  {h.mode}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Lightbox info for selected */}
        <div className="wf-row wf-gap-12" style={{ marginTop: 14, alignItems:'center' }}>
          <div className="wf-stamp">FRAME #026</div>
          <div className="hand" style={{ fontSize: 16 }}>Phone → Studio</div>
          <div className="mono" style={{ fontSize: 11, color:'var(--wf-ink-soft)' }}>yesterday · 4032×3024</div>
          <div className="wf-row wf-gap-6" style={{ marginLeft:'auto' }}>
            <span className="wf-btn warm" style={{ fontSize: 12 }}>↻ Redo</span>
            <span className="wf-btn primary" style={{ fontSize: 12 }}>⤓ Download</span>
          </div>
        </div>
        <WFAnno x={36} y={130} w={170} rotate={-3}
          arrowTo={{ d:"M 40 30 Q 80 50 110 70", tx:110, ty:70 }}>
          horizontal scroll. selected frame brightens; rest dim. very tactile.
        </WFAnno>
      </div>
    </div>
  );
}

Object.assign(window, {
  ProcessingA, ProcessingB, ProcessingC,
  ResultA, ResultB, ResultC,
  HistoryA, HistoryB, HistoryC,
});
