'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Bell, LayoutDashboard, Clock, Calendar, Wrench } from 'lucide-react'

/* ─── Feature data ─────────────────────────────────────── */
const leftFeatures = [
  {
    icon: <MapPin className="w-[17px] h-[17px] text-[#00BCD4]" strokeWidth={2} />,
    title: 'Live GPS Tracking',
    desc: 'Track vehicles live, monitor drivers, improve road team',
    delay: 0.10,
  },
  {
    icon: <LayoutDashboard className="w-[17px] h-[17px] text-[#00BCD4]" strokeWidth={2} />,
    title: 'Dynamic Fleet Dashboard',
    desc: 'Control dashboard for trip insights, vehicle status, performance',
    delay: 0.20,
  },
  {
    icon: <Calendar className="w-[17px] h-[17px] text-[#00BCD4]" strokeWidth={2} />,
    title: 'Daily Route History',
    desc: 'Track vehicles live, monitor drivers, improve road team control',
    delay: 0.30,
  },
]

const rightFeatures = [
  {
    icon: <Bell className="w-[17px] h-[17px] text-[#00BCD4]" strokeWidth={2} />,
    title: 'Instant Idle Alerts',
    desc: 'Detect long idle vehicles, reduce fuel waste, improve productivity',
    delay: 0.15,
  },
  {
    icon: <Clock className="w-[17px] h-[17px] text-[#00BCD4]" strokeWidth={2} />,
    title: 'After-Hours Vehicle Alerts',
    desc: 'Get unauthorized movement alerts. Secure your fleet after hours.',
    delay: 0.25,
  },
  {
    icon: <Wrench className="w-[17px] h-[17px] text-[#00BCD4]" strokeWidth={2} />,
    title: 'Fleet Service Reminders',
    desc: 'Automated maintenance alerts for oil, tires, and service schedules',
    delay: 0.35,
  },
]

/* ─── Single feature card ───────────────────────────────── */
function FeatureCard({
  icon,
  title,
  desc,
  delay,
}: {
  icon: React.ReactNode
  title: string
  desc: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ padding: '18px 20px', height: '100%' }}
      className="flex items-start gap-4 bg-white border border-[#e8eaed] rounded-2xl hover:shadow-[0_4px_18px_rgba(0,0,0,0.07)] transition-shadow duration-300"
    >
      {/* Icon wrapper */}
      <div style={{ width: 40, height: 40, flexShrink: 0, marginTop: 1 }} className="rounded-xl bg-[#f0fbfc] border border-[#d9f3f7] flex items-center justify-center">
        {icon}
      </div>

      {/* Text */}
      <div style={{ paddingTop: 2 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', lineHeight: 1.35, marginBottom: 6 }}>
          {title}
        </p>
        <p style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.6 }}>
          {desc}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Floating badge positions ──────────────────────────── */
const badges = [
  {
    pos: 'absolute -left-[58px] top-[13%]',
    dur: 3.4, delay: 0.0, dir: -1,
    icon: (
      <svg className="w-5 h-5 text-[#00BCD4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" strokeWidth="2" />
        <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    pos: 'absolute -right-[58px] top-[22%]',
    dur: 4.0, delay: 0.6, dir: -1,
    icon: <MapPin className="w-5 h-5 text-[#00BCD4]" strokeWidth={2} />,
  },
  {
    pos: 'absolute -left-[58px] top-[48%]',
    dur: 3.8, delay: 1.0, dir: 1,
    icon: (
      <svg className="w-5 h-5 text-[#4A90E2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    pos: 'absolute -right-[58px] top-[54%]',
    dur: 4.2, delay: 1.5, dir: 1,
    icon: <Bell className="w-5 h-5 text-[#4A90E2]" strokeWidth={2} />,
  },
  {
    pos: 'absolute -right-[58px] top-[74%]',
    dur: 3.6, delay: 2.0, dir: -1,
    icon: (
      <svg className="w-5 h-5 text-[#00BCD4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" strokeWidth="2" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
          strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
]

/* ─── Section ───────────────────────────────────────────── */
export default function RoadAnimationSection() {
  return (
    <section className="w-full bg-[#f7f8fa] pt-16 pb-14 md:pt-24 md:pb-20 lg:pt-32 lg:pb-28 overflow-x-hidden">
      {/* max-w centres content on wide screens; edge spacing comes from the root */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-20">

          {/* ══ LEFT — copy + cards ══════════════════════════ */}
          <div className="w-full lg:w-[56%] flex flex-col">

            {/* Brand label */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-[13px] font-semibold text-[#0a89dd] mb-5"
            >
              Fleet Telematics
            </motion.p>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="text-[1.85rem] lg:text-[2.35rem] font-bold text-[#0f172a] leading-[1.22] tracking-[-0.02em] mb-4"
            >
              Improve Fleet Operations with GPS Tracking &amp; Telematics
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.10 }}
              className="text-[14px] text-[#6b7280] leading-relaxed mb-8 max-w-[500px]"
            >
              Real-time GPS tracking to manage drivers, routes, and road operations with ease.
            </motion.p>

            {/* ── Feature grid: 2 equal columns, equal-height rows ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[0, 1, 2].flatMap(i => [leftFeatures[i], rightFeatures[i]]).map(f => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
          </div>

          {/* ══ RIGHT — phone mockup ═════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full lg:w-[44%] flex justify-center"
          >
            {/* Outer container — badges float outside this box */}
            <div className="relative mx-auto" style={{ width: '260px', maxWidth: '100%' }}>

              {/* Floating badges */}
              {badges.map((b, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, b.dir * 8, 0] }}
                  transition={{
                    duration: b.dur,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: b.delay,
                  }}
                  className={`${b.pos} z-20 w-[48px] h-[48px] bg-white rounded-2xl
                    shadow-[0_4px_14px_rgba(0,0,0,0.09)] border border-[#eff0f2]
                    hidden md:flex items-center justify-center`}
                >
                  {b.icon}
                </motion.div>
              ))}

              {/* Phone — drop-shadow follows content shape, no background box */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 10,
                  filter:
                    'drop-shadow(0 24px 50px rgba(0,0,0,0.14)) drop-shadow(0 8px 20px rgba(0,0,0,0.08))',
                }}
              >
                <Image
                  src="/block 1/mobile view.png"
                  alt="Fleet Tracking Mobile App"
                  width={280}
                  height={600}
                  className="w-full h-auto block"
                  priority
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
