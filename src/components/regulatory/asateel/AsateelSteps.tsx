const EASE = 'cubic-bezier(.22,.61,.36,1)'

const STEPS = [
  {
    num: '01',
    title: 'Create Your Account',
    desc: 'Register based on your company type — Abu Dhabi or outside Abu Dhabi — and fill in the required information.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
      </svg>
    ),
    accent: '#1360ee',
  },
  {
    num: '02',
    title: 'Select Your Business Category',
    desc: 'Choose the appropriate category — passenger transport, freight transport, or your relevant service type.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 14h10M9 10h6M9 18h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    accent: '#13923f',
  },
  {
    num: '03',
    title: 'Upload Documents & Apply',
    desc: 'Submit the required documents with your application and wait for approval from ITC.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    ),
    accent: '#7c3aed',
  },
  {
    num: '04',
    title: 'Get Approved & Access Services',
    desc: 'Receive your confirmation email and unlock permits, GPS vehicle tracking, and more.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M8 20l4-4 3 3 5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="10" r="4" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    accent: '#c2740a',
  },
]

export default function AsateelSteps() {
  return (
    <>
      <style>{`
        .asa-step-card {
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
        .asa-step-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(0,0,0,.09);
        }
        .asa-step-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: 20px 20px 0 0;
          background: var(--step-accent, #1360ee);
          opacity: 0;
          transition: opacity .22s ${EASE};
        }
        .asa-step-card:hover::before { opacity: 1; }

        .asa-step-grid { position: relative; display: grid; grid-template-columns: repeat(4,1fr); gap: clamp(12px,1.8vw,20px); }
        .asa-step-grid::before {
          content: '';
          position: absolute;
          top: calc(clamp(20px,2.8vw,32px) + 20px);
          left: 12.5%; right: 12.5%;
          height: 1px;
          background: linear-gradient(90deg, rgba(19,96,238,.0) 0%, rgba(19,96,238,.18) 20%, rgba(19,96,238,.18) 80%, rgba(19,96,238,.0) 100%);
          z-index: 0; pointer-events: none;
        }
        @media (max-width: 800px) {
          .asa-step-grid::before { display: none; }
          .asa-step-grid { display: flex !important; flex-direction: column !important; }
        }

        .asa-step-icon-wrap {
          width: 48px; height: 48px; border-radius: 14px;
          display: grid; place-items: center;
          flex-shrink: 0; position: relative; z-index: 1;
        }
        .asa-step-num {
          font-size: 11px; font-weight: 800;
          font-family: ui-monospace, 'Cascadia Code', monospace;
          letter-spacing: .06em;
          position: absolute; top: clamp(14px,2vw,20px); right: clamp(14px,2vw,20px);
          opacity: .35;
        }

        .asa-portal-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 14px; font-weight: 700; color: #1360ee;
          text-decoration: none; padding: 13px 26px;
          border: 1.5px solid rgba(19,96,238,.2); border-radius: 999px;
          transition: .18s ${EASE};
        }
        .asa-portal-link:hover { background: #1360ee; color: #fff; transform: translateY(-1px); }
      `}</style>

      <section id="enroll" style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#f7f9fc' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>

          <div data-reveal style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '.09em',
              color: '#1360ee', textTransform: 'uppercase' as const,
              display: 'block', marginBottom: '14px',
            }}>
              Enroll in the ASATEEL Platform
            </span>
            <h2 style={{
              margin: '0 auto', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800,
              lineHeight: 1.1, letterSpacing: '-.02em', color: '#1d1d1f', maxWidth: '560px',
            }}>
              Get ASATEEL-Certified in 4 Steps
            </h2>
            <p style={{
              margin: '16px auto 0', maxWidth: '480px',
              fontSize: 'clamp(14px,1.3vw,16px)', color: '#6e6e73', lineHeight: 1.6,
            }}>
              Transport operators can apply online — our team manages the entire enrollment process for you.
            </p>
          </div>

          <div className="asa-step-grid" data-reveal>
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="asa-step-card"
                style={{ '--step-accent': step.accent } as React.CSSProperties}
                data-reveal
                data-reveal-delay={String(i * 80)}
              >
                <span className="asa-step-num">{step.num}</span>
                <div className="asa-step-icon-wrap" style={{ background: `${step.accent}15`, color: step.accent }}>
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
            <a href="https://asateel.itc.gov.ae" target="_blank" rel="noopener noreferrer" className="asa-portal-link">
              Visit the Official ASATEEL Portal
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
