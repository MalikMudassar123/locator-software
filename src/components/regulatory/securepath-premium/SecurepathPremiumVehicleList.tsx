const VEHICLES = [
  'Desert safari',
  'Cash in transit vehicles',
  'Chemical materials',
  'Diesel transport',
  'Explosive & fireworks',
  'Flammable liquids',
  'Gas trading',
  'Hazardous material',
  'Mobile workshop',
  'Petroleum transport',
  'Pilling contractors',
  'Radioactive materials',
  'Hazardous — Cargo',
  'Non-Hazardous — Cargo',
  'Personal vehicles',
  'Environmental waste',
]

export default function SecurepathPremiumVehicleList() {
  return (
    <>
      <style>{`
        .spp-veh-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; }
        @media (max-width: 820px) { .spp-veh-grid { grid-template-columns: repeat(3,1fr); } }
        @media (max-width: 600px) { .spp-veh-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 420px) { .spp-veh-grid { grid-template-columns: 1fr; } }
        .spp-veh-tag {
          display: flex; align-items: center; gap: 10px;
          padding: 13px 16px; border-radius: 12px;
          background: #f7f9fc; border: 1px solid #e4e4e8;
          font-size: 13.5px; font-weight: 600; color: #1d1d1f;
        }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div data-reveal style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.09em', color: '#1360ee', textTransform: 'uppercase' as const, display: 'block', marginBottom: '14px' }}>
              Coverage
            </span>
            <h2 style={{ margin: '0 auto 14px', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.02em', color: '#1d1d1f', maxWidth: '620px' }}>
              List of Vehicles Under SecurePath Premium
            </h2>
            <p style={{ margin: '0 auto', maxWidth: '560px', fontSize: 'clamp(14px,1.25vw,15.5px)', color: '#6e6e73', lineHeight: 1.6 }}>
              SecurePath Premium covers a comprehensive list of vehicle and business categories that should be registered.
            </p>
          </div>

          <div className="spp-veh-grid" data-reveal>
            {VEHICLES.map((v, i) => (
              <div key={v} className="spp-veh-tag" data-reveal data-reveal-delay={String((i % 4) * 60)}>
                <span style={{
                  width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(19,96,238,.12)', color: '#1360ee',
                  display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 800,
                }}>✓</span>
                {v}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
