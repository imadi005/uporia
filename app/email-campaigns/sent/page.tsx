'use client';

/**
 * ✅ Sent Campaigns Page – Premium UI Implementation
 *
 * 🔧 Features Implemented:
 * - Sidebar: Persistently visible using <CampaignSidebar />
 * - Background: Gradient + radial glow layered aesthetic
 * - Scrollable list of campaigns with smooth custom scrollbar
 * - Search bar with live filter on campaign title/subject
 * - Cards: Animated hover, shadowed, gradient backgrounds
 * - Badge: Green "SENT" label for status
 * - Pagination with active state highlighting
 * - Responsive design & consistent theming with all campaign views
 * - Live loading from /api/campaigns/sent
 */

import { useEffect, useState } from 'react';
import CampaignSidebar from '../CampaignSidebar';

interface Campaign {
  _id: string;
  title: string;
  subject: string;
  sentAt: string;
  status: 'sent' | 'scheduled' | 'draft';
}

export default function SentCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filtered, setFiltered] = useState<Campaign[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/campaigns/sent');
        const data = await res.json();
        setCampaigns(data);
        setFiltered(data);
      } catch (error) {
        console.error('❌ Failed to fetch campaigns:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFiltered(
      campaigns.filter((c) =>
        c.title.toLowerCase().includes(value) ||
        c.subject.toLowerCase().includes(value)
      )
    );
    setPage(1);
  };

  const paginated = filtered.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filtered.length / limit);

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
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">📤 Sent Campaigns</h1>
          <p className="text-gray-400 mb-6">
            Track your outgoing email campaigns with filters, badges, and pages.
          </p>

          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="🔍 Search title or subject..."
            className="w-full mb-6 p-3 bg-[#1e293b] text-white rounded-lg border border-gray-600 focus:outline-none"
          />

          {paginated.length === 0 ? (
            <p className="text-gray-500">No matching campaigns found.</p>
          ) : (
            <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent">
              {paginated.map((campaign) => (
                <div
                  key={campaign._id}
                  className="border border-gray-700 rounded-xl p-6 bg-gradient-to-br from-[#151515] to-[#0f0f0f] shadow-md hover:shadow-purple-500/10 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-purple-400 mb-1">🎯 {campaign.title}</h2>
                      <p className="text-gray-300">Subject: {campaign.subject}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Sent on: {new Date(campaign.sentAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="px-3 py-1 text-sm rounded-full font-semibold text-white bg-green-600 shadow-md">
                      {campaign.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-3">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                    page === i + 1
                      ? 'bg-purple-600 border-purple-500 text-white'
                      : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
