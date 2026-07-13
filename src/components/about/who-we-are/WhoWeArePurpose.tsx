export default function WhoWeArePurpose() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(56px,7vw,92px) 28px', background: '#f7f9fc' }}>
      <div aria-hidden="true" style={{ position: 'absolute', width: 460, height: 460, top: -160, left: '50%', transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(50% 50% at 50% 50%, rgba(19,96,238,.07), transparent 70%)', pointerEvents: 'none' }} />

      <div data-reveal style={{ position: 'relative', maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.09em', color: '#1360ee', textTransform: 'uppercase', display: 'block', marginBottom: '18px' }}>
          Purpose
        </span>
        <h2 style={{ margin: 0, fontSize: 'clamp(26px,3.6vw,44px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-.03em', color: '#1d1d1f' }}>
          We exist to transform movement into{' '}
          <span style={{ color: '#1360ee' }}>intelligent growth</span>
        </h2>
        <div style={{ margin: '24px auto', height: '4px', width: '80px', borderRadius: '999px', background: 'linear-gradient(90deg,#1360ee,#7c3aed)' }} />
        <p style={{ margin: 0, fontSize: 'clamp(15px,1.5vw,17px)', lineHeight: 1.8, color: '#52525e' }}>
          At LOCATOR, we exist to help businesses unlock the full potential of their vehicles, assets, and field teams. Through AI-powered IoT, intelligent telematics, and connected mobility technologies, we transform underutilized resources into drivers of operational excellence. By delivering real-time visibility, greater control, improved efficiency, enhanced safety, and complete transparency, we empower organizations to reduce costs, increase profitability, and achieve sustainable growth with purpose.
        </p>
      </div>
    </section>
  )
}
