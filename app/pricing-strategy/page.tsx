'use client';
import { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import GeminiOutput from '@/components/GeminiOutput';
import ChipInput from '@/components/ChipInput';
import PillSelect from '@/components/PillSelect';
import GenerateButton from '@/components/GenerateButton';

export default function Page() {
  const [product, setProduct] = useState('');
  const [customer, setCustomer] = useState('');
  const [model, setModel] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generate = async () => {
    if (!product) return;
    setLoading(true); setResult('');
    const res = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `Design pricing strategy for:\nProduct: ${product}\nTarget Customer: ${customer || 'SMEs and entrepreneurs'}\nPreferred Model: ${model || 'Subscription'}\n\n## Recommended Pricing Model\n## Pricing Tiers (with specific prices in INR and USD)\n## What each tier includes\n## Psychological Pricing Tactics\n## Annual vs Monthly strategy\n## Free Trial Strategy\n## When to raise prices\n\nInclude actual price numbers.` }) });
    const data = await res.json();
    setResult(data.result || data.error); setLoading(false);
  };

  return (
    <ToolShell icon="🏷️" title="Pricing Strategy Advisor" description="Get AI-designed pricing tiers with actual numbers, not guesswork." badge="AI Powered">
      <div className="space-y-5">
        <ChipInput label="Your Product" value={product} onChange={setProduct} required placeholder="e.g. SaaS project management tool"
          suggestions={['SaaS tool', 'Mobile app', 'Online course', 'Consulting service', 'Digital product', 'Marketplace platform']} />
        <PillSelect label="Target Customer" value={customer} onChange={setCustomer}
          options={['Individuals', 'Freelancers', 'Startups', 'SMEs', 'Enterprise', 'Students']} />
        <PillSelect label="Preferred Model" value={model} onChange={setModel}
          options={['Freemium', 'Subscription', 'One-time', 'Usage-based', 'Per-seat', 'Hybrid']} />
        <GenerateButton loading={loading} disabled={!product} onClick={generate} label="Design Pricing Strategy" loadingLabel="Designing tiers..." />
      </div>
      <GeminiOutput content={result} />
    </ToolShell>
  );
}
