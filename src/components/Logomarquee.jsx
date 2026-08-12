"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* Client logos from /public/client logos folder */
const CLIENT_LOGO_NUMBERS = [
  1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 55, 57, 58, 59, 60,
];

const ALL_LOGOS = CLIENT_LOGO_NUMBERS.map((n) => {
  const padded = String(n).padStart(2, "0");
  return { name: `Client ${padded}`, src: `/client logos/client-${padded}.png` };
});

/* Split into three rows of roughly equal length */
const ROW_SIZE = Math.ceil(ALL_LOGOS.length / 3);
const ROW_1 = ALL_LOGOS.slice(0, ROW_SIZE);
const ROW_2 = ALL_LOGOS.slice(ROW_SIZE, ROW_SIZE * 2);
const ROW_3 = ALL_LOGOS.slice(ROW_SIZE * 2);

export default function LogoMarquee({ speed1 = 92, speed2 = 102, speed3 = 112 }) {
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

        {/* ROW 3 — scrolls left */}
        <div className="lm__row">
          <div className="lm__track lm__track--left" style={{ "--dur": `${speed3}s` }}>
            {[...ROW_3, ...ROW_3].map((logo, i) => (
              <LogoItem key={`r3-${i}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .lm {
          --gap: clamp(50px, 6vw, 90px);
          --logo-h: clamp(80px, 9vw, 120px);
          --logo-max-w: clamp(220px, 26vw, 350px);

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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="lmi"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={logo.src}
        alt={logo.name}
        width={260}
        height={88}
        className="lmi__img"
        style={{
          width: "auto",
          height: "var(--logo-h)",
          maxWidth: "var(--logo-max-w)",
          objectFit: "contain",
          objectPosition: "center",
          userSelect: "none",
          pointerEvents: "none",
          filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
          transition: "filter 0.3s ease",
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
          transform: scale(${isHovered ? 2.0 : 1});
          z-index: ${isHovered ? 10 : 1};
          position: relative;
        }
        .lmi:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
