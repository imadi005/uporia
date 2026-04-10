'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bootLines = [
  '> Initializing Uporia AI Engine...',
  '> Loading Business Intelligence Models...',
  '> Connecting to Gemini AI...',
  '> All systems operational ✓',
]

export default function StartupBoot({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setVisibleLines(prev => [...prev, bootLines[i]])
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => setDone(true), 800)
      }
    }, 700)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center font-mono overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-lg px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">U</div>
          <span className="text-white font-bold text-2xl tracking-tight">Uporia</span>
          <span className="text-violet-400 text-xs font-semibold border border-violet-500/30 px-2 py-0.5 rounded-full">v2.0</span>
        </motion.div>

        {/* Terminal */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-red-400 rounded-full" />
            <div className="w-3 h-3 bg-yellow-400 rounded-full" />
            <div className="w-3 h-3 bg-green-400 rounded-full" />
            <span className="text-gray-500 text-xs ml-2 font-mono">uporia — boot sequence</span>
          </div>

          <div className="space-y-2 min-h-[120px]">
            <AnimatePresence>
              {visibleLines.filter(Boolean).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`text-sm font-mono ${
                    line.includes('✓') ? 'text-green-400' : 'text-gray-400'
                  }`}
                >
                  {line}
                  {i === visibleLines.length - 1 && !done && (
                    <span className="inline-block w-2 h-4 bg-violet-400 ml-1 animate-pulse align-middle" />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Enter button */}
        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-500 text-sm mb-4">Ready to build your empire?</p>
              <button
                onClick={onComplete}
                className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-3 rounded-xl transition-all hover:scale-105 shadow-lg shadow-violet-600/25"
              >
                Enter Dashboard →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}