'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Scene1Icons     from './Scene1Icons';
import Scene2Wireframe from './Scene2Wireframe';
import Scene3Checkout  from './Scene3Checkout';
import Scene4Pricing   from './Scene4Pricing';

const textSections = [
  {
    eyebrow: 'Modular solutions',
    headline: 'A fully integrated suite of financial and payments products',
    body: 'Reduce costs, grow revenue, and run your business more efficiently on a fully integrated, AI-powered platform.',
  },
  {
    eyebrow: 'Payments',
    headline: 'Accept and optimize payments, globally',
    body: 'Increase authorization rates, offer local payment methods to boost conversion, and reduce fraud using AI.',
    cta: 'Start with Payments',
    links: [
      { label: 'Radar', desc: 'for AI-powered fraud protection' },
      { label: 'Terminal', desc: 'for custom in-person payments' },
    ],
  },
  {
    eyebrow: 'Billing',
    headline: 'Capture recurring revenue',
    body: 'Manage flat rate, usage-based, and hybrid pricing models, minimize churn, and automate finance operations.',
    cta: 'Start with Billing',
    links: [
      { label: 'Invoicing', desc: 'for invoice creation, collection, and tracking' },
      { label: 'Usage-based billing', desc: 'for metering, billing, and consumption insights' },
    ],
  },
  {
    eyebrow: 'Connect',
    headline: 'Set up multiparty payments and payouts',
    body: 'Integrate payments into your platform or marketplace for end-to-end payments experiences.',
    cta: 'Start with Connect',
    links: [
      { label: 'Terminal', desc: 'for custom in-person payments' },
      { label: 'Instant Payouts', desc: 'for fast payments to users' },
    ],
  },
];

const SceneComponents = [Scene1Icons, Scene2Wireframe, Scene3Checkout, Scene4Pricing];

export default function ScrollShowcase() {
  const textRefs    = useRef([]);
  const wrapperRefs = useRef([]);
  const innerRefs   = useRef([]);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    // ── Initial scene state ──────────────────────────────────────────────
    wrapperRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 24 });
    });
    innerRefs.current[0]?.__play?.();

    // Track active index as a plain variable — no state, no re-renders
    let activeIdx = 0;

    const activate = (idx) => {
      if (idx === activeIdx) return;
      activeIdx = idx;

      wrapperRefs.current.forEach((el, j) => {
        if (!el) return;
        const inner = innerRefs.current[j];
        if (j === idx) {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', overwrite: true });
          if (inner?.__play) inner.__play();
        } else {
          gsap.to(el, { opacity: 0, y: j < idx ? -20 : 20, duration: 0.25, ease: 'power2.out', overwrite: true });
          if (inner?.__stop) inner.__stop();
        }
      });
    };

    // ── Scene detection via IntersectionObserver ─────────────────────────
    // Does NOT read window.scrollY (which can be 0 when body is the scroll
    // container), works purely from element visibility relative to the
    // viewport — reliable across all scroll-container configurations.
    // rootMargin '-30%' means the section must be in the middle 40% of the
    // viewport before it activates, giving a clean handoff between scenes.
    const observers = textRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) activate(i); },
        { rootMargin: '-30% 0px -30% 0px', threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });

    return () => {
      observers.forEach(o => o?.disconnect());
    };
  }, []);

  return (
    <section style={{ background: '#f6f9fc', width: '100%', position: 'relative' }}>
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 48px',
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        {/* ── LEFT: scrolling text ── */}
        <div style={{ flex: '0 0 50%', paddingRight: 48 }}>
          {textSections.map((s, i) => (
            <div
              key={i}
              ref={(el) => (textRefs.current[i] = el)}
              style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingTop: 80,
                paddingBottom: 80,
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                {s.eyebrow}
              </span>
              <h2 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.12, color: '#0f172a', margin: '0 0 18px' }}>
                {s.headline}
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: '#475569', margin: '0 0 24px', maxWidth: 420 }}>
                {s.body}
              </p>
              {s.cta && (
                <button style={{ alignSelf: 'flex-start', height: 42, padding: '0 22px', borderRadius: 999, background: '#4f46e5', border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 24 }}>
                  {s.cta} →
                </button>
              )}
              {s.links && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                    See also
                  </span>
                  {s.links.map(l => (
                    <span key={l.label} style={{ fontSize: 14, color: '#475569' }}>
                      <span style={{ color: '#6366f1', fontWeight: 500 }}>{l.label}</span>{' '}{l.desc}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── RIGHT: CSS sticky — compositor-thread only, no JS per scroll tick ──
            Works because main now uses overflow-x:clip instead of overflow-x:hidden.
            overflow-x:clip does not create a scroll container so sticky resolves
            to the viewport as intended.                                          ── */}
        <div
          style={{
            flex: '0 0 50%',
            height: '100vh',
            position: 'sticky',
            top: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'visible',
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'visible' }}>
            {SceneComponents.map((SceneComponent, i) => (
              <div
                key={i}
                ref={(el) => (wrapperRefs.current[i] = el)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'visible',
                }}
              >
                <SceneComponent ref={(el) => { if (el) innerRefs.current[i] = el; }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
