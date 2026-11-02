// Outils communs aux scènes 3D (accueil et pages projets)
import { Component } from 'react'

// Vérifie une seule fois que le navigateur sait afficher de la 3D (WebGL)
let webgl
export function webglAvailable() {
  if (webgl === undefined) {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      webgl = !!gl
      gl?.getExtension('WEBGL_lose_context')?.loseContext()
    } catch {
      webgl = false
    }
  }
  return webgl
}

// Si la scène 3D plante (fichier bloqué, carte graphique non compatible...),
// on la retire simplement au lieu de laisser toute la page devenir blanche
export class SceneBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.warn('Scène 3D désactivée :', error)
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}
