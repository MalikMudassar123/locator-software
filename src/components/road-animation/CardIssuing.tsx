'use client'

import { motion, MotionValue } from 'framer-motion'
import { CreditCard, Lock, Zap } from 'lucide-react'

interface CardIssuingProps {
  scrollProgress: MotionValue<number>
}

const cards = [
  { gradient: 'from-violet-600 via-purple-600 to-indigo-600', delay: 0, rotate: -8, z: 30 },
  { gradient: 'from-blue-600 via-cyan-600 to-teal-600', delay: 0.1, rotate: -4, z: 20 },
  { gradient: 'from-pink-600 via-rose-600 to-red-600', delay: 0.2, rotate: 0, z: 10 }
]

export default function CardIssuing({ scrollProgress }: CardIssuingProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 flex items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20" />
      
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-8 left-0 right-0 text-center"
      >
        <h3 className="text-xl font-bold text-white mb-2">Card Issuing</h3>
        <p className="text-sm text-gray-400">Create virtual and physical cards</p>
      </motion.div>

      {/* Stacked Cards */}
      <div className="relative w-64 h-40">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateY: 0,
              rotate: card.rotate,
              y: index * -8,
              x: index * 4
            }}
            transition={{ 
              duration: 0.8, 
              delay: card.delay,
              type: 'spring',
              stiffness: 100
            }}
            style={{ zIndex: card.z }}
          >
            <div className={`relative w-full h-full bg-gradient-to-br ${card.gradient} rounded-2xl p-6 shadow-2xl overflow-hidden`}>
              {/* Card Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ 
                  duration: 2, 
                  delay: card.delay + 1,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />

              {/* Card Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>

              {/* Card Content */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded opacity-80" />
                  <CreditCard className="w-8 h-8 text-white/80" />
                </div>

                <div>
                  <p className="text-white/90 text-lg font-mono tracking-wider mb-2">
                    •••• •••• •••• {1234 + index}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-xs mb-1">CARDHOLDER</p>
                      <p className="text-white text-sm font-semibold">JOHN DOE</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-xs mb-1">EXPIRES</p>
                      <p className="text-white text-sm font-semibold">12/25</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Feature Pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 px-6"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 border border-white/20">
          <Lock className="w-4 h-4 text-white" />
          <span className="text-xs text-white font-medium">Secure</span>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 border border-white/20">
          <Zap className="w-4 h-4 text-white" />
          <span className="text-xs text-white font-medium">Instant</span>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 border border-white/20">
          <CreditCard className="w-4 h-4 text-white" />
          <span className="text-xs text-white font-medium">Virtual</span>
        </div>
      </motion.div>
    </div>
  )
}
