'use client'

import { useState } from 'react'

const YOUTUBE_ID = 'hwqB52vVUig' // "LOCATOR - Effective Vehicle Tracking System." — LOCATOR Media

export default function WhoWeAreVideo() {
  const [playing, setPlaying] = useState(false)

  return (
    <section style={{ padding: 'clamp(56px,7vw,92px) 28px', background: '#f7f9fc' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div data-reveal style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto clamp(36px,5vw,48px)' }}>
          <span style={{ display: 'block', fontSize: 'clamp(22px,2.8vw,32px)', fontWeight: 800, letterSpacing: '.04em', color: '#1360ee', textTransform: 'uppercase', marginBottom: '16px' }}>
            <span style={{ display: 'block', marginBottom: '12px' }}><span style={{ display: 'inline-block', width: '34px', height: '3px', background: '#1360ee', borderRadius: '2px' }} /></span>
            Discover LOCATOR
          </span>
          <h2 style={{ margin: 0, fontSize: 'clamp(19px,2.2vw,26px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-.015em', color: '#1d1d1f' }}>
            See how LOCATOR is transforming fleet management
          </h2>
          <p style={{ margin: '16px auto 0', fontSize: 'clamp(14px,1.35vw,16px)', color: '#6e6e73', lineHeight: 1.65 }}>
            Experience how intelligent telematics, AI-powered technologies, and connected mobility solutions help businesses operate more efficiently, safely, and intelligently.
          </p>
        </div>

        <div data-reveal style={{
          position: 'relative', borderRadius: '16px', overflow: 'hidden',
          aspectRatio: '16 / 9', background: '#0f1117',
          boxShadow: '0 20px 50px -20px rgba(15,23,42,.35)',
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
              <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(15,17,23,.28)' }}>
                <span style={{ width: 72, height: 72, borderRadius: '50%', background: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,.3)' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="#1360ee" style={{ marginLeft: 3 }}>
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
