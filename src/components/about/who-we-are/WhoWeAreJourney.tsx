export default function WhoWeAreJourney() {
  return (
    <>
      <style>{`
        .wwj-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: clamp(32px,5vw,72px); align-items: start; max-width: 1120px; margin: 0 auto; }
        @media (max-width: 860px) { .wwj-grid { grid-template-columns: 1fr; gap: 24px; } }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,92px) 28px', background: '#f7f9fc' }}>
        <div className="wwj-grid">
          <div data-reveal="left">
            <span style={{ display: 'block', fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 800, letterSpacing: '.04em', color: '#1360ee', textTransform: 'uppercase', marginBottom: '16px' }}>
              <span style={{ display: 'block', marginBottom: '12px' }}><span style={{ display: 'inline-block', width: '34px', height: '3px', background: '#1360ee', borderRadius: '2px' }} /></span>
              Our Journey
            </span>
            <h2 style={{ margin: 0, fontSize: 'clamp(19px,2.2vw,26px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.015em', color: '#1d1d1f' }}>
              From GPS tracking to a connected mobility ecosystem
            </h2>
            <div style={{ marginTop: '22px', height: '4px', width: '72px', borderRadius: '999px', background: 'linear-gradient(90deg,#1360ee,#7c3aed)' }} />
          </div>

          <div data-reveal="right" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <p style={{ margin: 0, fontSize: 'clamp(14.5px,1.35vw,16.5px)', lineHeight: 1.8, color: '#52525e' }}>
              Since our inception, LOCATOR has remained committed to redefining fleet management through innovation and technology. What began as a provider of GPS vehicle tracking solutions has evolved into a comprehensive fleet telematics and IoT platform trusted by businesses across the United Arab Emirates.
            </p>
            <p style={{ margin: 0, fontSize: 'clamp(14.5px,1.35vw,16.5px)', lineHeight: 1.8, color: '#52525e' }}>
              As industries continue to embrace digital transformation, LOCATOR has expanded its capabilities beyond traditional vehicle tracking by integrating Artificial Intelligence, cloud technologies, IoT connectivity, and intelligent analytics into one unified ecosystem. Today, we continue to innovate — helping organizations improve operational efficiency, strengthen safety, reduce costs, and prepare for the future of connected mobility.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
