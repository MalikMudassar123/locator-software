const REASONS = [
  {
    title: 'Competitive Pricing',
    desc: 'As one of the leading GPS providers, LOCATOR offer the most aggressively priced solutions for your ASATEEL Certification.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="M9 9.5a2.5 2 0 0 1 5 0c0 1.5-2.5 1.5-2.5 3M12 16.5v.01" />
      </svg>
    ),
  },
  {
    title: 'Exceptional Support',
    desc: "You'll be confident to trust us with your business. Our team is dedicated to providing the best possible experience for our customers, and we'll work tirelessly to ensure that the installed GPS tracker flawlessly updates in the ASATEEL platform.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3z" /><path d="M3 19a2 2 0 0 0 2 2h1v-6H3z" />
      </svg>
    ),
  },
  {
    title: 'Seamless Software Integrations',
    desc: "But that's not all - we understand the importance of integrating the installed GPS tracker to another platform such as LOCATOR or any other ERP. That's why we've assembled a powerful team of experts to ensure that ASATEEL GPS Tracker can easily integrate with the other tools and services.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3H5a2 2 0 0 0-2 2v3" /><path d="M21 8V5a2 2 0 0 0-2-2h-3" /><path d="M16 21h3a2 2 0 0 0 2-2v-3" /><path d="M3 16v3a2 2 0 0 0 2 2h3" />
      </svg>
    ),
  },
]

const STATS = [
  { value: '15+', label: 'Years in Business', bg: '#1360ee', color: '#fff' },
  { value: '6,000+', label: 'Happy Customers', bg: '#fff', color: '#1360ee' },
  { value: '60,000+', label: 'Tracked Devices', bg: '#fff', color: '#1360ee' },
  { value: '25M+', label: 'Data points Daily', bg: '#f15a24', color: '#fff' },
]

export default function AsateelStats() {
  return (
    <>
      <style>{`
        .asa-stats-grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: clamp(32px,5vw,56px); align-items: start; }
        @media (max-width: 860px) { .asa-stats-grid { grid-template-columns: 1fr; } }
        .asa-stat-box {
          border-radius: 12px; padding: clamp(20px,2.4vw,26px);
          display: flex; flex-direction: column; gap: 6px; justify-content: center;
          min-height: 108px;
        }
        .asa-stat-mini-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#fff' }}>
        <div style={{ maxWidth: 'var(--w-1080)', margin: '0 auto' }}>

          <h2 data-reveal style={{ margin: '0 0 40px', fontSize: 'max(clamp(24px,3vw,36px), min(2.500vw, 52.2px))', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.02em', color: '#1d1d1f' }}>
            Why Hire LOCATOR?
          </h2>

          <div className="asa-stats-grid">
            <div data-reveal="left" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {REASONS.map(r => (
                <div key={r.title} style={{ display: 'flex', gap: '16px' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    display: 'grid', placeItems: 'center',
                    background: '#f7f9fc', border: '1px solid #eef0f4', color: '#1360ee',
                  }}>
                    {r.icon}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 6px', fontSize: 'var(--f-16)', fontWeight: 800, color: '#1360ee' }}>{r.title}</h3>
                    <p style={{ margin: 0, fontSize: 'var(--f-13-5)', lineHeight: 1.65, color: '#6e6e73' }}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div data-reveal="right" className="asa-stat-mini-grid">
              {STATS.map(s => (
                <div key={s.label} className="asa-stat-box" style={{ background: s.bg, boxShadow: s.bg === '#fff' ? '0 2px 12px rgba(0,0,0,.06)' : '0 10px 26px rgba(19,96,238,.18)' }}>
                  <span style={{ fontSize: 'max(clamp(20px,2.4vw,26px), min(1.806vw, 37.7px))', fontWeight: 800, letterSpacing: '-.02em', color: s.color }}>{s.value}</span>
                  <span style={{ fontSize: 'var(--f-13)', fontWeight: 600, color: s.bg === '#fff' ? '#1d1d1f' : 'rgba(255,255,255,.9)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
