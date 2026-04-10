'use client';

import { useState } from 'react';
import clsx from 'clsx';

export default function PricingCalculatorPage() {
  const [teamSize, setTeamSize] = useState(5);
  const [featureLevel, setFeatureLevel] = useState<'basic' | 'pro' | 'enterprise'>('pro');

  const basePrice = 20;
  const multiplier = featureLevel === 'basic' ? 1 : featureLevel === 'pro' ? 1.8 : 2.5;
  const total = teamSize * basePrice * multiplier;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-950 text-white font-sans p-10 relative overflow-hidden">
      {/* Dynamic background particles */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-[#1f1f1f] to-black blur-3xl opacity-30 animate-pulse" />

      {/* Container */}
      <div className="relative z-10 max-w-4xl mx-auto rounded-xl bg-black/60 border border-white/10 backdrop-blur-md shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-white mb-6">📊 Pricing Plan Calculator</h1>
        <p className="text-gray-400 mb-8 text-sm">
          Visualize and calculate custom pricing plans based on your needs. Built for startups, agencies, and scaling teams.
        </p>

        {/* Slider Input */}
        <div className="mb-6">
          <label className="block text-sm mb-2 font-medium">👥 Team Size: <span className="text-white">{teamSize}</span> members</label>
          <input
            type="range"
            min={1}
            max={100}
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="w-full accent-purple-500 transition-all"
          />
        </div>

        {/* Feature Level Toggle */}
        <div className="mb-6">
          <label className="block text-sm mb-2 font-medium">💼 Feature Tier:</label>
          <div className="flex gap-4">
            {['basic', 'pro', 'enterprise'].map((level) => (
              <button
                key={level}
                onClick={() => setFeatureLevel(level as any)}
                className={clsx(
                  'px-4 py-2 rounded-full border text-sm transition-all',
                  featureLevel === level
                    ? 'bg-white text-black border-white shadow-md'
                    : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                )}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Results Display */}
        <div className="mt-10 p-6 bg-gradient-to-br from-gray-800/60 to-gray-900/70 border border-gray-700 rounded-xl shadow-xl backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-2">🧮 Estimated Monthly Cost:</h2>
          <p className="text-4xl font-bold text-green-400">${total.toFixed(2)}</p>
          <p className="text-sm text-gray-400 mt-2">
            ({teamSize} users × ${basePrice} × tier multiplier of {multiplier})
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <button
            onClick={() => alert('Contact sales triggered')}
            className="bg-gradient-to-r from-white to-gray-300 text-black px-6 py-3 rounded-md shadow-lg hover:from-gray-200 hover:to-white hover:scale-105 transition-transform duration-300"
          >
            🚀 Contact Sales for Custom Plan →
          </button>
        </div>
      </div>
    </div>
  );
}
