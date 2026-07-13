const EASE = 'cubic-bezier(.22,.61,.36,1)'

const INDUSTRIES = [
  {
    title: 'Transportation & Logistics',
    desc: 'Prevent cargo loss with AI theft detection and HD video proof, speeding claims, reducing fraud disputes, and improving fleet safety across deliveries and loading hubs.',
    accent: '#1360ee',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17.5" cy="18" r="1.6" />
      </svg>
    ),
  },
  {
    title: 'Warehouse',
    desc: 'Enable 24/7 AI video monitoring for forklifts and machines, preventing equipment damage, boosting operator accountability, and strengthening warehouse incident reporting.',
    accent: '#13923f',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V8l9-4 9 4v13" /><path d="M7 21v-7h10v7" /><path d="M7 14h10" />
      </svg>
    ),
  },
  {
    title: 'Construction',
    desc: 'Improve site visibility with AI camera tracking and workforce monitoring, validating discrepancies, enhancing safety compliance, and optimizing job-site transport operations.',
    accent: '#c2740a',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20" /><path d="M4 20V9l8-3 8 3v11" /><path d="M9 20v-5h6v5" />
      </svg>
    ),
  },
  {
    title: 'School Districts',
    desc: 'Protect students and drivers with AI behavior monitoring and stop-arm violation evidence, improving road safety, driver training, and regulatory enforcement.',
    accent: '#7c3aed',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10L12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" />
      </svg>
    ),
  },
  {
    title: 'Waste Management',
    desc: 'Resolve complaints faster using real-time HD video and portal retrieval, improving driver coaching, service quality, and customer issue resolution.',
    accent: '#0e9aa7',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M5 6l1 15h12l1-15" /><path d="M10 11v6M14 11v6" />
      </svg>
    ),
  },
  {
    title: 'Field Services & Recovery Vehicles',
    desc: 'Provide premium safety assurance with AI-protected video telematics for high-value vehicle transport, validating service completion and adding customer trust through recorded proof.',
    accent: '#d6456b',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 13l2-5h9l4 4h3v4h-2" /><circle cx="7" cy="17" r="1.8" /><circle cx="17" cy="17" r="1.8" /><path d="M9 17h6" />
      </svg>
    ),
  },
]

export default function VideoTelematicsIndustries() {
  return (
    <>
      <style>{`
        .vti-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: clamp(16px,2vw,24px); }
        @media (max-width: 900px) { .vti-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 600px) { .vti-grid { grid-template-columns: 1fr; } }

        .vti-card {
          position: relative; overflow: hidden;
          background: #fff; border: 1px solid #e8ecf4; border-radius: 20px;
          padding: clamp(24px,2.8vw,30px); display: flex; flex-direction: column; gap: 14px;
          box-shadow: 0 2px 12px rgba(20,40,90,.04);
          transition: transform .24s ${EASE}, box-shadow .24s ${EASE};
        }
        .vti-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--vti-accent); transform: scaleX(0); transform-origin: left;
          transition: transform .3s ${EASE};
        }
        .vti-card:hover { transform: translateY(-4px); box-shadow: 0 20px 44px -20px rgba(20,40,90,.28); }
        .vti-card:hover::before { transform: scaleX(1); }
        .vti-icon { width: 48px; height: 48px; border-radius: 14px; display: grid; place-items: center; }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,88px) 28px', background: '#fff' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div data-reveal style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto clamp(36px,5vw,52px)' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.09em', color: '#1360ee', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>
              Industries we serve
            </span>
            <h2 style={{ margin: 0, fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.02em', color: '#1d1d1f' }}>
              Revolutionizing Industries with AI Camera &amp; Video Telematics
            </h2>
          </div>

          <div className="vti-grid">
            {INDUSTRIES.map((ind, i) => (
              <div
                key={ind.title}
                className="vti-card"
                data-reveal
                data-reveal-delay={String((i % 3) * 90)}
                style={{ '--vti-accent': ind.accent } as React.CSSProperties}
              >
                <div className="vti-icon" style={{ background: `${ind.accent}14`, color: ind.accent }}>{ind.icon}</div>
                <h3 style={{ margin: 0, fontSize: 'clamp(16px,1.6vw,19px)', fontWeight: 800, color: '#1d1d1f' }}>{ind.title}</h3>
                <p style={{ margin: 0, fontSize: 'clamp(13.5px,1.2vw,15px)', lineHeight: 1.7, color: '#6e6e73' }}>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
