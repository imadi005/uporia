'use client';

import { useEffect, useState } from 'react';
import CampaignSidebar from '../CampaignSidebar';;

interface Campaign {
  _id: string;
  title: string;
  subject: string;
  sentAt: string;
  status: 'sent' | 'scheduled' | 'draft';
}

export default function ScheduledCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/campaigns/scheduled');
        const data = await res.json();
        setCampaigns(data);
      } catch (error) {
        console.error('❌ Failed to fetch scheduled campaigns:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative flex h-screen overflow-hidden text-white">
      {/* 🔮 Background Effects */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0f172a] via-[#10131f] to-[#1e293b] animate-pulse opacity-[0.96]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(59,130,246,0.07),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.08),transparent_30%)]" />

      {/* Sidebar */}
      <CampaignSidebar />

      {/* Main Content */}
      <div className="relative z-10 flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">⏳ Scheduled Campaigns</h1>
          <p className="text-gray-400 mb-6">
            These emails are lined up to be sent in the future.
          </p>

          {campaigns.length === 0 ? (
            <p className="text-gray-500">No scheduled campaigns found.</p>
          ) : (
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div
                  key={campaign._id}
                  className="border border-gray-700 rounded-xl p-6 bg-gradient-to-br from-[#151515] to-[#0f0f0f] shadow-md hover:shadow-blue-500/10 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-blue-400 mb-1">📅 {campaign.title}</h2>
                      <p className="text-gray-300">Subject: {campaign.subject}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Scheduled for: {new Date(campaign.sentAt).toLocaleString()}
                      </p>
                    </div>
                    <span className="px-3 py-1 text-sm rounded-full font-semibold text-white bg-blue-600 shadow-md">
                      {campaign.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
