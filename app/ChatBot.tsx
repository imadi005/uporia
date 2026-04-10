'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const keywordMap = {
  website: [
    { label: 'Website Builder', route: '/website' },
    { label: 'Landing Pages', route: '/storefront/landing' },
  ],
  email: [
    { label: 'Email Campaigns', route: '/email-campaigns' },
    { label: 'Newsletter Tool', route: '/newsletter' },
  ],
  course: [
    { label: 'Recorded Courses', route: '/courses' },
    { label: 'Live Classes', route: '/live-classes' },
  ],
  logo: [
    { label: 'Logo Generator', route: '/logo-maker' },
  ],
  crm: [
    { label: 'CRM Dashboard', route: '/crm' },
    { label: 'Leads Manager', route: '/crm/leads' },
  ],
};

export default function KeywordBot({ initialMessage }: { initialMessage?: string }) {
  const [input, setInput] = useState(initialMessage || '');
  const [matches, setMatches] = useState<any[]>([]);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().trim();
    setInput(value);

    const matched = Object.keys(keywordMap).filter(key =>
      value && key.includes(value)
    );

    if (matched.length > 0) {
      const allOptions = matched.flatMap(key => keywordMap[key]);
      setMatches(allOptions);
    } else {
      setMatches([]);
    }
  };

  const handleSelect = (route: string) => {
    router.push(route);
    setInput('');
    setMatches([]);
  };

  return (
    <div className="flex flex-col items-center mt-16 space-y-4 z-10">
      <p className="text-white text-xl font-mono">ASK UPORIA</p>

      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="What would you like to create?"
        className="w-96 px-5 py-3 rounded-lg bg-[#0f0f0f] border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
      />

      {matches.length > 0 && (
        <div className="bg-[#1a1a1a] text-white w-96 rounded-md shadow-lg border border-neutral-700">
          {matches.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelect(item.route)}
              className="px-4 py-2 hover:bg-[#333] cursor-pointer border-b border-neutral-800 last:border-none"
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
