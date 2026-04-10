'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { MeshWobbleMaterial, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function Wave() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[10, 3, 100, 16]} />
      <MeshWobbleMaterial color="#888" factor={1.5} speed={1.5} />
    </mesh>
  )
}

export default function WaveBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <Wave />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
