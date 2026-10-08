import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Float } from './effects.jsx'

const BLUE = '#2152d9'

// Forme façon « plan technique » : arêtes fines + petits points aux sommets
function WireShape({ geometry, opacity = 0.3, speed = 0.1, dots = true, ...props }) {
  const ref = useRef()
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry])
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05) // pas de saut quand la scène reprend après une pause
    ref.current.rotation.y += dt * speed
    ref.current.rotation.x += dt * speed * 0.4
  })
  return (
    <group ref={ref} {...props}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={BLUE} transparent opacity={opacity} />
      </lineSegments>
      {dots && (
        <points geometry={geometry}>
          <pointsMaterial color={BLUE} size={0.05} transparent opacity={Math.min(1, opacity * 2.5)} />
        </points>
      )}
    </group>
  )
}

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

// La caméra suit doucement la souris pour un effet de profondeur
function Rig() {
  const target = useMemo(() => new THREE.Vector3(), [])
  useFrame((state, delta) => {
    target.set(state.pointer.x * 0.6, state.pointer.y * 0.4, 8)
    state.camera.position.lerp(target, 1 - Math.exp(-2 * delta))
    state.camera.lookAt(0, 0, 0)
  })
  return null
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
      <Rig />
    </Canvas>
  )
}
