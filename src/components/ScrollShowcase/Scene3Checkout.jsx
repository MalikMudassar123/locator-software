'use client';
import { forwardRef, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const W = 540, H = 490;
const FX = 72, FY = 18, FW = 416, FH = 450, FR = 13;
const FX2 = FX + FW, FY2 = FY + FH;
const SBW = 170;
const FRAME_PERIM = Math.round(2*(FW-FR*2) + 2*(FH-FR*2) + 2*Math.PI*FR);
const FRAME_PATH = `M${FX+FR} ${FY}H${FX2-FR}Q${FX2} ${FY} ${FX2} ${FY+FR}V${FY2-FR}Q${FX2} ${FY2} ${FX2-FR} ${FY2}H${FX+FR}Q${FX} ${FY2} ${FX} ${FY2-FR}V${FY+FR}Q${FX} ${FY} ${FX+FR} ${FY}Z`;

const CY = FY + 34;
const CW = FX2 - (FX + SBW);
const CH = FY2 - CY;
const CellW = Math.floor((CW - 6) / 2);
const CellH = Math.floor((CH - 6) / 2);

function rp(x, y, w, h, r = 0) {
  if (!r) return `M${x} ${y}H${x+w}V${y+h}H${x}Z`;
  return `M${x+r} ${y}H${x+w-r}Q${x+w} ${y} ${x+w} ${y+r}V${y+h-r}Q${x+w} ${y+h} ${x+w-r} ${y+h}H${x+r}Q${x} ${y+h} ${x} ${y+h-r}V${y+r}Q${x} ${y} ${x+r} ${y}Z`;
}

const WIRE = [
  rp(FX+1, CY, SBW-2, FY2-CY, 0),
  rp(FX+3, CY+2, SBW-6, 27, 3),
  rp(FX+3, CY+31, SBW-6, 52, 2),
  rp(FX+3, CY+85, SBW-6, 52, 2),
  rp(FX+3, CY+139, SBW-6, 52, 2),
  rp(FX+3, CY+193, SBW-6, 52, 2),
  rp(FX+3, CY+247, SBW-6, 52, 2),
  rp(FX+3, FY2-30, SBW-6, 24, 4),
  rp(FX+SBW+2, CY+2, CellW, CellH, 5),
  rp(FX+SBW+2+CellW+4, CY+2, CellW, CellH, 5),
  rp(FX+SBW+2, CY+2+CellH+4, CellW, CellH, 5),
  rp(FX+SBW+2+CellW+4, CY+2+CellH+4, CellW, CellH, 5),
];

const ICONS = [
  { id:'cam',    left:5,   top:67,  size:58, layer:'outer' }, // 0
  { id:'shield', left:5,   top:285, size:58, layer:'outer' }, // 1
  { id:'ai',     left:469, top:55,  size:58, layer:'outer' }, // 2
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const CONNECTIONS = [
  'M 63 96 L 22 96',                                        // 0: cam right → frame left (horizontal)
  'M 34 67 C 34 40 120 18 220 18',                          // 1: cam top → frame top (arc)
  'M 63 314 C 40 314 22 314 22 340',                        // 2: shield right → frame left lower (L)
  'M 469 84 C 512 84 512 55 512 30',                        // 3: ai left → frame right upper (L)
  'M 34 67 C 34 36 469 36 469 55',                          // 4: cam top → ai top (arc over frame)
];

const PAIRS = [[0],[0],[1],[2],[0,2]];

const GROUPS = [
  [4],      // cam→ai arc (both icons activate)
  [0, 2],   // cam→frame left + shield→frame lower (two lines)
  [1],      // cam→frame top
  [3],      // ai→frame right upper
  [2, 3],   // shield→frame lower + ai→frame right
];

const CSS = `@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`;

function GlobalDefs() {
  return (
    <svg width="0" height="0" style={{ position:'absolute', overflow:'hidden' }}>
      <defs>
        <linearGradient id="s3ig_cam"    x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient>
        <linearGradient id="s3ig_shield" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient>
        <linearGradient id="s3ig_ai"     x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient>
        <linearGradient id="s3ig_play"   x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient>
        <linearGradient id="s3ig_alert"  x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ef4444"/></linearGradient>
        <linearGradient id="s3lg0" x1="63" y1="96" x2="22" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#3b82f6"/>
        </linearGradient>
        <linearGradient id="s3lg1" x1="34" y1="67" x2="220" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
        <linearGradient id="s3lg2" x1="63" y1="314" x2="22" y2="340" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#6366f1"/>
        </linearGradient>
        <linearGradient id="s3lg3" x1="469" y1="84" x2="512" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
        <linearGradient id="s3lg4" x1="34" y1="67" x2="469" y2="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f472b6"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
        <linearGradient id="s3pg_w" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
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
    shield: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    ai:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.5"/><path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>,
    play:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="15" height="14" rx="2" stroke={c} strokeWidth="1.5"/><path d="M17 9l5-3v12l-5-3V9z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><circle cx="9.5" cy="12" r="2.5" stroke={c} strokeWidth="1.2"/></svg>,
    alert:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={c} strokeWidth="1.5"/><path d="M12 8v4M12 16h.01" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  };
  return (
    <div style={{ width:size, height:size, borderRadius:r, background:'#f8fafc', border:'1.5px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'center' }}>
      {shapes[id]}
    </div>
  );
}

function ActiveCard({ id, size }) {
  const r = Math.round(size * 0.24);
  const s = Math.round(size * 0.52);
  const inner = {
    cam:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="15" height="14" rx="2" fill="url(#s3ig_cam)"/><path d="M17 9l5-3v12l-5-3V9z" fill="url(#s3ig_cam)"/></svg>,
    shield: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="url(#s3ig_shield)"/><path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    ai:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" fill="url(#s3ig_ai)"/><path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="url(#s3ig_ai)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    play:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="15" height="14" rx="2" fill="url(#s3ig_play)"/><path d="M17 9l5-3v12l-5-3V9z" fill="url(#s3ig_play)"/><circle cx="9.5" cy="12" r="2.5" fill="white"/></svg>,
    alert:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="url(#s3ig_alert)"/><path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  };
  return (
    <div style={{ width:size, height:size, borderRadius:r, background:'#fff', boxShadow:'0 6px 24px rgba(99,102,241,0.18), 0 2px 8px rgba(0,0,0,0.06)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      {inner[id]}
    </div>
  );
}

function RoadCam({ sky = '#87ceeb', style = {} }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 120 80" style={{ display:'block', ...style }}>
      <rect width="120" height="80" fill={sky}/>
      <path d="M0 45 Q30 36 60 42 Q90 48 120 38 L120 80 L0 80 Z" fill="#7ab648" opacity="0.45"/>
      <rect x="0" y="52" width="120" height="28" fill="#555e6d"/>
      <path d="M30 80 L52 46 L68 46 L90 80 Z" fill="#6b7280"/>
      <line x1="60" y1="80" x2="57" y2="58" stroke="white" strokeWidth="1.5" strokeDasharray="3 2"/>
    </svg>
  );
}

function CabinCam({ style = {} }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 120 80" style={{ display:'block', ...style }}>
      <rect width="120" height="80" fill="#1e293b"/>
      <path d="M15 30 L30 15 L90 15 L105 30 L105 55 L15 55 Z" fill="#374151" opacity="0.6"/>
      <ellipse cx="60" cy="72" rx="18" ry="10" fill="#0f172a"/>
      <circle cx="60" cy="61" r="8" fill="#1e293b"/>
      <rect x="43" y="57" width="34" height="6" rx="3" fill="#374151"/>
    </svg>
  );
}

const drivers = [
  { name:'Driver 1', speed:'Moving - 55.00 KM/Hr', time:'06/01/2026 18:15:48', active:true },
  { name:'Driver 2', speed:'Moving - 55.00 KM/hr', time:'06/06/2026 18:18:48' },
  { name:'Driver 3', speed:'Moving - 55.00 KM/hr', time:'06/06/2026 18:18:48' },
  { name:'Driver 4', speed:'Moving - 55.00 KM/hr', time:'06/06/2026 18:15:48' },
  { name:'Driver 5', speed:'Moving - 90.00 KM/hr', time:'06/06/2026 15:01:08' },
];

export default forwardRef(function Scene3Checkout(_props, ref) {
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
  const hasRevealed  = useRef(false);
  const linesRef     = useRef(null);

  useLayoutEffect(() => () => allTweens.current.forEach(t => t?.kill()), []);

  const stop = () => {
    allTweens.current.forEach(t => t?.kill());
    allTweens.current = [];
    hoverTl.current?.kill();
    hoverTl.current = null;
    hasRevealed.current = false;
    if (linesRef.current) gsap.set(linesRef.current, { zIndex: 0 });
  };

  const resetIconsAndLines = () => {
    gsap.set(activeRefs.current.filter(Boolean), { opacity:0 });
    gsap.set(lineRefs.current.filter(Boolean),   { opacity:0 });
  };

  const playConnections = () => {
    allTweens.current.forEach(t => t?.kill());
    allTweens.current = [];
    resetIconsAndLines();
    if (linesRef.current) gsap.set(linesRef.current, { zIndex: 0 });
    const tl = gsap.timeline();
    allTweens.current.push(tl);
    const CYCLE = 1.2;
    const shuffled = shuffle(GROUPS);
    let t = 0;
    shuffled.forEach((group, gi) => {
      const iconIndices = [...new Set(group.flatMap(ci => PAIRS[ci]))];
      const nextGroup = shuffled[gi + 1] || [];
      const nextIconSet = new Set(nextGroup.flatMap(ci => PAIRS[ci]));
      const offAt = t + CYCLE - 0.22;
      iconIndices.forEach(idx => {
        const el = activeRefs.current[idx];
        if (el) tl.to(el, { opacity:1, duration:0.20, ease:'power2.out' }, t);
      });
      group.forEach(ci => {
        const line = lineRefs.current[ci];
        if (line) tl.to(line, { opacity:1, duration:0.24, ease:'power2.out' }, t + 0.14);
      });
      group.forEach(ci => {
        const line = lineRefs.current[ci];
        if (line) tl.to(line, { opacity:0, duration:0.22, ease:'power1.in' }, offAt);
      });
      iconIndices.forEach(idx => {
        if (!nextIconSet.has(idx)) {
          const el = activeRefs.current[idx];
          if (el) tl.to(el, { opacity:0, duration:0.20 }, offAt);
        }
      });
      t += CYCLE;
    });
    tl.add(() => { if (!isHovered.current) playConnections(); }, t + 0.5);
  };

  const play = () => {
    stop();
    resetIconsAndLines();
    if (linesRef.current) gsap.set(linesRef.current, { zIndex: 0 });
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
      gsap.set(el, { strokeDasharray: `${len} ${len+1}`, strokeDashoffset: len, opacity: 0 });
    });

    const tl = gsap.timeline();
    allTweens.current.push(tl);

    // Frame path draws in first
    tl.to(framePathRef.current, { opacity: 1, duration: 0.10 }, 0);
    tl.to(framePathRef.current, { strokeDashoffset: 0, duration: 0.82, ease: 'power2.inOut' }, 0.08);

    // Wireframe structure builds progressively
    const wireAt = 0.26;
    wireRefs.current.forEach((p, i) => {
      if (!p) return;
      tl.to(p, { opacity: 1, strokeDashoffset: 0, duration: 0.16, ease: 'power1.out' }, wireAt + 0.04 + i * 0.040);
    });

    // Shell + skeleton crossfade
    const shellAt = 1.22;
    tl.to(maskRef.current,     { opacity: 1, duration: 0.28, ease: 'power2.out' }, shellAt);
    tl.to(shellRef.current,    { opacity: 1, duration: 0.36 }, shellAt - 0.05);
    tl.to(skelRef.current,     { opacity: 1, duration: 0.24 }, shellAt + 0.06);
    wireRefs.current.forEach(el => el && tl.to(el, { opacity: 0, duration: 0.24 }, shellAt + 0.08));
    tl.to(framePathRef.current, { opacity: 0, duration: 0.28 }, shellAt + 0.10);
    tl.to(maskRef.current,      { opacity: 0, duration: 0.26, ease: 'power2.in' }, shellAt + 0.36);

    // Real UI reveal
    tl.to(skelRef.current,     { opacity: 0, duration: 0.30 }, shellAt + 0.64);
    tl.to(revealRef.current,   { opacity: 1, duration: 0.34 }, shellAt + 0.66);
    tl.to(rowRefs.current.filter(Boolean), { opacity: 1, x: 0, duration: 0.22, ease: 'power2.out', stagger: 0.04 }, shellAt + 0.76);
    tl.to(camRefs.current.filter(Boolean), { opacity: 1, scale: 1, duration: 0.28, ease: 'power2.out', stagger: 0.06 }, shellAt + 0.86);

    const loopAt = shellAt + 0.86 + 0.28 + 0.18;
    tl.add(() => {
      hasRevealed.current = true;
      if (!isHovered.current) playConnections();
    }, loopAt);
  };

  const handleHover = (iconIdx) => {
    if (isHovered.current) return;
    isHovered.current = true;
    allTweens.current.forEach(t => t?.pause?.());
    resetIconsAndLines();
    const connIndices = PAIRS.reduce((acc, pair, i) => pair.includes(iconIdx) ? [...acc, i] : acc, []);
    if (connIndices.length === 0) return;
    const iconIndices = [...new Set(connIndices.flatMap(ci => PAIRS[ci]))];
    hoverTl.current = gsap.timeline();
    iconIndices.forEach(idx => {
      const el = activeRefs.current[idx];
      if (el) hoverTl.current.to(el, { opacity:1, duration:0.20, ease:'power2.out' }, 0);
    });
    connIndices.forEach(ci => {
      const line = lineRefs.current[ci];
      if (line) hoverTl.current.to(line, { opacity:1, duration:0.24, ease:'power2.out' }, 0.10);
    });
  };

  const handleHoverLeave = () => {
    if (!isHovered.current) return;
    isHovered.current = false;
    hoverTl.current?.kill();
    hoverTl.current = null;
    if (hasRevealed.current) {
      playConnections();
    } else {
      play();
    }
  };

  let rIdx = 0, cIdx = 0;

  return (
    <div
      ref={el => {
        if (el) { el.__play = play; el.__stop = stop; }
        if (typeof ref === 'function') ref(el); else if (ref) ref.current = el;
      }}
      style={{ position:'relative', width:W, maxWidth:'100%', height:H }}
    >
      <style>{CSS}</style>
      <GlobalDefs/>

      {/* z=0 — connection lines */}
      <svg ref={linesRef} width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', overflow:'visible' }}>
        <defs>
          <filter id="s3lgf" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="2.4" result="glow"/>
            <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {CONNECTIONS.map((d, i) => (
          <path key={i} ref={el=>(lineRefs.current[i]=el)} d={d}
            stroke={`url(#s3lg${i})`} strokeWidth="2.0" fill="none"
            strokeLinecap="round" strokeLinejoin="round" opacity="0"
            filter="url(#s3lgf)"/>
        ))}
      </svg>

      {/* z=2 — frame outline + wireframe */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none', overflow:'visible' }}>
        <defs>
          <filter id="s3pgl" x="-12%" y="-10%" width="124%" height="120%">
            <feGaussianBlur stdDeviation="3.0" result="glow"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="sharp"/>
            <feMerge><feMergeNode in="glow"/><feMergeNode in="glow"/><feMergeNode in="sharp"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="s3bgl" x="-12%" y="-12%" width="124%" height="124%">
            <feGaussianBlur stdDeviation="1.8" result="glow"/>
            <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <path ref={framePathRef} d={FRAME_PATH}
          stroke="url(#s3pg_w)" strokeWidth="0.9" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={FRAME_PERIM} strokeDashoffset={FRAME_PERIM}
          filter="url(#s3pgl)" opacity="0"/>
        {WIRE.map((d, i) => (
          <path key={i} ref={r=>(wireRefs.current[i]=r)} d={d}
            stroke="url(#s3pg_w)" strokeWidth="0.45" fill="rgba(99,102,241,0.03)"
            strokeLinecap="round" strokeLinejoin="round" opacity="0" filter="url(#s3bgl)"/>
        ))}
      </svg>

      {/* Icons */}
      {ICONS.map((ic, i) => (
        <div key={ic.id}
          style={{ position:'absolute', left:ic.left, top:ic.top, width:ic.size, height:ic.size,
            zIndex:ic.layer === 'center' ? 4 : 7, cursor:'pointer' }}
          onMouseEnter={() => handleHover(i)}
          onMouseLeave={handleHoverLeave}
        >
          <InactiveCard id={ic.id} size={ic.size}/>
          <div ref={el=>(activeRefs.current[i]=el)}
            style={{ position:'absolute', inset:0, opacity:0, willChange:'opacity' }}>
            <ActiveCard id={ic.id} size={ic.size}/>
          </div>
        </div>
      ))}

      {/* z=5 mask */}
      <div ref={maskRef} style={{
        position:'absolute', left:FX, top:FY, width:FW, height:FH, borderRadius:FR,
        background:'#f5f7fa', zIndex:5, opacity:0, pointerEvents:'none',
      }}/>

      {/* z=6 shell — dark theme */}
      <div ref={shellRef} style={{
        position:'absolute', left:FX, top:FY, width:FW, height:FH, borderRadius:FR,
        background:'#0f172a', boxShadow:'0 6px 28px rgba(0,0,0,0.18)',
        overflow:'hidden', opacity:0, zIndex:6,
      }}>
        <div style={{ height:34, background:'#1e293b', borderBottom:'1px solid #334155', display:'flex', alignItems:'center', padding:'0 12px', gap:6 }}>
          {[0,1,2].map(i=><div key={i} style={{ width:9, height:9, borderRadius:'50%', background:['#f87171','#fbbf24','#4ade80'][i] }}/>)}
          <div style={{ flex:1, height:19, borderRadius:4, background:'#334155', margin:'0 10px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:8.5, color:'#64748b' }}>https://pro.mylocatorplus.com/</span>
          </div>
        </div>

        <div ref={skelRef} style={{ position:'absolute', inset:'34px 0 0 0', display:'flex', background:'#1e293b', opacity:0 }}>
          <div style={{ width:SBW, borderRight:'1px solid #334155', padding:8, display:'flex', flexDirection:'column', gap:7 }}>
            {[0,1,2,3,4].map(j=>(
              <div key={j} style={{ display:'flex', flexDirection:'column', gap:4, paddingBottom:7, borderBottom:'1px solid #334155' }}>
                <div style={{ height:7, borderRadius:3, backgroundSize:'200%', animation:`shimmer 1.4s ease-in-out ${j*0.09}s infinite`, background:'linear-gradient(90deg,#334155 25%,#3e5064 50%,#334155 75%)' }}/>
                <div style={{ height:6, width:'60%', borderRadius:3, backgroundSize:'200%', animation:`shimmer 1.4s ease-in-out ${j*0.09+0.05}s infinite`, background:'linear-gradient(90deg,#334155 25%,#3e5064 50%,#334155 75%)' }}/>
              </div>
            ))}
          </div>
          <div style={{ flex:1, padding:5, display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr', gap:5 }}>
            {[0,1,2,3].map(j=>(
              <div key={j} style={{ borderRadius:5, background:'#334155' }}>
                <div style={{ padding:'5px 7px', fontSize:7, color:'#475569' }}>Camera Channel-{j+1}</div>
              </div>
            ))}
          </div>
        </div>

        <div ref={revealRef} style={{ position:'absolute', inset:'34px 0 0 0', display:'flex', opacity:0 }}>
          <div style={{ width:SBW, borderRight:'1px solid #1e3a5f', display:'flex', flexDirection:'column', background:'#0f172a' }}>
            <div style={{ display:'flex', borderBottom:'1px solid #1e3a5f', padding:'5px 4px 0', gap:1 }}>
              {[{l:'13',s:'All',a:true},{l:'2',s:'Moving'},{l:'1',s:'Idle'},{l:'1',s:'Park'},{l:'0',s:'None'}].map(tab=>(
                <div key={tab.l} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', padding:'3px 1px 5px', borderBottom:tab.a?'2px solid #3b82f6':'2px solid transparent' }}>
                  <span style={{ fontSize:8.5, fontWeight:700, color:tab.a?'#3b82f6':'#64748b' }}>{tab.l}</span>
                  <span style={{ fontSize:5.5, color:tab.a?'#60a5fa':'#475569', textAlign:'center' }}>{tab.s}</span>
                </div>
              ))}
            </div>
            <div style={{ flex:1, overflow:'hidden' }}>
              {drivers.map(d=>(
                <div key={d.name} ref={el=>(rowRefs.current[rIdx++]=el)}
                  style={{ padding:'6px 8px', borderBottom:'1px solid #1e3a5f', background:d.active?'#1e3a5f':'transparent', opacity:0, willChange:'opacity,transform' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:2 }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', background:'#22c55e', flexShrink:0 }}/>
                    <span style={{ fontSize:8, fontWeight:700, color:d.active?'#e2e8f0':'#94a3b8' }}>{d.name}</span>
                  </div>
                  <span style={{ fontSize:6.5, color:'#64748b', display:'block', paddingLeft:10 }}>{d.speed}</span>
                  <span style={{ fontSize:6, color:'#475569', display:'block', paddingLeft:10 }}>{d.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex:1, background:'#1e293b', padding:5, display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr', gap:5 }}>
            {[
              { label:'Camera Channel-1', type:'road', sky:'#7ba8c8' },
              { label:'Camera Channel-2', type:'road', sky:'#8ab4d0' },
              { label:'Camera Channel-3', type:'cabin' },
              { label:'Camera Channel-4', type:'cabin' },
            ].map((cam, i)=>(
              <div key={i} ref={el=>(camRefs.current[cIdx++]=el)}
                style={{ borderRadius:5, background:cam.type==='road'?'#1a2e1a':'#0f172a', overflow:'hidden', position:'relative', opacity:0, willChange:'opacity,transform' }}>
                <div style={{ position:'absolute', top:4, left:6, right:6, display:'flex', justifyContent:'space-between', zIndex:2 }}>
                  <span style={{ fontSize:6, color:'rgba(255,255,255,0.6)', fontWeight:500 }}>{cam.label}</span>
                  <div style={{ display:'flex', gap:3 }}>
                    <div style={{ width:5, height:5, borderRadius:'50%', background:'#ef4444' }}/>
                    <div style={{ width:5, height:5, borderRadius:'50%', background:'#475569' }}/>
                  </div>
                </div>
                {cam.type==='road' && <RoadCam sky={cam.sky} style={{ position:'absolute', inset:0 }}/>}
                {cam.type==='cabin' && <CabinCam style={{ position:'absolute', inset:0 }}/>}
                <div style={{ position:'absolute', bottom:3, left:5, fontSize:5.5, color:'rgba(255,255,255,0.45)' }}>07/01/2026 18:15:48</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
