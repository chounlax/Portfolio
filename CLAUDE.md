# Portfolio — Sean Thompson

Portfolio personnel d'un étudiant en BTS SIO (option SLAM).
Symfony 7.4 (PHP 8.5) gère les routes et les pages Twig ; React 19 + Vite affiche le contenu et la scène 3D (three.js).
Pas de base de données pour l'instant.

## Commandes

- `npm run build` : compile le React (`assets/`) dans `public/build/`. À relancer après chaque modification dans `assets/`
- `npm run watch` : recompile automatiquement pendant le développement
- `symfony server:start` : lance le site en local
- `php bin/console debug:router` : liste les routes
- `php bin/console lint:twig templates` : vérifie les templates
- `php bin/console app:export-static --base=/Portfolio` : exporte le site en HTML statique dans `dist/` (utilisé par la GitHub Action pour GitHub Pages)

## Organisation

- `src/Controller/PortfolioController.php` : routes `/` (home), `/wheello`, `/veille`
- `templates/base.html.twig` : squelette commun ; chaque page de `templates/portfolio/` choisit son entrée Vite avec `{% set entry = '...' %}`
- `src/Command/ExportStaticCommand.php` : export statique pour GitHub Pages (`.github/workflows/deploy.yml`) ; toute nouvelle route doit aussi être ajoutée dans sa constante `PAGES`
- `src/Twig/ViteExtension.php` : fonctions Twig `vite_entry_link_tags()` / `vite_entry_script_tags()` qui lisent `public/build/.vite/manifest.json`
- `assets/data.js` : tous les textes du portfolio
- `assets/urls.js` : adresses transmises par Twig (attributs `data-*` de `#root`)
- `public/` : photo, CV, captures de projets

## Règles

- Ne jamais coder un lien ou un chemin d'image en dur dans le React : utiliser `routes.xxx` et `asset('...')` de `assets/urls.js`, pour que le site marche aussi dans un sous-dossier (Apache `Alias /share` sur le serveur de l'école).
- Nouvelle page = une route dans le contrôleur + un template Twig + une entrée dans `vite.config.js` + une adresse dans `base.html.twig` et `assets/urls.js`.
- Ne jamais modifier `public/build/` (généré) ni `vendor/`.
- Ne jamais utiliser `sudo` pour composer, npm ou bin/console.
- Textes du site et commentaires du code en français.
- Je suis étudiant et je dois pouvoir expliquer mon code à l'examen : explique brièvement ce que tu modifies et pourquoi, et reste simple plutôt que d'ajouter des couches d'abstraction.
- Avant une grosse modification, propose d'abord un plan.
