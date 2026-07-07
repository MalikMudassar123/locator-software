import Link from 'next/link'
import { REGULATORY_PRODUCTS } from './data'

const FEATURES = [
  'Real-time GPS location tracking',
  'Automated compliance reporting',
  'Instant alerts & notifications',
  'Web & mobile dashboard access',
]

export default function RegulatoryProductShell({ slug }: { slug: string }) {
  const product = REGULATORY_PRODUCTS.find(p => p.slug === slug)
  if (!product) return null

  return (
    <>
      <style>{`
        .reg-feat-grid {
          display: grid; grid-template-columns: repeat(2,1fr); gap: 14px;
          max-width: 620px; margin: 40px auto 0;
        }
        @media (max-width: 560px) { .reg-feat-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#fff' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>

          <div data-reveal style={{
            width: 64, height: 64, borderRadius: 18,
            display: 'grid', placeItems: 'center', margin: '0 auto 24px',
            background: `${product.accent}15`, color: product.accent,
          }}>
            {product.icon}
          </div>

          <p data-reveal style={{
            textAlign: 'center', margin: '0 auto', maxWidth: '620px',
            fontSize: 'clamp(15px,1.5vw,17px)', lineHeight: 1.75, color: '#3a3a3c',
          }}>
            {product.description}
          </p>

          <div className="reg-feat-grid" data-reveal>
            {FEATURES.map(f => (
              <div key={f} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '14px 16px', borderRadius: '14px',
                background: '#f7f9fc', border: '1px solid #e4e4e8',
              }}>
                <span style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  background: `${product.accent}18`, color: product.accent,
                  display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 800,
                }}>✓</span>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#1d1d1f' }}>{f}</span>
              </div>
            ))}
          </div>

          <div data-reveal style={{ textAlign: 'center', marginTop: '44px' }}>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '14px', fontWeight: 700, color: '#fff',
              background: '#1360ee', borderRadius: '999px', padding: '13px 28px',
              textDecoration: 'none', transition: '.18s cubic-bezier(.22,.61,.36,1)',
            }}>
              Talk to our team about {product.name}
            </Link>
          </div>

        </div>
      </section>
    </>
  )
}
