import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' : le site fonctionne aussi dans un sous-dossier (GitHub Pages, hébergeur scolaire...)
export default defineConfig({
  base: './',
  plugins: [react()],
  // three.js est volumineux par nature : on évite l'avertissement de taille
  build: { chunkSizeWarningLimit: 1200 },
})
