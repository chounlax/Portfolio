import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' : le site fonctionne aussi dans un sous-dossier (GitHub Pages, hébergeur scolaire...)
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    // three.js est volumineux par nature : on évite l'avertissement de taille
    chunkSizeWarningLimit: 1200,
    // une page HTML par entrée : l'accueil et les pages de projet
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        wheello: fileURLToPath(new URL('./wheello.html', import.meta.url)),
        veille: fileURLToPath(new URL('./veille.html', import.meta.url)),
      },
    },
  },
})
