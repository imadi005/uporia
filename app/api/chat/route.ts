// app/api/chat/route.ts

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    // Basic suggestion logic
    if (message.toLowerCase().includes('course')) {
      return NextResponse.json({
        type: 'suggestion',
        suggestion: 'Launch your own course',
        link: '/tools/sell-course',
      })
    }

    if (message.toLowerCase().includes('ebook')) {
      return NextResponse.json({
        type: 'suggestion',
        suggestion: 'Sell an eBook',
        link: '/tools/sell-ebook',
      })
    }

    return NextResponse.json({
      type: 'text',
      reply: `Hmm... I couldn’t find a match for "${message}". Try asking differently.`,
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ reply: 'Server error occurred.' }, { status: 500 })
  }
}
