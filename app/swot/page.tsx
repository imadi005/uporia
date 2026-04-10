'use client';
import { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import GeminiOutput from '@/components/GeminiOutput';
import ChipInput from '@/components/ChipInput';
import GenerateButton from '@/components/GenerateButton';

export default function Page() {
  const [competitor, setCompetitor] = useState('');
  const [yourProduct, setYourProduct] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generate = async () => {
    if (!competitor) return;
    setLoading(true); setResult('');
    const res = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `SWOT analysis of "${competitor}" as competitor.\nMy product: ${yourProduct || 'Not specified'}\n\n## Strengths of ${competitor}\n## Weaknesses of ${competitor}\n## Opportunities for me to exploit\n## Threats to be aware of\n## Competitive Gaps (where I can win)\n## Differentiation Strategy\n\nBe strategic and specific.` }) });
    const data = await res.json();
    setResult(data.result || data.error); setLoading(false);
  };

  return (
    <ToolShell icon="📊" title="Competitor SWOT Analysis" description="Analyze any competitor in depth and find the exact gaps you can exploit to win." badge="AI Powered">
      <div className="space-y-5">
        <ChipInput label="Competitor Name" value={competitor} onChange={setCompetitor} required placeholder="e.g. Notion, Canva, Shopify, Kajabi"
          suggestions={['Notion', 'Canva', 'Shopify', 'Kajabi', 'Teachable', 'Mailchimp', 'HubSpot', 'Wix']} />
        <ChipInput label="Your Product (optional)" value={yourProduct} onChange={setYourProduct} placeholder="e.g. AI-powered business tool for Indian SMEs"
          suggestions={['AI business tool for SMEs', 'All-in-one creator platform', 'Budget-friendly SaaS', 'Mobile-first solution', 'Vernacular language platform']} />
        <GenerateButton loading={loading} disabled={!competitor} onClick={generate} label="Run SWOT Analysis" loadingLabel="Analyzing competitor..." />
      </div>
      <GeminiOutput content={result} />
    </ToolShell>
  );
}
