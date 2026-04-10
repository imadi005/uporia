'use client';

interface Props { content: string; }

function parseInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="text-zinc-300 not-italic">$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-zinc-800 text-violet-300 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>');
}

type Block =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'bullet'; items: string[] }
  | { type: 'numbered'; items: string[] }
  | { type: 'score'; label: string; score: number; max: number }
  | { type: 'paragraph'; text: string }
  | { type: 'divider' };

function parse(raw: string): Block[] {
  const lines = raw.split('\n');
  const blocks: Block[] = [];
  let bulletBuf: string[] = [];
  let numberedBuf: string[] = [];

  const flushBullet = () => { if (bulletBuf.length) { blocks.push({ type: 'bullet', items: [...bulletBuf] }); bulletBuf = []; } };
  const flushNum = () => { if (numberedBuf.length) { blocks.push({ type: 'numbered', items: [...numberedBuf] }); numberedBuf = []; } };

  for (const raw of lines) {
    const line = raw.replace(/\r/, '').trim();

    // Skip horizontal rules and empty separators
    if (!line || line === '---' || line === '***' || line === '___') {
      flushBullet(); flushNum();
      continue;
    }

    // Score detection
    const scoreMatch = line.match(/(\d+)\s*\/\s*(\d+)/);
    if (scoreMatch && (line.toLowerCase().includes('score') || line.startsWith('#'))) {
      flushBullet(); flushNum();
      const label = line.replace(/\d+\s*\/\s*\d+/, '').replace(/[#*:]/g, '').trim() || 'Score';
      blocks.push({ type: 'score', label, score: parseInt(scoreMatch[1]), max: parseInt(scoreMatch[2]) });
      continue;
    }

    if (line.startsWith('## ')) { flushBullet(); flushNum(); blocks.push({ type: 'h2', text: line.slice(3) }); continue; }
    if (line.startsWith('### ')) { flushBullet(); flushNum(); blocks.push({ type: 'h3', text: line.slice(4) }); continue; }
    if (line.startsWith('# ')) { flushBullet(); flushNum(); blocks.push({ type: 'h2', text: line.slice(2) }); continue; }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      flushNum(); bulletBuf.push(line.slice(2)); continue;
    }

    const numMatch = line.match(/^(\d+)\.\s+(.+)/);
    if (numMatch) { flushBullet(); numberedBuf.push(numMatch[2]); continue; }

    const boldOnly = line.match(/^\*\*(.+?)\*\*:?\s*$/);
    if (boldOnly) { flushBullet(); flushNum(); blocks.push({ type: 'h3', text: boldOnly[1] }); continue; }

    flushBullet(); flushNum();
    blocks.push({ type: 'paragraph', text: line });
  }
  flushBullet(); flushNum();
  return blocks;
}

const ACCENT_COLORS = [
  'border-violet-500/60 bg-violet-500/5',
  'border-cyan-500/60 bg-cyan-500/5',
  'border-emerald-500/60 bg-emerald-500/5',
  'border-amber-500/60 bg-amber-500/5',
  'border-rose-500/60 bg-rose-500/5',
  'border-indigo-500/60 bg-indigo-500/5',
];

export default function GeminiOutput({ content }: Props) {
  if (!content) return null;
  const blocks = parse(content);
  let h2Count = -1;

  return (
    <div className="mt-8 pt-8 border-t border-white/[0.06] space-y-2">
      {blocks.map((block, i) => {
        if (block.type === 'h2') {
          h2Count++;
          const color = ACCENT_COLORS[h2Count % ACCENT_COLORS.length];
          return (
            <div key={i} className={`border-l-2 pl-4 py-2.5 rounded-r-xl ${color} mt-5 first:mt-0`}>
              <h2 className="text-sm font-bold text-white tracking-tight">{block.text}</h2>
            </div>
          );
        }
        if (block.type === 'h3') {
          return (
            <h3 key={i} className="text-sm font-semibold text-zinc-300 mt-3 mb-0.5 flex items-center gap-2">
              <span className="w-0.5 h-3.5 bg-violet-400/50 rounded-full" />{block.text}
            </h3>
          );
        }
        if (block.type === 'score') {
          const pct = Math.min(100, (block.score / block.max) * 100);
          const color = pct >= 70 ? 'bg-emerald-500' : pct >= 40 ? 'bg-amber-500' : 'bg-rose-500';
          const textColor = pct >= 70 ? 'text-emerald-400' : pct >= 40 ? 'text-amber-400' : 'text-rose-400';
          return (
            <div key={i} className="bg-zinc-900/60 border border-white/[0.06] rounded-xl p-4 mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-zinc-300">{block.label}</span>
                <span className={`text-2xl font-black ${textColor}`}>{block.score}<span className="text-sm font-normal text-zinc-600">/{block.max}</span></span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        }
        if (block.type === 'bullet') {
          return (
            <div key={i} className="space-y-1.5 pl-1">
              {block.items.map((item, j) => (
                <div key={j} className="flex items-start gap-2.5 group">
                  <span className="mt-2 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                  <p className="text-sm text-zinc-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
                </div>
              ))}
            </div>
          );
        }
        if (block.type === 'numbered') {
          return (
            <div key={i} className="space-y-2 pl-1">
              {block.items.map((item, j) => (
                <div key={j} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-500/15 border border-violet-500/25 text-[10px] font-bold text-violet-400 flex items-center justify-center mt-0.5">{j + 1}</span>
                  <p className="text-sm text-zinc-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
                </div>
              ))}
            </div>
          );
        }
        if (block.type === 'paragraph') {
          return <p key={i} className="text-sm text-zinc-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: parseInline(block.text) }} />;
        }
        return null;
      })}
    </div>
  );
}
