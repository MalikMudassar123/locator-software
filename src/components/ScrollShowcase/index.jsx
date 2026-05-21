'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Scene1Icons     from './Scene1Icons';
import Scene4Pricing   from './Scene4Pricing';

const fleetFeatures = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        <circle cx="12" cy="9" r="2.5" stroke="#374151" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Live GPS Tracking',
    desc: 'Track vehicles live, monitor drivers, improve road team',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="20" height="13" rx="2" stroke="#374151" strokeWidth="1.5"/>
        <path d="M7 7V5a2 2 0 014 0v2M13 7V5a2 2 0 014 0v2" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="13.5" r="1.5" stroke="#374151" strokeWidth="1.2"/>
        <path d="M12 15v2" stroke="#374151" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Instant Idle Alerts',
    desc: 'Detect long idle vehicles, reduce fuel waste, improve productivity.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#374151" strokeWidth="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#374151" strokeWidth="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#374151" strokeWidth="1.5"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#374151" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Dynamic Fleet Dashboard',
    desc: 'Central dashboard for trip insights, vehicle status, performance',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M18 8h1a4 4 0 010 8h-1" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" stroke="#374151" strokeWidth="1.5"/>
        <path d="M6 1v3M10 1v3M14 1v3" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'After-Hours Vehicle Alerts',
    desc: 'Get unauthorized movement alerts. Secure your fleet after hours.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 6h18M3 12h12M3 18h8" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="19" cy="17" r="3" stroke="#374151" strokeWidth="1.5"/>
        <path d="M19 15.5v1.5l1 0.5" stroke="#374151" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Daily Route History',
    desc: 'Review full trip logs, stop reports, and route timelines for every vehicle, every day.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Fleet Service Reminders',
    desc: 'Automated maintenance alerts for oil, tires, and service schedules.',
  },
];

const videoFeatures = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="15" height="14" rx="2" stroke="#374151" strokeWidth="1.5"/>
        <path d="M17 9l5-3v12l-5-3V9z" stroke="#374151" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Live HD Video',
    desc: 'Stream real-time HD road and driver footage to improve driver behavior, retrieve video on-demand, and enforce safer driving across',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#374151" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Collision Prevention',
    desc: 'Analyze incidents with video evidence and deploy AI audible alerts to warn drivers instantly, reducing future collision risks.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="#374151" strokeWidth="1.5"/>
        <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Operational Efficiency',
    desc: 'AI driver monitoring detects drowsiness and distraction (yawning, eye closure, phone use, looking away), helping managers take',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Cost Savings',
    desc: 'Cut costs from accidents, insurance claims, vehicle damage, and fraud disputes with undeniable recorded proof that protects your',
  },
];

const textSections = [
  {
    eyebrow: 'Fleet Telematics',
    headline: 'Improve Fleet Operations with GPS Tracking & Telematics',
    body: 'Real-time GPS tracking to manage drivers, routes, and road operations with ease.',
    features: fleetFeatures,
  },
  {
    eyebrow: 'Video Telematics',
    headline: 'Enhance Fleet Visibility with Video Telematics',
    body: 'Live HD video insights to monitor drivers, road conditions, and on-road operations with ease.',
    subHeadline: 'AI-Powered Fleet Dash Cameras & MDVR Safety',
    subBody: 'Real-time driver monitoring, cargo surveillance, and multi-camera recording for trucks, taxis, buses, and commercial',
    features: videoFeatures,
    cols: 2,
  },
];

const SceneComponents = [Scene1Icons, Scene4Pricing];

function FeatureCard({ icon, title, desc }) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e8edf3',
      borderRadius: 16,
      padding: '10px 12px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      minHeight: 0,
    }}>
      <div style={{
        flexShrink: 0,
        width: 32,
        height: 32,
        borderRadius: 9,
        background: '#f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.82,
      }}>{icon}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0, overflow: 'hidden' }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#696b6b', lineHeight: 1.25 }}>{title}</span>
        <p style={{
          fontSize: 11,
          color: '#8090bc',
          lineHeight: 1.45,
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>{desc}</p>
      </div>
    </div>
  );
}

export default function ScrollShowcase() {
  const rowRefs   = useRef([]);
  const innerRefs = useRef([]);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const observers = rowRefs.current.map((el, i) => {
      if (!el) return null;
      // Use a generous rootMargin so the scene fires as soon as the row enters view.
      // On desktop the sticky anim panel is always visible, but the row entering/leaving
      // still gives us a clean play/stop signal. On mobile (stacked), the row entering
      // the viewport is exactly when we want the animation to start.
      const isDesktop = window.innerWidth >= 1024;
      const margin = isDesktop ? '-15% 0px -15% 0px' : '0px';
      const obs = new IntersectionObserver(
        ([entry]) => {
          const scene = innerRefs.current[i];
          if (!scene) return;
          if (entry.isIntersecting) {
            if (scene.__play) scene.__play();
          } else {
            if (scene.__stop) scene.__stop();
          }
        },
        { rootMargin: margin, threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });

    return () => {
      observers.forEach(o => o?.disconnect());
    };
  }, []);

  return (
    <section style={{ background: '#f5f7fa', width: '100%', position: 'relative' }}>
      {textSections.map((s, i) => {
        const SceneComponent = SceneComponents[i];
        // Zigzag on desktop: even index (0) → text left, animation right
        //                     odd index  (1) → animation left, text right
        // On mobile, animation always shows first (above text) regardless of zigzag.
        const animLeft = i % 2 === 1;

        const animPanel = (
          <div className="ss-anim-panel">
            {SceneComponent && (
              <SceneComponent ref={(el) => { if (el) innerRefs.current[i] = el; }} />
            )}
          </div>
        );

        const textPanel = (
          <div className="ss-text-panel">
            <span style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#0a89dd',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 18,
              display: 'block',
            }}>
              {s.eyebrow}
            </span>
            <h2 style={{
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#484b4c',
              margin: '0 0 16px',
              maxWidth: '100%',
            }}>
              {s.headline}
            </h2>
            <p style={{
              fontSize: 'clamp(13px, 1.2vw, 15px)',
              lineHeight: 1.65,
              color: '#8090bc',
              margin: '0 0 28px',
              maxWidth: 440,
            }}>
              {s.body}
            </p>

            {s.subHeadline && (
              <>
                <h3 style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', fontWeight: 700, color: '#696b6b', margin: '0 0 10px', maxWidth: '100%' }}>
                  {s.subHeadline}
                </h3>
                <p style={{ fontSize: 'clamp(12px, 1.1vw, 14px)', lineHeight: 1.6, color: '#8090bc', margin: '0 0 24px', maxWidth: 440 }}>
                  {s.subBody}
                </p>
              </>
            )}

            {s.features && (
              <div className="ss-feature-grid" style={{
                display: 'grid',
                gap: 10,
                maxWidth: 520,
              }}>
                {s.features.map((f) => (
                  <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
                ))}
              </div>
            )}
          </div>
        );

        return (
          <div
            key={i}
            ref={(el) => (rowRefs.current[i] = el)}
            // ss-row--anim-right: on desktop, text appears on left (order:0), anim on right (order:1)
            // This preserves the zigzag visual on desktop while keeping anim-first on mobile
            className={`ss-row${!animLeft ? ' ss-row--anim-right' : ''}`}
          >
            {animPanel}
            {textPanel}
          </div>
        );
      })}
    </section>
  );
}
