import { asset, routes } from './urls.js'

// Toutes les informations du portfolio sont ici : modifie ce fichier pour mettre à jour le site.

export const profile = {
  firstName: 'Sean',
  lastName: 'Thompson',
  title: 'Développeur Web & Mobile',
  role: 'Étudiant BTS SIO',
  availability: 'Disponible pour un stage de 6 semaines le 4 janvier 2027',
  status: 'DISPONIBLE_POUR_UN_STAGE',
  summary: [
    "Actuellement étudiant dans l'informatique, je suis doté d'une excellente attention aux détails et disponible pour travailler de manière flexible, y compris à distance.",
    "En BTS SIO, je conçois des sites web et des applications mobiles : de la modélisation des données jusqu'à l'API qui fait communiquer le tout.",
    "J'aime comprendre comment les choses fonctionnent, travailler en équipe et livrer un travail propre et soigné.",
  ],
  photo: asset('portrait.png'),
  cv: asset('cv-sean-thompson.pdf'),
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
  { value: '6', label: 'Semaines de disponibilité du 4 janvier au 13 février' },
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
    title: "Stage d'observation en école primaire",
    tasks: [
      "Observation de la méthodologie de l'enseignant en classe",
      "Découverte du métier d'enseignant et du fonctionnement d'une école",
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
    cover: asset('projects/wheello/cover.webp'),
    // Page dédiée au projet (contenu dans l'objet `wheello` plus bas)
    page: routes.wheello,
  },
  {
    title: 'Ce portfolio',
    subtitle: 'Projet personnel — 2026',
    text: 'Mon site personnel : une page unique, responsive, avec une petite scène 3D en arrière-plan et un terminal interactif.',
    tags: ['React', 'Vite', 'three.js', 'CSS'],
    category: 'WEB',
  },
]

// Contenu de la page dédiée au projet Wheello (route /wheello)
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
      { src: asset('projects/wheello/back-office-accueil.webp'), caption: 'Accueil du back-office' },
      { src: asset('projects/wheello/back-office-vehicules.webp'), caption: 'Gestion des véhicules et disponibilités' },
      { src: asset('projects/wheello/back-office-bilan-kilometrique.webp'), caption: 'Bilans kilométriques avec filtres' },
    ],
  },
  mobile: {
    title: "L'application mobile",
    audience: 'Pour les salariés sur le terrain',
    stack: 'Flutter · Dart',
    text: "Depuis leur téléphone, les salariés consultent les véhicules, réservent, déclarent un départ ou un retour et signalent un problème, sans passer par un ordinateur.",
    points: ['Consultation des véhicules disponibles', 'Réservation et modification de période', 'Déclaration de départ et de retour', 'Signalement d\'un problème sur un véhicule'],
    images: [
      { src: asset('projects/wheello/mobile-accueil.webp'), caption: 'Accueil et actions principales' },
      { src: asset('projects/wheello/mobile-reservations.webp'), caption: 'Suivi des réservations' },
      { src: asset('projects/wheello/mobile-modification-reservation.webp'), caption: "Modification d'une réservation" },
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

// Contenu de la page de veille technologique (route /veille)
// Pour ajouter une actualité : ajoute une ligne dans `timeline` (et sa source dans `sources`).
export const veille = {
  title: "L'IA au poignet",
  subject: "L'évolution de l'intégration de l'IA pour les données de santé et les objets connectés sportifs",
  question:
    "Comment l'intelligence artificielle transforme-t-elle l'exploitation des données de santé collectées par les objets connectés sportifs, et quelles règles encadrent cette évolution ?",
  updated: 'Octobre 2026',
  period: '2018 → 2026',

  // Comment je fais ma veille
  method: [
    { icon: 'globe', title: 'Sites spécialisés', text: "Presse tech et santé numérique (Wareable, MobiHealthNews, TechCrunch…) et sites officiels des fabricants." },
    { icon: 'shield', title: 'Sources officielles', text: 'Textes européens (EUR-Lex), décisions de la FDA, publications de la CNIL et du Health Data Hub.' },
    { icon: 'bell', title: 'Alertes', text: 'Alertes par mots-clés (« IA santé », « wearable », « AI Act ») pour être prévenu des nouveautés.' },
  ],

  // Les notions à connaître pour comprendre le sujet
  notions: [
    { term: 'Objet connecté sportif', text: 'Montre, bague ou bracelet qui mesure en continu le rythme cardiaque, le sommeil, l\'activité ou l\'oxygène dans le sang.' },
    { term: 'Donnée de santé', text: 'Pour le RGPD, le rythme cardiaque ou le sommeil sont des données de santé : une catégorie sensible, protégée plus fortement.' },
    { term: 'IA « qui détecte »', text: 'Un algorithme entraîné sur de nombreuses mesures repère un signe anormal (arythmie, apnée du sommeil, hypertension).' },
    { term: 'IA « qui conseille »', text: 'Une IA générative (GPT, Gemini…) lit tes données et te répond en langage naturel, comme un coach.' },
    { term: 'Dispositif médical', text: "Outil qui sert à diagnostiquer ou détecter une maladie. Il doit être autorisé (FDA aux États-Unis, marquage CE en Europe), contrairement à un simple outil « bien-être »." },
  ],

  // Les trois grandes étapes de l'évolution
  phases: [
    {
      label: 'ÉTAPE 1',
      title: 'Mesurer',
      years: 'Années 2010',
      text: "Les montres et bracelets comptent les pas, mesurent le cœur et le sommeil. L'utilisateur reçoit des chiffres et des graphiques, à lui de les interpréter.",
    },
    {
      label: 'ÉTAPE 2',
      title: 'Détecter',
      years: '2018 → 2025',
      text: "Des algorithmes d'apprentissage automatique repèrent des signes de maladie. Certaines fonctions sont autorisées comme dispositifs médicaux : ECG, apnée du sommeil, hypertension.",
    },
    {
      label: 'ÉTAPE 3',
      title: 'Conseiller',
      years: '2023 → aujourd\'hui',
      text: "Les IA génératives deviennent des coachs : on leur pose une question, elles lisent sommeil, récupération et entraînement, puis proposent un plan personnalisé.",
    },
  ],

  // Chronologie des faits marquants (du plus ancien au plus récent)
  timeline: [
    { date: 'Sept. 2018', tag: 'DÉTECTER', title: "L'Apple Watch obtient l'autorisation de la FDA pour son ECG", text: "Première montre grand public autorisée à faire un électrocardiogramme : la montre de sport devient aussi un outil de santé.", source: 'medcity' },
    { date: 'Janv. 2021', tag: 'MARCHÉ', title: 'Google finalise le rachat de Fitbit', text: "2,1 milliards de dollars : les géants du numérique veulent les données de santé et d'activité.", source: 'fitbit' },
    { date: 'Sept. 2023', tag: 'CONSEILLER', title: 'Whoop lance « Whoop Coach », propulsé par GPT-4', text: "L'un des premiers coachs conversationnels branchés sur les données d'un bracelet sportif.", source: 'whoop' },
    { date: 'Févr. 2024', tag: 'DÉTECTER', title: "La Galaxy Watch de Samsung détecte l'apnée du sommeil", text: "Première fonction de ce type autorisée par la FDA sur une montre connectée.", source: 'samsung' },
    { date: 'Sept. 2024', tag: 'DÉTECTER', title: "Apple suit avec la détection de l'apnée du sommeil", text: "La fonction analyse les mouvements de respiration pendant la nuit grâce à l'accéléromètre.", source: 'apnee' },
    { date: 'Mars 2025', tag: 'LOI', title: "L'Espace européen des données de santé entre en vigueur", text: "Le règlement (UE) 2025/327 donnera aux citoyens plus de contrôle sur leurs données de santé, avec une application par étapes à partir de 2027.", source: 'ehds' },
    { date: 'Mars 2025', tag: 'CONSEILLER', title: 'Garmin lance Connect+ et ses conseils par IA', text: "L'IA devient une fonction payante : un abonnement mensuel pour obtenir des analyses personnalisées.", source: 'garmin' },
    { date: 'Juil. 2025', tag: 'LOI', title: 'La FDA adresse un avertissement à Whoop', text: "Sa fonction d'estimation de la tension artérielle est jugée trop proche d'un dispositif médical non autorisé.", source: 'whoopfda' },
    { date: 'Sept. 2025', tag: 'DÉTECTER', title: "L'Apple Watch alerte en cas de signes d'hypertension", text: "Un algorithme d'apprentissage automatique analyse le capteur cardiaque sur 30 jours, disponible dans plus de 150 pays.", source: 'hypertension' },
    { date: 'Janv. 2026', tag: 'CONSEILLER', title: 'OpenAI annonce ChatGPT Health', text: "Un espace pour relier dossiers médicaux et applications comme Apple Health à ChatGPT. Il n'est pas ouvert dans l'Union européenne.", source: 'chatgpt' },
    { date: 'Janv. 2026', tag: 'LOI', title: 'La FDA assouplit les règles pour les objets « bien-être »', text: "Une mesure de tension utilisée pour le bien-être ne fait plus automatiquement de l'objet un dispositif médical.", source: 'whoopfda' },
    { date: 'Mai 2026', tag: 'CONSEILLER', title: "L'appli Fitbit devient Google Health, avec un coach Gemini", text: "Le coach lit les données de la montre, du sommeil ou d'une balance connectée et construit des plans personnalisés, sur abonnement.", source: 'google' },
    { date: 'Juin 2026', tag: 'LOI', title: "La FDA clôt le dossier Whoop", text: "Après modification de la fonction, l'agence n'engage pas de poursuites : la frontière santé / bien-être se déplace.", source: 'whoopfda' },
    { date: 'Juil. 2026', tag: 'LOI', title: "L'Europe reporte une partie de l'AI Act", text: "Le « Digital Omnibus » repousse à fin 2027 et 2028 les obligations des IA à haut risque, dont beaucoup d'outils de santé.", source: 'omnibus' },
    { date: 'Juil. 2026', tag: 'CONSEILLER', title: 'ChatGPT Health ouvert à tous les adultes aux États-Unis', text: "Médicaments, analyses, sommeil, activité : l'IA compare les résultats et résume les changements.", source: 'chatgpt2' },
  ],

  // Le cadre légal en Europe
  laws: [
    {
      name: 'RGPD',
      status: 'En vigueur depuis 2018',
      text: "Les données de santé (rythme cardiaque, sommeil, SpO₂…) sont une catégorie particulière : il faut un consentement explicite et une sécurité renforcée.",
    },
    {
      name: 'AI Act',
      status: 'Application progressive 2024 → 2028',
      text: "Classe les IA selon leur niveau de risque. Les IA médicales sont souvent « à haut risque » : gestion des risques, qualité des données, contrôle humain. Ces obligations sont reportées à fin 2027 et 2028.",
    },
    {
      name: 'EHDS',
      status: 'En vigueur depuis 2025, appliqué à partir de 2027',
      text: "L'Espace européen des données de santé facilite l'accès de chacun à ses données et leur réutilisation encadrée pour la recherche et l'entraînement d'IA.",
    },
  ],

  pros: [
    'Prévention : repérer tôt une arythmie, une apnée ou une hypertension',
    'Suivi en continu, pas seulement lors d\'une visite chez le médecin',
    'Conseils personnalisés pour l\'entraînement, la récupération et le sommeil',
    'Données plus faciles à partager avec un professionnel de santé',
  ],
  cons: [
    'Vie privée : des données très sensibles entre les mains de grandes entreprises',
    'Fiabilité : une IA générative peut se tromper ou inquiéter à tort',
    'Frontière floue entre conseil « bien-être » et diagnostic médical',
    'Fonctions IA de plus en plus réservées aux abonnements payants',
  ],

  // Mon regard de développeur
  analysis: [
    "L'IA est passée en quelques années de « je mesure » à « je détecte » puis à « je te conseille ». La valeur n'est plus dans le capteur mais dans l'interprétation des données, d'où les abonnements et le rachat de Fitbit par Google.",
    "L'Europe avance plus prudemment : ChatGPT Health n'y a pas été lancé et l'AI Act impose des règles fortes aux IA de santé, même si leur application a été repoussée. Les deux modèles, rapide aux États-Unis et encadré en Europe, cohabitent.",
    "En tant que développeur, ce sujet rejoint ce que j'apprends en BTS SIO : une API sécurisée (comme le JWT de Wheello), le respect du RGPD dès la conception, et des données fiables, car une IA n'est jamais meilleure que les données qu'on lui donne.",
  ],

  sources: {
    medcity: { label: "Apple gets first FDA clearance for retail ECG watch technology", site: 'MedCity News', date: '2018', url: 'https://medcitynews.com/2018/09/apples-gets-first-fda-clearance-for-retail-ecg-watch-technology/' },
    fitbit: { label: 'Google Completes $2.1 Billion Acquisition of Fitbit', site: 'Cleary Gottlieb', date: '2021', url: 'https://www.clearygottlieb.com/news-and-insights/news-listing/google-completes-2-1-billion-acquisition-of-fitbit' },
    whoop: { label: 'WHOOP unveils the new WHOOP Coach powered by OpenAI', site: 'WHOOP', date: '2023', url: 'https://www.whoop.com/us/en/press-center/whoop-unveils-the-new-whoop-coach-powered-by-openai/' },
    samsung: { label: "Samsung's Sleep Apnea Feature on Galaxy Watch First of Its Kind Authorized by US FDA", site: 'Samsung Newsroom', date: '2024', url: 'https://news.samsung.com/global/samsungs-sleep-apnea-feature-on-galaxy-watch-first-of-its-kind-cleared-by-us-fda' },
    apnee: { label: 'Apple Watch sleep apnea detection gets FDA approval', site: 'TechCrunch', date: '2024', url: 'https://techcrunch.com/2024/09/16/apple-watch-sleep-apnea-detection-gets-fda-approval' },
    ehds: { label: "Publication du règlement sur l'Espace européen des données de santé (EHDS)", site: 'Health Data Hub', date: '2025', url: 'https://www.health-data-hub.fr/actualites/publication-reglement-sur-lespace-europeen-des-donnees-de-sante-ehds' },
    garmin: { label: 'Garmin Connect gets a premium tier with AI insights', site: 'Wareable', date: '2025', url: 'https://www.wareable.com/garmin/garmin-connect-plus-announced-details-price' },
    whoopfda: { label: 'FDA closes warning letter to Whoop over blood pressure feature', site: 'MassDevice', date: '2026', url: 'https://www.massdevice.com/fda-closes-warning-letter-whoop-blood-pressure/' },
    hypertension: { label: 'Apple receives FDA nod for hypertension notification feature', site: 'MobiHealthNews', date: '2025', url: 'https://www.mobihealthnews.com/news/apple-receives-fda-nod-hypertension-notification-feature' },
    chatgpt: { label: 'Introducing ChatGPT Health', site: 'OpenAI', date: '2026', url: 'https://openai.com/index/introducing-chatgpt-health/' },
    google: { label: 'Google Health Coach : le rebranding de Fitbit et Gemini', site: 'WWWhat\'s new', date: '2026', url: 'https://wwwhatsnew.com/2026/05/10/google-health-coach-fitbit-app-rebrand-gemini-mayo-2026/' },
    omnibus: { label: 'IA Act : le calendrier des obligations haut risque officiellement reporté', site: 'Quantic Avocats', date: '2026', url: 'https://www.quantic-avocats.com/2026/07/22/ai-act-digital-omnibus-report-obligations-haut-risque/' },
    chatgpt2: { label: 'OpenAI relaunches Apple Health-connected ChatGPT feature with expanded access', site: '9to5Mac', date: '2026', url: 'https://9to5mac.com/2026/07/23/openai-relaunches-apple-health-connected-chatgpt-feature-with-expanded-access/' },
    aiact: { label: 'AI Act : quels impacts pour la santé ?', site: 'Dastra', date: '2025', url: 'https://www.dastra.eu/fr/blog/ai-act-quels-impacts-pour-la-sante/60044' },
  },
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

// Les textes de la page /entreprise ne sont pas ici : ils sont traduits par Symfony
// dans translations/entreprise.fr.yaml (français) et translations/entreprise.en.yaml (anglais).
