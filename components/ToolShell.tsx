'use client';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  icon: string;
  title: string;
  description: string;
  children: ReactNode;
  badge?: string;
}

export default function ToolShell({ icon, title, description, children, badge }: Props) {
  return (
    <div className="min-h-screen bg-[#09090B] font-sans relative overflow-hidden">
      {/* Background layers */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.12),transparent)]" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:72px_72px]" />

      {/* Nav */}
      <nav className="relative z-50 border-b border-white/[0.06] bg-[#09090B]/80 backdrop-blur-xl px-6 py-3.5 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors group">
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Dashboard
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          <span className="text-xs font-semibold text-zinc-500 tracking-widest uppercase">Uporia</span>
        </div>
      </nav>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-600/5 border border-violet-500/20 flex items-center justify-center text-3xl flex-shrink-0 shadow-lg shadow-violet-500/10">
              {icon}
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2 mb-1.5">
                <h1 className="text-2xl font-bold text-white tracking-tight">{title}</h1>
                {badge && <span className="text-[10px] font-bold bg-violet-500/20 text-violet-400 border border-violet-500/30 px-2 py-0.5 rounded-full">{badge}</span>}
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">{description}</p>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-white/[0.07] shadow-2xl shadow-black/40 p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
          {children}
        </div>
      </div>
    </div>
  );
}
