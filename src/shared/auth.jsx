// auth.jsx — client-side auth: context, provider, and the login/signup modal.
// Loaded before the UI scripts so every component can call useAuth().

const AuthContext = React.createContext(null);
const useAuth = () => React.useContext(AuthContext);

const TOKEN_KEY = 'jancadoes_token';

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [ready, setReady] = React.useState(false);
  const [modal, setModal] = React.useState(null); // null | { mode, onSuccess }

  const getToken = () => localStorage.getItem(TOKEN_KEY);

  // Restore a session from a saved token on first load.
  React.useEffect(() => {
    const t = getToken();
    if (!t) { setReady(true); return; }
    fetch('/api/me', { headers: { Authorization: `Bearer ${t}` } })
      .then((r) => r.json())
      .then((d) => {
        if (d.user) setUser(d.user);
        else localStorage.removeItem(TOKEN_KEY);
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  const submit = async (kind, payload) => {
    const r = await fetch(`/api/${kind}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(data.error || 'Something went wrong.');
    localStorage.setItem(TOKEN_KEY, data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    const t = getToken();
    if (t) fetch('/api/logout', { method: 'POST', headers: { Authorization: `Bearer ${t}` } }).catch(() => {});
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  const openAuth = (mode, onSuccess) => setModal({ mode: mode || 'login', onSuccess });
  const closeAuth = () => setModal(null);

  // Run `action` now if signed in, otherwise prompt to sign in then run it.
  const requireAuth = (action) => {
    if (user) action();
    else setModal({ mode: 'login', onSuccess: action });
  };

  const ctx = {
    user, ready,
    token: getToken,
    register: (p) => submit('register', p),
    login: (p) => submit('login', p),
    logout, openAuth, closeAuth, requireAuth,
  };

  return (
    <AuthContext.Provider value={ctx}>
      {children}
      {modal && <AuthModal mode={modal.mode} onSuccess={modal.onSuccess} />}
    </AuthContext.Provider>
  );
}

function AuthModal({ mode: initialMode, onSuccess }) {
  const auth = useAuth();
  const [mode, setMode] = React.useState(initialMode || 'login');
  const [form, setForm] = React.useState({ name: '', email: '', password: '' });
  const [error, setError] = React.useState(null);
  const [busy, setBusy] = React.useState(false);

  const isRegister = mode === 'register';
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const swap = (m) => { setMode(m); setError(null); };

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') auth.closeAuth(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (isRegister) await auth.register(form);
      else await auth.login({ email: form.email, password: form.password });
      auth.closeAuth();
      if (onSuccess) setTimeout(onSuccess, 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-overlay"
      onMouseDown={(e) => { if (e.target === e.currentTarget) auth.closeAuth(); }}>
      <div className="auth-modal card" role="dialog" aria-modal="true">
        <button className="auth-close" onClick={auth.closeAuth} aria-label="Close">×</button>

        <div className="auth-brand">
          <img src="assets/mascot-icon.png" alt="" />
          <span className="logo-word">Jancadoes</span>
        </div>

        <h3 className="auth-title">{isRegister ? 'Create your account' : 'Welcome back'}</h3>
        <p className="muted auth-lead">
          {isRegister
            ? 'Sign up to start enhancing — gratis, tanpa kartu kredit.'
            : 'Log in dulu untuk upload & memproses fotomu.'}
        </p>

        <div className="auth-tabs">
          <button type="button" className={!isRegister ? 'active' : ''} onClick={() => swap('login')}>Log in</button>
          <button type="button" className={isRegister ? 'active' : ''} onClick={() => swap('register')}>Sign up</button>
        </div>

        <form className="auth-form" onSubmit={submit}>
          {isRegister && (
            <label>Name
              <input type="text" value={form.name} onChange={set('name')} placeholder="Your name" />
            </label>
          )}
          <label>Email
            <input type="email" required value={form.email} onChange={set('email')}
              placeholder="you@email.com" autoComplete="email" />
          </label>
          <label>Password
            <input type="password" required value={form.password} onChange={set('password')}
              placeholder="min. 6 characters" autoComplete={isRegister ? 'new-password' : 'current-password'} />
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button className="btn primary lg" type="submit" disabled={busy} style={{ width: '100%' }}>
            {busy ? 'Please wait…' : isRegister ? 'Create account' : 'Log in'}
          </button>
        </form>

        <div className="auth-switch muted">
          {isRegister
            ? <>Sudah punya akun? <button type="button" onClick={() => swap('login')}>Log in</button></>
            : <>Belum punya akun? <button type="button" onClick={() => swap('register')}>Sign up free</button></>}
        </div>
      </div>
    </div>
  );
}

window.AuthProvider = AuthProvider;
window.useAuth = useAuth;
