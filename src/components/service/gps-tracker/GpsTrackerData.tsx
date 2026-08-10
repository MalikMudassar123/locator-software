'use client'
import Image from 'next/image'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

const CHECKLIST = [
  'Providing real-time reports for your fleet',
  'Enabling your fleet to stay fully visible',
  'Backed by the most reliable GPS tracker device',
  'Reducing overall fleet running costs',
  'Delivering 100% accurate reporting',
  'Monitoring the usage of every asset',
  'Automating routine fleet workflows',
]

export default function GpsTrackerData() {
  return (
    <>
      <style>{`
        .gtd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(36px,5vw,72px); align-items: center; max-width: 1160px; margin: 0 auto; }
        @media (max-width: 900px) { .gtd-grid { grid-template-columns: 1fr; } .gtd-grid > div:last-child { order: -1; } }
        .gtd-item { display: flex; align-items: flex-start; gap: 12px; }
        .gtd-check {
          width: 22px; height: 22px; border-radius: 7px; flex-shrink: 0; margin-top: 1px;
          background: #eef3ff; color: #1360ee; display: grid; place-items: center;
          transition: transform .2s ${EASE}, background .2s ${EASE};
        }
        .gtd-item:hover .gtd-check { background: #1360ee; color: #fff; transform: scale(1.08); }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,92px) 28px', background: '#f7f9fc' }}>
        <div className="gtd-grid">
          {/* Copy */}
          <div data-reveal="left">
            <span style={{ fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 800, letterSpacing: '.04em', color: '#1360ee', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
              <span style={{ display: 'block', marginBottom: '12px' }}><span style={{ display: 'inline-block', width: '34px', height: '3px', background: '#1360ee', borderRadius: '2px' }} /></span>
              Accurate By Design
            </span>
            <h2 style={{ margin: '0 0 16px', fontSize: 'clamp(19px,2.2vw,26px)', fontWeight: 800, lineHeight: 1.25, letterSpacing: '-.015em', color: '#1d1d1f' }}>
              Highly accurate and unique data
            </h2>
            <p style={{ margin: '0 0 28px', fontSize: 'clamp(13.5px,1.25vw,15px)', lineHeight: 1.75, color: '#5a6472', maxWidth: '50ch' }}>
              Every GPS Tracker device we install has been built with state-of-the-art positioning
              technology, generating 100% accurate data and reports. Use it to make important decisions
              about how vehicles are used across your business.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {CHECKLIST.map(item => (
                <div key={item} className="gtd-item">
                  <span className="gtd-check">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span style={{ fontSize: '14.5px', color: '#3a3a3c', fontWeight: 600, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div data-reveal="right" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Soft blue wash so the illustration sits on the section instead of floating */}
            <div aria-hidden="true" style={{
              position: 'absolute', inset: '6% 4%', zIndex: 0, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(19,96,238,.10), transparent 68%)',
              filter: 'blur(6px)',
            }} />
            <Image
              src="/footer_pages_images/gps-tracker/accurate-data.png"
              alt="Detailed GPS tracker reports printing out of a mobile device"
              width={1193}
              height={1072}
              sizes="(max-width: 900px) 90vw, 46vw"
              style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '520px', height: 'auto', display: 'block' }}
            />
          </div>
        </div>
      </section>
    </>
  )
}
