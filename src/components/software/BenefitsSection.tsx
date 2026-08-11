'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

const ITEMS = [
  { label: 'Live GPS Tracking',          short: 'Track vehicles live, monitor drivers, improve road team control.' },
  { label: 'Dynamic Fleet Dashboard',    short: 'Central dashboard for trip insights, vehicle status, performance overview.' },
  { label: 'Instant Idle Alerts',        short: 'Detect long idle vehicles, reduce fuel waste, improve productivity.' },
  { label: 'After-Hours Vehicle Alerts', short: 'Get alerts for unauthorized movement, secure fleet beyond office hours.' },
  { label: 'Daily Route History',        short: 'Track routes, trip logs, driver activity, and delivery proof.' },
  { label: 'Fleet Service Reminders',    short: 'Automated maintenance alerts for oil, tires, and service schedules.' },
  { label: 'Field Tasks Manager',        short: 'Assign tasks to drivers, track progress, and monitor completion live.' },
  { label: 'Mobile Expense Manager',     short: 'Log road team expenses, validate costs, and track spending instantly.' },
  { label: 'Geofence & POI Monitoring',  short: 'Set virtual zones, get entry/exit alerts for office and customer sites.' },
  { label: 'AI Route Optimization',      short: 'Optimize fleet routes with AI, cut delays, save fuel, improve operations.' },
]

// index → screen recording. Two aspect ratios in the mix: the original three
// captures are 1726x1512, the newer Task Manager / Expense Manager / AI Route
// clips are a slightly narrower 1672x1512 — each is recorded here rather than
// assumed, since .bf-right--media below sizes itself exactly to whichever is active.
const VIDEO_MAP: Record<number, { src: string; aspect: string }> = {
  0: { src: '/software_images/fleet-telematics/live-gps.mp4',              aspect: '1726 / 1512' },
  1: { src: '/software_images/fleet-telematics/fleet-dashboard.mp4',       aspect: '1726 / 1512' },
  4: { src: '/software_images/fleet-telematics/daily-route.mp4',           aspect: '1726 / 1512' },
  6: { src: '/software_images/fleet-telematics/task-manager.mp4',          aspect: '1672 / 1512' },
  7: { src: '/software_images/fleet-telematics/expense-manager.mp4',       aspect: '1672 / 1512' },
  9: { src: '/software_images/fleet-telematics/ai-route-optimization.mp4', aspect: '1672 / 1512' },
}
// Flat list so every video can stay mounted + preloaded (no re-mount flash).
const VIDEO_LIST = Object.entries(VIDEO_MAP).map(([idx, v]) => ({ idx: Number(idx), ...v }))

// index → static screen capture, for the four tabs that don't have a recording.
const IMAGE_MAP: Record<number, { src: string; alt: string; w: number; h: number }> = {
  2: { src: '/software_images/fleet-telematics/idle-alerts.png',      alt: 'LOCATOR live view flagging a vehicle idling for 30 minutes',       w: 725,  h: 698 },
  3: { src: '/software_images/fleet-telematics/after-hours.png',      alt: 'LOCATOR live view of a vehicle moving outside office hours',       w: 435,  h: 366 },
  5: { src: '/software_images/fleet-telematics/service-reminders.png', alt: 'LOCATOR notifications — service and document reminders due',       w: 1116, h: 1578 },
  8: { src: '/software_images/fleet-telematics/geofence.png',         alt: 'LOCATOR live view with a vehicle inside a geofenced zone',          w: 1050, h: 1023 },
}

// ── Main export ──────────────────────────────────────────────────────────────

export default function BenefitsSection() {
  const [active, setActive] = useState(0)
  const videoEntry = VIDEO_MAP[active] ?? null
  const videoSrc = videoEntry?.src ?? null
  const imageEntry = IMAGE_MAP[active] ?? null
  const mediaAspect = videoEntry?.aspect ?? (imageEntry ? `${imageEntry.w} / ${imageEntry.h}` : null)

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  // Which videos actually have a frame decoded. Until a video is "ready" we keep
  // it transparent and show a light placeholder — so a not-yet-loaded video
  // (first load / mobile, where preload is ignored) never renders as black.
  const [ready, setReady] = useState<Record<string, boolean>>({})
  const markReady = (src: string) =>
    setReady(r => (r[src] ? r : { ...r, [src]: true }))

  // Only the active video plays; the others stay paused holding their frame,
  // so switching tabs reveals a frame instantly.
  useEffect(() => {
    VIDEO_LIST.forEach(({ idx }, i) => {
      const v = videoRefs.current[i]
      if (!v) return
      if (idx === active) v.play().catch(() => {})
      else v.pause()
    })
  }, [active])

  const activeReady = videoSrc ? !!ready[videoSrc] : true

  const goUp   = () => setActive(p => Math.max(0, p - 1))
  const goDown = () => setActive(p => Math.min(ITEMS.length - 1, p + 1))

  return (
    <>
      <style>{`
        /* Light loading placeholder for videos (never a black box) */
        @keyframes bfShimmer { 0% { background-position: -160% 0; } 100% { background-position: 160% 0; } }
        .bf-skeleton {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(100deg, #eef2f8 30%, #f7faff 50%, #eef2f8 70%);
          background-size: 200% 100%;
          animation: bfShimmer 1.4s ${EASE} infinite;
        }

        /* accordion item wrapper — persistent pill background, sized to its own content */
        .bf-item {
          border-radius: 18px;
          overflow: hidden;
          background: #f5f5f7;
          transition: background .15s ${EASE};
          align-self: flex-start;
          max-width: 100%;
        }
        .bf-item:hover { background: #ececf0; }
        .bf-item.on {
          background: #ececf0;
          align-self: stretch;
        }

        /* pill trigger row — inline-flex so it shrink-wraps to its label width */
        .bf-pill {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 16px 22px;
          background: none; border: none; border-radius: 18px;
          cursor: pointer; font-family: inherit; text-align: left;
          white-space: nowrap;
        }
        /* Active item shows only its description, no header row */
        .bf-item.on .bf-pill { display: none; }
        .bf-pill-icon {
          width: 26px; height: 26px; border-radius: 50%;
          border: 1.5px solid #c8c8d0;
          display: grid; place-items: center;
          flex-shrink: 0; color: #8888a0; font-size: var(--f-17); line-height: 1;
          transition: border-color .2s ${EASE}, color .2s ${EASE}, transform .35s cubic-bezier(.34,1.3,.64,1);
        }
        .bf-pill-lbl {
          font-size: var(--f-14); font-weight: 600; color: #3a3a3c;
          letter-spacing: -.01em; transition: color .15s;
        }

        /* accordion body — CSS grid-rows for smooth height */
        .bf-acc-body {
          display: grid; grid-template-rows: 0fr;
          transition: grid-template-rows .32s ${EASE};
        }
        .bf-item.on .bf-acc-body { grid-template-rows: 1fr; }
        .bf-acc-inner { overflow: hidden; min-height: 0; }
        .bf-acc-desc {
          padding: 22px 24px;
          font-size: var(--f-15); line-height: 1.6; color: #6b6b70;
          opacity: 0; transform: translateY(-4px);
          transition: opacity .18s, transform .22s ${EASE};
        }
        .bf-item.on .bf-acc-desc {
          opacity: 1; transform: translateY(0);
          transition: opacity .26s .08s, transform .3s .06s ${EASE};
        }

        /* nav arrow buttons */
        .bf-arrow {
          width: 34px; height: 34px; border-radius: 50%;
          border: 1.5px solid #e0e0e4; background: #fff;
          display: grid; place-items: center;
          cursor: pointer; color: #6e6e73;
          transition: border-color .15s, color .15s, background .15s;
        }
        .bf-arrow:hover:not(:disabled) { border-color: #1360ee; color: #1360ee; background: #f0f4ff; }
        .bf-arrow:disabled { opacity: .3; cursor: default; }

        /* Mirrors the arrow column on the other side of the card. The arrows are
           outside the card, so on their own they push it 48px (34px column +
           14px gap) to the right: the space left of the card ends up 48px wider
           than the space right of it, and the card stops sharing a centre line
           with the heading above it. Reserving the same width on the right
           centres the card again — at every width, since below 900px the arrows
           move above the card and this collapses with them. */
        .bf-arrows-mirror { width: 34px; flex-shrink: 0; }

        /* Every tab now shows a real capture (video or screenshot), each at its
           own aspect ratio (see mediaAspect above). object-fit: contain can only
           ever avoid both cropping AND empty bars if the box it's sizing into
           already has the media's own aspect ratio — no CSS on the box can make
           "contain" fill a differently-shaped box without one or the other. So
           rather than let bf-right take whatever height the accordion list
           dictates (stretch, the flex default) and then pad out the mismatch,
           it opts out of stretch and sizes itself directly from the active
           capture's own ratio (passed in via the --media-ar custom property) —
           at that point contain has nothing left to fit, it already matches
           exactly. Any leftover height where the list column is taller shows as
           plain card white beside a vertically centred capture, never as bars
           inside it. Scoped to ≥901px because align-self here governs the row's
           cross axis (vertical); once .bf-outer switches to flex-direction:
           column below 900px, cross axis is horizontal and this rule would
           fight the panel's full-width layout instead of helping it. */
        @media (min-width: 901px) {
          .bf-right--media {
            aspect-ratio: var(--media-ar);
            align-self: center;
          }
        }

        @media (max-width: 900px) {
          /* Stack the arrows above the full-width card instead of beside it,
             so the card no longer gets squeezed into a narrow column. */
          .bf-row   { flex-direction: column !important; gap: 0 !important; }
          .bf-arrows-mirror { display: none; }
          .bf-outer { flex-direction: column !important; }
          .bf-left  { width: 100% !important; border-right: none !important; border-bottom: 1px solid #e8e8eb; }
          .bf-right { min-height: 360px; }
          .bf-arrows { flex-direction: row !important; position: static !important; margin: 0 auto 14px !important; }
        }
      `}</style>

      <section id="benefits" style={{ padding: 'clamp(56px,7vw,80px) 28px 24px', background: '#ffffff' }}>
        {/* Wider than the page's usual 1120px column, and matching ModulesSection's
            1440px. Both blocks are the same kind of thing — a big interactive
            showcase whose content is a screen, not prose — and at 1100px this one
            was leaving a broad empty margin either side while squeezing the list
            and the video it exists to show. Text sections keep the narrower column;
            a paragraph does not want a 1440px measure. */}
        <div style={{ maxWidth: 'var(--w-1440)', margin: '0 auto' }}>

          {/* ── Header — centered ── */}
          <div data-reveal style={{ marginBottom: '36px', textAlign: 'center' }}>
            <span style={{
              fontSize: 'max(clamp(22px,2.8vw,32px), min(2.222vw, 46.4px))', fontWeight: 800, letterSpacing: '.04em',
              color: '#1360ee', textTransform: 'uppercase' as const,
              display: 'block', marginBottom: '16px',
            }}>
              <span style={{ display: 'block', marginBottom: '12px' }}><span style={{ display: 'inline-block', width: '34px', height: '3px', background: '#1360ee', borderRadius: '2px' }} /></span>
              Benefits
            </span>
            <h2 style={{
              margin: '0 auto',
              fontSize: 'max(clamp(19px,2.2vw,26px), min(1.806vw, 37.7px))',
              fontWeight: 800, lineHeight: 1.25,
              letterSpacing: '-.015em', color: '#1d1d1f',
              maxWidth: '600px',
            }}>
              AI-Driven GPS Tracking &amp; Fleet Telematics Benefits
            </h2>
          </div>

          {/* ── Main card + arrows row ── */}
          <div className="bf-row" style={{ display: 'flex', alignItems: 'stretch', gap: '14px' }}>

            {/* Up / Down arrows — left of card */}
            <div className="bf-arrows" style={{
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center', gap: '8px', flexShrink: 0,
            }}>
              <button className="bf-arrow" onClick={goUp} disabled={active === 0} aria-label="Previous">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </button>
              <button className="bf-arrow" onClick={goDown} disabled={active === ITEMS.length - 1} aria-label="Next">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>

            {/* ── Big card ── */}
            <div
              className="bf-outer"
              data-reveal
              style={{
                flex: 1,
                display: 'flex',
                border: '1px solid #e4e4e8',
                borderRadius: '22px',
                overflow: 'hidden',
                background: '#fff',
                minHeight: '520px',
                boxShadow: '0 2px 16px rgba(0,0,0,.05)',
              }}
            >
              {/* Left — pill list + description */}
              <div
                className="bf-left"
                style={{
                  // 270px left the longest labels ('After-Hours Vehicle Alerts')
                  // filling the pill edge to edge — the trigger row is nowrap
                  // inside an overflow:hidden item, so there was nothing spare
                  // before one started getting clipped — and gave the open item's
                  // description a ~220px measure, which broke it over four lines.
                  //
                  // Now widened again, and on the site-wide vw scale (same
                  // max(BASE, min(K vw, BASE x 1.45)) formula as --w-*), because
                  // the card grew to 1440 but this column did not: every extra
                  // pixel of card width was landing in the video panel, which is
                  // wider than the ~1.1-1.15 aspect of the captures it holds.
                  // object-fit: contain then pillarboxed them, and the panel
                  // background showed as slabs either side. At this width the
                  // panel lands close enough that the video fills it edge to
                  // edge, and the open item's description gets a real measure
                  // instead of a 250px ribbon.
                  width: 'max(470px, min(30.13vw, 681px))',
                  flexShrink: 0,
                  borderRight: '1px solid #e4e4e8',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '20px 14px 16px',
                  gap: '10px',
                }}
              >
                {ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className={`bf-item${active === i ? ' on' : ''}`}
                  >
                    {/* Trigger row */}
                    <button
                      className="bf-pill"
                      onClick={() => setActive(i)}
                    >
                      <span className="bf-pill-icon">+</span>
                      <span className="bf-pill-lbl">{item.label}</span>
                    </button>

                    {/* Accordion body */}
                    <div className="bf-acc-body">
                      <div className="bf-acc-inner">
                        <p className="bf-acc-desc">
                          <strong style={{ color: '#1d1d1f', fontWeight: 700 }}>{item.label}.</strong>{' '}
                          {item.short}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right — video or screenshot panel */}
              <div
                className={`bf-right${mediaAspect ? ' bf-right--media' : ''}`}
                style={{
                  flex: 1,
                  background: '#ffffff',
                  overflow: 'hidden',
                  position: 'relative',
                  ...(mediaAspect ? { '--media-ar': mediaAspect } as React.CSSProperties : {}),
                }}
              >
                {/* Light shimmer shown while the active video has no frame yet
                    (first load / mobile), instead of a black screen. */}
                {videoSrc && !activeReady && (
                  <div className="bf-skeleton" aria-hidden="true" />
                )}

                {/* All videos stay mounted and cross-fade; each only becomes
                    visible once it actually has a decoded frame. */}
                {VIDEO_LIST.map(({ idx, src }, i) => {
                  const show = active === idx && !!ready[src]
                  return (
                    <video
                      key={src}
                      ref={el => { videoRefs.current[i] = el }}
                      muted
                      loop
                      playsInline
                      preload="auto"
                      onLoadedData={() => markReady(src)}
                      onCanPlay={() => markReady(src)}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        // contain: shows the complete screen capture, nothing
                        // cropped off its edges. This only avoids letterbox bars
                        // because .bf-right--media (see the style block above)
                        // now sizes itself to the active capture's own ratio on
                        // desktop, so there's no leftover space for contain to
                        // pad out. Mobile still relies on contain's ordinary
                        // fit-without-cropping behaviour.
                        objectFit: 'contain',
                        objectPosition: 'center',
                        display: 'block',
                        opacity: show ? 1 : 0,
                        zIndex: active === idx ? 2 : 1,
                        pointerEvents: active === idx ? 'auto' : 'none',
                        transition: 'opacity .4s ' + EASE,
                      }}
                    >
                      <source src={src} type="video/mp4" />
                    </video>
                  )
                })}

                {/* Static screen capture for tabs that don't have a recording */}
                {!videoSrc && imageEntry && (
                  <Image
                    key={imageEntry.src}
                    src={imageEntry.src}
                    alt={imageEntry.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 60vw"
                    style={{ objectFit: 'contain', objectPosition: 'center' }}
                  />
                )}
              </div>
            </div>

            {/* Spacing, not content — see .bf-arrows-mirror. */}
            <div className="bf-arrows-mirror" aria-hidden="true" />
          </div>

        </div>
      </section>
    </>
  )
}
