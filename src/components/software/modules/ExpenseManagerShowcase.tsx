'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
// Expense Manager — interactive wireframe showcase (Web + Mobile).
// Ported from Locator-websites em-data/em-web/em-mobile.
import { createContext, useContext, useState, useRef, useEffect, useMemo, type ReactNode } from 'react'
import { ModuleTabs, StatusBar, BottomNav } from './TaskManagerShowcase'

const EM_CATEGORIES: Record<string, { icon: string; color: string; label: string }> = {
  '--': { icon: '💰', color: '#22c55e', label: 'Payment' },
  'ACCESSORIES PURCHASE': { icon: '🛒', color: '#7a5ae0', label: 'Accessories Purchase' },
  PARKING: { icon: '🅿️', color: '#0ea5e9', label: 'Parking' },
  'R&M- CARS': { icon: '🔧', color: '#f59e0b', label: 'R&M - Cars' },
}

const INIT_EXPENSES: any[] = [
  { id: 1, date: '23/05/2026 18:50', employee: 'anshad', category: '--', description: 'Advance for Pettycash', billAmount: null, paidAmount: 340.0, balance: 340.0, type: 'payment' },
  { id: 2, date: '23/05/2026 18:49', employee: 'anshad', category: '--', description: 'bills reimbursement', billAmount: null, paidAmount: 460.0, balance: 0.0, type: 'payment' },
  { id: 3, date: '22/05/2026 17:57', employee: 'anshad', category: 'ACCESSORIES PURCHASE', description: 'Cooling Sticker', billAmount: 150.0, paidAmount: null, balance: -460.0, type: 'expense' },
  { id: 4, date: '20/05/2026 18:07', employee: 'anshad', category: 'ACCESSORIES PURCHASE', description: 'Cycle Puncture', billAmount: 20.0, paidAmount: null, balance: -310.0, type: 'expense' },
  { id: 5, date: '20/05/2026 16:31', employee: 'anshad', category: 'PARKING', description: '-', billAmount: 100.0, paidAmount: null, balance: -290.0, type: 'expense' },
  { id: 6, date: '20/05/2026 16:26', employee: 'anshad', category: 'R&M- CARS', description: 'Petrol -115', billAmount: 115.0, paidAmount: null, balance: -190.0, type: 'expense' },
  { id: 7, date: '16/05/2026 12:43', employee: 'anshad', category: 'R&M- CARS', description: 'VH No - 84759 - Date : 14-...', billAmount: 110.0, paidAmount: null, balance: -75.0, type: 'expense' },
  { id: 8, date: '12/05/2026 19:34', employee: 'anshad', category: 'R&M- CARS', description: 'Fuel Expenses Date : 10 - ...', billAmount: 115.0, paidAmount: null, balance: 35.0, type: 'expense' },
  { id: 9, date: '12/05/2026 19:07', employee: 'anshad', category: 'PARKING', description: 'I got a payment failed m...', billAmount: 50.0, paidAmount: null, balance: 150.0, type: 'expense' },
]
const EM_TOTAL_BALANCE = -1478.0

interface EMCtx { expenses: any[]; selectedId: number | null; setSelectedId: (id: number | null) => void; selectedExpense: any }
const EMContext = createContext<EMCtx | null>(null)
const useEM = () => useContext(EMContext) as EMCtx

function EMProvider({ children }: { children: ReactNode }) {
  const [expenses] = useState(INIT_EXPENSES)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const selectedExpense = useMemo(() => expenses.find(e => e.id === selectedId) || null, [expenses, selectedId])
  const value = useMemo<EMCtx>(() => ({ expenses, selectedId, setSelectedId, selectedExpense }), [expenses, selectedId, selectedExpense])
  return <EMContext.Provider value={value}>{children}</EMContext.Provider>
}

function EMDropdown({ label, options }: { label: string; options: string[] }) {
  const [open, setOpen] = useState(false)
  const [sel, setSel] = useState(label)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [open])
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#475569', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
        {sel}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"><path d="M1 1l4 4 4-4" /></svg>
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', right: 0, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 4, boxShadow: '0 10px 30px -8px rgba(0,0,0,.16)', zIndex: 60, minWidth: 150 }}>
          {options.map(opt => (
            <button key={opt} onClick={() => { setSel(opt); setOpen(false) }}
              className="tm-status-option" style={{ fontWeight: opt === sel ? 700 : 500, color: '#334155' }}>
              {opt}{opt === sel && <span style={{ marginLeft: 8, color: '#1360EF' }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function EMDetailPanel({ expense, onClose }: { expense: any; onClose: () => void }) {
  const cat = EM_CATEGORIES[expense.category] || EM_CATEGORIES['--']
  const Field = ({ label, children }: { label: string; children: ReactNode }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1e293b' }}>{children}</div>
    </div>
  )
  return (
    <div className="tm-detail-side" style={{ width: 260, flexShrink: 0 }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Expense #{expense.id}</span>
        <div style={{ display: 'flex', gap: 5 }}>
          {['✏️', '💬'].map((icon, i) => <button key={i} className="tm-detail-action">{icon}</button>)}
          <button className="tm-detail-action" onClick={onClose}>✕</button>
        </div>
      </div>
      <div className="tm-detail-scroll">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `${cat.color}20`, display: 'grid', placeItems: 'center', fontSize: 20 }}>{cat.icon}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{expense.description}</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>{expense.category !== '--' ? expense.category : 'Payment'}</div>
          </div>
        </div>
        <Field label="Date & Time">{expense.date}</Field>
        <Field label="Employee">{expense.employee}</Field>
        <Field label="Category">{expense.category !== '--' ? expense.category : '—'}</Field>
        <Field label="Description">{expense.description}</Field>
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 14, marginTop: 4 }}>
          <Field label="Bill Amount">{expense.billAmount ? `${expense.billAmount.toFixed(2)} AED` : '—'}</Field>
          <Field label="Paid Amount">{expense.paidAmount ? `${expense.paidAmount.toFixed(2)} AED` : '—'}</Field>
          <Field label="Balance"><span style={{ color: expense.balance < 0 ? '#ef4444' : '#1e293b', fontWeight: 700 }}>{expense.balance.toFixed(2)} AED</span></Field>
        </div>
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 14, marginTop: 4 }}>
          <Field label="Status">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 11px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: expense.type === 'payment' ? '#e8faf0' : '#fff5e6', color: expense.type === 'payment' ? '#16a34a' : '#d97706' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: expense.type === 'payment' ? '#16a34a' : '#d97706' }} />
              {expense.type === 'payment' ? 'Approved' : 'Pending Review'}
            </span>
          </Field>
        </div>
      </div>
    </div>
  )
}

function EMWebDashboard() {
  const { expenses, selectedId, setSelectedId, selectedExpense } = useEM()
  const [hoverRow, setHoverRow] = useState<number | null>(null)
  const cols = ['Date', 'Employee Name', 'Category', 'Description', 'Bill Amount', 'Paid Amount', 'Balance']
  return (
    <div className="ms-web-min" style={{ border: '1px solid #dce1e8', borderRadius: 16, overflow: 'hidden', background: '#fff', boxShadow: '0 6px 32px -8px rgba(30,41,59,.1),0 1px 2px rgba(0,0,0,.04)', display: 'flex', flexDirection: 'column', height: 520 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
        <div style={{ display: 'flex', gap: 6 }}>{[0, 1, 2].map(i => <span key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: '#e0e0e3' }} />)}</div>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: '#94a3b8', marginLeft: 6 }}>Expense Manager — Approvals</span>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderBottom: '1px solid #f0f0f0', flexShrink: 0, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#dbeafe', display: 'grid', placeItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M5 20c0-4 3.5-6 7-6s7 2 7 6" /></svg>
              </div>
              <div><div style={{ fontSize: 12.5, fontWeight: 700, color: '#1e293b', lineHeight: 1.2 }}>anshad</div><div style={{ fontSize: 10, color: '#94a3b8' }}>nill</div></div>
            </div>
            <div style={{ marginLeft: 'auto', textAlign: 'right', marginRight: 8, flexShrink: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: '#1e293b' }}>Total Balance : <span style={{ color: '#ef4444' }}>-1478.00 AED</span></div>
              <div style={{ fontSize: 10, color: '#94a3b8' }}>01-05-2026 To 20-06-2026</div>
            </div>
            <button className="em-pay-btn" style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>MAKE A PAYMENT</button>
            <EMDropdown label="Custom Date" options={['Custom Date', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Last Month']} />
            <EMDropdown label="All Categories" options={['All Categories', 'PARKING', 'R&M- CARS', 'ACCESSORIES PURCHASE']} />
            <EMDropdown label="All" options={['All', 'Approved', 'Pending', 'Rejected']} />
            <button className="em-dots-btn" style={{ width: 30, height: 30, borderRadius: 8, background: '#2563eb', border: 'none', color: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center', fontSize: 15, fontWeight: 700, flexShrink: 0 }}>⋮</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                  {cols.map(c => <th key={c} style={{ padding: '10px 12px', textAlign: 'center', fontSize: 11.5, fontWeight: 700, color: '#64748b', background: '#fafbfc', whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>{c}</th>)}
                </tr>
              </thead>
              <tbody>
                {expenses.map(exp => {
                  const isPay = exp.type === 'payment'; const isSel = selectedId === exp.id; const isHov = hoverRow === exp.id
                  return (
                    <tr key={exp.id} onClick={() => setSelectedId(isSel ? null : exp.id)} onMouseEnter={() => setHoverRow(exp.id)} onMouseLeave={() => setHoverRow(null)}
                      style={{ borderBottom: '1px solid #f5f5f5', cursor: 'pointer', background: isSel ? '#EAF1FF' : isHov ? '#f8fafc' : isPay ? '#f0fdf4' : 'transparent', borderLeft: isPay ? '3px solid #22c55e' : '3px solid transparent', transition: 'background 0.15s ease' }}>
                      <td style={{ padding: '11px 12px', textAlign: 'center', fontSize: 12, color: '#475569', whiteSpace: 'nowrap' }}>{exp.date}</td>
                      <td style={{ padding: '11px 12px', textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{exp.employee}</td>
                      <td style={{ padding: '11px 12px', textAlign: 'center', fontSize: 12, color: '#475569' }}>{exp.category}</td>
                      <td style={{ padding: '11px 12px', textAlign: 'center', fontSize: 12, color: '#475569', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{exp.description}</td>
                      <td style={{ padding: '11px 12px', textAlign: 'center', fontSize: 12, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{exp.billAmount ? `${exp.billAmount.toFixed(2)} AED` : '--'}</td>
                      <td style={{ padding: '11px 12px', textAlign: 'center', fontSize: 12, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{exp.paidAmount ? `${exp.paidAmount.toFixed(2)} AED` : '--'}</td>
                      <td style={{ padding: '11px 12px', textAlign: 'center', fontSize: 12, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: exp.balance < 0 ? '#ef4444' : '#1e293b' }}>{exp.balance.toFixed(2)} AED</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '10px 16px', borderTop: '1px solid #e2e8f0', flexShrink: 0 }}>
            <div style={{ padding: '7px 18px', borderRadius: 8, fontSize: 12.5, fontWeight: 700, background: '#fef2f2', color: '#ef4444', fontVariantNumeric: 'tabular-nums' }}>760.00 AED</div>
            <div style={{ padding: '7px 18px', borderRadius: 8, fontSize: 12.5, fontWeight: 700, background: '#f0fdf4', color: '#166534', fontVariantNumeric: 'tabular-nums' }}>1100.00 AED</div>
          </div>
        </div>
        {selectedExpense && <EMDetailPanel expense={selectedExpense} onClose={() => setSelectedId(null)} />}
      </div>
    </div>
  )
}

function EMFormField({ label, value, placeholder }: { label: string; value?: string; placeholder?: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 4 }}>{label}</div>
      <input defaultValue={value} placeholder={placeholder} style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 10, padding: '11px 14px', fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', color: '#1e293b' }} />
    </div>
  )
}

function EMAddExpenseModal({ onClose }: { onClose: () => void }) {
  const [vehicleOn, setVehicleOn] = useState(true)
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 30, display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} onClick={onClose} />
      <div style={{ position: 'relative', marginTop: 'auto', background: '#fff', borderRadius: '20px 20px 0 0', padding: '20px 18px 30px', maxHeight: '88%', overflowY: 'auto', animation: 'emSlideUp 0.3s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#1e293b' }}>Add Expense</span>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer', fontSize: 14, display: 'grid', placeItems: 'center', color: '#64748b', padding: 0 }}>✕</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8"><rect x="1" y="6" width="22" height="11" rx="3" /><circle cx="6" cy="17" r="2" /><circle cx="18" cy="17" r="2" /><path d="M5 6l2-3h10l2 3" /></svg>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>Related To Vehicle</span>
          </div>
          <div onClick={() => setVehicleOn(!vehicleOn)} style={{ width: 44, height: 24, borderRadius: 12, cursor: 'pointer', background: vehicleOn ? '#2563eb' : '#cbd5e1', transition: 'background 0.2s', position: 'relative', padding: 2 }}>
            <div style={{ width: 20, height: 20, borderRadius: 10, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.2)', transition: 'transform 0.2s', transform: vehicleOn ? 'translateX(20px)' : 'translateX(0)' }} />
          </div>
        </div>
        {vehicleOn && <EMFormField label="Vehicle" value="Shamnad Support C 19753" />}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 4 }}>Category</div>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '11px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#94a3b8', fontSize: 13 }}>
            <span>Select category</span>
            <svg width="12" height="7" viewBox="0 0 10 6" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"><path d="M1 1l4 4 4-4" /></svg>
          </div>
        </div>
        <EMFormField label="Amount" placeholder="0.00" />
        <EMFormField label="Odometer" placeholder="Enter reading" />
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 4 }}>Description</div>
          <textarea placeholder="Add details..." style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: 10, padding: '11px 14px', fontSize: 13, fontFamily: 'inherit', minHeight: 70, resize: 'vertical', outline: 'none', boxSizing: 'border-box', color: '#1e293b' }} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 4 }}>Attachment</div>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#2563eb', cursor: 'pointer' }}>Upload Attachment</span>
        </div>
        <button style={{ width: '100%', padding: '13px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send</button>
      </div>
    </div>
  )
}

function EMMobileCard({ exp, onClick }: { exp: any; onClick: () => void }) {
  const cat = EM_CATEGORIES[exp.category] || EM_CATEGORIES['--']
  const isPay = exp.type === 'payment'; const amt = isPay ? exp.paidAmount : exp.billAmount
  const dateParts = exp.date.split(' ')
  return (
    <div onClick={onClick} style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', marginBottom: 10, boxShadow: '0 1px 3px rgba(0,0,0,.04)', cursor: 'pointer', border: '1px solid #f0f0f0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#f1f5f9', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={cat.color} strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 8v4l2 2" /></svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>{dateParts[0]} {dateParts[1]} PM</div>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1e293b', marginTop: 1 }}>{exp.description === '-' ? cat.label : exp.description}</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#2563eb', marginTop: 1 }}>{exp.category !== '--' ? exp.category : 'PAYMENT'}</div>
        </div>
        <div style={{ flexShrink: 0, textAlign: 'right' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: isPay ? '#16a34a' : '#dc2626' }}>{isPay ? '+' : '−'} AED {amt?.toFixed(1)}</div>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: isPay ? '#16a34a' : '#dc2626' }}>{isPay ? 'Approved' : 'Pending'}</div>
        </div>
      </div>
    </div>
  )
}

function EMMobileDetail({ exp, onBack }: { exp: any; onBack: () => void }) {
  const cat = EM_CATEGORIES[exp.category] || EM_CATEGORIES['--']
  const isPay = exp.type === 'payment'
  const Field = ({ label, children }: { label: string; children: ReactNode }) => (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{children}</div>
    </div>
  )
  return (
    <>
      <div style={{ background: '#1360EF', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18, padding: 0, lineHeight: 1 }}>←</button>
        <span style={{ color: '#fff', fontSize: 16, fontWeight: 800 }}>Expense Details</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 14, background: '#F0F4F7' }}>
        <div style={{ background: '#fff', borderRadius: 14, padding: 16, marginBottom: 10, boxShadow: '0 1px 3px rgba(0,0,0,.05)', textAlign: 'center' }}>
          <div style={{ width: 50, height: 50, borderRadius: 14, background: `${cat.color}18`, display: 'grid', placeItems: 'center', fontSize: 26, margin: '0 auto 10px' }}>{cat.icon}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#1e293b' }}>{exp.description}</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', marginTop: 2 }}>{exp.category !== '--' ? exp.category : 'Payment'}</div>
          <div style={{ fontSize: 24, fontWeight: 800, marginTop: 12, color: isPay ? '#16a34a' : '#dc2626' }}>{isPay ? '+' : '−'} AED {(isPay ? exp.paidAmount : exp.billAmount)?.toFixed(2)}</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 8, padding: '4px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: isPay ? '#e8faf0' : '#fff5e6', color: isPay ? '#16a34a' : '#d97706' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: isPay ? '#16a34a' : '#d97706' }} />{isPay ? 'Approved' : 'Pending'}
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, boxShadow: '0 1px 3px rgba(0,0,0,.05)' }}>
          <Field label="Date & Time">{exp.date}</Field>
          <Field label="Employee">{exp.employee}</Field>
          <Field label="Category">{exp.category !== '--' ? exp.category : '—'}</Field>
          <Field label="Description">{exp.description}</Field>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, padding: 14, boxShadow: '0 1px 3px rgba(0,0,0,.05)' }}>
          <Field label="Bill Amount">{exp.billAmount ? `${exp.billAmount.toFixed(2)} AED` : '—'}</Field>
          <Field label="Paid Amount">{exp.paidAmount ? `${exp.paidAmount.toFixed(2)} AED` : '—'}</Field>
          <div><div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>Balance</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: exp.balance < 0 ? '#ef4444' : '#1e293b' }}>{exp.balance.toFixed(2)} AED</div></div>
        </div>
      </div>
    </>
  )
}

function EMMobileApp() {
  const { expenses } = useEM()
  const [view, setView] = useState('list')
  const [tab, setTab] = useState('Payments')
  const [selExp, setSelExp] = useState<any>(null)
  const [showAdd, setShowAdd] = useState(false)
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
      <div className="tm-phone">
        <div className="tm-phone-screen">
          <StatusBar time="12:51" />
          {view === 'list' ? (
            <>
              <div style={{ background: '#1360EF', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#fff', fontSize: 17, cursor: 'pointer' }}>←</span>
                  <span style={{ color: '#fff', fontSize: 17, fontWeight: 800 }}>Expense Manager</span>
                </div>
                <div style={{ display: 'flex', gap: 14 }}>
                  <span onClick={() => setShowAdd(true)} style={{ cursor: 'pointer' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></svg>
                  </span>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                </div>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: 14, background: '#F0F4F7' }}>
                <div style={{ background: '#fff', borderRadius: 12, padding: 4, marginBottom: 14, display: 'flex', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
                  {['Payments', 'History'].map(t => (
                    <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '9px 2px', border: 'none', fontFamily: 'inherit', fontSize: 13, fontWeight: t === tab ? 700 : 500, cursor: 'pointer', borderRadius: 9, background: t === tab ? '#2563eb' : 'transparent', color: t === tab ? '#fff' : '#94a3b8' }}>{t}</button>
                  ))}
                </div>
                <div style={{ background: '#f0fdf4', borderRadius: 14, padding: '16px 20px', marginBottom: 14, textAlign: 'center', border: '1px solid #dcfce7' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#475569' }}>Available Balance</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#dc2626', marginTop: 4 }}>− AED {Math.abs(EM_TOTAL_BALANCE).toFixed(2)}</div>
                </div>
                {expenses.map(exp => <EMMobileCard key={exp.id} exp={exp} onClick={() => { setSelExp(exp); setView('detail') }} />)}
              </div>
              <BottomNav active="Home" />
              {showAdd && <EMAddExpenseModal onClose={() => setShowAdd(false)} />}
            </>
          ) : (
            selExp && <EMMobileDetail exp={selExp} onBack={() => setView('list')} />
          )}
          <div style={{ position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)', width: 120, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.2)' }} />
        </div>
      </div>
    </div>
  )
}

export default function ExpenseManagerShowcase() {
  const [tab, setTab] = useState<'web' | 'mobile'>('web')
  return (
    <EMProvider>
      <div className="ms-embed">
        <ModuleTabs tab={tab} setTab={setTab} />
        <div key={tab} style={{ animation: 'msFadeIn 0.3s ease' }}>
          {tab === 'web' ? <div className="ms-web-scroll"><EMWebDashboard /></div> : <EMMobileApp />}
        </div>
      </div>
    </EMProvider>
  )
}
