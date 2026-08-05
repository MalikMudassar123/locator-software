'use client'

import { useState } from 'react'

const YOUTUBE_ID = 'hwqB52vVUig' // "LOCATOR - Effective Vehicle Tracking System." — LOCATOR Media

export default function ServiceVideo() {
  const [playing, setPlaying] = useState(false)

  return (
    <section style={{ padding: 'clamp(56px,7vw,88px) 28px', background: '#fff' }}>
      <div style={{ maxWidth: 'var(--w-960)', margin: '0 auto' }}>
        <div data-reveal style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto clamp(32px,4vw,44px)' }}>
          <span style={{ fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 800, letterSpacing: '.04em', color: '#1360ee', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            <span style={{ display: 'block', marginBottom: '12px' }}><span style={{ display: 'inline-block', width: '34px', height: '3px', background: '#1360ee', borderRadius: '2px' }} /></span>
            See it in action
          </span>
          <h2 style={{ margin: 0, fontSize: 'clamp(19px,2.2vw,26px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.015em', color: '#1d1d1f' }}>
            Watch LOCATOR fleet telematics at work
          </h2>
          <p style={{ margin: '16px auto 0', fontSize: 'clamp(14px,1.35vw,16px)', color: '#6e6e73', lineHeight: 1.6 }}>
            A quick look at how real-time tracking, reporting, and alerts keep UAE fleets running smarter.
          </p>
        </div>

        <div data-reveal="zoom" style={{
          position: 'relative', borderRadius: '18px', overflow: 'hidden',
          aspectRatio: '16 / 9', background: '#0f1117',
          boxShadow: '0 30px 60px -26px rgba(15,23,42,.4)',
        }}>
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1`}
              title="LOCATOR - Effective Vehicle Tracking System"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              aria-label="Play video: LOCATOR - Effective Vehicle Tracking System"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', cursor: 'pointer', background: 'none', padding: 0 }}
            >
              <img
                src={`https://i.ytimg.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
                alt=""
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(15,17,23,.3)' }}>
                <span style={{ width: 78, height: 78, borderRadius: '50%', background: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,.35)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#1360ee" style={{ marginLeft: 3 }}>
                    <polygon points="6 3 20 12 6 21" />
                  </svg>
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
