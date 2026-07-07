const EASE = 'cubic-bezier(.22,.61,.36,1)'

const CASES = [
  {
    title: 'Personal Use',
    desc: 'Track personal vehicles, monitor teen driving habits, and keep an eye on the movement of elderly family members — enhancing everyday safety.',
    accent: '#1360ee',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    title: 'Commercial Use',
    desc: 'Rent-a-car businesses leverage SecurePath for effective fleet tracking, enhancing productivity and accountability across every rental.',
    accent: '#13923f',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="7" width="15" height="10" rx="1.5" /><path d="M18 10h2.5l2 3v4H18z" /><circle cx="7.5" cy="18" r="1.6" /><circle cx="17.5" cy="18" r="1.6" />
      </svg>
    ),
  },
]

export default function SecurepathUseCases() {
  return (
    <>
      <style>{`
        .sp-case-card {
          background: #fff; border: 1px solid #e4e4e8; border-radius: 20px;
          padding: clamp(24px,3vw,32px); display: flex; flex-direction: column; gap: 14px;
          position: relative; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,.04);
          transition: transform .22s ${EASE}, box-shadow .22s ${EASE};
        }
        .sp-case-card:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(0,0,0,.08); }
        .sp-case-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--case-accent, #1360ee);
        }
        .sp-case-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: clamp(16px,2vw,22px); }
        @media (max-width: 700px) { .sp-case-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#fff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div data-reveal style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.09em', color: '#1360ee', textTransform: 'uppercase' as const, display: 'block', marginBottom: '14px' }}>
              Use Cases
            </span>
            <h2 style={{ margin: '0 auto', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.02em', color: '#1d1d1f', maxWidth: '560px' }}>
              Use Cases of SecurePath GPS Tracking Systems
            </h2>
          </div>

          <div className="sp-case-grid" data-reveal>
            {CASES.map((c, i) => (
              <div key={c.title} className="sp-case-card" style={{ '--case-accent': c.accent } as React.CSSProperties} data-reveal data-reveal-delay={String(i * 80)}>
                <div style={{ width: 48, height: 48, borderRadius: 14, display: 'grid', placeItems: 'center', background: `${c.accent}15`, color: c.accent }}>
                  {c.icon}
                </div>
                <h3 style={{ margin: 0, fontSize: 'clamp(16px,1.6vw,19px)', fontWeight: 800, color: '#1d1d1f' }}>{c.title}</h3>
                <p style={{ margin: 0, fontSize: 'clamp(13.5px,1.2vw,15px)', lineHeight: 1.7, color: '#6e6e73' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
