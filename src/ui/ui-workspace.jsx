// ui-workspace.jsx — the authenticated enhance workspace, served at /app.
// Requires a signed-in user; bounces to the landing page (/) otherwise.

function Workspace() {
  const auth = useAuth();

  // The workspace has no Tweaks panel — apply the default theme.
  React.useEffect(() => {
    document.documentElement.dataset.palette = 'warm';
  }, []);

  // Route guard: once auth has resolved, send guests back to the landing page.
  React.useEffect(() => {
    if (auth.ready && !auth.user) window.location.replace('/');
  }, [auth.ready, auth.user]);

  if (!auth.ready || !auth.user) {
    return (
      <div className="page-loading">
        <span className="page-spinner" />
        <span>{auth.ready ? 'Redirecting…' : 'Loading your workspace…'}</span>
      </div>
    );
  }

  return (
    <>
      <Nav variant="app" />
      <main className="ws-main">
        <section className="ws-greet">
          <div className="container">
            <div className="ws-greet-row">
              <span className="ws-greet-hi">Hai, {auth.user.name} 👋</span>
              <span className="muted">Workspace kamu — upload foto, pilih mode, enhance.</span>
            </div>
          </div>
        </section>
        <TryFlow />
        <HistorySection />
      </main>
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('ui-root'));
root.render(
  <AuthProvider>
    <Workspace />
  </AuthProvider>
);
