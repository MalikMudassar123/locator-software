const FACTS = [
  { label: 'Regulator', value: 'ITC (Abu Dhabi)' },
  { label: 'Applies to', value: 'Commercial Fleets' },
  { label: 'Certification', value: 'Mandatory' },
]

export default function AsateelExplainer() {
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
            ASATEEL Certification & Its Importance
          </h2>
        </div>

        <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '32px' }}>
          <p style={{ margin: 0, fontSize: 'clamp(14.5px,1.3vw,16.5px)', lineHeight: 1.8, color: '#3a3a3c', textAlign: 'center' }}>
            <strong>ASATEEL</strong> is a fleet management platform developed by Abu Dhabi&apos;s <strong>Integrated Transport Centre (ITC)</strong> to enhance the accountability, productivity, and safety of commercial transport activities across the Emirate — including freight, passenger bus, and school bus transport.
          </p>
          <p style={{ margin: 0, fontSize: 'clamp(14.5px,1.3vw,16.5px)', lineHeight: 1.8, color: '#3a3a3c', textAlign: 'center' }}>
            Every such service must be registered on the ASATEEL platform to receive its certificate and operating permits. The platform tracks driver behavior and adherence to transport regulations using an approved GPS tracking device, promoting passenger safety and clarifying the responsibilities of every entity involved.
          </p>
          <p style={{ margin: 0, fontSize: 'clamp(14.5px,1.3vw,16.5px)', lineHeight: 1.8, color: '#3a3a3c', textAlign: 'center' }}>
            ASATEEL certification is mandatory for any transport company operating within the Emirate of Abu Dhabi.
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
