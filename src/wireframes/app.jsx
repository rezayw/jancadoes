// app.jsx — main composition: tweaks panel + design canvas of wireframes

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "sketch",
  "palette": "warm",
  "annotations": "on",
  "showFooter": true
}/*EDITMODE-END*/;

function FooterStrip() {
  return (
    <div className="wf" style={{ height: 220 }}>
      <div style={{ padding: '24px 36px' }}>
        <WFSectionLabel>Footer · all variants</WFSectionLabel>
        <div className="wf-rule" style={{ marginTop: 4 }} />
        <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr', gap: 24, marginTop: 14 }}>
          <div>
            <div className="hand" style={{ fontSize: 22 }}>Jancadoes</div>
            <div style={{ fontSize: 12, color:'var(--wf-ink-soft)', marginTop: 4, maxWidth: 220 }}>
              Jancadoes photo enhancer — restore, relight, upscale, retouch. Buatan anak kos.
            </div>
            <div className="wf-row wf-gap-6" style={{ marginTop: 10 }}>
              <span className="wf-circle" style={{ width: 26, height: 26 }}>𝕏</span>
              <span className="wf-circle" style={{ width: 26, height: 26 }}>ⓘ</span>
              <span className="wf-circle" style={{ width: 26, height: 26 }}>▶</span>
              <span className="wf-circle" style={{ width: 26, height: 26 }}>𝕗</span>
            </div>
          </div>
          {[
            { h: 'Product',  items: ['Features','Pricing','API','Changelog'] },
            { h: 'Company',  items: ['About','Blog','Contact','Press'] },
            { h: 'Legal',    items: ['Privacy','Terms','Cookies','DMCA'] },
          ].map(col =>
            <div key={col.h}>
              <div className="hand" style={{ fontSize: 15, marginBottom: 6 }}>{col.h}</div>
              <ul style={{ margin:0, padding:0, listStyle:'none', fontSize: 12, lineHeight: 1.8, color:'var(--wf-ink-soft)' }}>
                {col.items.map(x => <li key={x}>{x}</li>)}
              </ul>
            </div>
          )}
        </div>
        <div className="wf-row" style={{ justifyContent:'space-between', marginTop: 14 }}>
          <div className="mono" style={{ fontSize: 10, color:'var(--wf-ink-soft)' }}>© 2026 Jancadoes · made with sambel</div>
          <div className="mono" style={{ fontSize: 10, color:'var(--wf-ink-soft)' }}>v0.4.2-beta</div>
        </div>
      </div>
    </div>
  );
}

// Mobile bonus strip — shows responsive intent in compact form
function MobileStrip() {
  return (
    <div className="wf" style={{ padding: '24px 36px', background:'var(--wf-paper)' }}>
      <WFSectionLabel>Mobile · responsive intent</WFSectionLabel>
      <div className="hand" style={{ fontSize: 16, color:'var(--wf-ink-soft)', marginBottom: 12 }}>
        same flow, condensed to a single column. camera-first on mobile.
      </div>
      <div className="wf-row wf-gap-16" style={{ alignItems:'flex-start', justifyContent:'space-around' }}>
        {/* Phone 1: Hero */}
        <WFPhone w={170} h={340}>
          <div style={{ paddingTop: 14 }}>
            <div className="hand" style={{ fontSize: 16, fontWeight: 700, textAlign:'center' }}>Jancadoes</div>
            <div className="hand" style={{ fontSize: 20, lineHeight:1.1, marginTop: 16, textAlign:'center' }}>
              Transform<br/>your photos<br/><span style={{ background:'var(--wf-mustard)', padding:'0 6px' }}>with Jancadoes</span>
            </div>
            <div style={{ marginTop: 14, padding:'0 6px' }}>
              <div className="wf-btn primary" style={{ width: '100%', fontSize: 12, marginBottom: 6 }}>⤴ Upload</div>
              <div className="wf-btn warm" style={{ width: '100%', fontSize: 12 }}>◉ Camera</div>
            </div>
            <WFPhoto w="100%" h={70} label="" style={{ marginTop: 14 }} />
          </div>
        </WFPhone>
        {/* Phone 2: Modes (bottom sheet) */}
        <WFPhone w={170} h={340}>
          <WFPhoto w="100%" h={140} label="preview" />
          <div style={{ marginTop: 8, padding:'8px 4px', border:'1.5px solid var(--wf-line)',
            borderTopLeftRadius: 12, borderTopRightRadius: 12,
            background:'var(--wf-paper)', position:'relative' }}>
            <div style={{ width: 30, height: 3, background:'var(--wf-line)', borderRadius: 2, margin: '0 auto 8px' }} />
            <div className="hand" style={{ fontSize: 12, marginBottom: 4 }}>Pick a mode</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 4 }}>
              {MODES.slice(0,4).map((m,i) =>
                <div key={m.name} className="wf-pill" style={{
                  fontSize: 9, padding:'2px 4px', justifyContent:'center',
                  background: i===2?'var(--wf-mustard)':'var(--wf-paper-2)' }}>
                  {m.name}
                </div>
              )}
            </div>
          </div>
        </WFPhone>
        {/* Phone 3: Result */}
        <WFPhone w={170} h={340}>
          <div style={{ position:'relative', height: 180, border:'1.5px solid var(--wf-line)',
            borderRadius: 10, overflow:'hidden', marginTop: 8,
            background:`repeating-linear-gradient(45deg, transparent 0 8px, var(--wf-hatch) 8px 9px), var(--wf-paper-2)` }}>
            <div style={{ position:'absolute', inset: 0, clipPath:'inset(0 0 0 50%)',
              background:`repeating-linear-gradient(45deg, transparent 0 8px, rgba(184,200,156,.6) 8px 9px), var(--wf-paper-2)` }} />
            <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width: 2, background:'var(--wf-line)' }} />
            <div className="wf-circle" style={{ position:'absolute', left:'50%', top:'50%', width: 24, height: 24,
              marginLeft:-12, marginTop:-12, fontSize: 10, background:'var(--wf-paper-2)' }}>⇆</div>
          </div>
          <div className="wf-btn primary" style={{ width:'100%', fontSize: 11, marginTop: 10 }}>⤓ Download</div>
          <div className="wf-btn warm" style={{ width:'100%', fontSize: 11, marginTop: 6 }}>↻ Enhance Again</div>
        </WFPhone>
      </div>
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Sync tweaks to <html> data-attrs so CSS vars cascade
  React.useEffect(() => {
    document.documentElement.dataset.mode = t.mode;
    document.documentElement.dataset.palette = t.palette;
    document.documentElement.dataset.anno = t.annotations;
  }, [t.mode, t.palette, t.annotations]);

  const ABW = 760, ABH = 540;

  return (
    <>
      <DesignCanvas>
        <DCSection id="cover" title="Jancadoes — Wireframes" subtitle="Jancadoes Photo Enhancer · 6 screens × 3 variations · low-fi sketch">
          <DCArtboard id="readme" label="README" width={460} height={ABH}>
            <div className="wf" style={{ padding: 28 }}>
              <div className="wf-stamp">PROJECT BRIEF</div>
              <h1 className="hand" style={{ fontSize: 38, lineHeight: 1.05, margin: '8px 0 4px', fontWeight: 700 }}>
                Jancadoes
              </h1>
              <div className="hand" style={{ fontSize: 16, color:'var(--wf-ink-soft)' }}>
                Jancadoes Photo Enhancer — wireframes
              </div>
              <div className="wf-rule" style={{ margin:'14px 0' }} />
              <div style={{ fontSize: 13, lineHeight: 1.55 }}>
                Low-fi sketches mapping the design space for a Jancadoes photo enhancement platform with 7 modes (Phone→Studio, Golden Hour, Restore Old, Remove People, Remove Watermark, 4K Enhancer, Correct Lighting). Each screen has <b>3 variations</b>: conservative → experimental left-to-right. Pick + mix.
              </div>
              <div className="wf-rule" style={{ margin:'14px 0' }} />
              <div className="hand" style={{ fontSize: 18, marginBottom: 6 }}>Sections</div>
              <ol style={{ margin:0, paddingLeft: 18, fontSize: 13, lineHeight: 1.7 }}>
                <li>Landing / Hero</li>
                <li>Upload + Camera</li>
                <li>Jancadoes Mode Selection</li>
                <li>Processing state</li>
                <li>Before / After result</li>
                <li>Recent History</li>
                <li>+ Footer · Mobile bonus</li>
              </ol>
              <div className="wf-rule" style={{ margin:'14px 0' }} />
              <div className="hand" style={{ fontSize: 14 }}>
                use the Tweaks panel (bottom-right) →<br/>
                <span style={{ fontSize: 12, color:'var(--wf-ink-soft)' }}>
                  swap palette, toggle sketch/clean, hide annotations
                </span>
              </div>
              <div style={{ position:'absolute', right: 18, bottom: 16 }}>
                <span className="wf-stamp" style={{ background:'var(--wf-mustard)' }}>v0.1 · DRAFT</span>
              </div>
            </div>
          </DCArtboard>

          <DCArtboard id="legend" label="Legend · system" width={440} height={ABH}>
            <div className="wf" style={{ padding: 28 }}>
              <WFSectionLabel>Legend</WFSectionLabel>
              <div className="hand" style={{ fontSize: 14, color:'var(--wf-ink-soft)', marginBottom: 10 }}>
                visual vocabulary used across all wireframes
              </div>
              <div className="wf-col wf-gap-12">
                <div className="wf-row wf-gap-10">
                  <div className="wf-img" style={{ width: 80, height: 50 }}><span className="lbl">photo</span></div>
                  <div style={{ fontSize: 12 }}>hatched = photo / image placeholder</div>
                </div>
                <div className="wf-row wf-gap-10">
                  <span className="wf-btn primary">primary</span>
                  <span className="wf-btn warm">warm</span>
                  <span className="wf-btn">ghost</span>
                </div>
                <div className="wf-row wf-gap-10">
                  <span className="wf-pill sage">sage</span>
                  <span className="wf-pill tan">tan</span>
                  <span className="wf-pill warm">mustard</span>
                  <span className="wf-pill">neutral</span>
                </div>
                <div className="wf-row wf-gap-10">
                  <WFArrow width={80} height={20} d="M 4 10 C 25 -2, 55 22, 76 10" />
                  <div style={{ fontSize: 12 }}>annotation arrow</div>
                </div>
                <div className="wf-row wf-gap-10">
                  <span className="wf-anno" style={{ color:'#8a4a2a' }}>like this — margin note</span>
                </div>
              </div>
              <div className="wf-rule" style={{ margin:'14px 0' }} />
              <div className="hand" style={{ fontSize: 16, marginBottom: 6 }}>Palette</div>
              <div className="wf-row wf-gap-6">
                {[
                  ['#b8c89c','sage'],['#d9b48a','tan'],['#e9c96a','mustard'],['#f7f1e3','paper'],['#2a2520','ink']
                ].map(([c,n]) =>
                  <div key={n} className="wf-col" style={{ alignItems:'center', gap: 3 }}>
                    <div style={{ width: 36, height: 36, background: c, border:'1.5px solid var(--wf-line)',
                      borderRadius:'8px 10px 7px 9px' }} />
                    <span className="mono" style={{ fontSize: 9 }}>{n}</span>
                  </div>
                )}
              </div>
              <div className="wf-rule" style={{ margin:'14px 0' }} />
              <div className="hand" style={{ fontSize: 16, marginBottom: 6 }}>Type</div>
              <div className="hand" style={{ fontSize: 22 }}>Caveat — display</div>
              <div style={{ fontSize: 14 }}>Kalam — body &amp; UI</div>
              <div className="mono" style={{ fontSize: 12 }}>JetBrains Mono — labels/system</div>
            </div>
          </DCArtboard>
        </DCSection>

        <DCSection id="hero" title="1 · Landing / Hero" subtitle="3 variations — conservative → experimental →">
          <DCArtboard id="hero-a" label="A · Classic split"   width={ABW} height={ABH}><HeroA /></DCArtboard>
          <DCArtboard id="hero-b" label="B · Drop-into-lens"  width={ABW} height={ABH}><HeroB /></DCArtboard>
          <DCArtboard id="hero-c" label="C · Prompt-first ⚡" width={ABW} height={ABH}><HeroC /></DCArtboard>
        </DCSection>

        <DCSection id="upload" title="2 · Upload / Camera" subtitle="how photos enter the system">
          <DCArtboard id="up-a" label="A · Dropzone"          width={ABW} height={ABH}><UploadA /></DCArtboard>
          <DCArtboard id="up-b" label="B · Camera viewfinder" width={ABW} height={ABH}><UploadB /></DCArtboard>
          <DCArtboard id="up-c" label="C · Photo desk ⚡"     width={ABW} height={ABH}><UploadC /></DCArtboard>
        </DCSection>

        <DCSection id="modes" title="3 · Jancadoes Mode Selection" subtitle="picking one of 7 enhancement modes">
          <DCArtboard id="md-a" label="A · Card grid"         width={ABW} height={ABH}><ModesA /></DCArtboard>
          <DCArtboard id="md-b" label="B · Radial wheel"      width={ABW} height={ABH}><ModesB /></DCArtboard>
          <DCArtboard id="md-c" label="C · Visual catalog ⚡" width={ABW} height={ABH}><ModesC /></DCArtboard>
        </DCSection>

        <DCSection id="processing" title="4 · Processing" subtitle="while Jancadoes works">
          <DCArtboard id="pr-a" label="A · Progress bar"      width={ABW} height={ABH}><ProcessingA /></DCArtboard>
          <DCArtboard id="pr-b" label="B · Pixel scan"        width={ABW} height={ABH}><ProcessingB /></DCArtboard>
          <DCArtboard id="pr-c" label="C · Neural net ⚡"     width={ABW} height={ABH}><ProcessingC /></DCArtboard>
        </DCSection>

        <DCSection id="result" title="5 · Result · Before/After" subtitle="how users compare and download">
          <DCArtboard id="rs-a" label="A · Split slider"      width={ABW} height={ABH}><ResultA /></DCArtboard>
          <DCArtboard id="rs-b" label="B · Time dial ⚡"      width={ABW} height={ABH}><ResultB /></DCArtboard>
          <DCArtboard id="rs-c" label="C · Peel reveal ⚡"    width={ABW} height={ABH}><ResultC /></DCArtboard>
        </DCSection>

        <DCSection id="history" title="6 · Recent History" subtitle="returning to past enhancements">
          <DCArtboard id="hs-a" label="A · Gallery grid"      width={ABW} height={ABH}><HistoryA /></DCArtboard>
          <DCArtboard id="hs-b" label="B · Timeline"          width={ABW} height={ABH}><HistoryB /></DCArtboard>
          <DCArtboard id="hs-c" label="C · Film strip ⚡"     width={ABW} height={ABH}><HistoryC /></DCArtboard>
        </DCSection>

        <DCSection id="extras" title="+ Footer & Mobile" subtitle="responsive intent + page chrome">
          <DCArtboard id="footer" label="Footer · global"  width={ABW} height={300}><FooterStrip /></DCArtboard>
          <DCArtboard id="mobile" label="Mobile · 3 key screens" width={ABW} height={460}><MobileStrip /></DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel>
        <TweakSection label="Style" />
        <TweakRadio label="Mode" value={t.mode}
          options={[{value:'sketch',label:'Sketch'},{value:'clean',label:'Clean'}]}
          onChange={(v) => setTweak('mode', v)} />
        <TweakRadio label="Annotations" value={t.annotations}
          options={[{value:'on',label:'Show'},{value:'off',label:'Hide'}]}
          onChange={(v) => setTweak('annotations', v)} />
        <TweakSection label="Palette" />
        <TweakRadio label="Theme" value={t.palette}
          options={[
            {value:'warm', label:'Warm'},
            {value:'mono', label:'Mono'},
            {value:'dusk', label:'Dusk'},
          ]}
          onChange={(v) => setTweak('palette', v)} />
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
