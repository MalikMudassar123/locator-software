import Image from 'next/image'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

const CHECKLIST = [
  'Unauthorized vehicle access',
  'Vehicles that are over-speeding',
  'Vehicles that have remained idle for hours',
  'Cars that are deviating from their pre-specified routes',
  'Geofencing',
]

const STATS = [
  { value: '10',     label: 'Years in Business' },
  { value: '1,000',  label: 'Happy Customers' },
  { value: '20,000', label: 'Tracked Devices' },
]

function LaptopMock() {
  return (
    <div style={{ position: 'relative', display: 'grid', placeItems: 'center', padding: '20px 0 40px' }}>
      {/* Fanned "ghost" screens behind the laptop, built from the same real dashboard shot */}
      {[
        { rotate: -10, x: -34, y: 10, scale: 0.86, opacity: 0.35, z: 0 },
        { rotate: -6,  x: -18, y: 4,  scale: 0.92, opacity: 0.55, z: 1 },
      ].map((g, i) => (
        <div key={i} aria-hidden="true" style={{
          position: 'absolute', zIndex: g.z, width: 'min(84%, 380px)', aspectRatio: '1600 / 1019',
          borderRadius: '10px', overflow: 'hidden', border: '1px solid #e4e4e8',
          boxShadow: '0 20px 40px -20px rgba(20,40,90,.22)',
          transform: `translate(${g.x}px, ${g.y}px) rotate(${g.rotate}deg) scale(${g.scale})`,
          opacity: g.opacity, background: '#eef3fb',
        }}>
          <Image src="/dashboard.png" alt="" width={1600} height={1019} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ))}

      {/* Laptop screen */}
      <div style={{ position: 'relative', zIndex: 2, width: 'min(88%, 400px)' }}>
        <div style={{
          background: '#191a1e', borderRadius: '14px 14px 4px 4px', padding: '9px 9px 5px',
          boxShadow: '0 34px 60px -22px rgba(20,40,90,.32), 0 4px 14px rgba(20,40,90,.08)',
        }}>
          <div style={{ borderRadius: '5px', overflow: 'hidden', aspectRatio: '1600 / 1019', background: '#eef3fb' }}>
            <Image src="/dashboard.png" alt="LOCATOR live fleet dashboard" width={1600} height={1019} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
        </div>
        {/* Base / keyboard deck */}
        <div style={{
          width: '112%', marginLeft: '-6%', height: '14px',
          background: 'linear-gradient(180deg, #d4d6db, #b7bac1)',
          borderRadius: '0 0 10px 10px',
          boxShadow: '0 10px 18px -6px rgba(20,40,90,.28)',
          display: 'flex', justifyContent: 'center',
        }}>
          <div style={{ width: '64px', height: '5px', marginTop: '2px', background: '#9a9da5', borderRadius: '999px' }} />
        </div>
      </div>
    </div>
  )
}

export default function GpsTrackingLaptop() {
  return (
    <>
      <style>{`
        .gtl-grid { display: grid; grid-template-columns: 0.95fr 1.05fr; gap: clamp(32px,5vw,64px); align-items: center; max-width: 1160px; margin: 0 auto; }
        @media (max-width: 900px) { .gtl-grid { grid-template-columns: 1fr; } }
        .gtl-check { width: 20px; height: 20px; border-radius: 6px; flex-shrink: 0; background: #eef3ff; color: #1360ee; display: grid; place-items: center; transition: transform .2s ${EASE}, background .2s ${EASE}; }
        .gtl-item:hover .gtl-check { background: #1360ee; color: #fff; transform: scale(1.08); }
        .gtl-stats { display: flex; gap: clamp(24px,4vw,48px); margin-top: 32px; flex-wrap: wrap; }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,92px) 28px', background: '#fff' }}>
        <div className="gtl-grid">
          {/* Laptop visual */}
          <div data-reveal="left">
            <LaptopMock />
          </div>

          {/* Copy */}
          <div data-reveal="right">
            <span style={{ fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 800, letterSpacing: '.04em', color: '#1360ee', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
              <span style={{ display: 'block', marginBottom: '12px' }}><span style={{ display: 'inline-block', width: '34px', height: '3px', background: '#1360ee', borderRadius: '2px' }} /></span>
              Built To Keep Watch
            </span>
            <h2 style={{ margin: '0 0 16px', fontSize: 'clamp(19px,2.2vw,26px)', fontWeight: 800, lineHeight: 1.25, letterSpacing: '-.015em', color: '#1d1d1f' }}>
              The best GPS tracking system for UAE
            </h2>
            <p style={{ margin: '0 0 24px', fontSize: 'clamp(13.5px,1.25vw,15px)', lineHeight: 1.8, color: '#5a6472', maxWidth: '48ch' }}>
              LOCATOR makes monitoring your vehicles a complete walk in the park. Thanks to its innovative
              features, the process stays seamless and accurate. For instance, you&apos;ll receive alerts on:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
              {CHECKLIST.map(item => (
                <div key={item} className="gtl-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '11px' }}>
                  <span className="gtl-check">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span style={{ fontSize: '14px', color: '#3a3a3c', fontWeight: 600, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>

            <div className="gtl-stats">
              {STATS.map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 'clamp(20px,2.2vw,26px)', fontWeight: 800, letterSpacing: '-.01em' }}>
                    <span style={{ color: '#f2600a' }}>{s.value}</span>
                    <span style={{ color: '#1360ee' }}>+</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#8a93a2', fontWeight: 600, marginTop: '2px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
