'use client'

import { motion, MotionValue } from 'framer-motion'
import { TrendingUp, ArrowUpRight, ArrowDownRight, Check, Clock } from 'lucide-react'

interface FinanceDashboardProps {
  scrollProgress: MotionValue<number>
}

const transactions = [
  { id: 1, name: 'Payment from John Doe', amount: '+$1,234.00', status: 'completed', time: '2 min ago' },
  { id: 2, name: 'Subscription renewal', amount: '+$29.00', status: 'completed', time: '1 hour ago' },
  { id: 3, name: 'Refund to customer', amount: '-$156.00', status: 'pending', time: '3 hours ago' },
  { id: 4, name: 'Payment from Jane Smith', amount: '+$890.00', status: 'completed', time: '5 hours ago' }
]

export default function FinanceDashboard({ scrollProgress }: FinanceDashboardProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 p-6 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Real-time business insights</p>
      </motion.div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 mb-6 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <p className="text-sm opacity-90 mb-2">Total Balance</p>
          <motion.h3
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            $24,891.00
          </motion.h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">+12.5%</span>
            </div>
            <span className="text-sm opacity-75">vs last month</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500">Revenue</p>
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-xl font-bold text-gray-900">$18,234</p>
          <p className="text-xs text-green-600 mt-1">+8.2%</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500">Customers</p>
            <ArrowUpRight className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-xl font-bold text-gray-900">1,429</p>
          <p className="text-xs text-blue-600 mt-1">+15.3%</p>
        </motion.div>
      </div>

      {/* Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Transactions</h3>
        <div className="space-y-2">
          {transactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 flex items-center gap-3"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                tx.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                {tx.status === 'completed' ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Clock className="w-4 h-4 text-yellow-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate">{tx.name}</p>
                <p className="text-xs text-gray-500">{tx.time}</p>
              </div>
              <p className={`text-sm font-semibold ${
                tx.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {tx.amount}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
