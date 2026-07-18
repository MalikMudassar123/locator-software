import Image from 'next/image'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

const REASONS = [
  {
    title: 'Advanced Features',
    desc: 'We have the best GPS tracker for vehicles — built on advanced, sophisticated features to ensure your cars stay 100% safe.',
    accent: '#1360ee',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    title: 'Competitive Pricing',
    desc: 'As part of our mission to see every vehicle tracked in the UAE, our GPS tracker pricing is kept highly competitive.',
    accent: '#13923f',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M8 11l2.5 2.5L16 8" />
      </svg>
    ),
  },
  {
    title: 'Seamless Software Integration',
    desc: 'LOCATOR integrates with any third-party software or application of your choice — no restrictions on how you use the platform.',
    accent: '#7c3aed',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5a9 9 0 0 1 14 0" /><path d="M8 15.5a5 5 0 0 1 8 0" /><circle cx="12" cy="18.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
]

export default function ServiceWhyChoose() {
  return (
    <>
      <style>{`
        .swc-grid { display: grid; grid-template-columns: 1fr 1.05fr; gap: clamp(36px,5vw,72px); align-items: center; max-width: 1200px; margin: 0 auto; }
        @media (max-width: 940px) { .swc-grid { grid-template-columns: 1fr; gap: 40px; } .swc-grid > div:last-child { order: -1; } }

        .swc-row { display: flex; gap: 16px; align-items: flex-start; }
        .swc-ic {
          width: 52px; height: 52px; border-radius: 14px; flex-shrink: 0;
          display: grid; place-items: center;
          transition: transform .24s ${EASE};
        }
        .swc-row:hover .swc-ic { transform: scale(1.06) rotate(-3deg); }
      `}</style>

      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(56px,7vw,92px) 28px', background: '#f7f9fc' }}>
        <div aria-hidden="true" style={{ position: 'absolute', width: 520, height: 420, top: -80, right: '-4%', borderRadius: '50%', background: 'radial-gradient(50% 50% at 50% 50%, rgba(19,96,238,.10), transparent 72%)', filter: 'blur(20px)', pointerEvents: 'none' }} />

        <div className="swc-grid">
          {/* Left: copy + reasons */}
          <div data-reveal="left">
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.09em', color: '#1360ee', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>
              Why LOCATOR
            </span>
            <h2 style={{ margin: '0 0 clamp(28px,4vw,40px)', fontSize: 'clamp(26px,3.4vw,42px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.025em', color: '#1d1d1f' }}>
              Why businesses choose LOCATOR
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(22px,3vw,30px)' }}>
              {REASONS.map(r => (
                <div key={r.title} className="swc-row">
                  <span className="swc-ic" style={{ background: `${r.accent}14`, color: r.accent }}>{r.icon}</span>
                  <div>
                    <h3 style={{ margin: '0 0 7px', fontSize: 'clamp(16px,1.7vw,19px)', fontWeight: 800, letterSpacing: '-.018em', color: '#1d1d1f' }}>{r.title}</h3>
                    <p style={{ margin: 0, fontSize: 'clamp(13.5px,1.25vw,15px)', lineHeight: 1.7, color: '#6e6e73', maxWidth: '46ch' }}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: LOCATOR dashboard illustration */}
          <div data-reveal="right" style={{ position: 'relative' }}>
            <Image
              src="/service_page/Best-GPS-Tracker for-Vehicle.webp"
              alt="LOCATOR GPS tracking dashboard — the best GPS tracker for vehicles"
              width={1198}
              height={1078}
              style={{ width: '100%', maxWidth: '540px', height: 'auto', display: 'block', margin: '0 auto' }}
            />
          </div>
        </div>
      </section>
    </>
  )
}
