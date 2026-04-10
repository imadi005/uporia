'use client';

import { useState } from 'react';

export default function BrandNameGenerator() {
  const [keywords, setKeywords] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const generateNames = () => {
    const base = keywords
      .split(',')
      .map(word => word.trim().toLowerCase())
      .filter(Boolean);

    const generated = [
      `Get${base[0] || 'Brand'}`,
      `${base[1] || 'Nova'}Works`,
      `Team${base[0]?.charAt(0).toUpperCase() + base[0]?.slice(1) || 'Spark'}`,
      `${base[0] || 'Zen'}ify`,
      `Go${base[0]?.toUpperCase() || 'Next'}`,
      `Brandly${base[1]?.toUpperCase() || 'Pro'}`,
    ];

    setResults(generated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-950 text-white flex flex-col items-center justify-center px-4 py-10 font-sans transition-all duration-500">
      {/* Title */}
      <div className="text-center mb-12 animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight mb-3">
          🧠 Brand Name Generator
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Enter keywords and generate fresh, catchy brand names powered by pure creativity.
        </p>
      </div>

      {/* Input Box */}
      <div className="w-full max-w-2xl flex flex-col items-center gap-6">
        <input
          type="text"
          value={keywords}
          onChange={e => setKeywords(e.target.value)}
          placeholder="Enter comma-separated keywords (e.g. tech, health, AI)"
          className="w-full p-4 bg-zinc-800 text-white border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300"
        />
        <button
          onClick={generateNames}
          className="px-6 py-3 rounded-xl text-black bg-white hover:bg-silver-300 hover:scale-105 shadow-lg transition-all duration-300"
        >
          🚀 Generate Names
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-12 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeInUp">
          {results.map((name, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-black p-6 rounded-xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 text-center hover:scale-105"
            >
              <h3 className="text-xl font-bold text-white">{name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
