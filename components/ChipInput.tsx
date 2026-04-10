'use client';

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  suggestions: string[];
  required?: boolean;
  textarea?: boolean;
  rows?: number;
}

export default function ChipInput({ label, value, onChange, placeholder, suggestions, required, textarea, rows = 3 }: Props) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-300">
        {label} {required && <span className="text-violet-400">*</span>}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full bg-zinc-800/60 border border-white/[0.08] text-white placeholder-zinc-600 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 resize-none transition-all"
        />
      ) : (
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-zinc-800/60 border border-white/[0.08] text-white placeholder-zinc-600 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
        />
      )}
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onChange(s)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                value === s
                  ? 'bg-violet-500/20 border-violet-500/50 text-violet-300'
                  : 'bg-zinc-800/50 border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-zinc-600'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
