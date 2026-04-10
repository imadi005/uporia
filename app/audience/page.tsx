'use client';
import { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import GeminiOutput from '@/components/GeminiOutput';
import ChipInput from '@/components/ChipInput';
import GenerateButton from '@/components/GenerateButton';

export default function Page() {
  const [product, setProduct] = useState('');
  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generate = async () => {
    if (!product) return;
    setLoading(true); setResult('');
    const res = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `Define the Ideal Customer Profile for:\nProduct: ${product}\nProblem it solves: ${problem || 'Not specified'}\n\n## Primary ICP (Demographics, Psychographics, Pain Points, Goals, Online Behavior)\n## Secondary Audience\n## 3 Audience Segments\n## How to Reach Them\n## Messaging That Resonates\n\nBe very specific.` }) });
    const data = await res.json();
    setResult(data.result || data.error); setLoading(false);
  };

  return (
    <ToolShell icon="🎯" title="Target Audience Finder" description="Get a deep ICP analysis and audience segmentation so you know exactly who to target." badge="AI Powered">
      <div className="space-y-5">
        <ChipInput label="Your Product / Service" value={product} onChange={setProduct} required placeholder="e.g. Online fitness coaching app for busy professionals"
          suggestions={['Fitness coaching app', 'AI resume builder', 'SaaS for restaurants', 'Online tutoring platform', 'Personal finance app']} />
        <ChipInput label="Problem it Solves" value={problem} onChange={setProblem} placeholder="e.g. People struggle to stay consistent with workouts"
          suggestions={['Lack of time for fitness', 'Expensive professional services', 'Information overload', 'Poor work-life balance', 'Limited access to quality education']} />
        <GenerateButton loading={loading} disabled={!product} onClick={generate} label="Find My Audience" loadingLabel="Profiling audience..." />
      </div>
      <GeminiOutput content={result} />
    </ToolShell>
  );
}
