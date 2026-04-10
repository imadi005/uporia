'use client';

import { useState } from 'react';

const tones = ['Bold', 'Friendly', 'Professional', 'Playful', 'Inspirational', 'Urgent'];
const audiences = ['Startups', 'Agencies', 'Ecommerce Brands', 'Freelancers', 'Corporate Clients'];

const generateHeadline = (product: string, tone: string, audience: string) => {
  const starters = {
    Bold: ['Dominate your niche with', 'Own the market using', 'Level up your brand through'],
    Friendly: ['Say hello to', 'Meet your new favorite', 'We built this just for'],
    Professional: ['Optimize success with', 'Revolutionize growth via', 'Streamline results using'],
    Playful: ['Wave goodbye to boring', 'Turn heads with', 'Unleash magic with'],
    Inspirational: ['Start something remarkable with', 'Empower your journey through', 'Fuel your mission using'],
    Urgent: ['Don’t miss out on', 'Last chance to leverage', 'Act now with'],
  };

  const verbs = ['empower', 'ignite', 'scale', 'transform', 'accelerate', 'grow'];

  const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  return `${rand(starters[tone])} ${product.toUpperCase()} — crafted for ${audience} to ${rand(verbs)} results.`;
};

export default function HeroTextMaker() {
  const [tone, setTone] = useState('');
  const [audience, setAudience] = useState('');
  const [product, setProduct] = useState('');
  const [headline, setHeadline] = useState('');

  const handleGenerate = () => {
    if (!tone || !audience || !product) {
      alert('Fill all fields to generate a headline.');
      return;
    }
    setHeadline(generateHeadline(product, tone, audience));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white p-8 font-sans flex items-center justify-center overflow-auto">
      <div className="max-w-4xl w-full bg-zinc-900/80 backdrop-blur-lg rounded-2xl p-10 border border-zinc-700 shadow-2xl space-y-6">
        <h1 className="text-4xl font-extrabold text-center mb-4">🖋️ Hero Text Maker</h1>
        <p className="text-zinc-400 text-center mb-6">Craft stunning above-the-fold headlines for landing pages, ads, and more.</p>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Audience</label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option value="">Select Audience</option>
              {audiences.map((a, i) => (
                <option key={i} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option value="">Select Tone</option>
              {tones.map((t, i) => (
                <option key={i} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Your Product / Service</label>
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Ex: Time Tracker App"
              className="w-full bg-zinc-800 border border-zinc-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full py-3 text-lg bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition"
        >
          ✨ Generate Hero Text
        </button>

        {headline && (
          <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-600 mt-6 text-lg font-medium text-center relative group">
            <p>{headline}</p>
            <button
              className="absolute top-3 right-3 text-xs bg-white text-black px-3 py-1 rounded-md hover:bg-zinc-300 transition opacity-0 group-hover:opacity-100"
              onClick={() => navigator.clipboard.writeText(headline)}
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
