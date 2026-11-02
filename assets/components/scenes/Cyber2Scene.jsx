import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Float } from '../effects.jsx'
import { SceneCanvas, WireShape } from '../WireShape.jsx'

// Cyber 2 (accès sécurisés) : un cadenas en fil de fer, entouré d'un anneau de points
function Lock({ color }) {
  const lock = useRef()
  const ring = useRef()
  const geo = useMemo(() => {
    // 48 points répartis sur un cercle
    const dots = []
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * Math.PI * 2
      dots.push(new THREE.Vector3(Math.cos(a) * 2.6, Math.sin(a) * 2.6, 0))
    }
    return {
      body: new THREE.BoxGeometry(2.2, 1.7, 0.9),
      shackle: new THREE.TorusGeometry(0.75, 0.13, 6, 18, Math.PI), // demi-anneau = l'anse
      ring: new THREE.BufferGeometry().setFromPoints(dots),
      gem: new THREE.IcosahedronGeometry(0.45, 0),
    }
  }, [])
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    lock.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.6 // le cadenas pivote doucement
    ring.current.rotation.z += dt * 0.12
  })
  const width = useThree((s) => s.viewport.width)
  const scale = Math.min(1, width / 9)

  return (
    <group scale={scale}>
      <group position={[-0.4, 0.2, -2]} rotation={[0.2, 0, 0]} scale={1.2}>
        <group ref={lock}>
          <WireShape geometry={geo.body} color={color} opacity={0.3} speed={0} position={[0, -0.55, 0]} />
          <WireShape geometry={geo.shackle} color={color} opacity={0.3} speed={0} dots={false} position={[0, 0.3, 0]} />
        </group>
        <points ref={ring} geometry={geo.ring}>
          <pointsMaterial color={color} size={0.08} transparent opacity={0.5} />
        </points>
      </group>
      <Float speed={1.1} rotationIntensity={2} floatIntensity={2} position={[0.6, -2.6, -1]}>
        <WireShape geometry={geo.gem} color={color} opacity={0.45} speed={0.3} />
      </Float>
    </group>
  )
}

export default function Cyber2Scene({ active, still, color }) {
  return (
    <SceneCanvas active={active} still={still}>
      <Lock color={color} />
    </SceneCanvas>
  )
}
