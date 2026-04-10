'use client';

interface Props {
  loading: boolean;
  disabled?: boolean;
  onClick: () => void;
  label: string;
  loadingLabel?: string;
  icon?: string;
}

export default function GenerateButton({ loading, disabled, onClick, label, loadingLabel, icon = '✦' }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className="relative w-full group overflow-hidden bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {loadingLabel || 'Generating...'}
          </>
        ) : (
          <>
            <span className="text-violet-200 group-hover:rotate-180 transition-transform duration-300">{icon}</span>
            {label}
          </>
        )}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </button>
  );
}
