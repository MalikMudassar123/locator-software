const EASE = 'cubic-bezier(.22,.61,.36,1)'

const REASONS = [
  'AI-powered fleet intelligence',
  'Reliable GPS and IoT technologies',
  'Real-time operational visibility',
  'Scalable enterprise solutions',
  'Enhanced fleet safety',
  'Reduced operational costs',
  'Local implementation and technical support',
  'Enterprise-grade security',
  'Continuous innovation',
  'Customer-first approach',
]

export default function WhoWeAreWhyChoose() {
  return (
    <>
      <style>{`
        .wwc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 24px; }
        @media (max-width: 720px) { .wwc-grid { grid-template-columns: 1fr; } }
        .wwc-row {
          display: flex; align-items: center; gap: 14px;
          padding: 16px 18px; border-radius: 14px;
          background: #fff; border: 1px solid #e8ecf4;
          transition: transform .2s ${EASE}, box-shadow .2s ${EASE}, border-color .2s ${EASE};
        }
        .wwc-row:hover { transform: translateX(4px); border-color: #cdd9ff; box-shadow: 0 10px 26px -14px rgba(20,40,90,.25); }
        .wwc-check {
          width: 26px; height: 26px; border-radius: 8px; flex-shrink: 0;
          display: grid; place-items: center;
          background: rgba(19,96,238,.1); color: #1360ee;
        }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,92px) 28px', background: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div data-reveal style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto clamp(40px,5vw,56px)' }}>
            <span style={{ display: 'block', fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 800, letterSpacing: '.04em', color: '#1360ee', textTransform: 'uppercase', marginBottom: '16px' }}>
              <span style={{ display: 'block', marginBottom: '12px' }}><span style={{ display: 'inline-block', width: '34px', height: '3px', background: '#1360ee', borderRadius: '2px' }} /></span>
              Why Businesses Choose LOCATOR
            </span>
            <h2 style={{ margin: 0, fontSize: 'clamp(19px,2.2vw,26px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.015em', color: '#1d1d1f' }}>
              Advanced technology, practical business expertise
            </h2>
          </div>

          <div className="wwc-grid">
            {REASONS.map((r, i) => (
              <div key={r} className="wwc-row" data-reveal data-reveal-delay={String((i % 2) * 70)}>
                <span className="wwc-check">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <span style={{ fontSize: 'clamp(14px,1.3vw,15.5px)', fontWeight: 600, color: '#1d1d1f' }}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
