const VALUES = [
  'Supportive teammates',
  'Great atmosphere',
  'Perks & benefits',
  'Growth opportunities',
  'Competitive salary',
  'Cutting-edge technology',
  'Regional impact',
  'Freedom of expression',
  'Hands-on experience',
  'Mutual trust',
]

export default function CareerValues() {
  return (
    <section className="cv-section">
      <style>{`
        .cv-section { padding: clamp(56px,7vw,88px) 28px; background: #fff; }
        .cv-inner { max-width: var(--w-900); margin: 0 auto; text-align: center; }
        .cv-h2 {
          margin: 0 0 clamp(32px,4vw,44px);
          font-size: clamp(19px,2.6vw,30px); font-weight: 800; letter-spacing: -.01em;
          color: #1d1d1f; text-transform: uppercase; line-height: 1.3;
        }
        .cv-list { display: flex; flex-wrap: wrap; justify-content: center; column-gap: clamp(20px,3vw,40px); row-gap: clamp(14px,2vw,20px); }
        .cv-item { font-size: clamp(14px,1.4vw,16px); font-weight: 700; color: #1360ee; }
      `}</style>

      <div className="cv-inner">
        <h2 className="cv-h2">What our people value about LOCATOR</h2>
        <div className="cv-list" data-reveal>
          {VALUES.map((v) => <span key={v} className="cv-item">{v}</span>)}
        </div>
      </div>
    </section>
  )
}
