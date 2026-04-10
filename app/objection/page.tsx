'use client';

import { useState } from 'react';

const tones = ['Friendly', 'Authoritative', 'FOMO-Inducing'];

const templates: Record<string, string[]> = {
  Friendly: [
    "Totally understand! 😊 Many users had the same concern, but found the long-term value worth it.",
    "That’s a common worry—but we’ve got you! It’s easier than it sounds and totally beginner-friendly.",
    "No pressure! But once you try it, you’ll wonder how you ever lived without it. ✨"
  ],
  Authoritative: [
    "We hear you. But the truth is—leading professionals rely on this daily for a reason.",
    "Understandable concern, but this tool is proven to improve ROI significantly for businesses like yours.",
    "Our data-backed approach delivers exactly what your competitors are already gaining from. Don’t fall behind."
  ],
  'FOMO-Inducing': [
    "Others in your space are already seeing results—don’t get left behind. 🔥",
    "You might miss a golden opportunity if you wait. This could be your edge!",
    "Still thinking? Meanwhile, others are scaling faster than ever. Be part of the movement."
  ]
};

const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export default function ObjectionHandler() {
  const [objection, setObjection] = useState('');
  const [tone, setTone] = useState('Friendly');
  const [response, setResponse] = useState('');

  const generateResponse = () => {
    if (!objection.trim()) return alert('Please enter an objection!');
    const template = rand(templates[tone]);
    const cleanObj = objection.trim().replace(/\.$/, '');
    setResponse(`${template}\n\n🧠 Objection: "${cleanObj}"`);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white px-6 py-12 font-sans flex flex-col items-center overflow-auto">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,_#1f1f1f,_transparent_60%)] animate-pulse opacity-30" />

      <div className="max-w-3xl w-full bg-zinc-900/80 border border-zinc-700 rounded-2xl p-10 shadow-2xl backdrop-blur-md">
        <h1 className="text-3xl font-extrabold mb-4 text-center text-white flex items-center justify-center gap-2">
          ⚔️ Objection Handler
        </h1>
        <p className="text-sm text-zinc-400 text-center mb-8">
          Enter common user objections and get persuasive responses based on selected tone.
        </p>

        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-2">Objection Text</label>
          <textarea
            value={objection}
            onChange={(e) => setObjection(e.target.value)}
            placeholder='e.g. "It seems too expensive for me."'
            className="w-full bg-zinc-800 border border-zinc-600 rounded-lg p-4 text-white resize-none focus:outline-none focus:ring-2 focus:ring-slate-500"
            rows={3}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-2">Select Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-600 rounded-lg p-3 text-white"
          >
            {tones.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={generateResponse}
          className="w-full bg-white text-black font-bold py-3 rounded-md hover:bg-zinc-200 transition-all shadow-lg"
        >
          💬 Generate Response
        </button>

        {response && (
          <div className="mt-8 bg-zinc-800 border border-zinc-600 rounded-xl p-6 text-sm leading-relaxed text-white shadow-md">
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
