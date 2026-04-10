'use client';
import { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import GeminiOutput from '@/components/GeminiOutput';
import ChipInput from '@/components/ChipInput';
import GenerateButton from '@/components/GenerateButton';

export default function Page() {
  const [idea, setIdea] = useState('');
  const [team, setTeam] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generate = async () => {
    if (!idea) return;
    setLoading(true); setResult('');
    const res = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `Skill gap analysis for:\nStartup: ${idea}\nCurrent Team: ${team || 'Solo founder'}\n\n## Required Skills to build and run this startup\n## Critical Gaps (hire/learn immediately)\n## Important Gaps (3-6 months)\n## Nice-to-have (can outsource)\n## Build vs Buy vs Partner decision\n## Learning Resources\n## Hiring Priority Order\n## Estimated cost to fill gaps` }) });
    const data = await res.json();
    setResult(data.result || data.error); setLoading(false);
  };

  return (
    <ToolShell icon="🎓" title="Skill Gap Analyzer" description="Find exactly what skills your team is missing and how to fill those gaps fast." badge="AI Powered">
      <div className="space-y-5">
        <ChipInput label="Your Startup Idea" value={idea} onChange={setIdea} required textarea rows={3} placeholder="Describe your startup..."
          suggestions={['AI SaaS platform for SMEs', 'EdTech with live tutoring', 'FinTech for micro-payments', 'D2C health supplement brand', 'B2B HR software']} />
        <ChipInput label="Current Team Skills" value={team} onChange={setTeam} textarea rows={2} placeholder="e.g. 2 developers (React, Node.js), 1 designer"
          suggestions={['Solo founder (non-technical)', '1 full-stack developer', '2 devs + 1 designer', 'Technical team, no sales', 'Business team, no developers']} />
        <GenerateButton loading={loading} disabled={!idea} onClick={generate} label="Analyze Skill Gaps" loadingLabel="Mapping skills..." />
      </div>
      <GeminiOutput content={result} />
    </ToolShell>
  );
}
