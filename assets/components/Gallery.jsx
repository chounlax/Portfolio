import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'

// Galerie plein écran : flèches ← → pour naviguer, Échap pour fermer
export default function Gallery({ title, images, start = 0, onClose }) {
  const [index, setIndex] = useState(start)
  const count = images.length
  const image = images[index]
  const go = (step) => setIndex((i) => (i + step + count) % count)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="gallery" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="gallery__inner" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="gallery__close" onClick={onClose} aria-label="Fermer" autoFocus>
          <Icon name="close" />
        </button>
        <img className="gallery__img" src={image.src} alt={image.caption} />
        <div className="gallery__bar">
          <button type="button" onClick={() => go(-1)} aria-label="Image précédente">
            <Icon name="arrowLeft" />
          </button>
          <p>
            <span>
              {index + 1} / {count}
            </span>
            {image.caption}
          </p>
          <button type="button" onClick={() => go(1)} aria-label="Image suivante">
            <Icon name="arrowRight" />
          </button>
        </div>
      </div>
    </div>
  )
}
