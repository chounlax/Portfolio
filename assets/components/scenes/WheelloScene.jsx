import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Float } from '../effects.jsx'
import { SceneCanvas, WireShape } from '../WireShape.jsx'

// Wheello (gestion de flotte) : une roue en fil de fer qui roule, et des petits cubes autour
function Wheel({ color }) {
  const spin = useRef()
  const geo = useMemo(
    () => ({
      tire: new THREE.TorusGeometry(2.5, 0.14, 4, 32),
      rim: new THREE.TorusGeometry(2.05, 0.08, 4, 32),
      spokes: new THREE.CircleGeometry(2.0, 10), // affiché en « wire » : les rayons
      hub: new THREE.CylinderGeometry(0.45, 0.45, 0.5, 12),
      box: new THREE.BoxGeometry(0.6, 0.6, 0.6),
    }),
    [],
  )
  useFrame((_, delta) => {
    spin.current.rotation.z -= Math.min(delta, 0.05) * 0.35 // la roue tourne sur son axe
  })
  const width = useThree((s) => s.viewport.width)
  const scale = Math.min(1, width / 9)

  return (
    <group scale={scale}>
      <group position={[0.1, 0.2, -2]} rotation={[0.35, -0.55, 0]} scale={1.1}>
        <group ref={spin}>
          <WireShape geometry={geo.tire} color={color} opacity={0.35} speed={0} dots={false} />
          <WireShape geometry={geo.rim} color={color} opacity={0.25} speed={0} dots={false} />
          <WireShape geometry={geo.spokes} color={color} opacity={0.2} speed={0} wire />
          <WireShape geometry={geo.hub} color={color} opacity={0.45} speed={0} rotation={[Math.PI / 2, 0, 0]} />
        </group>
      </group>
      <Float speed={1.4} rotationIntensity={2} floatIntensity={2} position={[0.6, -2.6, -1]}>
        <WireShape geometry={geo.box} color={color} opacity={0.45} speed={0.25} />
      </Float>
      <Float speed={1.7} rotationIntensity={2} floatIntensity={1.5} position={[0.9, 2.6, -2]}>
        <WireShape geometry={geo.box} color={color} opacity={0.3} speed={-0.2} scale={0.6} dots={false} />
      </Float>
    </group>
  )
}

export default function WheelloScene({ active, still, color }) {
  return (
    <SceneCanvas active={active} still={still}>
      <Wheel color={color} />
    </SceneCanvas>
  )
}
