'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const suggestions = [
  'How do I get my first 100 customers?',
  'Should I charge for my MVP or keep it free?',
  'How do I pitch to investors?',
  'What mistakes do most first-time founders make?',
];

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hey! I'm your AI Business Mentor 🧠 I've helped hundreds of founders think through their startup challenges. Ask me anything — product, growth, funding, team, strategy. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setInput(''); setLoading(true);

    const history = messages.map(m => `${m.role === 'user' ? 'Founder' : 'Mentor'}: ${m.text}`).join('\n');
    const prompt = `You are an expert startup mentor and investor advisor. You have deep knowledge of entrepreneurship, product development, fundraising, marketing, and scaling businesses. You give practical, no-BS advice.\n\nConversation history:\n${history}\n\nFounder: ${msg}\nMentor:`;
    const res = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) });
    const data = await res.json();
    setMessages(prev => [...prev, { role: 'ai', text: data.result }]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F5FF] via-[#FAFAFF] to-[#EEF2FF] font-sans flex flex-col">
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/dashboard" className="text-sm font-medium text-violet-600 hover:text-violet-800">← Dashboard</Link>
        <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">Uporia</span>
      </nav>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 flex flex-col gap-4">
        <div className="text-center mb-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-100 text-3xl mb-3">🤖</div>
          <h1 className="text-2xl font-bold text-gray-900">AI Business Mentor</h1>
          <p className="text-gray-500 text-sm mt-1">Your personal startup advisor — available 24/7</p>
        </div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="grid grid-cols-2 gap-2">
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => send(s)} className="text-left text-xs p-3 bg-white border border-gray-100 rounded-xl text-gray-600 hover:border-violet-200 hover:bg-violet-50 transition-all shadow-sm">{s}</button>
            ))}
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-violet-600 text-white rounded-br-sm'
                  : 'bg-white text-gray-700 border border-gray-100 shadow-sm rounded-bl-sm'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1 items-center">
                  <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{animationDelay:'0ms'}}/>
                  <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{animationDelay:'150ms'}}/>
                  <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{animationDelay:'300ms'}}/>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm sticky bottom-4">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()} placeholder="Ask your mentor anything..." className="flex-1 text-sm text-gray-800 focus:outline-none bg-transparent" />
          <button onClick={() => send()} disabled={loading || !input.trim()} className="bg-violet-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-violet-700 transition-all disabled:opacity-40">Send</button>
        </div>
      </div>
    </div>
  );
}
