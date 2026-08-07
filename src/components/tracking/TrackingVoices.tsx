import { VOICES } from './data'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

/**
 * Customer quotes.
 *
 * Set as a 2×2 of quote cards with a monogram rather than the logo wall the old
 * page used: we do not hold usable logo assets for these four accounts, and a
 * row of mismatched raster logos at different aspect ratios is what made that
 * section look bolted on. The company name set in the brand's own weight carries
 * the attribution perfectly well, and it stays sharp at every size.
 */
export default function CarTrackingVoices() {
  return (
    <>
      <style>{`
        .ctv { background: #fff; padding: clamp(56px,7vw,96px) 28px; }
        .ctv-inner { max-width: var(--w-1120); margin: 0 auto; }

        .ctv-head { max-width: 640px; margin: 0 auto clamp(40px,5vw,58px); text-align: center; }
        .ctv-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: var(--f-12); font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: #0a89dd; margin: 0 0 18px;
        }
        .ctv-eyebrow::before, .ctv-eyebrow::after {
          content: ''; width: 24px; height: 2px; background: #0a89dd; border-radius: 2px;
        }
        .ctv-title {
          margin: 0; font-size: max(clamp(25px,3.2vw,38px), min(2.639vw, 55.1px));
          font-weight: 800; line-height: 1.16; letter-spacing: -.028em; color: #1d1d1f;
        }
        .ctv-lead {
          margin: clamp(16px,2vw,22px) auto 0; max-width: 56ch;
          font-size: var(--f-15-5); line-height: 1.72; color: #6e6e73;
        }

        .ctv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(18px,2.2vw,26px); }
        @media (max-width: 780px) { .ctv-grid { grid-template-columns: 1fr; } }

        .ctv-card {
          position: relative; display: flex; flex-direction: column;
          background: #fbfcfe; border: 1px solid #e8ecf4; border-radius: 20px;
          padding: clamp(26px,3vw,34px);
          transition: transform .38s ${EASE}, box-shadow .38s ${EASE}, border-color .38s ${EASE}, background .38s ${EASE};
        }
        .ctv-card:hover {
          background: #fff; transform: translateY(-4px); border-color: #d6e2fb;
          box-shadow: 0 26px 50px -30px rgba(20,40,90,.4);
        }

        .ctv-mark { width: 28px; height: 28px; color: #cbd9f4; margin-bottom: 16px; }
        .ctv-card blockquote {
          margin: 0 0 clamp(22px,2.6vw,28px); flex: 1;
          font-size: max(clamp(15px,1.5vw,17.5px), min(1.215vw, 25.37px));
          line-height: 1.66; color: #35383f; letter-spacing: -.008em;
        }

        .ctv-by {
          display: flex; align-items: center; gap: 13px;
          padding-top: clamp(18px,2.2vw,22px); border-top: 1px solid #e9edf5;
        }
        /* Monogram in the brand blue — the same device the site uses for blog
           authors, so the attribution reads as part of the system. */
        .ctv-mono {
          width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
          display: grid; place-items: center;
          background: linear-gradient(145deg,#1360ee,#0a89dd); color: #fff;
          font-size: var(--f-14); font-weight: 800; letter-spacing: .02em;
          box-shadow: 0 10px 20px -12px rgba(19,96,238,.85);
        }
        .ctv-by b {
          display: block; font-size: var(--f-14-5); font-weight: 800;
          color: #1d1d1f; letter-spacing: -.01em; line-height: 1.3;
        }
        .ctv-by span { display: block; font-size: var(--f-12-5); color: #6e6e73; margin-top: 2px; }
      `}</style>

      <section className="ctv">
        <div className="ctv-inner">
          <header className="ctv-head" data-reveal>
            <p className="ctv-eyebrow">In their words</p>
            <h2 className="ctv-title">What UAE fleets say after switching</h2>
            <p className="ctv-lead">
              Four operators on what changed once every vehicle was on one map — from document
              expiry to fuel, job scheduling and day-to-day support.
            </p>
          </header>

          <div className="ctv-grid">
            {VOICES.map((v, i) => (
              <figure key={v.company} className="ctv-card" data-reveal data-reveal-delay={i * 90}>
                <svg className="ctv-mark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9.5 5C6.5 6.7 4.6 9.6 4.6 13.2c0 3.4 2 5.8 4.7 5.8 2.3 0 4-1.7 4-3.9 0-2.1-1.5-3.7-3.5-3.7-.4 0-.9.1-1 .1-.3 0-.4-.2-.3-.5.5-1.6 2-3.2 3.7-4.2.4-.2.5-.5.3-.8L11.4 5c-.3-.4-.6-.4-1.9 0zm9.1 0c-3 1.7-4.9 4.6-4.9 8.2 0 3.4 2 5.8 4.7 5.8 2.3 0 4-1.7 4-3.9 0-2.1-1.5-3.7-3.5-3.7-.4 0-.9.1-1 .1-.3 0-.4-.2-.3-.5.5-1.6 2-3.2 3.7-4.2.4-.2.5-.5.3-.8L20.5 5c-.3-.4-.6-.4-1.9 0z" />
                </svg>
                <blockquote>{v.quote}</blockquote>
                <figcaption className="ctv-by">
                  <span className="ctv-mono" aria-hidden="true">
                    {v.company.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <b>{v.company}</b>
                    <span>{v.person} · {v.role}</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
