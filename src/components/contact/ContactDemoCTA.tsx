import Image from 'next/image'
import Link from 'next/link'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

export default function ContactDemoCTA() {
  return (
    <section className="ctdemo">
      <style href="ct-contactdemocta" precedence="medium">{`
        .ctdemo { background: #fff; padding: clamp(8px,1.5vw,20px) 28px clamp(52px,7vw,86px); }
        .ctdemo-card {
          position: relative; overflow: hidden;
          max-width: 1180px; margin: 0 auto; border-radius: 30px;
          background: radial-gradient(125% 120% at 88% -20%, #2f6bff 0%, #1360ee 40%, #0a3ba8 100%);
          box-shadow: 0 50px 90px -46px rgba(19,96,238,.75);
          display: grid; grid-template-columns: 1.02fr .98fr; align-items: center;
          isolation: isolate;
        }
        /* Faint grid, masked toward the artwork side, for depth. */
        .ctdemo-card::before {
          content: ''; position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: .55;
          background-image: linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px);
          background-size: 36px 36px;
          -webkit-mask-image: radial-gradient(120% 100% at 75% 0%, #000 25%, transparent 78%);
          mask-image: radial-gradient(120% 100% at 75% 0%, #000 25%, transparent 78%);
        }

        .ctdemo-copy { position: relative; z-index: 2; padding: clamp(30px,4vw,58px) clamp(24px,3.2vw,54px); }
        .ctdemo-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 14px; border-radius: 999px;
          background: rgba(255,255,255,.14); border: 1px solid rgba(255,255,255,.24);
          -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
          font-size: clamp(12px,1.05vw,13.5px); font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: #dbe8ff;
        }
        .ctdemo-eyebrow i { width: 6px; height: 6px; border-radius: 50%; background: #7ef7a6; box-shadow: 0 0 0 3px rgba(126,247,166,.25); }

        .ctdemo-title {
          margin: clamp(12px,1.5vw,18px) 0 0; max-width: 16ch;
          font-size: clamp(27px,3.2vw,40px); font-weight: 800; letter-spacing: -.032em; line-height: 1.12; color: #fff;
          text-shadow: 0 6px 30px rgba(0,10,50,.35);
        }
        .ctdemo-sub { margin: clamp(12px,1.5vw,18px) 0 0; max-width: 44ch; font-size: clamp(14px,1.25vw,16.5px); line-height: 1.72; color: rgba(255,255,255,.82); }

        .ctdemo-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 14px; margin-top: clamp(24px,3vw,34px); }
        .ctdemo-btn {
          position: relative; overflow: hidden; isolation: isolate;
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 26px; border-radius: 14px; text-decoration: none;
          background: #fff; color: #0d3fb0; font-size: 14.5px; font-weight: 800; letter-spacing: -.01em;
          box-shadow: 0 18px 34px -14px rgba(3,20,70,.6);
          transition: transform .22s ${EASE}, box-shadow .22s ${EASE};
        }
        .ctdemo-btn::before {
          content: ''; position: absolute; inset: 0; z-index: -1;
          background: linear-gradient(110deg, transparent 22%, rgba(19,96,238,.16) 50%, transparent 78%);
          transform: translateX(-130%); transition: transform .65s ${EASE};
        }
        .ctdemo-btn:hover { transform: translateY(-3px); box-shadow: 0 26px 44px -14px rgba(3,20,70,.7); }
        .ctdemo-btn:hover::before { transform: translateX(130%); }
        .ctdemo-btn svg { transition: transform .22s ${EASE}; }
        .ctdemo-btn:hover svg { transform: translateX(4px); }

        .ctdemo-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 22px; border-radius: 14px; text-decoration: none;
          border: 1.5px solid rgba(255,255,255,.4); color: #fff;
          font-size: 14px; font-weight: 700;
          transition: background .2s ${EASE}, border-color .2s ${EASE}, transform .2s ${EASE};
        }
        .ctdemo-ghost:hover { background: rgba(255,255,255,.14); border-color: #fff; transform: translateY(-3px); }

        .ctdemo-note { display: flex; align-items: center; gap: 8px; margin: clamp(18px,2.2vw,24px) 0 0; font-size: 12.5px; color: rgba(255,255,255,.66); }
        .ctdemo-note svg { flex-shrink: 0; }

        /* ── Artwork: platform screenshot in perspective, van in front ── */
        .ctdemo-art { position: relative; z-index: 1; align-self: stretch; min-height: clamp(260px,26vw,360px); }
        .ctdemo-shot {
          position: absolute; top: 50%; left: 6%; width: 104%;
          transform: translateY(-50%) perspective(1400px) rotateY(-16deg) rotateX(4deg) rotate(-1.5deg);
          transform-origin: left center;
          border-radius: 16px; overflow: hidden;
          box-shadow: 0 40px 70px -26px rgba(2,12,45,.72), 0 0 0 1px rgba(255,255,255,.14);
          transition: transform .5s ${EASE};
        }
        .ctdemo-card:hover .ctdemo-shot {
          transform: translateY(-50%) perspective(1400px) rotateY(-12deg) rotateX(3deg) rotate(-1deg) scale(1.02);
        }
        .ctdemo-shot img { display: block; width: 100%; height: auto; }

        .ctdemo-van {
          position: absolute; z-index: 2; left: -13%; bottom: 6%; width: 47%;
          filter: drop-shadow(0 26px 26px rgba(2,12,45,.45));
          transition: transform .5s ${EASE};
        }
        .ctdemo-card:hover .ctdemo-van { transform: translateX(-8px); }
        .ctdemo-van img { display: block; width: 100%; height: auto; }

        /* Glow puddle under the artwork so it sits in the card, not on it. */
        .ctdemo-art::after {
          content: ''; position: absolute; z-index: 0; left: 0; right: -10%; bottom: 0; height: 55%;
          background: radial-gradient(60% 100% at 40% 100%, rgba(0,10,60,.45), transparent 70%);
          pointer-events: none;
        }

        @media (max-width: 900px) {
          .ctdemo-card { grid-template-columns: 1fr; }
          .ctdemo-art { min-height: clamp(210px,44vw,300px); margin: 0 0 clamp(20px,4vw,32px); }
          .ctdemo-shot { left: 14%; width: 92%; transform: translateY(-50%) perspective(1200px) rotateY(-13deg) rotate(-1.5deg); }
          .ctdemo-card:hover .ctdemo-shot { transform: translateY(-50%) perspective(1200px) rotateY(-13deg) rotate(-1.5deg); }
          .ctdemo-van { left: -6%; width: 44%; }
        }
        @media (max-width: 480px) {
          .ctdemo-actions { flex-direction: column; align-items: stretch; }
          .ctdemo-btn, .ctdemo-ghost { justify-content: center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ctdemo-shot, .ctdemo-van, .ctdemo-btn, .ctdemo-ghost { transition: none; }
        }
      `}</style>

      <div className="ctdemo-card" data-reveal>
        <div className="ctdemo-copy">
          <span className="ctdemo-eyebrow"><i />Looking for a demo?</span>
          <h2 className="ctdemo-title">See Locator running on your fleet</h2>
          <p className="ctdemo-sub">
            See how Locator can help you track, manage and optimize your operations in real time —
            walked through by an engineer, on your own use case.
          </p>

          <div className="ctdemo-actions">
            <Link href="/get-a-free-demo" className="ctdemo-btn">
              Schedule a Free Demo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link href="/get-a-quote" className="ctdemo-ghost">Get a quote</Link>
          </div>

          <p className="ctdemo-note">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" /><path d="M12 7v5.2l3.2 2" />
            </svg>
            About 20 minutes · No commitment · Online or at your site
          </p>
        </div>

        <div className="ctdemo-art" aria-hidden="true">
          <div className="ctdemo-shot">
            <Image src="/dashboard.png" alt="" width={1600} height={1020} sizes="(max-width: 900px) 92vw, 55vw" />
          </div>
          <div className="ctdemo-van">
            <Image src="/van.png" alt="" width={800} height={450} sizes="(max-width: 900px) 44vw, 26vw" />
          </div>
        </div>
      </div>
    </section>
  )
}
