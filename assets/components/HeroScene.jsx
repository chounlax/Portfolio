import { useMemo } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Float } from './effects.jsx'
import { MouseRig, WireShape } from './WireShape.jsx'

function Shapes() {
  const geo = useMemo(
    () => ({
      globe: new THREE.IcosahedronGeometry(2.7, 1),
      core: new THREE.OctahedronGeometry(1.1),
      cube: new THREE.BoxGeometry(0.6, 0.6, 0.6),
      gem: new THREE.IcosahedronGeometry(0.45, 0),
    }),
    [],
  )
  // Tout se resserre sur les écrans étroits (mobile)
  const width = useThree((s) => s.viewport.width)
  const scale = Math.min(1, width / 9)

  return (
    <group scale={scale}>
      <WireShape geometry={geo.globe} opacity={0.09} speed={0.05} />
      <WireShape geometry={geo.core} opacity={0.12} speed={-0.12} dots={false} />
      <Float speed={1.4} rotationIntensity={2} floatIntensity={2} position={[-5.4, -1.4, -1]}>
        <WireShape geometry={geo.cube} opacity={0.5} speed={0.25} />
      </Float>
      <Float speed={1.1} rotationIntensity={2} floatIntensity={2} position={[5.4, -0.4, -1]}>
        <WireShape geometry={geo.gem} opacity={0.5} speed={0.3} />
      </Float>
      <Float speed={1.7} rotationIntensity={2} floatIntensity={1.5} position={[4.6, 2.4, -2]}>
        <WireShape geometry={geo.cube} opacity={0.35} speed={-0.2} scale={0.6} dots={false} />
      </Float>
    </group>
  )
}

// active = false quand l'en-tête est hors de l'écran : la scène arrête alors de se redessiner
export default function HeroScene({ active = true }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      frameloop={active ? 'always' : 'never'}
    >
      <Shapes />
      <MouseRig />
    </Canvas>
  )
}
