'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bootLines = [
  'Booting Neural Interface...',
  'Synchronizing Data Channels...',
  'Launching Uporia Core...',
]

const prompts = [
  'What would you like to create?',
  'Solve?',
  'Explore?',
  'Build your dream?',
  'Let’s start something epic.',
]

export default function StartupBoot({ onComplete }: { onComplete: (msg: string) => void }) {
  const [line, setLine] = useState(0)
  const [done, setDone] = useState(false)
  const [placeholder, setPlaceholder] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [inputText, setInputText] = useState('')

  // Boot line typing
  useEffect(() => {
    const interval = setInterval(() => {
      setLine((prev) => {
        if (prev < bootLines.length - 1) return prev + 1
        else {
          clearInterval(interval)
          setTimeout(() => setDone(true), 1200)
          return prev
        }
      })
    }, 1400)
    return () => clearInterval(interval)
  }, [])

  // Placeholder typewriter effect
  useEffect(() => {
    if (!done) return
    const currentPhrase = prompts[phraseIndex]
    const timeout = setTimeout(() => {
      if (charIndex < currentPhrase.length) {
        setPlaceholder(currentPhrase.slice(0, charIndex + 1))
        setCharIndex((prev) => prev + 1)
      } else {
        setTimeout(() => {
          setPhraseIndex((prev) => (prev + 1) % prompts.length)
          setCharIndex(0)
          setPlaceholder('')
        }, 1600)
      }
    }, 100)
    return () => clearTimeout(timeout)
  }, [charIndex, phraseIndex, done])

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden flex flex-col items-center justify-center text-white font-mono">

      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[conic-gradient(at_center,_#0a0a0a,_#1a1a1a,_#444,_#aaa,_#111,_#000)] animate-bg-pan-slow bg-[length:250%_250%] opacity-25 blur-3xl" />
      </div>

      {/* Bootlines */}
      <AnimatePresence>
        {!done && (
          <motion.div
            key="bootlines"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30, filter: 'blur(6px)' }}
            transition={{ duration: 1 }}
            className="absolute text-center top-[30%] text-sm md:text-base font-mono text-zinc-400 space-y-2 z-10"
          >
            {bootLines.slice(0, line + 1).map((msg, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.3 }}
              >
                {msg}
              </motion.p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Uporia title */}
      <AnimatePresence>
        {done && (
          <motion.div
            key="uporia"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-20 mt-[-90px] text-7xl md:text-8xl font-bold tracking-wider text-white"
          >
            <span className="relative inline-block">
              Uporia
              <span className="absolute inset-0 z-30 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-sm animate-shine mask-[linear-gradient(120deg,transparent_30%,white_50%,transparent_70%)]" />
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tagline */}
      <AnimatePresence>
        {done && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="z-20 mt-6 text-base md:text-lg text-zinc-400 tracking-wide"
          >
            Empower. Build. Elevate.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Input box */}
      <AnimatePresence>
        {done && (
          <motion.form
            onSubmit={(e) => {
              e.preventDefault()
              if (inputText.trim()) {
                onComplete(inputText.trim())
              }
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 1.2 }}
            className="z-30 mt-14 w-[92%] max-w-2xl px-6"
          >
            <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 border border-white/10 rounded-2xl p-6 shadow-xl shadow-black/20 backdrop-blur-sm relative overflow-hidden group">
              <div className="text-xs text-zinc-400 mb-2 font-semibold uppercase tracking-wider">
                Ask Uporia
              </div>

              <div className="relative flex items-center">
                <input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={placeholder}
                  className="w-full bg-transparent border border-white/10 rounded-lg px-5 py-3 text-white text-[15px] placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all font-mono tracking-tight"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-lg transition group">
                  <svg
                    className="w-4 h-4 text-white group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Animations */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes bg-pan-slow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-shine {
          animation: shine 2.4s ease-in-out forwards;
        }

        .animate-bg-pan-slow {
          animation: bg-pan-slow 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
