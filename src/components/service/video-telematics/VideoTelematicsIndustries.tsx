'use client'

import { useState } from 'react'
import Image from 'next/image'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

// Images are placeholders until the industry shots land — swap `image` only.
const INDUSTRIES = [
  {
    title: 'Transportation & Logistics',
    desc: 'Prevent cargo loss with AI theft detection and HD video proof, speeding claims, reducing fraud disputes, and improving fleet safety across deliveries and loading hubs.',
    image: '/service_page/Transport  Logistics 2.webp',
  },
  {
    title: 'Warehouse',
    desc: 'Enable 24/7 AI video monitoring for forklifts and machines, preventing equipment damage, boosting operator accountability, and strengthening warehouse incident reporting.',
    image: '/service_page/Facility Management Fleet.webp',
  },
  {
    title: 'Construction',
    desc: 'Improve site visibility with AI camera tracking and workforce monitoring, validating discrepancies, enhancing safety compliance, and optimizing job-site transport operations.',
    image: '/service_page/Construction Site Fleet.webp',
  },
  {
    title: 'School Districts',
    desc: 'Protect students and drivers with AI behavior monitoring and stop-arm violation evidence, improving road safety, driver training, and regulatory enforcement.',
    image: '/service_page/School & Educational Fleet Monitoring.webp',
  },
  {
    title: 'Waste Management',
    desc: 'Resolve complaints faster using real-time HD video and portal retrieval, improving driver coaching, service quality, and customer issue resolution.',
    image: '/service_page/Waste Management Fleet Visibility.webp',
  },
  {
    title: 'Field Services & Recovery',
    desc: 'Provide premium safety assurance with AI-protected video telematics for high-value vehicle transport, validating service completion and adding customer trust through recorded proof.',
    image: '/service_page/Rental Leasing.webp',
  },
]

export default function VideoTelematicsIndustries() {
  const [active, setActive] = useState(0)

  return (
    <>
      <style>{`
        .vti-rail {
          display: flex; gap: clamp(8px,1vw,12px);
          height: clamp(420px,46vw,560px);
        }

        .vti-panel {
          position: relative; overflow: hidden;
          flex: 1 1 0; min-width: 0;
          border: 0; padding: 0; cursor: pointer;
          border-radius: clamp(18px,2vw,24px);
          background: #0d1426;
          font-family: inherit; text-align: left;
          transition: flex-grow .62s ${EASE}, box-shadow .5s ${EASE};
          box-shadow: 0 18px 40px -26px rgba(13,20,38,.5);
        }
        /* The open panel takes the space; the rest stay as slim spines. */
        .vti-panel[aria-expanded="true"] {
          flex-grow: 5.4;
          box-shadow: 0 40px 80px -34px rgba(13,20,38,.62);
        }

        .vti-panel img {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
          transition: transform .7s ${EASE}, filter .5s ${EASE};
        }
        /* Flat scrim, not a gradient — solid tint for legibility. */
        .vti-veil {
          position: absolute; inset: 0;
          background: rgba(9,14,28,.62);
          transition: background .5s ${EASE};
        }
        .vti-panel[aria-expanded="true"] .vti-veil { background: rgba(9,14,28,.42); }
        .vti-panel[aria-expanded="false"]:hover img { transform: scale(1.06); }

        /* Accent bar marks the open panel. */
        .vti-panel::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: 0;
          height: 3px; background: #1360ee;
          transform: scaleX(0); transform-origin: left;
          transition: transform .5s ${EASE}; z-index: 3;
        }
        .vti-panel[aria-expanded="true"]::after { transform: scaleX(1); }

        /* ── Collapsed: vertical spine label ── */
        .vti-spine {
          position: absolute; inset: 0; z-index: 2;
          display: flex; align-items: center; justify-content: center;
          writing-mode: vertical-rl; transform: rotate(180deg);
          padding: 26px 0;
          font-size: clamp(13px,1.25vw,16px); font-weight: 800;
          letter-spacing: .1em; text-transform: uppercase; color: #fff;
          white-space: nowrap; overflow: hidden;
          /* Holds the label off bright patches of the photo. */
          text-shadow: 0 2px 12px rgba(9,14,28,.85), 0 1px 3px rgba(9,14,28,.7);
          transition: opacity .34s ${EASE};
        }
        .vti-panel[aria-expanded="true"] .vti-spine { opacity: 0; pointer-events: none; }

        /* ── Expanded: copy sits on its own frosted panel so it stays readable
           over any photo, however bright. Solid tint + blur, no gradient. ── */
        .vti-body {
          position: absolute; z-index: 2;
          left: clamp(14px,1.6vw,20px); right: clamp(14px,1.6vw,20px);
          bottom: clamp(14px,1.6vw,20px);
          padding: clamp(20px,2.2vw,28px);
          border-radius: clamp(14px,1.6vw,18px);
          background: rgba(9,14,28,.66);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          backdrop-filter: blur(14px) saturate(140%);
          border: 1px solid rgba(255,255,255,.14);
          opacity: 0; transform: translateY(14px);
          transition: opacity .45s ${EASE} .12s, transform .45s ${EASE} .12s;
          pointer-events: none;
        }
        .vti-panel[aria-expanded="true"] .vti-body { opacity: 1; transform: none; }
        .vti-body h3 {
          margin: 0 0 10px;
          font-size: clamp(20px,2.2vw,29px); font-weight: 800;
          letter-spacing: -.02em; line-height: 1.12; color: #fff;
        }
        .vti-body p {
          margin: 0; max-width: 52ch;
          font-size: clamp(13px,1.1vw,14.5px); line-height: 1.6;
          color: rgba(255,255,255,.9);
        }

        /* Stack on narrow screens — spines don't work at phone widths. */
        @media (max-width: 860px) {
          .vti-rail { flex-direction: column; height: auto; }
          .vti-panel { flex: 0 0 auto; height: 92px; transition: height .55s ${EASE}; }
          .vti-panel[aria-expanded="true"] { height: 340px; }
          .vti-spine {
            writing-mode: horizontal-tb; transform: none;
            justify-content: flex-start; padding: 0 24px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .vti-panel, .vti-panel img, .vti-veil, .vti-body, .vti-spine, .vti-panel::after {
            transition: none;
          }
        }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,88px) 28px', background: '#fff' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div data-reveal style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto clamp(36px,5vw,52px)' }}>
            <span style={{ fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 800, letterSpacing: '.04em', color: '#1360ee', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
              <span style={{ display: 'block', marginBottom: '12px' }}><span style={{ display: 'inline-block', width: '34px', height: '3px', background: '#1360ee', borderRadius: '2px' }} /></span>
              Industries we serve
            </span>
            <h2 style={{ margin: 0, fontSize: 'clamp(19px,2.2vw,26px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.015em', color: '#1d1d1f' }}>
              Revolutionizing Industries with AI Camera &amp; Video Telematics
            </h2>
          </div>

          <div className="vti-rail" data-reveal>
            {INDUSTRIES.map((ind, i) => (
              <button
                key={ind.title}
                className="vti-panel"
                aria-expanded={i === active}
                aria-label={ind.title}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <Image
                  src={ind.image}
                  alt=""
                  fill
                  sizes="(max-width: 860px) 100vw, 60vw"
                  style={{ objectFit: 'cover' }}
                />
                <span className="vti-veil" />

                <span className="vti-spine">{ind.title}</span>

                <div className="vti-body">
                  <h3>{ind.title}</h3>
                  <p>{ind.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
