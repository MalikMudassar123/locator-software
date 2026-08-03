import Image from 'next/image'
import Link from 'next/link'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'

export default function ContactHero() {
  return (
    <>
      <style href="ct-contacthero" precedence="medium">{`
        .cth { background: #fff; }

        /* Photo band — same banner used on the Newsroom hero. Its dark left
           third is what makes the headline legible without a heavy overlay. */
        .cth-photo { position: relative; overflow: hidden; height: clamp(300px, 34vw, 440px); }
        .cth-photo img { object-fit: cover; object-position: 62% center; }
        .cth-scrim {
          position: absolute; inset: 0; z-index: 1;
          background:
            linear-gradient(90deg, rgba(4,8,18,.92) 0%, rgba(4,8,18,.78) 34%, rgba(4,8,18,.34) 62%, transparent 88%),
            linear-gradient(0deg, rgba(4,8,18,.6) 0%, transparent 42%);
        }

        .cth-body {
          position: relative; z-index: 2; height: 100%;
          display: flex; flex-direction: column; justify-content: center;
          max-width: 1280px; margin: 0 auto; padding: clamp(24px,3vw,40px) 28px;
        }
        .cth-content { max-width: min(560px, 92vw); }

        .cth-eyebrow {
          display: block;
          font-size: clamp(11px,1vw,13px); font-weight: 800; letter-spacing: .18em; text-transform: uppercase;
          color: #4d94ff; margin-bottom: clamp(10px,1.4vw,16px);
        }

        .cth-title {
          margin: 0; font-size: clamp(34px,5.4vw,60px); font-weight: 800;
          line-height: 1.05; letter-spacing: -.03em; color: #fff;
          text-shadow: 0 2px 4px rgba(0,0,0,.4), 0 10px 36px rgba(0,0,0,.35);
        }

        .cth-lead {
          margin: clamp(12px,1.6vw,18px) 0 0; max-width: 44ch;
          font-size: clamp(14px,1.2vw,16px); line-height: 1.7; color: rgba(255,255,255,.82);
        }

        /* Breadcrumb sits inside the banner, under the copy. */
        .cth-crumbs {
          display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
          margin-top: clamp(20px,3vw,34px);
          font-size: 13.5px; color: rgba(255,255,255,.55);
        }
        .cth-crumbs a { color: rgba(255,255,255,.85); font-weight: 600; text-decoration: none; transition: color .18s ease; }
        .cth-crumbs a:hover { color: #fff; }
        .cth-crumbs .cur { color: #4d94ff; font-weight: 700; }

        /* On phones the truck sits centre-frame, so pull focus back to the
           left of the image and let the copy breathe. */
        @media (max-width: 640px) {
          .cth-photo { height: clamp(320px, 78vw, 400px); }
          .cth-photo img { object-position: 72% center; }
          .cth-scrim { background: linear-gradient(0deg, rgba(4,8,18,.94) 0%, rgba(4,8,18,.8) 45%, rgba(4,8,18,.55) 100%); }
          .cth-body { padding: 24px 20px; }
          .cth-lead { max-width: 100%; }
        }
      `}</style>

      <section className="cth">
        <SoftwareNavbar />

        <div className="cth-photo">
          <Image src="/Newsroom banner.webp" alt="Contact Locator" fill priority sizes="100vw" />
          <div className="cth-scrim" />
          <div className="cth-body">
            <div className="cth-content">
              <span className="cth-eyebrow">Get in touch</span>
              <h1 className="cth-title">Contact Us</h1>
              <p className="cth-lead">
                We&rsquo;re here to help your business move smarter. Reach out to our team for sales,
                support, partnerships or any other inquiries.
              </p>
              <nav className="cth-crumbs" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <span className="cur">Contact Us</span>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
