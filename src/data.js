// Toutes les informations du portfolio sont ici : modifie ce fichier pour mettre à jour le site.

export const profile = {
  firstName: 'Sean',
  lastName: 'Thompson',
  title: 'Développeur Web & Mobile',
  role: 'Étudiant BTS SIO',
  availability: 'Disponible pour un stage de 1 à 3 mois',
  status: 'DISPONIBLE_POUR_UN_STAGE',
  summary: [
    "Actuellement étudiant dans l'informatique, je suis doté d'une excellente attention aux détails et disponible pour travailler de manière flexible, y compris à distance.",
    "En BTS SIO, je conçois des sites web et des applications mobiles : de la modélisation des données jusqu'à l'API qui fait communiquer le tout.",
    "J'aime comprendre comment les choses fonctionnent, travailler en équipe et livrer un travail propre et soigné.",
  ],
  photo: './portrait.png',
  cv: './cv-sean-thompson.pdf',
  phone: '[numéro retiré]',
  phoneHref: 'tel:[numéro retiré]',
  email: 'sd.thompson80200@gmail.com',
  location: 'Achicourt, France',
}

// Petites étiquettes affichées sous le nom, dans l'en-tête
export const heroTags = ['PHP', 'Symfony', 'Flutter', 'Dart', 'SQL', 'Python']

// Chiffres clés de la section « À propos »
export const stats = [
  { value: '2', label: 'Stages réalisés' },
  { value: '14', label: 'Technologies' },
  { value: '1-3', label: 'Mois de disponibilité' },
]

// Savoir-être, présentés comme une façon de travailler
export const principles = [
  { title: 'Rigueur', text: 'Un code lisible, testé et organisé, avec une vraie attention aux détails.' },
  { title: "Travail d'équipe", text: 'Communiquer, partager mon avancement et avancer ensemble vers le même objectif.' },
  { title: 'Résilience', text: 'Face à un bug ou à une difficulté, je cherche, je teste et je ne lâche rien.' },
  { title: 'Esprit analytique', text: 'Découper un problème en étapes logiques avant de passer au code.' },
]

export const skillGroups = [
  { title: 'Développement web', icon: 'code', items: ['HTML', 'CSS', 'PHP', 'Symfony', 'SQL'] },
  { title: 'Mobile & langages', icon: 'mobile', items: ['Flutter', 'Dart', 'Python'] },
  { title: 'Outils', icon: 'tool', items: ['Git', 'GitHub', 'Bash', 'VS Code'] },
  { title: 'Logiciels', icon: 'layers', items: ['Canva', 'Suite Office'] },
  { title: 'Langues', icon: 'globe', items: ['Français', 'Anglais'] },
]

export const experiences = [
  {
    date: '2026',
    company: 'Stage — Arras / Bruay',
    title: 'Stagiaire développeur',
    tasks: [
      "Réalisation d'un service de réservation de voitures",
      "Création d'un site web et d'une application mobile",
      "Mise en place d'une API pour faire communiquer le site web et l'application mobile",
      "Modélisation et saisie de données de test pour alimenter l'application",
      "Travail en équipe",
    ],
  },
  {
    date: '2024',
    company: 'Groupe scolaire Curie — Marles-les-Mines',
    title: 'Stage en école primaire',
    tasks: [
      "Aide à l'apprentissage et à l'utilisation d'outils informatiques par les élèves",
      "Participation à l'organisation d'activités pédagogiques",
    ],
  },
]

export const projects = [
  {
    title: 'Wheello',
    subtitle: 'Stage chez Habitat Insertion — 2026',
    text: "Application métier réalisée en équipe pour l'association Habitat Insertion afin de gérer sa flotte de véhicules. Elle réunit un back-office Symfony, une API sécurisée par JWT et une application mobile Flutter pour les salariés sur le terrain.",
    tags: ['Symfony', 'Flutter', 'Dart', 'API REST', 'JWT', 'Tests'],
    category: 'WEB · MOBILE',
    cover: './projects/wheello/cover.webp',
    // Page dédiée au projet (contenu dans l'objet `wheello` plus bas)
    page: './wheello.html',
  },
  {
    title: 'Ce portfolio',
    subtitle: 'Projet personnel — 2026',
    text: 'Mon site personnel : une page unique, responsive, avec une petite scène 3D en arrière-plan et un terminal interactif.',
    tags: ['React', 'Vite', 'three.js', 'CSS'],
    category: 'WEB',
  },
]

// Contenu de la page dédiée au projet Wheello (wheello.html)
export const wheello = {
  title: 'Wheello',
  tagline: 'Gérer une flotte de véhicules, les réservations et les usages terrain dans un seul système.',
  client: 'Habitat Insertion',
  period: 'Mai – juillet 2026',
  context: 'Stage de 1re année · BTS SIO SLAM',
  team: 'Projet en équipe',
  myRole: 'Organisation · Tests · Données API',

  // Le besoin du client
  need: [
    "Habitat Insertion est une association qui met des véhicules à disposition de ses salariés. Il fallait un outil unique pour savoir quel véhicule est disponible, qui le réserve, quand il part, quand il revient et dans quel état.",
    "Notre équipe a conçu Wheello de A à Z : une interface d'administration web pour les responsables, une application mobile pour les salariés sur le terrain, et une API qui fait communiquer les deux.",
  ],

  // Les deux interfaces du système
  web: {
    title: 'Le back-office web',
    audience: 'Pour les administrateurs',
    stack: 'Symfony · PHP · Doctrine',
    text: "Les responsables gèrent toute la flotte depuis leur navigateur : véhicules, utilisateurs, sites, réservations, constats et bilans. Deux niveaux d'accès existent : administrateur et super-administrateur.",
    points: ['Planning et disponibilités des véhicules', 'Gestion des utilisateurs, sites et pôles', 'Bilans kilométriques avec filtres', 'Archivage et anonymisation (RGPD)'],
    images: [
      { src: './projects/wheello/back-office-accueil.webp', caption: 'Accueil du back-office' },
      { src: './projects/wheello/back-office-vehicules.webp', caption: 'Gestion des véhicules et disponibilités' },
      { src: './projects/wheello/back-office-bilan-kilometrique.webp', caption: 'Bilans kilométriques avec filtres' },
    ],
  },
  mobile: {
    title: "L'application mobile",
    audience: 'Pour les salariés sur le terrain',
    stack: 'Flutter · Dart',
    text: "Depuis leur téléphone, les salariés consultent les véhicules, réservent, déclarent un départ ou un retour et signalent un problème, sans passer par un ordinateur.",
    points: ['Consultation des véhicules disponibles', 'Réservation et modification de période', 'Déclaration de départ et de retour', 'Signalement d\'un problème sur un véhicule'],
    images: [
      { src: './projects/wheello/mobile-accueil.webp', caption: 'Accueil et actions principales' },
      { src: './projects/wheello/mobile-reservations.webp', caption: 'Suivi des réservations' },
      { src: './projects/wheello/mobile-modification-reservation.webp', caption: "Modification d'une réservation" },
    ],
  },

  // Ce que j'ai fait personnellement
  contributions: [
    {
      icon: 'users',
      title: "Organisation de l'équipe",
      text: "J'ai participé à définir comment nous allions travailler : découpage du projet en tâches, répartition dans l'équipe et suivi de l'avancement pour avancer ensemble vers la livraison.",
      steps: ['Besoin', 'Tâches', 'Répartition', 'Suivi'],
    },
    {
      icon: 'check',
      title: 'Tests unitaires & golden tests',
      text: "J'ai écrit des tests pour l'application Flutter. Les tests unitaires vérifient la logique de l'application. Les golden tests comparent le rendu d'un écran à une image de référence : si l'affichage change sans le vouloir, le test échoue.",
      steps: ['Rendu actuel', 'Image de référence', 'Comparaison', 'OK / ÉCHEC'],
    },
    {
      icon: 'wifi',
      title: "Récupération des données de l'API",
      text: "J'ai relié l'application mobile à l'API : appeler les bonnes routes avec le jeton de connexion, transformer les réponses JSON en données utilisables puis les afficher dans les écrans.",
      steps: ['Requête + JWT', 'Réponse JSON', 'Données Dart', 'Écran'],
    },
  ],

  // Fonctionnalités principales du système
  features: [
    { icon: 'calendar', title: 'Réservations', text: 'Réserver un véhicule, modifier la période, voir le planning.' },
    { icon: 'car', title: 'Départs & retours', text: 'Départs immédiats, retours et constats sur l\'état du véhicule.' },
    { icon: 'alert', title: 'Signalements', text: 'Remonter un problème depuis le terrain en quelques secondes.' },
    { icon: 'chart', title: 'Bilans kilométriques', text: 'Suivre l\'usage de la flotte avec des filtres métier.' },
    { icon: 'bell', title: 'Notifications', text: 'Prévenir les bonnes personnes au bon moment.' },
    { icon: 'shield', title: 'Rôles & RGPD', text: 'Admin / super-admin, archivage, anonymisation des données.' },
  ],

  stack: [
    { title: 'Web & API', items: ['Symfony', 'PHP', 'Doctrine', 'Stimulus', 'AssetMapper'] },
    { title: 'Mobile', items: ['Flutter', 'Dart'] },
    { title: 'Sécurité', items: ['API REST', 'JWT', 'Rôles'] },
    { title: 'Données & outils', items: ['MySQL', 'Docker', 'Git'] },
    { title: 'Qualité', items: ['Tests unitaires', 'Golden tests', 'PHPUnit'] },
  ],
}

export const diplomas = [
  {
    title: 'BTS SIO — Services Informatiques aux Organisations',
    school: 'Formation en cours',
    date: '2025 – 2027',
    points: ['Développement web et mobile', 'Bases de données et SQL', 'Travail en mode projet'],
  },
  {
    title: 'Baccalauréat général',
    school: 'Spécialités NSI / Mathématiques',
    date: '2025',
    points: ['Numérique et Sciences Informatiques : premiers programmes en Python', 'Mathématiques : logique et raisonnement'],
  },
  {
    title: 'Brevet des collèges',
    school: 'Diplôme national',
    date: '2022',
    points: [],
  },
]

export const interests = ['Musique', 'Natation', 'Jeux vidéo']

// Texte qui défile dans le bandeau bleu en bas de page
export const marquee = [
  'DÉVELOPPEUR WEB & MOBILE',
  'SYMFONY',
  'FLUTTER',
  'PHP',
  'SQL',
  'À LA RECHERCHE DE MON PROCHAIN STAGE',
]
