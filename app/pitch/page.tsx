'use client';
import { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import GeminiOutput from '@/components/GeminiOutput';
import ChipInput from '@/components/ChipInput';
import GenerateButton from '@/components/GenerateButton';

export default function Page() {
  const [name, setName] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generate = async () => {
    if (!name || !problem) return;
    setLoading(true); setResult('');
    const res = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `Investor pitch deck script for:\nStartup: ${name}\nProblem: ${problem}\nSolution: ${solution || 'Not specified'}\n\n## Slide 1: Hook / Opening\n## Slide 2: The Problem\n## Slide 3: The Solution\n## Slide 4: Market Size (TAM/SAM/SOM)\n## Slide 5: Product Demo Script\n## Slide 6: Business Model\n## Slide 7: Traction / Milestones\n## Slide 8: Team\n## Slide 9: The Ask\n## Slide 10: Vision / Closing\n\nMake it compelling and VC-ready.` }) });
    const data = await res.json();
    setResult(data.result || data.error); setLoading(false);
  };

  return (
    <ToolShell icon="🚀" title="Pitch Deck Script" description="Generate a full investor-ready pitch deck script, slide by slide, in seconds." badge="AI Powered">
      <div className="space-y-5">
        <ChipInput label="Startup Name" value={name} onChange={setName} required placeholder="e.g. Uporia"
          suggestions={['Uporia', 'Vyapaar', 'NovaMind', 'GrowthOS', 'LaunchPad India']} />
        <ChipInput label="Problem You Solve" value={problem} onChange={setProblem} required textarea rows={2} placeholder="What painful problem does your startup solve?"
          suggestions={['Fragmented business tools costing SMEs time and money', 'Students lacking access to quality mentorship', 'Freelancers struggling to find high-paying clients', 'Small businesses losing to poor online presence']} />
        <ChipInput label="Your Solution" value={solution} onChange={setSolution} textarea rows={2} placeholder="How does your product solve this?"
          suggestions={['One unified AI platform replacing 10 tools', 'AI-powered matching connecting right people', 'Mobile-first affordable solution for tier-2 cities']} />
        <GenerateButton loading={loading} disabled={!name || !problem} onClick={generate} label="Generate Pitch Script" loadingLabel="Writing investor pitch..." />
      </div>
      <GeminiOutput content={result} />
    </ToolShell>
  );
}
