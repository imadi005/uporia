'use client';
import { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import GeminiOutput from '@/components/GeminiOutput';
import ChipInput from '@/components/ChipInput';
import PillSelect from '@/components/PillSelect';
import GenerateButton from '@/components/GenerateButton';

export default function Page() {
  const [biz, setBiz] = useState('');
  const [stage, setStage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generate = async () => {
    if (!biz) return;
    setLoading(true); setResult('');
    const res = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `Revenue strategy for:\nBusiness: ${biz}\nStage: ${stage || 'Early Stage'}\n\n## Recommended Primary Revenue Model\n## Alternative Revenue Streams (3 options)\n## Pricing Strategy\n## Revenue Projections (Year 1, 2, 3)\n## Implementation Steps\n\nBe specific with numbers and examples.` }) });
    const data = await res.json();
    setResult(data.result || data.error); setLoading(false);
  };

  return (
    <ToolShell icon="💰" title="Revenue Model Builder" description="Discover the best monetization strategy for your business with AI-backed projections." badge="AI Powered">
      <div className="space-y-5">
        <ChipInput label="Your Business" value={biz} onChange={setBiz} required textarea rows={3} placeholder="Describe what your business does and who it serves..."
          suggestions={['AI SaaS tool for developers', 'Online learning platform', 'B2B software for SMEs', 'Consumer mobile app', 'E-commerce marketplace']} />
        <PillSelect label="Business Stage" value={stage} onChange={setStage}
          options={['Idea Stage', 'MVP Built', 'Early Traction', 'Growth Stage', 'Scaling']} />
        <GenerateButton loading={loading} disabled={!biz} onClick={generate} label="Build Revenue Model" loadingLabel="Modeling revenue..." />
      </div>
      <GeminiOutput content={result} />
    </ToolShell>
  );
}
