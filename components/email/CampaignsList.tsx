'use client';
import { useEffect, useState } from 'react';

const statusColors: Record<string, string> = {
  Sent: 'bg-green-500/10 text-green-300 border border-green-500/30',
  Scheduled: 'bg-blue-500/10 text-blue-300 border border-blue-500/30',
  Draft: 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/30',
};

export default function CampaignsList() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: 'Welcome Email Series',
      status: 'Sent',
      date: '2025-04-15',
    },
    {
      id: 2,
      title: 'April Promo Blast',
      status: 'Scheduled',
      date: '2025-04-21',
    },
    {
      id: 3,
      title: 'Re-Engagement Email',
      status: 'Draft',
      date: '—',
    },
  ]);

  return (
    <div className="bg-gradient-to-br from-[#131313] via-[#1a1a1a] to-[#121212] p-6 rounded-2xl shadow-xl border border-gray-700/30 backdrop-blur-sm">
      <h3 className="text-2xl font-semibold text-white mb-6">📋 Your Campaigns</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-xs uppercase border-b border-gray-700">
              <th className="pb-3">Title</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Scheduled/Sent Date</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr
                key={c.id}
                className="group border-b border-gray-800 hover:bg-gray-800/40 transition-all"
              >
                <td className="py-4 font-medium text-white">{c.title}</td>

                <td className="py-4">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[c.status]}`}
                  >
                    {c.status}
                  </span>
                </td>

                <td className="py-4 text-gray-300">{c.date}</td>

                <td className="py-4 space-x-4">
                  <button className="text-purple-400 text-sm hover:underline underline-offset-2 transition">
                    View
                  </button>
                  <button className="text-red-400 text-sm hover:underline underline-offset-2 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
