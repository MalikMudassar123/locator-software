'use client'

import { useState } from 'react'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

const FAQS = [
  {
    q: 'What is SecurePath in Dubai?',
    a: 'SecurePath is a mandatory registration specifically for rent-a-car businesses in Dubai. To ensure compliance, vehicles must have an approved GPS device installed from an authorized vendor before registering with the RTA.',
  },
  {
    q: 'Why is SecurePath registration mandatory for car rental vehicles in Dubai?',
    a: 'It was introduced by SIRA in collaboration with the RTA to enhance vehicle security across the car rental industry, ensuring transparency and accountability for every registered vehicle.',
  },
  {
    q: 'Can you explain the process of mandatory registration for car rental vehicles with RTA in Dubai?',
    a: 'An approved vendor installs a certified GPS tracker with a data SIM card, issues a Certificate of Installation, and that certificate is then used to register the vehicle with the RTA.',
  },
  {
    q: 'Are there any specific documents or criteria needed for registering car rental vehicles with RTA in Dubai?',
    a: 'You\'ll need your vehicle registration and trade license along with the Certificate of Installation from an approved GPS vendor — our team can guide you through the exact requirements for your fleet.',
  },
]

const STATS = [
  { value: '10+', label: 'Years in Business', bg: '#1360ee', color: '#fff' },
  { value: '1,000+', label: 'Happy Customers', bg: '#fff', color: '#1360ee' },
  { value: '20,000+', label: 'Tracked Devices', bg: '#fff', color: '#1360ee' },
  { value: '1,000,000+', label: 'Data points Daily', bg: '#f15a24', color: '#fff' },
]

export default function SecurepathFAQ() {
  const [openIdx, setOpenIdx] = useState<number>(0)
  const toggle = (i: number) => setOpenIdx(p => (p === i ? -1 : i))

  return (
    <>
      <style>{`
        .spfq-item {
          background: #fff;
          border: 1px solid #e8e8eb;
          border-left: 2.5px solid transparent;
          border-radius: 12px;
          overflow: hidden;
          transition: border-color .2s ${EASE}, box-shadow .2s ${EASE}, background .2s ${EASE};
        }
        .spfq-item.on {
          border-color: #cdd9ff;
          border-left-color: #1360ee;
          background: #fafbff;
          box-shadow: 0 2px 20px rgba(19,96,238,.08);
        }
        .spfq-trig {
          width: 100%; background: none; border: none;
          display: flex; align-items: flex-start; gap: 14px;
          padding: 17px 18px;
          cursor: pointer; font-family: inherit; text-align: left;
        }
        .spfq-num {
          font-size: 10px; font-weight: 700;
          font-family: ui-monospace, 'Cascadia Code', monospace;
          color: #c4c4d0; padding-top: 3px; flex-shrink: 0;
          width: 18px; letter-spacing: .02em;
          transition: color .18s ${EASE};
        }
        .spfq-item.on .spfq-num { color: #1360ee; }
        .spfq-qtext {
          flex: 1; font-size: 14px; font-weight: 700;
          line-height: 1.45; letter-spacing: -.01em; color: #1d1d1f;
          transition: color .18s ${EASE};
        }
        .spfq-item.on .spfq-qtext { color: #1360ee; }
        .spfq-icon {
          width: 26px; height: 26px; border-radius: 50%;
          display: grid; place-items: center; flex-shrink: 0;
          background: #f2f2f5; color: #a0a0b0;
          margin-top: 1px;
          transition: background .22s ${EASE}, color .22s ${EASE},
                      transform .48s cubic-bezier(.34,1.3,.64,1);
        }
        .spfq-item.on .spfq-icon {
          background: #dde7ff; color: #1360ee; transform: rotate(180deg);
        }
        .spfq-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows .44s ${EASE};
        }
        .spfq-item.on .spfq-body { grid-template-rows: 1fr; }
        .spfq-inner { overflow: hidden; min-height: 0; }
        .spfq-ans {
          margin: 0;
          padding: 0 18px 20px 50px;
          font-size: 13.5px; line-height: 1.72; color: #6e6e73;
          opacity: 0;
          transform: translateY(-7px);
          transition: opacity .22s 0s, transform .28s 0s ${EASE};
        }
        .spfq-item.on .spfq-ans {
          opacity: 1; transform: translateY(0);
          transition: opacity .32s .1s, transform .38s .08s ${EASE};
        }

        .sp-faqstats-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: clamp(28px,4vw,48px); align-items: start; }
        @media (max-width: 900px) { .sp-faqstats-grid { grid-template-columns: 1fr; } }
        .sp-stat-box {
          border-radius: 12px; padding: clamp(20px,2.4vw,26px);
          display: flex; flex-direction: column; gap: 6px; justify-content: center;
          min-height: 108px;
        }
        .sp-stat-mini-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      `}</style>

      <section id="faq" style={{ padding: 'clamp(56px,7vw,80px) 28px', background: '#fff' }}>
        {/* FAQPage structured data for rich search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQS.map(f => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            }),
          }}
        />
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>

          <div data-reveal style={{ marginBottom: '32px' }}>
            <h2 style={{ margin: 0, fontSize: 'clamp(22px,2.8vw,30px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-.02em', color: '#1d1d1f' }}>
              Frequently Asked Questions (FAQ)
            </h2>
          </div>

          <div className="sp-faqstats-grid">
            <div data-reveal="left" style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {FAQS.map((item, i) => (
                <div key={item.q} className={`spfq-item${openIdx === i ? ' on' : ''}`}>
                  <button className="spfq-trig" onClick={() => toggle(i)}>
                    <span className="spfq-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="spfq-qtext">{item.q}</span>
                    <span className="spfq-icon" aria-hidden="true">
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M1.5 3.5 5.5 7.5l4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                  <div className="spfq-body">
                    <div className="spfq-inner">
                      <p className="spfq-ans">{item.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div data-reveal="right" className="sp-stat-mini-grid">
              {STATS.map(s => (
                <div key={s.label} className="sp-stat-box" style={{ background: s.bg, boxShadow: s.bg === '#fff' ? '0 2px 12px rgba(0,0,0,.06)' : '0 10px 26px rgba(19,96,238,.18)' }}>
                  <span style={{ fontSize: 'clamp(20px,2.4vw,26px)', fontWeight: 800, letterSpacing: '-.02em', color: s.color }}>{s.value}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: s.bg === '#fff' ? '#1d1d1f' : 'rgba(255,255,255,.9)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
