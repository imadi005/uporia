'use client';
import { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import GeminiOutput from '@/components/GeminiOutput';
import ChipInput from '@/components/ChipInput';
import GenerateButton from '@/components/GenerateButton';

export default function Page() {
  const [brand, setBrand] = useState('');
  const [audience, setAudience] = useState('');
  const [competitors, setCompetitors] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generate = async () => {
    if (!brand) return;
    setLoading(true); setResult('');
    const res = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `Brand positioning for:\nBrand: ${brand}\nAudience: ${audience || 'Entrepreneurs and creators'}\nCompetitors: ${competitors || 'Not specified'}\n\n## Positioning Statement\n## Unique Value Proposition\n## Brand Personality (5 traits)\n## Key Messages (3 core)\n## Tagline Options (5 options)\n## Differentiation Strategy\n## Brand Voice & Tone\n## What NOT to say` }) });
    const data = await res.json();
    setResult(data.result || data.error); setLoading(false);
  };

  return (
    <ToolShell icon="📣" title="Brand Positioning Statement" description="Craft a unique positioning strategy and taglines that make your brand impossible to ignore." badge="AI Powered">
      <div className="space-y-5">
        <ChipInput label="Brand Name" value={brand} onChange={setBrand} required placeholder="e.g. Uporia"
          suggestions={['Uporia', 'VentureLab', 'GrowthOS', 'NovaMind', 'BizPilot']} />
        <ChipInput label="Target Audience" value={audience} onChange={setAudience} placeholder="e.g. First-time founders in India under 30"
          suggestions={['First-time founders India', 'Women entrepreneurs', 'College students building startups', 'SME owners going digital', 'Freelancers monetizing skills']} />
        <ChipInput label="Main Competitors" value={competitors} onChange={setCompetitors} placeholder="e.g. Kajabi, Teachable, Wix"
          suggestions={['Kajabi, Teachable', 'Notion, Monday.com', 'Canva, Adobe', 'Shopify, WooCommerce', 'HubSpot, Mailchimp']} />
        <GenerateButton loading={loading} disabled={!brand} onClick={generate} label="Generate Positioning" loadingLabel="Crafting identity..." />
      </div>
      <GeminiOutput content={result} />
    </ToolShell>
  );
}
