'use client';

import { useState } from 'react';

const platforms = ['Instagram', 'Twitter (X)', 'LinkedIn', 'Facebook', 'YouTube Shorts', 'Pinterest', 'Threads'];
const tones = ['Informative', 'Funny', 'Emotional', 'Witty', 'Inspiring', 'Casual'];
const goals = ['Promote a product', 'Build brand awareness', 'Drive website traffic', 'Increase engagement', 'Share a tip'];

function generatePost({ product, platform, tone, goal, audience, offer }: any) {
  const hooks = [
    'Did you know?',
    '🔥 Hot tip:',
    'Here’s how to stand out ⬇️',
    'This blew my mind:',
    'People don’t talk about this enough...',
    'Ready to level up?',
    'Here’s something valuable 💡',
  ];

  const formats = {
    Instagram: ['carousel post', 'short reel caption', 'story hook'],
    LinkedIn: ['insightful story', 'industry stats', 'personal achievement'],
    Twitter: ['thread idea', 'short blast', 'trending hook'],
    Facebook: ['story post', 'long form CTA', 'community spark'],
    'YouTube Shorts': ['caption punch', 'reaction hook'],
    Pinterest: ['pin headline', 'DIY idea'],
    Threads: ['quickfire opinion', 'witty blast'],
  };

  const emojis = ['🚀', '✨', '🔥', '🎯', '💡', '📣', '📈', '✅', '👇', '⚡️'];
  const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  const opening = rand(hooks);
  const emoji = rand(emojis);
  const format = rand(formats[platform] || ['post']);

  return `${emoji} ${opening}\n\nCrafted for ${audience} using a ${tone} ${format}, this post highlights "${product}".\nGoal: ${goal}.\nOffer angle: ${offer || 'N/A'}\n\n#${platform.replace(/[^a-zA-Z]/g, '')} #${goal.split(' ')[0]} #SocialPostWizard`;
}

export default function SocialMediaPostMaker() {
  const [product, setProduct] = useState('');
  const [platform, setPlatform] = useState('');
  const [tone, setTone] = useState('');
  const [goal, setGoal] = useState('');
  const [audience, setAudience] = useState('');
  const [offer, setOffer] = useState('');
  const [output, setOutput] = useState('');

  const handleGenerate = () => {
    if (!product || !platform || !tone || !goal || !audience) {
      alert('⚠️ Please fill all required fields');
      return;
    }

    setOutput(generatePost({ product, platform, tone, goal, audience, offer }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white p-10 flex flex-col items-center justify-start font-sans overflow-y-auto">
      <div className="max-w-5xl w-full bg-zinc-900/80 border border-zinc-700 rounded-xl p-10 shadow-2xl backdrop-blur-md">
        <h1 className="text-4xl font-extrabold mb-8 text-center">📱 Social Media Post Maker</h1>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <label className="text-sm text-zinc-400">Platform</label>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md">
              <option value="">-- Choose --</option>
              {platforms.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm text-zinc-400">Tone</label>
            <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md">
              <option value="">-- Choose --</option>
              {tones.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm text-zinc-400">Goal</label>
            <select value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md">
              <option value="">-- Choose --</option>
              {goals.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm text-zinc-400">Product / Service</label>
            <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} className="w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md text-white" />
          </div>

          <div>
            <label className="text-sm text-zinc-400">Target Audience</label>
            <input type="text" value={audience} onChange={(e) => setAudience(e.target.value)} className="w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md text-white" />
          </div>

          <div>
            <label className="text-sm text-zinc-400">Offer / CTA</label>
            <input type="text" value={offer} onChange={(e) => setOffer(e.target.value)} className="w-full p-3 bg-zinc-800 border border-zinc-600 rounded-md text-white" />
          </div>
        </div>

        {/* Generate Button */}
        <button onClick={handleGenerate} className="w-full bg-white text-black py-3 rounded-md font-bold hover:bg-zinc-200 transition shadow-lg">
          ✨ Generate Post
        </button>

        {/* Output */}
        {output && (
          <div className="mt-8 bg-zinc-800 border border-zinc-600 rounded-lg p-6 text-sm max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700">
            <pre className="whitespace-pre-wrap text-white">{output}</pre>
            <button onClick={() => navigator.clipboard.writeText(output)} className="mt-4 bg-white text-black px-4 py-1 rounded hover:bg-zinc-300">
              📋 Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
