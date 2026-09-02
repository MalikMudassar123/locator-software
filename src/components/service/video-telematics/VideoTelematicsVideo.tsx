'use client'

import { useState } from 'react'
import {
  LOCATOR_VIDEO_ALLOW,
  LOCATOR_VIDEO_POSTER,
  LOCATOR_VIDEO_TITLE,
  locatorVideoEmbed,
} from '@/components/locator-video'

export default function VideoTelematicsVideo() {
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)

  return (
    <section style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#f5f7fa' }}>
      {/* DNS + TLS to Vimeo done while the viewer is still scrolling, so the
          click itself only pays for the player download. */}
      <link rel="preconnect" href="https://player.vimeo.com" />
      <link rel="preconnect" href="https://f.vimeocdn.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://i.vimeocdn.com" />
      <div data-reveal style={{ maxWidth: 'var(--w-900)', margin: '0 auto' }}>
        <div
          onClick={playing ? undefined : () => setPlaying(true)}
          style={{
            position: 'relative', borderRadius: '16px', overflow: 'hidden',
            aspectRatio: '16 / 9', background: '#0f1117',
            boxShadow: '0 20px 50px -20px rgba(15,23,42,.35)',
            cursor: playing ? 'default' : 'pointer',
          }}
        >
          {/* The still stays under the frame and only fades once the player
              reports it has loaded — otherwise the embed is a blank pane for
              the second or so Vimeo takes to boot. */}
          <img
            src={LOCATOR_VIDEO_POSTER}
            alt=""
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', zIndex: 1, pointerEvents: 'none',
              opacity: ready ? 0 : 1, transition: 'opacity .45s ease .25s',
            }}
          />

          {playing && (
            <iframe
              src={locatorVideoEmbed()}
              title={LOCATOR_VIDEO_TITLE}
              allow={LOCATOR_VIDEO_ALLOW}
              allowFullScreen
              onLoad={() => setReady(true)}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, zIndex: 2 }}
            />
          )}

          {!playing && (
            <button
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${LOCATOR_VIDEO_TITLE}`}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                border: 'none', cursor: 'pointer', background: 'rgba(15,17,23,.28)',
                padding: 0, zIndex: 3, display: 'grid', placeItems: 'center',
              }}
            >
              <span style={{
                width: 72, height: 72, borderRadius: '50%',
                background: '#fff', display: 'grid', placeItems: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,.3)',
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#1360ee" style={{ marginLeft: 3 }}>
                  <polygon points="6 3 20 12 6 21" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
