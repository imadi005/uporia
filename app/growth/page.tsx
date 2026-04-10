'use client';
import { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import GeminiOutput from '@/components/GeminiOutput';
import ChipInput from '@/components/ChipInput';
import PillSelect from '@/components/PillSelect';
import GenerateButton from '@/components/GenerateButton';

export default function Page() {
  const [product, setProduct] = useState('');
  const [users, setUsers] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generate = async () => {
    if (!product) return;
    setLoading(true); setResult('');
    const res = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `30-day growth hacking playbook for:\nProduct: ${product}\nCurrent Stage: ${users || 'Just launched, 0 users'}\n\n## Week 1: Foundation (Days 1-7)\n## Week 2: Traction (Days 8-14)\n## Week 3: Amplify (Days 15-21)\n## Week 4: Scale (Days 22-30)\n## Top 10 Growth Hacks\n## Daily Metrics to Track\n## Tools Needed\n## Expected outcomes by Day 30\n\nMake every tactic specific, low-cost, and actionable.` }) });
    const data = await res.json();
    setResult(data.result || data.error); setLoading(false);
  };

  return (
    <ToolShell icon="📈" title="Growth Hacking Playbook" description="Get a 30-day daily action plan with specific tactics to go from 0 to traction." badge="AI Powered">
      <div className="space-y-5">
        <ChipInput label="Your Product" value={product} onChange={setProduct} required placeholder="e.g. AI resume builder for freshers"
          suggestions={['AI resume builder', 'SaaS productivity tool', 'Consumer mobile app', 'Online marketplace', 'EdTech platform']} />
        <PillSelect label="Current Stage" value={users} onChange={setUsers}
          options={['0 users', '1–50 users', '50–500 users', '500–5K users', '5K+ users']} />
        <GenerateButton loading={loading} disabled={!product} onClick={generate} label="Generate Growth Playbook" loadingLabel="Planning 30 days..." />
      </div>
      <GeminiOutput content={result} />
    </ToolShell>
  );
}
