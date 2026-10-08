// Génère les pages WordPress (accueil résumé, Wheello, veille) à partir du code du portfolio.
// Le HTML est rendu côté serveur avec les vrais composants, puis le CSS du site est ajouté tel quel.
//
// Utilisation : node wordpress/export.mjs   → écrit wordpress/pages/*.html (contenu prêt pour l'éditeur de code WordPress)

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const require = createRequire(root + 'package.json')
const { createServer } = await import(root + 'node_modules/vite/dist/node/index.js')
const { renderToStaticMarkup } = require('react-dom/server')
const React = require('react')

// Adresses sur le site WordPress
const SITE = 'https://5067.s3.nuage-peda.fr'
const UP = `${SITE}/wp-content/uploads/2026/10`
const urls = {
  './#projects': `${SITE}/#acces`,
  './wheello.html': `${SITE}/wheello/`,
  './veille.html': `${SITE}/veille-technologique/`,
  './portrait.png': `${UP}/sean-portrait.png`,
  './cv-sean-thompson.pdf': `${UP}/cv-sean-thompson.pdf`,
  './projects/wheello/cover.webp': `${UP}/wheello-cover.webp`,
  './projects/wheello/back-office-accueil.webp': `${UP}/wheello-back-office-accueil-scaled.webp`,
  './projects/wheello/back-office-vehicules.webp': `${UP}/wheello-back-office-vehicules-scaled.webp`,
  './projects/wheello/back-office-bilan-kilometrique.webp': `${UP}/wheello-back-office-bilan-kilometrique-scaled.webp`,
  './projects/wheello/mobile-accueil.webp': `${UP}/wheello-mobile-accueil.webp`,
  './projects/wheello/mobile-reservations.webp': `${UP}/wheello-mobile-reservations.webp`,
  './projects/wheello/mobile-modification-reservation.webp': `${UP}/wheello-mobile-modification-reservation.webp`,
}

const FONTS =
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap">'

// Remise à zéro des styles du thème WordPress, placée AVANT le CSS du portfolio
const RESET = `
h1,h2,h3,h4,h5,h6{color:inherit;font-family:inherit;font-size:revert;font-weight:revert;letter-spacing:normal;line-height:inherit;text-transform:none}
a:where(:not(.wp-element-button)){color:inherit;text-decoration:none;line-height:inherit}
:root :where(.wp-block-post-content){color:inherit}
:root :where(.wp-block-post-content a:where(:not(.wp-element-button))){color:inherit}
:root :where(a:where(:not(.wp-element-button)):hover){color:inherit;text-decoration:none}
.wp-block-post-content>*{margin-block:0}
`

// Ajouts propres à la version WordPress (statique, sans JavaScript), placés APRÈS le CSS du portfolio
const EXTRA = `
.grid-2{grid-template-columns:repeat(auto-fill,minmax(min(100%,420px),1fr))}
.project__cover--veille{display:grid;align-content:center;gap:.7rem;aspect-ratio:16/9;padding:1.4rem 1.6rem;background:var(--night);background-image:linear-gradient(rgba(143,180,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(143,180,255,.06) 1px,transparent 1px);background-size:28px 28px;color:#f3f6fb;font-family:var(--mono);font-size:.85rem}
.project__cover--veille b{margin-right:.6rem;color:var(--blue-mist);font-weight:400}
.contact--lite{grid-template-columns:1fr 1fr;align-items:center}
a.info-card{transition:border-color .2s,transform .2s}
a.info-card:hover{border-color:var(--blue);transform:translate(-2px,-2px)}
.vfilters{display:none}
.pnav .nav__logo{color:var(--ink)}
.wp-veille-posts{padding-top:clamp(5rem,11vw,8.5rem)}
.wp-veille-posts-list{list-style:none;margin:0;padding:0;display:grid;gap:1.4rem}
.wp-veille-posts-list li{padding:1.4rem 1.6rem;border:2px solid var(--ink);background:var(--card);box-shadow:var(--shadow)}
.wp-veille-posts-list .wp-block-latest-posts__post-title{font-size:1.15rem;font-weight:800}
.wp-veille-posts-list .wp-block-latest-posts__post-title:hover{color:var(--blue)}
.wp-veille-posts-list .wp-block-latest-posts__post-date{display:block;margin:.3rem 0 .5rem;font-family:var(--mono);font-size:.72rem;color:var(--blue)}
.wp-veille-posts-list .wp-block-latest-posts__post-excerpt{margin:0;color:var(--muted)}
.wp-veille-list{padding-top:0}
@media (max-width:860px){.contact--lite{grid-template-columns:1fr}}
`

const css = ['index.css', 'page.css', 'wheello.css', 'veille.css']
  .map((f) => readFileSync(root + 'src/' + f, 'utf8'))
  .join('\n')
  .replace(/\/\*[\s\S]*?\*\//g, '') // commentaires retirés : le bloc reste léger
  .replace(/\n\s*\n/g, '\n')

function postProcess(html) {
  // pas de JavaScript : les éléments .reveal sont visibles d'emblée
  html = html.replace(/class="([^"]*)"/g, (_, c) => {
    const cls = c.split(/\s+/).filter((x) => x && x !== 'reveal').join(' ')
    return cls ? `class="${cls}"` : ''
  })
  // les captures s'ouvrent en grand dans un nouvel onglet (au lieu de la galerie)
  html = html.replace(
    /<button type="button" class="(frame-browser|frame-phone)" aria-label="([^"]*)">([\s\S]*?)<\/button>/g,
    (_, cls, label, inner) => {
      const src = (inner.match(/src="([^"]+)"/) || [])[1] || '#'
      return `<a class="${cls}" href="${src}" target="_blank" rel="noopener" aria-label="${label}">${inner}</a>`
    },
  )
  // les autres boutons sans action (filtres) deviennent inertes
  html = html.replace(/<button type="button" aria-pressed="[^"]*">[\s\S]*?<\/button>/g, '')
  // adresses locales → adresses WordPress
  for (const [from, to] of Object.entries(urls)) html = html.split(`"${from}"`).join(`"${to}"`)
  html = html.replace(/"\.\/#([\w-]+)"/g, `"${SITE}/#$1"`).replace(/href="\.\/"/g, `href="${SITE}/"`)
  return html
}

const block = (html) => `<!-- wp:html -->\n${html}\n<!-- /wp:html -->`
const head = () => `${FONTS}\n<style>${RESET}${css}${EXTRA}</style>`

const server = await createServer({ root, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const render = async (path) => {
  const mod = await server.ssrLoadModule(path)
  return postProcess(renderToStaticMarkup(React.createElement(mod.default)))
}

const pages = {}
pages.accueil = block(head() + (await render('/wordpress/HomeLite.jsx')))
pages.wheello = block(head() + (await render('/src/pages/Wheello.jsx')))

// Veille : on glisse la liste des articles de la catégorie « Veille » juste avant les sources
const veille = await render('/src/pages/Veille.jsx')
const cut = veille.indexOf('<section id="sources"')
const VEILLE_CAT = Number(process.env.VEILLE_CAT || 6)
pages.veille = [
  block(head() + veille.slice(0, cut)),
  block(
    '<section class="section wp-veille-posts" id="articles"><div class="ptitle"><p class="pkicker">// EN DIRECT DE MA VEILLE</p><h2 class="title">Derniers articles<span>.</span></h2></div><p class="body-text">Les articles que je repère dans Feedly et que je vérifie sont publiés ici, avec mon propre résumé et la raison pour laquelle ils comptent pour ma problématique.</p></section>',
  ),
  `<!-- wp:group {"className":"section wp-veille-list","layout":{"type":"default"}} -->\n<div class="wp-block-group section wp-veille-list"><!-- wp:latest-posts {"categories":[{"id":${VEILLE_CAT},"value":"Veille"}],"postsToShow":6,"displayPostContent":true,"excerptLength":35,"displayPostDate":true,"className":"wp-veille-posts-list"} /--></div>\n<!-- /wp:group -->`,
  block(veille.slice(cut)),
].join('\n\n')
await server.close()

mkdirSync(root + 'wordpress/pages', { recursive: true })
for (const [name, content] of Object.entries(pages)) {
  writeFileSync(root + `wordpress/pages/${name}.html`, content)
  console.log(`wordpress/pages/${name}.html`, Math.round(content.length / 1024), 'Ko')
}
