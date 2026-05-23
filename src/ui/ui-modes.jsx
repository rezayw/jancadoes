// ui-modes.jsx — modes showcase + interactive Try-it flow.
// The Try-it flow does real work: it uploads the photo to /api/enhance,
// which applies the chosen mode's prompt (managed server-side).

const MODE_DATA = [
  { id:'studio',    name:'Phone → Studio',      desc:'Studio lighting + clean background',     icon:'ModeStudio',    tint:'studio', color:'sage' },
  { id:'lighting',  name:'Correct Lighting',    desc:'Fix exposure, recover shadows',          icon:'ModeLighting',  tint:'cool',   color:'sage' },
  { id:'golden',    name:'Golden Hour',         desc:'Warm portrait glow, soft skin tones',    icon:'ModeGolden',    tint:'golden', color:'warm', featured:true },
  { id:'restore',   name:'Restore Old',         desc:'Repair scratches, blur, and color fade', icon:'ModeRestore',   tint:'dusk',   color:'tan' },
  { id:'people',    name:'Remove People',       desc:'Clear backgrounds from photo bombs',     icon:'ModePeople',    tint:'cool',   color:'sage' },
  { id:'watermark', name:'Remove Watermark',    desc:'Auto-detect + erase watermarks cleanly', icon:'ModeWatermark', tint:'warm',   color:'tan' },
  { id:'fourk',     name:'4K Enhancer',         desc:'Upscale resolution up to 4× with detail',icon:'Mode4K',        tint:'warm',   color:'warm' },
  { id:'rembrandt', name:'B&W Rembrandt',       desc:'Moody studio portrait, single light',    icon:'ModeRembrandt', tint:'dusk',   color:'tan' },
  { id:'cinematic', name:'Cinematic',           desc:'Dark fine-art editorial mood',           icon:'ModeCinematic', tint:'cool',   color:'sage' },
  { id:'aesthetic', name:'Aesthetic Full-Body', desc:'Outdoor messy aesthetic full-body',      icon:'ModeAesthetic', tint:'warm',   color:'pink' },
  { id:'minimal',   name:'Soft Minimalist',     desc:'Bright, airy editorial portrait',        icon:'ModeMinimal',   tint:'studio', color:'warm' },
];

// Resolve a mode id to display data. 'auto' has no card, so synthesize one.
function resolveMode(id) {
  return MODE_DATA.find(m => m.id === id) || {
    id:'auto', name:'Auto-pick', desc:'Best mode, auto-detected',
    icon:'Sparkle', tint:'golden', color:'sage',
  };
}

function ModesSection({ onPick }) {
  const auth = useAuth();
  // On the landing page, picking a mode sends you (via login if needed)
  // to the /app workspace.
  const pick = onPick || (() => auth.requireAuth(() => { window.location.href = '/app'; }));
  return (
    <section id="features" className="modes">
      <div className="container">
        <div className="modes-head">
          <div>
            <span className="eyebrow"><span className="dot" /> {MODE_DATA.length} Modes</span>
            <h2 className="h-section" style={{ marginTop: 14, maxWidth: 760 }}>
              One model, <em>{MODE_DATA.length}</em> different ways to make<br/>your photo look better.
            </h2>
          </div>
          <p className="muted" style={{ maxWidth: 360, fontSize: 15, lineHeight: 1.55 }}>
            Setiap mode dilatih untuk satu pekerjaan — bukan satu filter yang dipaksa cocok semua foto.
          </p>
        </div>

        <div className="modes-grid">
          {MODE_DATA.map((m,i) => {
            const I = Icon[m.icon];
            return (
              <article key={m.id} className={"card lift mode-card " + (m.featured ? 'featured' : '')}
                style={{ '--mode-color': `var(--${m.color})`, '--mode-soft': `var(--${m.color}-soft)` }}>
                <div className="mode-card-top">
                  <div className="mode-thumb">
                    <div className={"ph " + m.tint} style={{ width:'100%', height:'100%' }}>
                      <img className={"ph-photo" + (m.id === 'restore' ? ' aged' : '')}
                        src={`assets/samples/${m.id}.jpg`} alt={m.name} />
                    </div>
                    <div className="mode-thumb-overlay">
                      <span className="chip" style={{ background:'rgba(0,0,0,.45)', color:'#fff', backdropFilter:'blur(8px)', border:'none' }}>
                        <span className="mode-num mono">{String(i+1).padStart(2,'0')}</span>
                        before · after
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mode-card-body">
                  <div className="mode-icon">
                    <I />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 600, letterSpacing:'-.01em' }}>{m.name}</h3>
                    <p className="muted" style={{ fontSize: 13, lineHeight: 1.45, marginTop: 4 }}>{m.desc}</p>
                  </div>
                  <button className="mode-go" onClick={() => pick(m.id)}>
                    <Icon.Arrow />
                  </button>
                </div>
                {m.featured && <span className="mode-flag">
                  <Icon.Star /> popular
                </span>}
              </article>
            );
          })}

          {/* Auto-pick card */}
          <article className="card lift mode-card mode-auto">
            <div className="mode-auto-inner">
              <img src="assets/mascot-icon.png" alt="" className="mode-auto-mascot" />
              <h3 style={{ fontSize: 19, fontWeight: 600, marginTop: 14, letterSpacing:'-.01em', fontFamily:'var(--f-display)', color:'var(--sage-deep)' }}>
                Let Jancadoes decide
              </h3>
              <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.5, marginTop: 6, maxWidth: 220 }}>
                Auto-detect the best mode for your photo. Tinggal upload, sisanya kami yang urus.
              </p>
              <button className="btn sage sm" style={{ marginTop: 18 }} onClick={() => pick('auto')}>
                Try auto-pick <Icon.Arrow width="14" height="14" />
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

// ─── Interactive Try-it flow ────────────────────────────────────────
// upload → choose mode → processing (real /api/enhance call) → result.

function TryFlow() {
  const auth = useAuth();
  const [stage, setStage] = React.useState('upload'); // upload | choose | processing | result
  const [mode, setMode] = React.useState('golden');
  const [progress, setProgress] = React.useState(0);

  const [file, setFile] = React.useState(null);
  const [beforeUrl, setBeforeUrl] = React.useState(null);
  const [afterUrl, setAfterUrl] = React.useState(null);
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [uploadErr, setUploadErr] = React.useState(null);

  const pickFile = (f) => {
    if (!f) return;
    if (!f.type || !f.type.startsWith('image/')) {
      setUploadErr('That file isn’t an image — use JPG, PNG, or WEBP.');
      return;
    }
    if (f.size > 25 * 1024 * 1024) {
      setUploadErr('Image is too large — maximum size is 25 MB.');
      return;
    }
    setUploadErr(null);
    if (beforeUrl) URL.revokeObjectURL(beforeUrl);
    setFile(f);
    setBeforeUrl(URL.createObjectURL(f));
    setAfterUrl(null);
    setResult(null);
    setError(null);
    setStage('choose');
  };

  // Real enhancement: animate progress while /api/enhance runs.
  React.useEffect(() => {
    if (stage !== 'processing' || !file) return;
    let cancelled = false;
    setProgress(0);
    setError(null);

    // Realistic asymptotic ramp — approaches 92% over a ~150–200s wait,
    // so the bar stays alive throughout instead of stalling after seconds.
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      setProgress(Math.min(92, 92 * (1 - Math.exp(-elapsed / 90))));
    }, 500);

    const form = new FormData();
    form.append('image', file);
    form.append('mode', mode);

    fetch('/api/enhance', {
      method: 'POST',
      headers: { Authorization: `Bearer ${auth.token() || ''}` },
      body: form,
    })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (r.status === 401) {
          auth.logout(); // stale/expired session — drop it and bounce to sign-in
          throw new Error('Your session expired — please sign in again.');
        }
        if (!r.ok) throw new Error(data.error || `Request failed (${r.status})`);
        return data;
      })
      .then((data) => {
        if (cancelled) return;
        clearInterval(tick);
        setProgress(100);
        setAfterUrl(data.image);
        setResult(data);
        if (data.mode) setMode(data.mode); // 'auto' resolves to a real mode
        setTimeout(() => { if (!cancelled) setStage('result'); }, 420);
      })
      .catch((err) => {
        if (cancelled) return;
        clearInterval(tick);
        setError(err.message);
        setStage('result');
      });

    return () => { cancelled = true; clearInterval(tick); };
  }, [stage]);

  const pickedMode = resolveMode(mode);

  return (
    <section id="try" className="try">
      <div className="container">
        <div className="modes-head" style={{ alignItems:'flex-end' }}>
          <div>
            <span className="eyebrow"><span className="dot" style={{ background:'var(--tan)' }}/> Try it · live demo</span>
            <h2 className="h-section" style={{ marginTop: 14 }}>
              From bad photo to <em>beautiful</em><br/>powered by Jancadoes AI.
            </h2>
          </div>
          <div className="try-steps">
            {['upload','choose','processing','result'].map((s, i) => (
              <div key={s} className={"try-step " + (stage===s ? 'active' : '') + (
                ['upload','choose','processing','result'].indexOf(stage) > i ? ' done' : ''
              )}>
                <span className="try-step-dot">{i+1}</span>
                <span className="try-step-label">
                  {['Upload','Choose mode','Processing','Result'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="try-stage card">
          {!auth.ready
            ? <div className="stage stage-locked"><div className="locked-inner muted">Loading…</div></div>
            : !auth.user
              ? <StageLocked />
              : <>
                  {stage === 'upload' && <StageUpload onFile={pickFile} error={uploadErr} />}
                  {stage === 'choose' && <StageChoose mode={mode} setMode={setMode}
                    beforeUrl={beforeUrl} fileName={file && file.name}
                    onNext={() => setStage('processing')} onBack={() => setStage('upload')} />}
                  {stage === 'processing' && <StageProcessing mode={pickedMode} progress={progress} beforeUrl={beforeUrl} />}
                  {stage === 'result' && <StageResult mode={pickedMode} result={result} error={error}
                    beforeUrl={beforeUrl} afterUrl={afterUrl}
                    onAgain={() => setStage('choose')} onReset={() => setStage('upload')}
                    onRetry={() => setStage('processing')} />}
                </>}
        </div>
      </div>
    </section>
  );
}

// Shown inside the Try-it flow when no one is signed in — the enhancer
// is gated behind register/login.
function StageLocked() {
  const auth = useAuth();
  const steps = [
    { n: '1', t: 'Create a free account', d: 'Email + password, no card needed.' },
    { n: '2', t: 'Upload or snap a photo', d: 'From your device or the camera.' },
    { n: '3', t: 'Pick a mode & enhance', d: 'Jancadoes AI does the rest.' },
  ];
  return (
    <div className="stage stage-locked">
      <div className="locked-inner">
        <div className="dropzone-orb"><Icon.Lock width="26" height="26" /></div>
        <h3 className="locked-title">Sign in to start enhancing</h3>
        <p className="muted locked-lead">
          Daftar dulu (gratis) untuk upload &amp; memproses fotomu dengan Jancadoes AI.
        </p>
        <div className="locked-cta">
          <button className="btn primary lg" onClick={() => auth.openAuth('register')}>
            <Icon.Sparkle width="16" height="16" /> Create free account
          </button>
          <button className="btn lg" onClick={() => auth.openAuth('login')}>Log in</button>
        </div>
        <div className="locked-steps">
          {steps.map((s) => (
            <div key={s.n} className="locked-step">
              <span className="locked-step-num mono">{s.n}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{s.t}</div>
                <div className="muted" style={{ fontSize: 12.5 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Live camera viewfinder — getUserMedia, matches wireframe "Upload · Camera".
function CameraCapture({ onCapture }) {
  const videoRef = React.useRef(null);
  const [error, setError] = React.useState(null);
  const [facing, setFacing] = React.useState('user');
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let live = true;
    let stream = null;
    setReady(false);
    setError(null);
    navigator.mediaDevices.getUserMedia({ video: { facingMode: facing }, audio: false })
      .then((s) => {
        if (!live) { s.getTracks().forEach((t) => t.stop()); return; }
        stream = s;
        if (videoRef.current) videoRef.current.srcObject = s;
        setReady(true);
      })
      .catch((err) => {
        if (live) setError(err && err.name === 'NotAllowedError'
          ? 'Akses kamera ditolak. Izinkan kamera di browser, atau pakai tab Upload.'
          : 'Kamera tidak tersedia di perangkat ini. Pakai tab Upload.');
      });
    return () => { live = false; if (stream) stream.getTracks().forEach((t) => t.stop()); };
  }, [facing]);

  const shoot = () => {
    const v = videoRef.current;
    if (!v || !v.videoWidth) return;
    const canvas = document.createElement('canvas');
    canvas.width = v.videoWidth;
    canvas.height = v.videoHeight;
    canvas.getContext('2d').drawImage(v, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) onCapture(new File([blob], `camera-${Date.now()}.png`, { type: 'image/png' }));
    }, 'image/png');
  };

  if (error) {
    return (
      <div className="camera-view camera-error">
        <Icon.Camera width="30" height="30" />
        <p className="muted" style={{ maxWidth: 280, textAlign: 'center' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="camera-view">
      <video ref={videoRef} autoPlay playsInline muted />
      <div className="camera-hud">
        <span className="chip" style={{ background:'rgba(0,0,0,.55)', color:'#fff', border:'none' }}>
          <span className="dot" style={{ background: ready ? 'var(--warm)' : 'var(--ink-mute)' }} />
          {ready ? 'live' : 'starting camera…'}
        </span>
      </div>
      <div className="camera-controls">
        <button className="cam-btn" onClick={() => setFacing((f) => (f === 'user' ? 'environment' : 'user'))}
          title="Flip camera" type="button">↻</button>
        <button className="cam-shutter" onClick={shoot} disabled={!ready}
          aria-label="Take photo" type="button" />
        <span style={{ width: 44 }} />
      </div>
    </div>
  );
}

function StageUpload({ onFile, error }) {
  const [tab, setTab] = React.useState('upload'); // upload | camera
  const [drag, setDrag] = React.useState(false);
  const inputRef = React.useRef(null);
  const open = () => inputRef.current && inputRef.current.click();

  // The landing page's "Try Camera" deep-links here via /app#camera.
  React.useEffect(() => {
    if (window.location.hash === '#camera') setTab('camera');
  }, []);

  return (
    <div className="stage stage-upload">
      <div className="stage-left">
        <h3 style={{ fontSize: 24, fontWeight: 600, letterSpacing:'-.02em' }}>Add a photo</h3>
        <p className="muted" style={{ marginTop: 6 }}>Upload dari perangkat, atau ambil langsung pakai kamera.</p>

        <div className="upload-tabs">
          <button className={tab === 'upload' ? 'active' : ''} onClick={() => setTab('upload')}>
            <Icon.Upload width="15" height="15" /> Upload
          </button>
          <button className={tab === 'camera' ? 'active' : ''} onClick={() => setTab('camera')}>
            <Icon.Camera width="15" height="15" /> Camera
          </button>
        </div>

        <input ref={inputRef} type="file" accept="image/*" hidden
          onChange={(e) => { onFile(e.target.files[0]); e.target.value = ''; }} />

        {tab === 'upload' ? (
          <>
            <div
              className={"dropzone " + (drag ? 'drag' : '')}
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); onFile(e.dataTransfer.files[0]); }}
              onClick={open}
            >
              <div className="dropzone-orb">
                <Icon.Upload width="28" height="28" />
              </div>
              <div className="dropzone-title">Drag &amp; drop your photo</div>
              <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>or click to browse</div>
              <div className="dropzone-meta mono">JPG · PNG · WEBP · up to 25MB</div>
            </div>
            <div className="upload-actions">
              <button className="btn" onClick={open}><Icon.Upload width="16" height="16" /> Browse files</button>
              <button className="btn warm" onClick={() => setTab('camera')}>
                <Icon.Camera width="16" height="16" /> Open Camera
              </button>
            </div>
          </>
        ) : (
          <CameraCapture onCapture={onFile} />
        )}
        {error && <div className="upload-error">{error}</div>}
      </div>
      <div className="stage-right">
        <div className="upload-tips card" style={{ background:'var(--bg-soft)' }}>
          <div className="eyebrow"><span className="dot" /> Tips</div>
          <ul className="tip-list">
            <li><Icon.Check /> Original / un-cropped photos work best</li>
            <li><Icon.Check /> Minimum 800 × 600 recommended</li>
            <li><Icon.Check /> Avoid pre-applied filters first</li>
            <li><Icon.Lock /> Processed in-memory · not stored, not used for training</li>
          </ul>
        </div>
        <div className="upload-recent">
          <div className="muted mono" style={{ fontSize: 11, letterSpacing:'.1em', textTransform:'uppercase' }}>
            Powered by Jancadoes AI
          </div>
          <p className="muted" style={{ fontSize: 12.5, lineHeight: 1.5, marginTop: 8 }}>
            Each mode is tuned for one job — restore, relight, upscale — for results
            that match what you actually asked for.
          </p>
        </div>
      </div>
    </div>
  );
}

function StageChoose({ mode, setMode, beforeUrl, fileName, onNext, onBack }) {
  const autoActive = mode === 'auto';
  return (
    <div className="stage stage-choose">
      <div className="choose-preview">
        {beforeUrl
          ? <img src={beforeUrl} alt="your upload" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
          : <div className="ph cool" style={{ width:'100%', height:'100%' }}><div className="subject" /></div>}
        <span className="chip" style={{ position:'absolute', bottom:14, left:14, background:'rgba(0,0,0,.5)', color:'#fff', border:'none', backdropFilter:'blur(8px)', maxWidth:'80%' }}>
          your photo · {fileName || 'upload'}
        </span>
        <button className="btn ghost sm choose-back" onClick={onBack}>
          ← Replace photo
        </button>
      </div>
      <div className="choose-list">
        <div className="eyebrow"><span className="dot" /> Pilih mode enhancement</div>
        <h3 style={{ fontSize: 22, fontWeight: 600, marginTop: 8, letterSpacing:'-.02em' }}>
          Which look are you going for?
        </h3>
        <div className="choose-modes">
          <button className={"choose-mode " + (autoActive ? 'active' : '')} onClick={() => setMode('auto')}>
            <span className="cm-icon"><Icon.Sparkle /></span>
            <span className="cm-text">
              <span className="cm-name">Auto-pick</span>
              <span className="cm-desc muted">Let Jancadoes detect the best mode</span>
            </span>
            <span className="cm-num mono">★</span>
            {autoActive && <span className="cm-check"><Icon.Check /></span>}
          </button>
          {MODE_DATA.map((m,i) => {
            const I = Icon[m.icon];
            const active = m.id === mode;
            return (
              <button key={m.id} className={"choose-mode " + (active ? 'active' : '')} onClick={() => setMode(m.id)}>
                <span className="cm-icon"><I /></span>
                <span className="cm-text">
                  <span className="cm-name">{m.name}</span>
                  <span className="cm-desc muted">{m.desc}</span>
                </span>
                <span className="cm-num mono">{String(i+1).padStart(2,'0')}</span>
                {active && <span className="cm-check"><Icon.Check /></span>}
              </button>
            );
          })}
        </div>
        <div className="choose-cta">
          <button className="btn primary lg" onClick={onNext}>
            <Icon.Sparkle width="16" height="16" />
            Enhance with {resolveMode(mode).name}
          </button>
          <span className="muted mono" style={{ fontSize: 11 }}>real AI · ~15–40 seconds</span>
        </div>
      </div>
    </div>
  );
}

function StageProcessing({ mode, progress, beforeUrl }) {
  const I = Icon[mode.icon];
  const steps = [
    { label: 'Validate input',         at: 0   },
    { label: 'Upload to Jancadoes',    at: 14  },
    { label: 'Tune enhancement',       at: 34  },
    { label: 'Jancadoes AI inference', at: 56  },
    { label: 'Render & deliver',       at: 86  },
  ];
  return (
    <div className="stage stage-processing">
      <div className="proc-preview">
        {beforeUrl
          ? <img src={beforeUrl} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
          : <div className={"ph " + mode.tint} style={{ position:'absolute', inset:0 }}><div className="subject" /></div>}
        <div className="proc-scan" />
        <div className="proc-grid" />
        <div className="proc-hud">
          <span className="chip" style={{ background:'rgba(0,0,0,.5)', color:'#fff', backdropFilter:'blur(8px)', border:'none' }}>
            <span className="dot" style={{ background:'var(--warm)' }} />
            {mode.name}
          </span>
          <span className="chip" style={{ background:'rgba(0,0,0,.5)', color:'#fff', backdropFilter:'blur(8px)', border:'none' }}>
            {Math.round(progress)}%
          </span>
        </div>
      </div>
      <div className="proc-side">
        <div className="proc-mode-pill">
          <span className="proc-mode-icon"><I /></span>
          <div>
            <div className="muted mono" style={{ fontSize: 10, letterSpacing:'.1em' }}>MODE</div>
            <div style={{ fontWeight: 600, fontSize: 16 }}>{mode.name}</div>
          </div>
        </div>
        <h3 style={{ fontSize: 24, fontWeight: 600, marginTop: 18, letterSpacing:'-.02em' }}>
          Enhancing your image<span className="proc-dots"><span/><span/><span/></span>
        </h3>
        <p className="muted">Ultra quality butuh ~2–3 menit. Jangan tutup tab — hasilnya keluar sebentar lagi.</p>

        <div className="progress">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="mono" style={{ display:'flex', justifyContent:'space-between', fontSize: 11, color:'var(--ink-soft)', marginTop: 6 }}>
          <span>{Math.round(progress)}%</span>
          <span>{progress >= 92 ? 'finishing…' : 'working…'}</span>
        </div>

        <div className="proc-steps">
          {steps.map(s => {
            const state = progress >= s.at + 14 ? 'done' : progress >= s.at ? 'active' : 'wait';
            return (
              <div key={s.label} className={"proc-step " + state}>
                <span className="ps-dot">{state==='done' ? <Icon.Check /> : state==='active' ? <span className="ps-pulse"/> : null}</span>
                <span>{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StageResult({ mode, result, error, beforeUrl, afterUrl, onAgain, onReset, onRetry }) {
  const [dims, setDims] = React.useState(null);
  const afterRef = React.useRef(null);
  const handleRef = React.useRef(null);
  const draggingRef = React.useRef(false);

  if (error) {
    return (
      <div className="stage" style={{ gridTemplateColumns:'1fr', placeItems:'center', textAlign:'center' }}>
        <div style={{ maxWidth: 460 }}>
          <div className="dropzone-orb" style={{ margin:'0 auto', color:'var(--warm-deep)' }}>
            <Icon.Sparkle width="26" height="26" />
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 600, marginTop: 16, letterSpacing:'-.02em' }}>
            Enhancement hit a snag
          </h3>
          <p className="muted" style={{ marginTop: 8, lineHeight: 1.5 }}>{error}</p>
          <div className="result-actions" style={{ justifyContent:'center', marginTop: 22 }}>
            <button className="btn primary lg" onClick={onRetry}><Icon.Redo width="16" height="16" /> Try again</button>
            <button className="btn ghost sm" onClick={onReset}><Icon.Plus width="14" height="14" /> New photo</button>
          </div>
        </div>
      </div>
    );
  }

  // Smooth compare: drive the clip + handle straight from the DOM on drag,
  // so there's no React re-render per mouse move.
  const setSplit = (pct) => {
    pct = Math.max(0, Math.min(100, pct));
    if (afterRef.current) afterRef.current.style.clipPath = `inset(0 0 0 ${pct}%)`;
    if (handleRef.current) handleRef.current.style.left = `${pct}%`;
  };
  const splitFrom = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    setSplit(((cx - rect.left) / rect.width) * 100);
  };
  const onMove = (e) => { if (draggingRef.current) splitFrom(e); };
  const startDrag = (e) => { draggingRef.current = true; splitFrom(e); };
  const endDrag = () => { draggingRef.current = false; };

  const secs = result && result.ms ? (result.ms / 1000).toFixed(1) : null;

  return (
    <div className="stage stage-result">
      <div className="result-compare"
        onMouseDown={startDrag}
        onMouseMove={onMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={startDrag}
        onTouchMove={onMove}
        onTouchEnd={endDrag}
      >
        <img className="result-before" src={beforeUrl} alt="before" style={{ objectFit:'cover' }} />
        <img ref={afterRef} className="result-after" src={afterUrl} alt="after"
          onLoad={(e) => setDims({ w: e.target.naturalWidth, h: e.target.naturalHeight })}
          style={{ objectFit:'cover', clipPath: 'inset(0 0 0 58%)' }} />
        <span className="result-tag tag-before">Before</span>
        <span className="result-tag tag-after">After · {mode.name}</span>
        <div ref={handleRef} className="result-handle" style={{ left: '58%' }}>
          <span className="handle-bar" />
          <span className="handle-knob"><Icon.Compare width="16" height="16" /></span>
        </div>
      </div>
      <div className="result-side">
        <span className="chip sage">
          <Icon.Check /> {secs ? `Done in ${secs}s` : 'Done'}
        </span>
        <h3 style={{ fontSize: 26, fontWeight: 600, marginTop: 10, letterSpacing:'-.02em' }}>Looking sharp.</h3>
        <p className="muted">Drag the handle to compare. Suka? Download or try another mode.</p>

        <div className="result-actions">
          <a className="btn primary lg" href={afterUrl} download="jancadoes-enhanced.png">
            <Icon.Download width="18" height="18" /> Download
          </a>
          <button className="btn lg" onClick={onAgain}><Icon.Redo width="16" height="16" /> Enhance again</button>
          <button className="btn ghost sm" onClick={onReset}><Icon.Plus width="14" height="14" /> New photo</button>
        </div>
        <hr className="rule" style={{ margin: '20px 0' }} />
        <div className="result-meta mono">
          <div><span>mode</span><span>{(result && result.modeTitle) || mode.name}</span></div>
          <div><span>resolution</span><span>{dims ? `${dims.w} × ${dims.h}` : '—'}</span></div>
        </div>
        <div className="result-share">
          <span className="muted mono" style={{ fontSize: 10, letterSpacing:'.1em' }}>SHARE</span>
          <div className="share-btns">
            <button className="share-btn">𝕏</button>
            <button className="share-btn">Ig</button>
            <button className="share-btn">in</button>
            <button className="share-btn"><Icon.Share width="14" height="14" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.ModesSection = ModesSection;
window.TryFlow = TryFlow;
window.MODE_DATA = MODE_DATA;
