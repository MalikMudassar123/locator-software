const FACTS = [
  { label: 'Regulator', value: 'SIRA (Dubai)' },
  { label: 'Applies to', value: 'Cargo Trucks' },
  { label: 'Non-compliance', value: 'Penalties Apply' },
]

export default function ShahinExplainer() {
  return (
    <section style={{ position: 'relative', padding: 'clamp(56px,7vw,80px) 28px', background: '#f7f9fc', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', width: 480, height: 480, top: -180, left: '50%', transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(50% 50% at 50% 50%, rgba(19,96,238,.08), transparent 70%)', filter: 'blur(10px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: '820px', margin: '0 auto' }}>
        <div data-reveal style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '.09em',
            color: '#1360ee', textTransform: 'uppercase' as const,
            display: 'block', marginBottom: '14px',
          }}>
            About the Regulation
          </span>
          <h2 style={{ margin: 0, fontSize: 'clamp(24px,3vw,34px)', fontWeight: 800, letterSpacing: '-.02em', color: '#1d1d1f' }}>
            What is SHAHIN?
          </h2>
        </div>

        <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '32px' }}>
          <p style={{ margin: 0, fontSize: 'clamp(14.5px,1.3vw,16.5px)', lineHeight: 1.8, color: '#3a3a3c', textAlign: 'center' }}>
            In Dubai, the <strong>Security Industry Regulatory Agency (SIRA)</strong> has introduced a mandatory regulation called <strong>SHAHIN</strong>. It requires every cargo-carrying truck registered in Dubai — or operating through a Dubai port — to be fitted with a certified GPS tracking device.
          </p>
          <p style={{ margin: 0, fontSize: 'clamp(14.5px,1.3vw,16.5px)', lineHeight: 1.8, color: '#3a3a3c', textAlign: 'center' }}>
            SHAHIN strengthens transportation security across the emirate, giving authorities the ability to track and trace cargo vehicles in real time — helping prevent theft, unauthorized use, and other unlawful activity.
          </p>
          <p style={{ margin: 0, fontSize: 'clamp(14.5px,1.3vw,16.5px)', lineHeight: 1.8, color: '#3a3a3c', textAlign: 'center' }}>
            Non-compliant vehicles may face penalties, so every fleet operator under this mandate needs an approved GPS tracker that meets SIRA&apos;s technical standards — installed and certified correctly the first time.
          </p>
        </div>

        <div data-reveal style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {FACTS.map(f => (
            <div key={f.label} style={{
              display: 'flex', flexDirection: 'column', gap: '3px',
              padding: '12px 20px', borderRadius: '14px',
              background: '#fff', border: '1px solid #e4e4e8',
              boxShadow: '0 2px 10px rgba(0,0,0,.03)',
              minWidth: '150px', textAlign: 'center',
            }}>
              <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: '#9a9aa2' }}>{f.label}</span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#1360ee' }}>{f.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
