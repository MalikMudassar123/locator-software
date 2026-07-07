const EASE = 'cubic-bezier(.22,.61,.36,1)'

const FEATURES = [
  {
    title: 'Real-Time Tracking',
    desc: 'Monitor every vehicle live with continuously updated location and speed data.',
    accent: '#1360ee',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: 'Geofencing & Alerts',
    desc: 'Draw virtual zones and get prompt alerts the moment a tracked vehicle leaves them.',
    accent: '#13923f',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M3 12h18" />
      </svg>
    ),
  },
  {
    title: 'Detailed Reporting',
    desc: "A complete overview of every vehicle's status and location history, ready when you need it.",
    accent: '#7c3aed',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-6" />
      </svg>
    ),
  },
  {
    title: 'Pinpoint Accuracy',
    desc: 'Advanced GPS technology built for steadfast reliability and precise positioning.',
    accent: '#c2740a',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
    ),
  },
]

export default function SecurepathFeatures() {
  return (
    <>
      <style>{`
        .sp-feat-card {
          background: #fff; border: 1px solid #e4e4e8; border-radius: 20px;
          padding: clamp(20px,2.4vw,28px); display: flex; flex-direction: column; gap: 14px;
          position: relative; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,.04);
          transition: transform .22s ${EASE}, box-shadow .22s ${EASE};
        }
        .sp-feat-card:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(0,0,0,.08); }
        .sp-feat-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--feat-accent, #1360ee);
        }
        .sp-feat-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: clamp(14px,2vw,20px); }
        @media (max-width: 900px) { .sp-feat-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px) { .sp-feat-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#fff' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div data-reveal style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.09em', color: '#1360ee', textTransform: 'uppercase' as const, display: 'block', marginBottom: '14px' }}>
              Features
            </span>
            <h2 style={{ margin: '0 auto', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.02em', color: '#1d1d1f', maxWidth: '560px' }}>
              Features of SecurePath GPS Tracking Systems
            </h2>
          </div>

          <div className="sp-feat-grid" data-reveal>
            {FEATURES.map((f, i) => (
              <div key={f.title} className="sp-feat-card" style={{ '--feat-accent': f.accent } as React.CSSProperties} data-reveal data-reveal-delay={String(i * 70)}>
                <div style={{ width: 44, height: 44, borderRadius: 12, display: 'grid', placeItems: 'center', background: `${f.accent}15`, color: f.accent }}>
                  {f.icon}
                </div>
                <h3 style={{ margin: 0, fontSize: 'clamp(15px,1.4vw,17px)', fontWeight: 800, color: '#1d1d1f' }}>{f.title}</h3>
                <p style={{ margin: 0, fontSize: 'clamp(13px,1.15vw,14.5px)', lineHeight: 1.65, color: '#6e6e73' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
