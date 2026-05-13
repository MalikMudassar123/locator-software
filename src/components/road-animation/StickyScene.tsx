'use client'

import { MotionValue, useTransform } from 'framer-motion'
import AnimatedText from './AnimatedText'
import PhoneMockup from './PhoneMockup'

interface StickySceneProps {
  scrollProgress: MotionValue<number>
}

export default function StickyScene({ scrollProgress }: StickySceneProps) {
  // Define scroll ranges for each state
  const state = useTransform(scrollProgress, (progress) => {
    if (progress < 0.2) return 0 // Floating Cards
    if (progress < 0.4) return 1 // Checkout UI
    if (progress < 0.6) return 2 // Finance Dashboard
    if (progress < 0.8) return 3 // Marketplace Flow
    return 4 // Card Issuing
  })

  return (
    <div className="relative h-full w-full flex items-center justify-center px-8 lg:px-16">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Side - Text Content */}
        <div className="order-2 lg:order-1">
          <AnimatedText scrollProgress={scrollProgress} />
        </div>

        {/* Right Side - Phone Mockup */}
        <div className="order-1 lg:order-2 flex items-center justify-center">
          <PhoneMockup scrollProgress={scrollProgress} state={state} />
        </div>
      </div>
    </div>
  )
}
