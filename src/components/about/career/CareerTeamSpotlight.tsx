'use client'

import { useState } from 'react'
import Image from 'next/image'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

// Real product-demo recordings, not stock people — click-to-play so the
// (multi-MB) clip only loads once someone actually wants to watch it.
const CARDS = [
  {
    tag: 'The Platform',
    title: 'Build the tech behind live fleet command',
    poster: '/dashboard.png',
    video: '/software_images/1781720706096317.mp4',
  },
  {
    tag: 'The Impact',
    title: 'Ship features that move real vehicles, in real time',
    poster: '/live-showcase.png',
    video: '/software_images/1781721807787704.mp4',
  },
]

export default function CareerTeamSpotlight() {
  const [playing, setPlaying] = useState<Record<number, boolean>>({})

  return (
    <section className="cts-section">
      <style>{`
        .cts-section { padding: clamp(56px,7vw,88px) 28px; background: #f4f6fa; }
        .cts-inner { max-width: var(--w-1120); margin: 0 auto; }
        .cts-h2 { margin: 0 0 clamp(28px,4vw,40px); text-align: center; font-size: max(clamp(22px,2.8vw,32px), min(2.222vw, 46.4px)); font-weight: 800; letter-spacing: -.01em; color: #1360ee; text-transform: uppercase; }

        .cts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(16px,2vw,22px); }
        @media (max-width: 760px) { .cts-grid { grid-template-columns: 1fr; } }

        .cts-card {
          position: relative; display: block; overflow: hidden;
          aspect-ratio: 6 / 5; border-radius: 18px;
          background: #0a0f1e; border: 0; padding: 0; width: 100%; cursor: pointer;
        }
        .cts-card img, .cts-card video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .6s ${EASE}; }
        .cts-card:not([data-playing="true"]):hover img { transform: scale(1.06); }
        .cts-card::after {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(180deg, rgba(6,10,20,.15) 0%, rgba(6,10,20,.15) 45%, rgba(6,10,20,.92) 100%);
          transition: opacity .3s ${EASE};
        }
        .cts-card[data-playing="true"]::after { opacity: 0; }

        .cts-logo { position: absolute; z-index: 2; top: clamp(16px,2vw,22px); left: clamp(16px,2vw,22px); width: 96px; height: 26px; transition: opacity .3s ${EASE}; }
        .cts-logo img { object-fit: contain; object-position: left; }
        .cts-card[data-playing="true"] .cts-logo { opacity: 0; }

        .cts-text { position: absolute; z-index: 2; left: clamp(16px,2vw,22px); right: clamp(16px,2vw,22px); bottom: clamp(18px,2.4vw,26px); text-align: left; transition: opacity .3s ${EASE}; }
        .cts-tag { display: block; margin-bottom: 8px; font-size: var(--f-11); font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: rgba(255,255,255,.7); }
        .cts-title { margin: 0; font-size: max(clamp(19px,2.2vw,25px), min(1.736vw, 36.25px)); font-weight: 800; letter-spacing: -.015em; line-height: 1.2; color: #fff; max-width: 22ch; }
        .cts-card[data-playing="true"] .cts-text { opacity: 0; pointer-events: none; }

        .cts-play {
          position: absolute; z-index: 2; inset: 0; display: grid; place-items: center;
          transition: opacity .3s ${EASE};
        }
        .cts-card[data-playing="true"] .cts-play { opacity: 0; pointer-events: none; }
        .cts-play-btn {
          width: 64px; height: 64px; border-radius: 50%;
          background: rgba(255,255,255,.16); border: 1.5px solid rgba(255,255,255,.5);
          -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);
          display: grid; place-items: center; color: #fff;
          transition: background .2s ${EASE}, transform .2s ${EASE};
        }
        .cts-card:hover .cts-play-btn { background: #1360ee; border-color: #1360ee; transform: scale(1.08); }

        @media (prefers-reduced-motion: reduce) { .cts-card img, .cts-card::after, .cts-logo, .cts-text, .cts-play { transition: none; } }
      `}</style>

      <div className="cts-inner">
        <h2 className="cts-h2">Meet LOCATOR</h2>

        <div className="cts-grid" data-reveal>
          {CARDS.map((c, i) => {
            const isPlaying = !!playing[i]
            return (
              <button
                key={c.title}
                type="button"
                className="cts-card"
                data-playing={isPlaying}
                aria-label={isPlaying ? c.title : `Play video: ${c.title}`}
                onClick={() => setPlaying((p) => ({ ...p, [i]: true }))}
              >
                {isPlaying ? (
                  <video src={c.video} autoPlay controls playsInline />
                ) : (
                  <Image src={c.poster} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                )}

                <span className="cts-logo"><Image src="/logo.png" alt="LOCATOR" fill sizes="96px" style={{ objectFit: 'contain', objectPosition: 'left' }} /></span>

                <div className="cts-text">
                  <span className="cts-tag">{c.tag}</span>
                  <h3 className="cts-title">{c.title}</h3>
                </div>

                <span className="cts-play" aria-hidden="true">
                  <span className="cts-play-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 3 }}>
                      <polygon points="6 3 20 12 6 21" />
                    </svg>
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
