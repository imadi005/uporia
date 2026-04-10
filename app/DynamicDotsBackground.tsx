'use client'

import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'

function DotWave() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const countX = 60
  const countY = 30
  const total = countX * countY
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const positions = useMemo(() => {
    const pos: [number, number][] = []
    for (let x = 0; x < countX; x++) {
      for (let y = 0; y < countY; y++) {
        pos.push([x - countX / 2, y - countY / 2])
      }
    }
    return pos
  }, [countX, countY])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    positions.forEach(([x, y], i) => {
      const wave = Math.sin(x * 0.3 + t * 2) + Math.cos(y * 0.3 + t * 1.5)
      dummy.position.set(x * 0.35, y * 0.35, wave * 0.6)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current!.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, total]}>
      <sphereGeometry args={[0.08, 6, 6]} />
      <meshBasicMaterial color="#c0c0c0" />
    </instancedMesh>
  )
}

export default function DynamicDotsBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 45], fov: 60 }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <ambientLight intensity={1.2} />
        <DotWave />
      </Canvas>
    </div>
  )
}
