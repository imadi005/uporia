'use client';
import { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import GeminiOutput from '@/components/GeminiOutput';
import ChipInput from '@/components/ChipInput';
import PillSelect from '@/components/PillSelect';
import GenerateButton from '@/components/GenerateButton';

export default function Page() {
  const [idea, setIdea] = useState('');
  const [stage, setStage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generate = async () => {
    if (!idea) return;
    setLoading(true); setResult('');
    const res = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `Risk assessment for:\nBusiness: ${idea}\nStage: ${stage || 'Early Stage'}\n\n## Technical Risks\n## Market Risks\n## Financial Risks\n## Operational Risks\n## Legal & Compliance Risks\n## Competitive Risks\n## Top 5 Critical Risks (with Probability, Impact, Mitigation)\n## Early Warning Signals\n\nBe thorough and realistic.` }) });
    const data = await res.json();
    setResult(data.result || data.error); setLoading(false);
  };

  return (
    <ToolShell icon="⚠️" title="Risk Assessment Report" description="Identify every risk that could kill your startup — and how to mitigate each one." badge="AI Powered">
      <div className="space-y-5">
        <ChipInput label="Your Business" value={idea} onChange={setIdea} required textarea rows={3} placeholder="Describe your business idea and model..."
          suggestions={['AI SaaS platform for entrepreneurs', 'D2C e-commerce brand', 'EdTech subscription platform', 'FinTech payment solution', 'HealthTech telemedicine app']} />
        <PillSelect label="Business Stage" value={stage} onChange={setStage}
          options={['Idea Stage', 'MVP', 'Early Traction', 'Growth', 'Scaling']} />
        <GenerateButton loading={loading} disabled={!idea} onClick={generate} label="Generate Risk Report" loadingLabel="Assessing risks..." />
      </div>
      <GeminiOutput content={result} />
    </ToolShell>
  );
}
