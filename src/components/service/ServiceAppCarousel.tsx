'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const EASE = 'cubic-bezier(.22,.61,.36,1)'
const AUTOPLAY_MS = 4200

export type AppScreen = { src: string; alt: string; w: number; h: number }

type Props = {
  screens: AppScreen[]
}

export default function ServiceAppCarousel({ screens }: Props) {
  const count = screens.length
  const [active, setActive] = useState(count > 1 ? 1 : 0)
  const touchX = useRef<number | null>(null)

  const go = useCallback((dir: number) => {
    setActive(a => (a + dir + count) % count)
  }, [count])

  // Runs continuously — hovering, focusing, or clicking never stops it, it only
  // restarts the countdown so a manual jump still gets a full beat on screen.
  useEffect(() => {
    if (count < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setTimeout(() => go(1), AUTOPLAY_MS)
    return () => window.clearTimeout(id)
  }, [count, active, go])

  // Position each screen relative to the active one, wrapping at the ends
  const relative = (i: number) => {
    let d = i - active
    if (d > count / 2) d -= count
    if (d < -count / 2) d += count
    return d
  }

  return (
    <>
      <style>{`
        .sac {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(18px,3vw,26px);
        }
        .sac-stage {
          position: relative; width: 100%;
          height: clamp(400px,52vw,540px);
          display: grid; place-items: center;
          /* Neighbours peek in from the edges rather than pushing the page sideways */
          overflow: hidden;
          touch-action: pan-y;
        }
        .sac-slide {
          position: absolute; top: 50%; left: 50%;
          height: 100%; transform-origin: center center;
          transition: transform .62s ${EASE}, opacity .62s ${EASE}, filter .62s ${EASE};
          will-change: transform, opacity;
        }
        .sac-slide img { height: 100%; width: auto; display: block; }
        .sac-slide-btn {
          appearance: none; background: none; border: none; padding: 0; margin: 0;
          height: 100%; display: block; cursor: pointer; font: inherit;
        }
        .sac-slide-active .sac-slide-btn { cursor: default; }

        .sac-controls { display: flex; align-items: center; gap: 18px; }
        .sac-arrow {
          width: 42px; height: 42px; border-radius: 50%; cursor: pointer;
          background: #fff; border: 1.5px solid #dbe3f5; color: #1360ee;
          display: grid; place-items: center;
          transition: border-color .2s ${EASE}, transform .2s ${EASE}, box-shadow .2s ${EASE};
        }
        .sac-arrow:hover { border-color: #1360ee; transform: translateY(-2px); box-shadow: 0 10px 22px -10px rgba(19,96,238,.5); }
        .sac-dots { display: flex; align-items: center; gap: 9px; }
        .sac-dot {
          width: 8px; height: 8px; padding: 0; border: none; border-radius: 999px;
          background: #d3dcec; cursor: pointer;
          transition: width .3s ${EASE}, background .3s ${EASE};
        }
        .sac-dot-on { width: 26px; background: #1360ee; }

        @media (max-width: 600px) {
          .sac-stage { height: clamp(340px,78vw,420px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sac-slide { transition: none; }
        }
      `}</style>

      <div className="sac">
        <div
          className="sac-stage"
          role="group"
          aria-roledescription="carousel"
          aria-label="LOCATOR mobile app screens"
          onTouchStart={e => { touchX.current = e.touches[0].clientX }}
          onTouchEnd={e => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
            touchX.current = null
          }}
        >
          {screens.map((s, i) => {
            const d = relative(i)
            const isActive = d === 0
            const off = Math.min(Math.abs(d), 2)
            return (
              <div
                key={s.src}
                className={`sac-slide${isActive ? ' sac-slide-active' : ''}`}
                style={{
                  zIndex: 10 - off,
                  opacity: off > 1 ? 0 : isActive ? 1 : 0.62,
                  filter: isActive ? 'none' : 'saturate(.85)',
                  transform: `translate(-50%,-50%) translateX(${d * 62}%) scale(${isActive ? 1 : 0.74})`,
                  pointerEvents: off > 1 ? 'none' : 'auto',
                }}
              >
                <button
                  type="button"
                  className="sac-slide-btn"
                  onClick={() => !isActive && setActive(i)}
                  tabIndex={isActive || off > 1 ? -1 : 0}
                  aria-label={isActive ? undefined : `Show ${s.alt}`}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={s.w}
                    height={s.h}
                    sizes="(max-width: 600px) 60vw, 320px"
                  />
                </button>
              </div>
            )
          })}
        </div>

        <div className="sac-controls">
          <button type="button" className="sac-arrow" onClick={() => go(-1)} aria-label="Previous screen">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>

          <div className="sac-dots">
            {screens.map((s, i) => (
              <button
                key={s.src}
                type="button"
                className={`sac-dot${i === active ? ' sac-dot-on' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Go to screen ${i + 1}`}
                aria-current={i === active}
              />
            ))}
          </div>

          <button type="button" className="sac-arrow" onClick={() => go(1)} aria-label="Next screen">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      </div>
    </>
  )
}
