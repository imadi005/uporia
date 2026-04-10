'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ChatBot() {
  const [input, setInput] = useState('')
  const router = useRouter()

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input.toLowerCase().includes('website')) router.push('/website')
      else if (input.toLowerCase().includes('email')) router.push('/email')
      else if (input.toLowerCase().includes('course')) router.push('/courses')
      else router.push('/dashboard')
    }
  }

  return (
    <div className="text-center mt-6 z-10">
      <p className="text-white text-lg mb-2">🤖 What do you want to do today?</p>
      <input
        className="px-4 py-2 w-80 rounded-full bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Type your action..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleEnter}
      />
    </div>
  )
}
