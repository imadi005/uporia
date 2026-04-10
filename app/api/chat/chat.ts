// pages/api/chat.ts

import type { NextApiRequest, NextApiResponse } from 'next'

type TextResponse = {
  type: 'text'
  reply: string
}

type SuggestionResponse = {
  type: 'suggestion'
  suggestion: string
  link: string
}

type Data = TextResponse | SuggestionResponse

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { message } = req.body
  const query = message.toLowerCase()

  const keywordRoutes: Record<string, { suggestion: string; link: string }> = {
    ebook: {
      suggestion: 'Sell your eBook with one click.',
      link: '/tools/ebook',
    },
    course: {
      suggestion: 'Launch your online course instantly.',
      link: '/tools/course',
    },
    'social media': {
      suggestion: 'Automate your social media management.',
      link: '/tools/social',
    },
    podcast: {
      suggestion: 'Start and grow your podcast easily.',
      link: '/tools/podcast',
    },
    'ai voice': {
      suggestion: 'Use Uporia’s AI voice tools here.',
      link: '/tools/ai-voice',
    },
  }

  const match = Object.entries(keywordRoutes).find(([keyword]) =>
    query.includes(keyword)
  )

  if (match) {
    const { suggestion, link } = match[1]
    return res.status(200).json({ type: 'suggestion', suggestion, link })
  }

  return res.status(200).json({
    type: 'text',
    reply: `I'm still learning to answer that. Try searching with keywords like "ebook", "course", or "podcast".`,
  })
}
