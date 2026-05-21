'use client'

import Image from 'next/image'
import { useState } from 'react'

const vehicles = [
  {
    id: 'car',
    src: '/car.png',
    alt: 'Car',
    width: 100,
    height: 65,
    bottom: '82%',
    left: '14%',
    pinSize: 24,
    pinBottom: '103%',
    pinLeft: '15.5%',
    zIndex: 10,
    driverName: 'Ahmed Hassan',
    vehicleId: 'DRV1024',
    idlingTime: '3 mins',
    fuelLevel: '85%',
  },
  {
    id: 'bus',
    src: '/bus.png',
    alt: 'Bus',
    width: 132,
    height: 77,
    bottom: '78%',
    left: '30%',
    pinSize: 26,
    pinBottom: '101%',
    pinLeft: '32%',
    zIndex: 10,
    driverName: 'Mohammed Ali',
    vehicleId: 'BUS2156',
    idlingTime: '1 min',
    fuelLevel: '92%',
  },
  {
    id: 'van',
    src: '/van.png',
    alt: 'Van',
    width: 110,
    height: 67,
    bottom: '75%',
    left: '46%',
    pinSize: 22,
    pinBottom: '97%',
    pinLeft: '48%',
    zIndex: 10,
    driverName: 'Khalid Omar',
    vehicleId: 'VAN3421',
    idlingTime: '5 mins',
    fuelLevel: '67%',
  },
  {
    id: 'yacht',
    src: '/yatch boat.png',
    waterSrc: '/water.png',
    alt: 'Yacht',
    width: 106,
    height: 63,
    bottom: '84%',
    left: '57%',
    pinSize: 22,
    pinBottom: '112%',
    pinLeft: '59%',
    zIndex: 10,
    driverName: 'Captain Rashid',
    vehicleId: 'YCH4892',
    idlingTime: '0 mins',
    fuelLevel: '78%',
  },
  {
    id: 'generator',
    src: '/generator.png',
    alt: 'Generator',
    width: 58,
    height: 58,
    bottom: '72%',
    left: '72%',
    pinSize: 22,
    pinBottom: '92%',
    pinLeft: '73%',
    zIndex: 10,
    driverName: 'Generator Unit',
    vehicleId: 'GEN5673',
    idlingTime: '12 mins',
    fuelLevel: '45%',
  },
  {
    id: 'truck',
    src: '/track.png',
    alt: 'Truck',
    width: 144,
    height: 86,
    bottom: '70%',
    left: '80%',
    pinSize: 28,
    pinBottom: '97%',
    pinLeft: '82%',
    zIndex: 10,
    driverName: 'Saeed Abdullah',
    vehicleId: 'TRK6789',
    idlingTime: '2 mins',
    fuelLevel: '91%',
  },
]

export default function RoadSection() {
  const [hoveredPin, setHoveredPin] = useState<string | null>(null)
  const [showAllTooltips, setShowAllTooltips] = useState(true)

  // Hide all tooltips after 3 seconds on initial load
  useState(() => {
    const timer = setTimeout(() => {
      setShowAllTooltips(false)
    }, 3000)
    
    return () => clearTimeout(timer)
  })

  return (
    <section
      className="relative w-full"
      style={{
        height: 'clamp(140px, 22vw, 240px)',
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

      {/* Wavy bottom border matching ScrollShowcase background */}
      <div
        style={{
          position: 'absolute',
          bottom: -2,
          left: 0,
          right: 0,
          zIndex: 20,
          lineHeight: 0,
          pointerEvents: 'none',
        }}
      >
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '80px' }}
        >
          <path
            d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z"
            fill="#f5f7fa"
          />
        </svg>
      </div>

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
              {(v as any).waterSrc ? (
                <div style={{ position: 'relative', width: v.width + 16, height: v.height + 6, marginLeft: -8 }}>
                  {/* Water surface */}
                  <div style={{
                    position: 'absolute',
                    bottom: '18%',
                    left: 0,
                    right: 0,
                    height: '28%',
                    borderRadius: '4px',
                    background: 'linear-gradient(180deg, #bae6fd 0%, #38bdf8 100%)',
                    boxShadow: '0 1px 4px rgba(14,165,233,0.25)',
                  }} />
                  {/* Yacht */}
                  <Image
                    src={v.src}
                    alt={v.alt}
                    width={v.width}
                    height={v.height}
                    style={{
                      position: 'absolute',
                      bottom: '20%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      zIndex: 1,
                      objectFit: 'contain',
                    }}
                  />
                </div>
              ) : (
                <Image
                  src={v.src}
                  alt={v.alt}
                  width={v.width}
                  height={v.height}
                  className="object-contain"
                />
              )}
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
      <div className="road-cta-wrap">
        {/* Get a Quote — filled blue */}
        <button
          className="road-cta-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#0a89dd',
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
          className="road-cta-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#ffffff',
            color: '#0a89dd',
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

              {(hoveredPin === v.id || (showAllTooltips && index % 2 === 0)) && (
                <div
                  className="absolute"
                  style={{
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '12px',
                    animation: 'tooltipAppear 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
                    zIndex: 99999,
                    pointerEvents: 'auto',
                  }}
                  onMouseEnter={() => setHoveredPin(v.id)}
                  onMouseLeave={() => setHoveredPin(null)}
                >
                  <div
                    style={{
                      width: '150px',
                      padding: '7px 10px',
                      background: 'rgba(255, 255, 255, 0.88)',
                      backdropFilter: 'blur(60px) saturate(150%)',
                      WebkitBackdropFilter: 'blur(60px) saturate(150%)',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.6)',
                      boxShadow: `
                        0 24px 60px -15px rgba(0, 0, 0, 0.18),
                        0 8px 28px -10px rgba(58, 174, 219, 0.14),
                        inset 0 1px 0 rgba(255, 255, 255, 0.8),
                        0 0 0 1px rgba(255, 255, 255, 0.3)
                      `,
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {/* Header with avatar, driver name and menu */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}>
                        {/* Avatar */}
                        <div style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          border: '1.5px solid rgba(255, 255, 255, 0.85)',
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                        }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#0ea5e9"/>
                          </svg>
                        </div>
                        <div style={{
                          fontSize: '11.5px',
                          fontWeight: 700,
                          color: '#1e3a5f',
                          letterSpacing: '-0.01em',
                        }}>
                          {v.driverName}
                        </div>
                      </div>
                      <div style={{
                        display: 'flex',
                        gap: '2px',
                        opacity: 0.4,
                      }}>
                        <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#1e3a5f' }} />
                        <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#1e3a5f' }} />
                        <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#1e3a5f' }} />
                      </div>
                    </div>

                    {/* Vehicle ID */}
                    <div style={{
                      fontSize: '9px',
                      color: '#64748b',
                      fontWeight: 500,
                      marginBottom: '5px',
                    }}>
                      ID: {v.vehicleId}
                    </div>

                    {/* Divider */}
                    <div style={{
                      height: '1px',
                      background: 'rgba(203, 213, 225, 0.3)',
                      marginBottom: '5px',
                    }} />

                    {/* Idling Time */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '5px',
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.6 }}>
                          <circle cx="12" cy="12" r="10" stroke="#64748b" strokeWidth="2" fill="none"/>
                          <path d="M12 6v6l4 2" stroke="#64748b" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span style={{
                          fontSize: '9.5px',
                          color: '#64748b',
                          fontWeight: 500,
                        }}>
                          Idling Time
                        </span>
                      </div>
                      <span style={{
                        fontSize: '10.5px',
                        color: '#0ea5e9',
                        fontWeight: 700,
                      }}>
                        {v.idlingTime}
                      </span>
                    </div>

                    {/* Divider */}
                    <div style={{
                      height: '1px',
                      background: 'rgba(203, 213, 225, 0.3)',
                      marginBottom: '5px',
                    }} />

                    {/* Fuel Level */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.6 }}>
                          <path d="M3 8h12v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V8zm0-2V4c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v2M15 11l4-4v10l-4-4" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        </svg>
                        <span style={{
                          fontSize: '9.5px',
                          color: '#64748b',
                          fontWeight: 500,
                        }}>
                          Fuel
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}>
                        <svg width="14" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M3 8h12v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V8zm0-2V4c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v2M15 11l4-4v10l-4-4" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#0ea5e9"/>
                        </svg>
                        <span style={{
                          fontSize: '10.5px',
                          color: '#0ea5e9',
                          fontWeight: 700,
                        }}>
                          {v.fuelLevel}
                        </span>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <div style={{ 
                      position: 'absolute', 
                      bottom: '-8px', 
                      left: '50%', 
                      marginLeft: '-8px', 
                      width: '0', 
                      height: '0', 
                      borderLeft: '8px solid transparent', 
                      borderRight: '8px solid transparent', 
                      borderTop: '8px solid rgba(255, 255, 255, 0.85)', 
                      filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                    }} />
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
            bottom: '86%',
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
                marginBottom: '12px',
                animation: 'tooltipAppear 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
                zIndex: 99999,
                pointerEvents: 'auto',
              }}
              onMouseEnter={() => setHoveredPin('scooter')}
              onMouseLeave={() => setHoveredPin(null)}
            >
              <div
                style={{
                  width: '150px',
                  padding: '7px 10px',
                  background: 'rgba(255, 255, 255, 0.88)',
                  backdropFilter: 'blur(60px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(60px) saturate(150%)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.6)',
                  boxShadow: `
                    0 24px 60px -15px rgba(0, 0, 0, 0.18),
                    0 8px 28px -10px rgba(58, 174, 219, 0.14),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8),
                    0 0 0 1px rgba(255, 255, 255, 0.3)
                  `,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Header with avatar, driver name and menu */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: '4px',
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                  }}>
                    {/* Avatar */}
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: '1.5px solid rgba(255, 255, 255, 0.85)',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#0ea5e9"/>
                      </svg>
                    </div>
                    <div style={{ 
                      fontSize: '11.5px',
                      fontWeight: 700,
                      color: '#1e3a5f',
                      letterSpacing: '-0.01em',
                    }}>
                      Ali Rahman
                    </div>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    gap: '2px',
                    opacity: 0.4,
                  }}>
                    <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#1e3a5f' }} />
                    <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#1e3a5f' }} />
                    <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#1e3a5f' }} />
                  </div>
                </div>

                {/* Vehicle ID */}
                <div style={{ 
                  fontSize: '9px',
                  color: '#64748b',
                  fontWeight: 500,
                  marginBottom: '5px',
                }}>
                  ID: SCT7845
                </div>

                {/* Divider */}
                <div style={{
                  height: '1px',
                  background: 'rgba(203, 213, 225, 0.3)',
                  marginBottom: '5px',
                }} />

                {/* Idling Time */}
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '5px',
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.6 }}>
                      <circle cx="12" cy="12" r="10" stroke="#64748b" strokeWidth="2" fill="none"/>
                      <path d="M12 6v6l4 2" stroke="#64748b" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span style={{
                      fontSize: '9.5px',
                      color: '#64748b',
                      fontWeight: 500,
                    }}>
                      Idling Time
                    </span>
                  </div>
                  <span style={{
                    fontSize: '10.5px',
                    color: '#0ea5e9',
                    fontWeight: 700,
                  }}>
                    4 mins
                  </span>
                </div>

                {/* Divider */}
                <div style={{
                  height: '1px',
                  background: 'rgba(203, 213, 225, 0.3)',
                  marginBottom: '5px',
                }} />

                {/* Fuel Level */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.6 }}>
                      <path d="M3 8h12v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V8zm0-2V4c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v2M15 11l4-4v10l-4-4" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                    <span style={{
                      fontSize: '9.5px',
                      color: '#64748b',
                      fontWeight: 500,
                    }}>
                      Fuel
                    </span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '5px',
                  }}>
                    <svg width="14" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M3 8h12v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V8zm0-2V4c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v2M15 11l4-4v10l-4-4" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#0ea5e9"/>
                    </svg>
                    <span style={{
                      fontSize: '10.5px',
                      color: '#0ea5e9',
                      fontWeight: 700,
                    }}>
                      73%
                    </span>
                  </div>
                </div>
                
                {/* Arrow */}
                <div style={{ 
                  position: 'absolute', 
                  bottom: '-8px', 
                  left: '50%', 
                  marginLeft: '-8px', 
                  width: '0', 
                  height: '0', 
                  borderLeft: '8px solid transparent', 
                  borderRight: '8px solid transparent', 
                  borderTop: '8px solid rgba(255, 255, 255, 0.85)', 
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                }} />
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
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
          }
          50% {
            opacity: 0.8;
            box-shadow: 0 0 0 5px rgba(16, 185, 129, 0.3);
          }
        }
      `}</style>
    </section>
  )
}
