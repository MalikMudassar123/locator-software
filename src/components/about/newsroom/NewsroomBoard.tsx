'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import NewsroomRail from './NewsroomRail'
import SocialCard from './SocialCard'
import NewsroomWatch from './NewsroomWatch'
import {
  BLOG_POSTS,
  CATEGORY_COLOR,
  CATEGORY_LABEL,
  MEDIA_MENTIONS,
  NEWS_ITEMS,
  RELEASE_TIMELINE,
  SOCIAL_POSTS,
  TABS,
  UPCOMING_EVENTS,
  type NewsCategory,
  type NewsItem,
  type SocialPost,
} from './newsroom-data'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

type Tab = NewsCategory | 'all'

// Social networks share the standard card shell; only the chip colour/label
// and the byline change, so posts sit in the same 3-up grid as every other tab.
const NET_META: Record<SocialPost['network'], { label: string; color: string }> = {
  linkedin: { label: 'LinkedIn', color: '#0a66c2' },
  instagram: { label: 'Instagram', color: '#d6336c' },
  facebook: { label: 'Facebook', color: '#1877f2' },
  x: { label: 'X', color: '#0b1220' },
  youtube: { label: 'YouTube', color: '#e63946' },
}

function SocialGridCard({ post }: { post: SocialPost }) {
  const net = NET_META[post.network]
  // Use the first line as the headline and the remainder as the excerpt, so a
  // social post reads like the standard image-over-text card.
  const [head, ...rest] = post.text.split('\n').map((l) => l.trim()).filter(Boolean)
  const excerpt = rest.join(' ')
  return (
    <a href={post.href} target="_blank" rel="noopener noreferrer" className="nrb-card nrb-card--social">
      <div className="nrb-card-media">
        <Image src={post.image} alt="" fill sizes="(max-width: 700px) 100vw, 340px" />
        <span className="nrb-chip" style={{ background: net.color }}>{net.label}</span>
      </div>
      <div className="nrb-card-body">
        <span className="nrb-card-date">{post.handle} · {post.time}</span>
        <h3 className="nrb-card-title">{head}</h3>
        {excerpt && <p className="nrb-card-excerpt">{excerpt}</p>}
        <span className="nrb-card-more">View on {net.label} →</span>
      </div>
    </a>
  )
}

function Card({ item, size = 'md' }: { item: NewsItem; size?: 'md' | 'lg' }) {
  const color = CATEGORY_COLOR[item.category]
  return (
    <a href={item.href} className={`nrb-card nrb-card--${size}`}>
      <div className="nrb-card-media">
        <Image
          src={item.image}
          alt=""
          fill
          sizes={size === 'lg' ? '(max-width: 1040px) 100vw, 700px' : '(max-width: 700px) 100vw, 340px'}
        />
        <span className="nrb-chip" style={{ background: color }}>
          {item.tag || CATEGORY_LABEL[item.category]}
        </span>
        {item.duration && (
          <>
            <span className="nrb-card-play">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5Z" /></svg>
            </span>
            <span className="nrb-card-dur">{item.duration}</span>
          </>
        )}
      </div>
      <div className="nrb-card-body">
        <span className="nrb-card-date">{item.date}</span>
        <h3 className="nrb-card-title">{item.title}</h3>
        <p className="nrb-card-excerpt">{item.excerpt}</p>
        <span className="nrb-card-more">Read More →</span>
      </div>
    </a>
  )
}

export default function NewsroomBoard() {
  const [tab, setTab] = useState<Tab>('all')

  // Blog lives in its own array (it is editorial, not news), so the pool the
  // filter runs over depends on which tab is active.
  const pool = useMemo(() => {
    if (tab === 'blog') return BLOG_POSTS
    if (tab === 'all') return NEWS_ITEMS
    return NEWS_ITEMS.filter((i) => i.category === tab)
  }, [tab])

  const featured = NEWS_ITEMS.find((i) => i.featured) ?? NEWS_ITEMS[0]
  const highlights = NEWS_ITEMS.filter((i) => !i.featured).slice(0, 3)

  return (
    <section id="newsroom-feed" className="nrb">
      <style href="nr-newsroomboard" precedence="medium">{`
        /* overflow-x: clip (not hidden) — it contains stray horizontal overflow
           without creating a scroll container, so the sticky rail still works. */
        .nrb { padding: clamp(28px,4vw,44px) 28px clamp(56px,7vw,88px); background: #f7f9fc; scroll-margin-top: 80px; overflow-x: clip; }
        .nrb-inner { max-width: var(--w-1240); margin: 0 auto; }

        /* ── Tab bar ── */
        .nrb-tabs {
          display: flex; gap: 6px; overflow-x: auto; padding: 6px;
          background: #fff; border: 1px solid #e7ecf6; border-radius: 14px;
          margin-bottom: clamp(20px,2.6vw,28px);
          scrollbar-width: none;
        }
        .nrb-tabs::-webkit-scrollbar { display: none; }
        .nrb-tab {
          flex-shrink: 0; border: 0; cursor: pointer; font-family: inherit;
          padding: 10px 16px; border-radius: 10px; background: transparent;
          font-size: 13px; font-weight: 650; color: #5b6474; white-space: nowrap;
          transition: background .18s ${EASE}, color .18s ${EASE};
        }
        .nrb-tab:hover { background: #f2f6fd; color: #16233a; }
        .nrb-tab[aria-selected='true'] { background: #1360ee; color: #fff; box-shadow: 0 8px 18px -8px rgba(19,96,238,.75); }

        /* ── Two-column shell ── */
        /* Fluid rail so it narrows instead of dropping the moment the viewport
           dips under a desktop width — it only stacks below on real tablets. */
        .nrb-cols { display: grid; grid-template-columns: minmax(0,1fr) clamp(268px,25vw,328px); gap: clamp(16px,2.4vw,26px); align-items: start; }
        @media (max-width: 820px) { .nrb-cols { grid-template-columns: 1fr; } }

        .nrb-main { display: flex; flex-direction: column; gap: clamp(18px,2.4vw,26px); min-width: 0; }

        /* Tab panels mount after ScrollReveal has already scanned the DOM, so
           they animate themselves via a keyed remount rather than [data-reveal]
           (which would leave them stuck at opacity 0). */
        .nrb-swap { display: flex; flex-direction: column; gap: clamp(18px,2.4vw,26px); animation: nrb-in .42s ${EASE} both; }
        @keyframes nrb-in { from { opacity: 0; transform: translateY(14px); } }
        @media (prefers-reduced-motion: reduce) { .nrb-swap { animation: none; } }

        /* ── Cards ── */
        .nrb-card {
          display: flex; flex-direction: column; overflow: hidden; text-decoration: none;
          background: #fff; border: 1px solid #e7ecf6; border-radius: 16px;
          transition: transform .22s ${EASE}, box-shadow .22s ${EASE}, border-color .22s ${EASE};
        }
        .nrb-card:hover { transform: translateY(-3px); border-color: #d5e0f5; box-shadow: 0 18px 40px -20px rgba(11,18,32,.35); }
        .nrb-card-media { position: relative; aspect-ratio: 16 / 10; background: #0b1220; overflow: hidden; }
        .nrb-card-media img { object-fit: cover; transition: transform .4s ${EASE}; }
        .nrb-card:hover .nrb-card-media img { transform: scale(1.05); }
        .nrb-card--lg .nrb-card-media { aspect-ratio: 16 / 8.2; }

        .nrb-chip {
          position: absolute; left: 12px; top: 12px; z-index: 2;
          font-size: 9.5px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase;
          color: #fff; padding: 5px 9px; border-radius: 6px;
        }
        .nrb-card-play {
          position: absolute; inset: 0; margin: auto; z-index: 2;
          width: 46px; height: 46px; border-radius: 50%; display: grid; place-items: center;
          background: rgba(255,255,255,.92); color: #0b1220; box-shadow: 0 8px 22px rgba(0,0,0,.35);
          transition: transform .22s ${EASE};
        }
        .nrb-card:hover .nrb-card-play { transform: scale(1.08); }
        .nrb-card-dur {
          position: absolute; right: 10px; bottom: 10px; z-index: 2;
          font-size: 10.5px; font-weight: 700; color: #fff;
          background: rgba(0,0,0,.72); padding: 3px 7px; border-radius: 5px;
        }

        .nrb-card-body { padding: 16px 16px 18px; display: flex; flex-direction: column; flex: 1; }
        .nrb-card--lg .nrb-card-body { padding: 22px clamp(20px,2.4vw,28px) 26px; }
        .nrb-card-date { font-size: 11.5px; color: #97a1b3; margin-bottom: 8px; }
        .nrb-card-title { margin: 0 0 8px; font-size: 15px; font-weight: 780; line-height: 1.32; letter-spacing: -.015em; color: #0b1220; }
        .nrb-card--lg .nrb-card-title { font-size: clamp(20px,2.4vw,30px); line-height: 1.18; letter-spacing: -.025em; }
        .nrb-card-excerpt { margin: 0 0 14px; font-size: 12.8px; line-height: 1.6; color: #6b7484; flex: 1; }
        .nrb-card--lg .nrb-card-excerpt { font-size: clamp(13.5px,1.2vw,15px); line-height: 1.7; max-width: 62ch; }
        /* Social posts run long and vary wildly in length. Scoped rules give
           every social card the same tidy body: a 2-line headline and a 3-line
           excerpt, both reserved (min-height) so cards line up and short posts
           don't leave a half-empty box. The excerpt must NOT be a flex-grow
           child or -webkit-line-clamp silently stops truncating — so it's
           fixed-size and the CTA is pinned to the bottom with margin-top:auto. */
        .nrb-card--social .nrb-card-title {
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
          min-height: calc(1.32em * 2);
        }
        .nrb-card--social .nrb-card-excerpt {
          flex: 0 0 auto;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
          min-height: calc(1.6em * 3);
        }
        .nrb-card--social .nrb-card-more { margin-top: auto; }
        .nrb-card-more { font-size: 12.5px; font-weight: 700; color: #1360ee; }
        .nrb-card:hover .nrb-card-more { text-decoration: underline; }

        /* ── Featured (dark treatment, text over the photo) ── */
        .nrb-hero-card {
          position: relative; display: block; text-decoration: none; overflow: hidden;
          border-radius: 18px; border: 1px solid #e7ecf6; background: #0b1220;
          min-height: clamp(320px,38vw,420px);
          transition: transform .22s ${EASE}, box-shadow .22s ${EASE};
        }
        .nrb-hero-card:hover { transform: translateY(-3px); box-shadow: 0 24px 50px -22px rgba(11,18,32,.5); }
        .nrb-hero-card img { object-fit: cover; transition: transform .5s ${EASE}; }
        .nrb-hero-card:hover img { transform: scale(1.04); }
        .nrb-hero-scrim {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(75deg, rgba(6,11,22,.95) 0%, rgba(6,11,22,.8) 42%, rgba(6,11,22,.25) 78%, rgba(6,11,22,.1) 100%);
        }
        .nrb-hero-content { position: relative; z-index: 2; padding: clamp(22px,3.2vw,40px); max-width: 640px; }
        .nrb-hero-chip {
          display: inline-block; font-size: 9.5px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase;
          color: #fff; background: #1360ee; padding: 5px 10px; border-radius: 6px; margin-bottom: 16px;
        }
        .nrb-hero-date { display: block; font-size: 11.5px; color: rgba(255,255,255,.6); margin-bottom: 10px; }
        .nrb-hero-title { margin: 0 0 12px; font-size: clamp(22px,3vw,38px); font-weight: 800; line-height: 1.14; letter-spacing: -.028em; color: #fff; }
        .nrb-hero-excerpt { margin: 0 0 20px; font-size: clamp(13px,1.2vw,15px); line-height: 1.7; color: rgba(255,255,255,.74); max-width: 52ch; }
        .nrb-hero-more { font-size: 13px; font-weight: 700; color: #7fb0ff; }
        .nrb-hero-card:hover .nrb-hero-more { text-decoration: underline; }

        /* ── Grids ── */
        .nrb-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: clamp(14px,1.8vw,20px); }
        /* Breakpoints account for the rail eating ~300px, so they fire earlier
           than the raw viewport width would suggest. */
        @media (max-width: 1100px) { .nrb-grid { grid-template-columns: repeat(2, minmax(0,1fr)); } }
        @media (max-width: 560px) { .nrb-grid { grid-template-columns: 1fr; } }

        /* ── Panels (timeline + events) ── */
        /* minmax(0,…) rather than bare fr: the timeline's nowrap "Read More"
           column would otherwise set a min-content floor that widens the panel
           past the main column and scrolls the rail off-screen. */
        .nrb-panels { display: grid; grid-template-columns: minmax(0,1.35fr) minmax(0,1fr); gap: clamp(14px,1.8vw,20px); }
        @media (max-width: 1080px) { .nrb-panels { grid-template-columns: 1fr; } }

        .nrb-panel { background: #fff; border: 1px solid #e7ecf6; border-radius: 16px; padding: 18px 18px 20px; }
        .nrb-panel-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
        .nrb-panel-head h3 { margin: 0; font-size: 15px; font-weight: 800; letter-spacing: -.015em; color: #0b1220; }
        .nrb-panel-head a { font-size: 12px; font-weight: 700; color: #1360ee; text-decoration: none; }
        .nrb-panel-head a:hover { text-decoration: underline; }

        .nrb-tl { display: flex; flex-direction: column; }
        .nrb-tl-row {
          display: grid; grid-template-columns: minmax(64px,78px) minmax(0,1fr) minmax(0,auto); gap: 12px; align-items: center;
          padding: 13px 8px; border-radius: 10px; text-decoration: none;
          border-bottom: 1px solid #f0f3f9;
          transition: background .18s ${EASE};
        }
        .nrb-tl-row:last-child { border-bottom: 0; }
        .nrb-tl-row:hover { background: #f6f9fe; }
        .nrb-tl-ver { display: flex; flex-direction: column; gap: 4px; }
        .nrb-tl-ver b {
          display: inline-block; font-size: 11px; font-weight: 800; color: #1360ee;
          background: rgba(19,96,238,.1); padding: 4px 8px; border-radius: 6px; width: fit-content;
        }
        .nrb-tl-ver span { font-size: 10.5px; color: #a7b0c0; }
        .nrb-tl-latest {
          font-size: 8.5px; font-weight: 800; letter-spacing: .09em; text-transform: uppercase;
          color: #22a06b; background: rgba(34,160,107,.12); padding: 3px 6px; border-radius: 5px; width: fit-content;
        }
        .nrb-tl-title { margin: 0 0 3px; font-size: 13.5px; font-weight: 750; color: #0b1220; letter-spacing: -.01em; }
        .nrb-tl-body { margin: 0; font-size: 12px; color: #7a8394; line-height: 1.5; }
        .nrb-tl-link { font-size: 12px; font-weight: 700; color: #1360ee; white-space: nowrap; }

        .nrb-ev { display: flex; flex-direction: column; gap: 10px; }
        .nrb-ev-row {
          display: grid; grid-template-columns: 48px minmax(0,1fr) minmax(0,auto); gap: 12px; align-items: center;
          padding: 11px; border-radius: 12px; border: 1px solid #eef2f8; background: #fbfcfe;
          transition: border-color .18s ${EASE}, background .18s ${EASE};
        }
        .nrb-ev-row:hover { border-color: #cfdcf5; background: #fff; }
        .nrb-ev-date {
          display: grid; place-items: center; padding: 7px 0; border-radius: 9px;
          background: #0b1220; color: #fff; line-height: 1;
        }
        .nrb-ev-date b { font-size: 16px; font-weight: 800; }
        .nrb-ev-date span { font-size: 9px; font-weight: 700; letter-spacing: .09em; margin-top: 3px; color: rgba(255,255,255,.65); }
        .nrb-ev-title { margin: 0 0 3px; font-size: 13px; font-weight: 750; color: #0b1220; letter-spacing: -.01em; }
        .nrb-ev-meta { margin: 0; font-size: 11.5px; color: #8b93a3; }
        .nrb-ev-cta {
          font-size: 11.5px; font-weight: 700; color: #1360ee; text-decoration: none;
          border: 1.5px solid #cfdcf5; padding: 7px 13px; border-radius: 8px; white-space: nowrap;
          transition: background .18s ${EASE}, border-color .18s ${EASE}, color .18s ${EASE};
        }
        .nrb-ev-cta:hover { background: #1360ee; border-color: #1360ee; color: #fff; }

        /* ── Social feed: one narrow column, like a real timeline. Sits below
           the highlights grid, so it's left-aligned with a divider above. ── */
        .nrb-feed { display: flex; flex-direction: column; gap: 12px; max-width: 620px; width: 100%; margin-top: clamp(18px,2.4vw,26px); padding-top: clamp(18px,2.4vw,26px); border-top: 1px solid #e7ecf6; }
        @media (max-width: 1080px) { .nrb-feed { max-width: 100%; } }
        .nrb-feed-note {
          display: flex; align-items: center; gap: 8px; margin: 0 0 2px;
          font-size: 12.5px; color: #8b93a3;
        }
        .nrb-feed-note i { width: 7px; height: 7px; border-radius: 50%; background: #22a06b; }

        /* Videos gets a YouTube watch layout that owns both columns, so the
           Live Updates rail steps aside for the playlist rail. */
        .nrb-watch { animation: nrb-in .42s ${EASE} both; }
        @media (prefers-reduced-motion: reduce) { .nrb-watch { animation: none; } }

        /* ── Media coverage list ── */
        .nrb-media { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: clamp(12px,1.6vw,18px); }
        @media (max-width: 900px) { .nrb-media { grid-template-columns: 1fr; } }
        .nrb-media-row {
          display: block; padding: 18px; border-radius: 14px; text-decoration: none;
          background: #fff; border: 1px solid #e7ecf6;
          transition: transform .2s ${EASE}, border-color .2s ${EASE}, box-shadow .2s ${EASE};
        }
        .nrb-media-row:hover { transform: translateY(-2px); border-color: #d5e0f5; box-shadow: 0 14px 32px -18px rgba(11,18,32,.35); }
        .nrb-media-pub {
          display: inline-block; font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase;
          color: #475569; border: 1px solid #e2e8f2; padding: 6px 11px; border-radius: 7px; margin-bottom: 13px;
        }
        .nrb-media-title { margin: 0 0 8px; font-size: 15px; font-weight: 750; line-height: 1.4; letter-spacing: -.015em; color: #0b1220; }
        .nrb-media-date { font-size: 11.5px; color: #97a1b3; }

        .nrb-empty {
          padding: 56px 20px; text-align: center; color: #8b93a3; font-size: 14px;
          background: #fff; border: 1px dashed #dbe3f0; border-radius: 16px;
        }

        .nrb-section-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .nrb-section-head h2 { margin: 0; font-size: clamp(17px,1.9vw,22px); font-weight: 800; letter-spacing: -.02em; color: #0b1220; }
      `}</style>

      <div className="nrb-inner">
        <div className="nrb-tabs" role="tablist" aria-label="Newsroom categories">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={tab === t.id}
              className="nrb-tab"
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'videos' ? (
          <div className="nrb-watch">
            <NewsroomWatch />
          </div>
        ) : (
        <div className="nrb-cols">
          <div className="nrb-main">
            <div className="nrb-swap" key={tab}>
            {tab === 'all' && (
              <>
                <a href={featured.href} className="nrb-hero-card">
                  <Image src={featured.image} alt="" fill priority sizes="(max-width: 1040px) 100vw, 880px" />
                  <div className="nrb-hero-scrim" />
                  <div className="nrb-hero-content">
                    <span className="nrb-hero-chip">Featured Story</span>
                    <span className="nrb-hero-date">{featured.date}</span>
                    <h2 className="nrb-hero-title">{featured.title}</h2>
                    <p className="nrb-hero-excerpt">{featured.excerpt}</p>
                    <span className="nrb-hero-more">Read Full Story →</span>
                  </div>
                </a>

                <div className="nrb-grid">
                  {highlights.map((item) => (
                    <Card key={item.id} item={item} />
                  ))}
                </div>

                <div className="nrb-panels">
                  <div className="nrb-panel">
                    <div className="nrb-panel-head">
                      <h3>Latest Product Updates</h3>
                      <button type="button" style={{ all: 'unset', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#1360ee' }} onClick={() => setTab('product')}>
                        View All →
                      </button>
                    </div>
                    <div className="nrb-tl">
                      {RELEASE_TIMELINE.map((r) => (
                        <a key={r.version} href={r.href} className="nrb-tl-row">
                          <div className="nrb-tl-ver">
                            <b>{r.version}</b>
                            {r.latest && <span className="nrb-tl-latest">Latest</span>}
                            <span>{r.date}</span>
                          </div>
                          <div>
                            <p className="nrb-tl-title">{r.title}</p>
                            <p className="nrb-tl-body">{r.body}</p>
                          </div>
                          <span className="nrb-tl-link">Read More →</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="nrb-panel">
                    <div className="nrb-panel-head">
                      <h3>Upcoming Events</h3>
                      <button type="button" style={{ all: 'unset', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#1360ee' }} onClick={() => setTab('events')}>
                        View All →
                      </button>
                    </div>
                    <div className="nrb-ev">
                      {UPCOMING_EVENTS.map((e) => (
                        <div key={e.title} className="nrb-ev-row">
                          <div className="nrb-ev-date">
                            <b>{e.day}</b>
                            <span>{e.month}</span>
                          </div>
                          <div>
                            <p className="nrb-ev-title">{e.title}</p>
                            <p className="nrb-ev-meta">{e.meta}</p>
                          </div>
                          <a href={e.href} className="nrb-ev-cta">{e.cta}</a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {tab === 'social' && (
              <>
                <p className="nrb-feed-note">
                  <i />
                  Latest posts from Locator across LinkedIn, Instagram, Facebook, X, and YouTube
                </p>
                {/* Highlights: three compact cards across the top. */}
                <div className="nrb-grid">
                  {SOCIAL_POSTS.slice(0, 3).map((p) => (
                    <SocialGridCard key={p.id} post={p} />
                  ))}
                </div>
                {/* Full LinkedIn-style feed below the highlights. */}
                <div className="nrb-feed">
                  {SOCIAL_POSTS.slice(3).map((p) => (
                    <SocialCard key={p.id} post={p} />
                  ))}
                </div>
              </>
            )}

            {tab === 'media' && (
              <div className="nrb-media">
                {MEDIA_MENTIONS.map((m) => (
                  <a key={m.id} href={m.href} target="_blank" rel="noopener noreferrer" className="nrb-card">
                    <div className="nrb-card-media">
                      <Image src={m.image} alt="" fill sizes="(max-width: 700px) 100vw, 400px" />
                      <span className="nrb-chip" style={{ background: '#475569' }}>{m.publication}</span>
                    </div>
                    <div className="nrb-card-body">
                      <span className="nrb-card-date">{m.date}</span>
                      <h3 className="nrb-card-title">{m.title}</h3>
                      <span className="nrb-card-more">Read Article →</span>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {tab !== 'all' && tab !== 'social' && tab !== 'media' && (
              pool.length === 0 ? (
                <p className="nrb-empty">Nothing published in this category yet — check back soon.</p>
              ) : (
                <div className="nrb-grid">
                  {pool.map((item) => (
                    <Card key={item.id} item={item} />
                  ))}
                </div>
              )
            )}
            </div>
          </div>

          <NewsroomRail />
        </div>
        )}
      </div>
    </section>
  )
}
