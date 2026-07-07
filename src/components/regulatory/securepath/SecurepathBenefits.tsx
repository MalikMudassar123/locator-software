const BENEFITS = [
  'Theft prevention & recovery of lost assets',
  'Operational efficiency through real-time tracking',
  'Remote vehicle immobilization in case of theft or malpractice',
  'Dedicated customer support with an intuitive interface',
]

export default function SecurepathBenefits() {
  return (
    <>
      <style>{`
        .sp-ben-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: clamp(32px,5vw,56px); align-items: center; }
        @media (max-width: 820px) { .sp-ben-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#f7f9fc' }}>
        <div className="sp-ben-grid" style={{ maxWidth: '1000px', margin: '0 auto' }}>

          <div data-reveal="left" style={{ background: '#fff', border: '1px solid #e4e4e8', borderRadius: '22px', padding: 'clamp(24px,3vw,32px)' }}>
            <h3 style={{ margin: '0 0 18px', fontSize: '15px', fontWeight: 800, letterSpacing: '.02em', textTransform: 'uppercase' as const, color: '#1d1d1f' }}>
              What You Get
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {BENEFITS.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: '50%', flexShrink: 0, marginTop: '1px',
                    background: 'rgba(19,96,238,.14)', color: '#1360ee',
                    display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 800,
                  }}>✓</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal="right">
            <span style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '.09em',
              color: '#1360ee', textTransform: 'uppercase' as const,
              display: 'block', marginBottom: '14px',
            }}>
              Benefits
            </span>
            <h2 style={{ margin: '0 0 18px', fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-.02em', color: '#1d1d1f' }}>
              Benefits of Using SecurePath GPS Tracking Systems
            </h2>
            <p style={{ margin: '0 0 14px', fontSize: 'clamp(14px,1.25vw,15.5px)', lineHeight: 1.75, color: '#52525e' }}>
              Security takes center stage — the system aids significantly in theft prevention and the recovery of lost assets in Dubai, while real-time tracking fosters operational efficiency so businesses can plan effectively.
            </p>
            <p style={{ margin: 0, fontSize: 'clamp(14px,1.25vw,15.5px)', lineHeight: 1.75, color: '#52525e' }}>
              SecurePath also allows businesses and authorities to immobilize vehicles in case of theft or malpractice, backed by an intuitive interface and dedicated customer support for a seamless experience.
            </p>
          </div>

        </div>
      </section>
    </>
  )
}
