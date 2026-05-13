'use client'

import { motion, MotionValue } from 'framer-motion'
import { CreditCard, Wallet, Shield, Globe, Building2, Database, Workflow, BarChart3 } from 'lucide-react'

interface FloatingCardsProps {
  scrollProgress: MotionValue<number>
}

const cards = [
  { icon: CreditCard, label: 'Payments', color: 'from-blue-500 to-cyan-500', x: 20, y: 30 },
  { icon: Workflow, label: 'Connect', color: 'from-purple-500 to-pink-500', x: 60, y: 20 },
  { icon: BarChart3, label: 'Billing', color: 'from-green-500 to-emerald-500', x: 15, y: 60 },
  { icon: Shield, label: 'Radar', color: 'from-orange-500 to-red-500', x: 70, y: 55 },
  { icon: Database, label: 'Tax', color: 'from-indigo-500 to-blue-500', x: 40, y: 45 },
  { icon: Globe, label: 'Atlas', color: 'from-teal-500 to-cyan-500', x: 50, y: 70 },
  { icon: Building2, label: 'Sigma', color: 'from-violet-500 to-purple-500', x: 30, y: 15 },
  { icon: Wallet, label: 'Issuing', color: 'from-pink-500 to-rose-500', x: 75, y: 40 }
]

export default function FloatingCards({ scrollProgress: _scrollProgress }: FloatingCardsProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        {cards.map((card, i) => {
          if (i === cards.length - 1) return null
          const nextCard = cards[i + 1]
          return (
            <motion.line
              key={i}
              x1={`${card.x}%`}
              y1={`${card.y}%`}
              x2={`${nextCard.x}%`}
              y2={`${nextCard.y}%`}
              stroke="url(#gradient)"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          )
        })}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Cards */}
      {cards.map((card, index) => {
        const Icon = card.icon
        const delay = index * 0.1

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${card.x}%`,
              top: `${card.y}%`,
              x: '-50%',
              y: '-50%'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: [0, -10, 0]
            }}
            transition={{
              scale: { duration: 0.5, delay },
              opacity: { duration: 0.5, delay },
              y: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay
              }
            }}
          >
            <div className="relative group">
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
              
              {/* Card */}
              <div className="relative bg-white rounded-2xl p-4 shadow-lg backdrop-blur-sm border border-gray-200/50">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-2`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-semibold text-gray-700">{card.label}</p>
              </div>
            </div>
          </motion.div>
        )
      })}

      {/* Center Title */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Financial Infrastructure</h3>
        <p className="text-sm text-gray-600">Everything you need to build</p>
      </motion.div>
    </div>
  )
}
