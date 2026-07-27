'use client';
import { forwardRef, useLayoutEffect, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrowserChrome from './BrowserChrome';

gsap.registerPlugin(ScrollTrigger);

const W = 580, H = 580;

// Composition: the browser window sits back-left, the phone overlaps it front-right
// and hangs below its bottom edge — both are on screen at the same time.

// Desktop (browser-style frame) — back layer
const DT_X = 4, DT_Y = 108, DT_W = 460, DT_H = 330, DT_R = 14;
const DTX2 = DT_X + DT_W, DTY2 = DT_Y + DT_H;
const DT_PERIM = 2 * (DT_W + DT_H);

// Phone — front layer, clipping only the browser's right edge (~19% of its width)
// so the dashboard's sidebar and map stay readable behind it.
// 168×370 is the native aspect of /block 1/mobile.webp (1535×3378 → 0.454). Matching
// it exactly means objectFit:cover shows the WHOLE screenshot with nothing cropped —
// any other ratio silently cuts the bottom rows off. Change width and height together.
const PHONE_X = 396, PHONE_Y = 125, PHONE_W = 168, PHONE_H = 370, PHONE_R = 24;

// The wireframe rects below were hand-calibrated against the source screenshots at
// the original frame sizes (phone 260×500, browser 550×380). Rather than re-measure
// every rect for the new composition, scale the calibrated coordinates.
const PSX = PHONE_W / 260, PSY = PHONE_H / 500;
const DSX = DT_W / 550,    DSY = DT_H / 380;

const DT_PATH =
  `M${DT_X+DT_R} ${DT_Y} H${DTX2-DT_R}` +
  ` Q${DTX2} ${DT_Y} ${DTX2} ${DT_Y+DT_R}` +
  ` V${DTY2-DT_R} Q${DTX2} ${DTY2} ${DTX2-DT_R} ${DTY2}` +
  ` H${DT_X+DT_R} Q${DT_X} ${DTY2} ${DT_X} ${DTY2-DT_R}` +
  ` V${DT_Y+DT_R} Q${DT_X} ${DT_Y} ${DT_X+DT_R} ${DT_Y} Z`;

function rp(x, y, w, h, r = 0) {
  if (!r) return `M${x} ${y}H${x+w}V${y+h}H${x}Z`;
  return `M${x+r} ${y}H${x+w-r}Q${x+w} ${y} ${x+w} ${y+r}V${y+h-r}Q${x+w} ${y+h} ${x+w-r} ${y+h}H${x+r}Q${x} ${y+h} ${x} ${y+h-r}V${y+r}Q${x} ${y} ${x+r} ${y}Z`;
}

// Wireframe rect in the browser's calibrated 550×380 space.
// Only the browser has a wireframe stage — the phone simply fades in.
function dw(dx, dy, w, h, r = 0) {
  return rp(DT_X + dx * DSX, DT_Y + dy * DSY, w * DSX, h * DSY, r);
}

// Desktop wireframe — matches pro.mylocatorplus.com layout
// calibrated at 550×380: sidebar≈170px, map≈362px
const DT_WIRE = [
  // 1. Browser chrome / URL bar (full width)
  dw(8,   8,  534, 26, 5),

  // 2. Left sidebar container (full content height)
  dw(8,   42, 168, 330, 6),

  // 3. Right map container (full content height)
  dw(182, 42, 360, 330, 6),

  // Sidebar — tab pills: Vehicles | Drivers | Alerts
  dw(14,  50, 52, 18, 9),
  dw(72,  50, 44, 18, 9),
  dw(122, 50, 44, 18, 9),

  // Sidebar — stats row: 13 Vehicles | 3 Moving | 1 Idling | 8 Parking | 1 No Signal
  dw(14,  76, 28, 26, 4),
  dw(47,  76, 28, 26, 4),
  dw(80,  76, 28, 26, 4),
  dw(113, 76, 28, 26, 4),
  dw(146, 76, 20, 26, 4),

  // Sidebar — search bar
  dw(14,  110, 152, 14, 7),

  // Sidebar — vehicle list items (4 rows, each with icon + text lines)
  dw(14,  132, 152, 38, 4),
  dw(14,  178, 152, 38, 4),
  dw(14,  224, 152, 38, 4),
  dw(14,  270, 152, 38, 4),

  // Map — top toolbar (Zone / POI / Traffic filters)
  dw(188, 48, 350, 18, 4),

  // Map — bottom popup card ("Moinu Tech 68280")
  dw(188, 308, 130, 26, 6),
];

const ICONS = [
  { id:'pin',    left:22,  top:68,  size:70, layer:'outer'  },
  { id:'bell',   left:183, top:143, size:64, layer:'center' },
  { id:'route',  left:412, top:44,  size:64, layer:'outer'  },
  { id:'moon',   left:22,  top:278, size:64, layer:'outer'  },
  { id:'grid',   left:300, top:248, size:64, layer:'center' },
  { id:'wrench', left:300, top:382, size:64, layer:'center' },
];

const CONNECTIONS = [
  'M 92 103 V 88 Q 92 76 104 76 H 412',
  'M 92 124 H 203 Q 215 124 215 136 V 143',
  'M 86 310 H 288 Q 300 310 300 298 V 280',
  'M 332 312 V 382',
  'M 444 108 V 163 Q 444 175 432 175 H 247',
  'M 54 342 V 402 Q 54 414 66 414 H 300',
];

const PAIRS = [[0,2],[0,1],[3,4],[4,5],[2,1],[3,5]];

function GlobalDefs() {
  return (
    <svg width="0" height="0" style={{ position:'absolute' }}>
      <defs>
        <linearGradient id="ig_pin"    x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f472b6"/><stop offset="100%" stopColor="#8b5cf6"/></linearGradient>
        <linearGradient id="ig_bell"   x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#60a5fa"/><stop offset="100%" stopColor="#2563eb"/></linearGradient>
        <linearGradient id="ig_route"  x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#818cf8"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient>
        <linearGradient id="ig_moon"   x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3730a3"/><stop offset="100%" stopColor="#6d28d9"/></linearGradient>
        <linearGradient id="ig_wrench" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#60a5fa"/><stop offset="100%" stopColor="#2563eb"/></linearGradient>
        <linearGradient id="s1lg0" x1="92" y1="103" x2="412" y2="76" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f472b6"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
        <linearGradient id="s1lg1" x1="92" y1="124" x2="215" y2="143" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#3b82f6"/>
        </linearGradient>
        <linearGradient id="s1lg2" x1="86" y1="310" x2="300" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4c1d95"/><stop offset="100%" stopColor="#6366f1"/>
        </linearGradient>
        <linearGradient id="s1lg3" x1="332" y1="312" x2="332" y2="382" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#60a5fa"/>
        </linearGradient>
        <linearGradient id="s1lg4" x1="444" y1="108" x2="247" y2="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818cf8"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
        <linearGradient id="s1lg5" x1="54" y1="342" x2="300" y2="414" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#6366f1"/>
        </linearGradient>
        <linearGradient id="s1pg_w" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
        {/* Shared by BOTH wireframes (phone + browser), so it lives here rather than
            in either one's local defs — deleting the owner SVG would strip the other. */}
        <filter id="s1bgl" x="-6%" y="-6%" width="112%" height="112%">
          <feGaussianBlur stdDeviation="0.8" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
    </svg>
  );
}

function InactiveCard({ id, size }) {
  const r = Math.round(size * 0.24);
  const s = Math.round(size * 0.50);
  const c = '#c8d0dc';
  const shapes = {
    pin: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke={c} strokeWidth="1.5" fill="none"/><circle cx="12" cy="9" r="2.5" stroke={c} strokeWidth="1.2" fill="none"/></svg>,
    bell: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={c} strokeWidth="1.5" fill="none" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 01-3.46 0" stroke={c} strokeWidth="1.3" strokeLinecap="round" fill="none"/></svg>,
    route: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="17" cy="5" r="2.5" stroke={c} strokeWidth="1.3" fill="none"/><circle cx="7" cy="19" r="2.5" stroke={c} strokeWidth="1.3" fill="none"/><path d="M7 16.5c0-3 3-3.5 5-5.5s5-2.5 5-6" stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>,
    moon: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke={c} strokeWidth="1.5" fill="none"/></svg>,
    grid: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8.5" height="8.5" rx="1.5" stroke={c} strokeWidth="1.2" fill="none"/><rect x="12.5" y="3" width="8.5" height="8.5" rx="1.5" stroke={c} strokeWidth="1.2" fill="none"/><rect x="3" y="12.5" width="8.5" height="8.5" rx="1.5" stroke={c} strokeWidth="1.2" fill="none"/><rect x="12.5" y="12.5" width="8.5" height="8.5" rx="1.5" stroke={c} strokeWidth="1.2" fill="none"/></svg>,
    wrench: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" fill="none"/></svg>,
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
    pin:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="url(#ig_pin)"/><circle cx="12" cy="9" r="2.7" fill="white" opacity="0.9"/></svg>,
    bell:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" fill="url(#ig_bell)"/><path d="M13.73 21a2 2 0 01-3.46 0" stroke="url(#ig_bell)" strokeWidth="1.8" strokeLinecap="round" fill="none"/></svg>,
    route:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="17" cy="5" r="2.8" fill="url(#ig_route)"/><circle cx="7" cy="19" r="2.8" fill="url(#ig_route)"/><path d="M7 16.5c0-3 3-3.5 5-5.5s5-2.5 5-6" stroke="url(#ig_route)" strokeWidth="2.1" strokeLinecap="round" fill="none"/></svg>,
    moon:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="url(#ig_moon)"/></svg>,
    grid:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8.5" height="8.5" rx="1.5" fill="#f87171"/><rect x="12.5" y="3" width="8.5" height="8.5" rx="1.5" fill="#2dd4bf"/><rect x="3" y="12.5" width="8.5" height="8.5" rx="1.5" fill="#fb923c"/><rect x="12.5" y="12.5" width="8.5" height="8.5" rx="1.5" fill="#a78bfa"/></svg>,
    wrench: <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" fill="url(#ig_wrench)"/></svg>,
  };
  return (
    <div style={{ width:size, height:size, borderRadius:r, background:'#fff', boxShadow:'0 6px 24px rgba(99,102,241,0.18), 0 2px 8px rgba(0,0,0,0.06)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      {inner[id]}
    </div>
  );
}

export default forwardRef(function Scene1Icons(_props, ref) {
  const activeRefs   = useRef([]);
  const iconRefs     = useRef([]);
  const lineRefs     = useRef([]);
  const mobileRef    = useRef(null);
  const desktopFrameRef = useRef(null);
  const desktopWireRefs = useRef([]);
  const desktopWireGrpRef = useRef(null);
  const desktopImgRef = useRef(null);
  const desktopPopupRef = useRef(null);
  const mobilePopupRef = useRef(null);
  const allTweens    = useRef([]);
  const linesRef     = useRef(null);
  const outerRef     = useRef(null);
  const playedRef    = useRef(false);
  const [scale, setScale] = useState(1);

  // ── Phone gate ────────────────────────────────────────────────────────────
  // The phone is the LAST beat of the scene: icons → browser wireframe → real
  // dashboard → (scene HOLDS here) → phone.
  //
  // The gate is "scroll that happens AFTER the intro finished", not "scroll" and
  // not "section entered". Both weaker gates were already satisfied by the time
  // the dashboard landed — the user's scroll into the section is what starts the
  // intro — so the phone kept letting itself in with no input. Instead: when the
  // intro completes we stamp the scroll position, and the phone waits for the page
  // to move PHONE_IN_PX beyond that stamp. That guarantees the hold on the
  // finished desktop, however fast or slow the user was scrolling before it.
  //
  // The reveal is reversible: scrolling back up past PHONE_OUT_PX runs the same
  // timeline backwards so the phone animates out the way it came in. Only the phone
  // reverses — the intro is still a one-shot, so the dashboard stays put.
  const introDoneRef   = useRef(false);
  const phoneTlRef     = useRef(null);
  const scrollAtIntroEndRef = useRef(0);

  // Two thresholds, not one. A single boundary would sit right where the phone
  // flips state, so a few pixels of scroll jitter would flap it in and out. The gap
  // between them is a dead band where nothing changes.
  //   IN  — "scroll a little": responsive, but past any wheel inertia left over
  //         from before the intro ended, so it can't trip itself.
  //   OUT — scrolling back below this reverses the reveal.
  const PHONE_IN_PX  = 140;
  const PHONE_OUT_PX = 80;

  // Called on every scroll update while the section is in range. Safe to call
  // repeatedly: play() on a finished timeline and reverse() on one already at 0
  // are both no-ops, so this just steers direction.
  const checkPhoneScroll = () => {
    const tl = phoneTlRef.current;
    if (!tl || !introDoneRef.current) return;
    const travelled = window.scrollY - scrollAtIntroEndRef.current;
    if (travelled >= PHONE_IN_PX) tl.play();
    else if (travelled <= PHONE_OUT_PX) tl.reverse();
  };

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      if (!w) return;
      // Allow modest upscaling so the scene fills a wide sticky panel instead of
      // sitting in dead space; capped so it never overflows the viewport height.
      setScale(Math.min(1.18, w / W));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => () => allTweens.current.forEach(t => t?.kill()), []);

  // The scene resizes itself after mount (see the ResizeObserver above), which moves
  // the pin start/end. Without this the trigger keeps stale measurements and the pin
  // engages a few pixels off, which shows up as a jump when it latches.
  useEffect(() => { ScrollTrigger.refresh(); }, [scale]);

  // ── Pinned phone reveal ───────────────────────────────────────────────────
  // The desktop dashboard lands via the intro timeline and stays. Scrolling into the
  // section then pins the whole row and plays the phone in over the top of it.
  //
  // Trigger is the parent .ss-row, not this element: the row is what actually travels
  // through the viewport, and it is the box that needs pinning.
  useLayoutEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const row = el.closest('.ss-row');
    if (!row) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // The phone starts hidden in BOTH branches. It is never shown outright —
      // it always waits for the intro to finish (see checkPhoneScroll).
      const buildPhoneTl = () => {
        gsap.set(mobileRef.current, { opacity: 0, yPercent: 4 });
        gsap.set(mobilePopupRef.current, { opacity: 0, x: -10 });

        // Deliberately NOT scrubbed. A scrubbed timeline is bound to scroll position,
        // so it stutters with every wheel delta and freezes the moment the user stops
        // moving. Scroll only decides which DIRECTION this runs; once pointed it plays
        // on its own clock, which is what makes both the reveal and the reverse smooth.
        const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
        tl.to(mobileRef.current, { opacity: 1, yPercent: 0, duration: 0.9 }, 0);
        tl.to(mobilePopupRef.current,
          { opacity: 1, x: 0, duration: 0.5, ease: 'back.out(1.6)' }, 0.65);
        phoneTlRef.current = tl;
      };

      // Desktop: pin the whole row so nothing moves while the phone is revealed.
      mm.add('(min-width: 1024px)', () => {
        buildPhoneTl();

        ScrollTrigger.create({
          trigger: row,
          start: 'top top',
          // Pin the entire row — text and mockups both hold still — for this much
          // scroll distance, then release the page to the next section. The runway
          // has to cover the intro, the hold, and the phone reveal, or the row
          // unpins mid-sequence and the phone finishes off-screen.
          end: () => '+=' + window.innerHeight * 1.6,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: checkPhoneScroll,
          // Safety net: if the intro finished so late in the runway that the
          // remaining scroll never covers PHONE_IN_PX, the phone would be left
          // hidden as the section scrolls away. Force it rather than lose the beat.
          onLeave: () => phoneTlRef.current?.play(),
          // Leaving upward means the whole section is behind the user — wind the
          // phone back so the reveal is armed again next time they come down.
          onLeaveBack: () => phoneTlRef.current?.reverse(),
        });
      });

      // Below 1024px nothing is pinned, but the gate is measured in raw scroll
      // pixels rather than pin progress, so the same check works untouched — this
      // trigger exists only to deliver scroll updates while the row is in view.
      mm.add('(max-width: 1023px)', () => {
        buildPhoneTl();

        ScrollTrigger.create({
          trigger: row,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: checkPhoneScroll,
          onLeave: () => phoneTlRef.current?.play(),
          onLeaveBack: () => phoneTlRef.current?.reverse(),
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // The intro is a one-shot that must be allowed to finish: killing it half-way
  // (which the IntersectionObserver used to do on every scroll-out) left the
  // dashboard stuck part-drawn. Cleanup happens on unmount instead.
  const stop = () => {};

  // Premium cinematic easing
  const LINE_EASE = 'power2.inOut';
  const ICON_EASE = 'power3.out';
  const FADE_EASE = 'power2.in';

  const getLen = (p) => { try { return p.getTotalLength(); } catch { return 400; } };

  const resetAll = () => {
    gsap.set(iconRefs.current.filter(Boolean),   { opacity: 1 });
    gsap.set(activeRefs.current.filter(Boolean), { opacity: 0 });
    lineRefs.current.filter(Boolean).forEach(p => {
      const len = getLen(p);
      gsap.set(p, { opacity: 0, strokeDasharray: `${len} ${len + 1}`, strokeDashoffset: len });
    });
    // NOTE: the phone (mobileRef / mobilePopupRef) is deliberately not reset here —
    // it is owned entirely by the pinned scroll timeline, and resetting it would
    // fight ScrollTrigger for the same properties.
    gsap.set(desktopFrameRef.current, { opacity: 0, strokeDashoffset: DT_PERIM });
    gsap.set(desktopWireGrpRef.current, { opacity: 0 });
    gsap.set(desktopImgRef.current, { opacity: 0 });
    gsap.set(desktopPopupRef.current, { opacity: 0, x: -12, scale: 0.96 });
    desktopWireRefs.current.forEach(p => {
      if (!p) return;
      const len = getLen(p);
      gsap.set(p, { strokeDasharray:`${len} ${len+1}`, strokeDashoffset:len, opacity:0 });
    });
  };

  const play = () => {
    // One-shot. The row re-enters the viewport every time the user scrolls back up,
    // and re-running this would blank the dashboard out and rebuild it mid-scroll —
    // that was the flicker that appeared while scrolling through the pinned section.
    if (playedRef.current) return;
    playedRef.current = true;

    resetAll();

    // Plays once and holds on the finished dashboard — no loop, so it doesn't fight
    // the scroll-driven phone reveal that continues from this end state. Completing
    // is what unlocks that reveal; until then the phone stays hidden no matter how
    // far the user has scrolled.
    const tl = gsap.timeline({
      onComplete: () => {
        // Stamp where the page was when the dashboard finished. The phone measures
        // its scroll requirement from here, so the scene holds until the user
        // scrolls onward from this exact point.
        introDoneRef.current = true;
        scrollAtIntroEndRef.current = window.scrollY;
      },
    });
    allTweens.current.push(tl);

    // ── PHASE 1: ICON LINES ONLY — no wireframe visible (faster)
    const CONN_START = 0.06;
    const CONN_DUR   = 0.55;
    const STAGGER    = 0.32;
    const SEQ = [{ ci:0 }, { ci:2 }, { ci:4 }];

    SEQ.forEach(({ ci }, idx) => {
      const at = CONN_START + idx * STAGGER;
      const [ia, ib] = PAIRS[ci];
      const elA = activeRefs.current[ia];
      const elB = activeRefs.current[ib];
      const line = lineRefs.current[ci];
      if (elA) tl.to(elA, { opacity:1, duration:0.18, ease:ICON_EASE }, at);
      if (elB) tl.to(elB, { opacity:1, duration:0.18, ease:ICON_EASE }, at + 0.08);
      if (line) {
        const len = getLen(line);
        tl.set(line, { strokeDasharray:`${len} ${len + 1}`, strokeDashoffset:len, opacity:1 }, at + 0.05);
        tl.to(line, { strokeDashoffset:0, duration:CONN_DUR, ease:LINE_EASE }, at + 0.05);
      }
    });

    // Phase 1 ends at: 0.20 + 2*0.80 + 0.12 + 1.35 = 3.27s
    const phase1End = CONN_START + (SEQ.length - 1) * STAGGER + 0.12 + CONN_DUR;

    // Lines + active icons + icon outlines fade out COMPLETELY before wireframe starts
    tl.to(lineRefs.current.filter(Boolean),   { opacity:0, duration:0.50, ease:FADE_EASE }, phase1End + 0.15);
    tl.to(activeRefs.current.filter(Boolean), { opacity:0, duration:0.45, ease:FADE_EASE }, phase1End + 0.20);
    tl.to(iconRefs.current.filter(Boolean),   { opacity:0, duration:0.55, ease:FADE_EASE }, phase1End + 0.25);

    // ── PHASE 2: the browser wireframe builds, then the real dashboard crossfades in.
    // This is where the intro ends — the desktop simply STAYS on screen. The phone is
    // not part of this timeline; it is revealed by scroll (see the ScrollTrigger below).
    // Gaps and stagger are kept tight on purpose: the phone can only start once this
    // whole timeline is done, and both have to fit inside the pin runway above.
    const wireAt = phase1End + 0.55; // safe gap after fade-out completes

    tl.to(desktopWireGrpRef.current, { opacity:1, duration:0.25 }, wireAt);
    desktopWireRefs.current.forEach((p, i) => {
      if (!p) return;
      tl.to(p, { opacity:1, strokeDashoffset:0, duration:0.34, ease:'power2.out' }, wireAt + 0.04 + i * 0.035);
    });
    const wireFullAt = wireAt + 0.04 + DT_WIRE.length * 0.035 + 0.34;

    const revealAt = wireFullAt + 0.15;
    tl.to(desktopImgRef.current, { opacity:1, duration:0.80, ease:'power2.out' }, revealAt);
    tl.to(desktopWireGrpRef.current, { opacity:0, duration:0.60, ease:FADE_EASE }, revealAt + 0.20);
    tl.to(desktopPopupRef.current, {
      opacity: 1, x: 0, scale: 1,
      duration: 0.55, ease: 'back.out(1.6)',
    }, revealAt + 0.40);
  };

  return (
    <div
      ref={el => {
        outerRef.current = el;
        if (el) { el.__play = play; el.__stop = stop; }
        if (typeof ref === 'function') ref(el); else if (ref) ref.current = el;
      }}
      style={{ position:'relative', width:'100%', height: H * scale, overflow:'visible', display:'flex', justifyContent:'center', alignItems:'flex-start' }}
    >
      <div style={{
        position:'relative',
        width: W * scale, height: H * scale,
        flexShrink: 0,
      }}>
      <div style={{
        position:'absolute', top:0, left:0,
        width:W, height:H,
        transform:`scale(${scale})`, transformOrigin:'top left',
      }}>
      <GlobalDefs/>

      {/* z=0 — connection lines */}
      <svg ref={linesRef} width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', overflow:'visible' }}>
        <defs>
          <filter id="s1line_glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {CONNECTIONS.map((d, i) => (
          <path key={i} ref={el => (lineRefs.current[i] = el)} d={d}
            stroke={`url(#s1lg${i})`} strokeWidth="1.8" fill="none"
            strokeLinecap="round" strokeLinejoin="round" opacity="0"
            filter="url(#s1line_glow)"/>
        ))}
      </svg>

      {/* z=2 — desktop outline + wireframe (back layer, the only wireframe in the scene) */}
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none', overflow:'visible' }}>
        <path ref={desktopFrameRef} d={DT_PATH}
          stroke="none" fill="none" opacity="0"/>
        <g ref={desktopWireGrpRef} opacity="0">
          {DT_WIRE.map((d, i) => (
            <path key={i} ref={r => (desktopWireRefs.current[i] = r)} d={d}
              stroke="url(#s1pg_w)" strokeWidth="0.7" fill="rgba(59,130,246,0.02)"
              strokeLinecap="round" strokeLinejoin="round" opacity="0" filter="url(#s1bgl)"/>
          ))}
        </g>
      </svg>

      {/* z=6 — phone, front layer. White bezel + deeper shadow lift it off the browser. */}
      <div
        ref={mobileRef}
        style={{
          position:'absolute',
          left:PHONE_X, top:PHONE_Y,
          width:PHONE_W, height:PHONE_H,
          borderRadius:PHONE_R,
          overflow:'hidden',
          opacity:0,
          zIndex:6,
          pointerEvents:'none',
          willChange:'opacity',
          border:'5px solid #fff',
          boxShadow:'0 22px 50px rgba(15,23,42,0.22), 0 6px 16px rgba(15,23,42,0.12)',
          background:'#fff',
        }}
      >
        <Image
          src="/block 1/mobile.webp"
          alt="Mobile app interface"
          fill
          sizes={`${PHONE_W}px`}
          priority
          style={{ objectFit:'cover', objectPosition:'center top' }}
        />
      </div>

      {/* z=5 — desktop browser window (Mac chrome + image), back layer */}
      <div
        ref={desktopImgRef}
        style={{
          position:'absolute',
          left:DT_X, top:DT_Y,
          width:DT_W, height:DT_H,
          borderRadius:DT_R,
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
            src="/block 1/werertrttr.webp"
            alt="Desktop dashboard interface"
            fill
            sizes={`${DT_W}px`}
            style={{ objectFit:'contain', objectPosition:'left top' }}
          />
        </div>
      </div>

      {/* z=7 — hover popup card over desktop sidebar empty area */}
      <div
        ref={desktopPopupRef}
        onMouseEnter={() => gsap.to(desktopPopupRef.current, { scale: 1.12, duration: 0.35, ease: 'power3.out', transformOrigin: 'left center' })}
        onMouseLeave={() => gsap.to(desktopPopupRef.current, { scale: 1, duration: 0.35, ease: 'power3.out', transformOrigin: 'left center' })}
        style={{
          position:'absolute',
          left: Math.max(0, DT_X - 10),
          top: DT_Y + 130 * DSY,
          width: 250 * DSX,
          height: 54 * DSY,
          opacity: 0,
          zIndex: 7,
          pointerEvents: 'auto',
          cursor: 'pointer',
          willChange: 'opacity, transform',
          transformOrigin: 'left center',
        }}
      >
        <Image
          src="/block 1/fdghgyhjhk.webp"
          alt="Vehicle hover popup"
          fill
          sizes="250px"
          style={{ objectFit:'contain', objectPosition:'left top' }}
        />
      </div>

      {/* z=50 — hover Map/Satellite bar over mobile top-left empty area */}
      <div
        ref={mobilePopupRef}
        onMouseEnter={() => gsap.to(mobilePopupRef.current, { scale: 1.18, duration: 0.35, ease: 'power3.out', transformOrigin: 'left center' })}
        onMouseLeave={() => gsap.to(mobilePopupRef.current, { scale: 1, duration: 0.35, ease: 'power3.out', transformOrigin: 'left center' })}
        style={{
          position:'absolute',
          left: PHONE_X - 22,
          top: PHONE_Y + 68 * PSY,
          width: 250 * PSX,
          height: 44 * PSY,
          opacity: 0,
          zIndex: 8,
          pointerEvents: 'auto',
          cursor: 'pointer',
          willChange: 'opacity, transform',
          transformOrigin: 'left center',
        }}
      >
        <Image
          src="/block 1/map bar.png"
          alt="Map/Satellite toggle"
          fill
          sizes="110px"
          style={{ objectFit:'contain', objectPosition:'left top' }}
        />
      </div>

      {/* Icons — outline always visible, active overlay GSAP-driven */}
      {ICONS.map((ic, i) => (
        <div key={ic.id}
          ref={el => (iconRefs.current[i] = el)}
          style={{
            position:'absolute', left:ic.left, top:ic.top,
            width:ic.size, height:ic.size,
            zIndex: ic.layer === 'center' ? 4 : 7,
            pointerEvents:'none',
            willChange:'opacity',
          }}
        >
          <InactiveCard id={ic.id} size={ic.size}/>
          <div ref={el => (activeRefs.current[i] = el)}
            style={{ position:'absolute', inset:0, opacity:0, willChange:'opacity' }}>
            <ActiveCard id={ic.id} size={ic.size}/>
          </div>
        </div>
      ))}
      </div>
      </div>
    </div>
  );
});
