'use client';
import { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import GeminiOutput from '@/components/GeminiOutput';
import ChipInput from '@/components/ChipInput';
import PillSelect from '@/components/PillSelect';
import GenerateButton from '@/components/GenerateButton';

export default function Page() {
  const [product, setProduct] = useState('');
  const [market, setMarket] = useState('');
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generate = async () => {
    if (!product) return;
    setLoading(true); setResult('');
    const res = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `Create a Go-To-Market strategy for:\nProduct: ${product}\nTarget Market: ${market || 'Not specified'}\nBudget: ${budget || 'Bootstrapped'}\n\n## Phase 1 - Pre-Launch (Weeks 1-4)\n## Phase 2 - Launch (Week 5-8)\n## Phase 3 - Growth (Month 3-6)\n## Key Channels\n## KPIs & Success Metrics\n## 30-60-90 Day Plan\n\nBe specific with actionable tactics.` }) });
    const data = await res.json();
    setResult(data.result || data.error); setLoading(false);
  };

  return (
    <ToolShell icon="📋" title="Go-To-Market Strategy" description="Generate a complete, phase-by-phase GTM plan tailored to your product and budget." badge="AI Powered">
      <div className="space-y-5">
        <ChipInput label="Product / Service" value={product} onChange={setProduct} required placeholder="e.g. AI writing assistant for college students"
          suggestions={['SaaS productivity tool', 'Mobile fitness app', 'B2B HR software', 'Consumer marketplace', 'EdTech platform']} />
        <ChipInput label="Target Market" value={market} onChange={setMarket} placeholder="e.g. College students in India aged 18-25"
          suggestions={['College students India', 'SMEs & Startups', 'Working professionals 25-35', 'Enterprise B2B', 'Gen Z consumers']} />
        <PillSelect label="Budget Range" value={budget} onChange={setBudget}
          options={['Bootstrapped', 'Under ₹5L', '₹5L–₹50L', '₹50L–₹2Cr', '₹2Cr+']} />
        <GenerateButton loading={loading} disabled={!product} onClick={generate} label="Generate GTM Strategy" loadingLabel="Building strategy..." />
      </div>
      <GeminiOutput content={result} />
    </ToolShell>
  );
}
