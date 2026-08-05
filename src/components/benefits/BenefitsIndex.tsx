'use client'

import { useEffect, useRef } from 'react'
import { BENEFITS } from './data'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

// ── The eleven reasons, as an index rather than a card grid ──────────────────
//
// The previous version of this page laid these out as a three-column grid of
// identical bordered cards with an identical blue tick on top of each. That
// shape actively works against the content: eleven cards of wildly different
// text lengths leave ragged holes in the grid, the repeated tick carries no
// information, and nothing tells the reader how far through the list they are.
//
// An index fixes all three. Rows are full width so a long entry simply takes the
// room it needs, the numeral does the work the tick was pretending to do, and a
// hairline rail down the left fills as you read — which is the one piece of
// motion on this section that is genuinely useful rather than decorative.
export default function BenefitsIndex() {
  const listRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)

  // Scroll-linked, not time-based: the fill is a readout of the reader's own
  // position, so it must be driven by scroll and nothing else. rAF-coalesced so
  // a burst of scroll events costs one style write per frame, and it only ever
  // writes `transform`, which stays off the layout path entirely.
  useEffect(() => {
    const list = listRef.current
    const fill = fillRef.current
    if (!list || !fill) return

    let raf = 0
    const update = () => {
      raf = 0
      const r = list.getBoundingClientRect()
      if (r.height <= 0) return
      // The reading line sits a little above centre — that is roughly where the
      // eye rests, and anchoring to it means the rail reaches full height as the
      // last row is being read rather than long after it has gone past.
      const anchor = window.innerHeight * 0.55
      const p = (anchor - r.top) / r.height
      fill.style.transform = `scaleY(${Math.min(1, Math.max(0, p))})`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      <style>{`
        .bgx { background: #fff; padding: clamp(64px,8vw,112px) 28px; }
        .bgx-inner { max-width: var(--w-1120); margin: 0 auto; }

        .bgx-head { max-width: 720px; margin-bottom: clamp(40px,5vw,64px); }
        .bgx-eyebrow {
          display: flex; align-items: center; gap: 12px; margin: 0 0 18px;
          font-size: 12px; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: #0a89dd;
        }
        .bgx-eyebrow::before { content: ''; width: 30px; height: 2px; background: #0a89dd; border-radius: 2px; }
        .bgx-h2 {
          margin: 0; font-size: clamp(27px,3.6vw,44px); font-weight: 800;
          line-height: 1.12; letter-spacing: -.03em; color: #1d1d1f;
        }
        .bgx-sub {
          margin: 18px 0 0; font-size: clamp(15px,1.4vw,17px);
          line-height: 1.72; color: #6e6e73;
        }

        /* ── The list ────────────────────────────────────────────────────────
           position:relative so the rail can span exactly the rows and nothing
           else — anchoring it to the section instead would have it running past
           the heading and the padding. */
        .bgx-list { position: relative; padding-left: clamp(20px,3vw,42px); }

        .bgx-rail {
          position: absolute; left: 0; top: 0; bottom: 0; width: 1px;
          background: #e8ecf4;
        }
        .bgx-rail span {
          position: absolute; inset: 0; display: block;
          background: #0a89dd;
          transform: scaleY(0); transform-origin: top center;
        }

        .bgx-row {
          position: relative;
          display: grid;
          grid-template-columns: 78px minmax(190px, .82fr) 1.3fr;
          gap: clamp(16px,2.4vw,36px);
          align-items: start;
          padding: clamp(26px,3vw,36px) 0;
          border-top: 1px solid #e8ecf4;
          transition: transform .3s ${EASE};
        }
        .bgx-row:last-child { border-bottom: 1px solid #e8ecf4; }

        /* The tick that marks the hovered row on the rail. Grows out of nothing
           rather than fading, so it reads as a position being marked. */
        .bgx-row::before {
          content: ''; position: absolute;
          left: calc(-1 * clamp(20px,3vw,42px)); top: 50%;
          width: 3px; height: 0; border-radius: 3px;
          background: #0a89dd; transform: translateY(-50%);
          transition: height .3s ${EASE};
        }
        .bgx-row:hover { transform: translateX(6px); }
        .bgx-row:hover::before { height: 58%; }

        .bgx-num {
          font-family: ui-monospace, 'Cascadia Code', 'SF Mono', monospace;
          font-size: clamp(26px,3vw,38px); font-weight: 700;
          line-height: 1; letter-spacing: -.03em;
          color: #dfe4ec; font-variant-numeric: tabular-nums;
          transition: color .3s ${EASE};
        }
        .bgx-row:hover .bgx-num { color: #0a89dd; }

        .bgx-title {
          margin: 0; padding-top: 2px;
          font-size: clamp(17px,1.8vw,21px); font-weight: 700;
          line-height: 1.32; letter-spacing: -.02em; color: #1d1d1f;
        }
        .bgx-desc {
          margin: 0; padding-top: 2px;
          font-size: clamp(14px,1.25vw,15.5px); line-height: 1.78; color: #6e6e73;
        }

        /* ── Narrow ──────────────────────────────────────────────────────────
           The three columns collapse to two: the numeral keeps its gutter, and
           title and description stack in the remaining one. Keeping the numeral
           in its own column is what preserves the index feel at any width. */
        @media (max-width: 860px) {
          .bgx-row { grid-template-columns: 52px 1fr; gap: 14px; }
          .bgx-title { grid-column: 2; }
          .bgx-desc { grid-column: 2; padding-top: 8px; }
          .bgx-num { font-size: 22px; }
          .bgx-row:hover { transform: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bgx-row, .bgx-row::before, .bgx-num { transition: none; }
          .bgx-row:hover { transform: none; }
        }
      `}</style>

      <section className="bgx" id="benefits">
        <div className="bgx-inner">
          <div className="bgx-head" data-reveal>
            <p className="bgx-eyebrow">The index</p>
            <h2 className="bgx-h2">Eleven things that change the week you switch it on.</h2>
            <p className="bgx-sub">
              None of these need a pilot programme to show up. They are the returns
              operators report in the first quarter of running a tracked fleet.
            </p>
          </div>

          <div className="bgx-list" ref={listRef}>
            <span className="bgx-rail" aria-hidden="true">
              <span ref={fillRef} />
            </span>

            {BENEFITS.map((b, i) => (
              <article
                key={b.title}
                className="bgx-row"
                data-reveal
                // Capped stagger: at eleven rows an uncapped ramp would leave the
                // last one waiting two thirds of a second after it is already on
                // screen, which reads as the page failing to load rather than as
                // a sequence.
                data-reveal-delay={String(Math.min(i, 4) * 70)}
              >
                <span className="bgx-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="bgx-title">{b.title}</h3>
                <p className="bgx-desc">{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
