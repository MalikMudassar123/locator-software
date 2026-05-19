'use client';
import { forwardRef, useLayoutEffect, useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

// ─── Browser geometry (wider than SceneDashboard, dark theme) ─────────────────
const W = 540, H = 490;
const FX = 22, FY = 18, FW = 490, FH = 450, FR = 13;
const FX2 = FX + FW, FY2 = FY + FH;
const SBW = 158;
const FRAME_PERIM = Math.round(2 * (FW - FR * 2) + 2 * (FH - FR * 2) + 2 * Math.PI * FR);
const FRAME_PATH = `M${FX+FR} ${FY}H${FX2-FR}Q${FX2} ${FY} ${FX2} ${FY+FR}V${FY2-FR}Q${FX2} ${FY2} ${FX2-FR} ${FY2}H${FX+FR}Q${FX} ${FY2} ${FX} ${FY2-FR}V${FY+FR}Q${FX} ${FY} ${FX+FR} ${FY}Z`;

const CY   = FY + 34;
const CW   = FX2 - (FX + SBW);
const CH   = FY2 - CY;
const CellW = Math.floor((CW - 6) / 2);
const CellH = Math.floor((CH - 6) / 2);

function rp(x, y, w, h, r = 0) {
  if (!r) return `M${x} ${y}H${x+w}V${y+h}H${x}Z`;
  return `M${x+r} ${y}H${x+w-r}Q${x+w} ${y} ${x+w} ${y+r}V${y+h-r}Q${x+w} ${y+h} ${x+w-r} ${y+h}H${x+r}Q${x} ${y+h} ${x} ${y+h-r}V${y+r}Q${x} ${y} ${x+r} ${y}Z`;
}

const WIRE = [
  rp(FX+1,       CY,              SBW-2, FY2-CY, 0),
  rp(FX+3,       CY+2,            SBW-6, 27, 3),
  ...[0,1,2,3,4].map(i => rp(FX+3, CY+31+i*54, SBW-6, 46, 2)),
  rp(FX+3,       FY2-30,          SBW-6, 24, 4),
  rp(FX+SBW+2,   CY+2,            CellW, CellH, 5),
  rp(FX+SBW+2+CellW+4, CY+2,     CellW, CellH, 5),
  rp(FX+SBW+2,   CY+2+CellH+4,   CellW, CellH, 5),
  rp(FX+SBW+2+CellW+4, CY+2+CellH+4, CellW, CellH, 5),
];

// ─── Floating icons ────────────────────────────────────────────────────────────
const ICONS = [
  { id: 'cam',    left: 0,   top: 62,  size: 68, layer: 'outer'  }, // 0
  { id: 'radar',  left: 0,   top: 280, size: 68, layer: 'outer'  }, // 1
  { id: 'ai',     left: 464, top: 50,  size: 68, layer: 'outer'  }, // 2
  { id: 'play',   left: 78,  top: 158, size: 62, layer: 'center' }, // 3
  { id: 'detect', left: 290, top: 268, size: 62, layer: 'center' }, // 4
];

const CONNECTIONS = [
  'M 34 62 C 34 36 484 36 498 84',
  'M 34 130 L 34 280',
  'M 68 314 L 290 314 C 321 314 321 301 321 299',
];
const PAIRS = [[0,2],[0,1],[1,4]];

const CSS = `@keyframes fsvid_shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`;

function GlobalDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }}>
      <defs>
        <linearGradient id="fsvid_cam"    x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0891b2"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient>
        <linearGradient id="fsvid_radar"  x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0369a1"/><stop offset="100%" stopColor="#0ea5e9"/></linearGradient>
        <linearGradient id="fsvid_ai"     x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#06b6d4"/><stop offset="100%" stopColor="#67e8f9"/></linearGradient>
        <linearGradient id="fsvid_play"   x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0891b2"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient>
        <linearGradient id="fsvid_detect" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#fbbf24"/></linearGradient>
        <linearGradient id="fsvid_l0" x1="34" y1="62" x2="498" y2="84" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#06b6d4"/><stop offset="100%" stopColor="#67e8f9"/></linearGradient>
        <linearGradient id="fsvid_l1" x1="34" y1="130" x2="34" y2="280" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#0891b2"/><stop offset="100%" stopColor="#0ea5e9"/></linearGradient>
        <linearGradient id="fsvid_l2" x1="68" y1="314" x2="321" y2="299" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#0369a1"/><stop offset="100%" stopColor="#f59e0b"/></linearGradient>
        <linearGradient id="fsvid_ph" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#06b6d4"/><stop offset="100%" stopColor="#0891b2"/></linearGradient>
      </defs>
    </svg>
  );
}

function InactiveCard({ id, size }) {
  const r = Math.round(size * 0.24);
  const s = Math.round(size * 0.50);
  const c = '#c8d0dc';
  const shapes = {
    cam:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="15" height="14" rx="2" stroke={c} strokeWidth="1.5"/><path d="M17 9l5-3v12l-5-3V9z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/></svg>,
    radar:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2" stroke={c} strokeWidth="1.5"/><circle cx="12" cy="12" r="6" stroke={c} strokeWidth="1"/><circle cx="12" cy="12" r="10" stroke={c} strokeWidth="0.8"/><line x1="12" y1="12" x2="20" y2="6" stroke={c} strokeWidth="1.3" strokeLinecap="round" opacity="0.6"/></svg>,
    ai:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.5"/><path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>,
    play:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="15" height="14" rx="2" stroke={c} strokeWidth="1.5"/><path d="M17 9l5-3v12l-5-3V9z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><polygon points="8,9 8,15 14,12" stroke={c} strokeWidth="1" fill="none"/></svg>,
    detect: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 3H3v2M19 3h2v2M5 21H3v-2M19 21h2v-2" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><rect x="7" y="7" width="10" height="10" rx="1" stroke={c} strokeWidth="1.3" strokeDasharray="2 1.5"/><circle cx="12" cy="12" r="2" stroke={c} strokeWidth="1.2"/></svg>,
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
    cam:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="15" height="14" rx="2" fill="url(#fsvid_cam)"/><path d="M17 9l5-3v12l-5-3V9z" fill="url(#fsvid_cam)"/></svg>,
    radar:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2" fill="url(#fsvid_radar)"/><circle cx="12" cy="12" r="6" stroke="url(#fsvid_radar)" strokeWidth="1.2"/><circle cx="12" cy="12" r="10" stroke="url(#fsvid_radar)" strokeWidth="0.8" opacity="0.5"/><line x1="12" y1="12" x2="20" y2="6" stroke="url(#fsvid_radar)" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/></svg>,
    ai:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" fill="url(#fsvid_ai)"/><path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="url(#fsvid_ai)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    play:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="15" height="14" rx="2" fill="url(#fsvid_play)"/><path d="M17 9l5-3v12l-5-3V9z" fill="url(#fsvid_play)"/><polygon points="8,9 8,15 14,12" fill="white" opacity="0.85"/></svg>,
    detect: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 3H3v2M19 3h2v2M5 21H3v-2M19 21h2v-2" stroke="url(#fsvid_detect)" strokeWidth="1.8" strokeLinecap="round"/><rect x="7" y="7" width="10" height="10" rx="1" stroke="url(#fsvid_detect)" strokeWidth="1.5" strokeDasharray="2.5 1.5"/><circle cx="12" cy="12" r="2" fill="url(#fsvid_detect)"/></svg>,
  };
  return (
    <div style={{ width: size, height: size, borderRadius: r, background: '#fff', boxShadow: '0 6px 24px rgba(8,145,178,0.20), 0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {inner[id]}
    </div>
  );
}

function RoadCam({ sky = '#7ba8c8' }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 140 90" style={{ display: 'block' }}>
      <rect width="140" height="90" fill={sky}/>
      <path d="M0 50 Q35 42 70 48 Q105 54 140 44 L140 90 L0 90 Z" fill="#7ab648" opacity="0.4"/>
      <rect x="0" y="58" width="140" height="32" fill="#555e6d"/>
      <path d="M38 90 L60 52 L80 52 L102 90 Z" fill="#6b7280"/>
      <line x1="70" y1="90" x2="68" y2="64" stroke="white" strokeWidth="1.5" strokeDasharray="3 2"/>
      {/* AI detection box */}
      <rect x="52" y="36" width="36" height="30" rx="1.5" stroke="#facc15" strokeWidth="1.2" fill="none" strokeDasharray="3 2"/>
      <text x="70" y="34" textAnchor="middle" fontSize="5" fill="#facc15" fontFamily="sans-serif" fontWeight="bold">DRIVER</text>
    </svg>
  );
}

function CabinCam({ drowsy = false }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 140 90" style={{ display: 'block' }}>
      <rect width="140" height="90" fill="#1e293b"/>
      <ellipse cx="70" cy="45" rx="30" ry="32" fill="#334155" opacity="0.7"/>
      {/* Face outline */}
      <ellipse cx="70" cy="38" rx="16" ry="18" fill="#475569" opacity="0.8"/>
      {/* Eyes */}
      <ellipse cx="63" cy="36" rx="3.5" ry={drowsy ? 1 : 3} fill={drowsy ? '#ef4444' : 'white'}/>
      <ellipse cx="77" cy="36" rx="3.5" ry={drowsy ? 1 : 3} fill={drowsy ? '#ef4444' : 'white'}/>
      {/* Alert overlay */}
      {drowsy && (
        <>
          <rect x="0" y="0" width="140" height="90" fill="rgba(239,68,68,0.12)"/>
          <text x="70" y="72" textAnchor="middle" fontSize="5.5" fill="#ef4444" fontFamily="sans-serif" fontWeight="bold">⚠ DROWSY ALERT</text>
        </>
      )}
      <text x="70" y="82" textAnchor="middle" fontSize="4.5" fill="rgba(255,255,255,0.4)" fontFamily="sans-serif">AI MONITORING</text>
    </svg>
  );
}

const drivers = [
  { name: 'Driver 1', speed: 'Moving - 55 KM/H',  time: '18:15', active: true  },
  { name: 'Driver 2', speed: 'Moving - 72 KM/H',  time: '18:18'                },
  { name: 'Driver 3', speed: 'Moving - 38 KM/H',  time: '18:09'                },
  { name: 'Driver 4', speed: 'Idle',               time: '18:01'                },
  { name: 'Driver 5', speed: 'Moving - 90 KM/H',  time: '17:55'                },
];

const cameras = [
  { label: 'Channel 1 — Road',   type: 'road',  sky: '#7ba8c8' },
  { label: 'Channel 2 — Road',   type: 'road',  sky: '#8ab4d0' },
  { label: 'Channel 3 — Cabin',  type: 'cabin', drowsy: true   },
  { label: 'Channel 4 — Cabin',  type: 'cabin', drowsy: false  },
];

export default forwardRef(function SceneVideo(_props, ref) {
  const activeRefs   = useRef([]);
  const lineRefs     = useRef([]);
  const framePathRef = useRef(null);
  const wireRefs     = useRef([]);
  const maskRef      = useRef(null);
  const shellRef     = useRef(null);
  const skelRef      = useRef(null);
  const revealRef    = useRef(null);
  const rowRefs      = useRef([]);
  const camRefs      = useRef([]);
  const allTweens    = useRef([]);
  const hoverTl      = useRef(null);
  const isHovered    = useRef(false);
  const outerRef     = useRef(null);
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
    gsap.set(maskRef.current,      { opacity: 0 });
    gsap.set(framePathRef.current, { opacity: 0, strokeDashoffset: FRAME_PERIM });
    gsap.set(shellRef.current,     { opacity: 0 });
    gsap.set(skelRef.current,      { opacity: 0 });
    gsap.set(revealRef.current,    { opacity: 0 });
    gsap.set(rowRefs.current.filter(Boolean), { opacity: 0, x: -6 });
    gsap.set(camRefs.current.filter(Boolean), { opacity: 0, scale: 0.94 });
    wireRefs.current.forEach(el => {
      if (!el) return;
      const len = (() => { try { return el.getTotalLength(); } catch { return 400; } })();
      gsap.set(el, { strokeDasharray: `${len} ${len + 1}`, strokeDashoffset: len, opacity: 0 });
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

    const frameAt = CONNECTIONS.length * CYCLE + 0.10;

    tl.to(maskRef.current, { opacity: 1, duration: 0.32, ease: 'power2.out' }, frameAt);
    const centerEls = ICONS.map((ic, i) => ic.layer === 'center' ? activeRefs.current[i] : null).filter(Boolean);
    if (centerEls.length) tl.to(centerEls, { opacity: 0, duration: 0.28 }, frameAt);
    tl.to(framePathRef.current, { opacity: 1, duration: 0.10 }, frameAt + 0.05);
    tl.to(framePathRef.current, { strokeDashoffset: 0, duration: 1.10, ease: 'power2.inOut' }, frameAt + 0.12);

    const wireAt = frameAt + 1.15;
    wireRefs.current.forEach((p, i) => {
      if (!p) return;
      tl.to(p, { opacity: 1, strokeDashoffset: 0, duration: 0.16, ease: 'power1.out' }, wireAt + 0.06 + i * 0.04);
    });

    const shellAt = wireAt + 0.90;
    tl.to(maskRef.current,                       { opacity: 0, duration: 0.30, ease: 'power2.in'  }, shellAt);
    tl.to(shellRef.current,                      { opacity: 1, duration: 0.38                    }, shellAt - 0.05);
    tl.to(skelRef.current,                       { opacity: 1, duration: 0.24                    }, shellAt + 0.06);
    wireRefs.current.forEach(el => el && tl.to(el, { opacity: 0, duration: 0.26 }, shellAt + 0.08));
    tl.to(framePathRef.current,                  { opacity: 0, duration: 0.28                    }, shellAt + 0.10);
    tl.to(lineRefs.current.filter(Boolean),      { opacity: 0, duration: 0.24                    }, shellAt);
    tl.to(skelRef.current,                       { opacity: 0, duration: 0.32                    }, shellAt + 0.70);
    tl.to(revealRef.current,                     { opacity: 1, duration: 0.36                    }, shellAt + 0.72);
    tl.to(rowRefs.current.filter(Boolean), { opacity: 1, x: 0, duration: 0.28, ease: 'power2.out', stagger: 0.05 }, shellAt + 0.82);
    tl.to(camRefs.current.filter(Boolean), { opacity: 1, scale: 1, duration: 0.36, ease: 'power2.out', stagger: 0.08 }, shellAt + 0.95);

    const loopAt = shellAt + 0.95 + 0.36 + 0.24 + 2.0;
    tl.to(shellRef.current,                   { opacity: 0, duration: 0.45, ease: 'power2.in' }, loopAt);
    tl.to(revealRef.current,                  { opacity: 0, duration: 0.35, ease: 'power2.in' }, loopAt + 0.05);
    tl.to(activeRefs.current.filter(Boolean), { opacity: 0, duration: 0.30                    }, loopAt + 0.10);
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

  let rIdx = 0, cIdx = 0;

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
            stroke={`url(#fsvid_l${i})`} strokeWidth="1.7" fill="none"
            strokeLinecap="round" strokeLinejoin="round" opacity="0"/>
        ))}
      </svg>

      {/* z=2 — frame outline + wireframe */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', overflow: 'visible' }}>
        <defs>
          <filter id="fsvid_pgl" x="-5%" y="-4%" width="110%" height="108%">
            <feGaussianBlur stdDeviation="1.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="fsvid_bgl" x="-6%" y="-6%" width="112%" height="112%">
            <feGaussianBlur stdDeviation="0.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <path ref={framePathRef} d={FRAME_PATH}
          stroke="url(#fsvid_ph)" strokeWidth="1.2" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={FRAME_PERIM} strokeDashoffset={FRAME_PERIM}
          filter="url(#fsvid_pgl)" opacity="0"/>
        {WIRE.map((d, i) => (
          <path key={i} ref={r => (wireRefs.current[i] = r)} d={d}
            stroke="url(#fsvid_ph)" strokeWidth="0.7" fill="rgba(6,182,212,0.02)"
            strokeLinecap="round" strokeLinejoin="round" opacity="0" filter="url(#fsvid_bgl)"/>
        ))}
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

      {/* z=5 mask */}
      <div ref={maskRef} style={{
        position: 'absolute', left: FX, top: FY, width: FW, height: FH, borderRadius: FR,
        background: '#f5f7fa', zIndex: 5, opacity: 0, pointerEvents: 'none',
      }}/>

      {/* z=6 dark browser shell */}
      <div ref={shellRef} style={{
        position: 'absolute', left: FX, top: FY, width: FW, height: FH, borderRadius: FR,
        background: '#0f172a', boxShadow: '0 6px 28px rgba(0,0,0,0.22)',
        overflow: 'hidden', opacity: 0, zIndex: 6,
      }}>
        {/* Browser chrome — dark */}
        <div style={{ height: 34, background: '#1e293b', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 6 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: ['#f87171','#fbbf24','#4ade80'][i] }}/>)}
          <div style={{ flex: 1, height: 19, borderRadius: 4, background: '#334155', margin: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 8.5, color: '#64748b' }}>pro.mylocatorplus.com/video</span>
          </div>
        </div>

        {/* Skeleton */}
        <div ref={skelRef} style={{ position: 'absolute', inset: '34px 0 0 0', display: 'flex', background: '#1e293b', opacity: 0 }}>
          <div style={{ width: SBW, borderRight: '1px solid #334155', padding: 8, display: 'flex', flexDirection: 'column', gap: 7 }}>
            {[0,1,2,3,4].map(j => (
              <div key={j} style={{ height: 44, borderRadius: 4, background: 'linear-gradient(90deg,#334155 25%,#3e5064 50%,#334155 75%)', backgroundSize: '200%', animation: `fsvid_shimmer 1.4s ease-in-out ${j*0.09}s infinite` }}/>
            ))}
          </div>
          <div style={{ flex: 1, padding: 5, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 5 }}>
            {[0,1,2,3].map(j => (
              <div key={j} style={{ borderRadius: 5, background: '#334155' }}>
                <div style={{ padding: '5px 7px', fontSize: 7, color: '#475569' }}>Camera Ch-{j+1}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Real video UI */}
        <div ref={revealRef} style={{ position: 'absolute', inset: '34px 0 0 0', display: 'flex', opacity: 0 }}>
          {/* Sidebar */}
          <div style={{ width: SBW, borderRight: '1px solid #1e3a5f', display: 'flex', flexDirection: 'column', background: '#0f172a' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid #1e3a5f', padding: '5px 4px 0', gap: 1 }}>
              {[{l:'5',s:'All',a:true},{l:'3',s:'Live'},{l:'1',s:'Alert'}].map(tab => (
                <div key={tab.l} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3px 1px 5px', borderBottom: tab.a ? '2px solid #06b6d4' : '2px solid transparent' }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: tab.a ? '#06b6d4' : '#64748b' }}>{tab.l}</span>
                  <span style={{ fontSize: 5.5, color: tab.a ? '#67e8f9' : '#475569' }}>{tab.s}</span>
                </div>
              ))}
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              {drivers.map(d => (
                <div key={d.name} ref={el => (rowRefs.current[rIdx++] = el)}
                  style={{ padding: '7px 8px', borderBottom: '1px solid #1e3a5f', background: d.active ? '#1e3a5f' : 'transparent', opacity: 0, willChange: 'opacity,transform' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }}/>
                    <span style={{ fontSize: 8.5, fontWeight: 700, color: d.active ? '#e2e8f0' : '#94a3b8' }}>{d.name}</span>
                  </div>
                  <span style={{ fontSize: 6.5, color: '#64748b', display: 'block', paddingLeft: 10 }}>{d.speed}</span>
                  <span style={{ fontSize: 6, color: '#475569', display: 'block', paddingLeft: 10 }}>{d.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Camera grid */}
          <div style={{ flex: 1, background: '#1e293b', padding: 5, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 5 }}>
            {cameras.map((cam, i) => (
              <div key={i} ref={el => (camRefs.current[cIdx++] = el)}
                style={{ borderRadius: 5, overflow: 'hidden', position: 'relative', opacity: 0, willChange: 'opacity,transform' }}>
                {/* Camera label */}
                <div style={{ position: 'absolute', top: 4, left: 6, right: 6, display: 'flex', justifyContent: 'space-between', zIndex: 2 }}>
                  <span style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{cam.label}</span>
                  <div style={{ display: 'flex', gap: 3 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#ef4444' }}/>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#475569' }}/>
                  </div>
                </div>
                {cam.type === 'road'  && <RoadCam sky={cam.sky}/>}
                {cam.type === 'cabin' && <CabinCam drowsy={cam.drowsy}/>}
                <div style={{ position: 'absolute', bottom: 3, left: 5, fontSize: 5, color: 'rgba(255,255,255,0.4)' }}>LIVE</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
});
