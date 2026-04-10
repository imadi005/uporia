'use client';

import Link from 'next/link';

const sections = [
  {
    title: 'Home + Landing Pages',
    subtitle: 'Create, market and engage users',
    paragraph:
      'Build bold storefronts and launch high-converting campaigns in one place. Perfect for grabbing attention and driving actions.',
    features: [
      'Live product highlights',
      'Engaging hero section',
      'High-converting CTA',
      'Social proof integration',
    ],
    href: '/storefront/landing',
  },
  {
    title: 'Store + Checkout Pages',
    subtitle: 'Drive seamless shopping experience',
    paragraph:
      'From product showcase to final checkout, create smooth, secure, and mobile-optimized experiences built for conversions.',
    features: [
      'Performance-optimized layout',
      '1-click purchase flow',
      'Secure & mobile-ready',
      'Abandonment recovery tools',
    ],
    href: '/storefront/home',
  },
];

export default function StorefrontDashboard() {
  return (
    <div className="relative min-h-screen text-white font-sans bg-black px-6 py-20 overflow-x-hidden">
      {/* 🔳 Animated Background */}
      <div className="absolute inset-0 -z-10 bg-black bg-[radial-gradient(circle_at_30%_50%,_#222_0%,_#000_100%)] animate-pulse" />

      <div className="max-w-5xl mx-auto space-y-16">
        {/* 🛍️ Title */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-white tracking-tight">🛍️ Storefront Dashboard</h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Build, manage and scale your digital storefront with ease. From marketing to checkout, deliver stunning,
            high-performing commerce in minutes.
          </p>
        </div>

        {/* 🧱 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {sections.map((sec, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-800 bg-[#111] hover:bg-[#1a1a1a] p-6 space-y-4 transition-all duration-300 shadow-lg group"
            >
              <div>
                <h2 className="text-xl font-semibold text-white">{sec.title}</h2>
                <p className="text-sm text-gray-400">{sec.subtitle}</p>
              </div>

              <ul className="text-sm text-gray-300 space-y-1 font-mono">
                {sec.features.map((feat, j) => (
                  <li key={j} className="flex gap-2 items-start">
                    <span className="text-green-500 mt-[2px]">✓</span> {feat}
                  </li>
                ))}
              </ul>

              <p className="text-gray-400 text-sm leading-relaxed">{sec.paragraph}</p>

              <Link
                href={sec.href}
                className="inline-block mt-2 px-4 py-2 text-sm font-medium border border-white/10 text-white bg-white/5 hover:bg-white/10 rounded-md transition-all"
              >
                Open →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
