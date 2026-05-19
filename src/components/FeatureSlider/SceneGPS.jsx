'use client';
import { forwardRef, useLayoutEffect, useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

// ─── Phone geometry (same silhouette as ScrollShowcase/Scene1Icons) ───────────
const W = 540, H = 580;
const PHONE_X = 140, PHONE_Y = 38, PHONE_W = 260, PHONE_H = 500, PHONE_R = 32;
const PX2 = PHONE_X + PHONE_W, PY2 = PHONE_Y + PHONE_H;
const PHONE_PERIM = 1465;

const PHONE_PATH =
  `M${PHONE_X+PHONE_R} ${PHONE_Y} H${PX2-PHONE_R}` +
  ` Q${PX2} ${PHONE_Y} ${PX2} ${PHONE_Y+PHONE_R}` +
  ` V${PY2-PHONE_R} Q${PX2} ${PY2} ${PX2-PHONE_R} ${PY2}` +
  ` H${PHONE_X+PHONE_R} Q${PHONE_X} ${PY2} ${PHONE_X} ${PY2-PHONE_R}` +
  ` V${PHONE_Y+PHONE_R} Q${PHONE_X} ${PHONE_Y} ${PHONE_X+PHONE_R} ${PHONE_Y} Z`;

function rp(x, y, w, h, r = 0) {
  if (!r) return `M${x} ${y}H${x+w}V${y+h}H${x}Z`;
  return `M${x+r} ${y}H${x+w-r}Q${x+w} ${y} ${x+w} ${y+r}V${y+h-r}Q${x+w} ${y+h} ${x+w-r} ${y+h}H${x+r}Q${x} ${y+h} ${x} ${y+h-r}V${y+r}Q${x} ${y} ${x+r} ${y}Z`;
}

// Phone-screen wireframe skeleton
const WIRE = [
  rp(PHONE_X+6,  PHONE_Y+6,   PHONE_W-12, 46, 26),      // status+header
  rp(PHONE_X+10, PHONE_Y+58,  PHONE_W-20, 120, 6),       // map area
  rp(PHONE_X+10, PHONE_Y+186, 16, 16, 8),                 // row 1 dot
  rp(PHONE_X+32, PHONE_Y+188, 120, 8, 4),
  rp(PHONE_X+32, PHONE_Y+202, 76, 7, 3),
  rp(PHONE_X+10, PHONE_Y+218, 16, 16, 8),                 // row 2 dot
  rp(PHONE_X+32, PHONE_Y+220, 100, 8, 4),
  rp(PHONE_X+32, PHONE_Y+234, 60, 7, 3),
  rp(PHONE_X+10, PHONE_Y+250, 16, 16, 8),                 // row 3 dot
  rp(PHONE_X+32, PHONE_Y+252, 130, 8, 4),
  rp(PHONE_X+32, PHONE_Y+266, 84, 7, 3),
  rp(PHONE_X+10, PHONE_Y+282, 16, 16, 8),                 // row 4 dot
  rp(PHONE_X+32, PHONE_Y+284, 90, 8, 4),
  rp(PHONE_X+32, PHONE_Y+298, 56, 7, 3),
  rp(PHONE_X+10, PHONE_Y+322, PHONE_W-20, 22, 5),         // search bar
];

// ─── Floating icon positions ───────────────────────────────────────────────────
// layer 'outer' = float outside phone; 'center' = masked by phone overlay
const ICONS = [
  { id: 'satellite', left: 22,  top: 68,  size: 70, layer: 'outer'  }, // 0
  { id: 'signal',    left: 183, top: 143, size: 64, layer: 'center' }, // 1
  { id: 'car',       left: 412, top: 44,  size: 64, layer: 'outer'  }, // 2
  { id: 'night',     left: 22,  top: 278, size: 64, layer: 'outer'  }, // 3
  { id: 'chart',     left: 300, top: 248, size: 64, layer: 'center' }, // 4
  { id: 'speed',     left: 300, top: 382, size: 64, layer: 'center' }, // 5
];

// ─── Connection paths (L-shaped / curved routes between icons) ─────────────────
const CONNECTIONS = [
  'M 57 68 C 57 44 444 44 444 76',                                             // satellite→car
  'M 57 138 L 57 168 C 57 180 70 180 215 180',                                 // satellite→signal
  'M 86 310 L 300 310 C 332 310 332 294 332 280',                              // night→chart
  'M 364 280 L 394 280 C 408 280 408 330 408 362 C 408 396 388 414 332 414',  // chart→speed
  'M 412 76 L 236 76 C 215 76 215 102 215 143',                                // car→signal
  'M 54 342 L 54 402 C 54 418 102 414 300 414',                                // night→speed
];
const PAIRS = [[0,2],[0,1],[3,4],[4,5],[2,1],[3,5]];

const CSS = `
  @keyframes fsgps_shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
`;

// ─── Gradient defs ─────────────────────────────────────────────────────────────
function GlobalDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }}>
      <defs>
        {/* Icon fill gradients */}
        <linearGradient id="fsgps_satellite" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1d4ed8"/><stop offset="100%" stopColor="#2563eb"/>
        </linearGradient>
        <linearGradient id="fsgps_signal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9"/><stop offset="100%" stopColor="#2563eb"/>
        </linearGradient>
        <linearGradient id="fsgps_car" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
        <linearGradient id="fsgps_night" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e40af"/><stop offset="100%" stopColor="#3730a3"/>
        </linearGradient>
        <linearGradient id="fsgps_chart" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0369a1"/><stop offset="100%" stopColor="#0891b2"/>
        </linearGradient>
        <linearGradient id="fsgps_speed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb"/><stop offset="100%" stopColor="#0ea5e9"/>
        </linearGradient>
        {/* Line gradients */}
        <linearGradient id="fsgps_l0" x1="57" y1="68" x2="444" y2="76" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563eb"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
        <linearGradient id="fsgps_l1" x1="57" y1="138" x2="215" y2="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1d4ed8"/><stop offset="100%" stopColor="#0ea5e9"/>
        </linearGradient>
        <linearGradient id="fsgps_l2" x1="86" y1="310" x2="332" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e3a8a"/><stop offset="100%" stopColor="#3b82f6"/>
        </linearGradient>
        <linearGradient id="fsgps_l3" x1="364" y1="280" x2="332" y2="414" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#0ea5e9"/>
        </linearGradient>
        <linearGradient id="fsgps_l4" x1="412" y1="76" x2="215" y2="143" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#06b6d4"/><stop offset="100%" stopColor="#2563eb"/>
        </linearGradient>
        <linearGradient id="fsgps_l5" x1="54" y1="342" x2="300" y2="414" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e40af"/><stop offset="100%" stopColor="#0891b2"/>
        </linearGradient>
        <linearGradient id="fsgps_ph" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563eb"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function Sk({ w, h, br = 5, delay = 0, style = {} }) {
  return <div style={{
    width: w, height: h, borderRadius: br, flexShrink: 0,
    background: 'linear-gradient(90deg,#e2e8f0 25%,#f1f5f9 50%,#e2e8f0 75%)',
    backgroundSize: '200%',
    animation: `fsgps_shimmer 1.6s ease-in-out ${delay}s infinite`,
    ...style,
  }}/>;
}

function InactiveCard({ id, size }) {
  const r = Math.round(size * 0.24);
  const s = Math.round(size * 0.50);
  const c = '#c8d0dc';
  const shapes = {
    satellite: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="3" stroke={c} strokeWidth="1.5"/><path d="M12 8v8" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><path d="M7 16h10" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><path d="M5 20l4-4M19 20l-4-4" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>,
    signal:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M1 6C4.44 2.56 9.42 1 12 1s7.56 1.56 11 5" stroke={c} strokeWidth="1.4" strokeLinecap="round"/><path d="M4.22 9.22C6.55 6.89 9.21 6 12 6s5.45.89 7.78 3.22" stroke={c} strokeWidth="1.4" strokeLinecap="round"/><path d="M7.76 12.76C9.11 11.41 10.5 11 12 11s2.89.41 4.24 1.76" stroke={c} strokeWidth="1.4" strokeLinecap="round"/><circle cx="12" cy="17" r="1.8" fill={c}/></svg>,
    car:       <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 11l1.5-4h11l1.5 4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><rect x="3" y="11" width="18" height="7" rx="2" stroke={c} strokeWidth="1.5"/><circle cx="7.5" cy="18" r="2" stroke={c} strokeWidth="1.2"/><circle cx="16.5" cy="18" r="2" stroke={c} strokeWidth="1.2"/></svg>,
    night:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke={c} strokeWidth="1.5" fill="none"/></svg>,
    chart:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="12" width="4" height="9" rx="1" stroke={c} strokeWidth="1.2"/><rect x="9" y="7"  width="4" height="14" rx="1" stroke={c} strokeWidth="1.2"/><rect x="15" y="3" width="4" height="18" rx="1" stroke={c} strokeWidth="1.2"/></svg>,
    speed:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" stroke={c} strokeWidth="1.4"/><path d="M12 12l-4-4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="12" r="1.5" fill={c}/></svg>,
  };
  return (
    <div style={{ width: size, height: size, borderRadius: r, background: '#f8fafc', border: '1.5px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {shapes[id]}
    </div>
  );
}

function ActiveCard({ id, size }) {
  const r = Math.round(size * 0.24);
  const s = Math.round(size * 0.52);
  const inner = {
    satellite: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="3" fill="url(#fsgps_satellite)"/><path d="M12 8v8" stroke="url(#fsgps_satellite)" strokeWidth="1.8" strokeLinecap="round"/><path d="M7 16h10" stroke="url(#fsgps_satellite)" strokeWidth="1.8" strokeLinecap="round"/><path d="M5 20l4-4M19 20l-4-4" stroke="url(#fsgps_satellite)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    signal:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M1 6C4.44 2.56 9.42 1 12 1s7.56 1.56 11 5" stroke="url(#fsgps_signal)" strokeWidth="1.6" strokeLinecap="round"/><path d="M4.22 9.22C6.55 6.89 9.21 6 12 6s5.45.89 7.78 3.22" stroke="url(#fsgps_signal)" strokeWidth="1.6" strokeLinecap="round"/><path d="M7.76 12.76C9.11 11.41 10.5 11 12 11s2.89.41 4.24 1.76" stroke="url(#fsgps_signal)" strokeWidth="1.6" strokeLinecap="round"/><circle cx="12" cy="17" r="1.8" fill="url(#fsgps_signal)"/></svg>,
    car:       <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 11l1.5-4h11l1.5 4" stroke="url(#fsgps_car)" strokeWidth="1.5" strokeLinecap="round"/><rect x="3" y="11" width="18" height="7" rx="2" fill="url(#fsgps_car)"/><circle cx="7.5" cy="18" r="2" fill="white"/><circle cx="16.5" cy="18" r="2" fill="white"/></svg>,
    night:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="url(#fsgps_night)"/></svg>,
    chart:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="12" width="4" height="9" rx="1" fill="url(#fsgps_chart)" opacity="0.6"/><rect x="9" y="7"  width="4" height="14" rx="1" fill="url(#fsgps_chart)"/><rect x="15" y="3" width="4" height="18" rx="1" fill="url(#fsgps_chart)"/></svg>,
    speed:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" fill="url(#fsgps_speed)" opacity="0.15" stroke="url(#fsgps_speed)" strokeWidth="1.5"/><path d="M12 12l-4-4" stroke="url(#fsgps_speed)" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="1.8" fill="url(#fsgps_speed)"/></svg>,
  };
  return (
    <div style={{ width: size, height: size, borderRadius: r, background: '#fff', boxShadow: '0 6px 24px rgba(37,99,235,0.18), 0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {inner[id]}
    </div>
  );
}

// ─── Fleet data for the real-UI reveal ────────────────────────────────────────
const fleet = [
  { name: 'Ibrahim Sales 31280', speed: 'Moving - 95 KM/H',  time: '18:15', dot: '#22c55e' },
  { name: 'George Delivery 056', speed: 'Idle',               time: '18:12', dot: '#f59e0b' },
  { name: 'Ahmed Tech 49876',    speed: 'Moving - 55 KM/H',  time: '18:09', dot: '#22c55e' },
  { name: 'Jamal Fleet 77421',   speed: 'Stopped',            time: '17:58', dot: '#ef4444' },
  { name: 'David Oman 20378',    speed: 'Moving - 36 KM/H',  time: '17:52', dot: '#22c55e' },
];

export default forwardRef(function SceneGPS(_props, ref) {
  const activeRefs  = useRef([]);
  const lineRefs    = useRef([]);
  const phoneOutRef = useRef(null);
  const wireRefs    = useRef([]);
  const wireGrpRef  = useRef(null);
  const maskRef     = useRef(null);
  const shellRef    = useRef(null);
  const skelRef     = useRef(null);
  const realRef     = useRef(null);
  const rowRefs     = useRef([]);
  const allTweens   = useRef([]);
  const hoverTl     = useRef(null);
  const isHovered   = useRef(false);
  const outerRef    = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      if (!w) return;
      setScale(Math.min(1, w / W));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => () => allTweens.current.forEach(t => t?.kill()), []);

  const stop = () => {
    allTweens.current.forEach(t => t?.kill());
    allTweens.current = [];
    hoverTl.current?.kill();
    hoverTl.current = null;
  };

  const resetIconsAndLines = () => {
    gsap.set(activeRefs.current.filter(Boolean), { opacity: 0 });
    gsap.set(lineRefs.current.filter(Boolean),   { opacity: 0 });
  };

  const play = () => {
    stop();
    resetIconsAndLines();
    gsap.set(maskRef.current,     { opacity: 0 });
    gsap.set(wireGrpRef.current,  { opacity: 0 });
    gsap.set(phoneOutRef.current, { opacity: 0, strokeDashoffset: PHONE_PERIM });
    gsap.set(shellRef.current,    { opacity: 0 });
    gsap.set(skelRef.current,     { opacity: 0 });
    gsap.set(realRef.current,     { opacity: 0 });
    gsap.set(rowRefs.current.filter(Boolean), { opacity: 0, x: -6 });
    wireRefs.current.forEach(p => {
      if (!p) return;
      const len = (() => { try { return p.getTotalLength(); } catch { return 400; } })();
      gsap.set(p, { strokeDasharray: `${len} ${len + 1}`, strokeDashoffset: len, opacity: 0 });
    });

    const tl = gsap.timeline();
    allTweens.current.push(tl);

    const CYCLE = 1.0;
    CONNECTIONS.forEach((_, i) => {
      const at   = i * CYCLE;
      const [ia, ib] = PAIRS[i];
      const elA  = activeRefs.current[ia];
      const elB  = activeRefs.current[ib];
      const line = lineRefs.current[i];
      const offAt = at + CYCLE - 0.20;
      const nextPair = PAIRS[i + 1] || [];

      if (elA) tl.to(elA, { opacity: 1, duration: 0.18, ease: 'power2.out' }, at);
      if (elB) tl.to(elB, { opacity: 1, duration: 0.18, ease: 'power2.out' }, at);
      if (line) tl.to(line, { opacity: 1, duration: 0.22, ease: 'power2.out' }, at + 0.14);
      if (line) tl.to(line, { opacity: 0, duration: 0.20, ease: 'power1.in' }, offAt);
      if (elA && !nextPair.includes(ia)) tl.to(elA, { opacity: 0, duration: 0.18 }, offAt);
      if (elB && !nextPair.includes(ib)) tl.to(elB, { opacity: 0, duration: 0.18 }, offAt);
    });

    const phoneAt = CONNECTIONS.length * CYCLE + 0.10;

    tl.to(maskRef.current, { opacity: 1, duration: 0.32, ease: 'power2.out' }, phoneAt);
    const centerEls = ICONS.map((ic, i) => ic.layer === 'center' ? activeRefs.current[i] : null).filter(Boolean);
    if (centerEls.length) tl.to(centerEls, { opacity: 0, duration: 0.28 }, phoneAt);
    tl.to(phoneOutRef.current, { opacity: 1, duration: 0.10 }, phoneAt + 0.05);
    tl.to(phoneOutRef.current, { strokeDashoffset: 0, duration: 1.10, ease: 'power2.inOut' }, phoneAt + 0.12);

    const wireAt = phoneAt + 1.15;
    tl.to(wireGrpRef.current, { opacity: 1, duration: 0.08 }, wireAt);
    wireRefs.current.forEach((p, i) => {
      if (!p) return;
      tl.to(p, { opacity: 1, strokeDashoffset: 0, duration: 0.16, ease: 'power1.out' }, wireAt + 0.06 + i * 0.04);
    });

    const shellAt = wireAt + 0.90;
    tl.to(maskRef.current,     { opacity: 0, duration: 0.30, ease: 'power2.in'  }, shellAt);
    tl.to(shellRef.current,    { opacity: 1, duration: 0.38                    }, shellAt - 0.05);
    tl.to(skelRef.current,     { opacity: 1, duration: 0.24                    }, shellAt + 0.06);
    tl.to(wireGrpRef.current,  { opacity: 0, duration: 0.26                    }, shellAt + 0.08);
    tl.to(phoneOutRef.current, { opacity: 0, duration: 0.28                    }, shellAt + 0.10);
    tl.to(lineRefs.current.filter(Boolean), { opacity: 0, duration: 0.24       }, shellAt);
    tl.to(skelRef.current,     { opacity: 0, duration: 0.32                    }, shellAt + 0.70);
    tl.to(realRef.current,     { opacity: 1, duration: 0.36                    }, shellAt + 0.72);
    tl.to(rowRefs.current.filter(Boolean), { opacity: 1, x: 0, duration: 0.30, ease: 'power2.out', stagger: 0.06 }, shellAt + 0.82);

    const loopAt = shellAt + 0.82 + 0.36 + 2.0;
    tl.to(shellRef.current, { opacity: 0, duration: 0.45, ease: 'power2.in' }, loopAt);
    tl.to(realRef.current,  { opacity: 0, duration: 0.35, ease: 'power2.in' }, loopAt + 0.05);
    tl.add(() => { if (!isHovered.current) play(); }, loopAt + 0.55);
  };

  const handleHover = (iconIdx) => {
    if (isHovered.current) return;
    isHovered.current = true;
    allTweens.current.forEach(t => t?.pause?.());
    resetIconsAndLines();
    const connIdx = PAIRS.findIndex(p => p.includes(iconIdx));
    if (connIdx < 0) return;
    hoverTl.current = gsap.timeline();
    PAIRS[connIdx].forEach(idx => {
      const el = activeRefs.current[idx];
      if (el) hoverTl.current.to(el, { opacity: 1, duration: 0.20, ease: 'power2.out' }, 0);
    });
    const line = lineRefs.current[connIdx];
    if (line) hoverTl.current.to(line, { opacity: 1, duration: 0.22, ease: 'power2.out' }, 0.10);
  };

  const handleHoverLeave = () => {
    if (!isHovered.current) return;
    isHovered.current = false;
    hoverTl.current?.kill();
    hoverTl.current = null;
    play();
  };

  let rIdx = 0;

  return (
    <div
      ref={el => {
        outerRef.current = el;
        if (el) { el.__play = play; el.__stop = stop; }
        if (typeof ref === 'function') ref(el); else if (ref) ref.current = el;
      }}
      style={{ position: 'relative', width: '100%', height: H * scale, overflow: 'hidden' }}
    >
    <div style={{
      position: 'absolute', top: 0, left: 0,
      width: W, height: H,
      transform: `scale(${scale})`, transformOrigin: 'top left',
    }}>
      <style>{CSS}</style>
      <GlobalDefs/>

      {/* z=0 — connection lines */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'visible' }}>
        {CONNECTIONS.map((d, i) => (
          <path key={i} ref={el => (lineRefs.current[i] = el)} d={d}
            stroke={`url(#fsgps_l${i})`} strokeWidth="1.7" fill="none"
            strokeLinecap="round" strokeLinejoin="round" opacity="0"/>
        ))}
      </svg>

      {/* z=2 — phone outline + wireframe strokes */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', overflow: 'visible' }}>
        <defs>
          <filter id="fsgps_pgl" x="-5%" y="-4%" width="110%" height="108%">
            <feGaussianBlur stdDeviation="1.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="fsgps_bgl" x="-6%" y="-6%" width="112%" height="112%">
            <feGaussianBlur stdDeviation="0.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <path ref={phoneOutRef} d={PHONE_PATH}
          stroke="url(#fsgps_ph)" strokeWidth="1.2" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={PHONE_PERIM} strokeDashoffset={PHONE_PERIM}
          filter="url(#fsgps_pgl)" opacity="0"/>
        <g ref={wireGrpRef} opacity="0">
          {WIRE.map((d, i) => (
            <path key={i} ref={r => (wireRefs.current[i] = r)} d={d}
              stroke="url(#fsgps_ph)" strokeWidth="0.7" fill="rgba(37,99,235,0.02)"
              strokeLinecap="round" strokeLinejoin="round" opacity="0" filter="url(#fsgps_bgl)"/>
          ))}
        </g>
      </svg>

      {/* Icon tiles */}
      {ICONS.map((ic, i) => (
        <div key={ic.id}
          style={{
            position: 'absolute', left: ic.left, top: ic.top,
            width: ic.size, height: ic.size,
            zIndex: ic.layer === 'center' ? 4 : 7,
            cursor: 'pointer',
          }}
          onMouseEnter={() => handleHover(i)}
          onMouseLeave={handleHoverLeave}
        >
          <InactiveCard id={ic.id} size={ic.size}/>
          <div ref={el => (activeRefs.current[i] = el)}
            style={{ position: 'absolute', inset: 0, opacity: 0, willChange: 'opacity' }}>
            <ActiveCard id={ic.id} size={ic.size}/>
          </div>
        </div>
      ))}

      {/* z=5 — phone mask (hides center icons when phone appears) */}
      <div ref={maskRef} style={{
        position: 'absolute', left: PHONE_X, top: PHONE_Y,
        width: PHONE_W, height: PHONE_H, borderRadius: PHONE_R,
        background: '#f5f7fa', zIndex: 5, opacity: 0, pointerEvents: 'none',
      }}/>

      {/* z=6 — phone shell */}
      <div ref={shellRef} style={{
        position: 'absolute', left: PHONE_X, top: PHONE_Y,
        width: PHONE_W, height: PHONE_H, borderRadius: PHONE_R,
        background: '#fff', overflow: 'hidden', opacity: 0, zIndex: 6,
        boxShadow: '0 8px 36px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.06)',
      }}>

        {/* Skeleton loading state */}
        <div ref={skelRef} style={{ position: 'absolute', inset: 0, opacity: 0, background: '#f8fafc' }}>
          <div style={{ height: 46, background: 'linear-gradient(90deg,#1d4ed8,#2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div style={{ width: 100, height: 9, borderRadius: 5, background: 'rgba(255,255,255,0.28)' }}/>
          </div>
          <div style={{ height: 120, background: '#dbeafe', position: 'relative' }}>
            <svg width="100%" height="120" viewBox={`0 0 ${PHONE_W} 120`} style={{ position: 'absolute', inset: 0 }}>
              <rect width={PHONE_W} height="120" fill="#bfdbfe"/>
              {[30,60,90].map(y => <line key={y} x1="0" y1={y} x2={PHONE_W} y2={y} stroke="#93c5fd" strokeWidth="0.6"/>)}
            </svg>
          </div>
          <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[0,1,2,3].map(j => (
              <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sk w={14} h={14} br={7} delay={j * 0.08}/>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <Sk w="70%" h={8} br={4} delay={j * 0.08}/>
                  <Sk w="44%" h={6} br={3} delay={j * 0.08 + 0.05}/>
                </div>
                <Sk w={28} h={7} br={4} delay={j * 0.08 + 0.10}/>
              </div>
            ))}
          </div>
        </div>

        {/* Real GPS app UI */}
        <div ref={realRef} style={{ position: 'absolute', inset: 0, opacity: 0, display: 'flex', flexDirection: 'column', background: '#fff' }}>
          {/* Status bar */}
          <div style={{ background: '#1d4ed8', padding: '3px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 7.5, fontWeight: 500 }}>9:41</span>
            <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                <path d="M1 3C2.5 1.2 7.5 1.2 9 3" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M2.5 4.5C3.5 3.5 6.5 3.5 7.5 4.5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                <circle cx="5" cy="6.2" r="0.9" fill="white"/>
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <div style={{ width: 14, height: 6, border: '1px solid rgba(255,255,255,0.8)', borderRadius: 1.5, padding: '1px', display: 'flex' }}>
                  <div style={{ width: '85%', height: '100%', background: '#4ade80', borderRadius: 0.5 }}/>
                </div>
              </div>
            </div>
          </div>
          {/* App header */}
          <div style={{ background: '#2563eb', padding: '7px 10px 5px', flexShrink: 0 }}>
            <div style={{ textAlign: 'center', marginBottom: 5 }}>
              <span style={{ color: '#fff', fontSize: 11.5, fontWeight: 700 }}>Fleet Tracker</span>
            </div>
            <div style={{ display: 'flex', gap: 3 }}>
              {['All','Moving','Idle','Stopped'].map((label, k) => (
                <div key={label} style={{ fontSize: 7.5, background: k === 0 ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.14)', borderRadius: 4, padding: '2px 7px', color: k === 0 ? '#2563eb' : 'rgba(255,255,255,0.85)', fontWeight: k === 0 ? 700 : 400 }}>
                  {label}
                </div>
              ))}
            </div>
          </div>
          {/* Mini map */}
          <div style={{ height: 110, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
            <svg width="100%" height="110" viewBox={`0 0 ${PHONE_W} 110`} style={{ display: 'block' }}>
              <rect width={PHONE_W} height="110" fill="#e8f0fe"/>
              {/* Road lines */}
              <rect x="0" y="46" width={PHONE_W} height="8" fill="#c7d2fe" opacity="0.6"/>
              <rect x="110" y="0" width="6" height="110" fill="#c7d2fe" opacity="0.5"/>
              <rect x="185" y="0" width="6" height="110" fill="#c7d2fe" opacity="0.5"/>
              {/* Dashed center line */}
              <line x1="0" y1="50" x2={PHONE_W} y2="50" stroke="white" strokeWidth="1" strokeDasharray="8 5"/>
              {/* Vehicle markers */}
              {[[65,34,'#22c55e'],[148,68,'#f59e0b'],[198,28,'#22c55e'],[220,80,'#ef4444']].map(([cx,cy,col],k) => (
                <g key={k}>
                  <circle cx={cx} cy={cy} r="7" fill={col} opacity="0.18"/>
                  <circle cx={cx} cy={cy} r="4.5" fill={col} stroke="white" strokeWidth="1.5"/>
                </g>
              ))}
              {/* Active popup */}
              <rect x="56" y="8" width="62" height="18" rx="3" fill="white" stroke="#e5e7eb" strokeWidth="0.7"/>
              <circle cx="64" cy="17" r="3.5" fill="#22c55e"/>
              <text x="70" y="15" fontSize="5.5" fill="#374151" fontWeight="700" fontFamily="sans-serif">Ibrahim</text>
              <text x="70" y="22" fontSize="5" fill="#6b7280" fontFamily="sans-serif">95 KM/H</text>
            </svg>
          </div>
          {/* Vehicle list */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {fleet.map((v, k) => (
              <div key={k} ref={el => (rowRefs.current[rIdx++] = el)}
                style={{ padding: '7px 12px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: 8, opacity: 0, willChange: 'opacity,transform' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: v.dot, flexShrink: 0 }}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.name}</div>
                  <div style={{ fontSize: 7.5, color: '#6b7280' }}>{v.speed}</div>
                </div>
                <span style={{ fontSize: 7, color: '#9ca3af', flexShrink: 0 }}>{v.time}</span>
              </div>
            ))}
          </div>
          {/* Search bar */}
          <div style={{ padding: '6px 10px', borderTop: '1px solid #f3f4f6', flexShrink: 0 }}>
            <div style={{ height: 22, borderRadius: 5, border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 5 }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><circle cx="3.5" cy="3.5" r="2.5" stroke="#9ca3af" strokeWidth="1"/><path d="M5.5 5.5l1.5 1.5" stroke="#9ca3af" strokeWidth="1" strokeLinecap="round"/></svg>
              <span style={{ fontSize: 7.5, color: '#d1d5db' }}>Search vehicles...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
});
