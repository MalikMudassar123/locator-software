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
  'Hazardous – Cargo',
  'Non-Hazardous – Cargo',
  'Personal vehicles',
  'Environmental waste',
]

export default function SecurepathPremiumVehicleList() {
  return (
    <>
      <style>{`
        .spp-veh-list { margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 8px; }
        .spp-veh-list li { font-size: clamp(14px,1.25vw,15.5px); line-height: 1.7; color: #6e6e73; }
      `}</style>

      <section style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#fff' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <h2 data-reveal style={{ margin: '0 0 14px', fontSize: 'clamp(22px,2.8vw,30px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-.02em', color: '#1360ee' }}>
            List of Vehicles comes under SecurePath Premium
          </h2>
          <p data-reveal style={{ margin: '0 0 24px', fontSize: 'clamp(14px,1.25vw,15.5px)', lineHeight: 1.8, color: '#6e6e73' }}>
            SecurePath Premium offers you a comprehensive list of vehicles that should be registered. Let&apos;s explore the list of vehicles that should be registered in SecurePath Premium.
          </p>

          <ul className="spp-veh-list" data-reveal>
            {VEHICLES.map(v => <li key={v}>{v}</li>)}
          </ul>
        </div>
      </section>
    </>
  )
}
