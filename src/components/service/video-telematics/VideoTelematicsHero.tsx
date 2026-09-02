import Image from 'next/image'
import Link from 'next/link'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'

export default function VideoTelematicsHero() {
  return (
    <>
      <style>{`
        @keyframes vtHeroRise {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: none; }
        }

        /* Dashcam-views banner is the section's own full-width background.
           The content that matters here — the fanned camera-view thumbnails —
           sits right at the image's left and right edges, so a cover-fit would
           crop exactly the part that makes this image worth using. contain
           keeps the whole banner in frame at every width instead; the photo's
           own near-white backdrop matches the section's background, so the
           letterboxed space above and below it reads as part of the page
           rather than a visible bar. */
        .vt-pin-wrap { position: relative; background: #ffffff; padding-top: 64px; }
        .vt-pin {
          position: relative;
          /* aspect-ratio matches the banner's own 1774x887 shape, so on any
             screen wide enough that width/2 already clears the floor below,
             the box is exactly the photo's shape — contain then has nothing
             left to letterbox on any edge, top, bottom, left or right. The
             min-height floor only takes over on narrow screens, where the
             copy needs more room than a strict 2:1 box would give it. */
          aspect-ratio: 1774 / 887;
          min-height: clamp(440px, 50vw, 560px);
          display: flex; flex-direction: column;
          overflow: hidden; isolation: isolate; background: #ffffff;
        }
        /* Below this width the min-height floor exceeds the aspect-ratio's
           own height for the viewport's width, and aspect-ratio's cross-axis
           clamping then re-derives width from that taller height instead —
           blowing the box out wider than the viewport. Dropping the ratio
           once the floor takes over avoids that; the image still centers via
           contain, so nothing is cropped. */
        @media (max-width: 900px) {
          .vt-pin { aspect-ratio: auto; }
        }
        .vt-hero-bg {
          position: absolute; inset: 0; z-index: 0;
        }
        .vt-hero-body {
          position: relative; z-index: 2;
          flex: 1 1 auto; min-height: 0;
          display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
          gap: clamp(8px, 1.2vh, 18px);
          padding: 0 24px clamp(40px, 8vh, 80px);
        }
        /* The copy sits over the fanned camera thumbnails, which don't leave
           reliable contrast for plain text at every width. A soft white
           text-shadow lifts each line off the busy background without
           putting a visible card or box behind it. */
        /* A reading measure, not a container — so a flat pixel cap rather than
           a --w-* token. The banner's fanned thumbnails crowd in from both
           edges, and at container width the headline ran right into them; 760px
           keeps every line inside the clear centre of the photo. */
        .vt-copy { text-align: center; max-width: 760px; width: 100%; margin-top: clamp(28px, 3.2vh, 48px); }
        .vt-copy-glow {
          text-shadow:
            0 1px 2px #fff, 0 0 8px #fff, 0 0 16px #fff,
            0 0 28px #fff, 0 0 44px #fff, 0 0 64px #fff;
        }
        /* The negative pull-up above is tuned for desktop's taller banner —
           on a short, narrow viewport it's enough to tuck the heading under
           the fixed navbar, so mobile gets its own clear (positive) offset. */
        @media (max-width: 640px) {
          .vt-copy { margin-top: clamp(18px, 4vh, 32px); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .vt-copy { animation: vtHeroRise .9s cubic-bezier(.22,.61,.36,1) .05s both; }
        }
        .vt-cta-row { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        /* Side-by-side buttons on a narrow phone reach far enough right to sit
           under the fixed WhatsApp/call widget — stacking removes the overlap. */
        @media (max-width: 480px) {
          .vt-cta-row { flex-direction: column; align-items: stretch; }
          .vt-cta-row .vt-btn { justify-content: center; }
        }
        .vt-btn {
          font-family: inherit; font-size: var(--f-14); font-weight: 700; cursor: pointer;
          padding: 12px 24px; border-radius: 999px; border: none;
          transition: .18s cubic-bezier(.22,.61,.36,1);
          display: inline-flex; align-items: center; gap: 7px;
          white-space: nowrap; text-decoration: none;
        }
        .vt-btn-primary { background: #1360ee; color: #fff; }
        .vt-btn-primary:hover { background: #0d4fd4; transform: translateY(-1px); }
        .vt-btn-outline { background: #fff; color: #1360ee; border: 1.5px solid #1360ee; }
        .vt-btn-outline:hover { background: #f0f5ff; transform: translateY(-1px); }
      `}</style>

      <div className="vt-pin-wrap">
        <div className="vt-pin">
          <div className="vt-hero-bg" aria-hidden="true">
            <Image
              src="/service_page/fleet-dashcam-multi-camera-views-hero-bg.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'contain', objectPosition: 'center center' }}
            />
          </div>

          <SoftwareNavbar />

          <div className="vt-hero-body">
            <div className="vt-copy">
              <p className="vt-copy-glow" style={{ display: 'block', fontSize: 'max(clamp(22px,2.8vw,32px), min(2.222vw, 46.4px))', fontWeight: 800, letterSpacing: '.04em', textTransform: 'uppercase', color: '#1360ee', marginBottom: 'clamp(6px,1vh,10px)' }}>
                <span style={{ display: 'block', marginBottom: '6px' }}><span style={{ display: 'inline-block', width: '34px', height: '3px', background: '#1360ee', borderRadius: '2px' }} /></span>
                Video Telematics
              </p>
              <h1 className="vt-copy-glow" style={{ fontSize: 'max(clamp(21px,2.5vw,28px), min(1.944vw, 40.6px))', fontWeight: 800, lineHeight: 1.18, letterSpacing: '-.015em', color: '#1d1d1f', maxWidth: '24ch', margin: '0 auto' }}>
                AI-Powered Fleet Dash Cameras &amp; MDVR Safety Systems
              </h1>
              <p className="vt-copy-glow" style={{ maxWidth: '480px', margin: 'clamp(6px,1vh,10px) auto 0', fontSize: 'max(clamp(13px,1.35vw,16px), min(1.111vw, 23.2px))', lineHeight: 1.5, color: '#3a3a3c' }}>
                Real-time driver monitoring, cargo surveillance, and multi-camera recording for trucks, taxis, buses, and commercial fleets.
              </p>
              <div className="vt-cta-row" style={{ marginTop: 'clamp(10px,1.6vh,18px)' }}>
                <Link href="/get-a-quote" className="vt-btn vt-btn-primary">Get a free quote</Link>
                <Link href="/get-a-free-demo" className="vt-btn vt-btn-outline">Get a demo</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
