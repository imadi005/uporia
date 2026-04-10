'use client'

export default function BackgroundGlow() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="w-full h-full bg-[conic-gradient(at_center,_#0a0a0a,_#1a1a1a,_#444,_#aaa,_#111,_#000)] animate-bg-pan-slow bg-[length:250%_250%] opacity-25 blur-3xl" />
      <style jsx>{`
        @keyframes bg-pan-slow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-bg-pan-slow {
          animation: bg-pan-slow 25s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
