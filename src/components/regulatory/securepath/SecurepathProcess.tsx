const EASE = 'cubic-bezier(.22,.61,.36,1)'

const STEPS = [
  {
    num: '01',
    title: 'Approved Installation',
    desc: 'Our technician installs your approved GPS tracker with a data SIM card, on-site.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M11 8V4M17 8V4M11 24v-4M17 24v-4M8 11H4M8 17H4M24 11h-4M24 17h-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    accent: '#1360ee',
  },
  {
    num: '02',
    title: 'Certificate Issued',
    desc: 'After successful installation, we issue your Certificate of Installation.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4l9 3.5v6c0 6-3.8 10.4-9 12-5.2-1.6-9-6-9-12v-6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M10 14l2.6 2.6L18 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: '#13923f',
  },
  {
    num: '03',
    title: 'RTA Registration',
    desc: 'The certificate is used to register your vehicle with the Roads and Transport Authority.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 14h10M9 10h6M9 18h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    accent: '#7c3aed',
  },
  {
    num: '04',
    title: 'Login & Monitor',
    desc: 'Receive your login credentials and start tracking and monitoring your vehicles.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M8 20l4-4 3 3 5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="10" r="4" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    accent: '#c2740a',
  },
]

export default function SecurepathProcess() {
  return (
    <>
      <style>{`
        .sp-step-card {
          background: #fff;
          border: 1px solid #e4e4e8;
          border-radius: 20px;
          padding: clamp(20px, 2.8vw, 32px);
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,.04);
          transition: transform .22s ${EASE}, box-shadow .22s ${EASE};
        }
        .sp-step-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(0,0,0,.09);
        }
        .sp-step-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: 20px 20px 0 0;
          background: var(--step-accent, #1360ee);
          opacity: 0;
          transition: opacity .22s ${EASE};
        }
        .sp-step-card:hover::before { opacity: 1; }

        .sp-step-grid { position: relative; display: grid; grid-template-columns: repeat(4,1fr); gap: clamp(12px,1.8vw,20px); }
        .sp-step-grid::before {
          content: '';
          position: absolute;
          top: calc(clamp(20px,2.8vw,32px) + 20px);
          left: 12.5%; right: 12.5%;
          height: 1px;
          background: linear-gradient(90deg, rgba(19,96,238,.0) 0%, rgba(19,96,238,.18) 20%, rgba(19,96,238,.18) 80%, rgba(19,96,238,.0) 100%);
          z-index: 0; pointer-events: none;
        }
        @media (max-width: 800px) {
          .sp-step-grid::before { display: none; }
          .sp-step-grid { display: flex !important; flex-direction: column !important; }
        }

        .sp-step-icon-wrap {
          width: 48px; height: 48px; border-radius: 14px;
          display: grid; place-items: center;
          flex-shrink: 0; position: relative; z-index: 1;
        }
        .sp-step-num {
          font-size: 11px; font-weight: 800;
          font-family: ui-monospace, 'Cascadia Code', monospace;
          letter-spacing: .06em;
          position: absolute; top: clamp(14px,2vw,20px); right: clamp(14px,2vw,20px);
          opacity: .35;
        }

        .sp-portal-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 14px; font-weight: 700; color: #1360ee;
          text-decoration: none; padding: 13px 26px;
          border: 1.5px solid rgba(19,96,238,.2); border-radius: 999px;
          transition: .18s ${EASE};
        }
        .sp-portal-link:hover { background: #1360ee; color: #fff; transform: translateY(-1px); }
      `}</style>

      <section id="process" style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#f7f9fc' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>

          <div data-reveal style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '.09em',
              color: '#1360ee', textTransform: 'uppercase' as const,
              display: 'block', marginBottom: '14px',
            }}>
              Process
            </span>
            <h2 style={{
              margin: '0 auto', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800,
              lineHeight: 1.1, letterSpacing: '-.02em', color: '#1d1d1f', maxWidth: '600px',
            }}>
              GPS Installation & SecurePath Certification
            </h2>
            <p style={{
              margin: '16px auto 0', maxWidth: '480px',
              fontSize: 'clamp(14px,1.3vw,16px)', color: '#6e6e73', lineHeight: 1.6,
            }}>
              As an approved vendor, we handle the entire installation and certification process for you.
            </p>
          </div>

          <div className="sp-step-grid" data-reveal>
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="sp-step-card"
                style={{ '--step-accent': step.accent } as React.CSSProperties}
                data-reveal
                data-reveal-delay={String(i * 80)}
              >
                <span className="sp-step-num">{step.num}</span>
                <div className="sp-step-icon-wrap" style={{ background: `${step.accent}15`, color: step.accent }}>
                  {step.icon}
                </div>
                <h3 style={{ margin: 0, fontSize: 'clamp(15px,1.5vw,18px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-.018em', color: '#1d1d1f' }}>
                  {step.title}
                </h3>
                <p style={{ margin: 0, fontSize: 'clamp(13px,1.2vw,14.5px)', lineHeight: 1.65, color: '#6e6e73' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div data-reveal style={{ textAlign: 'center', marginTop: '40px' }}>
            <a href="https://securepath.ae" target="_blank" rel="noopener noreferrer" className="sp-portal-link">
              Visit the Official SecurePath Portal
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>

        </div>
      </section>
    </>
  )
}
