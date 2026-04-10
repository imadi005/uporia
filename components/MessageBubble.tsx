// components/MessageBubble.tsx
import { Message } from '@/hooks/useChat'
import Link from 'next/link'

export default function MessageBubble({ message }: { message: Message }) {
  if (message.type === 'suggestion') {
    return (
      <div className="bg-zinc-800 text-white p-4 rounded-xl border border-zinc-700 mb-3">
        <p className="mb-2 font-semibold text-sm text-zinc-300">{message.suggestion}</p>
        <Link href={message.link}>
          <button className="bg-white text-black text-sm px-4 py-2 rounded-lg hover:bg-zinc-200 transition">
            Go to Page →
          </button>
        </Link>
      </div>
    )
  }

  const isUser = message.role === 'user'
  return (
    <div
      className={`px-4 py-2 rounded-lg max-w-[80%] text-sm ${
        isUser ? 'ml-auto bg-white text-black' : 'bg-zinc-700 text-white'
      }`}
    >
      {message.text}
    </div>
  )
}
