const EASE = 'cubic-bezier(.22,.61,.36,1)'

const LEFT_ITEMS = [
  { title: 'Real Time Tracking',    desc: 'The exact location of your cars will be provided, including all their activities.' },
  { title: 'Intuitive Interface',   desc: 'LOCATOR has been designed by some of the best hands in the industry.' },
  { title: 'Route Tracking',        desc: 'Review daily activities, trips, and parking with detailed route playback for a period of one year.' },
  { title: 'Geofencing Technology', desc: 'With this feature, you’ll know the moment a car enters or exits a pre-specified zone.' },
]

const RIGHT_ITEMS = [
  { title: 'Idle Alerts',              desc: 'If any vehicles are sitting idle, you’ll be notified right away.' },
  { title: 'After Hours Notifications', desc: 'If any of your vehicles is used after official hours, you’ll be instantly notified.' },
  { title: 'Service Reminders',        desc: 'Get alerts about servicing and RTA renewals as per UAE regulations.' },
  { title: 'Report Scheduler',         desc: 'Easily schedule your own preferred time for reports to be delivered.' },
]

function PhoneMock() {
  const segments = [
    { pct: 42, color: '#1fbf5b' },
    { pct: 21, color: '#ff9f0a' },
    { pct: 37, color: '#ff5f57' },
  ]
  let acc = 0
  const stops = segments.map(s => {
    const from = acc
    acc += s.pct
    return `${s.color} ${from}% ${acc}%`
  }).join(', ')

  return (
    <div style={{
      width: 'min(58vw, 220px)', borderRadius: '30px', overflow: 'hidden',
      background: '#0f1117', border: '6px solid #0f1117',
      boxShadow: '0 34px 60px -22px rgba(19,96,238,.34), 0 4px 14px rgba(20,40,90,.1)',
    }}>
      {/* Status bar */}
      <div style={{ background: '#1360ee', padding: '10px 14px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '10px', color: '#fff', fontWeight: 700 }}>5:26</span>
        <span style={{ fontSize: '10px', color: '#fff', fontWeight: 800, letterSpacing: '.02em' }}>LOC@TOR</span>
        <span style={{ fontSize: '9px', color: 'rgba(255,255,255,.85)', fontWeight: 700 }}>87%</span>
      </div>

      <div style={{ background: '#fff', padding: '18px 16px 14px' }}>
        {/* Ring chart */}
        <div style={{
          width: '128px', height: '128px', borderRadius: '50%', margin: '0 auto 12px',
          background: `conic-gradient(${stops})`,
          display: 'grid', placeItems: 'center', position: 'relative',
        }}>
          <div style={{ width: '84px', height: '84px', borderRadius: '50%', background: '#fff', display: 'grid', placeItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '19px', fontWeight: 800, color: '#1360ee' }}>13</div>
              <div style={{ fontSize: '8px', color: '#8a93a2', fontWeight: 700 }}>TOTAL</div>
            </div>
          </div>
        </div>

        {/* Status legend */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
          {[
            { l: 'Moving', v: '6', c: '#1fbf5b' },
            { l: 'Idling', v: '3', c: '#ff9f0a' },
            { l: 'Stopped', v: '4', c: '#ff5f57' },
          ].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.c, margin: '0 auto 4px' }} />
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#1d1d1f' }}>{s.v}</div>
              <div style={{ fontSize: '8px', color: '#8a93a2', fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Quick-action tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px' }}>
          {['Live View', 'Trips', 'Report', 'Summary'].map(t => (
            <div key={t} style={{ background: '#f5f7fb', borderRadius: '9px', padding: '9px 10px', fontSize: '9.5px', fontWeight: 700, color: '#3a3a3c' }}>{t}</div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ background: '#fff', borderTop: '1px solid #eef1f7', display: 'flex', justifyContent: 'space-around', padding: '9px 0' }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{ width: '16px', height: '16px', borderRadius: '4px', background: i === 1 ? '#1360ee' : '#dbe3f5', display: 'inline-block' }} />
        ))}
      </div>
    </div>
  )
}

function ItemRow({ title, desc, align }: { title: string; desc: string; align: 'left' | 'right' }) {
  return (
    <div className={align === 'right' ? 'gtw-item-row gtw-item-row--reverse' : 'gtw-item-row'} style={{ display: 'flex', gap: '13px', alignItems: 'flex-start', flexDirection: align === 'right' ? 'row-reverse' : 'row', textAlign: align }}>
      <span style={{
        width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
        background: '#1360ee', color: '#fff', display: 'grid', placeItems: 'center',
        transition: `transform .24s ${EASE}`,
      }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
      </span>
      <div>
        <h3 style={{ margin: '0 0 5px', fontSize: '14.5px', fontWeight: 800, color: '#1d1d1f' }}>{title}</h3>
        <p style={{ margin: 0, fontSize: '12.5px', lineHeight: 1.65, color: '#6e6e73', maxWidth: '30ch' }}>{desc}</p>
      </div>
    </div>
  )
}

export default function GpsTrackingWhy() {
  return (
    <section style={{ padding: 'clamp(56px,7vw,92px) 28px', background: '#f7f9fc' }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
        <div data-reveal style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto clamp(40px,5vw,56px)' }}>
          <span style={{ fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 800, letterSpacing: '.04em', color: '#1360ee', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            <span style={{ display: 'block', marginBottom: '12px' }}><span style={{ display: 'inline-block', width: '34px', height: '3px', background: '#1360ee', borderRadius: '2px', margin: '0 auto' }} /></span>
            Why LOCATOR
          </span>
          <h2 style={{ margin: '0 0 14px', fontSize: 'clamp(19px,2.2vw,26px)', fontWeight: 800, lineHeight: 1.3, letterSpacing: '-.015em', color: '#1d1d1f' }}>
            Why you need our GPS tracking system for vehicles in UAE
          </h2>
          <p style={{ margin: 0, fontSize: 'clamp(13.5px,1.25vw,15px)', lineHeight: 1.75, color: '#6e6e73' }}>
            There are plenty of reasons to start using LOCATOR — its features are breathtaking and impressive,
            guaranteed to keep your cars secure while providing accurate tracking information. Here&apos;s why it&apos;s
            the best GPS vehicle tracking system:
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 'clamp(24px,4vw,56px)', alignItems: 'center' }} className="gtw-why-grid">
          <div data-reveal="left" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px,3vw,34px)' }}>
            {LEFT_ITEMS.map(it => <ItemRow key={it.title} title={it.title} desc={it.desc} align="left" />)}
          </div>

          <div data-reveal="zoom" style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneMock />
          </div>

          <div data-reveal="right" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px,3vw,34px)' }}>
            {RIGHT_ITEMS.map(it => <ItemRow key={it.title} title={it.title} desc={it.desc} align="right" />)}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .gtw-why-grid { grid-template-columns: 1fr !important; }
            .gtw-item-row--reverse { flex-direction: row !important; text-align: left !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
