'use client';
import { useState } from 'react';
import ToolShell from '@/components/ToolShell';
import GeminiOutput from '@/components/GeminiOutput';
import ChipInput from '@/components/ChipInput';
import GenerateButton from '@/components/GenerateButton';

export default function Page() {
  const [product, setProduct] = useState('');
  const [features, setFeatures] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generate = async () => {
    if (!product) return;
    setLoading(true); setResult('');
    const res = await fetch('/api/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `Prioritize MVP using MoSCoW framework:\nProduct: ${product}\nFeatures: ${features || 'Generate typical features for this product'}\n\n## Must-Have (launch without these = failure)\n## Should-Have (important but can wait)\n## Nice-to-Have (Version 2.0)\n## Kill List (don't build for MVP)\n## MVP Definition\n## Time Estimate\n## Technical Complexity` }) });
    const data = await res.json();
    setResult(data.result || data.error); setLoading(false);
  };

  return (
    <ToolShell icon="📦" title="MVP Feature Prioritizer" description="Use the MoSCoW framework to ruthlessly prioritize what to build first." badge="AI Powered">
      <div className="space-y-5">
        <ChipInput label="Your Product" value={product} onChange={setProduct} required placeholder="e.g. AI-powered resume builder for freshers"
          suggestions={['AI resume builder', 'Freelance marketplace', 'Learning management system', 'Restaurant POS app', 'Healthcare appointment platform']} />
        <ChipInput label="Feature List (comma-separated)" value={features} onChange={setFeatures} textarea rows={3} placeholder="e.g. User login, AI scan, PDF export, dashboard, notifications..."
          suggestions={['User auth + profiles', 'Core AI feature', 'Dashboard + analytics', 'Payment integration', 'Email notifications', 'Mobile responsive', 'Admin panel', 'Third-party integrations']} />
        <GenerateButton loading={loading} disabled={!product} onClick={generate} label="Prioritize MVP Features" loadingLabel="Applying MoSCoW..." />
      </div>
      <GeminiOutput content={result} />
    </ToolShell>
  );
}
