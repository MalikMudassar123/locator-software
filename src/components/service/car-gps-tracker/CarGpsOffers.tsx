import Link from 'next/link'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

const OFFERS = [
  {
    title: 'Fuel Management',
    desc: 'Our vehicle GPS tracker helps ensure fuel is effectively managed, cutting waste and unnecessary consumption across your fleet.',
    bg: '#eef3ff', color: '#1360ee',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" /><path d="M13 9h3a2 2 0 0 1 2 2v2a1 1 0 0 0 1 1 1 1 0 0 0 1-1V8l-3-3" /><line x1="3" y1="22" x2="15" y2="22" /></svg>
    ),
  },
  {
    title: 'Real-Time Location & GPS',
    desc: 'LOCATOR is the best GPS tracker for cars when it comes to helping you see the exact location of your vehicles, live.',
    bg: '#edfff4', color: '#13923f',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
    ),
  },
  {
    title: 'Customizable Notifications & Alerts',
    desc: 'LOCATOR has been developed to help ensure that you make the right decisions, backed by alerts tailored to your fleet.',
    bg: '#fff3e8', color: '#f2600a',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
    ),
  },
]

export default function CarGpsOffers() {
  return (
    <>
      <style>{`
        .cgo-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; max-width: 1120px; margin: clamp(40px,5vw,56px) auto 0; }
        @media (max-width: 820px) { .cgo-cards { grid-template-columns: 1fr; } }
        .cgo-card {
          background: #fff; border: 1px solid #e7ebf3; border-radius: 20px; padding: 30px 26px;
          transition: transform .26s ${EASE}, box-shadow .26s ${EASE}, border-color .26s ${EASE};
        }
        .cgo-card:hover { transform: translateY(-4px); box-shadow: 0 22px 44px -20px rgba(19,96,238,.22); border-color: #dbe6ff; }
        .cgo-icon { width: 52px; height: 52px; border-radius: 15px; display: grid; place-items: center; margin-bottom: 18px; transition: transform .26s ${EASE}; }
        .cgo-card:hover .cgo-icon { transform: scale(1.06) rotate(-3deg); }
        .cgo-link { display: inline-flex; align-items: center; gap: 6px; margin-top: 14px; font-size: 13px; font-weight: 700; color: #1360ee; text-decoration: none; }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,88px) 28px', background: '#fff' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }} data-reveal>
          <span style={{ fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 800, letterSpacing: '.04em', color: '#1360ee', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            <span style={{ display: 'block', marginBottom: '12px' }}><span style={{ display: 'inline-block', width: '34px', height: '3px', background: '#1360ee', borderRadius: '2px' }} /></span>
            What This App Offers
          </span>
          <h2 style={{ margin: '0 0 16px', fontSize: 'clamp(19px,2.2vw,26px)', fontWeight: 800, lineHeight: 1.25, letterSpacing: '-.015em', color: '#1d1d1f' }}>
            What our Car Tracker app offers
          </h2>
          <p style={{ margin: 0, fontSize: 'clamp(13.5px,1.25vw,15px)', lineHeight: 1.8, color: '#5a6472' }}>
            LOCATOR is an app that has been developed with one goal in mind — to give you greater control over
            your vehicles and team than ever before. You won&apos;t have to worry about the location of your fleet
            or what your team is being used for, because our Car Tracker app takes care of that.
          </p>
        </div>

        <div className="cgo-cards">
          {OFFERS.map(o => (
            <div key={o.title} className="cgo-card" data-reveal>
              <span className="cgo-icon" style={{ background: o.bg, color: o.color }}>{o.icon}</span>
              <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 800, color: '#1d1d1f', letterSpacing: '-.01em' }}>{o.title}</h3>
              <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.65, color: '#6e6e73' }}>{o.desc}</p>
              <Link href="/contact" className="cgo-link">Read details →</Link>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
