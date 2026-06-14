import Image from 'next/image'
import Link from 'next/link'

const POSTS = [
  {
    category: 'Fleet Safety',
    catColor: '#1360ee',
    catBg: 'rgba(19,96,238,.1)',
    title: 'How AI dashcams cut collision rates for commercial fleets',
    excerpt: 'What live driver monitoring and audible alerts mean for day-to-day fleet safety — and how operators measure the ROI.',
    href: '/blog/ai-dashcams-collision-rates',
    img: '/blog/fleet tracking.png',
    readTime: '5 min read',
    date: 'Mar 12, 2025',
    author: 'SK',
    authorBg: '#1360ee',
  },
  {
    category: 'Cost Control',
    catColor: '#c2740a',
    catBg: 'rgba(194,116,10,.1)',
    title: 'Reducing idle fuel waste across a growing fleet',
    excerpt: 'Using instant idle alerts and route history to claw back fuel spend before it becomes a costly habit.',
    href: '/blog/reducing-idle-fuel-waste',
    img: '/blog/Optimized GPS.png',
    readTime: '4 min read',
    date: 'Mar 8, 2025',
    author: 'RM',
    authorBg: '#13923f',
  },
  {
    category: 'Operations',
    catColor: '#7c3aed',
    catBg: 'rgba(124,58,237,.1)',
    title: 'A practical guide to geofencing for UAE businesses',
    excerpt: 'Setting virtual zones and POI alerts for offices, depots, and customer sites without overcomplicating the setup.',
    href: '/blog/geofencing-guide-uae',
    img: '/blog/fleet tracking.png',
    readTime: '6 min read',
    date: 'Mar 4, 2025',
    author: 'OA',
    authorBg: '#7c3aed',
  },
]

export default function SoftwareBlog() {
  return (
    <>
      <style>{`
        .bc {
          display: flex; flex-direction: column;
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          text-decoration: none; color: inherit;
          border: 1px solid #e8e8eb;
          transition: transform .24s cubic-bezier(.22,.61,.36,1), box-shadow .24s cubic-bezier(.22,.61,.36,1);
        }
        .bc:hover { transform: translateY(-5px); box-shadow: 0 32px 64px -24px rgba(10,30,90,.2); }
        .bc:hover .bc-img { transform: scale(1.06); }
        .bc-img { transition: transform .5s cubic-bezier(.22,.61,.36,1) !important; }
        .bc-cta { transition: gap .18s cubic-bezier(.22,.61,.36,1); }
        .bc:hover .bc-cta { gap: 8px; }
        @media (max-width: 860px) { .bc-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 540px) { .bc-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <section id="blogs" style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#f5f6fa' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>

          {/* Header */}
          <div data-reveal style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '11px', fontWeight: 700, letterSpacing: '.08em',
              color: '#1360ee', textTransform: 'uppercase' as const,
              marginBottom: '14px',
            }}>
              <span style={{ display: 'inline-block', width: '20px', height: '1.5px', background: '#1360ee', borderRadius: '2px' }} />
              Fleet Intelligence
              <span style={{ display: 'inline-block', width: '20px', height: '1.5px', background: '#1360ee', borderRadius: '2px' }} />
            </span>

            <h2 style={{ margin: '0 0 14px', fontSize: 'clamp(26px,3.6vw,42px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.025em', color: '#1d1d1f' }}>
              Insights from the{' '}
              <span style={{ color: '#1360ee' }}>road</span>
            </h2>

            <p style={{ margin: '0 auto 22px', maxWidth: '440px', fontSize: 'clamp(13.5px,1.25vw,15px)', lineHeight: 1.65, color: '#6e6e73' }}>
              Practical guides on fleet safety, cost control, and operations for UAE businesses.
            </p>

            <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 700, color: '#1360ee', textDecoration: 'none', padding: '9px 20px', borderRadius: '999px', background: '#eef3ff', border: '1px solid rgba(19,96,238,.18)', whiteSpace: 'nowrap' as const }}>
              All articles →
            </Link>
          </div>

          {/* 3-col grid */}
          <div className="bc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
            {POSTS.map((post, i) => (
              <Link key={i} href={post.href} className="bc" data-reveal data-reveal-delay={`${i * 110}`}>

                {/* Image with overlay */}
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden', flexShrink: 0, background: '#dde5f0' }}>
                  <Image src={post.img} alt={post.title} fill className="bc-img" style={{ objectFit: 'cover' }} />
                  {/* Dark gradient at bottom */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,14,50,.65) 0%, rgba(8,14,50,.15) 40%, transparent 100%)' }} />
                  {/* Category pill over image */}
                  <span style={{
                    position: 'absolute', top: '14px', left: '14px',
                    fontSize: '10px', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase' as const,
                    padding: '4px 10px', borderRadius: '999px',
                    background: 'rgba(255,255,255,.18)', color: '#fff',
                    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,.28)',
                  }}>
                    {post.category}
                  </span>
                  {/* Read time */}
                  <span style={{
                    position: 'absolute', top: '14px', right: '14px',
                    fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,.85)',
                    background: 'rgba(0,0,0,.28)', backdropFilter: 'blur(6px)',
                    padding: '4px 10px', borderRadius: '999px',
                  }}>
                    {post.readTime}
                  </span>
                </div>

                {/* Body */}
                <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Color-coded category chip */}
                  <span style={{
                    alignSelf: 'flex-start',
                    fontSize: '10.5px', fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase' as const,
                    padding: '3px 10px', borderRadius: '999px',
                    background: post.catBg, color: post.catColor,
                    marginBottom: '12px',
                  }}>
                    {post.category}
                  </span>

                  <h3 style={{ margin: '0 0 10px', fontSize: '16px', fontWeight: 800, letterSpacing: '-.02em', lineHeight: 1.3, color: '#1d1d1f' }}>
                    {post.title}
                  </h3>

                  <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.6, color: '#6e6e73', flex: 1 }}>
                    {post.excerpt}
                  </p>

                  {/* Meta row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '18px', paddingTop: '16px', borderTop: '1px solid #f0f0f3' }}>
                    <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: post.authorBg, display: 'grid', placeItems: 'center', fontSize: '10px', fontWeight: 800, color: '#fff', flexShrink: 0 }}>
                      {post.author}
                    </span>
                    <span style={{ fontSize: '11.5px', color: '#a1a1a6', fontWeight: 500 }}>{post.date}</span>
                    <span className="bc-cta" style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', fontWeight: 700, color: post.catColor }}>
                      Read <span>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
