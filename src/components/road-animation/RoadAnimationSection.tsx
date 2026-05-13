'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Bell, LayoutDashboard, Clock, Calendar, Wrench } from 'lucide-react'

export default function RoadAnimationSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-16 lg:py-24 overflow-hidden"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">
          {/* Left Side - Content (60% width) */}
          <div className="w-full lg:w-[58%] space-y-6">
            {/* Brand Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-base font-semibold text-[#00BCD4] mb-4">Fleet Telematics</h3>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h2 className="text-[2.75rem] lg:text-[3.25rem] font-bold text-[#1a1a1a] leading-[1.15] tracking-tight">
                Improve Fleet Operations with GPS Tracking & Telematics
              </h2>
              <p className="text-[15px] text-[#6b7280] leading-relaxed">
                Real-time GPS tracking to manage drivers, routes, and road operations with ease.
              </p>
            </motion.div>

            {/* Features - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 pt-6">
              {/* Left Column Features */}
              <div className="space-y-6">
                {/* Feature 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gradient-to-br from-gray-50/80 to-gray-100/50 rounded-2xl p-5 border border-gray-100/50 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <MapPin className="w-5 h-5 text-[#00BCD4]" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#1a1a1a] text-[15px] mb-2">Live GPS Tracking</h4>
                      <p className="text-[13px] text-[#9ca3af] leading-relaxed">
                        Track vehicles live, monitor drivers, improve road team
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Feature 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-gradient-to-br from-gray-50/80 to-gray-100/50 rounded-2xl p-5 border border-gray-100/50 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <LayoutDashboard className="w-5 h-5 text-[#00BCD4]" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#1a1a1a] text-[15px] mb-2">Dynamic Fleet Dashboard</h4>
                      <p className="text-[13px] text-[#9ca3af] leading-relaxed">
                        Control dashboard for trip insights, vehicle status, performance
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Feature 5 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-gradient-to-br from-gray-50/80 to-gray-100/50 rounded-2xl p-5 border border-gray-100/50 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <Calendar className="w-5 h-5 text-[#00BCD4]" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#1a1a1a] text-[15px] mb-2">Daily Route History</h4>
                      <p className="text-[13px] text-[#9ca3af] leading-relaxed">
                        Track vehicles live, monitor drivers, improve road team control
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column Features */}
              <div className="space-y-6">
                {/* Feature 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-gradient-to-br from-gray-50/80 to-gray-100/50 rounded-2xl p-5 border border-gray-100/50 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <Bell className="w-5 h-5 text-[#00BCD4]" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#1a1a1a] text-[15px] mb-2">Instant Idle Alerts</h4>
                      <p className="text-[13px] text-[#9ca3af] leading-relaxed">
                        Detect long idle vehicles, reduce fuel waste, improve productivity
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Feature 4 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-gradient-to-br from-gray-50/80 to-gray-100/50 rounded-2xl p-5 border border-gray-100/50 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <Clock className="w-5 h-5 text-[#00BCD4]" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#1a1a1a] text-[15px] mb-2">After-Hours Vehicle Alerts</h4>
                      <p className="text-[13px] text-[#9ca3af] leading-relaxed">
                        Get unauthorized movement alerts. Secure your fleet after hours.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Feature 6 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="bg-gradient-to-br from-gray-50/80 to-gray-100/50 rounded-2xl p-5 border border-gray-100/50 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <Wrench className="w-5 h-5 text-[#00BCD4]" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#1a1a1a] text-[15px] mb-2">Fleet Service Reminders</h4>
                      <p className="text-[13px] text-[#9ca3af] leading-relaxed">
                        Automated maintenance alerts for oil, tires, and service schedules
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Side - Phone Mockup (40% width) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full lg:w-[42%] flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[380px]">
              {/* Phone Image */}
              <div className="relative z-10 w-full">
                <Image
                  src="/block 1/mobile view.png"
                  alt="Fleet Tracking Mobile App"
                  width={380}
                  height={760}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Floating Icon - Top Left (Search/Magnifier) */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute -left-8 top-[15%] bg-white rounded-2xl p-4 shadow-lg border border-gray-100/50"
                style={{ width: '64px', height: '64px' }}
              >
                <svg className="w-8 h-8 text-[#00BCD4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" strokeWidth="2" />
                  <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.div>

              {/* Floating Icon - Top Right (Location Pin) */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5
                }}
                className="absolute -right-4 top-[18%] bg-white rounded-2xl p-4 shadow-lg border border-gray-100/50"
                style={{ width: '64px', height: '64px' }}
              >
                <MapPin className="w-8 h-8 text-[#00BCD4]" strokeWidth={2} />
              </motion.div>

              {/* Floating Icon - Middle Left (Route/Path) */}
              <motion.div
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1
                }}
                className="absolute -left-6 top-[45%] bg-white rounded-2xl p-4 shadow-lg border border-gray-100/50"
                style={{ width: '64px', height: '64px' }}
              >
                <svg className="w-8 h-8 text-[#4A90E2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>

              {/* Floating Icon - Bottom Right (Bell/Notification) */}
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.5
                }}
                className="absolute -right-2 bottom-[22%] bg-white rounded-2xl p-4 shadow-lg border border-gray-100/50"
                style={{ width: '64px', height: '64px' }}
              >
                <Bell className="w-8 h-8 text-[#4A90E2]" strokeWidth={2} />
              </motion.div>

              {/* Floating Icon - Bottom Left (Settings/Gear) */}
              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 2
                }}
                className="absolute -left-4 bottom-[28%] bg-white rounded-2xl p-4 shadow-lg border border-gray-100/50"
                style={{ width: '64px', height: '64px' }}
              >
                <svg className="w-8 h-8 text-[#00BCD4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3" strokeWidth="2" />
                  <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
