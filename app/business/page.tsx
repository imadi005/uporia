'use client';

import { useState } from 'react';

const industries = [
  'Health & Wellness',
  'Finance',
  'Education',
  'Fashion',
  'Food & Beverage',
  'Tech Startups',
  'Real Estate',
  'Entertainment',
  'Green Energy',
];

const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const generateBusinessIdea = (industry: string) => {
  const adjectives = ['Smart', 'Sustainable', 'On-demand', 'AI-driven', 'Decentralized', 'Subscription-based', 'Hyperlocal', 'Mobile-first'];
  const solutions = ['platform', 'marketplace', 'app', 'assistant', 'hub', 'network'];
  const problems = ['simplifies', 'democratizes', 'disrupts', 'revolutionizes', 'redefines', 'streamlines'];

  const idea = `A ${rand(adjectives)} ${rand(solutions)} for the ${industry.toLowerCase()} industry that ${rand(problems)} how people interact with it.`;

  const audiences = {
    'Health & Wellness': 'Young professionals, fitness enthusiasts, and remote workers.',
    Finance: 'Millennials, stock traders, crypto users, and SMEs.',
    Education: 'Students, tutors, institutions, and e-learners.',
    Fashion: 'Urban youth, Gen Z influencers, niche designers.',
    'Food & Beverage': 'Home cooks, foodies, cloud kitchens, and micro-influencers.',
    'Tech Startups': 'Developers, founders, early adopters.',
    'Real Estate': 'Agents, property seekers, digital nomads, landlords.',
    Entertainment: 'Streamers, creators, small studios, indie gamers.',
    'Green Energy': 'Eco-conscious consumers, EV owners, housing societies.',
  };

  const resources = rand([
    ['Frontend Dev', 'UI/UX Designer', 'Product Strategist', 'SEO Expert', 'DevOps'],
    ['Fullstack Dev', 'Copywriter', 'Growth Hacker', 'Illustrator', 'Business Analyst'],
    ['React Dev', 'Designer', 'Marketer', 'Backend Dev', 'Funding Expert'],
  ]);

  const roadmapSteps = rand([
    ['Research & analysis', 'Wireframes & UX planning', 'MVP development', 'Beta testing & feedback', 'Launch & growth push'],
    ['Niche validation', 'Rapid prototyping', 'User onboarding', 'Community building', 'Monetization setup'],
    ['Market analysis', 'Design system build', 'Core feature dev', 'Launch & refine', 'Partnerships'],
  ]).map((step, i) => `${['✅', '🚀', '📊', '⚒️'][i % 4]} Month ${i + 1}-${i + 2}: ${step}`);

  const monetization = rand([
    ['Freemium upgrade', 'Subscription tiers', 'Marketplace fees', 'Brand sponsorship'],
    ['Ads + Affiliate', 'One-time purchase', 'Enterprise licensing', 'White-label resale'],
    ['Pay-per-feature', 'Recurring billing', 'Microtransactions', 'Crowdfunding'],
  ]);

  return {
    idea,
    targetAudience: audiences[industry],
    investment: `${Math.floor(Math.random() * 15 + 5)} Lakh INR`,
    resources,
    roadmap: roadmapSteps,
    monetization,
    timeline: '3–6 months for MVP, 12 months to scale.'
  };
};

export default function BusinessIdeaGenerator() {
  const [industry, setIndustry] = useState('');
  const [plan, setPlan] = useState<any>(null);

  const handleGenerate = () => {
    if (!industry) return alert('Please select an industry!');
    setPlan(generateBusinessIdea(industry));
  };

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white p-8 font-sans flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full bg-zinc-900/90 p-8 rounded-xl shadow-2xl backdrop-blur border border-zinc-700">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">🚀 Business Idea Generator</h1>

        <div className="mb-6">
          <label className="text-zinc-400 text-sm mb-2 block">Select an Industry:</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <option value="">-- Choose Industry --</option>
            {industries.map((ind, i) => (
              <option key={i} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full py-3 text-lg font-semibold bg-white text-black rounded-md hover:bg-zinc-200 transition-all shadow-lg"
        >
          ✨ Generate Full Business Plan
        </button>

        {plan && (
          <div className="mt-8 bg-zinc-800 p-6 rounded-lg border border-zinc-600 shadow-inner space-y-5 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            <div>
              <h2 className="text-xl font-semibold text-slate-200">💡 Idea:</h2>
              <p>{plan.idea}</p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-300">🎯 Target Audience</h3>
              <p>{plan.targetAudience}</p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-300">💰 Investment Needed</h3>
              <p>{plan.investment}</p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-300">🧠 Resources</h3>
              <ul className="list-disc ml-5 text-zinc-300">
                {plan.resources.map((r: string, i: number) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-300">📅 Roadmap</h3>
              <ul className="list-disc ml-5 text-zinc-300">
                {plan.roadmap.map((step: string, i: number) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-300">📈 Monetization Strategy</h3>
              <ul className="list-disc ml-5 text-zinc-300">
                {plan.monetization.map((m: string, i: number) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-300">⏳ Timeline</h3>
              <p>{plan.timeline}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
