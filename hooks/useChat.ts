import { useEffect, useState } from 'react'

export type Message =
  | { type: 'text'; role: 'user' | 'bot'; text: string }
  | { type: 'suggestion'; suggestion: string; link: string }

export default function useChat(initialMessage?: string) {
  const [messages, setMessages] = useState<Message[]>([])

  const addMessage = async (text: string) => {
    const userMessage: Message = { type: 'text', role: 'user', text }
    setMessages((prev) => [...prev, userMessage])

    const keyword = text.toLowerCase()

    // 📘 Course tool
    if (keyword.includes('course')) {
      return setMessages((prev) => [
        ...prev,
        {
          type: 'suggestion',
          suggestion: 'Launch your own course',
          link: '/tools/sell-course',
        },
      ])
    }

    // 📕 eBook tool
    if (keyword.includes('ebook')) {
      return setMessages((prev) => [
        ...prev,
        {
          type: 'suggestion',
          suggestion: 'Sell an eBook',
          link: '/tools/sell-ebook',
        },
      ])
    }

    // 📱 Social media tool
    if (keyword.includes('social media')) {
      return setMessages((prev) => [
        ...prev,
        {
          type: 'suggestion',
          suggestion: 'Social Media Manager',
          link: '/tools/social-media-manager',
        },
      ])
    }

    // 🧠 Default fallback API (or dummy)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      const data = await res.json()

      if (data?.type === 'suggestion') {
        const suggestion: Message = {
          type: 'suggestion',
          suggestion: data.suggestion,
          link: data.link,
        }
        setMessages((prev) => [...prev, suggestion])
      } else {
        const botMessage: Message = {
          type: 'text',
          role: 'bot',
          text: data.reply || 'Sorry, I didn’t understand that.',
        }
        setMessages((prev) => [...prev, botMessage])
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          type: 'text',
          role: 'bot',
          text: 'Something went wrong. Try again later.',
        },
      ])
    }
  }

  // 📤 Auto-trigger on initial load
  useEffect(() => {
    if (initialMessage) {
      addMessage(initialMessage)
    }
  }, [initialMessage])

  return { messages, addMessage }
}
