import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Float } from '../effects.jsx'
import { SceneCanvas, WireShape } from '../WireShape.jsx'

const A = -1.6 // position du serveur A
const B = 1.6 // position du serveur B

// Un serveur = une pile de 3 « tiroirs »
function Server({ color, ...props }) {
  const box = useMemo(() => new THREE.BoxGeometry(1.7, 0.42, 1.1), [])
  return (
    <Float speed={1.1} rotationIntensity={0.8} floatIntensity={0.8} {...props}>
      <group rotation={[0.25, 0.6, 0]}>
        {[-0.55, 0, 0.55].map((y) => (
          <WireShape key={y} geometry={box} color={color} opacity={0.35} speed={0} position={[0, y, 0]} scale={1.1} />
        ))}
      </group>
    </Float>
  )
}

// Cyber 1 (sauvegarde A → B) : deux serveurs reliés, un paquet chiffré voyage de A vers B
function Backup({ color }) {
  const packet = useRef()
  const geo = useMemo(
    () => ({
      gem: new THREE.OctahedronGeometry(0.28),
      link: new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(A, 0, 0), new THREE.Vector3(B, 0, 0)]),
    }),
    [],
  )
  useFrame((state) => {
    // un aller toutes les 3 secondes ; le paquet apparaît puis disparaît aux extrémités
    const p = (state.clock.elapsedTime % 3) / 3
    packet.current.position.x = A + (B - A) * p
    packet.current.rotation.y = p * Math.PI * 4
    packet.current.scale.setScalar(Math.sin(Math.PI * p))
  })
  const width = useThree((s) => s.viewport.width)
  const scale = Math.min(1, width / 9)

  return (
    <group scale={scale} position={[0, 0.3, -2]}>
      <Server color={color} position={[A, 0, 0]} />
      <Server color={color} position={[B, 0, 0]} />
      <lineSegments geometry={geo.link}>
        <lineBasicMaterial color={color} transparent opacity={0.35} />
      </lineSegments>
      <group ref={packet}>
        <WireShape geometry={geo.gem} color={color} opacity={0.7} speed={0} />
      </group>
    </group>
  )
}

export default function Cyber1Scene({ active, still, color }) {
  return (
    <SceneCanvas active={active} still={still}>
      <Backup color={color} />
    </SceneCanvas>
  )
}
