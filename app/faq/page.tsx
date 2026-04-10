'use client';

import { useState } from 'react';

const industries = [
  'Food & Beverage',
  'Health & Wellness',
  'E-commerce',
  'Tech & SaaS',
  'Fashion',
  'Education',
  'Finance',
  'Real Estate',
  'Travel & Hospitality',
];

const tones = ['Friendly', 'Professional', 'Casual', 'Authoritative'];

const questionTemplates = {
  "Food & Beverage": [
    "What ingredients are used in {product}?",
    "How does {product} maintain freshness during delivery?",
    "Are there any health concerns associated with {product}?",
    "How is {product} priced or billed?",
    "Is {product} available in vegetarian or vegan options?",
    "Can I customize my order with {product}?",
    "Is {product} available on food delivery platforms like Zomato/Swiggy?",
    "What are the delivery times or packaging quality for {product}?",
    "Does {product} come with combo deals or discounts?",
    "Why is {product} popular in the {industry} market?"
  ],
  "Health & Wellness": [
    "What benefits does {product} provide?",
    "Is {product} certified or approved by health bodies?",
    "What makes {product} unique in the {industry} market?",
    "Can {product} help with [common goal]?",
    "What is the dosage or recommended usage for {product}?",
    "Is {product} safe for children or elderly?",
    "How soon can I expect results from using {product}?",
    "Are there side effects from {product}?",
    "Where is {product} manufactured or sourced?",
    "How is {product} different from alternatives?"
  ],
  // Add more industries below...
};

const generateFaqs = (
  industry: string,
  product: string,
  count: number
): string[] => {
  const templates = questionTemplates[industry];
  const shuffled = templates
    .map((q) => q.replace(/{product}/g, product).replace('{industry}', industry))
    .sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function FaqAutoCrafter() {
  const [industry, setIndustry] = useState('');
  const [product, setProduct] = useState('');
  const [faqCount, setFaqCount] = useState(5);
  const [tone, setTone] = useState('Friendly');
  const [faqs, setFaqs] = useState<string[]>([]);

  const generate = () => {
    if (!industry || !product) return alert('Select industry and enter product name.');
    const generated = generateFaqs(industry, product, faqCount);
    setFaqs(generated);
  };

  const downloadTxt = () => {
    const blob = new Blob(faqs.map((f, i) => [`Q${i + 1}. ${f}\n\n`]), { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${product.replace(/\s+/g, '_')}_FAQs.txt`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans px-4 py-10 overflow-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
      <div className="max-w-4xl mx-auto bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-zinc-700">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center text-red-500">
          ❓ FAQ Auto-Crafter
        </h1>
        <p className="text-center text-zinc-400 mb-8">Generate frequently asked questions for your industry or product.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Industry</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 focus:outline-none"
            >
              <option value="">-- Select --</option>
              {industries.map((ind, i) => (
                <option key={i} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2"
            >
              {tones.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-1">Product / Brand Name</label>
          <input
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="e.g. KFC, Bellavita Perfume"
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-1">Number of FAQs</label>
          <input
            type="range"
            min={3}
            max={10}
            value={faqCount}
            onChange={(e) => setFaqCount(parseInt(e.target.value))}
            className="w-full"
          />
          <p className="text-sm mt-1 text-zinc-400">{faqCount} Questions</p>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={generate}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded shadow-md transition"
          >
            🔁 Generate FAQs
          </button>
          <button
            onClick={downloadTxt}
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2 border border-zinc-600 rounded"
            disabled={faqs.length === 0}
          >
            📥 Download All
          </button>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm transition hover:border-white"
            >
              <strong>Q{idx + 1}.</strong> {faq}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
