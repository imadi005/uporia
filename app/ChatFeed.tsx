'use client'

import { useEffect, useRef } from 'react'
import ChatInput from './ChatInput'
import MessageBubble from './MessageBubble'
import useChat from './useChat'
import Link from 'next/link'

export default function ChatFeed({ initialMessage }: { initialMessage?: string }) {
  const { messages, addMessage } = useChat(initialMessage)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pt-24 pb-10 flex flex-col h-[85vh] overflow-hidden z-10">
      <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i}>
            {msg.type === 'text' && <MessageBubble message={msg} />}
            {msg.type === 'suggestion' && (
              <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white shadow-md backdrop-blur-sm">
                <p className="text-sm mb-2 font-medium">{msg.suggestion}</p>
                <Link href={msg.link}>
                  <button className="text-sm px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition">
                    Open Tool →
                  </button>
                </Link>
              </div>
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="mt-4">
        <ChatInput onSend={addMessage} />
      </div>
    </div>
  )
}
