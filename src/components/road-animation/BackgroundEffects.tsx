'use client'

import { motion } from 'framer-motion'
import { CreditCard, Wallet, Shield, Globe, Building2, Database, Workflow, BarChart3 } from 'lucide-react'

const icons = [
  { Icon: CreditCard, x: '10%', y: '15%', delay: 0 },
  { Icon: Wallet, x: '85%', y: '20%', delay: 0.2 },
  { Icon: Shield, x: '15%', y: '75%', delay: 0.4 },
  { Icon: Globe, x: '90%', y: '70%', delay: 0.6 },
  { Icon: Building2, x: '50%', y: '10%', delay: 0.8 },
  { Icon: Database, x: '25%', y: '45%', delay: 1 },
  { Icon: Workflow, x: '75%', y: '50%', delay: 1.2 },
  { Icon: BarChart3, x: '60%', y: '85%', delay: 1.4 }
]

export default function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Orbs */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ top: '10%', left: '10%' }}
      />

      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ bottom: '10%', right: '10%' }}
      />

      {/* Floating Icons Grid */}
      {icons.map((item, index) => {
        const Icon = item.Icon
        return (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: item.x, top: item.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.05, 0.1, 0.05],
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 8,
              delay: item.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <Icon className="w-12 h-12 text-gray-400" />
          </motion.div>
        )
      })}

      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gray-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )
}
