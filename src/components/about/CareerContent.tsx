const EASE = 'cubic-bezier(.22,.61,.36,1)'

const REASONS = [
  {
    title: 'Purpose-Driven Work',
    desc: 'Build technology that solves real operational problems for businesses across the region — not features for their own sake.',
    accent: '#4f46e5',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 1 4 10.5c-.7.6-1 1.2-1 2H9c0-.8-.3-1.4-1-2A6 6 0 0 1 12 3z" />
      </svg>
    ),
  },
  {
    title: 'Ownership & Impact',
    desc: 'A team small enough that your work is directly visible — and trusted enough that you own it end to end.',
    accent: '#1360ee',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'A Growing Regional Leader',
    desc: 'Join at a stage where you can help shape how we scale toward our 2035 vision of a globally connected IoT network.',
    accent: '#13923f',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l6-6 4 4 8-8" /><path d="M17 7h4v4" />
      </svg>
    ),
  },
]

export default function CareerContent() {
  return (
    <>
      <style>{`
        .cr-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: clamp(16px,2vw,24px); }
        @media (max-width: 820px) { .cr-grid { grid-template-columns: 1fr; } }

        .cr-card {
          background: #fff; border: 1px solid #e8ecf4; border-radius: 20px;
          padding: clamp(24px,2.8vw,32px); display: flex; flex-direction: column; gap: 14px;
          box-shadow: 0 2px 12px rgba(20,40,90,.04);
          transition: transform .24s ${EASE}, box-shadow .24s ${EASE};
        }
        .cr-card:hover { transform: translateY(-4px); box-shadow: 0 20px 44px -20px rgba(20,40,90,.3); }
        .cr-icon { width: 48px; height: 48px; border-radius: 14px; display: grid; place-items: center; }

        .cr-cta {
          position: relative; overflow: hidden; text-align: center;
          border-radius: 28px; background: #0f1117; color: #fff;
          padding: clamp(44px,6vw,64px) clamp(24px,4vw,48px);
        }
        .cr-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: inherit; font-size: 14px; font-weight: 700;
          padding: 13px 28px; border-radius: 999px; text-decoration: none;
          background: #fff; color: #1360ee;
          transition: .18s ${EASE};
        }
        .cr-btn:hover { background: #f0f4ff; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,.14); }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,88px) 28px 0', background: '#fff' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div data-reveal style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto clamp(36px,5vw,52px)' }}>
            <span style={{ display: 'block', fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 800, letterSpacing: '.04em', color: '#4f46e5', textTransform: 'uppercase', marginBottom: '16px' }}>
              <span style={{ display: 'block', marginBottom: '12px' }}><span style={{ display: 'inline-block', width: '34px', height: '3px', background: '#4f46e5', borderRadius: '2px' }} /></span>
              Why Locator
            </span>
            <h2 style={{ margin: 0, fontSize: 'clamp(19px,2.2vw,26px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.015em', color: '#1d1d1f' }}>
              A place to do work that matters
            </h2>
          </div>

          <div className="cr-grid">
            {REASONS.map((r, i) => (
              <div key={r.title} className="cr-card" data-reveal data-reveal-delay={String(i * 80)}>
                <div className="cr-icon" style={{ background: `${r.accent}14`, color: r.accent }}>{r.icon}</div>
                <h3 style={{ margin: 0, fontSize: 'clamp(16px,1.6vw,19px)', fontWeight: 800, color: '#1d1d1f' }}>{r.title}</h3>
                <p style={{ margin: 0, fontSize: 'clamp(13.5px,1.2vw,15px)', lineHeight: 1.7, color: '#6e6e73' }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(56px,7vw,88px) 28px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div className="cr-cta" data-reveal="zoom">
            <span style={{ display: 'inline-block', fontSize: '11.5px', fontWeight: 700, letterSpacing: '.06em', color: 'rgba(255,255,255,.6)', marginBottom: '18px', textTransform: 'uppercase', background: 'rgba(255,255,255,.08)', borderRadius: '999px', padding: '5px 16px', border: '1px solid rgba(255,255,255,.14)' }}>
              No open roles listed right now
            </span>
            <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, letterSpacing: '-.02em', color: '#fff', lineHeight: 1.2, maxWidth: '26ch', margin: '0 auto 14px' }}>
              We&rsquo;re always glad to hear from great people
            </h2>
            <p style={{ margin: '0 auto', maxWidth: '440px', fontSize: 'clamp(14px,1.3vw,15.5px)', color: 'rgba(255,255,255,.72)', lineHeight: 1.65 }}>
              Don&rsquo;t see a role that fits? Send us your CV and tell us how you&rsquo;d like to contribute.
            </p>
            <div style={{ marginTop: '28px' }}>
              <a href="mailto:info@locator.ae" className="cr-btn">Send us your CV</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
