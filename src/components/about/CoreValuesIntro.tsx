export default function CoreValuesIntro() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(56px,7vw,92px) 28px', background: '#f7f9fc' }}>
      <div aria-hidden="true" style={{ position: 'absolute', width: 460, height: 460, top: -160, left: '50%', transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(50% 50% at 50% 50%, rgba(19,96,238,.07), transparent 70%)', pointerEvents: 'none' }} />

      <div data-reveal style={{ position: 'relative', maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
        <span style={{ display: 'block', marginBottom: '20px' }}>
          <span style={{ display: 'inline-block', width: '34px', height: '3px', background: '#1360ee', borderRadius: '2px' }} />
        </span>
        <h2 style={{ margin: 0, fontSize: 'max(clamp(26px,3.2vw,38px), min(2.5vw, 52px))', fontWeight: 800, lineHeight: 1.18, letterSpacing: '-.02em', color: '#1d1d1f' }}>
          The principles behind every product we ship and{' '}
          <span style={{ color: '#1360ee' }}>every relationship we build</span>
        </h2>
        <div style={{ margin: '24px auto', height: '4px', width: '80px', borderRadius: '999px', background: 'linear-gradient(90deg,#1360ee,#0d4fd4)' }} />
        <p style={{ margin: 0, fontSize: 'max(clamp(15px,1.5vw,17px), min(1.181vw, 24.65px))', lineHeight: 1.8, color: '#52525e' }}>
          The principles behind every product we ship and every relationship we build — guiding how we work with customers, partners, and each other every day.
        </p>
      </div>
    </section>
  )
}
