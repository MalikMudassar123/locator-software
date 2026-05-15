import { forwardRef, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { CapitalIcon, TreasuryIcon, RadarIcon } from './icons/StripeIcons';

const W = 540;
const H = 500;
const FRAME_X = 48;
const FRAME_Y = 40;
const FRAME_W = 300;
const FRAME_H = 420;
const FLOAT_X = 420;
const FLOAT_SIZE = 72;

const floats = [
  { id: 'revenue',   Icon: CapitalIcon,  y: 48,  label: 'Revenue' },
  { id: 'invoicing', Icon: TreasuryIcon, y: 200, label: 'Invoicing' },
  { id: 'radar',     Icon: RadarIcon,    y: 352, label: 'Radar' },
];

const plans = [
  {
    name: 'Standard',
    sub: 'Up to 5 users',
    price: 'AED49',
    period: '/month',
    features: ['12 months historical data', '4 hr data refresh', '500+ integrations'],
  },
  {
    name: 'Professional',
    sub: 'Up to 25 users',
    price: 'AED149',
    period: '/month',
    badge: 'Popular!',
    highlighted: true,
    features: ['24 months historical data', '1 hr data refresh', '1,000+ integrations', 'Simple reporting'],
  },
];

export default forwardRef(function Scene3Checkout(_props, ref) {
  const frameRef  = useRef(null);
  const cardRefs  = useRef([]);
  const rowRefs   = useRef([]);
  const floatRefs = useRef([]);
  const lineRefs  = useRef([]);
  const lineTweens = useRef([]);

  useLayoutEffect(() => {
    return () => lineTweens.current.forEach(t => t?.kill());
  }, []);

  const stop = () => {
    lineTweens.current.forEach(t => t?.kill());
    lineTweens.current = [];
  };

  const play = () => {
    lineTweens.current.forEach(t => t?.kill());
    lineTweens.current = [];

    gsap.set(floatRefs.current.filter(Boolean), { opacity: 0, x: 16 });

    gsap.fromTo(frameRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );

    gsap.to(floatRefs.current.filter(Boolean), {
      opacity: 1, x: 0, duration: 0.45, ease: 'power2.out', stagger: 0.12, delay: 0.2,
    });

    lineRefs.current.forEach((path, i) => {
      if (!path) return;
      const len = path.getTotalLength();
      const seg = len * 0.5;
      gsap.set(path, { strokeDasharray: `${seg} ${len - seg}`, strokeDashoffset: len });
      const tw = gsap.to(path, {
        strokeDashoffset: 0, duration: 2 + i * 0.4, ease: 'none', repeat: -1, delay: 0.4 + i * 0.15,
      });
      lineTweens.current.push(tw);
    });

    gsap.fromTo(
      cardRefs.current.filter(Boolean),
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.12, delay: 0.3 }
    );
    gsap.fromTo(
      rowRefs.current.filter(Boolean),
      { opacity: 0, x: -6 },
      { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out', stagger: 0.04, delay: 0.6 }
    );
  };

  let rowIdx = 0;

  return (
    <div
      ref={(el) => {
        if (el) {
          el.__play = play;
          el.__stop = stop;
        }
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
      }}
      style={{ position: 'relative', width: W, maxWidth: '100%', height: H }}
    >
      {/* SVG connector lines */}
      <svg
        width={W} height={H}
        viewBox={`0 0 ${W} ${H}`}
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'visible' }}
      >
        {floats.map((f, i) => {
          const startX = FRAME_X + FRAME_W;
          const startY = FRAME_Y + (FRAME_H * (i + 1)) / (floats.length + 1);
          const endX   = FLOAT_X;
          const endY   = f.y + FLOAT_SIZE / 2;
          const cpX    = (startX + endX) / 2;
          const cpY    = (startY + endY) / 2;
          return (
            <path
              key={f.id}
              ref={el => (lineRefs.current[i] = el)}
              d={`M${startX.toFixed(1)} ${startY.toFixed(1)} Q${cpX.toFixed(1)} ${cpY.toFixed(1)} ${endX} ${endY}`}
              stroke="#6366f1"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />
          );
        })}
      </svg>

      {/* Browser frame */}
      <div
        ref={frameRef}
        style={{
          position: 'absolute',
          left: FRAME_X,
          top: FRAME_Y,
          width: FRAME_W,
          height: FRAME_H,
          borderRadius: 12,
          background: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          opacity: 0,
          zIndex: 2,
        }}
      >
        {/* Browser chrome */}
        <div style={{ height: 34, background: '#f9fafb', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 6 }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#f87171' }} />
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#fbbf24' }} />
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#4ade80' }} />
          <div style={{ flex: 1, height: 18, borderRadius: 4, background: '#f3f4f6', margin: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 9, color: '#9ca3af' }}>quantum.app/pricing</span>
          </div>
        </div>

        {/* Navbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#7c3aed' }} />
            <span style={{ fontSize: 10, fontWeight: 600, color: '#111827' }}>Quantum</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {['Products', 'Pricing', 'Contact'].map(t => (
              <span key={t} style={{ fontSize: 9, color: '#6b7280' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Pricing cards */}
        <div style={{ padding: '14px 12px', display: 'flex', gap: 10 }}>
          {plans.map((p, i) => (
            <div
              key={p.name}
              ref={el => (cardRefs.current[i] = el)}
              style={{
                flex: 1,
                minWidth: 0,
                borderRadius: 9,
                border: p.highlighted ? '2px solid #7c3aed' : '1px solid #e5e7eb',
                padding: '12px 10px',
                display: 'flex',
                flexDirection: 'column',
                gap: 7,
                background: '#fff',
                opacity: 0,
                willChange: 'opacity, transform',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#111827' }}>{p.name}</span>
                {p.badge && (
                  <span style={{ fontSize: 7, fontWeight: 700, color: '#7c3aed', background: '#f3f0ff', borderRadius: 3, padding: '1px 4px', whiteSpace: 'nowrap' }}>
                    {p.badge}
                  </span>
                )}
              </div>
              <span style={{ fontSize: 8, color: '#6b7280', marginTop: -3 }}>{p.sub}</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>{p.price}</span>
                <span style={{ fontSize: 8, color: '#6b7280' }}>{p.period}</span>
              </div>
              <button style={{ width: '100%', height: 26, borderRadius: 5, background: '#7c3aed', border: 'none', color: '#fff', fontSize: 8, fontWeight: 600, cursor: 'default' }}>
                Subscribe
              </button>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 8, fontWeight: 600, color: '#374151' }}>This includes:</span>
                {p.features.map(f => (
                  <div
                    key={f}
                    ref={el => { rowRefs.current[rowIdx++] = el; }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 4, opacity: 0, willChange: 'opacity, transform' }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                      <path d="M1 4 L3 6 L7 2" stroke="#7c3aed" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: 8, color: '#6b7280', lineHeight: 1.3 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating icon cards — right side */}
      {floats.map((f, i) => (
        <div
          key={f.id}
          ref={el => (floatRefs.current[i] = el)}
          style={{
            position: 'absolute',
            top: f.y,
            left: FLOAT_X,
            width: FLOAT_SIZE,
            height: FLOAT_SIZE,
            borderRadius: 14,
            background: '#ffffff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            zIndex: 2,
            opacity: 0,
            willChange: 'opacity, transform',
          }}
        >
          <f.Icon muted={false} />
          <span style={{ fontSize: 9, fontWeight: 500, color: '#666' }}>{f.label}</span>
        </div>
      ))}
    </div>
  );
});
