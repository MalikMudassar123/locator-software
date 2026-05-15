import { forwardRef, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ConnectIcon, AtlasIcon, TreasuryIcon } from './icons/StripeIcons';

const W = 500;
const H = 520;
const PHONE_X = 55;
const PHONE_Y = 20;
const PHONE_W = 258;
const PHONE_H = 480;
const FLOAT_X = 373;
const FLOAT_SIZE = 72;

const floats = [
  { id: 'connect',  Icon: ConnectIcon,  y: 55,  label: 'Connect' },
  { id: 'atlas',    Icon: AtlasIcon,    y: 215, label: 'Atlas' },
  { id: 'payouts',  Icon: TreasuryIcon, y: 375, label: 'Payouts' },
];

const orders = [
  { id: '#9125', name: 'Hanako Ya...',  amount: 'AED150.00', status: 'Processing', statusColor: '#059669', statusBg: '#d1fae5' },
  { id: '#9124', name: 'Jacques M...',  amount: 'AED200.00', status: 'Processing', statusColor: '#059669', statusBg: '#d1fae5' },
  { id: '#9123', name: 'John Apple...', amount: 'AED178.00', status: 'On Hold',    statusColor: '#d97706', statusBg: '#fef3c7' },
  { id: '#9122', name: 'Jane Diaz',     amount: 'AED200.00', status: 'Completed',  statusColor: '#6b7280', statusBg: '#f3f4f6' },
  { id: '#9121', name: 'Anna Nowak',    amount: 'AED200.00', status: 'Completed',  statusColor: '#6b7280', statusBg: '#f3f4f6' },
  { id: '#9120', name: 'Wei Qing',      amount: 'AED156.00', status: 'Completed',  statusColor: '#6b7280', statusBg: '#f3f4f6' },
];

const groups = [
  { label: 'TODAY',              items: orders.slice(0, 1) },
  { label: 'YESTERDAY',          items: orders.slice(1, 3) },
  { label: 'OLDER THAN 2 DAYS',  items: orders.slice(3) },
];

export default forwardRef(function Scene4Pricing(_props, ref) {
  const phoneRef  = useRef(null);
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

    gsap.fromTo(phoneRef.current,
      { opacity: 0, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }
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
      rowRefs.current.filter(Boolean),
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.07, delay: 0.3 }
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
          const startX = PHONE_X + PHONE_W;
          const startY = PHONE_Y + (PHONE_H * (i + 1)) / (floats.length + 1);
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

      {/* Phone card */}
      <div
        ref={phoneRef}
        style={{
          position: 'absolute',
          left: PHONE_X,
          top: PHONE_Y,
          width: PHONE_W,
          height: PHONE_H,
          borderRadius: 24,
          background: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          opacity: 0,
          willChange: 'opacity, transform',
          zIndex: 2,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px 10px', borderBottom: '1px solid #f3f4f6' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>Orders</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2.5 4.5h13M2.5 9h13M2.5 13.5h13" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Order groups */}
        <div style={{ padding: '0 0 10px' }}>
          {groups.map(g => (
            <div key={g.label}>
              <div style={{ padding: '8px 18px 5px', fontSize: 9, fontWeight: 600, color: '#9ca3af', letterSpacing: '0.06em' }}>
                {g.label}
              </div>
              {g.items.map(o => (
                <div
                  key={o.id}
                  ref={el => (rowRefs.current[rowIdx++] = el)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 18px',
                    borderBottom: '1px solid #f9fafb',
                    gap: 8,
                    opacity: 0,
                    willChange: 'opacity, transform',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                      <span style={{ fontSize: 10, fontWeight: 600, color: '#111827', flexShrink: 0 }}>{o.id}</span>
                      <span style={{ fontSize: 10, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.name}</span>
                    </div>
                    <span style={{
                      display: 'inline-block',
                      fontSize: 8,
                      fontWeight: 600,
                      color: o.statusColor,
                      background: o.statusBg,
                      borderRadius: 4,
                      padding: '2px 5px',
                    }}>
                      {o.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#111827' }}>{o.amount}</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M4 2.5 L7.5 6 L4 9.5" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              ))}
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
