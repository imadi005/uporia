'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: '📨 New Campaign', href: '/email-campaigns' },
  { label: '📤 Sent Campaigns', href: '/email-campaigns/sent' },
  { label: '⏳ Scheduled', href: '/email-campaigns/scheduled' },
  { label: '📝 Drafts', href: '/email-campaigns/drafts' },
  { label: '📊 Analytics', href: '/email-campaigns/analytics' },
];

export default function CampaignSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 min-h-screen bg-[#0b0b0b] border-r border-gray-800 p-6 text-white sticky top-0 shadow-xl">
      <h2 className="text-2xl font-bold mb-8 tracking-wide text-white/90">
        📧 Uporia Mail
      </h2>

      <ul className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-5 py-3 rounded-lg font-medium transition-all duration-200 tracking-wide text-sm ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
