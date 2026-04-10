// components/ChatInput.tsx
'use client'

import { useState } from 'react'

export default function ChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    onSend(input)
    setInput('')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex rounded-lg overflow-hidden bg-zinc-800">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask Uporia anything..."
        className="flex-1 px-4 py-3 bg-transparent text-white focus:outline-none"
      />
      <button
        type="submit"
        className="bg-white text-black px-4 font-bold tracking-wide hover:bg-zinc-200 transition"
      >
        ➤
      </button>
    </form>
  )
}
