'use client';
import { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import GeminiOutput from '@/components/GeminiOutput';
import ChipInput from '@/components/ChipInput';
import PillSelect from '@/components/PillSelect';
import GenerateButton from '@/components/GenerateButton';

export default function Page() {
  const [product, setProduct] = useState('');
  const [stage, setStage] = useState('');
  const [goals, setGoals] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generate = async () => {
    if (!product) return;
    setLoading(true); setResult('');
    const res = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `Create a product roadmap:\nProduct: ${product}\nStage: ${stage || 'Idea'}\nGoals: ${goals || 'Launch MVP and get first users'}\n\n## Sprint 1 (Week 1-2)\n## Sprint 2 (Week 3-4)\n## Sprint 3 (Week 5-6)\n## Sprint 4 (Week 7-8)\n## Month 3 Goals\n## Month 6 Goals\n## Key Milestones\n## Tech Stack Recommendations\n\nBe specific with features and deliverables.` }) });
    const data = await res.json();
    setResult(data.result || data.error); setLoading(false);
  };

  return (
    <ToolShell icon="🗺️" title="Product Roadmap Generator" description="Sprint-by-sprint roadmap with clear milestones, deliverables, and tech recommendations." badge="AI Powered">
      <div className="space-y-5">
        <ChipInput label="Product Name / Idea" value={product} onChange={setProduct} required placeholder="e.g. Uporia — AI Business Platform"
          suggestions={['AI business platform', 'Job portal for freshers', 'Grocery delivery app', 'Mental health chatbot', 'Freelance marketplace']} />
        <PillSelect label="Current Stage" value={stage} onChange={setStage}
          options={['Idea Only', 'Design Phase', 'Building MVP', 'MVP Ready', 'Launched']} />
        <ChipInput label="Key Goals" value={goals} onChange={setGoals} placeholder="e.g. Get 100 beta users, launch on Product Hunt"
          suggestions={['Get 100 beta users', 'Raise seed funding', 'Launch on Product Hunt', 'Revenue of ₹1L/month', 'Partner with 10 companies']} />
        <GenerateButton loading={loading} disabled={!product} onClick={generate} label="Generate Roadmap" loadingLabel="Planning sprints..." />
      </div>
      <GeminiOutput content={result} />
    </ToolShell>
  );
}
