const EASE = 'cubic-bezier(.22,.61,.36,1)'

const STATS = [
  { value: '15+',      label: 'Years in business',   tone: 'blue'   as const },
  { value: '6,000+',   label: 'Happy customers',     tone: 'light'  as const },
  { value: '60,000+',  label: 'Tracked devices',     tone: 'light'  as const },
  { value: '25M+', label: 'Data points daily', tone: 'orange' as const },
]

const TONE_STYLE = {
  blue:   { background: 'linear-gradient(155deg, #1a6bf0, #0d4fd4)', color: '#fff',    sub: 'rgba(255,255,255,.72)', border: 'transparent' },
  orange: { background: 'linear-gradient(155deg, #ff9a3d, #f2600a)', color: '#fff',    sub: 'rgba(255,255,255,.78)', border: 'transparent' },
  light:  { background: '#f5f7fb', color: '#1360ee', sub: '#6e6e73', border: '#e7ebf3' },
}

export default function CarTrackerStats() {
  return (
    <>
      <style>{`
        .cts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(36px,5vw,72px); align-items: center; max-width: 1160px; margin: 0 auto; }
        @media (max-width: 860px) { .cts-grid { grid-template-columns: 1fr; } }
        .cts-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .cts-card {
          border-radius: 18px; padding: 22px 22px 20px; border: 1px solid transparent;
          transition: transform .26s ${EASE}, box-shadow .26s ${EASE};
        }
        .cts-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px -20px rgba(19,96,238,.28); }
      `}</style>

      <section style={{ padding: 'clamp(48px,6vw,72px) 28px', background: '#fff' }}>
        <div className="cts-grid">
          {/* Stat cards */}
          <div className="cts-cards" data-reveal="left">
            {STATS.map(s => {
              const t = TONE_STYLE[s.tone]
              return (
                <div key={s.label} className="cts-card" style={{ background: t.background, border: `1px solid ${t.border}` }}>
                  <div style={{ fontSize: 'clamp(22px,2.4vw,28px)', fontWeight: 800, color: t.color, letterSpacing: '-.01em' }}>{s.value}</div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: t.sub, marginTop: '6px' }}>{s.label}</div>
                </div>
              )
            })}
          </div>

          {/* About */}
          <div data-reveal="right">
            <span style={{ fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 800, letterSpacing: '.04em', color: '#1360ee', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
              <span style={{ display: 'block', marginBottom: '12px' }}><span style={{ display: 'inline-block', width: '34px', height: '3px', background: '#1360ee', borderRadius: '2px' }} /></span>
              About LOCATOR
            </span>
            <h2 style={{ margin: '0 0 16px', fontSize: 'clamp(19px,2.2vw,26px)', fontWeight: 800, lineHeight: 1.25, letterSpacing: '-.015em', color: '#1d1d1f' }}>
              A next-generation car tracker app
            </h2>
            <p style={{ margin: 0, fontSize: 'clamp(13.5px,1.25vw,15px)', lineHeight: 1.8, color: '#5a6472', maxWidth: '48ch' }}>
              LOCATOR is an application with next-generation features to ensure your cars and vehicles are
              accurately tracked without any compromise. The Car Tracker app comes with highly sophisticated
              and advanced features that make vehicle tracking a complete walk in the park — well ahead of
              other tracking devices you may have used in the past.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
