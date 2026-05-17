'use client';
import { forwardRef, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import BrowserChrome from './BrowserChrome';

const W = 540, H = 360;
const FX = 72, FY = 18, FW = 416, FH = 320, FR = 13;
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
  { id:'cam',    left:6,   top:60,  size:54, layer:'outer'  }, // 0
  { id:'shield', left:6,   top:266, size:54, layer:'outer'  }, // 1
  { id:'ai',     left:480, top:50,  size:54, layer:'outer'  }, // 2
  { id:'play',   left:160, top:120, size:50, layer:'center' }, // 3 — inside frame
  { id:'alert',  left:340, top:160, size:50, layer:'center' }, // 4 — inside frame
];

// Clean L-shaped connectors with 12px rounded corners (same style as Scene1)
const CONNECTIONS = [
  'M 60 87 H 173 Q 185 87 185 99 V 120',                       // 0: cam → play (right, down)
  'M 33 60 V 16 Q 33 4 45 4 H 495 Q 507 4 507 16 V 50',        // 1: cam → ai over top (L overarch)
  'M 60 293 H 173 Q 185 293 185 281 V 170',                    // 2: shield → play (right, up)
  'M 480 77 H 377 Q 365 77 365 89 V 160',                      // 3: ai → alert (left, down)
  'M 210 145 H 328 Q 340 145 340 157 V 175',                   // 4: play → alert (right, down)
];

const PAIRS = [[0,3],[0,2],[1,3],[2,4],[3,4]];

function GlobalDefs() {
  return (
    <svg width="0" height="0" style={{ position:'absolute' }}>
      <defs>
        <linearGradient id="s4ig_cam"    x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient>
        <linearGradient id="s4ig_shield" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient>
        <linearGradient id="s4ig_ai"     x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient>
        <linearGradient id="s4ig_play"   x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient>
        <linearGradient id="s4ig_alert"  x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ef4444"/></linearGradient>
        <linearGradient id="s4lg0" x1="60" y1="87" x2="185" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#3b82f6"/>
        </linearGradient>
        <linearGradient id="s4lg1" x1="33" y1="60" x2="507" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f472b6"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
        <linearGradient id="s4lg2" x1="60" y1="293" x2="185" y2="170" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#6366f1"/>
        </linearGradient>
        <linearGradient id="s4lg3" x1="480" y1="77" x2="365" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#f59e0b"/>
        </linearGradient>
        <linearGradient id="s4lg4" x1="210" y1="145" x2="340" y2="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#ef4444"/>
        </linearGradient>
        <linearGradient id="s4pg_w" x1="0" y1="0" x2="1" y2="1">
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
    play:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.5"/><polygon points="10,8 10,16 18,12" stroke={c} strokeWidth="1.3" fill="none" strokeLinejoin="round"/></svg>,
    alert:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke={c} strokeWidth="1.4" strokeLinecap="round"/><circle cx="12" cy="17" r="0.8" fill={c}/></svg>,
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
    cam:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="15" height="14" rx="2" fill="url(#s4ig_cam)"/><path d="M17 9l5-3v12l-5-3V9z" fill="url(#s4ig_cam)"/></svg>,
    shield: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="url(#s4ig_shield)"/><path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    ai:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" fill="url(#s4ig_ai)"/><path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="url(#s4ig_ai)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    play:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><defs><linearGradient id="s4p_play" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient></defs><circle cx="12" cy="12" r="10" fill="url(#s4p_play)"/><polygon points="10,7.5 10,16.5 18.5,12" fill="white"/></svg>,
    alert:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><defs><linearGradient id="s4p_alert" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ef4444"/></linearGradient></defs><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" fill="url(#s4p_alert)"/><line x1="12" y1="9" x2="12" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="17.5" r="1.2" fill="white"/></svg>,
  };
  return (
    <div style={{ width:size, height:size, borderRadius:r, background:'#fff', boxShadow:'0 6px 24px rgba(99,102,241,0.18), 0 2px 8px rgba(0,0,0,0.06)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      {inner[id]}
    </div>
  );
}

export default forwardRef(function Scene4Pricing(_props, ref) {
  const activeRefs   = useRef([]);
  const iconRefs     = useRef([]);
  const lineRefs     = useRef([]);
  const framePathRef = useRef(null);
  const wireRefs     = useRef([]);
  const wireGrpRef   = useRef(null);
  const videoImgRef  = useRef(null);
  const allTweens    = useRef([]);
  const linesRef     = useRef(null);

  useLayoutEffect(() => () => allTweens.current.forEach(t => t?.kill()), []);

  const stop = () => {
    allTweens.current.forEach(t => t?.kill());
    allTweens.current = [];
  };

  const LINE_EASE = 'power2.inOut';
  const ICON_EASE = 'power3.out';
  const FADE_EASE = 'power2.in';

  const getLen = (p) => { try { return p.getTotalLength(); } catch { return 400; } };

  const resetAll = () => {
    gsap.set(iconRefs.current.filter(Boolean),   { opacity:1 });
    gsap.set(activeRefs.current.filter(Boolean), { opacity:0 });
    gsap.set(wireGrpRef.current,   { opacity: 0 });
    gsap.set(framePathRef.current, { opacity: 0, strokeDashoffset: FRAME_PERIM });
    gsap.set(videoImgRef.current,  { opacity: 0 });
    lineRefs.current.filter(Boolean).forEach(p => {
      const len = getLen(p);
      gsap.set(p, { opacity:0, strokeDasharray:`${len} ${len+1}`, strokeDashoffset:len });
    });
    wireRefs.current.forEach(el => {
      if (!el) return;
      const len = getLen(el);
      gsap.set(el, { strokeDasharray: `${len} ${len+1}`, strokeDashoffset: len, opacity: 0 });
    });
  };

  const play = () => {
    stop();
    resetAll();

    const tl = gsap.timeline({ onComplete: () => play() });
    allTweens.current.push(tl);

    // ── PHASE 1: ICON LINES ONLY — no wireframe visible (~3.4s)
    const CONN_START = 0.20;
    const CONN_DUR   = 1.30;
    const STAGGER    = 0.75;
    const SEQ = [{ ci:1 }, { ci:2 }, { ci:3 }]; // overarch → shield-play → ai-alert (touches all 5 icons)

    SEQ.forEach(({ ci }, idx) => {
      const at = CONN_START + idx * STAGGER;
      const iconIdx = PAIRS[ci];
      iconIdx.forEach(ii => {
        const el = activeRefs.current[ii];
        if (el) tl.to(el, { opacity:1, duration:0.40, ease:ICON_EASE }, at);
      });
      const line = lineRefs.current[ci];
      if (line) {
        const len = getLen(line);
        tl.set(line, { strokeDasharray:`${len} ${len + 1}`, strokeDashoffset:len, opacity:1 }, at + 0.12);
        tl.to(line, { strokeDashoffset:0, duration:CONN_DUR, ease:LINE_EASE }, at + 0.12);
      }
    });

    const phase1End = CONN_START + (SEQ.length - 1) * STAGGER + 0.12 + CONN_DUR;

    // Lines + active icons + icon outlines fade out COMPLETELY before wireframe starts
    tl.to(lineRefs.current.filter(Boolean),   { opacity:0, duration:0.50, ease:FADE_EASE }, phase1End + 0.15);
    tl.to(activeRefs.current.filter(Boolean), { opacity:0, duration:0.45, ease:FADE_EASE }, phase1End + 0.20);
    tl.to(iconRefs.current.filter(Boolean),   { opacity:0, duration:0.55, ease:FADE_EASE }, phase1End + 0.25);

    // ── PHASE 2: WIREFRAME builds (only after lines fully gone) → video PNG
    const wireAt = phase1End + 0.80; // safe gap after fade-out completes
    tl.to(wireGrpRef.current, { opacity:1, duration:0.25 }, wireAt);
    wireRefs.current.forEach((p, i) => {
      if (!p) return;
      tl.to(p, { opacity:1, strokeDashoffset:0, duration:0.32, ease:'power2.out' }, wireAt + 0.04 + i * 0.05);
    });

    const wireFullAt = wireAt + 0.04 + WIRE.length * 0.05 + 0.32;
    const pngAt = wireFullAt + 0.15;
    tl.to(videoImgRef.current, { opacity:1, duration:0.85, ease:'power2.out' }, pngAt);

    // Wireframe fades out as video PNG takes over
    tl.to(wireGrpRef.current, { opacity:0, duration:0.65, ease:FADE_EASE }, pngAt + 0.20);

    // Hold ~4.5s, then fade image before loop restart
    const holdEnd = pngAt + 0.85 + 4.5;
    tl.to(videoImgRef.current, { opacity:0, duration:0.60, ease:FADE_EASE }, holdEnd);
  };

  return (
    <div
      ref={el => {
        if (el) { el.__play = play; el.__stop = stop; }
        if (typeof ref === 'function') ref(el); else if (ref) ref.current = el;
      }}
      style={{ position:'relative', width:W, maxWidth:'100%', height:H }}
    >
      <GlobalDefs/>

      {/* z=0 — connection lines */}
      <svg ref={linesRef} width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', overflow:'visible' }}>
        <defs>
          <filter id="s4line_glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.0" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {CONNECTIONS.map((d, i) => (
          <path key={i} ref={el=>(lineRefs.current[i]=el)} d={d}
            stroke={`url(#s4lg${i})`} strokeWidth="1.6" fill="none"
            strokeLinecap="round" strokeLinejoin="round" opacity="0"
            filter="url(#s4line_glow)"/>
        ))}
      </svg>

      {/* z=2 — frame outline + wireframe (persistent) */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none', overflow:'visible' }}>
        <defs>
          <filter id="s4pgl" x="-12%" y="-10%" width="124%" height="120%">
            <feGaussianBlur stdDeviation="3.0" result="glow"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="sharp"/>
            <feMerge><feMergeNode in="glow"/><feMergeNode in="glow"/><feMergeNode in="sharp"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="s4bgl" x="-12%" y="-12%" width="124%" height="124%">
            <feGaussianBlur stdDeviation="1.4" result="glow"/>
            <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <path ref={framePathRef} d={FRAME_PATH}
          stroke="none" fill="none" opacity="0"/>
        <g ref={wireGrpRef} opacity="0">
          {WIRE.map((d, i) => (
            <path key={i} ref={r=>(wireRefs.current[i]=r)} d={d}
              stroke="url(#s4pg_w)" strokeWidth="0.55" fill="rgba(99,102,241,0.03)"
              strokeLinecap="round" strokeLinejoin="round" opacity="0" filter="url(#s4bgl)"/>
          ))}
        </g>
      </svg>

      {/* z=5 — video dashboard browser window (Mac chrome + image) */}
      <div
        ref={videoImgRef}
        style={{
          position:'absolute',
          left:FX, top:FY,
          width:FW, height:FH,
          borderRadius:FR,
          overflow:'hidden',
          opacity:0,
          zIndex:5,
          pointerEvents:'none',
          willChange:'opacity',
          boxShadow:'0 18px 50px rgba(15,23,42,0.18), 0 4px 14px rgba(15,23,42,0.08)',
          background:'#fff',
          display:'flex',
          flexDirection:'column',
        }}
      >
        <BrowserChrome />
        <div style={{ position:'relative', flex:1, background:'#fff' }}>
          <Image
            src="/block 1/video teleframe.jpeg"
            alt="Video telematics dashboard"
            fill
            sizes={`${FW}px`}
            style={{ objectFit:'cover', objectPosition:'center center' }}
          />
        </div>
      </div>

      {/* Icons — outline always visible, active overlay GSAP-driven */}
      {ICONS.map((ic, i) => (
        <div key={ic.id}
          ref={el => (iconRefs.current[i] = el)}
          style={{
            position:'absolute', left:ic.left, top:ic.top,
            width:ic.size, height:ic.size,
            zIndex:ic.layer === 'center' ? 4 : 7,
            pointerEvents:'none',
            willChange:'opacity',
          }}
        >
          <InactiveCard id={ic.id} size={ic.size}/>
          <div ref={el=>(activeRefs.current[i]=el)}
            style={{ position:'absolute', inset:0, opacity:0, willChange:'opacity' }}>
            <ActiveCard id={ic.id} size={ic.size}/>
          </div>
        </div>
      ))}
    </div>
  );
});
