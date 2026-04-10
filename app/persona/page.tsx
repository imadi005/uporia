'use client';

import { useState } from 'react';

const industries = [
  'Tech Startups',
  'Health & Wellness',
  'E-commerce',
  'Education',
  'Finance',
  'Gaming',
  'Real Estate',
  'Fashion',
  'Green Energy',
];

const random = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const generatePersona = (industry: string) => {
  const names = ['Arjun', 'Neha', 'Kabir', 'Ananya', 'Ravi', 'Simran', 'Dev', 'Isha'];
  const ages = ['23', '28', '32', '35', '40'];
  const roles = ['Marketer', 'Product Manager', 'Freelancer', 'Student', 'Entrepreneur'];
  const goals = ['launch their brand', 'increase productivity', 'save money', 'grow audience'];
  const frustrations = ['too many tools', 'lack of trust', 'info overload', 'no time'];
  const platforms = ['Instagram', 'LinkedIn', 'YouTube', 'Reddit'];

  return {
    name: random(names),
    age: random(ages),
    gender: Math.random() > 0.5 ? 'Male' : 'Female',
    role: random(roles),
    bio: `A ${random(roles)} in the ${industry} industry looking to ${random(goals)} but frustrated by ${random(frustrations)}.`,
    painPoints: random(frustrations),
    preferredPlatform: random(platforms),
    goal: random(goals),
  };
};

export default function CustomerPersonaPage() {
  const [industry, setIndustry] = useState('');
  const [persona, setPersona] = useState<any>(null);

  const handleGenerate = () => {
    if (!industry) return alert('Please select an industry first!');
    setPersona(generatePersona(industry));
  };

  return (
    <div className="min-h-screen w-full overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white p-8 font-sans flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full bg-zinc-900/80 p-8 rounded-xl shadow-2xl backdrop-blur-md border border-zinc-700">
        <h1 className="text-3xl font-bold mb-6 text-center">🧠 Customer Persona Generator</h1>

        <label className="block mb-2 text-sm text-zinc-400">Select Industry:</label>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-white mb-6"
        >
          <option value="">-- Choose Industry --</option>
          {industries.map((ind, i) => (
            <option key={i} value={ind}>{ind}</option>
          ))}
        </select>

        <button
          onClick={handleGenerate}
          className="w-full bg-white text-black font-semibold py-3 px-4 rounded-lg hover:bg-zinc-200 transition shadow-md"
        >
          🎯 Generate Persona
        </button>

        {persona && (
          <div className="mt-8 bg-zinc-800 border border-zinc-600 rounded-xl p-6 space-y-4 shadow-lg">
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-1">👤 Persona Summary</h3>
              <p className="text-zinc-300">{persona.bio}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm text-zinc-300">
              <p><b>Name:</b> {persona.name}</p>
              <p><b>Age:</b> {persona.age}</p>
              <p><b>Gender:</b> {persona.gender}</p>
              <p><b>Role:</b> {persona.role}</p>
              <p><b>Pain Point:</b> {persona.painPoints}</p>
              <p><b>Goal:</b> {persona.goal}</p>
              <p><b>Preferred Platform:</b> {persona.preferredPlatform}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
