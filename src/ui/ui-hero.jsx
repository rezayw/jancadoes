// ui-hero.jsx — Nav + Hero section with avocado brand identity

// The enhance workspace lives on its own page (/app), gated by auth.
const goApp = (hash) => { window.location.href = '/app' + (hash || ''); };

function Nav({ variant }) {
  const auth = useAuth();
  const onApp = variant === 'app';
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={"nav " + (scrolled ? "scrolled" : "")}>
      <div className="nav-inner container">
        <a href={onApp ? '/app' : '#home'} className="logo">
          <img src="assets/mascot-icon.png" alt="" className="logo-mascot" />
          <span className="logo-word">Jancadoes</span>
        </a>
        <nav className="nav-links">
          {onApp ? (
            <>
              <a href="#try" className="active">Enhance</a>
              <a href="#gallery">History</a>
              <a href="/">Home</a>
            </>
          ) : (
            <>
              <a href="#home" className="active">Home</a>
              <a href="#features">Features</a>
              <a href="/app" onClick={(e) => { e.preventDefault(); auth.requireAuth(() => goApp()); }}>Try It</a>
            </>
          )}
        </nav>
        <div className="nav-cta">
          {auth.user ? (
            <div className="nav-user">
              <span className="nav-avatar">{(auth.user.name || '?').charAt(0).toUpperCase()}</span>
              <span className="nav-user-name">{auth.user.name}</span>
              {!onApp && (
                <a className="btn primary sm" href="/app">
                  Open app <Icon.Arrow width="14" height="14" />
                </a>
              )}
              <button className="btn ghost sm" onClick={auth.logout}>Log out</button>
            </div>
          ) : (
            <>
              <button className="btn ghost sm" onClick={() => auth.openAuth('login', () => goApp())}>Login</button>
              <button className="btn primary sm" onClick={() => auth.openAuth('register', () => goApp())}>
                Sign up free <Icon.Arrow width="14" height="14" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const auth = useAuth();
  // Both CTAs require an account first, then land on the /app workspace.
  // "Try Camera" deep-links to its camera tab via the URL hash.
  return (
    <section id="home" className="hero">
      {/* Floating decorations */}
      <Deco.Heart   size={22} className="deco heart float"        style={{ top: 90,  left: '6%'  }} />
      <Deco.Sparkle size={26} className="deco sparkle float-delay" style={{ top: 140, left: '46%' }} />
      <Deco.Heart   size={16} className="deco heart float-fast"    style={{ top: 350, left: '4%'  }} />
      <Deco.Leaf    size={28} rotate={-30} className="deco leaf float-delay" style={{ top: 60, right: '8%' }} />
      <Deco.Sparkle size={18} className="deco sparkle float"       style={{ top: 420, right: '4%' }} />
      <Deco.Leaf    size={22} rotate={140} className="deco leaf float-fast"  style={{ bottom: 80, left: '12%' }} />

      <div className="container hero-grid">
        <div className="hero-text">
          <span className="eyebrow">
            <span className="dot" />
            <span>Photo Enhancement · fresh as an avocado</span>
          </span>
          <h1 className="h-display" style={{ marginTop: 24 }}>
            Transform Your<br/>
            Photos <em>with</em><br/>
            <span className="brand-mark">Jancadoes</span>
            <Deco.Heart size={32} style={{ display:'inline-block', verticalAlign:'middle', marginLeft: 10 }} className="deco heart" />
          </h1>
          <p className="hero-sub muted">
            Studio-grade photo enhancement, but make it <strong style={{ color:'var(--sage-deep)' }}>cute</strong>.
            Restore old photos, fix bad lighting, upscale to 4K — tanpa skill editing,
            tanpa langganan ribet.
          </p>
          <div className="hero-cta">
            <button className="btn primary lg" onClick={() => auth.requireAuth(() => goApp())}>
              <Icon.Upload width="18" height="18" />
              Upload Photo
            </button>
            <button className="btn warm lg" onClick={() => auth.requireAuth(() => goApp('#camera'))}>
              <Icon.Camera width="18" height="18" />
              Try Camera
            </button>
          </div>
          <div className="hero-trust">
            <div className="trust-avatars">
              {[0,1,2,3].map(i =>
                <span key={i} className="trust-avatar" style={{
                  background: ['var(--lime)','var(--warm)','var(--pink)','var(--sage)'][i] }}>
                  <Deco.Avocado size={20} />
                </span>
              )}
            </div>
            <div className="trust-meta">
              <div className="trust-stars">
                {[0,1,2,3,4].map(i => <Icon.Star key={i} />)}
                <span className="mono" style={{ marginLeft: 8, color:'var(--ink-soft)', fontSize: 12 }}>4.9 · 8,200 reviews</span>
              </div>
              <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>
                <strong style={{ color:'var(--ink)' }}>12,481</strong> photos enhanced today
              </div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <HeroStack />
        </div>
      </div>

    </section>
  );
}

function HeroStack() {
  return (
    <div className="hero-stack">
      {/* Mascot — the friendly avocado */}
      <img src="assets/mascot-icon.png" alt="Jancadoes mascot" className="hero-mascot" />

      {/* Back card — "before" */}
      <div className="stack-card back">
        <div className="ph dusk" style={{ width:'100%', height:'100%' }}>
          <img className="ph-photo raw" src="assets/samples/hero.jpg" alt="before enhancement" />
          <span className="ph-lbl">before · iphone snap</span>
        </div>
      </div>

      {/* Main card — "after" */}
      <div className="stack-card main">
        <div className="ph golden" style={{ width:'100%', height:'100%' }}>
          <img className="ph-photo" src="assets/samples/hero.jpg" alt="after enhancement" />
          <div className="badge-after">
            <Deco.Sparkle size={14} />
            <span>Enhanced · Golden Hour</span>
          </div>
          <div className="hero-tag">
            <div className="ht-pill">
              <span className="ht-dot" /> Studio lighting · added
            </div>
            <div className="ht-pill">
              <span className="ht-dot" style={{ background:'var(--warm-deep)' }}/> Warm tones · +28%
            </div>
            <div className="ht-pill">
              <span className="ht-dot" style={{ background:'var(--pink)' }}/> Sharpness · 4K
            </div>
          </div>
        </div>
      </div>

      {/* Floating chips */}
      <div className="float-chip chip-1 glass">
        <div className="chip-spin" />
        <div>
          <div className="mono" style={{ fontSize: 10, letterSpacing:'.1em', color:'var(--ink-mute)' }}>PROCESSED</div>
          <div style={{ fontSize: 14, fontWeight: 700, color:'var(--ink)' }}>8.4 seconds</div>
        </div>
      </div>

      <div className="float-chip chip-2 glass">
        <Icon.ModeGolden style={{ color:'var(--warm-deep)' }}/>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.1, color:'var(--ink)' }}>Golden Hour</div>
          <div className="mono" style={{ fontSize: 10, color:'var(--ink-mute)' }}>mode · #03</div>
        </div>
      </div>

      <div className="float-chip chip-3 glass">
        <div className="chip-res">4K</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.1, color:'var(--ink)' }}>3840 × 2880</div>
          <div className="mono" style={{ fontSize: 10, color:'var(--ink-mute)' }}>upscale · 2.4×</div>
        </div>
      </div>

      <div className="hero-blob" />
    </div>
  );
}

window.Nav = Nav;
window.Hero = Hero;
