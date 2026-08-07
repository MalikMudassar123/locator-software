'use client'

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

function ReportCard() {
  const bars = [42, 68, 55, 80, 64, 90, 74]
  return (
    <div style={{
      background: '#fff', borderRadius: '20px', border: '1px solid #e7ebf3',
      boxShadow: '0 30px 70px -28px rgba(19,96,238,.22), 0 4px 14px rgba(20,40,90,.06)',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 18px', borderBottom: '1px solid #eef1f7' }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          {['#ff5f57', '#febc2e', '#28c840'].map(c => (
            <span key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c, display: 'inline-block' }} />
          ))}
        </div>
        <span style={{ fontSize: '11.5px', color: '#6e6e73', fontWeight: 600, marginLeft: '6px' }}>Detailed Report &middot; VAN-204</span>
      </div>

      <div style={{ padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '18px' }}>
          {[
            { l: 'Distance', v: '284 km', c: '#1360ee' },
            { l: 'Trips',    v: '9',      c: '#13923f' },
            { l: 'Idle',     v: '38 min', c: '#c2740a' },
          ].map(s => (
            <div key={s.l} style={{ background: '#f5f7fb', borderRadius: '12px', padding: '12px' }}>
              <div style={{ fontSize: '10px', color: '#8a93a2', fontWeight: 600, marginBottom: '5px' }}>{s.l}</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: s.c }}>{s.v}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#f5f7fb', borderRadius: '14px', padding: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#6e6e73', marginBottom: '10px' }}>Distance covered — this week</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '90px' }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex: 1, borderRadius: '4px 4px 0 0', background: i === 5 ? '#1360ee' : '#dbe3f5', height: `${h}%`, transition: `height .3s ${EASE}` }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: '9.5px', fontWeight: 700, color: i === 5 ? '#1360ee' : '#a1a1a6' }}>{d}</div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', padding: '11px 14px', background: '#edfff4', borderRadius: '12px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#13923f', flexShrink: 0 }} />
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#13923f' }}>100% accurate &middot; Report generated in real time</span>
        </div>
      </div>
    </div>
  )
}

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
          <div data-reveal="right">
            <ReportCard />
          </div>
        </div>
      </section>
    </>
  )
}
