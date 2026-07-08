import Image from 'next/image'

export default function SecurepathPremiumDevice() {
  return (
    <>
      <style>{`
        .spp-dev-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: clamp(32px,5vw,64px); align-items: center; }
        @media (max-width: 900px) { .spp-dev-grid { grid-template-columns: 1fr; } }
        @media (max-width: 900px) { .spp-dev-grid > div:last-child { order: -1; } }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#fff' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>

          <div className="spp-dev-grid" style={{ marginBottom: '28px' }}>
            <div data-reveal="left">
              <h2 style={{ margin: '0 0 18px', fontSize: 'clamp(22px,2.8vw,30px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-.02em', color: '#1360ee' }}>
                Compatible Device for SecurePath Premium
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ margin: 0, fontSize: 'clamp(14px,1.25vw,15.5px)', lineHeight: 1.8, color: '#6e6e73' }}>
                  One important consideration when selecting a suitable GPS device for SecurePath Premium is ensuring that it is approved by the Security Industry Regulatory Agency (SIRA). There are certain SIRA-approved GPS devices that are allowed to be installed in order to obtain a SecurePath Premium Certification. One of these devices is the FMC150.
                </p>
                <p style={{ margin: 0, fontSize: 'clamp(14px,1.25vw,15.5px)', lineHeight: 1.8, color: '#6e6e73' }}>
                  The FMC150 offers robust real-time tracking capabilities, efficient performance, and superior connectivity options. Not only does it excel in technical capabilities, but its compliance with SecurePath Premium and SIRA standards also makes it a reliable choice.
                </p>
              </div>
            </div>

            <div data-reveal="right">
              <Image
                src="/regulatory/Secure_path_preimume/SecurePath-Premium-Device-Installation.png"
                alt="SecurePath Premium compatible GPS device installation illustration"
                width={2297}
                height={1865}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>

          <p data-reveal style={{ margin: 0, fontSize: 'clamp(14px,1.25vw,15.5px)', lineHeight: 1.8, color: '#6e6e73' }}>
            Choosing Teltonika&apos;s FMC150 offers numerous benefits that cater businesses. Firstly, it ensures robust security measures to protect your fleet. Secondly, it streamlines fleet management operations, making them more efficient and effective. Thirdly, Teltonika&apos;s FMC150 is designed to comply with relevant regulations, ensuring that you meet all legal requirements.
          </p>

        </div>
      </section>
    </>
  )
}
