'use client'

import { motion, MotionValue } from 'framer-motion'
import { User, Building2, ShoppingBag, ArrowRight } from 'lucide-react'

interface MarketplaceFlowProps {
  scrollProgress: MotionValue<number>
}

export default function MarketplaceFlow({ scrollProgress }: MarketplaceFlowProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
      <div className="relative w-full max-w-sm">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Routing</h3>
          <p className="text-sm text-gray-500">Multi-party marketplace flow</p>
        </motion.div>

        {/* Flow Diagram */}
        <div className="relative">
          {/* Buyer */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute left-0 top-0"
          >
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <p className="text-xs font-semibold text-gray-700">Buyer</p>
                <p className="text-xs text-gray-500">$100.00</p>
              </div>
            </div>
          </motion.div>

          {/* Platform */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute left-1/2 top-24 -translate-x-1/2"
          >
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <p className="text-xs font-semibold text-gray-700">Platform</p>
                <p className="text-xs text-gray-500">Fee: $10.00</p>
              </div>
            </div>
          </motion.div>

          {/* Seller */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute right-0 bottom-0"
          >
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <p className="text-xs font-semibold text-gray-700">Seller</p>
                <p className="text-xs text-gray-500">$90.00</p>
              </div>
            </div>
          </motion.div>

          {/* Animated Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ width: '100%', height: '200px' }}>
            {/* Buyer to Platform */}
            <motion.path
              d="M 60 40 Q 120 80 140 120"
              stroke="url(#gradient1)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.8, repeat: Infinity, repeatDelay: 2 }}
            />
            
            {/* Platform to Seller */}
            <motion.path
              d="M 180 140 Q 220 160 260 180"
              stroke="url(#gradient2)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1.5, repeat: Infinity, repeatDelay: 2 }}
            />

            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>

          {/* Animated Dots */}
          <motion.div
            className="absolute w-3 h-3 bg-blue-500 rounded-full shadow-lg"
            initial={{ left: '60px', top: '40px' }}
            animate={{
              left: ['60px', '140px'],
              top: ['40px', '120px']
            }}
            transition={{ duration: 1.5, delay: 0.8, repeat: Infinity, repeatDelay: 2 }}
          />
          
          <motion.div
            className="absolute w-3 h-3 bg-green-500 rounded-full shadow-lg"
            initial={{ left: '180px', top: '140px' }}
            animate={{
              left: ['180px', '260px'],
              top: ['140px', '180px']
            }}
            transition={{ duration: 1.5, delay: 1.5, repeat: Infinity, repeatDelay: 2 }}
          />
        </div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-32 space-y-2"
        >
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-xs text-gray-600">Payment processing</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <p className="text-xs text-gray-600">Automatic fee collection</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
