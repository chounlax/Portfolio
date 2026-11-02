import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Float } from '../effects.jsx'
import { SceneCanvas, WireShape } from '../WireShape.jsx'

// Contour d'un cœur, dessiné avec des courbes de Bézier
function heartShape() {
  const s = new THREE.Shape()
  s.moveTo(5, 5)
  s.bezierCurveTo(5, 5, 4, 0, 0, 0)
  s.bezierCurveTo(-6, 0, -6, 7, -6, 7)
  s.bezierCurveTo(-6, 11, -3, 15.4, 5, 19)
  s.bezierCurveTo(12, 15.4, 16, 11, 16, 7)
  s.bezierCurveTo(16, 7, 16, 0, 10, 0)
  s.bezierCurveTo(7, 0, 5, 5, 5, 5)
  return s
}

// Veille (IA et santé) : un cœur en fil de fer qui bat, dans un réseau de points (les données)
function Heart({ color }) {
  const beat = useRef()
  const geo = useMemo(() => {
    const heart = new THREE.ExtrudeGeometry(heartShape(), { depth: 4, bevelEnabled: false, curveSegments: 6 })
    heart.center()
    return {
      heart,
      net: new THREE.IcosahedronGeometry(2.6, 1),
      cube: new THREE.BoxGeometry(0.5, 0.5, 0.5),
    }
  }, [])
  useFrame((state) => {
    // battement : deux petites impulsions par seconde environ
    const t = state.clock.elapsedTime * 2.4
    const pulse = Math.pow(Math.max(0, Math.sin(t)), 12)
    beat.current.scale.setScalar(0.12 * (1 + 0.08 * pulse))
    beat.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.7
  })
  const width = useThree((s) => s.viewport.width)
  const scale = Math.min(1, width / 9)

  return (
    <group scale={scale}>
      <group position={[0.1, 0.2, -2]} scale={1.2}>
        <WireShape geometry={geo.net} color={color} opacity={0.14} speed={0.04} />
        {/* le dessin du cœur est la tête en bas : on le retourne (rotation de 180° sur z) */}
        <group ref={beat} rotation={[0, 0, Math.PI]}>
          <WireShape geometry={geo.heart} color={color} opacity={0.3} speed={0} dots={false} />
        </group>
      </group>
      <Float speed={1.4} rotationIntensity={2} floatIntensity={2} position={[0.6, -2.6, -1]}>
        <WireShape geometry={geo.cube} color={color} opacity={0.45} speed={0.25} />
      </Float>
    </group>
  )
}

export default function VeilleScene({ active, still, color }) {
  return (
    <SceneCanvas active={active} still={still}>
      <Heart color={color} />
    </SceneCanvas>
  )
}
