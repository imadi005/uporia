// components/MeshWave.tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'

export default function MeshWaveIntro() {
  const [phase, setPhase] = useState<'init' | 'title'>('init')

  useEffect(() => {
    const timer = setTimeout(() => setPhase('title'), 3500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-screen w-screen bg-black flex flex-col items-center justify-center text-white font-mono overflow-hidden">
      {phase === 'init' && (
        <div className="text-sm md:text-base leading-relaxed text-gray-400 space-y-1 text-center">
          <p>Initializing Intelligence Core...</p>
          <p>Activating Uporia Framework...</p>
          <p>Deploying Business Suite...</p>
        </div>
      )}

      {phase === 'title' && (
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-wide text-white transition-all duration-1000 ease-out">
          Uporia
        </h1>
      )}

      <Canvas
        style={{ position: 'absolute', top: 0, left: 0 }}
        camera={{ position: [0, 0, 10], fov: 75 }}
      >
        <ambientLight intensity={0.8} />
      </Canvas>
    </div>
  )
}