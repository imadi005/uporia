'use client';

import { useState } from 'react';

const techSkills = [
  'React', 'Next.js', 'Node.js', 'Python', 'Firebase', 'MongoDB',
  'Tailwind CSS', 'Stripe API', 'Chatbots', 'AI Tools'
];

const industryAreas = [
  'Healthcare', 'Education', 'Finance', 'Real Estate',
  'E-commerce', 'SaaS', 'Freelancing', 'Fitness', 'Marketing'
];

const stackSuggestions = {
  frontend: ['Next.js', 'React', 'Vue.js'],
  backend: ['Firebase', 'Supabase', 'Node.js'],
  db: ['MongoDB', 'PostgreSQL', 'Planetscale'],
  auth: ['Clerk', 'Supabase Auth', 'NextAuth'],
  payments: ['Stripe', 'Razorpay', 'LemonSqueezy'],
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateIdea = (skills, industry) => {
  const name = `A ${getRandom(['Smart', 'AI-based', 'Lightweight', 'Customizable'])} ${industry} SaaS using ${skills[0] || 'modern tech'}`;
  const desc = `Create a hyper-targeted SaaS for ${industry} professionals using ${
    skills.length ? skills.join(', ') : 'your chosen stack'
  }. Monetize via subscriptions, tiered pricing, or pay-per-feature.`;
  const audience = `Perfect for founders, solo entrepreneurs, and niche businesses in ${industry}.`;

  const stack = {
    Frontend: getRandom(stackSuggestions.frontend),
    Backend: getRandom(stackSuggestions.backend),
    Database: getRandom(stackSuggestions.db),
    Auth: getRandom(stackSuggestions.auth),
    Payments: getRandom(stackSuggestions.payments),
  };

  return { name, desc, audience, stack };
};

export default function MicroSaaSIdeaCrafter() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [idea, setIdea] = useState(null);

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const generate = () => {
    if (!selectedIndustry) return alert('Please select an industry!');
    const newIdea = generateIdea(selectedSkills, selectedIndustry);
    setIdea(newIdea);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white px-6 py-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white mb-6">🧩 Micro-SaaS Idea Crafter</h1>
        <p className="text-gray-400 mb-10">Generate powerful SaaS startup ideas based on your stack and industry.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-lg font-semibold mb-2">Your Skills</h2>
            <div className="flex flex-wrap gap-2">
              {techSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1 rounded-full text-sm border transition ${
                    selectedSkills.includes(skill)
                      ? 'bg-white text-black'
                      : 'border-zinc-600 text-white hover:bg-white/10'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Target Industry</h2>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="">-- Select Industry --</option>
              {industryAreas.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={generate}
          className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-zinc-200 transition"
        >
          🚀 Generate SaaS Idea
        </button>

        {idea && (
          <div className="mt-10 p-6 bg-zinc-800 border border-zinc-600 rounded-xl space-y-5">
            <h2 className="text-2xl font-bold text-white">{idea.name}</h2>
            <p className="text-zinc-300">{idea.desc}</p>
            <p className="text-sm text-zinc-500 italic">{idea.audience}</p>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-white mb-2">💻 Suggested Tech Stack</h3>
              <ul className="text-zinc-300 list-disc ml-6 space-y-1">
                {Object.entries(idea.stack).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
