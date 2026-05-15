import { forwardRef, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  PaymentsIcon,
  ConnectIcon,
  CapitalIcon,
  TreasuryIcon,
  ClimateIcon,
  AtlasIcon,
  BillingIcon,
  RadarIcon,
} from './icons/StripeIcons';

const W = 500;
const H = 500;

// absolute positions (top-left of card bounding box)
const nodes = [
  { id: 'billing',  Icon: BillingIcon,  x: 190, y: 185, size: 110, active: true,  label: 'Billing' },
  { id: 'payments', Icon: PaymentsIcon, x: 340, y: 60,  size: 110, active: true,  label: 'Payments' },
  { id: 'connect',  Icon: ConnectIcon,  x: 40,  y: 310, size: 110, active: true,  label: 'Connect' },
  { id: 'treasury', Icon: TreasuryIcon, x: 35,  y: 60,  size: 78,  active: false, label: '' },
  { id: 'capital',  Icon: CapitalIcon,  x: 195, y: 22,  size: 78,  active: false, label: '' },
  { id: 'climate',  Icon: ClimateIcon,  x: 382, y: 200, size: 78,  active: false, label: '' },
  { id: 'atlas',    Icon: AtlasIcon,    x: 200, y: 372, size: 78,  active: false, label: '' },
  { id: 'radar',    Icon: RadarIcon,    x: 378, y: 350, size: 78,  active: false, label: '' },
];

const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

function center(id) {
  const n = nodeMap[id];
  return { cx: n.x + n.size / 2, cy: n.y + n.size / 2 };
}

function curvePath(id1, id2, bend = 55) {
  const a = center(id1), b = center(id2);
  const mx = (a.cx + b.cx) / 2, my = (a.cy + b.cy) / 2;
  const dx = b.cx - a.cx, dy = b.cy - a.cy;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const qx = mx + (-dy / len) * bend;
  const qy = my + (dx / len) * bend;
  return `M${a.cx.toFixed(1)} ${a.cy.toFixed(1)} Q${qx.toFixed(1)} ${qy.toFixed(1)} ${b.cx.toFixed(1)} ${b.cy.toFixed(1)}`;
}

const connections = [
  { id: 'l1', from: 'billing',  to: 'payments', color: '#6366f1', speed: 2.2, dash: 0.45, bend: 65 },
  { id: 'l2', from: 'billing',  to: 'connect',  color: '#6366f1', speed: 2.8, dash: 0.42, bend: -60 },
  { id: 'l3', from: 'payments', to: 'capital',  color: '#06b6d4', speed: 1.8, dash: 0.35, bend: 30 },
  { id: 'l4', from: 'connect',  to: 'atlas',    color: '#06b6d4', speed: 2.4, dash: 0.35, bend: 35 },
  { id: 'l5', from: 'billing',  to: 'climate',  color: '#06b6d4', speed: 3.0, dash: 0.30, bend: -45 },
];

const Scene1Icons = forwardRef(function Scene1Icons(_props, ref) {
  const lineRefs  = useRef([]);
  const tweenRefs = useRef([]);
  const cardRefs  = useRef({});

  const stop = () => {
    tweenRefs.current.forEach(t => t?.kill());
    tweenRefs.current = [];
  };

  const play = () => {
    tweenRefs.current.forEach(t => t?.kill());
    tweenRefs.current = [];

    // animate cards in
    const cards = nodes.map(n => cardRefs.current[n.id]).filter(Boolean);
    gsap.fromTo(cards,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)', stagger: 0.06 }
    );

    // start continuous line flow
    lineRefs.current.forEach((path, i) => {
      if (!path) return;
      const len = path.getTotalLength();
      const conn = connections[i];
      const segLen = len * conn.dash;
      const gap    = len - segLen;
      gsap.set(path, { strokeDasharray: `${segLen} ${gap}`, strokeDashoffset: len });
      const tw = gsap.to(path, {
        strokeDashoffset: 0,
        duration: conn.speed,
        ease: 'none',
        repeat: -1,
        delay: i * 0.3,
      });
      tweenRefs.current.push(tw);
    });
  };

  useLayoutEffect(() => {
    return () => tweenRefs.current.forEach(t => t?.kill());
  }, []);

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
      style={{ position: 'relative', width: W, height: H, maxWidth: '100%' }}
    >
      {/* SVG lines — behind cards */}
      <svg
        width={W} height={H}
        viewBox={`0 0 ${W} ${H}`}
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'visible' }}
      >
        {connections.map((conn, i) => (
          <path
            key={conn.id}
            ref={el => (lineRefs.current[i] = el)}
            d={curvePath(conn.from, conn.to, conn.bend)}
            stroke={conn.color}
            strokeWidth={conn.id === 'l1' || conn.id === 'l2' ? 1.5 : 1.2}
            fill="none"
            strokeLinecap="round"
            opacity={conn.id === 'l1' || conn.id === 'l2' ? 0.9 : 0.65}
          />
        ))}
      </svg>

      {/* Icon cards */}
      {nodes.map(n => (
        <div
          key={n.id}
          ref={el => (cardRefs.current[n.id] = el)}
          onMouseEnter={() => {
            if (!cardRefs.current[n.id]) return;
            gsap.to(cardRefs.current[n.id], { scale: 1.06, duration: 0.2, ease: 'power2.out' });
          }}
          onMouseLeave={() => {
            if (!cardRefs.current[n.id]) return;
            gsap.to(cardRefs.current[n.id], { scale: 1, duration: 0.25, ease: 'power2.inOut' });
          }}
          style={{
            position: 'absolute',
            left: n.x,
            top: n.y,
            width: n.size,
            height: n.size,
            borderRadius: n.active ? 18 : 14,
            background: n.active ? '#ffffff' : 'rgba(255,255,255,0.55)',
            border: n.active ? 'none' : '1px solid #e0e0e0',
            boxShadow: n.active ? '0 4px 16px rgba(0,0,0,0.10)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: n.active ? 8 : 0,
            zIndex: 1,
            cursor: 'default',
            opacity: 0,
            transformOrigin: 'center',
            willChange: 'transform, opacity',
          }}
        >
          <n.Icon muted={!n.active} />
          {n.active && (
            <span style={{ fontSize: 12, fontWeight: 500, color: '#555', lineHeight: 1 }}>
              {n.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
});

export default Scene1Icons;
