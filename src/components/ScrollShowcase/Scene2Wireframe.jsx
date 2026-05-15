import { forwardRef, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { RadarIcon, AtlasIcon, TreasuryIcon } from './icons/StripeIcons';

const PHONE_W = 280;
const PHONE_H = 540;

// Floating icon cards around the phone (absolute positions relative to scene wrapper)
const floats = [
  { id: 'radar',    Icon: RadarIcon,    top: 72,  left: -92, label: 'Radar' },
  { id: 'atlas',    Icon: AtlasIcon,    top: 230, left: -80, label: 'Atlas' },
  { id: 'treasury', Icon: TreasuryIcon, top: 380, left: -70, label: 'Treasury' },
];

// Skeleton rows inside the phone
const skRows = [
  { y: 100, w: 140, h: 14, cx: true },   // product name
  { y: 125, w: 60,  h: 14, cx: true },   // price
  { y: 175, w: PHONE_W - 48, h: 36 },    // Apple Pay btn
  { y: 220, w: PHONE_W - 48, h: 36 },    // Link btn
  { y: 278, w: PHONE_W - 48, h: 32 },    // email
  { y: 322, w: PHONE_W - 48, h: 32 },    // card
  { y: 366, w: PHONE_W - 48, h: 32 },    // country
];

export default forwardRef(function Scene2Wireframe(_props, ref) {
  const skeletonRef  = useRef(null);
  const revealRef    = useRef(null);
  const floatRefs    = useRef([]);
  const lineTweens   = useRef([]);
  const lineRefs     = useRef([]);

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

    // reset
    gsap.set(skeletonRef.current,  { opacity: 1 });
    gsap.set(revealRef.current,    { opacity: 0 });
    gsap.set(floatRefs.current.filter(Boolean), { opacity: 0, x: -16 });

    // step 1: float cards slide in
    gsap.to(floatRefs.current.filter(Boolean), {
      opacity: 1, x: 0, duration: 0.45, ease: 'power2.out', stagger: 0.12, delay: 0.15,
    });

    // step 2: start line animations on float cards
    lineRefs.current.forEach((path, i) => {
      if (!path) return;
      const len = path.getTotalLength();
      const seg = len * 0.5;
      gsap.set(path, { strokeDasharray: `${seg} ${len - seg}`, strokeDashoffset: len });
      const tw = gsap.to(path, {
        strokeDashoffset: 0, duration: 2 + i * 0.4, ease: 'none', repeat: -1, delay: 0.5 + i * 0.2,
      });
      lineTweens.current.push(tw);
    });

    // step 3: skeleton → real reveal
    gsap.to(skeletonRef.current, { opacity: 0, duration: 0.5, delay: 1.2 });
    gsap.to(revealRef.current,   { opacity: 1, duration: 0.5, delay: 1.2 });
  };

  // Phone center offsets inside 480×520 scene area
  const phoneLeft = 146;
  const phoneTop  = 0;

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
      style={{ position: 'relative', width: 480, maxWidth: '100%', height: PHONE_H + 40 }}
    >
      {/* Floating icon cards */}
      {floats.map((f, i) => (
        <div
          key={f.id}
          ref={el => (floatRefs.current[i] = el)}
          style={{
            position: 'absolute',
            top: f.top,
            left: phoneLeft + f.left,
            width: 72,
            height: 72,
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
          <span style={{ fontSize: 10, fontWeight: 500, color: '#666' }}>{f.label}</span>
        </div>
      ))}

      {/* Connector lines from float cards to phone edge */}
      <svg
        style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'visible' }}
        width={480} height={PHONE_H + 40}
      >
        {floats.map((f, i) => {
          const fx = phoneLeft + f.left + 72;         // right edge of float card
          const fy = f.top + 36;                       // vertical center of float card
          const tx = phoneLeft;                         // left edge of phone
          const ty = f.top + 36;
          const mx = (fx + tx) / 2;
          return (
            <path
              key={f.id}
              ref={el => (lineRefs.current[i] = el)}
              d={`M${fx} ${fy} Q${mx} ${fy} ${tx} ${ty}`}
              stroke="#6366f1"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />
          );
        })}
      </svg>

      {/* Phone shell */}
      <div
        style={{
          position: 'absolute',
          left: phoneLeft,
          top: phoneTop,
          width: PHONE_W,
          height: PHONE_H,
          borderRadius: 28,
          background: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          zIndex: 3,
        }}
      >
        {/* Skeleton layer */}
        <div ref={skeletonRef} style={{ position: 'absolute', inset: 0, padding: '20px 24px' }}>
          {/* product thumbnail placeholder */}
          <div style={{
            width: 64, height: 64, borderRadius: 12,
            background: 'linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.4s ease-in-out infinite',
            margin: '12px auto 10px',
          }} />
          {skRows.map((r, i) => (
            <div key={i} style={{
              width: r.cx ? r.w : r.w,
              height: r.h,
              marginLeft: r.cx ? (PHONE_W - 48 - r.w) / 2 : 0,
              marginBottom: 8,
              borderRadius: r.h >= 32 ? 8 : 6,
              background: 'linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%)',
              backgroundSize: '200% 100%',
              animation: `shimmer 1.4s ease-in-out ${i * 0.1}s infinite`,
            }} />
          ))}
          <style>{`
            @keyframes shimmer {
              0%   { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}</style>
        </div>

        {/* Real content layer */}
        <div ref={revealRef} style={{ position: 'absolute', inset: 0, opacity: 0, display: 'flex', flexDirection: 'column' }}>
          {/* product */}
          <div style={{ padding: '20px 24px 14px', borderBottom: '1px solid #f3f4f6', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 52, height: 52, borderRadius: 10, background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="4" y="10" width="20" height="14" rx="2" fill="#e5e7eb" />
                <path d="M9 10 Q9 5 14 5 Q19 5 19 10" stroke="#d1d5db" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Wood Chair 001</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>$149</span>
          </div>

          {/* buttons */}
          <div style={{ padding: '14px 24px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button style={{ width: '100%', height: 40, borderRadius: 999, background: '#000', border: 'none', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'default' }}>
              ⌘ Pay
            </button>
            <button style={{ width: '100%', height: 40, borderRadius: 999, background: '#00c853', border: 'none', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'default' }}>
              Pay with link
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '2px 0' }}>
              <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
              <span style={{ fontSize: 10, color: '#9ca3af' }}>Or pay another way</span>
              <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
            </div>
          </div>

          {/* form fields */}
          <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['Email', 'jane.diaz@example.com'], ['Card', '4242 4242 4242 4242'], ['Country', 'United States']].map(([label, val]) => (
              <div key={label}>
                <div style={{ fontSize: 10, fontWeight: 500, color: '#374151', marginBottom: 3 }}>{label}</div>
                <div style={{ height: 34, borderRadius: 6, border: '1px solid #e5e7eb', padding: '0 10px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: '#6b7280' }}>{val}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
