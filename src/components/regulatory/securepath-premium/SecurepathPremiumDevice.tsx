import Image from 'next/image'

export default function SecurepathPremiumDevice() {
  return (
    <>
      <style>{`
        .spp-dev-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: clamp(32px,5vw,56px); align-items: center; }
        @media (max-width: 820px) { .spp-dev-grid { grid-template-columns: 1fr; } }
        @media (max-width: 820px) { .spp-dev-grid > div:last-child { order: -1; } }
        .spp-dev-phone { max-width: 260px; margin: 0 auto; filter: drop-shadow(0 24px 40px rgba(20,40,90,.22)); }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#fff' }}>
        <div className="spp-dev-grid" style={{ maxWidth: '1000px', margin: '0 auto' }}>

          <div data-reveal="left">
            <span style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '.09em',
              color: '#1360ee', textTransform: 'uppercase' as const,
              display: 'block', marginBottom: '14px',
            }}>
              Approved Hardware
            </span>
            <h2 style={{ margin: '0 0 18px', fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-.02em', color: '#1d1d1f' }}>
              Compatible Device for SecurePath Premium
            </h2>
            <p style={{ margin: '0 0 14px', fontSize: 'clamp(14px,1.25vw,15.5px)', lineHeight: 1.75, color: '#52525e' }}>
              A suitable GPS device for SecurePath Premium must be approved by the Security Industry Regulatory Agency (SIRA). One of the SIRA-approved devices allowed for certification is the <strong>Teltonika FMC150</strong>.
            </p>
            <p style={{ margin: '0 0 14px', fontSize: 'clamp(14px,1.25vw,15.5px)', lineHeight: 1.75, color: '#52525e' }}>
              The FMC150 offers robust real-time tracking capabilities, efficient performance, and superior connectivity options — excelling both technically and in compliance with SecurePath Premium and SIRA standards.
            </p>
            <p style={{ margin: 0, fontSize: 'clamp(14px,1.25vw,15.5px)', lineHeight: 1.75, color: '#52525e' }}>
              Choosing the FMC150 ensures robust security for your fleet, streamlines fleet management operations, and keeps you compliant with every relevant regulation.
            </p>
          </div>

          <div data-reveal="right" className="spp-dev-phone">
            <Image
              src="/hero/mobile-map-view.png"
              alt="Locator mobile live map — FMC150 GPS tracking device compatibility"
              width={700}
              height={1504}
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '30px' }}
            />
          </div>

        </div>
      </section>
    </>
  )
}
