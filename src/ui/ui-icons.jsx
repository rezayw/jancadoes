// ui-icons.jsx — line icons for Jancadoes UI. Inline SVG, currentColor.

const Icon = {
  Upload: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 16V4M12 4l-4 4M12 4l4 4" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  ),
  Camera: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 8h4l2-2h6l2 2h4v12H3z" />
      <circle cx="12" cy="14" r="3.5" />
    </svg>
  ),
  Sparkle: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3l1.8 4.4L18 9l-4.2 1.6L12 15l-1.8-4.4L6 9l4.2-1.6z" />
      <path d="M19 14l.7 1.8L21.5 17l-1.8.7L19 19.5l-.7-1.8L16.5 17l1.8-.7z" />
    </svg>
  ),
  Download: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 4v12M12 16l-4-4M12 16l4-4" />
      <path d="M4 19v0a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
    </svg>
  ),
  Redo: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 11a8 8 0 1 0-2.6 6" />
      <path d="M20 4v6h-6" />
    </svg>
  ),
  Compare: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v18" />
      <path d="M5 7l-2 2 2 2" />
      <path d="M19 13l2 2-2 2" />
      <path d="M9 9H3M21 15h-6" />
    </svg>
  ),
  Share: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 4v12" />
      <path d="M8 8l4-4 4 4" />
      <path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
    </svg>
  ),
  Star: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2l3 7 7.5.7-5.7 5 1.8 7.3L12 18l-6.6 4 1.8-7.3L1.5 9.7 9 9z" />
    </svg>
  ),
  Arrow: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  Plus: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Check: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 12l5 5 11-12" />
    </svg>
  ),
  // Per-mode glyphs
  ModeStudio: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="18" height="13" rx="2" />
      <path d="M3 14l5-4 4 3 3-2 6 5" />
      <circle cx="9" cy="9" r="1.2" />
    </svg>
  ),
  ModeLighting: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5" />
    </svg>
  ),
  ModeGolden: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 19h18" />
      <circle cx="12" cy="13" r="5" />
      <path d="M5 13a7 7 0 0 1 14 0" strokeDasharray="2 2" />
    </svg>
  ),
  ModeRestore: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 4v16M15 4v16M4 9h16M4 15h16" opacity=".4" />
      <path d="M8 9l3 3-3 3" />
    </svg>
  ),
  ModePeople: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="9" r="3" />
      <path d="M5 20c.6-3.4 3.5-6 7-6s6.4 2.6 7 6" />
      <path d="M17 5l4 4M21 5l-4 4" />
    </svg>
  ),
  ModeWatermark: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M8 14h8M8 11h5" opacity=".5" />
      <path d="M3 21l18-18" stroke="currentColor" />
    </svg>
  ),
  Mode4K: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 9v3h3M10 9v6M14 9v6M17 9v3l-3 .5" />
    </svg>
  ),
  // B&W Rembrandt — face half-lit / half-shadow
  ModeRembrandt: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="7" />
      <path d="M12 5 A 7 7 0 0 0 12 19 Z" fill="currentColor" stroke="none" />
    </svg>
  ),
  // Cinematic — clapboard / film
  ModeCinematic: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3 9h18M7 5l-1 4M11 5l-1 4M15 5l-1 4M19 5l-1 4" />
    </svg>
  ),
  // Aesthetic — sparkle / star
  ModeAesthetic: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3l2.3 5.4L20 9l-4 3.8 1 6L12 16l-5 2.8 1-6L4 9l5.7-.6z" />
    </svg>
  ),
  // Soft Minimalist — concentric calm
  ModeMinimal: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" opacity=".35" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  Menu: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  ),
  Lock: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  ),
};

// ─── Brand decorations (kawaii brand-style) ───
const Deco = {
  Heart: ({ size=18, ...p }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 21s-7-4.5-9.3-9.2C1.2 8.6 3.2 5 6.6 5c2 0 3.6 1 4.4 2.4l1 1.6 1-1.6C13.8 6 15.4 5 17.4 5c3.4 0 5.4 3.6 3.9 6.8C19 16.5 12 21 12 21z"
        stroke="rgba(46,90,46,.18)" strokeWidth=".8" />
    </svg>
  ),
  Sparkle: ({ size=22, ...p }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2c.4 0 .7.3.8.6L14 7l4.4 1.2c.7.2.7 1.2 0 1.4L14 10.8 12.8 15.4c-.2.7-1.2.7-1.4 0L10.2 10.8 5.6 9.6c-.7-.2-.7-1.2 0-1.4L10.2 7l1.2-4.4c.1-.3.4-.6.6-.6z" />
    </svg>
  ),
  Sparkle2: ({ size=14, ...p }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2l1.2 3.4L16.6 6.6 13.2 8 12 11.4 10.8 8 7.4 6.6 10.8 5.4z" />
      <path d="M19 14l.7 2 2 .7-2 .7L19 19.5l-.7-2-2-.7 2-.7z" opacity=".7"/>
    </svg>
  ),
  Leaf: ({ size=22, rotate=0, ...p }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"
      style={{ transform: `rotate(${rotate}deg)` }} {...p}>
      <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z" stroke="rgba(46,90,46,.18)" strokeWidth=".8"/>
      <path d="M5 19c4-4 8-8 14-14" fill="none" stroke="rgba(46,90,46,.4)" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
  Avocado: ({ size=28, ...p }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" {...p}>
      <ellipse cx="32" cy="36" rx="22" ry="26" fill="#5E8C3A" />
      <ellipse cx="32" cy="36" rx="16" ry="20" fill="#FFF4A9" />
      <ellipse cx="32" cy="40" rx="8" ry="10" fill="#8B5A2B" />
      <path d="M30 8c2-3 8-3 8 2-1 2-4 4-8 4z" fill="#5E8C3A" />
      <circle cx="27" cy="33" r="1.4" fill="#2E5A2E" />
      <circle cx="37" cy="33" r="1.4" fill="#2E5A2E" />
      <path d="M28 37c1 1 3 1 4 0" fill="none" stroke="#2E5A2E" strokeWidth="1" strokeLinecap="round"/>
      <ellipse cx="25" cy="36" rx="2" ry="1.2" fill="#FF9DB0" opacity=".7"/>
      <ellipse cx="39" cy="36" rx="2" ry="1.2" fill="#FF9DB0" opacity=".7"/>
    </svg>
  ),
};

window.Icon = Icon;
window.Deco = Deco;
