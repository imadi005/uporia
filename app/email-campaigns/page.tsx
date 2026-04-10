'use client';

import CampaignSidebar from './CampaignSidebar';
import CreateCampaignForm from './CreateCampaignForm';
import CampaignsList from './CampaignsList';

export default function EmailCampaignsPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-white">
      {/* 🌀 Animated background gradient */}
      <div className="absolute inset-0 z-0 animate-gradient bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] opacity-60 blur-2xl" />

      {/* ✨ Optional star pattern layer */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#2d2d2d_1px,transparent_1px)] bg-[size:20px_20px] opacity-10" />

      {/* 🌐 Main UI content */}
      <div className="relative z-10 flex">
        {/* Sidebar */}
        <CampaignSidebar />

        {/* Main Content */}
        <div className="flex-1 px-6 py-10 overflow-y-auto max-h-screen">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 drop-shadow-md">📧 Email Campaigns</h1>

            <CreateCampaignForm />
            <CampaignsList />
          </div>
        </div>
      </div>
    </div>
  );
}
