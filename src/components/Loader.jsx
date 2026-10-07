import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import { profile } from '../data.js'

const DURATION = 1600 // durée du compteur 0 → 100 %

// Écran d'introduction : compteur de chargement puis bouton pour entrer
export default function Loader({ onEnter }) {
  const [percent, setPercent] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const ready = percent >= 100

  useEffect(() => {
    let frame
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION)
      setPercent(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const enter = () => {
    if (!ready || leaving) return
    setLeaving(true)
    setTimeout(onEnter, 600)
  }

  // Entrée / Échap permettent aussi de passer l'intro
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === 'Escape') enter()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className={`loader ${leaving ? 'loader--leave' : ''}`} role="dialog" aria-label="Introduction">
      <div className="loader__meta loader__meta--tl">
        <p>SYS_VER: 2026.10</p>
        <p>AUTH: BTS_SIO</p>
      </div>
      <p className="loader__meta loader__meta--tr">LAT: 50.27 N, LON: 2.75 E</p>

      <div className="loader__main">
        <h1 className="loader__title">
          <span>{profile.firstName.toUpperCase()}</span>
          <span className="loader__title-2">
            {profile.lastName.toUpperCase()}
            <i className="loader__cursor" />
          </span>
        </h1>
        <button className="loader__enter" onClick={enter} disabled={!ready} autoFocus>
          <span className={`loader__dot ${ready ? 'on' : ''}`} />[ {ready ? 'ENTRER' : 'CHARGEMENT'} ]
        </button>
      </div>

      <div className="loader__icons" aria-hidden="true">
        {['cpu', 'database', 'globe', 'layers', 'wifi', 'code', 'braces', 'terminal'].map((n) => (
          <Icon key={n} name={n} size={26} />
        ))}
      </div>

      <p className="loader__meta loader__meta--bl">DEVELOPPEUR_WEB.EXE</p>
      <p className="loader__percent" aria-live="polite">
        {percent}
        <small>%</small>
      </p>
    </div>
  )
}
