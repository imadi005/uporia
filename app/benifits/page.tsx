'use client';

import { useState } from 'react';

export default function ProductBenefitHighlighter() {
  const [features, setFeatures] = useState('');
  const [benefits, setBenefits] = useState<string[]>([]);

  const transformFeature = (feature: string) => {
    const lower = feature.toLowerCase();
    if (lower.includes('durable') || lower.includes('strong')) {
      return `Gives users long-term usage confidence by being "${feature}".`;
    } else if (lower.includes('lightweight') || lower.includes('portable')) {
      return `"${feature}" ensures users enjoy mobility and convenience.`;
    } else if (lower.includes('plastic') || lower.includes('material')) {
      return `Built using ${feature}, providing reliable performance for specific needs.`;
    } else if (lower.includes('eco') || lower.includes('green')) {
      return `"${feature}" supports sustainability, which appeals to eco-conscious users.`;
    } else if (lower.includes('design') || lower.includes('look')) {
      return `The "${feature}" helps users feel proud and modern in presentation.`;
    }
    return `Transforms the feature "${feature}" into direct user value.`;
  };

  const handleHighlight = () => {
    const list = features.split('\n').map(f => f.trim()).filter(Boolean);
    const transformed = list.map(transformFeature);
    setBenefits(transformed);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white p-8 flex flex-col items-center justify-center overflow-auto">
      
      {/* Header */}
      <div className="max-w-3xl w-full bg-zinc-900/80 p-8 rounded-2xl shadow-2xl border border-zinc-700 backdrop-blur-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-3">✨ Product Benefit Highlighter</h1>
        <p className="text-center text-zinc-400 mb-6">
          Turn your product's feature list into punchy, user-focused benefits that sell.
        </p>

        {/* Textarea */}
        <label className="block mb-2 text-sm text-zinc-400">Paste Feature List:</label>
        <textarea
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          rows={6}
          placeholder="e.g., Waterproof coating\nLightweight frame\nEco-friendly plastic"
          className="w-full p-4 rounded-lg bg-zinc-800 border border-zinc-600 text-white font-mono mb-6 resize-none"
        />

        {/* CTA */}
        <button
          onClick={handleHighlight}
          className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition shadow-md"
        >
          🚀 Highlight Benefits
        </button>
      </div>

      {/* Output */}
      {benefits.length > 0 && (
        <div className="max-w-3xl w-full mt-10">
          <h2 className="text-xl font-bold mb-4 text-blue-400">🎯 Generated Benefits</h2>
          <ul className="space-y-3">
            {benefits.map((benefit, i) => (
              <li
                key={i}
                className="bg-zinc-800 border border-zinc-600 p-4 rounded-lg text-sm leading-relaxed hover:scale-[1.02] transition-transform"
              >
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
