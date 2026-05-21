"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ALL_LOGOS = [
  { name: "ABU DHABI EXECUTIVE OFFICE",     src: "/client Logo/ABU-DHABI-EXECUTIVE-OFFICE.png" },
  { name: "AL LAITH GROUP",                  src: "/client Logo/AL LAITH Group.png" },
  { name: "Aditya Birla Group",              src: "/client Logo/Aditya-Birla-Group-Logo-Vector-600x600-1 (1).jpg" },
  { name: "DB Schenker",                     src: "/client Logo/DB-SCHENKER.png" },
  { name: "ELMEC",                           src: "/client Logo/ELMEC-.png" },
  { name: "GMG",                             src: "/client Logo/GMG.png" },
  { name: "Refrigerated Transport System",   src: "/client Logo/Refrigerated-Transport-System-logo.png" },
  { name: "Silver Line Group",               src: "/client Logo/SILVER-LINE-GROUP .png" },
  { name: "United Al Saqer Heavy Equipment", src: "/client Logo/United al saqerHeavy equiment .png" },
  { name: "Access Hire Middle East",         src: "/client Logo/access-hire-middle-east-logo.png" },
  { name: "Al Furath",                       src: "/client Logo/al-furath-.png" },
  { name: "Al Ghazal Transport",             src: "/client Logo/al-ghazal-transport.png" },
  { name: "Bakemart",                        src: "/client Logo/bakemart_logo.jpeg" },
  { name: "Samsung",                         src: "/client Logo/samsung.png" },
];

/* Split into two rows — first 7 in row 1, remaining 7 in row 2 */
const ROW_1 = ALL_LOGOS.slice(0, 7);
const ROW_2 = ALL_LOGOS.slice(7);

export default function LogoMarquee({ speed1 = 38, speed2 = 44 }) {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") { setActive(true); return; }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`lm ${active ? "lm--active" : ""}`}>

      {/* Section heading */}
      <div className="lm__header">
        <p className="lm__eyebrow">Trusted by industry leaders</p>
      </div>

      <div className="lm__inner">
        {/* ROW 1 — scrolls left */}
        <div className="lm__row">
          <div className="lm__track lm__track--left" style={{ "--dur": `${speed1}s` }}>
            {[...ROW_1, ...ROW_1].map((logo, i) => (
              <LogoItem key={`r1-${i}`} logo={logo} />
            ))}
          </div>
        </div>

        {/* ROW 2 — scrolls right */}
        <div className="lm__row">
          <div className="lm__track lm__track--right" style={{ "--dur": `${speed2}s` }}>
            {[...ROW_2, ...ROW_2].map((logo, i) => (
              <LogoItem key={`r2-${i}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .lm {
          --gap: clamp(32px, 4vw, 64px);
          --logo-h: clamp(32px, 4vw, 52px);
          --logo-max-w: clamp(100px, 14vw, 180px);

          position: relative;
          width: 100%;
          background: #f7f6f2;
          padding: clamp(32px, 4vw, 52px) 0 clamp(28px, 3.5vw, 48px);
          overflow: hidden;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .lm--active {
          opacity: 1;
          transform: translateY(0);
        }

        /* Heading */
        .lm__header {
          text-align: center;
          margin-bottom: clamp(20px, 2.5vw, 32px);
          padding: 0 16px;
        }
        .lm__eyebrow {
          font-size: clamp(11px, 1.1vw, 13px);
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #94a3b8;
          margin: 0;
        }

        /* Edge fade mask */
        .lm__inner {
          position: relative;
          mask-image: linear-gradient(
            90deg,
            transparent 0,
            #000 7%,
            #000 93%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0,
            #000 7%,
            #000 93%,
            transparent 100%
          );
        }

        .lm__row {
          display: flex;
          overflow: hidden;
          padding: clamp(6px, 1vw, 12px) 0;
        }
        .lm__row + .lm__row {
          margin-top: clamp(6px, 1vw, 14px);
        }

        .lm__track {
          display: flex;
          flex-shrink: 0;
          gap: var(--gap);
          padding-right: var(--gap);
          width: max-content;
          will-change: transform;
          align-items: center;
        }
        .lm__track--left  { animation: scrollLeft  var(--dur) linear infinite; }
        .lm__track--right { animation: scrollRight var(--dur) linear infinite; }

        @keyframes scrollLeft  { from { transform: translateX(0);    } to { transform: translateX(-50%); } }
        @keyframes scrollRight { from { transform: translateX(-50%); } to { transform: translateX(0);    } }

        .lm:hover .lm__track { animation-play-state: paused; }

        @media (prefers-reduced-motion: reduce) {
          .lm__track         { animation: none !important; }
          .lm                { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
}

function LogoItem({ logo }) {
  return (
    <div className="lmi">
      <Image
        src={logo.src}
        alt={logo.name}
        width={180}
        height={52}
        className="lmi__img"
        style={{
          width: "auto",
          height: "clamp(28px, 3.6vw, 48px)",
          maxWidth: "clamp(90px, 12vw, 160px)",
          objectFit: "contain",
          objectPosition: "center",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />

      <style jsx>{`
        .lmi {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 clamp(6px, 0.8vw, 12px);
          opacity: 0.85;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .lmi:hover {
          opacity: 1;
          transform: scale(1.07);
        }
      `}</style>
    </div>
  );
}
