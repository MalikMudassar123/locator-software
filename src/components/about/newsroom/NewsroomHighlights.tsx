import Image from 'next/image'
import { MEDIA_MENTIONS, NEWS_ITEMS, SOCIAL_POSTS } from './newsroom-data'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

const VIDEOS = NEWS_ITEMS.filter((i) => i.category === 'videos').slice(0, 3)
const SOCIAL = SOCIAL_POSTS.slice(0, 3)
const MEDIA = MEDIA_MENTIONS.slice(0, 3)

const NET_COLOR: Record<string, string> = {
  linkedin: '#0b40b8',
  instagram: '#d6336c',
  facebook: '#1877f2',
  x: '#0b1220',
  youtube: '#e63946',
}

export default function NewsroomHighlights() {
  return (
    <>
      <style href="nr-newsroomhighlights" precedence="medium">{`
        .nrx { padding: clamp(44px,6vw,72px) 28px; background: #fff; border-top: 1px solid #eef2f8; }
        .nrx-inner { max-width: var(--w-1240); margin: 0 auto; display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: clamp(20px,3vw,36px); }
        @media (max-width: 1000px) { .nrx-inner { grid-template-columns: 1fr; gap: 36px; } }

        .nrx-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #0b1220; }
        .nrx-head h2 { margin: 0; font-size: var(--f-15-5); font-weight: 800; letter-spacing: -.015em; color: #0b1220; }
        .nrx-head a { font-size: var(--f-12); font-weight: 700; color: #1360ee; text-decoration: none; white-space: nowrap; }
        .nrx-head a:hover { text-decoration: underline; }

        .nrx-list { display: flex; flex-direction: column; gap: 4px; }

        /* ── Video rows ── */
        .nrx-vid { display: grid; grid-template-columns: 116px minmax(0,1fr); gap: 12px; align-items: center; padding: 9px; border-radius: 12px; text-decoration: none; transition: background .18s ${EASE}; }
        .nrx-vid:hover { background: #f6f9fe; }
        .nrx-thumb { position: relative; aspect-ratio: 16 / 10; border-radius: 9px; overflow: hidden; background: #0b1220; }
        .nrx-thumb img { object-fit: cover; opacity: .9; transition: transform .35s ${EASE}, opacity .2s ${EASE}; }
        .nrx-vid:hover .nrx-thumb img { transform: scale(1.07); opacity: 1; }
        .nrx-play { position: absolute; inset: 0; display: grid; place-items: center; }
        .nrx-play span { width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; background: rgba(255,255,255,.92); color: #0b1220; box-shadow: 0 5px 14px rgba(0,0,0,.32); }
        .nrx-dur { position: absolute; left: 6px; bottom: 6px; z-index: 2; font-size: var(--f-9-5); font-weight: 700; color: #fff; background: rgba(0,0,0,.72); padding: 2px 5px; border-radius: 4px; }
        .nrx-vid-title { margin: 0 0 3px; font-size: var(--f-12-5); font-weight: 700; line-height: 1.38; color: #0b1220; letter-spacing: -.01em; }
        .nrx-vid-meta { margin: 0; font-size: var(--f-11); color: #97a1b3; }

        /* ── Social rows ── */
        .nrx-soc { display: grid; grid-template-columns: 116px minmax(0,1fr); gap: 12px; align-items: center; padding: 9px; border-radius: 12px; text-decoration: none; transition: background .18s ${EASE}; }
        .nrx-soc:hover { background: #f6f9fe; }
        .nrx-soc-badge { position: absolute; left: 6px; top: 6px; z-index: 2; width: 20px; height: 20px; border-radius: 6px; display: grid; place-items: center; color: #fff; }
        .nrx-soc-text { margin: 0 0 4px; font-size: var(--f-12); line-height: 1.45; color: #2b3446; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .nrx-soc-cta { font-size: var(--f-11); font-weight: 700; color: #1360ee; }

        /* ── Media rows ── */
        .nrx-media { display: block; padding: 13px 10px; border-radius: 12px; text-decoration: none; border-bottom: 1px solid #f0f3f9; transition: background .18s ${EASE}; }
        .nrx-media:last-child { border-bottom: 0; }
        .nrx-media:hover { background: #f6f9fe; }
        .nrx-media-pub { display: inline-block; font-size: var(--f-10); font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: #475569; border: 1px solid #e2e8f2; padding: 4px 8px; border-radius: 6px; margin-bottom: 9px; }
        .nrx-media-title { margin: 0 0 4px; font-size: var(--f-12-8); font-weight: 700; line-height: 1.42; color: #0b1220; letter-spacing: -.01em; }
        .nrx-media-date { font-size: var(--f-11); color: #97a1b3; }
      `}</style>

      <section className="nrx">
        <div className="nrx-inner">
          <div data-reveal>
            <div className="nrx-head">
              <h2>Customer Review Videos</h2>
              <a href="#newsroom-feed">View All →</a>
            </div>
            <div className="nrx-list">
              {VIDEOS.map((v) => (
                <a key={v.id} href={v.href} className="nrx-vid">
                  <div className="nrx-thumb">
                    <Image src={v.image} alt="" fill sizes="116px" />
                    <span className="nrx-play"><span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5Z" /></svg>
                    </span></span>
                    {v.duration && <span className="nrx-dur">{v.duration}</span>}
                  </div>
                  <div>
                    <p className="nrx-vid-title">{v.title}</p>
                    <p className="nrx-vid-meta">{v.date}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div data-reveal>
            <div className="nrx-head">
              <h2>Live from Social</h2>
              <a href="#newsroom-feed">View All →</a>
            </div>
            <div className="nrx-list">
              {SOCIAL.map((p) => (
                <a key={p.id} href={p.href} className="nrx-soc" target="_blank" rel="noopener noreferrer">
                  <div className="nrx-thumb">
                    <Image src={p.image} alt="" fill sizes="116px" />
                    <span className="nrx-soc-badge" style={{ background: NET_COLOR[p.network] }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="9" />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <p className="nrx-soc-text">{p.text}</p>
                    <span className="nrx-soc-cta">View on {p.network === 'x' ? 'X' : p.network.charAt(0).toUpperCase() + p.network.slice(1)} →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div data-reveal>
            <div className="nrx-head">
              <h2>Media Coverage</h2>
              <a href="#newsroom-feed">View All →</a>
            </div>
            <div className="nrx-list">
              {MEDIA.map((m) => (
                <a key={m.id} href={m.href} className="nrx-media">
                  <span className="nrx-media-pub">{m.publication}</span>
                  <p className="nrx-media-title">{m.title}</p>
                  <span className="nrx-media-date">{m.date}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
