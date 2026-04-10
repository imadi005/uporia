'use client';

// Key Features:
// ✅ Sidebar stays visible.
// ✅ Draft badges shown in yellow.
// ✅ Radial glow + gradient layered background.
// ✅ Responsive and smooth on hover.

import { useEffect, useState } from 'react';
import CampaignSidebar from '../CampaignSidebar';

interface Campaign {
  _id: string;
  title: string;
  subject: string;
  createdAt: string;
  status: 'draft';
}

export default function DraftCampaignsPage() {
  const [drafts, setDrafts] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const res = await fetch('/api/campaigns/drafts');
        const data = await res.json();
        setDrafts(data);
      } catch (error) {
        console.error('❌ Failed to fetch drafts:', error);
      }
    };
    fetchDrafts();
  }, []);

  return (
    <div className="relative flex h-screen overflow-hidden text-white">
      {/* 🔮 Background Layers */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0f172a] via-[#10131f] to-[#1e293b] animate-pulse opacity-[0.96]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(253,224,71,0.05),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(253,224,71,0.06),transparent_30%)]" />

      {/* Sidebar */}
      <CampaignSidebar />

      {/* Main Content */}
      <div className="relative z-10 flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">📝 Draft Campaigns</h1>
          <p className="text-gray-400 mb-6">These are your saved campaigns waiting to be finalized.</p>

          {drafts.length === 0 ? (
            <p className="text-gray-500">No drafts available.</p>
          ) : (
            <div className="space-y-4">
              {drafts.map((draft) => (
                <div
                  key={draft._id}
                  className="border border-gray-700 rounded-xl p-6 bg-gradient-to-br from-[#151515] to-[#0f0f0f] shadow-md hover:shadow-yellow-500/10 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-yellow-400 mb-1">📝 {draft.title}</h2>
                      <p className="text-gray-300">Subject: {draft.subject}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Created on: {new Date(draft.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="px-3 py-1 text-sm rounded-full font-semibold text-white bg-yellow-600 shadow-md">
                      DRAFT
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
