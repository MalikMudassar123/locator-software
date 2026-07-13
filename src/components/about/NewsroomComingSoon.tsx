import Link from 'next/link'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

export default function NewsroomComingSoon() {
  return (
    <>
      <style>{`
        .nrc-wrap {
          position: relative; overflow: hidden; text-align: center;
          border-radius: 28px; border: 1px solid #e8ecf4; background: #fff;
          padding: clamp(48px,7vw,80px) clamp(24px,4vw,56px);
        }
        .nrc-icon {
          width: 64px; height: 64px; border-radius: 18px; margin: 0 auto 24px;
          display: grid; place-items: center; background: rgba(14,154,167,.12); color: #0e9aa7;
        }
        .nrc-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: inherit; font-size: 14px; font-weight: 700;
          padding: 13px 28px; border-radius: 999px; text-decoration: none;
          background: #1360ee; color: #fff; box-shadow: 0 10px 24px rgba(19,96,238,.3);
          transition: .18s ${EASE};
        }
        .nrc-btn:hover { background: #0d4fd4; transform: translateY(-1px); box-shadow: 0 12px 30px rgba(19,96,238,.42); }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,88px) 28px', background: '#f7f9fc' }}>
        <div className="nrc-wrap" data-reveal style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div className="nrc-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 10v8a2 2 0 0 0 2 2h2V8H6a2 2 0 0 0-2 2z" />
              <path d="M8 8l14-4v20L8 20V8z" />
            </svg>
          </div>
          <h2 style={{ margin: '0 0 14px', fontSize: 'clamp(22px,2.6vw,30px)', fontWeight: 800, letterSpacing: '-.02em', color: '#1d1d1f' }}>
            We&rsquo;re just getting started
          </h2>
          <p style={{ margin: '0 auto 30px', maxWidth: '480px', fontSize: 'clamp(14px,1.3vw,16px)', lineHeight: 1.7, color: '#6e6e73' }}>
            Check back soon for company news, product announcements, and milestones from the Locator team. In the meantime, we&rsquo;d love to hear from you.
          </p>
          <Link href="/contact" className="nrc-btn">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  )
}
