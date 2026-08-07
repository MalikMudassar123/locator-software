import Link from 'next/link'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

const USE_CASES = [
  {
    title: 'Sales & Service Tracking',
    desc: 'The ideal solution to track and monitor sales and service vehicles that carry employees and products on the road.',
    href: '/service/fleet-telematics',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="14" height="16" rx="2" /><path d="M17 9h2.5L22 12.5V16h-5" /><circle cx="7.5" cy="20" r="1.6" /><circle cx="17.5" cy="20" r="1.6" />
      </svg>
    ),
  },
  {
    title: 'Delivery & Trucks Tracking',
    desc: 'Customer service and fleet efficiency that result in the financial success of your service delivery and trucking business.',
    href: '/service/fleet-telematics',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="7" width="13" height="10" rx="1.5" /><path d="M14 10h4l3.5 3.5V17h-7.5" /><circle cx="6" cy="19" r="1.7" /><circle cx="17.5" cy="19" r="1.7" />
      </svg>
    ),
  },
  {
    title: 'Asset Tracking',
    desc: 'Monitor important events of generators and other assets — location, fuel level, running hours, temperature, and more.',
    href: '/service/smart-iot',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
]

export default function ServiceUseCases() {
  return (
    <>
      <style>{`
        .suc-wrap {
          position: relative; overflow: hidden; isolation: isolate;
          border-radius: 34px; background: linear-gradient(135deg, #1360ee 0%, #0d4fd4 100%);
          padding: clamp(48px,6vw,72px) 32px; text-align: center; color: #fff;
        }
        .suc-quote-mark {
          font-size: 64px; font-weight: 900; line-height: 1; color: rgba(255,255,255,.22);
          font-family: Georgia, serif; margin-bottom: -12px;
        }
        .suc-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; max-width: 1120px; margin: clamp(40px,5vw,56px) auto 0; }
        @media (max-width: 820px) { .suc-cards { grid-template-columns: 1fr; } }
        .suc-card {
          background: #fff; border: 1px solid #e7ebf3; border-radius: 20px;
          padding: 30px 26px; text-align: left; text-decoration: none; display: block;
          transition: transform .26s ${EASE}, box-shadow .26s ${EASE}, border-color .26s ${EASE};
        }
        .suc-card:hover { transform: translateY(-4px); box-shadow: 0 22px 44px -20px rgba(19,96,238,.28); border-color: #dbe6ff; }
        .suc-icon {
          width: 50px; height: 50px; border-radius: 14px; background: #eef3ff; color: #1360ee;
          display: grid; place-items: center; margin-bottom: 18px;
          transition: transform .26s ${EASE};
        }
        .suc-card:hover .suc-icon { transform: scale(1.06) rotate(-3deg); }
        .suc-link { display: inline-flex; align-items: center; gap: 6px; margin-top: 14px; font-size: 13px; font-weight: 700; color: #1360ee; }
      `}</style>

      <section style={{ padding: 'clamp(24px,4vw,40px) 28px clamp(56px,7vw,88px)', background: '#fff' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>

          {/* Quote banner */}
          <div className="suc-wrap" data-reveal="zoom">
            <span className="suc-quote-mark">&ldquo;</span>
            <p style={{ margin: '0 auto', maxWidth: '640px', fontSize: 'clamp(16px,2vw,21px)', fontWeight: 600, lineHeight: 1.6, color: '#fff' }}>
              Most companies struggle to effectively utilize their vehicles and field staff. We built a software
              tool that helps them manage and control their fleet, so their company can start growing again and
              increase revenue.
            </p>
          </div>

          {/* Use-case cards */}
          <div className="suc-cards">
            {USE_CASES.map(u => (
              <Link key={u.title} href={u.href} className="suc-card" data-reveal>
                <span className="suc-icon">{u.icon}</span>
                <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 800, color: '#1d1d1f', letterSpacing: '-.01em' }}>{u.title}</h3>
                <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.65, color: '#6e6e73' }}>{u.desc}</p>
                <span className="suc-link">Read details →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
