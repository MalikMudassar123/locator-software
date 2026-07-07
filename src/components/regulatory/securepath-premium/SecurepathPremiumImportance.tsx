import Image from 'next/image'

export default function SecurepathPremiumImportance() {
  return (
    <>
      <style>{`
        .spp-imp-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: clamp(32px,5vw,56px); align-items: center; }
        @media (max-width: 820px) { .spp-imp-grid { grid-template-columns: 1fr; } }
        .spp-imp-phone { max-width: 260px; margin: 0 auto; filter: drop-shadow(0 24px 40px rgba(20,40,90,.22)); }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#fff' }}>
        <div className="spp-imp-grid" style={{ maxWidth: '1000px', margin: '0 auto' }}>

          <div data-reveal="left" className="spp-imp-phone">
            <Image
              src="/hero/mobile-notifications.png"
              alt="Locator mobile notifications — SecurePath Premium compliance alerts"
              width={700}
              height={1504}
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '30px' }}
            />
          </div>

          <div data-reveal="right">
            <span style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '.09em',
              color: '#1360ee', textTransform: 'uppercase' as const,
              display: 'block', marginBottom: '14px',
            }}>
              Why It Matters
            </span>
            <h2 style={{ margin: '0 0 18px', fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-.02em', color: '#1d1d1f' }}>
              Importance of SecurePath Premium
            </h2>
            <p style={{ margin: '0 0 14px', fontSize: 'clamp(14px,1.25vw,15.5px)', lineHeight: 1.75, color: '#52525e' }}>
              The Security Industry Regulatory Agency (SIRA) has implemented strict regulations to ensure the safety and protection of businesses. One of the key requirements is the Certificate of Installation for GPS Trackers — mandatory for businesses to ensure compliance with the authorities.
            </p>
            <p style={{ margin: '0 0 14px', fontSize: 'clamp(14px,1.25vw,15.5px)', lineHeight: 1.75, color: '#52525e' }}>
              By subscribing to SecurePath Premium, business owners can ensure their GPS tracking systems are installed and maintained according to SIRA&apos;s guidelines — helping them stay compliant while enhancing the overall security of their operations.
            </p>
            <p style={{ margin: 0, fontSize: 'clamp(14px,1.25vw,15.5px)', lineHeight: 1.75, color: '#52525e' }}>
              Failure to comply can result in penalties, fines, or even legal consequences. By utilizing SecurePath Premium, business owners can have peace of mind knowing they&apos;re operating within the legal framework.
            </p>
          </div>

        </div>
      </section>
    </>
  )
}
