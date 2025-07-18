import sequelize from './config/database.js';
import Project from './models/Project.js';

// Données existantes à migrer
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
  }
  // Ajoutez ici les autres projets...
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
