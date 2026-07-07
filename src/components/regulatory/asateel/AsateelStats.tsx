const REASONS = [
  {
    title: 'Competitive Pricing',
    desc: 'As one of the leading GPS providers, we offer aggressively priced solutions for your ASATEEL certification.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="M9 9.5a2.5 2 0 0 1 5 0c0 1.5-2.5 1.5-2.5 3M12 16.5v.01" />
      </svg>
    ),
  },
  {
    title: 'Exceptional Support',
    desc: "Our team is dedicated to a great customer experience, ensuring your installed GPS tracker flawlessly updates on the ASATEEL platform.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3z" /><path d="M3 19a2 2 0 0 0 2 2h1v-6H3z" />
      </svg>
    ),
  },
  {
    title: 'Seamless Software Integrations',
    desc: "We understand the importance of integrating your installed GPS tracker with other tools — including LOCATOR or any other ERP.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3H5a2 2 0 0 0-2 2v3" /><path d="M21 8V5a2 2 0 0 0-2-2h-3" /><path d="M16 21h3a2 2 0 0 0 2-2v-3" /><path d="M3 16v3a2 2 0 0 0 2 2h3" />
      </svg>
    ),
  },
]

const STATS = [
  { value: '10+', label: 'Years in Business', accent: '#1360ee' },
  { value: '1,000+', label: 'Happy Customers', accent: '#13923f' },
  { value: '20,000+', label: 'Tracked Devices', accent: '#7c3aed' },
  { value: '1,000,000+', label: 'Data Points Daily', accent: '#c2740a' },
]

export default function AsateelStats() {
  return (
    <>
      <style>{`
        .asa-stats-grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: clamp(32px,5vw,56px); align-items: start; }
        @media (max-width: 860px) { .asa-stats-grid { grid-template-columns: 1fr; } }
        .asa-stat-box {
          border-radius: 16px; padding: clamp(20px,2.4vw,26px);
          display: flex; flex-direction: column; gap: 6px; justify-content: center;
          min-height: 108px; background: #fff; border: 1px solid #e4e4e8;
          box-shadow: 0 2px 12px rgba(0,0,0,.04);
        }
        .asa-stat-mini-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#fff' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>

          <h2 data-reveal style={{ margin: '0 0 40px', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.02em', color: '#1d1d1f' }}>
            Why Hire LOCATOR?
          </h2>

          <div className="asa-stats-grid">
            <div data-reveal="left" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {REASONS.map(r => (
                <div key={r.title} style={{ display: 'flex', gap: '16px' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    display: 'grid', placeItems: 'center',
                    background: 'rgba(19,96,238,.10)', color: '#1360ee',
                  }}>
                    {r.icon}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: 800, color: '#1d1d1f' }}>{r.title}</h3>
                    <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.65, color: '#6e6e73' }}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div data-reveal="right" className="asa-stat-mini-grid">
              {STATS.map(s => (
                <div key={s.label} className="asa-stat-box">
                  <span style={{ fontSize: 'clamp(20px,2.4vw,26px)', fontWeight: 800, letterSpacing: '-.02em', color: s.accent }}>{s.value}</span>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#6e6e73' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
