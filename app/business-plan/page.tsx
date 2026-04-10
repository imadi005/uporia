'use client';
import { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import GeminiOutput from '@/components/GeminiOutput';
import ChipInput from '@/components/ChipInput';
import PillSelect from '@/components/PillSelect';
import GenerateButton from '@/components/GenerateButton';

export default function Page() {
  const [name, setName] = useState('');
  const [idea, setIdea] = useState('');
  const [industry, setIndustry] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generate = async () => {
    if (!name || !idea) return;
    setLoading(true); setResult('');
    const res = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `Write a business plan for:\nBusiness: ${name}\nIdea: ${idea}\nIndustry: ${industry || 'General'}\n\n## Executive Summary\n## Business Description\n## Market Analysis\n## Products/Services\n## Marketing & Sales Strategy\n## Operations Plan\n## Financial Projections (Year 1-3)\n## Funding Requirements\n## Risk Analysis\n\nKeep it practical and investor-friendly.` }) });
    const data = await res.json();
    setResult(data.result || data.error); setLoading(false);
  };

  return (
    <ToolShell icon="💼" title="Business Plan Writer" description="Generate a complete, structured business plan with financials in seconds." badge="AI Powered">
      <div className="space-y-5">
        <ChipInput label="Business Name" value={name} onChange={setName} required placeholder="e.g. Uporia"
          suggestions={['Uporia', 'VentureLab', 'GrowthOS', 'BizPilot', 'StartSmart']} />
        <ChipInput label="Business Idea" value={idea} onChange={setIdea} required textarea rows={3} placeholder="Describe what your business does..."
          suggestions={['AI-powered tools platform for entrepreneurs', 'Online marketplace connecting freelancers with businesses', 'EdTech platform for skill-based learning', 'SaaS for automating small business operations']} />
        <PillSelect label="Industry" value={industry} onChange={setIndustry}
          options={['SaaS', 'EdTech', 'FinTech', 'HealthTech', 'E-commerce', 'AgriTech', 'Retail', 'Media']} />
        <GenerateButton loading={loading} disabled={!name || !idea} onClick={generate} label="Generate Business Plan" loadingLabel="Writing plan..." />
      </div>
      <GeminiOutput content={result} />
    </ToolShell>
  );
}
