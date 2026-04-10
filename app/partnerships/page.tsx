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
      body: JSON.stringify({ prompt: `Partnership opportunities for:\nBusiness: ${biz}\nStage: ${stage || 'Early Stage'}\n\n## Tier 1 - Strategic Partners (High impact, with specific company examples)\n## Tier 2 - Distribution Partners\n## Tier 3 - Technology Partners\n## Tier 4 - Community Partners\n## Partnership Outreach Template\n## What to offer each type\n## Red Flags to avoid\n## First 3 to pursue immediately` }) });
    const data = await res.json();
    setResult(data.result || data.error); setLoading(false);
  };

  return (
    <ToolShell icon="🤝" title="Partnership Finder" description="Discover ideal B2B and strategic partners with outreach templates to accelerate growth." badge="AI Powered">
      <div className="space-y-5">
        <ChipInput label="Your Business" value={biz} onChange={setBiz} required textarea rows={2} placeholder="What does your business do? Who are your customers?"
          suggestions={['AI SaaS for small businesses', 'EdTech platform for students', 'Creator economy tools', 'HealthTech for clinics', 'B2B marketplace']} />
        <PillSelect label="Business Stage" value={stage} onChange={setStage}
          options={['Pre-launch', 'Just Launched', 'Early Traction', 'Growing', 'Scaling']} />
        <GenerateButton loading={loading} disabled={!biz} onClick={generate} label="Find Partners" loadingLabel="Mapping partnerships..." />
      </div>
      <GeminiOutput content={result} />
    </ToolShell>
  );
}
