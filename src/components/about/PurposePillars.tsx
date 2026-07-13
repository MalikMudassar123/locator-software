const EASE = 'cubic-bezier(.22,.61,.36,1)'

const PILLARS = [
  {
    title: 'Control & Efficiency',
    desc: 'Turning underutilized vehicles, assets, and field teams into engines of intelligent growth through AI-powered IoT technology.',
    accent: '#1360ee',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="4" /><path d="M9 12h6M12 9v6" />
      </svg>
    ),
  },
  {
    title: 'Safety & Transparency',
    desc: 'Bringing greater visibility and accountability to daily operations — so every business decision is backed by real data.',
    accent: '#7c3aed',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Growth with Purpose',
    desc: 'Reducing costs and improving profitability — enabling businesses to scale without losing sight of what matters.',
    accent: '#13923f',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l6-6 4 4 8-8" /><path d="M17 7h4v4" />
      </svg>
    ),
  },
]

export default function PurposePillars() {
  return (
    <>
      <style>{`
        .pp-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: clamp(16px,2vw,24px); }
        @media (max-width: 820px) { .pp-grid { grid-template-columns: 1fr; } }

        .pp-card {
          background: #fff; border: 1px solid #e8ecf4; border-radius: 20px;
          padding: clamp(24px,2.8vw,32px); display: flex; flex-direction: column; gap: 14px;
          box-shadow: 0 2px 12px rgba(20,40,90,.04);
          transition: transform .24s ${EASE}, box-shadow .24s ${EASE};
        }
        .pp-card:hover { transform: translateY(-4px); box-shadow: 0 20px 44px -20px rgba(20,40,90,.3); }
        .pp-icon { width: 48px; height: 48px; border-radius: 14px; display: grid; place-items: center; }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,88px) 28px', background: '#fff' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div data-reveal style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto clamp(36px,5vw,52px)' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.09em', color: '#1360ee', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>
              How we bring it to life
            </span>
            <h2 style={{ margin: 0, fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.02em', color: '#1d1d1f' }}>
              Three pillars of our purpose
            </h2>
          </div>

          <div className="pp-grid">
            {PILLARS.map((p, i) => (
              <div key={p.title} className="pp-card" data-reveal data-reveal-delay={String(i * 80)}>
                <div className="pp-icon" style={{ background: `${p.accent}14`, color: p.accent }}>{p.icon}</div>
                <h3 style={{ margin: 0, fontSize: 'clamp(16px,1.6vw,19px)', fontWeight: 800, color: '#1d1d1f' }}>{p.title}</h3>
                <p style={{ margin: 0, fontSize: 'clamp(13.5px,1.2vw,15px)', lineHeight: 1.7, color: '#6e6e73' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
