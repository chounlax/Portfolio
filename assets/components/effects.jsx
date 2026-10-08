import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Fait flotter doucement son contenu (montée / descente + légère rotation)
export function Float({ speed = 1, rotationIntensity = 1, floatIntensity = 1, children, ...props }) {
  const inner = useRef()
  const offset = useMemo(() => Math.random() * 1000, [])
  useFrame((state) => {
    const t = ((offset + state.clock.elapsedTime) * speed) / 4
    inner.current.rotation.set(
      (Math.cos(t) / 8) * rotationIntensity,
      (Math.sin(t) / 8) * rotationIntensity,
      (Math.sin(t) / 20) * rotationIntensity,
    )
    inner.current.position.y = (Math.sin(t) / 10) * floatIntensity
  })
  return (
    <group {...props}>
      <group ref={inner}>{children}</group>
    </group>
  )
}
