import { TICKER } from './newsroom-data'

// Duplicated once so the marquee can loop seamlessly at -50%.
const LOOP = [...TICKER, ...TICKER]

export default function NewsroomTicker() {
  return (
    <>
      <style href="nr-newsroomticker" precedence="medium">{`
        .nrt { position: relative; border-top: 1px solid #e9eef7; border-bottom: 1px solid #e9eef7; background: #fff; }
        .nrt-inner { display: flex; align-items: center; max-width: 1240px; margin: 0 auto; padding: 0 28px; }

        .nrt-live {
          display: inline-flex; align-items: center; gap: 7px; flex-shrink: 0;
          padding-right: 18px; margin-right: 4px;
          font-size: 11px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: #1360ee;
        }
        .nrt-dot { width: 7px; height: 7px; border-radius: 50%; background: #1360ee; box-shadow: 0 0 0 0 rgba(19,96,238,.55); animation: nrt-pulse 1.9s ease-out infinite; }
        @keyframes nrt-pulse { 70% { box-shadow: 0 0 0 8px rgba(19,96,238,0); } 100% { box-shadow: 0 0 0 0 rgba(19,96,238,0); } }

        .nrt-track-wrap {
          flex: 1; overflow: hidden; position: relative;
          mask-image: linear-gradient(to right, transparent, #000 3%, #000 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, #000 3%, #000 92%, transparent);
        }
        .nrt-track { display: flex; align-items: center; gap: 0; width: max-content; animation: nrt-scroll 42s linear infinite; }
        .nrt-track-wrap:hover .nrt-track { animation-play-state: paused; }
        @keyframes nrt-scroll { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .nrt-track { animation: none; } }

        .nrt-item {
          display: inline-flex; align-items: center; gap: 8px; flex-shrink: 0;
          padding: 15px 22px; text-decoration: none; white-space: nowrap;
          font-size: 13px; font-weight: 600; color: #3d4657;
          border-left: 1px solid #eef2f8;
          transition: color .16s ease, background .16s ease;
        }
        .nrt-item:hover { color: #1360ee; background: #f7faff; }
        .nrt-badge {
          font-size: 9.5px; font-weight: 800; letter-spacing: .07em; text-transform: uppercase;
          padding: 3px 7px; border-radius: 5px; background: rgba(19,96,238,.1); color: #1360ee;
        }
      `}</style>

      <div className="nrt">
        <div className="nrt-inner">
          <span className="nrt-live">
            <span className="nrt-dot" />
            Live
          </span>
          <div className="nrt-track-wrap">
            <div className="nrt-track">
              {LOOP.map((item, i) => (
                <a key={`${item.label}-${i}`} href="#newsroom-feed" className="nrt-item">
                  {item.label}
                  {item.badge && <span className="nrt-badge">{item.badge}</span>}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
