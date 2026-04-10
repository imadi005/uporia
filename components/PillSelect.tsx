'use client';

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
}

export default function PillSelect({ label, value, onChange, options, required }: Props) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-300">
        {label} {required && <span className="text-violet-400">*</span>}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(opt)}
            className={`text-sm px-4 py-2 rounded-xl border font-medium transition-all ${
              value === opt
                ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/20'
                : 'bg-zinc-800/60 border-white/[0.08] text-zinc-400 hover:text-white hover:border-zinc-600'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
