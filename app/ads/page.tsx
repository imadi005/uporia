'use client';

import { useState } from 'react';

const platforms = ['Google', 'Meta', 'LinkedIn', 'Twitter', 'Pinterest'];
const styles = ['Emotional', 'Urgent', 'Witty', 'Informational', 'Curiosity'];
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

function generateHeadline(product: string, offer: string, platform: string, style: string, industry: string) {
  const openers: Record<string, string[]> = {
    Emotional: ['Discover how', 'Feel the power of', 'Fall in love with'],
    Urgent: ['Limited time offer!', 'Act fast:', 'Don’t miss out on'],
    Witty: ['Your wallet called.', 'Admit it. You want this.', 'Not buying this? Bold move.'],
    Informational: ['Introducing', 'New launch:', 'What’s inside:'],
    Curiosity: ['They didn’t expect this...', 'What happens next will amaze you', 'You won’t believe this trick'],
  };

  const actionTemplates: Record<string, string[]> = {
    'Health & Wellness': [
      'Boost your wellbeing with',
      'Your journey to better health starts with',
      'Take control of your health using',
    ],
    Finance: [
      'Grow your wealth with',
      'Take smarter money decisions using',
      'Secure your future with',
    ],
    Education: [
      'Learn faster with',
      'Master any skill using',
      'Revolutionize learning with',
    ],
    Fashion: [
      'Redefine your style with',
      'Get trendy with',
      'Upgrade your wardrobe using',
    ],
    'Food & Beverage': [
      'Savor the taste of',
      'Craving something new? Try',
      'Bring flavor to life with',
    ],
    'Tech Startups': [
      'Innovate your workflow with',
      'Launch smarter with',
      'Disrupt the market using',
    ],
    'Real Estate': [
      'Find your dream home with',
      'Invest smarter using',
      'Your next property deal starts with',
    ],
    Entertainment: [
      'Experience fun like never before with',
      'Unlock entertainment using',
      'Your next obsession is',
    ],
    'Green Energy': [
      'Switch to clean energy with',
      'Power your life sustainably using',
      'Save the planet with',
    ],
  };

  const closers = [
    `Try ${product} today.`,
    `Only today: ${offer}`,
    `See why everyone’s switching to ${product}`,
    `Be the first to try it.`,
    `Click to learn more.`,
  ];

  const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  const open = rand(openers[style]);
  const action = rand(actionTemplates[industry]);
  const close = rand(closers);

  return `${open} ${product}? ${action}. ${close}`;
}

export default function AdHeadlineTool() {
  const [product, setProduct] = useState('');
  const [offer, setOffer] = useState('');
  const [platform, setPlatform] = useState('');
  const [style, setStyle] = useState('');
  const [industry, setIndustry] = useState('');
  const [headlines, setHeadlines] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!product || !offer || !platform || !style || !industry) {
      alert('Please fill out all fields!');
      return;
    }
    const newHeadlines = Array.from({ length: 5 }, () =>
      generateHeadline(product, offer, platform, style, industry)
    );
    setHeadlines(newHeadlines);
  };

  return (
    <div className="h-screen w-screen overflow-auto bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white p-10 font-sans flex flex-col items-center justify-start overflow-y-auto">
      <div className="max-w-5xl w-full bg-zinc-900/80 border border-zinc-700 rounded-xl p-10 backdrop-blur-md shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center">📣 Ad Headlines Generator</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="">Choose Platform</option>
              {platforms.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Headline Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="">Choose Style</option>
              {styles.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm text-zinc-400 mb-1 block">Industry</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600"
            >
              <option value="">-- Select Industry --</option>
              {industries.map((ind) => (
                <option key={ind}>{ind}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm text-zinc-400 mb-1 block">Product / Service</label>
            <input
              type="text"
              placeholder="e.g. Dot & Key SaliCyclic Face Serum"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm text-zinc-400 mb-1 block">Special Offer</label>
            <input
              type="text"
              placeholder="e.g. 20% Off First Order"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-600"
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-white text-black py-3 rounded-md font-bold hover:bg-zinc-200 transition shadow-lg"
        >
          ✨ Generate Headlines
        </button>

        {headlines.length > 0 && (
          <div className="mt-8 space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            {headlines.map((h, idx) => (
              <div
                key={idx}
                className="p-4 bg-zinc-800 border border-zinc-600 rounded-md text-sm relative group transition duration-300 hover:shadow-lg"
              >
                {h}
                <button
                  onClick={() => navigator.clipboard.writeText(h)}
                  className="absolute top-2 right-2 text-xs px-3 py-1 rounded bg-white text-black hover:bg-zinc-300 transition opacity-0 group-hover:opacity-100"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
