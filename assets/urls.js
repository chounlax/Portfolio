// Adresses générées par Symfony et transmises par le template Twig (voir templates/base.html.twig).
// Grâce à ça, le site marche aussi bien à la racine (/) que dans un sous-dossier (ex. /share sur le nuage).
const data = document.getElementById('root')?.dataset ?? {}

export const routes = {
  home: data.home ?? '/',
  wheello: data.wheello ?? '/wheello',
  veille: data.veille ?? '/veille',
}

// Chemin d'un fichier du dossier public/ (images, CV...)
export const asset = (path) => `${data.base ?? ''}/${path}`
