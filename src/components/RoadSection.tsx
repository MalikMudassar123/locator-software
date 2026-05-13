'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

const vehicles = [
  {
    id: 'car',
    src: '/car.png',
    alt: 'Car',
    width: 80,
    height: 52,
    bottom: '82%',
    left: '14%',
    pinSize: 24,
    pinBottom: '95%',
    pinLeft: '15.5%',
    zIndex: 10,
    tooltipTitle: 'Sedan Vehicle',
    tooltipDetails: 'Real-time tracking • Active',
    tooltipLocation: 'Dubai Marina',
  },
  {
    id: 'bus',
    src: '/bus.png',
    alt: 'Bus',
    width: 110,
    height: 64,
    bottom: '78%',
    left: '30%',
    pinSize: 26,
    pinBottom: '93%',
    pinLeft: '32%',
    zIndex: 10,
    tooltipTitle: 'Transit Bus',
    tooltipDetails: 'Real-time tracking • Active',
    tooltipLocation: 'Sheikh Zayed Road',
  },
  {
    id: 'van',
    src: '/van.png',
    alt: 'Van',
    width: 92,
    height: 56,
    bottom: '75%',
    left: '46%',
    pinSize: 22,
    pinBottom: '89%',
    pinLeft: '48%',
    zIndex: 10,
    tooltipTitle: 'Delivery Van',
    tooltipDetails: 'Real-time tracking • Active',
    tooltipLocation: 'Business Bay',
  },
  {
    id: 'yacht',
    src: '/yatch boat.png',
    alt: 'Yacht',
    width: 88,
    height: 52,
    bottom: '91%',
    left: '58%',
    pinSize: 22,
    pinBottom: '103%',
    pinLeft: '59.5%',
    zIndex: 10,
    tooltipTitle: 'Luxury Yacht',
    tooltipDetails: 'Real-time tracking • Active',
    tooltipLocation: 'Dubai Marina',
  },
  {
    id: 'generator',
    src: '/generator.png',
    alt: 'Generator',
    width: 48,
    height: 48,
    bottom: '72%',
    left: '72%',
    pinSize: 22,
    pinBottom: '84%',
    pinLeft: '73%',
    zIndex: 10,
    tooltipTitle: 'Generator Unit',
    tooltipDetails: 'Real-time tracking • Active',
    tooltipLocation: 'Industrial Area',
  },
  {
    id: 'truck',
    src: '/track.png',
    alt: 'Truck',
    width: 120,
    height: 72,
    bottom: '70%',
    left: '80%',
    pinSize: 28,
    pinBottom: '87%',
    pinLeft: '82%',
    zIndex: 10,
    tooltipTitle: 'Heavy Truck',
    tooltipDetails: 'Real-time tracking • Active',
    tooltipLocation: 'Jebel Ali Port',
  },
]

export default function RoadSection() {
  const [hoveredPin, setHoveredPin] = useState<string | null>(null)

  // Debug logging
  console.log('RoadSection rendered, hovered:', hoveredPin)

  useEffect(() => {
    const section = document.querySelector('section[style*="z-index: 100"]')
    if (section) {
      const rect = section.getBoundingClientRect()
      const styles = window.getComputedStyle(section)
      console.log('RoadSection position:', {
        top: rect.top,
        zIndex: styles.zIndex,
        position: styles.position,
      })
    }
  }, [])

  return (
    <section
      className="relative w-full"
      style={{
        height: 'clamp(200px, 36vw, 380px)',
        marginTop: '-1px',
        overflow: 'visible',
        zIndex: 100,
        position: 'relative',
      }}
    >
      {/* Road surface */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <Image
          src="/road.png"
          alt="Road"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Road divider line */}
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: '32%',
          height: '1.5px',
          background: 'linear-gradient(to right, transparent 0%, rgba(180,195,200,0.6) 10%, rgba(180,195,200,0.6) 90%, transparent 100%)',
          zIndex: 2,
        }}
      />

      {/* Vehicles layer */}
      <div className="road-vehicles-layer absolute inset-0" style={{ zIndex: 10 }}>
        {vehicles.map((v) => (
          <div key={v.id}>
            <div
              className="absolute cursor-pointer transition-all duration-500 ease-out"
              style={{ 
                bottom: v.bottom, 
                left: v.left,
                transform: hoveredPin === v.id ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
                filter: hoveredPin === v.id ? 'drop-shadow(0 6px 16px rgba(0,0,0,0.25))' : 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))',
              }}
              onMouseEnter={() => setHoveredPin(v.id)}
              onMouseLeave={() => setHoveredPin(null)}
            >
              <Image
                src={v.src}
                alt={v.alt}
                width={v.width}
                height={v.height}
                className="object-contain"
              />
            </div>
          </div>
        ))}

        {/* Scooter */}
        <div className="absolute" style={{ bottom: '60%', left: '60%' }}>
          <div
            className="cursor-pointer transition-all duration-500 ease-out"
            style={{
              transform: hoveredPin === 'scooter' ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
              filter: hoveredPin === 'scooter' ? 'drop-shadow(0 6px 16px rgba(0,0,0,0.25))' : 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))',
            }}
            onMouseEnter={() => setHoveredPin('scooter')}
            onMouseLeave={() => setHoveredPin(null)}
          >
            <Image
              src="/bike.png"
              alt="Delivery Scooter"
              width={150}
              height={126}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div
        className="absolute"
        style={{
          bottom: '38%',
          left: 'clamp(20px, 4vw, 50px)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* Get a Quote — filled blue */}
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#1a84b8',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 10px rgba(26,132,184,0.35)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="6" height="6" rx="1" fill="white" />
            <rect x="9" y="1" width="6" height="6" rx="1" fill="white" />
            <rect x="1" y="9" width="6" height="6" rx="1" fill="white" />
            <rect x="9" y="9" width="6" height="6" rx="1" fill="white" />
          </svg>
          Get a Quote
        </button>

        {/* Get a Free Demo — outlined */}
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#ffffff',
            color: '#1a6e9a',
            border: '1.5px solid #c8e4f5',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="6" height="6" rx="1" fill="#1a84b8" />
            <rect x="9" y="1" width="6" height="6" rx="1" fill="#1a84b8" />
            <rect x="1" y="9" width="6" height="6" rx="1" fill="#1a84b8" />
            <rect x="9" y="9" width="6" height="6" rx="1" fill="#1a84b8" />
          </svg>
          Get a Free Demo
        </button>
      </div>

      {/* GPS Icons layer - HIGHEST z-index */}
      <div className="road-vehicles-layer absolute inset-0" style={{ zIndex: 10000, pointerEvents: 'none' }}>
        {vehicles.map((v, index) => (
          v.pinSize > 0 && (
            <div
              key={`pin-${v.id}`}
              className="absolute cursor-pointer group"
              style={{ 
                bottom: v.pinBottom, 
                left: v.pinLeft,
                animation: `iconEntrance 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s both, iconFloat 5s ease-in-out ${1.0 + index * 0.5}s infinite`,
                pointerEvents: 'auto',
              }}
              onMouseEnter={() => setHoveredPin(v.id)}
              onMouseLeave={() => setHoveredPin(null)}
            >
              <div 
                className="relative transition-all duration-300 ease-out"
                style={{
                  filter: hoveredPin === v.id 
                    ? 'drop-shadow(0 0 10px rgba(58,174,219,0.9)) drop-shadow(0 0 16px rgba(58,174,219,0.6))' 
                    : 'drop-shadow(0 0 4px rgba(58,174,219,0.3))',
                  transform: hoveredPin === v.id ? 'scale(1.18) translateY(-4px)' : 'scale(1)',
                }}
              >
                <Image
                  src="/gps-pin.svg"
                  alt="GPS Pin"
                  width={v.pinSize}
                  height={v.pinSize}
                />
              </div>

              {hoveredPin === v.id && (
                <div
                  className="absolute"
                  style={{
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '18px',
                    animation: 'tooltipAppear 0.25s cubic-bezier(0.16, 1, 0.3, 1) both',
                    zIndex: 99999,
                    pointerEvents: 'auto',
                  }}
                  onMouseEnter={() => setHoveredPin(v.id)}
                  onMouseLeave={() => setHoveredPin(null)}
                >
                  <div
                    style={{
                      minWidth: '260px',
                      padding: '18px 22px',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 252, 255, 0.92) 100%)',
                      backdropFilter: 'blur(24px) saturate(200%)',
                      WebkitBackdropFilter: 'blur(24px) saturate(200%)',
                      borderRadius: '16px',
                      border: '1.5px solid rgba(58,174,219,0.35)',
                      boxShadow: `
                        0 20px 60px rgba(0,0,0,0.18),
                        0 8px 20px rgba(58,174,219,0.25),
                        0 2px 8px rgba(58,174,219,0.15),
                        inset 0 1px 0 rgba(255,255,255,1),
                        inset 0 -1px 0 rgba(58,174,219,0.1),
                        0 0 0 1px rgba(255,255,255,0.6),
                        0 0 20px rgba(58,174,219,0.15)
                      `,
                      position: 'relative',
                    }}
                  >
                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a6e9a', marginBottom: '10px', letterSpacing: '0.002em', lineHeight: '1.3' }}>
                      {v.tooltipTitle}
                    </div>
                    <div style={{ fontSize: '13px', color: '#3aaed6', marginBottom: '8px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '7px' }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'inline-block', boxShadow: '0 0 8px rgba(16,185,129,0.7), 0 0 3px rgba(16,185,129,0.9)', animation: 'statusPulse 2s ease-in-out infinite' }} />
                      {v.tooltipDetails}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ fontSize: '14px' }}>📍</span>
                      {v.tooltipLocation}
                    </div>
                    <div style={{ position: 'absolute', bottom: '-8px', left: '50%', marginLeft: '-8px', width: '0', height: '0', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid rgba(255, 255, 255, 0.95)', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.05))' }} />
                  </div>
                </div>
              )}
            </div>
          )
        ))}

        {/* Scooter GPS pin */}
        <div 
          className="absolute cursor-pointer group"
          style={{
            bottom: '78%',
            left: '62%',
            animation: 'iconEntrance 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.24s both, iconFloat 5s ease-in-out 1.5s infinite',
            pointerEvents: 'auto',
          }}
          onMouseEnter={() => setHoveredPin('scooter')}
          onMouseLeave={() => setHoveredPin(null)}
        >
          <div
            className="relative transition-all duration-300 ease-out"
            style={{
              filter: hoveredPin === 'scooter' 
                ? 'drop-shadow(0 0 10px rgba(58,174,219,0.9)) drop-shadow(0 0 16px rgba(58,174,219,0.6))' 
                : 'drop-shadow(0 0 4px rgba(58,174,219,0.3))',
              transform: hoveredPin === 'scooter' ? 'scale(1.18) translateY(-4px)' : 'scale(1)',
            }}
          >
            <Image src="/gps-pin.svg" alt="GPS Pin" width={24} height={24} />
          </div>

          {hoveredPin === 'scooter' && (
            <div
              className="absolute"
              style={{
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginBottom: '18px',
                animation: 'tooltipAppear 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both',
                zIndex: 99999,
                pointerEvents: 'auto',
              }}
              onMouseEnter={() => setHoveredPin('scooter')}
              onMouseLeave={() => setHoveredPin(null)}
            >
              <div style={{ minWidth: '260px', padding: '18px 22px', background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 252, 255, 0.92) 100%)', backdropFilter: 'blur(24px) saturate(200%)', WebkitBackdropFilter: 'blur(24px) saturate(200%)', borderRadius: '16px', border: '1.5px solid rgba(58,174,219,0.35)', boxShadow: `0 20px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(58,174,219,0.25), 0 2px 8px rgba(58,174,219,0.15), inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(58,174,219,0.1), 0 0 0 1px rgba(255,255,255,0.6), 0 0 20px rgba(58,174,219,0.15)`, position: 'relative' }}>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a6e9a', marginBottom: '10px', letterSpacing: '0.002em', lineHeight: '1.3' }}>Delivery Scooter</div>
                <div style={{ fontSize: '13px', color: '#3aaed6', marginBottom: '8px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'inline-block', boxShadow: '0 0 8px rgba(16,185,129,0.7), 0 0 3px rgba(16,185,129,0.9)', animation: 'statusPulse 2s ease-in-out infinite' }} />
                  Real-time tracking • Active
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontSize: '14px' }}>📍</span>
                  Downtown Dubai
                </div>
                <div style={{ position: 'absolute', bottom: '-8px', left: '50%', marginLeft: '-8px', width: '0', height: '0', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid rgba(255, 255, 255, 0.95)', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.05))' }} />
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes iconEntrance {
          0% {
            opacity: 0;
            transform: translateY(8px) scale(0.88);
            filter: blur(4px);
          }
          65% {
            opacity: 1;
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes iconFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes tooltipAppear {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(8px) scale(0.94);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes statusPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.82;
            transform: scale(1.18);
          }
        }
      `}</style>
    </section>
  )
}
