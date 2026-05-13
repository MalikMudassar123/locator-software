'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import FloatingCards from './FloatingCards'
import CheckoutUI from './CheckoutUI'
import FinanceDashboard from './FinanceDashboard'
import MarketplaceFlow from './MarketplaceFlow'
import CardIssuing from './CardIssuing'

interface PhoneMockupProps {
  scrollProgress: MotionValue<number>
  state: MotionValue<number>
}

export default function PhoneMockup({ scrollProgress, state: _state }: PhoneMockupProps) {
  const rotateX = useTransform(scrollProgress, [0, 1], [5, -5])
  const rotateY = useTransform(scrollProgress, [0, 1], [-5, 5])
  const scale = useTransform(scrollProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
    >
      {/* Phone Frame */}
      <div className="relative w-full aspect-[9/19] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl z-10" />
        
        {/* Screen */}
        <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
          {/* State 0: Floating Cards */}
          <motion.div
            style={{
              opacity: useTransform(scrollProgress, [0, 0.15, 0.2, 0.35], [1, 1, 0, 0]),
              scale: useTransform(scrollProgress, [0, 0.2], [1, 0.9])
            }}
            className="absolute inset-0"
          >
            <FloatingCards scrollProgress={scrollProgress} />
          </motion.div>

          {/* State 1: Checkout UI */}
          <motion.div
            style={{
              opacity: useTransform(scrollProgress, [0.15, 0.2, 0.35, 0.4, 0.55], [0, 1, 1, 0, 0]),
              scale: useTransform(scrollProgress, [0.2, 0.4], [0.9, 1])
            }}
            className="absolute inset-0"
          >
            <CheckoutUI scrollProgress={scrollProgress} />
          </motion.div>

          {/* State 2: Finance Dashboard */}
          <motion.div
            style={{
              opacity: useTransform(scrollProgress, [0.35, 0.4, 0.55, 0.6, 0.75], [0, 1, 1, 0, 0]),
              scale: useTransform(scrollProgress, [0.4, 0.6], [0.9, 1])
            }}
            className="absolute inset-0"
          >
            <FinanceDashboard scrollProgress={scrollProgress} />
          </motion.div>

          {/* State 3: Marketplace Flow */}
          <motion.div
            style={{
              opacity: useTransform(scrollProgress, [0.55, 0.6, 0.75, 0.8, 0.95], [0, 1, 1, 0, 0]),
              scale: useTransform(scrollProgress, [0.6, 0.8], [0.9, 1])
            }}
            className="absolute inset-0"
          >
            <MarketplaceFlow scrollProgress={scrollProgress} />
          </motion.div>

          {/* State 4: Card Issuing */}
          <motion.div
            style={{
              opacity: useTransform(scrollProgress, [0.75, 0.8, 1], [0, 1, 1]),
              scale: useTransform(scrollProgress, [0.8, 1], [0.9, 1])
            }}
            className="absolute inset-0"
          >
            <CardIssuing scrollProgress={scrollProgress} />
          </motion.div>
        </div>

        {/* Phone Buttons */}
        <div className="absolute right-0 top-24 w-1 h-12 bg-gray-800 rounded-l-lg" />
        <div className="absolute right-0 top-40 w-1 h-16 bg-gray-800 rounded-l-lg" />
        <div className="absolute left-0 top-32 w-1 h-8 bg-gray-800 rounded-r-lg" />
      </div>

      {/* Shadow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 rounded-[3rem] pointer-events-none" style={{ transform: 'translateZ(-10px)' }} />
    </motion.div>
  )
}
