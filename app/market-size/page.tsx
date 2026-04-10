'use client';
import { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import GeminiOutput from '@/components/GeminiOutput';
import ChipInput from '@/components/ChipInput';
import PillSelect from '@/components/PillSelect';
import GenerateButton from '@/components/GenerateButton';

export default function Page() {
  const [product, setProduct] = useState('');
  const [geography, setGeography] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generate = async () => {
    if (!product) return;
    setLoading(true); setResult('');
    const res = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `Market size estimation for:\nProduct/Industry: ${product}\nGeography: ${geography || 'India + Global'}\n\n## TAM (Total Addressable Market) with INR/USD value\n## SAM (Serviceable Addressable Market)\n## SOM (Serviceable Obtainable Market)\n## Market Growth Rate (CAGR)\n## Key Market Drivers\n## Trends for next 5 years\n## Biggest players and market share\n## Realistic capture potential\n\nUse realistic numbers with clear assumptions.` }) });
    const data = await res.json();
    setResult(data.result || data.error); setLoading(false);
  };

  return (
    <ToolShell icon="🌍" title="Market Size Estimator" description="Get TAM, SAM, and SOM estimates with growth rates and market trend analysis." badge="AI Powered">
      <div className="space-y-5">
        <ChipInput label="Product / Industry" value={product} onChange={setProduct} required placeholder="e.g. AI tools for small businesses"
          suggestions={['AI tools for SMEs', 'EdTech India', 'HealthTech telemedicine', 'FinTech payments India', 'E-commerce D2C brands', 'SaaS for startups']} />
        <PillSelect label="Target Geography" value={geography} onChange={setGeography}
          options={['India', 'Southeast Asia', 'India + SEA', 'Global', 'USA', 'Europe']} />
        <GenerateButton loading={loading} disabled={!product} onClick={generate} label="Estimate Market Size" loadingLabel="Calculating TAM/SAM/SOM..." />
      </div>
      <GeminiOutput content={result} />
    </ToolShell>
  );
}
