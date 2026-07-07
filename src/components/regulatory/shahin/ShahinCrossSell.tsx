import Link from 'next/link'

const POINTS = [
  {
    title: 'Enhanced Security & Real-Time Tracking',
    desc: 'Live location monitoring and instant updates so you can account for every registered vehicle at any moment.',
  },
  {
    title: 'Compliance with Regulations',
    desc: "A certificate of installation for your tracking device, giving you peace of mind that you're using an approved, SIRA-aligned solution.",
  },
]

export default function ShahinCrossSell() {
  return (
    <section style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#fff' }}>
      <div style={{
        maxWidth: '980px', margin: '0 auto',
        background: '#f7f9fc', border: '1px solid #e4e4e8', borderRadius: '28px',
        padding: 'clamp(32px,4.5vw,56px)',
      }} data-reveal>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '36px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.09em', color: '#c2740a', textTransform: 'uppercase' as const, marginBottom: '12px' }}>
            Related Certification
          </span>
          <h2 style={{ margin: '0 0 14px', fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-.02em', color: '#1d1d1f', maxWidth: '520px' }}>
            Securepath Premium: Monitor Every Vehicle in Real Time
          </h2>
          <p style={{ margin: 0, maxWidth: '560px', fontSize: 'clamp(14px,1.25vw,15.5px)', lineHeight: 1.7, color: '#6e6e73' }}>
            Securepath Premium is a GPS tracking platform that works alongside your SHAHIN registration, giving you a single dashboard to monitor freight and cargo vehicles for safety and compliance.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '20px', marginBottom: '32px' }}>
          {POINTS.map(p => (
            <div key={p.title} style={{ display: 'flex', gap: '12px', background: '#fff', border: '1px solid #e4e4e8', borderRadius: '16px', padding: '18px 20px' }}>
              <span style={{
                width: 24, height: 24, borderRadius: '50%', flexShrink: 0, marginTop: '1px',
                background: 'rgba(19,96,238,.12)', color: '#1360ee',
                display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 800,
              }}>✓</span>
              <div>
                <h3 style={{ margin: '0 0 5px', fontSize: '14.5px', fontWeight: 800, color: '#1d1d1f' }}>{p.title}</h3>
                <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, color: '#6e6e73' }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/securepath-premium" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontSize: '14px', fontWeight: 700, color: '#fff',
            background: '#1360ee', borderRadius: '999px', padding: '13px 28px',
            textDecoration: 'none', transition: '.18s cubic-bezier(.22,.61,.36,1)',
          }}>
            Explore Securepath Premium
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
