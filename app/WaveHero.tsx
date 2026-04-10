'use client'

export default function WaveHero() {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden z-0 pointer-events-none">
      <svg
        className="wave-animation w-full h-64"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00ffff" />
            <stop offset="50%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <path
          fill="url(#glow)"
          d="
            M0,192 
            C360,320 1080,64 1440,224 
            L1440,320 
            L0,320 
            Z
          "
          opacity="0.8"
        />
      </svg>

      <style jsx>{`
        .wave-animation {
          animation: waveShift 8s ease-in-out infinite alternate;
        }

        @keyframes waveShift {
          0% {
            transform: translateX(0px) scaleY(1);
          }
          100% {
            transform: translateX(-60px) scaleY(1.05);
          }
        }
      `}</style>
    </div>
  )
}
