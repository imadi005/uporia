'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';

const ALL_TOOLS = [
  // Launch
  { icon: '🧠', title: 'Idea Validator', desc: 'Get a brutal AI score on your business idea before investing a rupee.', link: '/validate', group: 'Launch', hot: true },
  { icon: '💡', title: 'Problem-Solution Fit', desc: 'Validate whether your solution truly solves the problem.', link: '/problem-solution', group: 'Launch' },
  { icon: '🚀', title: 'Pitch Deck Script', desc: 'Full investor-ready pitch, slide by slide, in seconds.', link: '/pitch', group: 'Launch', hot: true },
  { icon: '💼', title: 'Business Plan Writer', desc: 'Complete business plan with financials — no MBA needed.', link: '/business-plan', group: 'Launch' },
  { icon: '📣', title: 'Brand Positioning', desc: 'Craft your UVP, taglines, and brand identity.', link: '/positioning', group: 'Launch' },
  { icon: '🧾', title: 'Legal Checklist', desc: 'Every compliance and registration step to launch legally.', link: '/legal', group: 'Launch' },
  // Grow
  { icon: '📋', title: 'GTM Strategy', desc: 'Phase-by-phase go-to-market plan tailored to your budget.', link: '/gtm', group: 'Grow', hot: true },
  { icon: '🎯', title: 'Audience Finder', desc: 'Deep ICP analysis and audience segmentation.', link: '/audience', group: 'Grow' },
  { icon: '🤝', title: 'Partnership Finder', desc: 'Find B2B partners with ready-to-use outreach templates.', link: '/partnerships', group: 'Grow' },
  { icon: '📈', title: 'Growth Playbook', desc: '30-day daily action plan to go from zero to traction.', link: '/growth', group: 'Grow', hot: true },
  { icon: '🏷️', title: 'Pricing Strategy', desc: 'AI-designed pricing tiers with actual numbers.', link: '/pricing-strategy', group: 'Grow' },
  { icon: '🌍', title: 'Market Size', desc: 'TAM, SAM, SOM estimates with growth rate analysis.', link: '/market-size', group: 'Grow' },
  // Scale
  { icon: '🗺️', title: 'Product Roadmap', desc: 'Sprint-by-sprint roadmap with milestones and tech stack.', link: '/roadmap', group: 'Scale' },
  { icon: '📦', title: 'MVP Prioritizer', desc: 'MoSCoW framework — build only what matters first.', link: '/mvp', group: 'Scale' },
  { icon: '📊', title: 'Competitor SWOT', desc: 'Dissect any competitor and find gaps you can exploit.', link: '/swot', group: 'Scale' },
  { icon: '💰', title: 'Revenue Model', desc: 'Monetization strategies with 3-year projections.', link: '/revenue-model', group: 'Scale' },
  { icon: '⚠️', title: 'Risk Assessment', desc: 'Every risk mapped with probability and mitigation plans.', link: '/risk', group: 'Scale' },
  { icon: '🎓', title: 'Skill Gap Analyzer', desc: 'Know exactly who to hire or what to learn next.', link: '/skills', group: 'Scale' },
  { icon: '📱', title: 'App Idea to PRD', desc: 'Convert your idea into a developer-ready PRD instantly.', link: '/prd', group: 'Scale' },
  { icon: '🤖', title: 'AI Mentor Chat', desc: 'Your personal startup advisor, available 24/7.', link: '/mentor', group: 'Scale', hot: true },
];

const TABS = ['All', 'Launch', 'Grow', 'Scale'];

const GROUP_META: Record<string, { color: string; glow: string; border: string; tag: string; tagColor: string }> = {
  Launch: {
    color: 'text-violet-400',
    glow: 'group-hover:shadow-violet-500/20',
    border: 'group-hover:border-violet-500/40',
    tag: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    tagColor: 'bg-violet-500',
  },
  Grow: {
    color: 'text-cyan-400',
    glow: 'group-hover:shadow-cyan-500/20',
    border: 'group-hover:border-cyan-500/40',
    tag: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    tagColor: 'bg-cyan-500',
  },
  Scale: {
    color: 'text-emerald-400',
    glow: 'group-hover:shadow-emerald-500/20',
    border: 'group-hover:border-emerald-500/40',
    tag: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    tagColor: 'bg-emerald-500',
  },
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return ALL_TOOLS.filter(t => {
      const matchesTab = activeTab === 'All' || t.group === activeTab;
      const matchesSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  const hotTools = ALL_TOOLS.filter(t => t.hot);

  return (
    <div className="min-h-screen bg-[#09090B] font-sans overflow-x-hidden">

      {/* ── Ambient background ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-violet-600/[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-cyan-600/[0.04] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-emerald-600/[0.04] rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.013)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.013)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* ── Nav ── */}
      <nav className="relative z-50 sticky top-0 border-b border-white/[0.06] bg-[#09090B]/85 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center font-black text-white shadow-lg shadow-violet-500/30">
              U
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#09090B]" />
            </div>
            <div>
              <span className="font-bold text-white text-base tracking-tight">Uporia</span>
              <span className="ml-2 text-[10px] font-bold text-violet-400/80 border border-violet-500/20 bg-violet-500/8 px-1.5 py-0.5 rounded-md">v2.0</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AI Online
            </span>
            <Link href="/login" className="text-xs text-zinc-500 hover:text-white transition-colors border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] px-3 py-1.5 rounded-lg">
              Sign in
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Hero ── */}
        <div className="pt-16 pb-12 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] text-zinc-400 text-xs font-medium px-4 py-1.5 rounded-full mb-8 hover:border-violet-500/30 transition-colors cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            20 AI-Powered Business Tools
          </div>

          <h1 className="text-[56px] md:text-7xl font-black text-white tracking-tight leading-[0.95] mb-6">
            Build your empire.<br />
            <span className="relative">
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">
                Let AI do the thinking.
              </span>
            </span>
          </h1>

          <p className="text-zinc-500 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            From validating your first idea to scaling to ₹10Cr — every strategic tool you need, in one place.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tools... (e.g. pitch, market, pricing)"
              className="w-full bg-white/[0.04] border border-white/[0.08] text-white placeholder-zinc-600 text-sm rounded-2xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 focus:bg-white/[0.06] transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute inset-y-0 right-4 flex items-center text-zinc-600 hover:text-zinc-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14">
          {[
            { num: '20', label: 'AI Tools', sub: 'All Gemini-powered' },
            { num: '3', label: 'Stages', sub: 'Launch → Scale' },
            { num: '∞', label: 'Generations', sub: 'No limits' },
            { num: '0', label: 'Manual Work', sub: 'AI does the heavy lifting' },
          ].map((s, i) => (
            <div key={i} className="relative bg-white/[0.025] border border-white/[0.06] rounded-2xl px-5 py-4 overflow-hidden group hover:border-white/[0.1] transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-2xl font-black text-white mb-0.5">{s.num}</div>
              <div className="text-xs font-semibold text-zinc-400">{s.label}</div>
              <div className="text-[11px] text-zinc-700 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Hot Tools Spotlight ── */}
        {!search && activeTab === 'All' && (
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-sm font-bold text-white">🔥 Most Popular</span>
              <div className="h-px flex-1 bg-white/[0.04]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {hotTools.map((tool, i) => {
                const m = GROUP_META[tool.group];
                return (
                  <Link key={i} href={tool.link}
                    className={`group relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] ${m.border} rounded-2xl p-5 hover:bg-white/[0.06] transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${m.glow} overflow-hidden`}>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{tool.icon}</span>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${m.tag}`}>{tool.group.toUpperCase()}</span>
                    </div>
                    <h3 className={`font-bold text-sm text-white mb-1.5 group-hover:${m.color} transition-colors`}>{tool.title}</h3>
                    <p className="text-xs text-zinc-600 leading-relaxed group-hover:text-zinc-500 transition-colors">{tool.desc}</p>
                    <div className={`mt-4 flex items-center gap-1 text-xs font-semibold ${m.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                      Open tool <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Category Tabs ── */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                activeTab === tab
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                  : 'bg-white/[0.04] text-zinc-500 border border-white/[0.06] hover:text-white hover:bg-white/[0.07]'
              }`}>
              {tab === 'All' ? `All (${ALL_TOOLS.length})` : tab}
            </button>
          ))}
          {search && (
            <span className="ml-auto text-xs text-zinc-600">{filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{search}"</span>
          )}
        </div>

        {/* ── Tool Grid ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-zinc-500 text-sm">No tools found for "{search}"</p>
            <button onClick={() => setSearch('')} className="mt-3 text-xs text-violet-400 hover:underline">Clear search</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
            {filtered.map((tool, i) => {
              const m = GROUP_META[tool.group];
              return (
                <Link key={i} href={tool.link}
                  className={`group relative bg-white/[0.025] border border-white/[0.06] ${m.border} rounded-2xl p-5 hover:bg-white/[0.05] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${m.glow} overflow-hidden`}>
                  
                  {/* Top shimmer line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent group-hover:via-white/[0.12] transition-all" />

                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-white/[0.07] transition-all duration-200">
                      {tool.icon}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {tool.hot && <span className="text-[9px] font-black text-orange-400 border border-orange-500/30 bg-orange-500/10 px-1.5 py-0.5 rounded-full">HOT</span>}
                      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${m.tag}`}>{tool.group}</span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-white text-sm mb-1.5 group-hover:text-zinc-100 transition-colors leading-snug">{tool.title}</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed group-hover:text-zinc-500 transition-colors">{tool.desc}</p>

                  <div className={`mt-4 flex items-center gap-1 text-[11px] font-semibold ${m.color} opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200`}>
                    Open <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* ── Footer ── */}
        <div className="border-t border-white/[0.04] py-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-violet-600 flex items-center justify-center font-black text-white text-xs">U</div>
            <span className="text-xs text-zinc-700">Uporia v2.0 · MCA Mini Project</span>
          </div>
          <span className="text-xs text-zinc-800">Built with Next.js · Tailwind CSS · Gemini AI</span>
        </div>
      </div>
    </div>
  );
}