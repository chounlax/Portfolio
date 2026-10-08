import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Le code React (dossier assets/) est compilé dans public/build/.
// Symfony lit ensuite public/build/.vite/manifest.json pour savoir quels fichiers
// inclure dans chaque page (voir src/Twig/ViteExtension.php).
export default defineConfig({
  plugins: [react()],
  base: './',
  publicDir: false,
  build: {
    outDir: 'public/build',
    emptyOutDir: true,
    manifest: true,
    // three.js est volumineux par nature : on évite l'avertissement de taille
    chunkSizeWarningLimit: 1200,
    // une entrée par page : l'accueil et les pages de projet
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./assets/main.jsx', import.meta.url)),
        wheello: fileURLToPath(new URL('./assets/wheello.jsx', import.meta.url)),
        veille: fileURLToPath(new URL('./assets/veille.jsx', import.meta.url)),
      },
    },
  },
})
