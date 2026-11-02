import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Briques 3D communes : la forme en fil de fer et la caméra qui suit la souris
// (utilisées par la scène de l'accueil et par celles des pages projets)
const BLUE = '#2152d9'

// Forme façon « plan technique » : arêtes fines + petits points aux sommets
// wire = true : on affiche toutes les arêtes des triangles (utile pour un disque ou une roue à rayons)
export function WireShape({ geometry, color = BLUE, opacity = 0.3, speed = 0.1, dots = true, wire = false, ...props }) {
  const ref = useRef()
  const edges = useMemo(() => (wire ? new THREE.WireframeGeometry(geometry) : new THREE.EdgesGeometry(geometry)), [geometry, wire])
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05) // pas de saut quand la scène reprend après une pause
    ref.current.rotation.y += dt * speed
    ref.current.rotation.x += dt * speed * 0.4
  })
  return (
    <group ref={ref} {...props}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={color} transparent opacity={opacity} />
      </lineSegments>
      {dots && (
        <points geometry={geometry}>
          <pointsMaterial color={color} size={0.05} transparent opacity={Math.min(1, opacity * 2.5)} />
        </points>
      )}
    </group>
  )
}

// La caméra suit doucement la souris pour un effet de profondeur
export function MouseRig() {
  const target = useMemo(() => new THREE.Vector3(), [])
  useFrame((state, delta) => {
    target.set(state.pointer.x * 0.6, state.pointer.y * 0.4, 8)
    state.camera.position.lerp(target, 1 - Math.exp(-2 * delta))
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

// Toile 3D des pages projets : fond transparent, caméra commune.
// active = false quand l'en-tête est hors de l'écran (la scène arrête de se redessiner) ;
// still = true si l'utilisateur préfère réduire les animations (une seule image dessinée).
export function SceneCanvas({ active = true, still = false, children }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      frameloop={still ? 'demand' : active ? 'always' : 'never'}
      // la souris est suivie sur toute la page, même si le texte passe au-dessus de la toile
      eventSource={document.getElementById('root')}
      eventPrefix="client"
    >
      {children}
      {!still && <MouseRig />}
    </Canvas>
  )
}
