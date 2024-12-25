<template>
    <div class="filter-buttons">
        <button v-for="(filter, index) in filters" :key="filter.value" @click="setFilter(filter.value)"
            :class="['filter-button fade-in', { active: activeFilter === filter.value }]" :style="`--delay: ${index};`">
            {{ filter.label }}
        </button>
    </div>
    <div class="projects-container">
        <div class="project-card fade-in" v-for="(project, index) in filteredProjects" :key="project.id"
            :style="`--delay: ${index + filters.length};`">
            <img :src="project.image" :alt="project.title" class="project-image" />
            <div class="project-details">
                <h2>{{ project.title }}</h2>
                <h3>{{ project.categorie }}</h3>
                <div class="statusversion">
                    <div class="status"
                        :class="project.status === 'Terminé' ? 'status-completed' : 'status-in-progress'">
                        {{ project.status }}
                    </div>
                    <div class="version" v-if="project.status === 'Terminé'">
                        {{ project.version }}
                    </div>
                </div>
                <div class="description-container" :class="{ expanded: project.showFullDescription }">
                    <p>
                        {{ project.showFullDescription ? project.description : truncatedText(project.description) }}
                    </p>
                </div>
                <button class="toggle-button" @click="toggleDescription(project)">
                    {{ project.showFullDescription ? "Voir moins" : "Voir plus" }}
                </button>
                <div class="tags">
                    <span v-for="tag in project.tags" :key="tag" :class="['tag', getTagClass(tag)]">
                        {{ tag }}
                    </span>
                </div>
                <div class="icon-links">
                    <a v-if="project.github" :href="project.github" target="_blank" rel="noopener noreferrer" class="icon-link">
                        <i class="devicon-github-plain"></i>
                    </a>
                    <a v-if="project.website" :href="project.website" target="_blank" rel="noopener noreferrer" class="icon-link">
                        <i class="devicon-firefox-plain"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import botdiscord from "@/assets/images/bot-discord.png";
import saestarwars from "@/assets/images/sae-starwars.png";

export default {
    name: "Projects",
    data() {
        return {
            projects: [
                {
                    id: 1,
                    title: "Sae StarWars",
                    image: saestarwars,
                    categorie: "Projet Scolaire",
                    status: "En cours",
                    version: "v1.0",
                    description:
                        "Le projet Guide du voyageur galactique est une initiative réalisée dans le cadre de la SAÉ du semestre 3 de l'année 2024-25, inspirée de l'univers de Star Wars. Il vise à développer une application permettant aux voyageurs interstellaires de planifier des itinéraires optimaux entre les planètes en fonction de divers critères.",
                    tags: [
                        "HTML",
                        "CSS",
                        "JavaScript",
                        "C",
                        "JAVA",
                        "PHP",
                        "SQL",
                    ],
                    github: null,
                    website: "https://abdelrahimriche.com/sae-starwars/",
                },
                {
                    id: 2,
                    title: "Bot Discord",
                    image: botdiscord,
                    categorie: "Projet Client",
                    status: "En cours",
                    version: "v1.0",
                    description:
                        "Bot Discord développé pour automatiser et améliorer la gestion d'une communauté en ligne Intègrant des fonctionnalités avancées. Conçu en JavaScript avec la bibliothèque Discord.js, il est optimisé pour offrir une expérience utilisateur fluide. Bot toujours en cours de développement.",
                    tags: [
                        "JavaScript",
                        "Discord.js",
                        "Node.js",
                    ],
                    github: "https://github.com/AbdelRMB/bot-discord",
                    website: null,
                },
                {
                    id: 3,
                    title: "Lib UI Pour FiveM",
                    status: "Terminé",
                    version: "v1.0",
                    image: botdiscord,
                    description:
                        "Lib UI Pour FiveM, bibliothèque personnalisée destinée aux développeurs de serveurs FiveM. Elle offre une solution intuitive et performante pour créer des interfaces utilisateur modernes et dynamiques. Conçue avec Lua pour l'intégration serveur, JavaScript pour les interactions, et Vue.js pour la structure front-end, cette bibliothèque permet de gérer efficacement des menus. Son objectif est de simplifier le processus de développement tout en offrant une expérience utilisateur fluide et esthétiquement agréable, adaptée aux besoins des serveurs de jeu.",
                    categorie: "Projet Perso",
                    tags: [
                        "Lua",
                        "JavaScript",
                        "Vue.js",
                    ],
                    github: "https://github.com/AbdelRMB/AbdelRMBUI",
                    website: null,
                },
                {
                    id: 4,
                    title: "Lib Notif Pour FiveM",
                    image: botdiscord,
                    categorie: "Projet Perso",
                    status: "Terminé",
                    version: "v1.0",
                    description:
                        "Lib Notif Pour FiveM, bibliothèque personnalisée conçue pour faciliter la gestion des notifications dans les serveurs FiveM. Cette solution offre des notifications interactives et esthétiques qui peuvent être configurées en fonction des besoins spécifiques des serveurs. Développée avec Lua pour une intégration serveur fluide, JavaScript pour des interactions dynamiques, et Vue.js pour un rendu visuel moderne, cette bibliothèque permet aux développeurs de créer des messages contextuels, des alertes, et des feedbacks utilisateur avec facilité. Elle vise à améliorer l'expérience utilisateur tout en simplifiant la personnalisation et l'implémentation côté développeur.",
                    tags: [
                        "Lua",
                        "JavaScript",
                        "Vue.js",
                    ],
                    github: "https://github.com/AbdelRMB/AbdelRMB-Notify",
                    website: null,
                },
                {
                    id: 5,
                    title: "Benny's Job Pour FiveM",
                    image: botdiscord,
                    categorie: "Projet Perso",
                    status: "Terminé",
                    version: "v1.0",
                    description:
                        "Benny's Job Pour FiveM est une ressource personnalisée destinée aux serveurs FiveM, permettant de gérer un métier immersif et dynamique pour les garages et mécaniciens. Ce système offre des fonctionnalités avancées telles que la réparation de véhicules et la gestion des commandes client directement en jeu. Développé avec Lua pour une intégration serveur efficace, JavaScript pour des interactions en temps réel, et Vue.js pour des interfaces utilisateur intuitives, ce projet vise à enrichir l'expérience de jeu tout en offrant aux développeurs une solution facile à configurer et à personnaliser. Idéal pour les serveurs roleplay, Benny's Job garantit une immersion totale et une gestion professionnelle des garages.",
                    tags: [
                        "Lua",
                        "JavaScript",
                        "Vue.js",
                    ],
                    github: "https://github.com/AbdelRMB/AbdelRMB-Bennysjob",
                    website: null,
                },
                {
                    id: 6,
                    title: "F5 Menu Pour FiveM",
                    image: botdiscord,
                    categorie: "Projet Client",
                    status: "Terminé",
                    version: "v1.0",
                    description:
                        "F5 Menu Pour FiveM est une ressource personnalisée conçue pour simplifier et améliorer la gestion des interactions en jeu sur les serveurs FiveM. Ce menu contextuel est accessible via une simple touche et offre une interface intuitive pour effectuer diverses actions telles que la gestion des joueurs, l'accès à l'inventaire, ou encore les interactions avec les joueurs et véhicules. Développé avec Lua pour une logique serveur robuste, JavaScript pour des fonctionnalités interactives fluides, et Vue.js pour une interface utilisateur moderne, ce projet vise à offrir une expérience fluide et pratique tant pour les joueurs que pour les administrateurs. Entièrement configurable, F5 Menu s'adapte aux besoins de chaque serveur et améliore considérablement la qualité du gameplay roleplay.",
                    tags: [
                        "Lua",
                        "JavaScript",
                        "Vue.js",
                    ],
                    github: "https://github.com/AbdelRMB/AbdelRMB_F5Menu",
                    website: null,
                },
                {
                    id: 7,
                    title: "Menu Report Pour FiveM",
                    status: "Terminé",
                    image: botdiscord,
                    categorie: "Projet Perso",
                    version: "v1.0",
                    description:
                        "Menu Report Pour FiveM est une ressource clé destinée aux serveurs FiveM, conçue pour optimiser la gestion des signalements et améliorer la communication entre les joueurs et les administrateurs. Accessible via une interface intuitive, ce menu permet aux joueurs de soumettre des rapports détaillés sur des incidents en jeu, tels que des comportements inappropriés ou des bugs, directement aux administrateurs. Développé avec Lua pour une intégration serveur performante, JavaScript pour des interactions en temps réel, et Vue.js pour une interface utilisateur moderne, ce projet garantit une gestion efficace des signalements. Configurable et simple à utiliser, Menu Report renforce l'engagement communautaire tout en facilitant la modération et le support sur les serveurs roleplay.",
                    tags: [
                        "Lua",
                        "JavaScript",
                        "Vue.js",
                    ],
                    github: "https://github.com/AbdelRMB/MenuReport",
                    website: null,
                }
            ],
            filters: [
                { label: "Tous", value: "all" },
                { label: "Scolaire", value: "Projet Scolaire" },
                { label: "Client", value: "Projet Client" },
                { label: "Perso", value: "Projet Perso" },
            ],
            activeFilter: "all",
            tagColors: {
                JavaScript: "tag-yellow",
                React: "tag-blue",
                "NextJs": "tag-purple",
                "Tailwind CSS": "tag-teal",
                "Redux Toolkit": "tag-red",
                Stripe: "tag-green",
                "ShadCN UI": "tag-pink",
                Recharts: "tag-orange",
                "React-PDF": "tag-cyan",
                Cryptomonnaie: "tag-gold",
                Zod: "tag-indigo",
                "Next Auth": "tag-lightblue",
                "Discord.js": "tag-discord",
                "Node.js": "tag-vue",
                Lua: "tag-blue",
                HTML: "tag-orange",
                CSS: "tag-css",
                PHP: "tag-php",
                SQL: "tag-sql",
                C: "tag-c",
                JAVA: "tag-java",
                "Vue.js": "tag-vue",
            },
        };
    },
    methods: {
        getTagClass(tag) {
            return this.tagColors[tag] || "tag-default";
        },
        setFilter(filter) {
            this.activeFilter = filter;
        },
        toggleDescription(project) {
            project.showFullDescription = !project.showFullDescription;
        },
        truncatedText(text) {
            const maxLength = 100;
            return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
        },
    },
    computed: {
        filteredProjects() {
            if (this.activeFilter === "all") {
                return this.projects;
            }
            return this.projects.filter(
                (project) => project.categorie === this.activeFilter
            );
        },
    },
};
</script>

<style scoped>
.icon-links {
    display: flex;
    border-radius: 8px;
    transition: transform 0.3s ease;
    position: relative;
}

.icon-link {
    font-size: 25px;
    transition: transform 0.3s ease;
    background-color: #2a002a;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    border: 1px solid #4d004d;
    color: #fff;
    transition: 0.2s;
    text-decoration: none;
    padding: 5px 15px;
    padding-top: 10px;
    border-radius: 8px;
}

.icon-link:hover {
    color: #ff80ab;
}

.statusversion {
    display: flex;
    gap: 10px;
}

.version {
    padding: 5px 10px;
    border-radius: 5px;
    display: inline-block;
    color: #fff;
    background-color: #4caf5056;
    border: 1px solid #4caf50;
}

.status {
    padding: 5px 10px;
    border-radius: 5px;
    display: inline-block;
}

.status-completed {
    color: #fff;
    background-color: #4caf5056;
    border: 1px solid #4caf50;
}

.status-in-progress {
    color: #fff;
    background-color: #ff980056;
    border: 1px solid #ff9800;
}

.projects-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 20px;
    padding: 25px 200px;
    background-color: #1d001d;
}

.project-card {
    background-color: #2a002a;
    color: #ffffff;
    padding: 20px;
    margin: 20px;
    width: calc(45% - 40px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid #4d004d;
}

.project-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

.project-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
}

.project-details {
    padding: 10px;
}

.project-details h2 {
    font-size: 24px;
}

.project-details h3 {
    margin-top: 10px;
    color: #ff80ab;
}

.project-details p {
    font-size: 16px;
    line-height: 1.6;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
}

.tag {
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 14px;
    color: #ffffff;
}

.tag-yellow {
    background-color: #f7de1e56;
    border: 1px solid #f7df1e;
}

.tag-blue {
    background-color: #005b7456;
    border: 1px solid #005a74;
}

.tag-sql {
    background-color: #70007056;
    border: 1px solid #700070;
}

.tag-purple {
    background-color: #6e5cc056;
    border: 1px solid #6e5cc0;
}

.tag-teal {
    background-color: #38b2ac;
}

.tag-red {
    background-color: #e53e3e;
}

.tag-vue {
    background-color: #00864e56;
    border: 1px solid #00864e;
}

.tag-c {
    background-color: #a8b9cc56;
    border: 1px solid #a8b9cc;
}

.tag-pink {
    background-color: #ed64a6;
}

.tag-orange {
    background-color: #f6ae5556;
    border: 1px solid #f6ad55;
}

.tag-php {
    background-color: #8892bf56;
    border: 1px solid #8892bf;
}

.tag-java {
    background-color: #f8982056;
    border: 1px solid #f89820;
}

.tag-cyan {
    background-color: #319795;
}

.tag-gold {
    background-color: #d4af37;
}

.tag-indigo {
    background-color: #5a67d8;
}

.tag-css {
    background-color: #5a67d856;
    border: 1px solid #5a67d8;
}

.tag-lightblue {
    background-color: #63b3ed;
}

.tag-default {
    background-color: #444444;
}

.tag-discord {
    background-color: #7289da56;
    border: 1px solid #7289da;
}

.continue-button:hover {
    background-color: #ff80ab;
    color: #1e1e1e;
}

.filter-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.filter-button {
    background-color: #2a002a;
    color: #ffffff;
    padding: 10px 20px;
    border: 1px solid #4d004d;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.filter-button.active {
    background-color: #ff80ab;
    color: #1d001d;
}

.filter-button:hover {
    background-color: #ff80ab;
    color: #1d001d;
}

.description-container {
    max-height: 4.5em;
    /* Hauteur pour 3 lignes */
    overflow: hidden;
    transition: max-height 0.4s ease, opacity 0.4s ease;
    opacity: 0.7;
}

.description-container.expanded {
    max-height: 1000px;
    /* Grande valeur pour montrer tout le contenu */
    opacity: 1;
}

.toggle-button {
    background: transparent;
    border: none;
    color: #ff80ab;
    font-size: 14px;
    cursor: pointer;
    padding: 0;
    padding-bottom: 20px;
}

.toggle-button:hover {
    text-decoration: underline;
}

/* Responsive Adjustments */
@media (max-width: 1140px) {
    .projects-container {
        gap: 15px;
        padding: 10px;
    }

    .project-card {
        width: calc(100% - 40px);
    }

    .project-details h2 {
        font-size: 20px;
    }

    .project-details h3 {
        font-size: 18px;
    }

    .project-details p {
        font-size: 14px;
    }

    .tags .tag {
        font-size: 12px;
    }
}

@media (max-width: 1400px) {
    .projects-container {
        padding: 25px 5px;
    }
}

@media (max-width: 768px) {
    .project-card {
        padding: 15px;
    }

    .tags {
        gap: 8px;
    }

    .continue-button {
        font-size: 14px;
        padding: 8px 16px;
    }

    .filter-buttons {
        flex-direction: column;
        align-items: center;
    }

    .filter-button {
        width: 200px;
    }
}

.none {
    opacity: 0;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    opacity: 0;
    animation: fadeIn 0.7s ease-out forwards;
    animation-delay: calc(var(--delay, 0) * 0.1s);
}
</style>