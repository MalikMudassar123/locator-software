'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { LIVE_UPDATES, NEWS_ITEMS, formatAgo, type LiveUpdate } from './newsroom-data'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

/**
 * Seconds elapsed since mount, ticking once per second.
 *
 * Starts at 0 so the server-rendered markup and the first client render agree
 * (a Date.now() seed would hydrate-mismatch); the clock only starts after
 * mount, which is also when the timestamps begin to age.
 */
function useElapsed() {
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])
  return elapsed
}

// Each live-update kind gets its own glyph + brand tint so the panel scans
// like a notification feed rather than a list of identical rows.
const KIND_STYLE: Record<LiveUpdate['kind'], { bg: string; fg: string }> = {
  release: { bg: '#1360ee', fg: '#fff' },
  video: { bg: '#e63946', fg: '#fff' },
  linkedin: { bg: '#0a66c2', fg: '#fff' },
  webinar: { bg: '#2d7ff9', fg: '#fff' },
  event: { bg: '#22a06b', fg: '#fff' },
}

function KindIcon({ kind }: { kind: LiveUpdate['kind'] }) {
  const p = { width: 15, height: 15, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (kind) {
    case 'release':
      return <svg {...p}><path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="m2 17 10 5 10-5M2 12l10 5 10-5" /></svg>
    case 'video':
      return <svg {...p} fill="currentColor" stroke="none"><path d="M8 5v14l11-7L8 5Z" /></svg>
    case 'linkedin':
      return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95C21.6 8.75 22 11.1 22 14.2V21h-4v-6c0-1.44-.03-3.3-2-3.3-2 0-2.3 1.56-2.3 3.2V21h-4V9Z" /></svg>
    case 'webinar':
      return <svg {...p}><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
    case 'event':
      return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
  }
}

const REVIEW_VIDEOS = NEWS_ITEMS.filter((i) => i.category === 'videos').slice(0, 3)

export default function NewsroomRail() {
  const elapsed = useElapsed()

  return (
    <>
      <style href="nr-newsroomrail" precedence="medium">{`
        /* Deliberately no [data-reveal] on this rail. ScrollReveal's hidden
           state is opacity:0 until an IntersectionObserver fires, and it only
           scans the DOM once on mount — so any hydration or timing hiccup
           leaves the rail permanently invisible. It always renders. */
        .nrr { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 88px; }
        /* Must match the breakpoint where .nrb-cols stops being two columns. */
        @media (max-width: 820px) { .nrr { position: static; } }

        .nrr-card { border: 1px solid #e7ecf6; border-radius: 16px; background: #fff; box-shadow: 0 2px 10px rgba(11,18,32,.03); overflow: hidden; }
        .nrr-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px 18px 12px; }
        .nrr-head h3 { margin: 0; font-size: 15.5px; font-weight: 800; letter-spacing: -.015em; color: #0b1220; }

        .nrr-live-pill {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10.5px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase;
          color: #22a06b; background: rgba(34,160,107,.1); padding: 4px 9px; border-radius: 999px;
        }
        .nrr-live-pill i { width: 6px; height: 6px; border-radius: 50%; background: #22a06b; animation: nrr-blink 1.6s ease-in-out infinite; }
        @keyframes nrr-blink { 50% { opacity: .25; } }
        @media (prefers-reduced-motion: reduce) { .nrr-live-pill i { animation: none; } }

        .nrr-viewall { font-size: 12px; font-weight: 700; color: #1360ee; text-decoration: none; white-space: nowrap; }
        .nrr-viewall:hover { text-decoration: underline; }

        .nrr-list { padding: 0 12px 12px; display: flex; flex-direction: column; gap: 8px; }

        /* ── Auto-scrolling live stack ──
           A fixed-height window over a doubled list, drifting upward forever.
           Doubling means the -50% keyframe lands exactly on the copy, so the
           loop is seamless. Fades top and bottom so items enter and leave
           softly rather than popping at a hard edge. */
        .nrr-marquee {
          position: relative; height: 372px; overflow: hidden; padding: 0 12px 12px;
          mask-image: linear-gradient(to bottom, transparent, #000 7%, #000 90%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, #000 7%, #000 90%, transparent);
        }
        .nrr-marquee-track {
          display: flex; flex-direction: column; gap: 8px;
          animation: nrr-drift 40s linear infinite;
        }
        @keyframes nrr-drift { to { transform: translateY(-50%); } }
        /* Pause on hover or keyboard focus so a link is never a moving target. */
        .nrr-marquee:hover .nrr-marquee-track,
        .nrr-marquee:focus-within .nrr-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .nrr-marquee { height: auto; overflow: visible; mask-image: none; -webkit-mask-image: none; }
          .nrr-marquee-track { animation: none; }
        }

        .nrr-item {
          display: grid; grid-template-columns: 32px minmax(0,1fr); gap: 11px;
          padding: 12px; border-radius: 12px; border: 1px solid #eef2f8; background: #fbfcfe;
          text-decoration: none; transition: border-color .18s ${EASE}, background .18s ${EASE}, transform .18s ${EASE};
        }
        .nrr-item:hover { border-color: #cfdcf5; background: #fff; transform: translateY(-1px); }

        .nrr-ico { width: 32px; height: 32px; border-radius: 9px; display: grid; place-items: center; }

        .nrr-meta { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 3px; }
        .nrr-src { font-size: 9.5px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: #97a1b3; }
        .nrr-time { font-size: 10.5px; color: #a7b0c0; white-space: nowrap; }

        .nrr-title { margin: 0 0 2px; font-size: 13px; font-weight: 750; letter-spacing: -.01em; color: #0b1220; line-height: 1.35; }
        .nrr-body { margin: 0 0 7px; font-size: 11.5px; line-height: 1.5; color: #7a8394; }
        .nrr-cta { font-size: 11.5px; font-weight: 700; color: #1360ee; }
        .nrr-item:hover .nrr-cta { text-decoration: underline; }

        .nrr-foot { padding: 0 12px 14px; }
        .nrr-foot a {
          display: block; text-align: center; padding: 11px; border-radius: 10px;
          font-size: 12.5px; font-weight: 700; color: #1360ee; text-decoration: none;
          background: rgba(19,96,238,.06); transition: background .18s ${EASE};
        }
        .nrr-foot a:hover { background: rgba(19,96,238,.12); }

        /* ── Customer review videos ── */
        .nrr-vid {
          display: grid; grid-template-columns: 92px minmax(0,1fr); gap: 11px; align-items: center;
          padding: 8px; border-radius: 12px; text-decoration: none;
          transition: background .18s ${EASE};
        }
        .nrr-vid:hover { background: #f5f8fe; }
        .nrr-thumb { position: relative; aspect-ratio: 16 / 10; border-radius: 8px; overflow: hidden; background: #0b1220; }
        .nrr-thumb img { object-fit: cover; opacity: .88; transition: transform .3s ${EASE}, opacity .2s ${EASE}; }
        .nrr-vid:hover .nrr-thumb img { transform: scale(1.06); opacity: 1; }
        .nrr-play {
          position: absolute; inset: 0; display: grid; place-items: center; color: #fff;
        }
        .nrr-play span {
          width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center;
          background: rgba(255,255,255,.9); color: #0b1220; box-shadow: 0 4px 12px rgba(0,0,0,.3);
        }
        .nrr-dur {
          position: absolute; left: 5px; bottom: 5px; z-index: 2;
          font-size: 9.5px; font-weight: 700; color: #fff;
          background: rgba(0,0,0,.72); padding: 2px 5px; border-radius: 4px;
        }
        .nrr-vid-title { margin: 0; font-size: 12px; font-weight: 650; line-height: 1.4; color: #2b3446; }
      `}</style>

      <aside className="nrr">
        <div className="nrr-card">
          <div className="nrr-head">
            <h3>Live Updates</h3>
            <span className="nrr-live-pill"><i />Live</span>
          </div>
          <div className="nrr-marquee">
            <div className="nrr-marquee-track">
              {[...LIVE_UPDATES, ...LIVE_UPDATES].map((u, i) => {
                const s = KIND_STYLE[u.kind]
                // Second pass is the seamless-loop copy — hidden from screen
                // readers and tab order so the list is not announced twice.
                const clone = i >= LIVE_UPDATES.length
                return (
                  <a
                    key={`${u.id}-${i}`}
                    href={u.href}
                    className="nrr-item"
                    aria-hidden={clone || undefined}
                    tabIndex={clone ? -1 : undefined}
                  >
                    <span className="nrr-ico" style={{ background: s.bg, color: s.fg }}>
                      <KindIcon kind={u.kind} />
                    </span>
                    <div>
                      <div className="nrr-meta">
                        <span className="nrr-src">Locator</span>
                        <span className="nrr-time">{formatAgo(u.secondsAgo + elapsed)}</span>
                      </div>
                      <p className="nrr-title">{u.title}</p>
                      <p className="nrr-body">{u.body}</p>
                      <span className="nrr-cta">{u.cta} →</span>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
          <div className="nrr-foot">
            <a href="#newsroom-feed">View all updates →</a>
          </div>
        </div>

        <div className="nrr-card">
          <div className="nrr-head">
            <h3>Customer Review Videos</h3>
            <a className="nrr-viewall" href="#newsroom-feed">View All →</a>
          </div>
          <div className="nrr-list">
            {REVIEW_VIDEOS.map((v) => (
              <a key={v.id} href={v.href} className="nrr-vid">
                <div className="nrr-thumb">
                  <Image src={v.image} alt="" fill sizes="92px" />
                  <span className="nrr-play"><span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5Z" /></svg>
                  </span></span>
                  {v.duration && <span className="nrr-dur">{v.duration}</span>}
                </div>
                <p className="nrr-vid-title">{v.title}</p>
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}
