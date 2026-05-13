'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface AnimatedTextProps {
  scrollProgress: MotionValue<number>
}

const content = [
  {
    label: 'Payments',
    heading: 'Accept payments globally',
    description: 'Build a payments experience with the flexibility to adapt to your business needs. Accept online and in-person payments from customers around the world.',
    cta: 'Start now',
    link: 'Explore payments'
  },
  {
    label: 'Checkout',
    heading: 'Optimized checkout experience',
    description: 'Stripe Checkout is a prebuilt payment page optimized for conversion. Accept one-time payments or subscriptions with just a few lines of code.',
    cta: 'Get started',
    link: 'View documentation'
  },
  {
    label: 'Dashboard',
    heading: 'Manage your business',
    description: 'Get real-time insights into your business performance. Track revenue, monitor transactions, and manage your customers all in one place.',
    cta: 'View dashboard',
    link: 'Learn more'
  },
  {
    label: 'Connect',
    heading: 'Build a marketplace',
    description: 'Create a multi-party payment experience. Route payments between multiple parties, manage complex money flows, and handle compliance.',
    cta: 'Explore Connect',
    link: 'See examples'
  },
  {
    label: 'Issuing',
    heading: 'Create and distribute cards',
    description: 'Issue virtual and physical cards to your users. Control spending with real-time authorizations and detailed transaction data.',
    cta: 'Start issuing',
    link: 'View features'
  }
]

export default function AnimatedText({ scrollProgress }: AnimatedTextProps) {
  const activeIndex = useTransform(scrollProgress, (progress) => {
    if (progress < 0.2) return 0
    if (progress < 0.4) return 1
    if (progress < 0.6) return 2
    if (progress < 0.8) return 3
    return 4
  })

  return (
    <div className="space-y-6">
      {content.map((item, index) => {
        const opacity = useTransform(scrollProgress, (progress) => {
          const start = index * 0.2
          const end = start + 0.2
          if (progress < start) return 0
          if (progress > end) return 0
          if (progress >= start && progress <= start + 0.05) {
            return (progress - start) / 0.05
          }
          if (progress >= end - 0.05 && progress <= end) {
            return 1 - (progress - (end - 0.05)) / 0.05
          }
          return 1
        })

        const y = useTransform(scrollProgress, (progress) => {
          const start = index * 0.2
          const end = start + 0.2
          if (progress < start) return 20
          if (progress > end) return -20
          if (progress >= start && progress <= start + 0.05) {
            return 20 - ((progress - start) / 0.05) * 20
          }
          if (progress >= end - 0.05 && progress <= end) {
            return -((progress - (end - 0.05)) / 0.05) * 20
          }
          return 0
        })

        const blur = useTransform(scrollProgress, (progress) => {
          const start = index * 0.2
          const end = start + 0.2
          if (progress < start) return 10
          if (progress > end) return 10
          if (progress >= start && progress <= start + 0.05) {
            return 10 - ((progress - start) / 0.05) * 10
          }
          if (progress >= end - 0.05 && progress <= end) {
            return ((progress - (end - 0.05)) / 0.05) * 10
          }
          return 0
        })

        return (
          <motion.div
            key={index}
            style={{
              opacity,
              y,
              filter: useTransform(blur, (b) => `blur(${b}px)`)
            }}
            className="absolute inset-0 space-y-6"
          >
            {/* Label */}
            <motion.div
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
                color: '#6366f1',
                border: '1px solid rgba(99, 102, 241, 0.2)'
              }}
            >
              {item.label}
            </motion.div>

            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              {item.heading}
            </h2>

            {/* Description */}
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl">
              {item.description}
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <button className="group relative px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="relative z-10 flex items-center gap-2">
                  {item.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors flex items-center gap-2">
                {item.link}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
