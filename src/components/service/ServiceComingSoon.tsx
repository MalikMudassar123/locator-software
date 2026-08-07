import Link from 'next/link'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

export default function ServiceComingSoon({ accent }: { accent: string }) {
  return (
    <>
      <style>{`
        .svc-wrap {
          position: relative; overflow: hidden; text-align: center;
          border-radius: 28px; border: 1px solid #e8ecf4; background: #fff;
          padding: clamp(48px,7vw,80px) clamp(24px,4vw,56px);
        }
        .svc-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: inherit; font-size: var(--f-14); font-weight: 700;
          padding: 13px 28px; border-radius: 999px; text-decoration: none;
          background: #1360ee; color: #fff; box-shadow: 0 10px 24px rgba(19,96,238,.3);
          transition: .18s ${EASE};
        }
        .svc-btn:hover { background: #0d4fd4; transform: translateY(-1px); box-shadow: 0 12px 30px rgba(19,96,238,.42); }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,88px) 28px', background: '#f7f9fc' }}>
        <div className="svc-wrap" data-reveal style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18, margin: '0 auto 24px',
            display: 'grid', placeItems: 'center', background: `${accent}14`, color: accent,
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" />
            </svg>
          </div>
          <h2 style={{ margin: '0 0 14px', fontSize: 'max(clamp(22px,2.6vw,30px), min(2.083vw, 43.5px))', fontWeight: 800, letterSpacing: '-.02em', color: '#1d1d1f' }}>
            This page is on its way
          </h2>
          <p style={{ margin: '0 auto 30px', maxWidth: '480px', fontSize: 'max(clamp(14px,1.3vw,16px), min(1.111vw, 23.2px))', lineHeight: 1.7, color: '#6e6e73' }}>
            We&rsquo;re putting the finishing touches on this service. Reach out to our team in the meantime for full details.
          </p>
          <Link href="/contact" className="svc-btn">
            Talk to our team
          </Link>
        </div>
      </section>
    </>
  )
}
