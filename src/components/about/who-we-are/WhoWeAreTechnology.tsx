const EASE = 'cubic-bezier(.22,.61,.36,1)'

const PILLARS = [
  {
    title: 'AI-Powered Analytics',
    desc: 'Turning millions of daily data points into meaningful, decision-ready insights.',
    accent: '#1360ee',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="M7 14l3-3 3 3 5-6" />
      </svg>
    ),
  },
  {
    title: 'IoT Connectivity',
    desc: 'Connecting vehicles, assets, and sensors into one intelligent ecosystem.',
    accent: '#13923f',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2.4" /><circle cx="5" cy="6" r="1.6" /><circle cx="19" cy="6" r="1.6" /><circle cx="5" cy="18" r="1.6" /><circle cx="19" cy="18" r="1.6" /><path d="M6.4 7.1 10 10.6M17.6 7.1 14 10.6M6.4 16.9 10 13.4M17.6 16.9 14 13.4" />
      </svg>
    ),
  },
  {
    title: 'Intelligent GPS Hardware',
    desc: 'Reliable, ruggedized devices built for real-world fleet conditions.',
    accent: '#7c3aed',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 6h2" /><circle cx="12" cy="16" r="1.5" />
      </svg>
    ),
  },
  {
    title: 'Cloud Computing',
    desc: 'Scalable, secure infrastructure that grows with your operations.',
    accent: '#c2740a',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.2 9.5 4 4 0 0 0 7 17.5" /><path d="M8 19h9.5" />
      </svg>
    ),
  },
  {
    title: 'Real-Time Intelligence',
    desc: 'Live operational visibility that powers faster, smarter decisions.',
    accent: '#0e9aa7',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: 'Automated Workflows',
    desc: 'Streamlining daily operations and reducing downtime across the fleet.',
    accent: '#4f46e5',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" /><circle cx="12" cy="12" r="4" /><path d="M12 8v4l2.5 1.5" />
      </svg>
    ),
  },
]

export default function WhoWeAreTechnology() {
  return (
    <>
      <style>{`
        .wwt-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: clamp(32px,5vw,64px); align-items: center; max-width: var(--w-1160); margin: 0 auto; }
        @media (max-width: 900px) { .wwt-grid { grid-template-columns: 1fr; gap: 36px; } }
        .wwt-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 520px) { .wwt-cards { grid-template-columns: 1fr; } }
        .wwt-card {
          background: #fff; border: 1px solid #e8ecf4; border-radius: 16px;
          padding: 20px; display: flex; flex-direction: column; gap: 10px;
          transition: transform .24s ${EASE}, box-shadow .24s ${EASE};
        }
        .wwt-card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px -20px rgba(20,40,90,.28); }
        .wwt-icon { width: 42px; height: 42px; border-radius: 12px; display: grid; place-items: center; }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,92px) 28px', background: '#f7f9fc' }}>
        <div className="wwt-grid">
          <div data-reveal="left">
            <span style={{ display: 'block', fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 800, letterSpacing: '.04em', color: '#1360ee', textTransform: 'uppercase', marginBottom: '16px' }}>
              <span style={{ display: 'block', marginBottom: '12px' }}><span style={{ display: 'inline-block', width: '34px', height: '3px', background: '#1360ee', borderRadius: '2px' }} /></span>
              Technology & Innovation
            </span>
            <h2 style={{ margin: '0 0 18px', fontSize: 'clamp(19px,2.2vw,26px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.015em', color: '#1d1d1f' }}>
              Innovation drives everything we do
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ margin: 0, fontSize: 'clamp(14px,1.3vw,16px)', lineHeight: 1.8, color: '#52525e' }}>
                LOCATOR combines AI-powered analytics, IoT connectivity, intelligent GPS hardware, cloud computing, and real-time operational intelligence to create a connected ecosystem for modern businesses.
              </p>
              <p style={{ margin: 0, fontSize: 'clamp(14px,1.3vw,16px)', lineHeight: 1.8, color: '#52525e' }}>
                Our platform transforms millions of daily data points into meaningful insights — enabling organizations to improve fleet efficiency, reduce downtime, strengthen security, automate workflows, and make smarter decisions through a single, integrated platform.
              </p>
            </div>
          </div>

          <div className="wwt-cards" data-reveal="right">
            {PILLARS.map(p => (
              <div key={p.title} className="wwt-card">
                <div className="wwt-icon" style={{ background: `${p.accent}14`, color: p.accent }}>{p.icon}</div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#1d1d1f', letterSpacing: '-.01em' }}>{p.title}</h3>
                <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, color: '#6e6e73' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
