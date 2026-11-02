import { Suspense, useEffect, useRef, useState } from 'react'
import { SceneBoundary, webglAvailable } from './SceneSafety.jsx'

// Scène 3D en fond de l'en-tête d'une page projet.
// Scene = composant de la page chargé avec lazy() : three.js n'est téléchargé qu'après le texte.
// La couleur est lue dans les variables CSS de la page : version claire (--c-light) sur l'en-tête sombre,
// sinon un bleu clair par défaut (pages Wheello et Veille).
export default function PageScene({ Scene }) {
  const box = useRef()
  const [onScreen, setOnScreen] = useState(true)
  const [color, setColor] = useState('#8fb4ff')

  useEffect(() => {
    if (!box.current) return
    setColor(getComputedStyle(document.documentElement).getPropertyValue('--c-light').trim() || '#8fb4ff')
    // la 3D ne tourne que lorsque l'en-tête est visible
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting))
    io.observe(box.current)
    return () => io.disconnect()
  }, [])

  if (!webglAvailable()) return null
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className="phero__scene" ref={box} aria-hidden="true">
      <SceneBoundary>
        <Suspense fallback={null}>
          <Scene active={onScreen} still={still} color={color} />
        </Suspense>
      </SceneBoundary>
    </div>
  )
}
