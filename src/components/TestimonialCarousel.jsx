"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const DEFAULT_TESTIMONIALS = [
  {
    name: "Rahul Sharma",
    rating: 4.5,
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "Aisha Khan",
    rating: 4.5,
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "Omar Al-Farsi",
    rating: 4.5,
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "Maria Lopez",
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "James Park",
    rating: 4.5,
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "Fatima Rahman",
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces",
  },
];

const AUTOPLAY_INTERVAL = 5500;

export default function TestimonialCarousel({
  testimonials = DEFAULT_TESTIMONIALS,
  heading = "What Our Clients Say",
  subheading = "Real feedback from businesses using LOCATOR for GPS tracking, fleet management, and asset monitoring.",
  autoplay = true,
}) {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const updateCards = () => {
      const w = window.innerWidth;
      if (w >= 1024) setCardsPerView(3);
      else if (w >= 640) setCardsPerView(2);
      else setCardsPerView(1);
    };
    updateCards();
    window.addEventListener("resize", updateCards);
    return () => window.removeEventListener("resize", updateCards);
  }, []);

  const totalPages = Math.max(1, Math.ceil(testimonials.length / cardsPerView));

  useEffect(() => {
    if (page >= totalPages) setPage(0);
  }, [totalPages, page]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay || paused || !active) return;
    const id = setInterval(() => {
      setPage((p) => (p + 1) % totalPages);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [autoplay, paused, active, totalPages]);

  const goNext = useCallback(() => setPage((p) => (p + 1) % totalPages), [totalPages]);
  const goPrev = useCallback(() => setPage((p) => (p - 1 + totalPages) % totalPages), [totalPages]);

  return (
    <section
      ref={sectionRef}
      className={`tc ${active ? "tc--active" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="tc__header">
        <h2 className="tc__heading">{heading}</h2>
        <p className="tc__subheading">{subheading}</p>
      </div>

      <div className="tc__wrap">
        <button className="tc__arrow tc__arrow--prev" onClick={goPrev} aria-label="Previous testimonials">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M17 7L10 14L17 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="tc__viewport">
          <div className="tc__track" style={{ transform: `translateX(calc(-${page * 100}% ))` }}>
            {Array.from({ length: totalPages }).map((_, pageIdx) => {
              const pageItems = testimonials.slice(pageIdx * cardsPerView, pageIdx * cardsPerView + cardsPerView);
              return (
                <div key={pageIdx} className="tc__page" style={{ "--cols": cardsPerView }}>
                  {pageItems.map((t, i) => (
                    <TestimonialCard key={`${pageIdx}-${i}`} testimonial={t} delay={i * 0.12} isCurrentPage={pageIdx === page} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <button className="tc__arrow tc__arrow--next" onClick={goNext} aria-label="Next testimonials">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M11 7L18 14L11 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="tc__dots" role="tablist">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`tc__dot ${i === page ? "tc__dot--active" : ""}`}
            onClick={() => setPage(i)}
            aria-label={`Go to page ${i + 1}`}
            role="tab"
            aria-selected={i === page}
          />
        ))}
      </div>

      <style jsx>{`
        .tc {
          --bg-start: #f5f6f7;
          --bg-end: #e9eaec;
          --card-bg-1: #f6f4ee;
          --card-bg-2: #ebebe5;
          --card-radius: 18px;
          --text-body: #8a8a8a;
          --text-name: #555555;
          --text-heading: #4f5560;
          --text-sub: #7a7d83;
          --arrow: #b8bcc2;
          --arrow-hover: #6b7280;
          --dot: #d1d5db;
          --dot-active: #6b7280;
          --star: #fbbf24;
          --star-empty: #e5e7eb;
          position: relative;
          width: 100%;
          background: linear-gradient(180deg, var(--bg-start) 0%, var(--bg-end) 100%);
          padding: clamp(48px, 7vw, 90px) 0 clamp(56px, 7vw, 96px);
          overflow: hidden;
          font-family: "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .tc::before {
          content: "";
          position: absolute;
          top: -10%;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 60%;
          background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
          pointer-events: none;
        }
        .tc__header {
          position: relative;
          text-align: center;
          padding: 0 clamp(20px, 5vw, 60px);
          margin-bottom: clamp(36px, 5vw, 64px);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tc--active .tc__header {
          opacity: 1;
          transform: translateY(0);
        }
        .tc__heading {
          margin: 0 0 clamp(12px, 1.5vw, 18px);
          font-size: clamp(26px, 3.4vw, 42px);
          font-weight: 700;
          color: var(--text-heading);
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .tc__subheading {
          margin: 0 auto;
          max-width: 680px;
          font-size: clamp(13px, 1.1vw, 15px);
          color: var(--text-sub);
          line-height: 1.6;
          font-weight: 400;
        }
        .tc__wrap {
          position: relative;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(48px, 6vw, 80px);
          display: flex;
          align-items: center;
          gap: clamp(6px, 1vw, 14px);
        }
        .tc__arrow {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border: none;
          background: transparent;
          color: var(--arrow);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: color 0.3s ease, background 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          opacity: 0;
        }
        .tc--active .tc__arrow {
          opacity: 1;
          transition-delay: 0.6s;
        }
        .tc__arrow:hover {
          color: var(--arrow-hover);
          background: rgba(0, 0, 0, 0.04);
          transform: scale(1.1);
        }
        .tc__arrow:active {
          transform: scale(0.96);
        }
        .tc__arrow--prev {
          position: absolute;
          left: clamp(4px, 1vw, 16px);
          top: 50%;
          margin-top: -22px;
          z-index: 5;
        }
        .tc__arrow--next {
          position: absolute;
          right: clamp(4px, 1vw, 16px);
          top: 50%;
          margin-top: -22px;
          z-index: 5;
        }
        .tc__viewport {
          flex: 1;
          overflow: hidden;
          padding: 12px 4px;
        }
        .tc__track {
          display: flex;
          width: 100%;
          transition: transform 0.85s cubic-bezier(0.65, 0, 0.35, 1);
          will-change: transform;
        }
        .tc__page {
          flex: 0 0 100%;
          display: grid;
          grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
          gap: clamp(16px, 2vw, 28px);
          padding: 0 4px;
        }
        .tc__dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          margin-top: clamp(28px, 4vw, 48px);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.5s;
        }
        .tc--active .tc__dots {
          opacity: 1;
          transform: translateY(0);
        }
        .tc__dot {
          width: 8px;
          height: 8px;
          padding: 0;
          border: none;
          border-radius: 50%;
          background: var(--dot);
          cursor: pointer;
          transition: width 0.5s cubic-bezier(0.65, 0, 0.35, 1), background 0.4s ease, transform 0.3s ease;
        }
        .tc__dot:hover {
          transform: scale(1.2);
        }
        .tc__dot--active {
          width: 26px;
          border-radius: 4px;
          background: var(--dot-active);
        }
        @media (max-width: 1023px) {
          .tc__wrap {
            padding: 0 clamp(40px, 6vw, 64px);
          }
        }
        @media (max-width: 639px) {
          .tc__wrap {
            padding: 0 36px;
            gap: 4px;
          }
          .tc__arrow {
            width: 36px;
            height: 36px;
          }
          .tc__arrow--prev {
            left: 0;
          }
          .tc__arrow--next {
            right: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .tc__track {
            transition: none;
          }
          .tc__header,
          .tc__arrow,
          .tc__dots {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function TestimonialCard({ testimonial, delay = 0, isCurrentPage }) {
  return (
    <article className={`tcard ${isCurrentPage ? "tcard--in" : ""}`} style={{ "--enter-delay": `${delay}s` }}>
      <div className="tcard__logo">
        <GoogleLogo />
      </div>
      <div className="tcard__rating" aria-label={`Rating: ${testimonial.rating} out of 5`}>
        <StarRating rating={testimonial.rating} />
      </div>
      <p className="tcard__text">{testimonial.text}</p>
      <div className="tcard__name">{testimonial.name}</div>
      <div className="tcard__avatar">
        <Avatar src={testimonial.avatar} name={testimonial.name} />
      </div>
      <style jsx>{`
        .tcard {
          position: relative;
          background: linear-gradient(155deg, #f6f4ee 0%, #efece4 100%);
          border-radius: 18px;
          padding: clamp(28px, 3vw, 38px) clamp(24px, 2.6vw, 32px) clamp(28px, 3vw, 36px);
          text-align: center;
          min-height: clamp(380px, 32vw, 440px);
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 8px 12px 24px rgba(155, 160, 170, 0.22), -6px -8px 20px rgba(255, 255, 255, 0.9),
            inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 0 0 1px rgba(220, 215, 200, 0.15);
          opacity: 0;
          transform: translateY(28px) scale(0.97);
          transition: opacity 0.95s cubic-bezier(0.16, 1, 0.3, 1) var(--enter-delay),
            transform 0.95s cubic-bezier(0.16, 1, 0.3, 1) var(--enter-delay), box-shadow 0.4s ease;
        }
        .tcard--in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .tcard:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 10px 16px 30px rgba(155, 160, 170, 0.28), -8px -10px 24px rgba(255, 255, 255, 0.95),
            inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 0 0 1px rgba(220, 215, 200, 0.2);
        }
        .tcard::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(155deg, rgba(255, 255, 255, 0.5) 0%, transparent 35%, transparent 65%, rgba(220, 215, 200, 0.15) 100%);
          pointer-events: none;
        }
        .tcard__logo {
          margin-bottom: 14px;
          position: relative;
          z-index: 1;
        }
        .tcard__rating {
          display: flex;
          gap: 4px;
          margin-bottom: clamp(20px, 3vw, 32px);
          position: relative;
          z-index: 1;
        }
        .tcard__text {
          flex: 1;
          margin: 0 0 clamp(20px, 3vw, 32px);
          color: #9a9ca0;
          font-size: clamp(13px, 1vw, 14px);
          line-height: 1.7;
          font-weight: 400;
          letter-spacing: 0.01em;
          position: relative;
          z-index: 1;
        }
        .tcard__name {
          color: #6b6e74;
          font-weight: 700;
          font-size: clamp(13px, 1.05vw, 15px);
          letter-spacing: 0.01em;
          margin-bottom: 14px;
          position: relative;
          z-index: 1;
        }
        .tcard__avatar {
          width: clamp(44px, 4vw, 52px);
          height: clamp(44px, 4vw, 52px);
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          z-index: 1;
          box-shadow: 0 4px 12px rgba(120, 125, 135, 0.2), -2px -2px 6px rgba(255, 255, 255, 0.8), 0 0 0 2px rgba(255, 255, 255, 0.5);
        }
        .tcard__avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      `}</style>
    </article>
  );
}

function Avatar({ src, name }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const colors = [
    ["#667eea", "#764ba2"],
    ["#f093fb", "#f5576c"],
    ["#4facfe", "#00f2fe"],
    ["#43e97b", "#38f9d7"],
    ["#fa709a", "#fee140"],
    ["#30cfd0", "#330867"],
    ["#a8edea", "#fed6e3"],
    ["#ff9a9e", "#fad0c4"],
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  const [c1, c2] = colors[hash % colors.length];

  if (failed || !src) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontWeight: 600,
          fontSize: "0.95em",
          letterSpacing: "0.02em",
          fontFamily: "inherit",
          userSelect: "none",
        }}
        aria-label={name}
      >
        {initials}
      </div>
    );
  }

  return <img src={src} alt={name} loading="lazy" onError={() => setFailed(true)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />;
}

function GoogleLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}

function StarRating({ rating = 4.5 }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) stars.push("full");
    else if (i - rating <= 0.5) stars.push("half");
    else stars.push("empty");
  }
  return (
    <>
      {stars.map((type, i) => (
        <Star key={i} type={type} />
      ))}
    </>
  );
}

function Star({ type }) {
  const gradId = `star-grad-${type}-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {type === "half" && (
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#e5e7eb" />
          </linearGradient>
        )}
      </defs>
      <path
        d="M11 1.5L13.708 7.985L20.5 8.55L15.35 13.05L17.025 19.5L11 15.835L4.975 19.5L6.65 13.05L1.5 8.55L8.292 7.985L11 1.5Z"
        fill={type === "full" ? "#fbbf24" : type === "half" ? `url(#${gradId})` : "#e5e7eb"}
        stroke={type === "empty" ? "#e5e7eb" : "#f59e0b"}
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
