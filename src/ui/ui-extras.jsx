// ui-extras.jsx — Recent History gallery + Stats + Footer

const HISTORY = [
  { mode:'Golden Hour',     when:'today · 14:32', tint:'golden',  size:'4032×3024', img:'assets/samples/h1.jpg' },
  { mode:'Restore Old',     when:'today · 11:08', tint:'dusk',    size:'2400×1800', img:'assets/samples/h2.jpg' },
  { mode:'Phone → Studio',  when:'yesterday',     tint:'studio',  size:'4032×3024', img:'assets/samples/h3.jpg' },
  { mode:'4K Enhancer',     when:'2d ago',        tint:'warm',    size:'3840×2880', img:'assets/samples/h4.jpg' },
  { mode:'Remove People',   when:'3d ago',        tint:'cool',    size:'4032×3024', img:'assets/samples/h5.jpg' },
  { mode:'Watermark',       when:'5d ago',        tint:'warm',    size:'1920×1080', img:'assets/samples/h6.jpg' },
];

function HistorySection() {
  const [filter, setFilter] = React.useState('All');
  const filters = ['All','Golden Hour','Restore','Upscale','Phone → Studio'];
  return (
    <section id="gallery" className="history">
      <div className="container">
        <div className="modes-head" style={{ alignItems:'flex-end' }}>
          <div>
            <span className="eyebrow"><span className="dot" style={{ background:'var(--warm-deep)' }}/> Recent History</span>
            <h2 className="h-section" style={{ marginTop: 14 }}>
              Your last <em>enhancements</em>,<br/>always one click away.
            </h2>
          </div>
          <div className="hist-filters">
            {filters.map(f =>
              <button key={f} className={"chip " + (filter===f ? 'sage' : '')} onClick={() => setFilter(f)}>
                {f}
              </button>
            )}
          </div>
        </div>

        <div className="history-grid">
          {HISTORY.map((h,i) => (
            <article key={i} className="card lift hist-card">
              <div className="hist-thumb">
                <div className={"ph " + h.tint} style={{ width:'100%', height:'100%' }}>
                  <img className={"ph-photo" + (h.mode === 'Restore Old' ? ' aged' : '')}
                    src={h.img} alt={h.mode} />
                </div>
                <div className="hist-thumb-actions">
                  <button className="hist-action" title="Download"><Icon.Download width="16" height="16" /></button>
                  <button className="hist-action" title="Compare"><Icon.Compare width="16" height="16" /></button>
                  <button className="hist-action" title="Redo"><Icon.Redo width="16" height="16" /></button>
                  <button className="hist-action" title="Share"><Icon.Share width="16" height="16" /></button>
                </div>
              </div>
              <div className="hist-meta">
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{h.mode}</div>
                  <div className="muted mono" style={{ fontSize: 11, marginTop: 2 }}>{h.when} · {h.size}</div>
                </div>
                <span className="chip" style={{ fontSize: 10 }}>✓</span>
              </div>
            </article>
          ))}
          <article className="card hist-card hist-more">
            <div className="hist-more-inner">
              <Icon.Plus width="22" height="22" />
              <div style={{ fontWeight: 600, marginTop: 8 }}>See all 124</div>
              <div className="muted" style={{ fontSize: 12 }}>in your history</div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function StatsStrip() {
  const stats = [
    { n:'2.4M+',   l:'photos enhanced' },
    { n:'8.4s',    l:'avg processing time' },
    { n:'4.9 / 5', l:'user rating' },
    { n:'94%',     l:'users come back daily' },
  ];
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s,i) =>
            <div key={i} className="stat">
              <div className="stat-num">{s.n}</div>
              <div className="stat-lbl muted">{s.l}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  const auth = useAuth();
  return (
    <section className="cta-band">
      <div className="container">
        <div className="cta-inner">
          <div className="cta-bg" />
          <div style={{ position:'relative' }}>
            <span className="eyebrow" style={{ color:'rgba(255,255,255,.7)' }}>
              <span className="dot" style={{ background:'var(--warm)' }} /> Ready when you are
            </span>
            <h2 className="h-section" style={{ marginTop: 14, color:'#fff', maxWidth: 720 }}>
              Your photos deserve <em style={{ color:'var(--warm)' }}>better</em>.<br/>
              Mulai gratis — no credit card.
            </h2>
            <div className="hero-cta" style={{ marginTop: 28 }}>
              <button className="btn lg" style={{ background:'var(--warm)', borderColor:'var(--warm)', color:'var(--ink)' }}
                onClick={() => auth.requireAuth(() => { window.location.href = '/app'; })}>
                <Icon.Upload width="18" height="18" /> Try free now
              </button>
              <button className="btn ghost lg" style={{ color:'#fff', borderColor:'rgba(255,255,255,.3)' }}>
                See pricing →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  // Honest footer — only links to things that actually exist.
  const cols = [
    { h: 'Product', items: [
      { label: 'Features',  href: '/#features' },
      { label: 'Modes',     href: '/#features' },
      { label: 'Try it',    href: '/app' },
    ]},
    { h: 'Legal', items: [
      { label: 'Privacy',         href: '/legal#privacy' },
      { label: 'Terms',           href: '/legal#terms' },
      { label: 'Cookies',         href: '/legal#cookies' },
      { label: 'DMCA',            href: '/legal#dmca' },
      { label: 'Acceptable use',  href: '/legal#acceptable-use' },
    ]},
  ];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/" className="logo">
              <img src="assets/mascot-icon.png" alt="" className="logo-mascot" style={{ width: 44, height: 44 }} />
              <span className="logo-word" style={{ fontSize: 30 }}>Jancadoes</span>
            </a>
            <p className="muted" style={{ fontSize: 14, maxWidth: 280, marginTop: 12, lineHeight: 1.55 }}>
              Photo enhancement done warm &amp; cute. Buatan dengan
              <Deco.Heart size={12} style={{ display:'inline-block', verticalAlign:'middle', margin:'0 3px' }} className="deco heart" />
              di Bandung, dipakai di seluruh nusantara.
            </p>
          </div>
          {cols.map(col =>
            <div key={col.h} className="footer-col">
              <div className="footer-h">{col.h}</div>
              <ul>
                {col.items.map(x => <li key={x.label}><a href={x.href}>{x.label}</a></li>)}
              </ul>
            </div>
          )}
        </div>
        <hr className="rule" style={{ marginTop: 36 }} />
        <div className="footer-bot">
          <div className="muted mono" style={{ fontSize: 11 }}>
            © 2026 Jancadoes · made with sambel di Indonesia
          </div>
          <div className="footer-bot-right">
            <a href="/legal#privacy" className="muted" style={{ fontSize: 12 }}>Privacy</a>
            <a href="/legal#terms" className="muted" style={{ fontSize: 12 }}>Terms</a>
            <span className="mono" style={{ fontSize: 11, color:'var(--ink-mute)' }}>v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

window.HistorySection = HistorySection;
window.StatsStrip = StatsStrip;
window.CtaBand = CtaBand;
window.Footer = Footer;
