'use client'

import { motion, MotionValue } from 'framer-motion'
import { CreditCard, Mail, MapPin, Check } from 'lucide-react'

interface CheckoutUIProps {
  scrollProgress: MotionValue<number>
}

export default function CheckoutUI({ scrollProgress: _scrollProgress }: CheckoutUIProps) {

  return (
    <div className="relative w-full h-full bg-white p-6 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-xl font-bold text-gray-900">Complete your purchase</h2>
        <p className="text-sm text-gray-500 mt-1">Secure checkout powered by Stripe</p>
      </motion.div>

      {/* Product */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gray-50 rounded-xl p-4 mb-6 flex items-center gap-4"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
          <CreditCard className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">Premium Plan</h3>
          <p className="text-sm text-gray-500">Monthly subscription</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">$29.00</p>
          <p className="text-xs text-gray-500">per month</p>
        </div>
      </motion.div>

      {/* Email Field */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-4"
      >
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            defaultValue="john@example.com"
          />
          <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
        </div>
      </motion.div>

      {/* Card Information */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-4"
      >
        <label className="block text-sm font-medium text-gray-700 mb-2">Card information</label>
        <div className="space-y-2">
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="1234 1234 1234 1234"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-t-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              defaultValue="4242 4242 4242 4242"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="MM / YY"
              className="px-4 py-3 border border-gray-300 rounded-bl-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              defaultValue="12 / 24"
            />
            <input
              type="text"
              placeholder="CVC"
              className="px-4 py-3 border border-gray-300 rounded-br-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              defaultValue="123"
            />
          </div>
        </div>
      </motion.div>

      {/* Country */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-6"
      >
        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none bg-white">
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Canada</option>
          </select>
        </div>
      </motion.div>

      {/* Pay Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
      >
        Pay $29.00
      </motion.button>

      {/* Security Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500"
      >
        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </div>
        Secured by Stripe
      </motion.div>
    </div>
  )
}
