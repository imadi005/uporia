'use client';
import { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import GeminiOutput from '@/components/GeminiOutput';
import PillSelect from '@/components/PillSelect';
import ChipInput from '@/components/ChipInput';
import GenerateButton from '@/components/GenerateButton';

export default function Page() {
  const [bizType, setBizType] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generate = async () => {
    if (!bizType) return;
    setLoading(true); setResult('');
    const res = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `Startup legal checklist for:\nBusiness Type: ${bizType}\nCountry: ${country || 'India'}\n\n## Company Registration Steps\n## Required Licenses & Permits\n## Tax Registrations (GST, PAN, TAN)\n## Intellectual Property (Trademark, Patent)\n## Essential Legal Documents\n## Data Privacy Compliance\n## Banking Setup\n## Estimated costs\n## Timeline\n\nMake it actionable with specific steps.` }) });
    const data = await res.json();
    setResult(data.result || data.error); setLoading(false);
  };

  return (
    <ToolShell icon="🧾" title="Startup Legal Checklist" description="Every legal step to properly launch your startup — compliance, registration, IP protection." badge="AI Powered">
      <div className="space-y-5">
        <PillSelect label="Business Type" value={bizType} onChange={setBizType}
          options={['SaaS / Tech', 'E-commerce', 'EdTech', 'HealthTech', 'FinTech', 'Agency', 'Mobile App', 'Physical Product']} />
        <PillSelect label="Country" value={country} onChange={setCountry}
          options={['India', 'USA', 'UK', 'Singapore', 'UAE', 'Canada']} />
        <GenerateButton loading={loading} disabled={!bizType} onClick={generate} label="Generate Legal Checklist" loadingLabel="Building checklist..." />
      </div>
      <GeminiOutput content={result} />
    </ToolShell>
  );
}
