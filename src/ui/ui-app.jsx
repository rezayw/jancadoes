// ui-app.jsx — composes the Jancadoes marketing landing page (served at /).
// The actual enhance workspace lives on /app (see ui-workspace.jsx).

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "warm",
  "accent": "sage",
  "rounded": "soft",
  "highlight": "auto"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.dataset.palette = t.palette;
  }, [t.palette]);

  React.useEffect(() => {
    // Accent override: swap brand green tokens to the chosen accent
    const root = document.documentElement;
    const map = {
      sage:   ['#5E8C3A','#2E5A2E','#e5f0d3','rgba(94,140,58,.22)'],
      lime:   ['#A6D36B','#5E8C3A','#dcedc1','rgba(166,211,107,.28)'],
      warm:   ['#FFE6A6','#d4a83a','#FFF4A9','rgba(212,168,58,.22)'],
      pink:   ['#FF9DB0','#e57082','#ffe2e8','rgba(255,157,176,.22)'],
    };
    const v = map[t.accent] || map.sage;
    root.style.setProperty('--sage',      v[0]);
    root.style.setProperty('--sage-deep', v[1]);
    root.style.setProperty('--sage-soft', v[2]);
    root.style.setProperty('--sage-glow', v[3]);
  }, [t.accent]);

  React.useEffect(() => {
    const root = document.documentElement;
    if (t.rounded === 'sharp') {
      root.style.setProperty('--r-sm','8px');
      root.style.setProperty('--r-md','10px');
      root.style.setProperty('--r-lg','12px');
      root.style.setProperty('--r-xl','16px');
      root.style.setProperty('--r-2x','20px');
    } else if (t.rounded === 'pill') {
      root.style.setProperty('--r-sm','20px');
      root.style.setProperty('--r-md','26px');
      root.style.setProperty('--r-lg','34px');
      root.style.setProperty('--r-xl','42px');
      root.style.setProperty('--r-2x','52px');
    } else {
      // 'soft' — clear inline overrides so the brand defaults from ui-tokens.css win
      ['--r-sm','--r-md','--r-lg','--r-xl','--r-2x'].forEach(k => root.style.removeProperty(k));
    }
  }, [t.rounded]);

  return (
    <>
      <Nav variant="landing" />
      <main>
        <Hero />
        <ModesSection />
        <StatsStrip />
        <CtaBand />
      </main>
      <Footer />

      <TweaksPanel>
        <TweakSection label="Palette" />
        <TweakRadio label="Theme" value={t.palette}
          options={[
            { value: 'warm', label: 'Warm' },
            { value: 'leaf', label: 'Leaf' },
            { value: 'sunny', label: 'Sunny' },
            { value: 'dark', label: 'Dark' },
          ]}
          onChange={(v) => setTweak('palette', v)} />
        <TweakColor label="Accent" value={t.accent}
          options={[
            { value:'sage', color:'#5E8C3A' },
            { value:'lime', color:'#A6D36B' },
            { value:'warm', color:'#FFE6A6' },
            { value:'pink', color:'#FF9DB0' },
          ]}
          onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="Shape" />
        <TweakRadio label="Rounding" value={t.rounded}
          options={[
            { value:'sharp', label:'Sharp' },
            { value:'soft',  label:'Soft' },
            { value:'pill',  label:'Pill' },
          ]}
          onChange={(v) => setTweak('rounded', v)} />
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('ui-root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
