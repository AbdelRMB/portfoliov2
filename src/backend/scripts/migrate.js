import sequelize from '../config/database.js';
import Project from '../models/Project.js';

// Données existantes à migrer - tous les projets du portfolio
const projectsData = [
  {
    title: "O.R.B.I.T",
    image: "/assets/images/orbit.png",
    categorie: "Projet Scolaire",
    specialite: "Web",
    status: "Terminé",
    version: "v1.0",
    description: "Le projet ORBIT est une initiative réalisée dans le cadre de la SAÉ du semestre 3 de l'année 2024-25, inspirée de l'univers de Star Wars. Il vise à développer une application permettant aux voyageurs interstellaires de planifier des itinéraires optimaux entre les planètes en fonction de divers critères.",
    tags: ["HTML", "CSS", "JavaScript", "C", "JAVA", "PHP", "SQL"],
    github: "https://github.com/AbdelRMB/sae-starwars",
    website: "https://orbit.abdelrahimriche.com",
    screenshots: [
      { src: '/assets/images/orbit/login.png', title: "Page login", alt: "Page login" },
      { src: '/assets/images/orbit/signup.png', title: "Page inscription", alt: "Page inscription" },
      { src: '/assets/images/orbit/accueil.png', title: "Page accueil", alt: "Page accueil" },
      { src: '/assets/images/orbit/compte.png', title: "Page compte", alt: "Page compte" },
      { src: '/assets/images/orbit/map.png', title: "Page carte", alt: "Page carte" },
      { src: '/assets/images/orbit/info_trafic.png', title: "Page info trafic", alt: "Page info trafic" },
      { src: '/assets/images/orbit/planif_voyage.png', title: "Page planification voyage", alt: "Page planification voyage" },
      { src: '/assets/images/orbit/planif_taxi.png', title: "Page planification taxi", alt: "Page planification taxi" },
      { src: '/assets/images/orbit/chargement.png', title: "Page de chargement", alt: "Page de chargement" },
      { src: '/assets/images/orbit/ticket.png', title: "Ticket de voyage", alt: "Ticket de voyage" },
      { src: '/assets/images/orbit/chat-bot.png', title: "ChatBot", alt: "ChatBot" }
    ],
    actions: [
      { description: "Conception de site basée sur PHP et SQL" },
      { description: "Création d'une interface utilisateur moderne et responsive, optimisée pour le mobile et intuitive" },
      { description: "Intégration de fonctionnalités avancées pour améliorer l'expérience utilisateur" },
      { description: "Mise en place d'un système de compte" },
      { description: "Optimisation du code via des algorithmes tels que dijkstra" },
      { description: "Tests approfondis pour garantir la performance et la sécurité du site" },
      { description: "Intégration d'un chatbot pour aider les utilisateurs dans leurs recherches" },
      { description: "Création d'une page de chargement pour améliorer l'expérience utilisateur" }
    ],
    resultat: "Le livrable final est un site web fonctionnel et esthétique, permettant aux utilisateurs de planifier leurs voyages interstellaires de manière efficace et intuitive. Le projet a été bien reçu par les enseignants et les étudiants, et a suscité un grand intérêt pour son approche innovante.",
    challenges: [
      { description: "Maintenir la cohérence graphique sur tous les appareils" },
      { description: "Équilibrer animations modernes et rapidité du site" },
      { description: "Anticiper les ajouts futurs de contenu" },
      { description: "Intégrer un chatbot pour aider les utilisateurs dans leurs recherches" },
      { description: "Gérer la sécurité des données utilisateurs" }
    ],
    apprentissages: [
      { description: "Approfondissement de mes compétences en développement web" },
      { description: "Compréhension des enjeux de l'UX/UI design dans le développement web" },
      { description: "Gestion de projet et collaboration avec une équipe pour atteindre des objectifs communs" }
    ],
    isVisible: true,
    order: 1
  },
  {
    title: "Bot Discord",
    image: "/assets/images/discord.png",
    categorie: "Projet Client",
    specialite: "Discord",
    status: "Terminé",
    version: "v1.0",
    description: "Bot Discord développé pour automatiser et améliorer la gestion d'une communauté en ligne Intègrant des fonctionnalités avancées. Conçu en JavaScript avec la bibliothèque Discord.js, il est optimisé pour offrir une expérience utilisateur fluide. Bot toujours en cours de développement.",
    tags: ["JavaScript", "Discord.js", "Node.js"],
    github: "https://github.com/AbdelRMB/bot-discord",
    website: null,
    screenshots: [],
    actions: [],
    resultat: "",
    challenges: [],
    apprentissages: [],
    isVisible: true,
    order: 2
  },
  {
    title: "Lib UI",
    image: "/assets/images/bot-discord.png",
    categorie: "Projet Perso",
    specialite: "FiveM",
    status: "Terminé",
    version: "v1.0",
    description: "Lib UI Pour FiveM, bibliothèque personnalisée destinée aux développeurs de serveurs FiveM. Elle offre une solution intuitive et performante pour créer des interfaces utilisateur modernes et dynamiques. Conçue avec Lua pour l'intégration serveur, JavaScript pour les interactions, et Vue.js pour la structure front-end, cette bibliothèque permet de gérer efficacement des menus. Son objectif est de simplifier le processus de développement tout en offrant une expérience utilisateur fluide et esthétiquement agréable, adaptée aux besoins des serveurs de jeu.",
    tags: ["Lua", "JavaScript", "Vue.js"],
    github: "https://github.com/AbdelRMB/AbdelRMBUI",
    website: null,
    screenshots: [],
    actions: [],
    resultat: "",
    challenges: [],
    apprentissages: [],
    isVisible: true,
    order: 3
  },
  {
    title: "Lib Notif",
    image: "/assets/images/bot-discord.png",
    categorie: "Projet Perso",
    specialite: "FiveM",
    status: "Terminé",
    version: "v1.0",
    description: "Lib Notif Pour FiveM, bibliothèque personnalisée conçue pour faciliter la gestion des notifications dans les serveurs FiveM. Cette solution offre des notifications interactives et esthétiques qui peuvent être configurées en fonction des besoins spécifiques des serveurs. Développée avec Lua pour une intégration serveur fluide, JavaScript pour des interactions dynamiques, et Vue.js pour un rendu visuel moderne, cette bibliothèque permet aux développeurs de créer des messages contextuels, des alertes, et des feedbacks utilisateur avec facilité. Elle vise à améliorer l'expérience utilisateur tout en simplifiant la personnalisation et l'implémentation côté développeur.",
    tags: ["Lua", "JavaScript", "Vue.js"],
    github: "https://github.com/AbdelRMB/AbdelRMB-Notify",
    website: null,
    screenshots: [],
    actions: [],
    resultat: "",
    challenges: [],
    apprentissages: [],
    isVisible: true,
    order: 4
  },
  {
    title: "Benny's Job",
    image: "/assets/images/bot-discord.png",
    categorie: "Projet Perso",
    specialite: "FiveM",
    status: "Terminé",
    version: "v1.0",
    description: "Benny's Job Pour FiveM est une ressource personnalisée destinée aux serveurs FiveM, permettant de gérer un métier immersif et dynamique pour les garages et mécaniciens. Ce système offre des fonctionnalités avancées telles que la réparation de véhicules et la gestion des commandes client directement en jeu. Développé avec Lua pour une intégration serveur efficace, JavaScript pour des interactions en temps réel, et Vue.js pour des interfaces utilisateur intuitives, ce projet vise à enrichir l'expérience de jeu tout en offrant aux développeurs une solution facile à configurer et à personnaliser. Idéal pour les serveurs roleplay, Benny's Job garantit une immersion totale et une gestion professionnelle des garages.",
    tags: ["Lua", "JavaScript", "Vue.js", "SQL"],
    github: "https://github.com/AbdelRMB/AbdelRMB-Bennysjob",
    website: null,
    screenshots: [],
    actions: [],
    resultat: "",
    challenges: [],
    apprentissages: [],
    isVisible: true,
    order: 5
  },
  {
    title: "F5 Menu",
    image: "/assets/images/bot-discord.png",
    categorie: "Projet Client",
    specialite: "FiveM",
    status: "Terminé",
    version: "v1.0",
    description: "F5 Menu Pour FiveM est une ressource personnalisée conçue pour simplifier et améliorer la gestion des interactions en jeu sur les serveurs FiveM. Ce menu contextuel est accessible via une simple touche et offre une interface intuitive pour effectuer diverses actions telles que la gestion des joueurs, l'accès à l'inventaire, ou encore les interactions avec les joueurs et véhicules. Développé avec Lua pour une logique serveur robuste, JavaScript pour des fonctionnalités interactives fluides, et Vue.js pour une interface utilisateur moderne, ce projet vise à offrir une expérience fluide et pratique tant pour les joueurs que pour les administrateurs. Entièrement configurable, F5 Menu s'adapte aux besoins de chaque serveur et améliore considérablement la qualité du gameplay roleplay.",
    tags: ["Lua", "JavaScript", "Vue.js", "SQL"],
    github: "https://github.com/AbdelRMB/AbdelRMB_F5Menu",
    website: null,
    screenshots: [],
    actions: [],
    resultat: "",
    challenges: [],
    apprentissages: [],
    isVisible: true,
    order: 6
  },
  {
    title: "Menu Report",
    image: "/assets/images/bot-discord.png",
    categorie: "Projet Perso",
    specialite: "FiveM",
    status: "Terminé",
    version: "v1.0",
    description: "Menu Report Pour FiveM est une ressource clé destinée aux serveurs FiveM, conçue pour optimiser la gestion des signalements et améliorer la communication entre les joueurs et les administrateurs. Accessible via une interface intuitive, ce menu permet aux joueurs de soumettre des rapports détaillés sur des incidents en jeu, tels que des comportements inappropriés ou des bugs, directement aux administrateurs. Développé avec Lua pour une intégration serveur performante, JavaScript pour des interactions en temps réel, et Vue.js pour une interface utilisateur moderne, ce projet garantit une gestion efficace des signalements. Configurable et simple à utiliser, Menu Report renforce l'engagement communautaire tout en facilitant la modération et le support sur les serveurs roleplay.",
    tags: ["Lua", "JavaScript", "Vue.js", "SQL"],
    github: "https://github.com/AbdelRMB/MenuReport",
    website: null,
    screenshots: [],
    actions: [],
    resultat: "",
    challenges: [],
    apprentissages: [],
    isVisible: true,
    order: 7
  },
  {
    title: "Prestiges Paris Entreprise",
    image: "/assets/images/prestigesparis.png",
    categorie: "Projet Client",
    specialite: "Web",
    status: "Terminé",
    version: "v1.0",
    description: "Site Web pour une entreprise de Shooting photo en cours de réalisation.",
    tags: ["HTML", "JavaScript", "Vue.js", "Tailwind CSS", "CSS"],
    github: null,
    website: "https://prestigesparis.com",
    screenshots: [],
    actions: [],
    resultat: "",
    challenges: [],
    apprentissages: [],
    isVisible: true,
    order: 8
  },
  {
    title: "UNESCO",
    image: "/assets/images/bot-discord.png",
    categorie: "Projet Scolaire",
    specialite: "Web",
    status: "Terminé",
    version: "v1.0",
    description: "Site Web en partenariat avec l'UNESCO réalisé en première année de BUT Informatique sur le patrimoine mondial de la ville de Séville.",
    tags: ["HTML", "JavaScript", "CSS", "PHP", "SQL"],
    github: "https://github.com/AbdelRMB/unesco",
    website: "https://unesco.abdelrahimriche.com",
    screenshots: [],
    actions: [],
    resultat: "",
    challenges: [],
    apprentissages: [],
    isVisible: true,
    order: 9
  },
  {
    title: "Chat Bot",
    image: "/assets/images/bot-discord.png",
    categorie: "Projet Client",
    specialite: "Web",
    status: "Terminé",
    version: "v1.0",
    description: "Chat Bot développé lors d'un stage chez IFFEN permettant aux utilisateurs de pouvoir être guider à travers leurs navigation sur le site de l'entreprise. Afin de répondre à leurs questions et de les aider dans leurs recherches, j'ai implémenter la distance de Levenstein facilitant la compréhension du bot.",
    tags: ["HTML", "JavaScript", "CSS"],
    github: "https://github.com/AbdelRMB/bot-chat",
    website: "https://chat-bot.abdelrahimriche.com",
    screenshots: [],
    actions: [],
    resultat: "",
    challenges: [],
    apprentissages: [],
    isVisible: true,
    order: 10
  },
  {
    title: "Banque site",
    image: "/assets/images/bot-discord.png",
    categorie: "Projet Scolaire",
    specialite: "Web",
    status: "Terminé",
    version: "v1.0",
    description: "Projet scolaire visant à développer un site permettant la gestion de compte d'une banque et de ces usagers (impayés, solde, export des données etc...).",
    tags: ["HTML", "JavaScript", "CSS", "PHP", "SQL"],
    github: null,
    website: "https://banque.abdelrahimriche.com",
    screenshots: [],
    actions: [],
    resultat: "",
    challenges: [],
    apprentissages: [],
    isVisible: true,
    order: 11
  },
  {
    title: "Hébergement WEB",
    image: "/assets/images/bot-discord.png",
    categorie: "Projet Perso",
    specialite: "Réseau",
    status: "Terminé",
    version: "v1.0",
    description: "Création de mon propre hébergement WEB sous VPS afin de pouvoir gérer complètement mes options et sécurité.",
    tags: ["Réseau"],
    github: null,
    website: null,
    screenshots: [],
    actions: [],
    resultat: "",
    challenges: [],
    apprentissages: [],
    isVisible: true,
    order: 12
  },
  {
    title: "WikiGame",
    image: "/assets/images/wikigame.png",
    categorie: "Projet Scolaire",
    specialite: "Web",
    status: "Terminé",
    version: "v1.0",
    description: "Création d'un jeu basée sur la lecture d'article Wikipédia.",
    tags: ["React", "HTML", "JavaScript", "CSS", "TypeScript", "Node.js", "Python"],
    github: "https://github.com/AbdelRMB/wikigame",
    website: "https://wikigame.abdelrahimriche.com",
    screenshots: [],
    actions: [],
    resultat: "",
    challenges: [],
    apprentissages: [],
    isVisible: true,
    order: 13
  },
  {
    title: "Still-Link",
    image: "/assets/images/stilllink/still-link.png",
    categorie: "Projet Professionnel",
    specialite: "Web",
    status: "En cours",
    version: "v1.0",
    description: "Refonte complète du site web de l'entreprise Still Link, passant de l'outil Odoo au code a un site coder, visant à moderniser l'image de l'entreprise, améliorer l'expérience utilisateur, et mettre enavant leurs services Internet, téléphonie, mobile et sécurité de manière plus attractive.",
    tags: ["HTML", "JavaScript", "CSS", "Vue.TS", "TypeScript", "Vite"],
    github: null,
    website: "https://www.still-link.com",
    screenshots: [
      { src: '/assets/images/stilllink/acc_old.png', title: "Ancienne page d'accueil", alt: "Ancienne page d'accueil" },
      { src: '/assets/images/stilllink/still-link.png', title: "Nouvelle page d'accueil", alt: "Nouvelle page d'accueil" },
      { src: '/assets/images/stilllink/old_forfait_mobile.png', title: "Ancienne page forfait mobile", alt: "Ancienne page forfait mobile" },
      { src: '/assets/images/stilllink/forfait_mobile.png', title: "Nouvelle page forfait mobile", alt: "Nouvelle page forfait mobile" },
      { src: '/assets/images/stilllink/old_formulaire_contact.png', title: "Ancien formulaire de contact", alt: "Ancien formulaire de contact" },
      { src: '/assets/images/stilllink/formulaire_contact.png', title: "Nouveau formulaire de contact", alt: "Nouveau formulaire de contact" }
    ],
    actions: [
      { description: "Conception d'une nouvelle architecture du site basée sur Vue et Vite.js" },
      { description: "Création d'une interface utilisateur moderne et responsive, optimisée pour le mobile" },
      { description: "Intégration de fonctionnalités avancées pour améliorer l'expérience utilisateur" },
      { description: "Mise en place d'un système de gestion de contenu pour faciliter les mises à jour futures" },
      { description: "Optimisation du référencement naturel (SEO) pour améliorer la visibilité en ligne" },
      { description: "Tests approfondis pour garantir la performance et la sécurité du site" }
    ],
    resultat: "Le nouveau site a revitalisé l'image de Still Link avec un design professionnel et engageant, une navigation améliorée et de meilleures performances mobiles.",
    challenges: [
      { description: "Maintenir la cohérence graphique sur tous les appareils" },
      { description: "Équilibrer animations modernes et rapidité du site" },
      { description: "Optimiser le SEO avec Vue" },
      { description: "Anticiper les ajouts futurs de contenu" }
    ],
    apprentissages: [
      { description: "Approfondissement de mes compétences en développement front-end avec Vue et Vite.js" },
      { description: "Compréhension des enjeux de l'UX/UI design dans le développement web" },
      { description: "Gestion de projet et collaboration avec une équipe pour atteindre des objectifs communs" },
      { description: "Importance du SEO dans la visibilité d'un site web" },
      { description: "Intégration de fonctionnalités avancées pour améliorer l'expérience utilisateur" }
    ],
    isVisible: true,
    order: 14
  },
  {
    title: "Template Boutique GTA RP",
    image: "/assets/images/bot-discord.png",
    categorie: "Projet Perso",
    specialite: "Web",
    status: "Terminé",
    version: "v1.0",
    description: "Template de site e-commerce inspiré de Tebex, conçu pour les serveurs GTA RP. Cette interface frontend moderne permet de présenter des packs, véhicules, grades ou services à vendre. Bien qu'aucun backend ne soit connecté, le design est entièrement responsive et pensé pour une intégration facile avec un futur système de paiement ou une API FiveM.",
    tags: ["HTML", "CSS", "TypeScript", "React.TS", "Tailwind CSS"],
    github: null,
    website: "https://tebex.abdelrahimriche.com",
    screenshots: [],
    actions: [
      { description: "Conception d'une interface utilisateur inspirée de Tebex" },
      { description: "Utilisation de Tailwind CSS pour une mise en page rapide et moderne" },
      { description: "Création de composants Vue réutilisables pour les articles et paniers" },
      { description: "Responsive design pour une expérience fluide sur mobile et PC" }
    ],
    resultat: "Un template moderne prêt à être connecté à une API ou une solution de paiement pour les serveurs GTA RP.",
    challenges: [
      { description: "Créer une interface professionnelle sans backend" },
      { description: "Reproduire les codes UX/UI d'une boutique type Tebex" },
      { description: "Anticiper les besoins futurs d'intégration serveur" }
    ],
    apprentissages: [
      { description: "Renforcement des compétences en design responsive avec Tailwind" },
      { description: "Structuration d'un projet React.TS sans backend" },
      { description: "Préparation d'un template pour une potentielle extension backend/API" }
    ],
    isVisible: true,
    order: 15
  },
  {
    title: "Photographie Pro - Site Vitrine",
    image: "/assets/images/prestigesparis.png",
    categorie: "Projet Pro",
    specialite: "Web",
    status: "Terminé",
    version: "v1.0",
    description: "Création d'un site vitrine moderne et responsive en React TypeScript pour une entreprise spécialisée en photographie événementielle, mariage et corporate. Le site permet de valoriser les prestations, d'afficher un portfolio dynamique, de publier des articles et de faciliter la prise de contact.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Strapi", "HTML", "CSS", "SEO"],
    github: null,
    website: "https://photographe.abdelrahimriche.com",
    screenshots: [],
    actions: [
      { description: "Développement d'un site en React + TypeScript avec une architecture modulaire" },
      { description: "Connexion à un CMS headless (Strapi) pour la gestion autonome des contenus" },
      { description: "Intégration d'un portfolio dynamique avec filtres par catégorie et visionneuse" },
      { description: "Ajout d'un formulaire de contact avec notifications email" },
      { description: "Mise en place d'un blog/actualités administrable via le CMS" },
      { description: "Respect du responsive design sur mobile/tablette/PC" },
      { description: "Optimisation SEO technique (balises, sitemap, performances)" }
    ],
    resultat: "Le site a permis de valoriser l'expertise du photographe, d'augmenter la prise de contact client et d'offrir une gestion simplifiée du contenu via une interface d'administration moderne.",
    challenges: [
      { description: "Création d'une galerie performante avec lazy loading et filtres" },
      { description: "Intégration d'un CMS sans compromettre les performances frontend" },
      { description: "Respect du RGPD (mentions légales, cookies)" }
    ],
    apprentissages: [
      { description: "Maîtrise de l'intégration d'un CMS headless avec React" },
      { description: "Optimisation avancée des performances web" },
      { description: "Mise en œuvre des bonnes pratiques SEO et accessibilité (WCAG)" }
    ],
    isVisible: true,
    order: 16
  },
  {
    title: "Remind Payment",
    image: "/assets/images/bot-discord.png",
    categorie: "Projet Perso",
    specialite: "Web",
    status: "Terminé",
    version: "v1.0",
    description: "Création d'un site web permettant de se donner un appercu général des abonnements.",
    tags: ["React", "JavaScript", "Tailwind CSS", "HTML", "CSS", "TypeScript", "Node.js"],
    github: null,
    website: "https://abonnement.abdelrahimriche.com",
    screenshots: [],
    actions: [
      { description: "Développement d'un site en React + JavaScript avec une architecture modulaire" },
      { description: "Intégration d'une interface utilisateur moderne et responsive, optimisée pour le mobile" },
      { description: "Création d'un système de gestion des abonnements" },
      { description: "Mise en place d'un système de notifications pour les rappels de paiement" },
      { description: "Optimisation du référencement naturel (SEO) pour améliorer la visibilité en ligne" },
      { description: "Tests approfondis pour garantir la performance et la sécurité du site" }
    ],
    resultat: "Le site a permis de gérer efficacement les abonnements et de recevoir des rappels de paiement, améliorant ainsi la gestion financière personnelle.",
    challenges: [
      { description: "Maintenir la cohérence graphique sur tous les appareils" },
      { description: "Équilibrer animations modernes et rapidité du site" },
      { description: "Anticiper les ajouts futurs de contenu" }
    ],
    apprentissages: [
      { description: "Approfondissement de mes compétences en développement web avec React et JavaScript" },
      { description: "Compréhension des enjeux de l'UX/UI design dans le développement web" },
      { description: "Gestion de projet et collaboration avec une équipe pour atteindre des objectifs communs" },
      { description: "Importance du SEO dans la visibilité d'un site web" },
      { description: "Intégration de fonctionnalités avancées pour améliorer l'expérience utilisateur" }
    ],
    isVisible: true,
    order: 17
  }
];

async function migrateData() {
  try {
    // Synchroniser la base de données
    await sequelize.sync({ force: true }); // force: true recrée les tables
    console.log('✅ Tables créées');

    // Insérer les données
    for (const projectData of projectsData) {
      await Project.create(projectData);
      console.log(`✅ Projet "${projectData.title}" créé`);
    }

    console.log('🎉 Migration terminée avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
  } finally {
    await sequelize.close();
  }
}

migrateData();
