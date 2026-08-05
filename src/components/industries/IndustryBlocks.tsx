import Image from 'next/image'
import type { Industry, IndustryBlock } from './industries-data'

function Block({ block, image, flip, shaded }: { block: IndustryBlock; image: string; flip: boolean; shaded: boolean }) {
  return (
    <section className="ixb-sec" style={shaded ? { background: '#f7f9fc' } : undefined}>
      <div className={`ixb-grid${flip ? ' flip' : ''}`}>
        <div className="ixb-text" data-reveal={flip ? 'right' : 'left'}>
          <h2 className="ixb-h2">{block.title}</h2>
          <p className="ixb-sub">{block.subtitle}</p>
          {block.desc.map((p, i) => (
            <p key={i} className="ixb-desc">{p}</p>
          ))}
          <p className="ixb-features-label">{block.featuresLabel}</p>
          <ul className="ixb-features">
            {block.features.map((f) => (
              <li key={f}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="ixb-viz" data-reveal={flip ? 'left' : 'right'}>
          <div className="ixb-frame">
            <Image src={image} alt="" fill sizes="(max-width: 1080px) 90vw, 480px" style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function IndustryBlocks({ industry }: { industry: Industry }) {
  return (
    <>
      <style>{`
        .ixb-sec { padding: clamp(40px,5vw,76px) 28px; border-top: 1px solid #f0f0f3; }

        .ixb-grid {
          max-width: var(--w-1280); margin: 0 auto;
          display: grid; grid-template-columns: minmax(280px,1fr) minmax(280px,1fr);
          gap: clamp(28px,3.4vw,56px); align-items: center;
        }
        .ixb-grid.flip { grid-template-columns: minmax(280px,1fr) minmax(280px,1fr); }
        .ixb-grid.flip .ixb-text { order: 2; }
        .ixb-grid.flip .ixb-viz { order: 1; }

        .ixb-text { text-align: left; }
        .ixb-h2 { margin: 0; font-size: clamp(26px,3vw,38px); font-weight: 800; line-height: 1.14; letter-spacing: -.025em; color: #1d1d1f; max-width: 18ch; }
        .ixb-sub { margin: 12px 0 0; font-size: clamp(16px,1.6vw,19px); font-weight: 700; letter-spacing: -.01em; color: #1360ee; }
        .ixb-desc { margin: 18px 0 0; font-size: clamp(14px,1.35vw,15.5px); line-height: 1.72; color: #6e6e73; max-width: 52ch; }

        .ixb-features-label { margin: 22px 0 0; font-size: 11.5px; font-weight: 700; letter-spacing: .06em; color: #1d1d1f; text-transform: uppercase; }
        .ixb-features { margin: 14px 0 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .ixb-features li { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; line-height: 1.5; color: #3a3a3c; }
        .ixb-features svg { flex-shrink: 0; margin-top: 2px; color: #1360ee; }

        .ixb-viz { min-width: 0; max-width: 480px; width: 100%; }
        .ixb-grid .ixb-viz { justify-self: end; }
        .ixb-grid.flip .ixb-viz { justify-self: start; }
        .ixb-frame {
          position: relative; aspect-ratio: 4 / 3; width: 100%;
          border-radius: 18px; overflow: hidden; border: 1px solid #e4e4e8;
          box-shadow: 0 24px 54px -26px rgba(20,40,90,.24), 0 4px 14px rgba(20,40,90,.06);
          background: #eef3fb;
        }

        @media (max-width: 1080px) {
          .ixb-grid, .ixb-grid.flip { grid-template-columns: 1fr; gap: clamp(22px,4vw,34px); }
          .ixb-grid.flip .ixb-text { order: 0; }
          .ixb-grid.flip .ixb-viz { order: 0; }
          .ixb-text { text-align: center; max-width: 760px; margin: 0 auto; }
          .ixb-h2 { max-width: 24ch; margin-left: auto; margin-right: auto; }
          .ixb-desc { margin-left: auto; margin-right: auto; }
          .ixb-features { align-items: center; }
          .ixb-features li { max-width: 52ch; }
          .ixb-viz, .ixb-grid.flip .ixb-viz { justify-self: center; max-width: 480px; margin: 0 auto; }
        }
      `}</style>

      <Block block={industry.block1} image={industry.image} flip={false} shaded={false} />
      <Block block={industry.block2} image={industry.image} flip={true} shaded={true} />
    </>
  )
}
