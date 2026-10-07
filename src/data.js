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
    title: 'Réservation de voitures',
    subtitle: 'Projet de stage — 2026',
    text: "Service complet de réservation de véhicules : un site web, une application mobile et une API qui les fait communiquer, alimentés par des données de test modélisées.",
    tags: ['Site web', 'Application mobile', 'API', 'Base de données'],
    category: 'WEB · MOBILE',
  },
  {
    title: 'Ce portfolio',
    subtitle: 'Projet personnel — 2026',
    text: 'Mon site personnel : une page unique, responsive, avec une petite scène 3D en arrière-plan et un terminal interactif.',
    tags: ['React', 'Vite', 'three.js', 'CSS'],
    category: 'WEB',
  },
]

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
