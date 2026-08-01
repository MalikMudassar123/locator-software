'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

// The centre handset in the software hero: the app screen as an image, with a
// live push-notification stack over its lower third.
//
// The stack is markup rather than part of the screenshot for the reason the
// screenshot could not be: mobile-notifications.png was captured at real device
// width, so scaled into the fan its cards arrive pre-cropped — addresses running
// off the right edge, the bottom row sliced. Laid out live, each card wraps to
// the width it is actually given and nothing is cut.
//
// It covers only the lower part on purpose. These read as notifications arriving
// OVER an app, which needs the app still visible behind them.
//
// SIZING. Everything is in `cqw` — percentages of this component's own width —
// with `container-type: inline-size` on the root. The phone box is fluid
// (clamp(260px, 50vh, 540px) tall, fixed 466/1000 aspect), so there is no pixel
// size to design against; one number drives the whole overlay instead.

type Notification = { vehicle: string; event: 'Entered' | 'Exited'; zone: string; time: string }

const NOTIFICATIONS: Notification[] = [
  { vehicle: 'Harshad Tech 49357',     event: 'Exited',  zone: 'Harshad Home',         time: '08:17' },
  { vehicle: 'Deepak Sales 30295',     event: 'Entered', zone: 'Abu Dhabi Emirates',   time: '09:04' },
  { vehicle: 'Musthafa Tech 54016',    event: 'Exited',  zone: 'Locator Dubai Office', time: '10:12' },
  { vehicle: 'Ajmal Sales 48357',      event: 'Entered', zone: 'Dubai Zone',           time: '10:41' },
  { vehicle: 'Umer Sales 15833',       event: 'Entered', zone: 'Abu Dhabi Emirates',   time: '11:22' },
  { vehicle: 'Sharmadi Support 54257', event: 'Exited',  zone: 'Locator Dubai Office', time: '12:08' },
]

const VISIBLE = 5      // cards on screen at once
const INTERVAL = 2800  // ms between arrivals

export default function HeroNotificationPhone() {
  const [cursor, setCursor] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    // Paused while a card is hovered, so the one being looked at cannot be
    // pulled out from under the pointer mid-read.
    if (paused) return
    const id = setInterval(() => setCursor(c => c + 1), INTERVAL)
    return () => clearInterval(id)
  }, [paused])

  // Oldest first (top) through newest (bottom), plus one extra above the top:
  // the card that has just aged out. It stays mounted for one beat so it can
  // animate away — React would otherwise unmount it instantly, and an exit
  // animation has nothing to run on.
  const slots = Array.from({ length: VISIBLE + 1 }, (_, k) => {
    const seq = cursor + k - 1
    const n = NOTIFICATIONS[((seq % NOTIFICATIONS.length) + NOTIFICATIONS.length) % NOTIFICATIONS.length]
    return { seq, n, leaving: k === 0 }
  })

  return (
    <div className="hnp" role="img" aria-label="Locator app — live geozone notifications">
      <style>{`
        .hnp { position: absolute; inset: 0; container-type: inline-size; }
        .hnp img { object-fit: contain; }

        /* Lower third only — the app screen behind stays readable. Inset from
           the edges so the cards sit inside the device's screen, not on its
           bezel. overflow is deliberately NOT hidden: a hovered card lifts past
           these bounds, which is the whole point of the hover. */
        .hnp__stack {
          position: absolute;
          left: 6cqw;
          right: 6cqw;
          bottom: 8cqw;
          display: flex;
          flex-direction: column;
          gap: 2.4cqw;
          perspective: 70cqw;
          perspective-origin: 50% 60%;
        }

        /* Opaque white rather than a tint over the screen, and lifted on a
           two-stop shadow: a tight contact shadow that anchors it to the glass
           plus a wide ambient one that separates it from the app behind. A
           single soft shadow reads as a flat panel; the pair is what makes these
           look like they are sitting ON the screen. */
        .hnp-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 3cqw;
          cursor: pointer;
          background: linear-gradient(180deg, #ffffff 0%, #fbfcfe 100%);
          -webkit-backdrop-filter: blur(1.6cqw) saturate(160%);
                  backdrop-filter: blur(1.6cqw) saturate(160%);
          border-radius: 3.8cqw;
          padding: 3.1cqw 3.4cqw;
          box-shadow:
            0 0.5cqw 1.2cqw rgba(20,40,90,0.10),
            0 2cqw 5cqw rgba(20,40,90,0.15),
            inset 0 0.22cqw 0 rgba(255,255,255,0.9),
            0 0 0 0.24cqw rgba(20,40,90,0.055);
          transform-style: preserve-3d;
          transition:
            transform 0.42s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.42s cubic-bezier(0.16, 1, 0.3, 1),
            background-color 0.3s ease;
        }

        /* Hover lifts the card off the screen and toward the viewer. translateZ
           against the stack's perspective is what sells it as depth rather than
           as a card that simply got bigger — it grows from its own plane, and
           the shadow spreads underneath as if it had left the glass. */
        .hnp-card:hover {
          transform: translateZ(10cqw) translateY(-1.2cqw);
          background: #ffffff;
          box-shadow:
            0 5cqw 10cqw rgba(20,40,90,0.28),
            0 1.4cqw 3.4cqw rgba(20,40,90,0.15),
            inset 0 0.22cqw 0 rgba(255,255,255,0.95),
            0 0 0 0.26cqw rgba(19,96,238,0.28);
          z-index: 3;
        }

        .hnp-card__icon {
          flex-shrink: 0;
          width: 9.4cqw;
          height: 9.4cqw;
          border-radius: 2.8cqw;
          background: linear-gradient(160deg, #fff4e6 0%, #ffe9d1 100%);
          color: #d97706;
          box-shadow: inset 0 0 0 0.2cqw rgba(217,119,6,0.14);
          display: grid;
          place-items: center;
        }
        .hnp-card__icon.is-in {
          background: linear-gradient(160deg, #e8f9ef 0%, #d6f4e3 100%);
          color: #12a057;
          box-shadow: inset 0 0 0 0.2cqw rgba(18,160,87,0.16);
        }
        .hnp-card__icon svg { width: 5cqw; height: 5cqw; display: block; }

        .hnp-card__body { min-width: 0; flex: 1; }
        /* Nothing is clamped. A notification cut off mid-sentence is exactly what
           the screenshot was doing wrong; these wrap to as many lines as they need. */
        .hnp-card__title {
          margin: 0;
          font-size: 3.5cqw;
          font-weight: 700;
          letter-spacing: -0.005em;
          line-height: 1.28;
          color: #16202f;
        }
        .hnp-card__zone {
          margin: 0.7cqw 0 0;
          font-size: 3.1cqw;
          font-weight: 500;
          line-height: 1.3;
          color: #64748b;
        }
        .hnp-card__time {
          margin: 1cqw 0 0;
          font-size: 2.9cqw;
          font-weight: 600;
          line-height: 1;
          color: #9fadc0;
        }

        /* ── Arrival and departure ──────────────────────────────────────
           One in, one out. The newest card rises into the bottom of the stack
           while the one that has aged out lifts away at the top, so the group
           reads as a queue moving through rather than as a list scrolling. */
        @keyframes hnpIn {
          from { opacity: 0; transform: translateY(7cqw) scale(0.94); }
          to   { opacity: 1; transform: none; }
        }
        /* max-height collapses the row as it fades, so the four below it slide up
           into the space rather than the whole stack jumping when the node goes.
           The value only has to EXCEED a real card's height — it is an animation
           bound, not a layout size, and the card is never actually clipped by it. */
        @keyframes hnpOut {
          from { opacity: 1; transform: none; max-height: 30cqw; margin-bottom: 0; }
          to   { opacity: 0; transform: translateY(-4cqw) scale(0.9); max-height: 0; margin-bottom: -2.4cqw; }
        }
        .hnp-card.is-leaving { pointer-events: none; overflow: hidden; }

        @media (prefers-reduced-motion: no-preference) {
          .hnp-card { animation: hnpIn 0.62s cubic-bezier(0.16, 1, 0.3, 1) both; }
          /* Runs slightly under the arrival interval so the row has fully
             collapsed before the next card is pushed in beneath it. */
          .hnp-card.is-leaving { animation: hnpOut 0.55s cubic-bezier(0.4, 0, 0.2, 1) both; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hnp-card.is-leaving { display: none; }
        }
      `}</style>

      <Image
        src="/hero/mobile-dashboard.webp"
        alt=""
        fill
        sizes="(max-width: 520px) 72vw, (max-width: 820px) 42vw, 24vw"
        priority
        loading="eager"
      />

      <div
        className="hnp__stack"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slots.map(({ seq, n, leaving }) => {
          const entered = n.event === 'Entered'
          return (
            <div key={seq} className={`hnp-card${leaving ? ' is-leaving' : ''}`}>
              <span className={`hnp-card__icon${entered ? ' is-in' : ''}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {/* Arrow crossing a boundary — into the zone, or out of it. */}
                  <path d={entered ? 'M3 12h11M10 8l4 4-4 4' : 'M14 12H3M7 8l-4 4 4 4'} />
                  <path d="M17 4h2a2 2 0 012 2v12a2 2 0 01-2 2h-2" />
                </svg>
              </span>
              <span className="hnp-card__body">
                <p className="hnp-card__title">{n.vehicle} {n.event} Geozone</p>
                <p className="hnp-card__zone">[{n.zone}]</p>
                <p className="hnp-card__time">{n.time}</p>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
