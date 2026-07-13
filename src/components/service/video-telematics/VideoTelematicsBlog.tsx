import Image from 'next/image'
import Link from 'next/link'

const POSTS = [
  {
    category: 'Driver Safety',
    catColor: '#1360ee',
    catBg: 'rgba(19,96,238,.1)',
    title: 'Reducing Commercial Vehicle Accidents in Dubai & Abu Dhabi with AI Driver Monitoring (DMS)',
    excerpt: 'How AI driver monitoring detects fatigue and distraction in real time to cut accident rates across UAE commercial fleets.',
    href: '/blog',
    img: '/blog/fleet tracking.png',
    author: 'SK',
    authorBg: '#1360ee',
  },
  {
    category: 'Hardware',
    catColor: '#c2740a',
    catBg: 'rgba(194,116,10,.1)',
    title: 'Heat-Proof, 24/7 Recording: Choosing the Best AI Fleet Dashcam for UAE Weather & Roads',
    excerpt: 'What to look for in a dashcam built to record continuously through extreme UAE heat, dust, and long road hours.',
    href: '/blog',
    img: '/blog/Optimized GPS.png',
    author: 'RM',
    authorBg: '#c2740a',
  },
  {
    category: 'Technology',
    catColor: '#7c3aed',
    catBg: 'rgba(124,58,237,.1)',
    title: 'AI Dashcams vs Traditional Dashcams: Why UAE Fleets Are Upgrading to MDVR Telematics',
    excerpt: 'The real differences between basic dashcams and AI-powered MDVR telematics — and why fleets are making the switch.',
    href: '/blog',
    img: '/blog/fleet tracking.png',
    author: 'OA',
    authorBg: '#7c3aed',
  },
  {
    category: 'Logistics',
    catColor: '#13923f',
    catBg: 'rgba(19,146,63,.1)',
    title: 'How Logistics and Delivery Companies in the UAE Prevent Cargo Disputes Using AI Dashcam Evidence',
    excerpt: 'Using HD video evidence and AI theft detection to resolve cargo disputes faster and protect delivery operations.',
    href: '/blog',
    img: '/blog/Optimized GPS.png',
    author: 'LM',
    authorBg: '#13923f',
  },
]

export default function VideoTelematicsBlog() {
  return (
    <>
      <style>{`
        .vtb {
          display: flex; flex-direction: column;
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          text-decoration: none; color: inherit;
          border: 1px solid #e8e8eb;
          transition: transform .24s cubic-bezier(.22,.61,.36,1), box-shadow .24s cubic-bezier(.22,.61,.36,1);
        }
        .vtb:hover { transform: translateY(-5px); box-shadow: 0 32px 64px -24px rgba(10,30,90,.2); }
        .vtb:hover .vtb-img { transform: scale(1.06); }
        .vtb-img { transition: transform .5s cubic-bezier(.22,.61,.36,1) !important; }
        .vtb-cta { transition: gap .18s cubic-bezier(.22,.61,.36,1); }
        .vtb:hover .vtb-cta { gap: 8px; }
        .vtb-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
        @media (max-width: 1000px) { .vtb-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 540px) { .vtb-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <section id="blogs" style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#f5f6fa' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>

          <div data-reveal style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '11px', fontWeight: 700, letterSpacing: '.08em',
              color: '#1360ee', textTransform: 'uppercase' as const,
              marginBottom: '14px',
            }}>
              <span style={{ display: 'inline-block', width: '20px', height: '1.5px', background: '#1360ee', borderRadius: '2px' }} />
              From Our Blog
              <span style={{ display: 'inline-block', width: '20px', height: '1.5px', background: '#1360ee', borderRadius: '2px' }} />
            </span>
            <h2 style={{ margin: '0 0 14px', fontSize: 'clamp(26px,3.6vw,42px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.025em', color: '#1d1d1f' }}>
              Insights on <span style={{ color: '#1360ee' }}>video telematics</span>
            </h2>
            <p style={{ margin: '0 auto', maxWidth: '480px', fontSize: 'clamp(13.5px,1.25vw,15px)', lineHeight: 1.65, color: '#6e6e73' }}>
              Guides on AI dashcams, driver monitoring, and video evidence for UAE fleets.
            </p>
          </div>

          <div className="vtb-grid">
            {POSTS.map((post, i) => (
              <Link key={i} href={post.href} className="vtb" data-reveal data-reveal-delay={`${i * 90}`}>
                <div style={{ position: 'relative', height: '170px', overflow: 'hidden', flexShrink: 0, background: '#dde5f0' }}>
                  <Image src={post.img} alt={post.title} fill className="vtb-img" style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,14,50,.65) 0%, rgba(8,14,50,.15) 40%, transparent 100%)' }} />
                  <span style={{
                    position: 'absolute', top: '12px', left: '12px',
                    fontSize: '10px', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase' as const,
                    padding: '4px 10px', borderRadius: '999px',
                    background: 'rgba(255,255,255,.18)', color: '#fff',
                    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,.28)',
                  }}>
                    {post.category}
                  </span>
                </div>

                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ margin: '0 0 10px', fontSize: '15px', fontWeight: 800, letterSpacing: '-.015em', lineHeight: 1.32, color: '#1d1d1f' }}>
                    {post.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, color: '#6e6e73', flex: 1 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #f0f0f3' }}>
                    <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: post.authorBg, display: 'grid', placeItems: 'center', fontSize: '9.5px', fontWeight: 800, color: '#fff', flexShrink: 0 }}>
                      {post.author}
                    </span>
                    <span className="vtb-cta" style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', fontWeight: 700, color: post.catColor }}>
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
