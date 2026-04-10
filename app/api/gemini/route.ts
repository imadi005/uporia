import { NextResponse } from 'next/server';

// Prepended to every prompt to kill boilerplate + branding
const SYSTEM_PREFIX = `STRICT RULES - follow exactly:
1. Start your response DIRECTLY with the first section heading. No intro sentences, no "Let's break down", no "Great question", no acknowledgment lines whatsoever.
2. End your response when the content is complete. No closing remarks, no "I hope this helps", no summaries.
3. Do NOT mention any AI, model names, or tools.
4. Use ONLY the ## and ### markdown headings, bullet points (-), and numbered lists (1.) as formatting. No other markdown.
5. Be specific, direct, and data-driven.

`;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) return NextResponse.json({ error: 'No prompt provided' }, { status: 400 });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: 'GEMINI_API_KEY not set in .env.local' }, { status: 500 });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: SYSTEM_PREFIX + prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 65536,
          },
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error('Gemini API error:', data.error);
      return NextResponse.json({ error: `API error: ${data.error.message}` }, { status: 500 });
    }

    if (data.promptFeedback?.blockReason) {
      return NextResponse.json({ error: `Blocked: ${data.promptFeedback.blockReason}` }, { status: 400 });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      console.error('Empty response:', JSON.stringify(data));
      return NextResponse.json({ error: 'Empty response from API' }, { status: 500 });
    }

    return NextResponse.json({ result: text });

  } catch (error) {
    console.error('Route error:', error);
    return NextResponse.json({ error: 'Failed to connect to API' }, { status: 500 });
  }
}
