'use client';
import { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import GeminiOutput from '@/components/GeminiOutput';
import ChipInput from '@/components/ChipInput';
import GenerateButton from '@/components/GenerateButton';

export default function Page() {
  const [appIdea, setAppIdea] = useState('');
  const [users, setUsers] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generate = async () => {
    if (!appIdea) return;
    setLoading(true); setResult('');
    const res = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `Product Requirements Document for:\nApp Idea: ${appIdea}\nTarget Users: ${users || 'General users'}\n\n## 1. Product Overview\n## 2. Problem Statement\n## 3. Goals & Success Metrics\n## 4. User Personas\n## 5. User Stories\n## 6. Core Features & Requirements\n## 7. Technical Requirements\n## 8. UI/UX Requirements\n## 9. Non-Functional Requirements\n## 10. Out of Scope\n## 11. Timeline\n\nBe specific and developer-friendly.` }) });
    const data = await res.json();
    setResult(data.result || data.error); setLoading(false);
  };

  return (
    <ToolShell icon="📱" title="App Idea to PRD" description="Convert your app idea into a developer-ready Product Requirements Document instantly." badge="AI Powered">
      <div className="space-y-5">
        <ChipInput label="Your App Idea" value={appIdea} onChange={setAppIdea} required textarea rows={4} placeholder="Describe your app idea in detail — what it does, key features..."
          suggestions={['AI career advisor for students', 'Hyperlocal service marketplace', 'Social learning platform for coders', 'Mental health journaling app with AI insights', 'B2B invoice management with AI']} />
        <ChipInput label="Target Users" value={users} onChange={setUsers} placeholder="e.g. College students, Small business owners"
          suggestions={['College students 18-25', 'Working professionals 25-40', 'Small business owners', 'Freelancers & creators', 'Enterprise employees']} />
        <GenerateButton loading={loading} disabled={!appIdea} onClick={generate} label="Generate PRD" loadingLabel="Writing PRD..." />
      </div>
      <GeminiOutput content={result} />
    </ToolShell>
  );
}
