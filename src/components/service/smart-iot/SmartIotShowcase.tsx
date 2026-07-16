import Image from 'next/image'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

const BLOCKS = [
  {
    eyebrow: 'GPS Asset Tracking',
    title: 'GPS Asset Tracking',
    body: 'LOCATOR’s IoT GPS asset tracking helps UAE businesses monitor cargo containers, refrigerated trailers, tourism yachts, rental fleets, and fixed assets. With live location, movement history, and geofence alerts, companies reduce asset loss, improve delivery coordination, enhance driver and field-team control, and resolve claims faster with digital proof — making road operations smoother and stress-free.',
    image: '/hero/web-live-map.png',
    imageW: 1400,
    imageH: 1280,
  },
  {
    eyebrow: 'Equipment & Machinery',
    title: 'Equipment & Heavy Machinery Monitoring',
    body: 'LOCATOR delivers industrial telematics and IoT equipment tracking for UAE construction and facility assets like bulldozers, JCBs, cranes, boom loaders, generators, and forklifts. With real-time usage, idle monitoring, condition audits, and automated service alerts, businesses improve equipment uptime, operator safety, fuel control, and job-site operations using one centralized dashboard.',
    image: '/service_page/Construction Site Fleet.png',
    imageW: 1600,
    imageH: 786,
  },
  {
    eyebrow: 'Sensors & Telemetry',
    title: 'IoT Sensors & Telemetry Projects',
    body: 'LOCATOR delivers custom IoT sensors and real-time telemetry for UAE businesses, including cold-chain temperature tracking, fuel and liquid monitoring for fixed tanks, tilt sensors for concrete mix, door-status logs for cargo trucks, vibration analytics for heavy machines, and generator load tracking. This reduces failures, speeds issue resolution, improves compliance, and enables paperless, efficient field operations.',
    image: '/hero/web-graphical-report.png',
    imageW: 1400,
    imageH: 1282,
  },
]

export default function SmartIotShowcase() {
  return (
    <>
      <style>{`
        .sis-block { padding: clamp(48px,6vw,80px) 28px; }
        .sis-block:nth-child(even) { background: #f7f9fc; }
        .sis-grid { display: grid; grid-template-columns: 1fr 1.05fr; gap: clamp(32px,5vw,64px); align-items: center; max-width: 1180px; margin: 0 auto; }
        @media (max-width: 900px) { .sis-grid { grid-template-columns: 1fr; gap: 32px; } }
        .sis-block.flip .sis-text { order: 2; }
        .sis-block.flip .sis-viz { order: 1; }
        @media (max-width: 900px) { .sis-block.flip .sis-text, .sis-block.flip .sis-viz { order: 0; } }

        .sis-viz {
          border-radius: 18px; overflow: hidden;
          border: 1px solid #e7ebf3; background: #fff;
          box-shadow: 0 30px 60px -28px rgba(20,40,90,.3);
        }
        .sis-viz img { width: 100%; height: auto; display: block; }
      `}</style>

      <section>
        {BLOCKS.map((b, i) => (
          <div key={b.title} className={`sis-block${i % 2 === 1 ? ' flip' : ''}`}>
            <div className="sis-grid">
              <div className="sis-text" data-reveal={i % 2 === 1 ? 'right' : 'left'}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, letterSpacing: '.09em', color: '#1360ee', textTransform: 'uppercase', marginBottom: '14px' }}>
                  <span style={{ display: 'inline-block', width: '20px', height: '2px', background: '#1360ee', borderRadius: '2px' }} />
                  {b.eyebrow}
                </span>
                <h2 style={{ margin: '0 0 16px', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-.02em', color: '#1d1d1f' }}>
                  {b.title}
                </h2>
                <p style={{ margin: 0, fontSize: 'clamp(14px,1.3vw,16px)', lineHeight: 1.8, color: '#52525e', maxWidth: '52ch' }}>
                  {b.body}
                </p>
              </div>
              <div className="sis-viz" data-reveal={i % 2 === 1 ? 'left' : 'right'}>
                <Image src={b.image} alt={b.title} width={b.imageW} height={b.imageH} style={{ transition: `transform .5s ${EASE}` }} />
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
