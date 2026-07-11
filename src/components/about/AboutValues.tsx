const EASE = 'cubic-bezier(.22,.61,.36,1)'

const VALUES = [
  {
    title: 'Customer Success First',
    desc: 'We focus on improving our customers’ efficiency, profitability, transparency, and end-customer experience.',
    accent: '#1360ee',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    title: 'Purpose-Driven Innovation',
    desc: 'We build technology that solves real operational problems and creates measurable business impact.',
    accent: '#7c3aed',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 1 4 10.5c-.7.6-1 1.2-1 2H9c0-.8-.3-1.4-1-2A6 6 0 0 1 12 3z" />
      </svg>
    ),
  },
  {
    title: 'Operational Excellence',
    desc: 'We simplify operations, remove chaos, and help customers run their fleet and field teams with more control, clarity, and efficiency.',
    accent: '#13923f',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
        <circle cx="12" cy="12" r="3.5" />
      </svg>
    ),
  },
  {
    title: 'Transparency & Trust',
    desc: 'We build systems, processes, and relationships that improve visibility, accountability, and trust between us, our customers, and their end customers.',
    accent: '#0e9aa7',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: 'Safety & Sustainability',
    desc: 'We promote safer driving, smarter fleet usage, lower fuel consumption, and a reduced carbon footprint.',
    accent: '#c2740a',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2.5 1.5 6.5-1.4 10.2" /><path d="M2 22c1.5-4 4-7 8-8" />
      </svg>
    ),
  },
  {
    title: 'Ownership with Integrity',
    desc: 'We take responsibility, act honestly, and deliver every commitment with transparency and trust.',
    accent: '#4f46e5',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
]

export default function AboutValues() {
  return (
    <>
      <style>{`
        .val-wrap { display: grid; grid-template-columns: 0.82fr 1.18fr; gap: clamp(32px,5vw,80px); align-items: start; max-width: 1160px; margin: 0 auto; }
        @media (max-width: 880px) { .val-wrap { grid-template-columns: 1fr; gap: 36px; } }

        .val-aside { position: sticky; top: 110px; }
        @media (max-width: 880px) { .val-aside { position: static; } }

        .val-row {
          position: relative;
          display: grid; grid-template-columns: auto auto 1fr; align-items: flex-start;
          gap: clamp(14px,2vw,24px);
          padding: clamp(22px,2.6vw,30px) 0 clamp(22px,2.6vw,30px) 18px;
          border-top: 1px solid #e8ecf4;
          transition: transform .26s ${EASE};
        }
        .val-row:last-child { border-bottom: 1px solid #e8ecf4; }
        /* accent bar that grows on hover */
        .val-row::before {
          content: ''; position: absolute; left: 0; top: 50%;
          width: 3px; height: 0; border-radius: 3px;
          background: var(--val-accent); transform: translateY(-50%);
          transition: height .3s ${EASE};
        }
        .val-row:hover { transform: translateX(6px); }
        .val-row:hover::before { height: 66%; }

        .val-num {
          font-family: ui-monospace, 'Cascadia Code', monospace;
          font-size: 13px; font-weight: 700; letter-spacing: .04em;
          color: #b8c0d0; padding-top: 12px; transition: color .26s ${EASE};
        }
        .val-row:hover .val-num { color: var(--val-accent); }

        .val-icon {
          width: 46px; height: 46px; border-radius: 13px;
          display: grid; place-items: center; flex-shrink: 0;
          transition: transform .26s ${EASE};
        }
        .val-row:hover .val-icon { transform: scale(1.08) rotate(-4deg); }
      `}</style>

      <section id="values" style={{ padding: 'clamp(56px,7vw,96px) 28px', background: '#fff' }}>
        <div className="val-wrap">
          <aside className="val-aside" data-reveal="left">
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.09em', color: '#1360ee', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>
              What we stand for
            </span>
            <h2 style={{ margin: 0, fontSize: 'clamp(28px,3.4vw,44px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.025em', color: '#1d1d1f' }}>
              Our Core Values
            </h2>
            <p style={{ margin: '18px 0 0', maxWidth: '360px', fontSize: 'clamp(14px,1.35vw,16px)', color: '#6e6e73', lineHeight: 1.65 }}>
              The principles behind every product we ship and every relationship we build.
            </p>
            <div style={{ marginTop: '22px', height: '4px', width: '72px', borderRadius: '999px', background: 'linear-gradient(90deg,#1360ee,#7c3aed)' }} />
          </aside>

          <div>
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="val-row"
                data-reveal
                data-reveal-delay={String(i * 60)}
                style={{ '--val-accent': v.accent } as React.CSSProperties}
              >
                <span className="val-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="val-icon" style={{ background: `${v.accent}14`, color: v.accent }}>
                  {v.icon}
                </span>
                <div>
                  <h3 style={{ margin: '0 0 7px', fontSize: 'clamp(16px,1.7vw,20px)', fontWeight: 800, letterSpacing: '-.018em', color: '#1d1d1f' }}>
                    {v.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 'clamp(13.5px,1.2vw,15px)', lineHeight: 1.7, color: '#6e6e73' }}>
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
