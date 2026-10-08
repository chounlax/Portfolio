# Portfolio — Sean Thompson (Symfony)

Le portfolio React + Vite intégré dans un projet **Symfony 7.4** :
Symfony gère les routes et les pages (Twig), React affiche le contenu et la 3D.

## Lancer le projet

```bash
composer install   # dépendances PHP (une seule fois)
npm install        # dépendances JavaScript (une seule fois)
npm run build      # compile le front React dans public/build/
symfony server:start
```

Pendant que tu modifies le code React, `npm run watch` recompile automatiquement à chaque sauvegarde (recharge ensuite la page).

## Comment c'est organisé

| Quoi | Où |
| --- | --- |
| Routes `/`, `/wheello`, `/veille` | `src/Controller/PortfolioController.php` |
| Pages HTML (titre, description, `<div id="root">`) | `templates/base.html.twig` et `templates/portfolio/` |
| Inclusion du CSS/JS compilé par Vite | `src/Twig/ViteExtension.php` |
| Code React (composants, styles) | `assets/` |
| Textes du portfolio | `assets/data.js` |
| Adresses transmises par Symfony à React | `assets/urls.js` |
| Photo, CV, captures | `public/` |

Les liens entre les pages sont générés par Symfony (`path('wheello')`…) puis transmis à React :
le site fonctionne donc aussi dans un sous-dossier, par exemple derrière un `Alias /share` sous Apache.
Dans ce cas, ajoute le `.htaccess` de Symfony avec `composer require symfony/apache-pack`.

## Mise en ligne (GitHub Pages)

À chaque push sur `main`, la GitHub Action `.github/workflows/deploy.yml` installe PHP et Node,
compile le front puis lance `php bin/console app:export-static` : Symfony génère les pages en HTML
dans `dist/`, qui est publié sur GitHub Pages (qui ne sait pas exécuter PHP).

Pour tester l'export sur ton ordinateur :

```bash
APP_ENV=prod php bin/console app:export-static --base=/Portfolio
```
