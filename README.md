# Portfolio — Sean Thompson

Portfolio personnel réalisé avec **React**, **Vite** et **[react-three-fiber](https://github.com/pmndrs/react-three-fiber)** pour les scènes 3D.

## Lancer le projet

Prérequis : [Node.js](https://nodejs.org/) version LTS (20.19 ou plus).

```bash
npm install      # une seule fois, installe les dépendances
npm run dev      # lance le site en local sur http://localhost:5173
```

## Mettre en ligne

```bash
npm run build    # génère le site final dans le dossier dist/
```

Le contenu du dossier `dist/` peut être déposé sur n'importe quel hébergeur statique (GitHub Pages, Netlify, Vercel, hébergement de l'école...).

## Modifier le contenu

| Quoi | Où |
| --- | --- |
| Textes, compétences, expériences, projets, diplômes, contact | `src/data.js` |
| Photo / CV | `public/portrait.png` / `public/cv-sean-thompson.pdf` |
| Couleurs et mise en page | `src/index.css` (variables en haut du fichier) |
| Écran d'introduction | `src/components/Loader.jsx` |
| Terminal (bouton `>_` en bas à droite) | `src/components/Terminal.jsx` |
| Formes 3D en fil de fer de l'en-tête | `src/components/HeroScene.jsx` |
| Icônes | `src/components/Icon.jsx` |
| Structure des sections | `src/App.jsx` |
| Page du projet Wheello : textes | `src/data.js` (objet `wheello`) |
| Page du projet Wheello : mise en page | `src/pages/Wheello.jsx` / `src/wheello.css` |
| Captures de Wheello | `public/projects/wheello/` |

L'écran d'introduction ne s'affiche qu'une fois par visite. Pour le revoir, ferme l'onglet et rouvre le site.

Mise en page inspirée du portfolio de [VARA4u-tech](https://github.com/VARA4u-tech/Vara-s--Portfolio) (licence Apache 2.0), réécrite et adaptée.

## Dépannage

- **La 3D ne s'affiche pas** : le reste du site s'affiche quand même (les formes 3D sont simplement retirées). Ouvre la console du navigateur (F12) : le message « Scène 3D désactivée » donne la cause.
- **Après une mise à jour des dépendances**, si la page se comporte bizarrement en mode dev : arrête le serveur, supprime le dossier `node_modules/.vite` puis relance `npm run dev`.
- **Antivirus** : certains antivirus (Avast, AVG…) suppriment parfois à tort des fichiers du dossier `node_modules/.vite`. Si ça arrive, ajoute une exception pour le dossier du projet dans l'antivirus.
