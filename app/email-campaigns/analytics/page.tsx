'use client';

import { useEffect, useState } from 'react';
import CampaignSidebar from '../CampaignSidebar';

interface AnalyticsData {
  total: number;
  sent: number;
  scheduled: number;
  draft: number;
  recent: { _id: string; count: number }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await fetch('/api/campaigns/analytics');
      const result = await res.json();
      setData(result);
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="relative flex h-screen overflow-hidden text-white">
      {/* 🔮 Background Layers */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0f172a] via-[#10131f] to-[#1e293b] animate-pulse opacity-[0.96]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.05),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.06),transparent_30%)]" />

      {/* Sidebar */}
      <CampaignSidebar />

      {/* Main Content */}
      <div className="relative z-10 flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">📊 Campaign Analytics</h1>

          {!data ? (
            <p>Loading analytics...</p>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <StatBox label="Total" value={data.total} color="gray" />
                <StatBox label="Sent" value={data.sent} color="green" />
                <StatBox label="Scheduled" value={data.scheduled} color="blue" />
                <StatBox label="Drafts" value={data.draft} color="yellow" />
              </div>

              <div className="mt-10">
                <h2 className="text-xl font-semibold mb-2 text-purple-400">📅 Sent Campaigns (Last 7 Days)</h2>
                <div className="space-y-2">
                  {data.recent.map((entry) => (
                    <div key={entry._id} className="flex justify-between bg-[#1e1f23] p-3 rounded-md border border-gray-700">
                      <span>{entry._id}</span>
                      <span className="font-bold text-purple-300">{entry.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, color }: { label: string; value: number; color: string }) {
  const bgMap: any = {
    gray: 'bg-gray-800/80 backdrop-blur-md',
    green: 'bg-green-700/80 backdrop-blur-md border-green-500',
    blue: 'bg-blue-700/80 backdrop-blur-md border-blue-500',
    yellow: 'bg-yellow-500/80 backdrop-blur-md border-yellow-500 text-black',
  };

  return (
    <div className={`rounded-xl p-6 text-center shadow-lg border ${bgMap[color]}`}> 
      <p className="text-sm uppercase text-white/70 tracking-wide mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
