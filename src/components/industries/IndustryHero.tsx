import Image from 'next/image'
import Link from 'next/link'
import SoftwareNavbar from '@/components/software/SoftwareNavbar'
import type { Industry } from './industries-data'

export default function IndustryHero({ industry }: { industry: Industry }) {
  return (
    <>
      <style>{`
        .ixh-hero { background: #fff; }

        .ixh-crumbs-bar { border-bottom: 1px solid #eef1f7; }
        .ixh-crumbs {
          display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
          max-width: 1280px; margin: 0 auto; padding: 16px 28px;
          font-size: 14px; color: #6e6e73;
        }
        .ixh-crumbs a { color: #1d1d1f; font-weight: 600; text-decoration: none; transition: color .18s ease; }
        .ixh-crumbs a:hover { color: #1360ee; }
        .ixh-crumbs svg { color: #b8bcc4; flex-shrink: 0; }
        .ixh-crumbs .cur { color: #8e8e93; }

        .ixh-photo { position: relative; overflow: hidden; height: clamp(260px, 34vw, 400px); }
        .ixh-photo img { object-fit: cover; }
        .ixh-scrim {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(0deg, rgba(4,8,18,.9) 0%, rgba(4,8,18,.52) 42%, rgba(4,8,18,.18) 68%, rgba(4,8,18,.05) 100%);
        }

        .ixh-photo-body {
          position: relative; z-index: 2; height: 100%;
          display: flex; align-items: flex-end;
          max-width: 1280px; margin: 0 auto; padding: 0 28px clamp(26px,4vw,46px);
        }
        .ixh-content { max-width: min(760px, 90vw); }

        .ixh-eyebrow {
          display: inline-flex; align-items: center; gap: 9px;
          font-size: 11.5px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase;
          color: #6ea2ff; margin-bottom: 14px;
        }
        .ixh-eyebrow i { display: block; width: 26px; height: 2px; background: #6ea2ff; border-radius: 2px; }

        .ixh-title {
          margin: 0; font-size: clamp(26px,4.2vw,48px); font-weight: 800;
          line-height: 1.1; letter-spacing: -.015em; color: #fff;
          text-shadow: 0 4px 26px rgba(0,0,0,.3);
        }

        .ixh-lead { margin: 16px 0 0; max-width: 62ch; font-size: clamp(14px,1.25vw,16.5px); line-height: 1.72; color: rgba(255,255,255,.86); }
      `}</style>

      <section className="ixh-hero">
        <SoftwareNavbar />

        <div className="ixh-crumbs-bar">
          <nav className="ixh-crumbs" aria-label="Breadcrumb">
            <Link href="/">Homepage</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 6 6 6-6 6" />
            </svg>
            <Link href="/industries">Industries</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 6 6 6-6 6" />
            </svg>
            <span className="cur">{industry.name}</span>
          </nav>
        </div>

        <div className="ixh-photo" data-reveal>
          <Image src={industry.image} alt={industry.name} fill priority sizes="100vw" />
          <div className="ixh-scrim" />
          <div className="ixh-photo-body">
            <div className="ixh-content">
              <span className="ixh-eyebrow"><i />{industry.name}</span>
              <h1 className="ixh-title">{industry.tagline}</h1>
              <p className="ixh-lead">{industry.lead}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
