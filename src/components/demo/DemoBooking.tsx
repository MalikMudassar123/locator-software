'use client'

import { useEffect, useMemo, useState } from 'react'

const EASE = 'cubic-bezier(.22,.61,.36,1)'

const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const WEEKDAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const TIME_SLOTS = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM']

const FIELDS = [
  { name: 'name', label: 'Full name', type: 'text', required: true, half: true, placeholder: 'Full name' },
  { name: 'email', label: 'Email address', type: 'email', required: true, half: true, placeholder: 'Email address' },
  { name: 'phone', label: 'Phone number', type: 'tel', required: false, half: true, placeholder: 'Phone number' },
  { name: 'company', label: 'Company', type: 'text', required: false, half: true, placeholder: 'Company' },
  { name: 'vehicles', label: 'Number of vehicles', type: 'text', required: false, half: false, placeholder: 'Number of vehicles' },
] as const

const TRUST = [
  {
    title: '30–45 min demo', sub: 'Personalized to your needs',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  },
  {
    title: 'No obligation', sub: 'Just expert guidance',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="17" rx="2.5" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>,
  },
  {
    title: 'Secure & private', sub: 'Your data is protected',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" /><path d="m9 12 2 2 4-4" /></svg>,
  },
  {
    title: 'Expert support', sub: 'We’re here to help',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="2.5" y="13" width="4" height="6" rx="1.5" /><rect x="17.5" y="13" width="4" height="6" rx="1.5" /><path d="M20 19a4 4 0 0 1-4 3h-2" /></svg>,
  },
]

type Cell = { day: number; inMonth: boolean; date: Date }

// A full 6-row grid: leading days from the previous month and trailing days
// from the next fill the blanks, greyed and non-selectable.
function buildGrid(year: number, month: number): Cell[] {
  const startDow = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevDays = new Date(year, month, 0).getDate()
  const cells: Cell[] = []
  for (let i = startDow - 1; i >= 0; i--) cells.push({ day: prevDays - i, inMonth: false, date: new Date(year, month - 1, prevDays - i) })
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, inMonth: true, date: new Date(year, month, d) })
  let next = 1
  while (cells.length < 42) { cells.push({ day: next, inMonth: false, date: new Date(year, month + 1, next) }); next++ }
  return cells
}

const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

export default function DemoBooking() {
  // Date state is set on mount only (client-side) so the server render and the
  // first client render agree — a `new Date()` during render would hydrate-mismatch.
  const [today, setToday] = useState<Date | null>(null)
  const [view, setView] = useState<{ y: number; m: number } | null>(null)
  const [selected, setSelected] = useState<Date | null>(null)
  const [time, setTime] = useState<string>('11:00 AM')
  const [sent, setSent] = useState(false)
  const [confirmed, setConfirmed] = useState<{ date: string; time: string } | null>(null)

  useEffect(() => {
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    setToday(t)
    setView({ y: t.getFullYear(), m: t.getMonth() })
    setSelected(t)
  }, [])

  const grid = useMemo(() => (view ? buildGrid(view.y, view.m) : []), [view])

  const atCurrentMonth = today && view ? view.y === today.getFullYear() && view.m === today.getMonth() : true

  const goMonth = (delta: number) => {
    setView((v) => {
      if (!v) return v
      const d = new Date(v.y, v.m + delta, 1)
      return { y: d.getFullYear(), m: d.getMonth() }
    })
  }

  const dateLabel = selected
    ? `${WEEKDAYS_LONG[selected.getDay()]}, ${MONTHS_SHORT[selected.getMonth()]} ${selected.getDate()}, ${selected.getFullYear()}`
    : ''

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selected) return
    setConfirmed({ date: dateLabel, time })
    setSent(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="db-sec">
      <style>{`
        .db-sec { padding: clamp(16px,2.4vw,32px) 28px clamp(40px,5vw,64px); background: #fff; }
        .db-shell { max-width: 1180px; margin: 0 auto; }
        .db-grid {
          display: grid; grid-template-columns: .92fr 1.08fr; gap: clamp(18px,2.2vw,28px); align-items: stretch;
        }
        @media (max-width: 980px) { .db-grid { grid-template-columns: 1fr; } }

        .db-card { background: #fff; border: 1px solid #e7ebf3; border-radius: 22px; box-shadow: 0 30px 60px -38px rgba(20,40,90,.22); }

        /* ── Left: form ── */
        .db-form-card { padding: clamp(22px,2.6vw,36px); }
        .db-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #1360ee; margin-bottom: 12px; }
        .db-eyebrow span { width: 22px; height: 2px; background: #1360ee; border-radius: 2px; }
        .db-title { margin: 0 0 6px; font-size: clamp(20px,2.3vw,27px); font-weight: 800; letter-spacing: -.025em; color: #1d1d1f; }
        .db-sub { margin: 0 0 22px; font-size: 14px; line-height: 1.6; color: #6e6e73; }

        .db-fgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 480px) { .db-fgrid { grid-template-columns: 1fr; } }
        .db-field { display: flex; flex-direction: column; gap: 6px; position: relative; }
        .db-field.full { grid-column: 1 / -1; }
        .db-label { font-size: 12px; font-weight: 700; color: #52525e; }
        .db-label b { color: #e5484d; }
        .db-input, .db-textarea {
          font-family: inherit; font-size: 14px; color: #1d1d1f; width: 100%;
          padding: 13px 15px; border-radius: 11px; border: 1.5px solid #e4e8f0; background: #fbfcfe;
          transition: border-color .18s ${EASE}, box-shadow .18s ${EASE}, background .18s ${EASE};
        }
        .db-input::placeholder, .db-textarea::placeholder { color: #aab0bd; }
        .db-input:focus, .db-textarea:focus { outline: none; border-color: #1360ee; background: #fff; box-shadow: 0 0 0 4px rgba(19,96,238,.12); }
        .db-textarea { resize: vertical; min-height: 92px; }

        .db-submit {
          margin-top: 20px; width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 16px 24px; border-radius: 12px; border: none; cursor: pointer;
          font-family: inherit; font-size: 15px; font-weight: 700; color: #fff;
          background: #1360ee; box-shadow: 0 12px 26px -10px rgba(19,96,238,.6); transition: .18s ${EASE};
        }
        .db-submit:hover { background: #0d4fd4; transform: translateY(-1px); box-shadow: 0 16px 32px -10px rgba(19,96,238,.7); }
        .db-submit svg { transition: transform .2s ${EASE}; }
        .db-submit:hover svg { transform: translateX(4px); }
        .db-safe { display: flex; align-items: center; justify-content: center; gap: 7px; margin: 14px 0 0; font-size: 12px; color: #8a92a3; }
        .db-safe svg { color: #1360ee; }

        /* success */
        .db-success { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; min-height: 460px; }
        .db-check { width: 64px; height: 64px; border-radius: 50%; margin-bottom: 22px; background: rgba(19,146,63,.1); color: #13923f; display: grid; place-items: center; animation: dbPop .5s ${EASE} both; }
        @keyframes dbPop { 0% { transform: scale(.5); opacity: 0 } 60% { transform: scale(1.1) } 100% { transform: scale(1); opacity: 1 } }
        .db-confirm { margin: 8px 0 20px; padding: 14px 16px; border-radius: 12px; background: #f2f7ff; border: 1px solid #dbe6ff; font-size: 13.5px; color: #1d1d1f; }
        .db-confirm b { color: #1360ee; }

        /* ── Right: scheduler ── */
        .db-sched-card { padding: clamp(20px,2.4vw,30px); display: flex; flex-direction: column; }
        .db-sched-head { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 18px; }
        .db-sched-ico { flex-shrink: 0; width: 40px; height: 40px; border-radius: 11px; background: #eaf1ff; color: #1360ee; display: grid; place-items: center; }
        .db-sched-ico svg { width: 20px; height: 20px; }
        .db-sched-h { margin: 0; font-size: clamp(16px,1.8vw,20px); font-weight: 800; letter-spacing: -.02em; color: #1d1d1f; }
        .db-sched-p { margin: 3px 0 0; font-size: 13px; color: #6e6e73; }

        .db-picker {
          border: 1px solid #eaedf4; border-radius: 16px; padding: clamp(16px,2vw,22px);
          display: grid; grid-template-columns: 1fr 200px; gap: clamp(16px,2vw,26px);
          background: linear-gradient(180deg, #ffffff, #fbfcff);
        }
        @media (max-width: 560px) { .db-picker { grid-template-columns: 1fr; } }

        .db-cal-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .db-cal-month { font-size: 15px; font-weight: 800; color: #1d1d1f; }
        .db-cal-navs { display: flex; gap: 6px; }
        .db-nav { width: 30px; height: 30px; border-radius: 8px; border: 1px solid #e4e8f0; background: #fff; color: #52525e; display: grid; place-items: center; cursor: pointer; transition: .16s ${EASE}; }
        .db-nav:hover:not(:disabled) { border-color: #1360ee; color: #1360ee; }
        .db-nav:disabled { opacity: .4; cursor: not-allowed; }

        .db-dow { display: grid; grid-template-columns: repeat(7,1fr); gap: 2px; margin-bottom: 6px; }
        .db-dow span { text-align: center; font-size: 11px; font-weight: 700; color: #a0a6b4; padding: 4px 0; }
        .db-days { display: grid; grid-template-columns: repeat(7,1fr); gap: 4px; }
        .db-day {
          aspect-ratio: 1; border: none; background: transparent; border-radius: 999px; cursor: pointer;
          font-family: inherit; font-size: 13px; font-weight: 600; color: #1d1d1f;
          display: grid; place-items: center; transition: background .15s ${EASE}, color .15s ${EASE}, transform .15s ${EASE};
        }
        .db-day.muted { color: #c4c9d4; cursor: default; }
        .db-day.past { color: #c4c9d4; cursor: not-allowed; }
        .db-day.avail { background: #eef4ff; color: #1360ee; }
        .db-day.avail:hover { background: #dbe7ff; transform: translateY(-1px); }
        .db-day.selected { background: #1360ee; color: #fff; box-shadow: 0 8px 18px -6px rgba(19,96,238,.6); }
        .db-day.today-ring { box-shadow: inset 0 0 0 1.5px rgba(19,96,238,.4); }

        .db-cal-skel { min-height: 260px; display: grid; place-items: center; color: #a0a6b4; font-size: 13px; }

        /* right rail: time slots */
        .db-slots-head { display: flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 800; color: #1d1d1f; }
        .db-slots-head svg { width: 15px; height: 15px; color: #1360ee; }
        .db-tz { margin: 3px 0 12px; font-size: 11.5px; color: #8a92a3; }
        .db-slots { display: flex; flex-direction: column; gap: 8px; max-height: 300px; overflow-y: auto; }
        @media (max-width: 560px) { .db-slots { display: grid; grid-template-columns: repeat(2,1fr); max-height: none; } }
        .db-slot {
          padding: 10px 14px; border-radius: 10px; border: 1.5px solid #e4e8f0; background: #fff; cursor: pointer;
          font-family: inherit; font-size: 13px; font-weight: 700; color: #1d1d1f; text-align: center;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          transition: .16s ${EASE};
        }
        .db-slot:hover { border-color: #9fbdf6; }
        .db-slot.active { background: #1360ee; border-color: #1360ee; color: #fff; box-shadow: 0 10px 20px -8px rgba(19,96,238,.55); }
        .db-slot .tick { width: 16px; height: 16px; border-radius: 50%; background: rgba(255,255,255,.25); display: grid; place-items: center; }

        .db-legend { display: flex; align-items: center; gap: 8px; margin-top: 14px; font-size: 12px; color: #8a92a3; }
        .db-legend i { width: 12px; height: 12px; border-radius: 50%; background: #eef4ff; box-shadow: inset 0 0 0 1px #cfe0ff; }

        /* trust badges */
        .db-trust {
          max-width: 1180px; margin: clamp(18px,2.2vw,26px) auto 0;
          border: 1px solid #e7ebf3; border-radius: 18px; background: #fff;
          display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; padding: clamp(16px,2vw,22px) clamp(14px,2vw,24px);
        }
        @media (max-width: 780px) { .db-trust { grid-template-columns: repeat(2,1fr); gap: 18px; } }
        @media (max-width: 420px) { .db-trust { grid-template-columns: 1fr; } }
        .db-trust-item { display: flex; align-items: center; gap: 12px; }
        .db-trust-ico { flex-shrink: 0; width: 38px; height: 38px; border-radius: 10px; background: #eaf1ff; color: #1360ee; display: grid; place-items: center; }
        .db-trust-ico svg { width: 19px; height: 19px; }
        .db-trust-t { margin: 0; font-size: 13.5px; font-weight: 800; color: #1d1d1f; line-height: 1.2; }
        .db-trust-s { margin: 2px 0 0; font-size: 12px; color: #6e6e73; }

        @media (prefers-reduced-motion: reduce) { .db-check { animation: none; } }
      `}</style>

      <div className="db-shell">
        <div className="db-grid">
          {/* ── Left: form ── */}
          <div className="db-card db-form-card">
            {sent ? (
              <div className="db-success">
                <div className="db-check">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </div>
                <h2 className="db-title">Your demo is booked</h2>
                {confirmed && (
                  <div className="db-confirm">
                    We’ve reserved <b>{confirmed.time}</b> on <b>{confirmed.date}</b>. Our team will email you a
                    confirmation and calendar invite shortly.
                  </div>
                )}
                <button className="db-submit" style={{ width: 'auto', marginTop: 0 }} onClick={() => setSent(false)}>Book another</button>
              </div>
            ) : (
              <>
                <span className="db-eyebrow"><span />Request a free demo</span>
                <h2 className="db-title">Tell us about your fleet</h2>
                <p className="db-sub">Share a few details and we’ll schedule a demo tailored to your operation.</p>

                <form onSubmit={handleSubmit}>
                  <div className="db-fgrid">
                    {FIELDS.map((f) => (
                      <div key={f.name} className={`db-field${f.half ? '' : ' full'}`}>
                        <label className="db-label" htmlFor={`db-${f.name}`}>{f.label}{f.required && <b> *</b>}</label>
                        <input id={`db-${f.name}`} className="db-input" type={f.type} name={f.name} required={f.required} placeholder={f.placeholder} />
                      </div>
                    ))}
                    <div className="db-field full">
                      <label className="db-label" htmlFor="db-message">Message <span style={{ color: '#aab0bd', fontWeight: 600 }}>(optional)</span></label>
                      <textarea id="db-message" className="db-textarea" name="message" placeholder="Anything specific we should know?" />
                    </div>
                  </div>

                  <button type="submit" className="db-submit">
                    Get a Free Demo
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </button>
                  <p className="db-safe">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" /></svg>
                    Your information is safe with us.
                  </p>
                </form>
              </>
            )}
          </div>

          {/* ── Right: scheduler ── */}
          <div className="db-card db-sched-card">
            <div className="db-sched-head">
              <span className="db-sched-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="17" rx="2.5" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>
              </span>
              <div>
                <h2 className="db-sched-h">Schedule your demo</h2>
                <p className="db-sched-p">Select a date and time that works for you.</p>
              </div>
            </div>

            {!view || !today ? (
              <div className="db-picker"><div className="db-cal-skel">Loading calendar…</div></div>
            ) : (
              <div className="db-picker">
                {/* calendar */}
                <div>
                  <div className="db-cal-top">
                    <span className="db-cal-month">{MONTHS_LONG[view.m]} {view.y}</span>
                    <div className="db-cal-navs">
                      <button type="button" className="db-nav" onClick={() => goMonth(-1)} disabled={!!atCurrentMonth} aria-label="Previous month">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m15 6-6 6 6 6" /></svg>
                      </button>
                      <button type="button" className="db-nav" onClick={() => goMonth(1)} aria-label="Next month">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
                      </button>
                    </div>
                  </div>

                  <div className="db-dow">{DOW.map((d, i) => <span key={i}>{d}</span>)}</div>
                  <div className="db-days">
                    {grid.map((c, i) => {
                      const past = c.date < today
                      const avail = c.inMonth && !past
                      const isSel = selected && sameDay(c.date, selected)
                      const isToday = sameDay(c.date, today)
                      const cls = [
                        'db-day',
                        !c.inMonth ? 'muted' : '',
                        c.inMonth && past ? 'past' : '',
                        avail && !isSel ? 'avail' : '',
                        isSel ? 'selected' : '',
                        isToday && !isSel ? 'today-ring' : '',
                      ].filter(Boolean).join(' ')
                      return (
                        <button
                          key={i}
                          type="button"
                          className={cls}
                          disabled={!avail}
                          onClick={() => avail && setSelected(c.date)}
                        >
                          {c.day}
                        </button>
                      )
                    })}
                  </div>
                  <div className="db-legend"><i />Available dates</div>
                </div>

                {/* time slots */}
                <div>
                  <div className="db-slots-head">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                    {dateLabel}
                  </div>
                  <p className="db-tz">(GMT+04:00) Gulf Standard Time</p>
                  <div className="db-slots">
                    {TIME_SLOTS.map((t) => (
                      <button key={t} type="button" className={`db-slot${t === time ? ' active' : ''}`} onClick={() => setTime(t)}>
                        {t}
                        {t === time && (
                          <span className="tick">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* trust badges */}
        <div className="db-trust">
          {TRUST.map((t) => (
            <div key={t.title} className="db-trust-item">
              <span className="db-trust-ico">{t.icon}</span>
              <div>
                <p className="db-trust-t">{t.title}</p>
                <p className="db-trust-s">{t.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
