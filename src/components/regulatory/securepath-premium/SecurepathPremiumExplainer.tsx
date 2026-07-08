export default function SecurepathPremiumExplainer() {
  return (
    <section style={{ padding: 'clamp(56px,7vw,80px) 28px 0', background: '#fff' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <div data-reveal style={{
          width: 40, height: 40, borderRadius: 10,
          display: 'grid', placeItems: 'center', marginBottom: '18px',
          background: 'rgba(19,96,238,.10)', color: '#1360ee',
        }}>
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <circle cx="9" cy="9" r="5" fill="currentColor" opacity=".9" />
            <circle cx="19" cy="9" r="5" fill="currentColor" opacity=".65" />
            <circle cx="14" cy="18" r="5" fill="currentColor" opacity=".4" />
          </svg>
        </div>

        <h2 data-reveal style={{ margin: '0 0 18px', fontSize: 'clamp(22px,2.8vw,30px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-.02em', color: '#1360ee' }}>
          What is SecurePath Premium
        </h2>

        <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '1000px' }}>
          <p style={{ margin: 0, fontSize: 'clamp(14px,1.25vw,15.5px)', lineHeight: 1.8, color: '#6e6e73' }}>
            SecurePath Premium is a mandatory registration program in Dubai that focuses on enhancing vehicle security and accountability through the installation of GPS trackers. This program is specifically designed for selected businesses operating in Dubai and aims to ensure the safety and security of vehicles.
          </p>
          <p style={{ margin: 0, fontSize: 'clamp(14px,1.25vw,15.5px)', lineHeight: 1.8, color: '#6e6e73' }}>
            The importance of SecurePath Premium lies in its ability to provide selected businesses with a comprehensive solution for vehicle tracking, allowing them to monitor their fleet&apos;s movements in real-time. By installing GPS trackers, businesses can enhance their operational efficiency, improve driver accountability, and mitigate risks associated with vehicle theft or unauthorized usage.
          </p>
          <p style={{ margin: 0, fontSize: 'clamp(14px,1.25vw,15.5px)', lineHeight: 1.8, color: '#6e6e73' }}>
            To participate in SecurePath Premium, businesses must obtain a Certificate of Installation from approved vendors. This certificate serves as proof that the GPS tracker has been installed correctly and meets all necessary requirements.
          </p>
        </div>
      </div>
    </section>
  )
}
