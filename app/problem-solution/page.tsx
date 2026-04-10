'use client';
import { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import GeminiOutput from '@/components/GeminiOutput';
import ChipInput from '@/components/ChipInput';
import GenerateButton from '@/components/GenerateButton';

export default function Page() {
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generate = async () => {
    if (!problem || !solution) return;
    setLoading(true); setResult('');
    const res = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `Analyze Problem-Solution Fit:\nProblem: ${problem}\nSolution: ${solution}\n\n## Problem Validity Score (X/10)\n## Is this a real painful problem?\n## Solution Fit Analysis\n## Gaps in the solution\n## Alternative approaches\n## Customer Discovery Questions\n## Pivot Suggestions\n## Overall Fit Score (X/10)\n\nBe honest and critical.` }) });
    const data = await res.json();
    setResult(data.result || data.error); setLoading(false);
  };

  return (
    <ToolShell icon="💡" title="Problem-Solution Fit" description="Validate if your solution truly addresses the problem before wasting months building." badge="AI Powered">
      <div className="space-y-5">
        <ChipInput label="The Problem" value={problem} onChange={setProblem} required textarea rows={2} placeholder="Describe the problem: who faces it, how often, how painful?"
          suggestions={['Entrepreneurs waste time on fragmented tools', 'Students lack personalized learning paths', 'SMEs lose customers due to poor online presence', 'Freelancers struggle with inconsistent income']} />
        <ChipInput label="Your Proposed Solution" value={solution} onChange={setSolution} required textarea rows={2} placeholder="How does your product solve this?"
          suggestions={['One unified AI platform', 'AI-powered personalization engine', 'Done-for-you website builder', 'Smart client matching algorithm']} />
        <GenerateButton loading={loading} disabled={!problem || !solution} onClick={generate} label="Check Problem-Solution Fit" loadingLabel="Validating fit..." />
      </div>
      <GeminiOutput content={result} />
    </ToolShell>
  );
}
