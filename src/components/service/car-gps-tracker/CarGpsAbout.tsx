const EASE = 'cubic-bezier(.22,.61,.36,1)'

const CHECKLIST = [
  'Checking the activities of your fleet on the road',
  'Receiving notifications about their fuel consumption',
  'Knowing when drivers are deviating from their normal routes',
  'Getting notified when your cars are due for maintenance',
  'And many more',
]

const ALERTS = [
  { icon: '⛽', title: 'Fuel consumption spike',    sub: 'VAN-204 · 18 L today',        bg: '#fff3e8', c: '#c2740a' },
  { icon: '🧭', title: 'Route deviation detected',   sub: 'TRK-118 · Off planned route', bg: '#eef3ff', c: '#1360ee' },
  { icon: '🔧', title: 'Maintenance due',            sub: 'VAN-211 · 320 km remaining',   bg: '#fff0f2', c: '#c0384d' },
  { icon: '✅', title: 'Trip completed safely',       sub: 'BUS-007 · No violations',      bg: '#edfff4', c: '#13923f' },
]

export default function CarGpsAbout() {
  return (
    <>
      <style>{`
        .cga-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(36px,5vw,72px); align-items: center; max-width: 1160px; margin: 0 auto; }
        @media (max-width: 900px) { .cga-grid { grid-template-columns: 1fr; } .cga-grid > div:last-child { order: -1; } }
        .cga-item { display: flex; align-items: flex-start; gap: 12px; }
        .cga-check {
          width: 22px; height: 22px; border-radius: 7px; flex-shrink: 0; margin-top: 1px;
          background: #eef3ff; color: #1360ee; display: grid; place-items: center;
          transition: transform .2s ${EASE}, background .2s ${EASE};
        }
        .cga-item:hover .cga-check { background: #1360ee; color: #fff; transform: scale(1.08); }
        .cga-alert-row { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 12px; transition: transform .2s ${EASE}; }
        .cga-alert-row:hover { transform: translateX(3px); }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,92px) 28px', background: '#f7f9fc' }}>
        <div className="cga-grid">
          {/* Copy */}
          <div data-reveal="left">
            <span style={{ fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 800, letterSpacing: '.04em', color: '#1360ee', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
              <span style={{ display: 'block', marginBottom: '12px' }}><span style={{ display: 'inline-block', width: '34px', height: '3px', background: '#1360ee', borderRadius: '2px' }} /></span>
              The Device
            </span>
            <h2 style={{ margin: '0 0 16px', fontSize: 'clamp(19px,2.2vw,26px)', fontWeight: 800, lineHeight: 1.25, letterSpacing: '-.015em', color: '#1d1d1f' }}>
              About our Car GPS Tracker device
            </h2>
            <p style={{ margin: '0 0 28px', fontSize: 'clamp(13.5px,1.25vw,15px)', lineHeight: 1.8, color: '#5a6472', maxWidth: '48ch' }}>
              LOCATOR is the best vehicle GPS tracker, with next-generation features to ensure visibility of
              your fleet in any location. Imagine the possibility of:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {CHECKLIST.map(item => (
                <div key={item} className="cga-item">
                  <span className="cga-check">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span style={{ fontSize: '14.5px', color: '#3a3a3c', fontWeight: 600, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live alerts visual */}
          <div data-reveal="right">
            <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #e7ebf3', boxShadow: '0 30px 70px -28px rgba(19,96,238,.2), 0 4px 14px rgba(20,40,90,.06)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px 20px', borderBottom: '1px solid #eef1f7' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#1fbf5b', boxShadow: '0 0 0 4px rgba(31,191,91,.18)' }} />
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#1d1d1f' }}>Live Alerts</span>
                <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#8a93a2', fontWeight: 600 }}>Just now</span>
              </div>
              <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {ALERTS.map(a => (
                  <div key={a.title} className="cga-alert-row" style={{ background: a.bg }}>
                    <span style={{ fontSize: '18px' }}>{a.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#1d1d1f' }}>{a.title}</div>
                      <div style={{ fontSize: '11.5px', color: a.c, marginTop: '1px' }}>{a.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
