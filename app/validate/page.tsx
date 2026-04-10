'use client';
import { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import GeminiOutput from '@/components/GeminiOutput';
import ChipInput from '@/components/ChipInput';
import PillSelect from '@/components/PillSelect';
import GenerateButton from '@/components/GenerateButton';

export default function Page() {
  const [idea, setIdea] = useState('');
  const [industry, setIndustry] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generate = async () => {
    if (!idea) return;
    setLoading(true); setResult('');
    const res = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `You are a top startup advisor at Y Combinator. Validate this business idea.\n\nBusiness Idea: ${idea}\nIndustry: ${industry || 'General'}\n\nProvide:\n## Validation Score: X/10\n## Strengths\n## Weaknesses\n## Market Opportunity\n## Key Risks\n## Final Verdict\n\nBe specific and brutally honest.` }) });
    const data = await res.json();
    setResult(data.result || data.error); setLoading(false);
  };

  return (
    <ToolShell icon="🧠" title="Business Idea Validator" description="Get a brutally honest AI score and deep analysis of your business idea before investing time and money." badge="AI Powered">
      <div className="space-y-5">
        <ChipInput label="Your Business Idea" value={idea} onChange={setIdea} required textarea rows={3}
          placeholder="e.g. An AI platform that helps freelancers find high-paying clients using smart matching..."
          suggestions={['AI productivity tool for remote teams', 'Subscription box for pet owners', 'Online tutoring marketplace for tier-2 cities', 'SaaS for gym management', 'Hyperlocal food delivery for offices']} />
        <PillSelect label="Industry" value={industry} onChange={setIndustry}
          options={['EdTech', 'FinTech', 'HealthTech', 'SaaS', 'E-commerce', 'AgriTech', 'Gaming', 'Real Estate']} />
        <GenerateButton loading={loading} disabled={!idea} onClick={generate} label="Validate My Idea" loadingLabel="Analyzing with AI..." />
      </div>
      <GeminiOutput content={result} />
    </ToolShell>
  );
}
