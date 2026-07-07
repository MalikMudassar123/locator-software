const EASE = 'cubic-bezier(.22,.61,.36,1)'

const BENEFITS = [
  {
    title: 'Real-Time Vehicle Tracking',
    desc: "Monitor every registered truck's live location and movement history from one dashboard.",
    accent: '#1360ee',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: 'Regulatory Compliance',
    desc: "Meet SIRA's SHAHIN requirements with a certified, pre-approved GPS device.",
    accent: '#13923f',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Theft & Misuse Prevention',
    desc: 'Instant alerts help you catch unauthorized use before it becomes a loss.',
    accent: '#7c3aed',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    ),
  },
  {
    title: 'Fast, Managed Registration',
    desc: "We handle the paperwork and device certification so you don't have to.",
    accent: '#c2740a',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
]

export default function ShahinBenefits() {
  return (
    <>
      <style>{`
        .shn-ben-card {
          background: #fff; border: 1px solid #e4e4e8; border-radius: 20px;
          padding: clamp(20px,2.4vw,28px); display: flex; flex-direction: column; gap: 14px;
          position: relative; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,.04);
          transition: transform .22s ${EASE}, box-shadow .22s ${EASE};
        }
        .shn-ben-card:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(0,0,0,.08); }
        .shn-ben-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--ben-accent, #1360ee);
        }
        .shn-ben-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: clamp(14px,2vw,20px); }
        @media (max-width: 700px) { .shn-ben-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div data-reveal style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.09em', color: '#1360ee', textTransform: 'uppercase' as const, display: 'block', marginBottom: '14px' }}>
              Why It Matters
            </span>
            <h2 style={{ margin: '0 auto', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.02em', color: '#1d1d1f', maxWidth: '520px' }}>
              Built for Compliance, Designed for Peace of Mind
            </h2>
          </div>

          <div className="shn-ben-grid" data-reveal>
            {BENEFITS.map((b, i) => (
              <div key={b.title} className="shn-ben-card" style={{ '--ben-accent': b.accent } as React.CSSProperties} data-reveal data-reveal-delay={String(i * 70)}>
                <div style={{ width: 44, height: 44, borderRadius: 12, display: 'grid', placeItems: 'center', background: `${b.accent}15`, color: b.accent }}>
                  {b.icon}
                </div>
                <h3 style={{ margin: 0, fontSize: 'clamp(15px,1.4vw,17px)', fontWeight: 800, color: '#1d1d1f' }}>{b.title}</h3>
                <p style={{ margin: 0, fontSize: 'clamp(13px,1.15vw,14.5px)', lineHeight: 1.65, color: '#6e6e73' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
