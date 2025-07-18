<template>
    <div class="filter-buttons">
        <button v-for="(filter, index) in filters" :key="filter.value" @click="setFilter(filter.value)"
            :class="['filter-button fade-in', { active: activeFilter === filter.value }]" :style="`--delay: ${index};`">
            {{ filter.label }}
        </button>
    </div>
    <div class="projects-stats">
        <span class="fade-in" :style="`--delay: ${index};`">Total des projets : {{ totalProjects }}</span>
        <span class="fade-in" :style="`--delay: ${index};`">Projets terminés : {{ completedProjects }}</span>
        <span class="fade-in" :style="`--delay: ${index};`">Projets en cours : {{ inProgressProjects }}</span>
    </div>
    <div class="projects-container">
        <div class="project-card fade-in" v-for="(project, index) in filteredProjects" :key="project.id"
            :style="`--delay: ${index + filters.length};`">
            <img :src="project.image" :alt="project.title" class="project-image" />
            <div class="project-details">
                <h2>{{ project.title }}</h2>
                <h3>{{ project.categorie }}</h3>
                <div class="statusversion">
                    <div class="specialite fivem" v-if="project.spécialité === 'FiveM'">
                        {{ project.spécialité }}
                    </div>
                    <div class="specialite web" v-if="project.spécialité === 'Web'">
                        {{ project.spécialité }}
                    </div>
                    <div class="specialite discord" v-if="project.spécialité === 'Discord'">
                        {{ project.spécialité }}
                    </div>
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
                    <a v-if="project.github" :href="project.github" target="_blank" rel="noopener noreferrer"
                        class="icon-link">
                        <i class="devicon-github-plain"></i>
                    </a>
                    <a v-if="project.website" :href="project.website" target="_blank" rel="noopener noreferrer"
                        class="icon-link">
                        <i class="devicon-firefox-plain"></i>
                    </a>
                    <router-link :to="`/project/${slugify(project.title)}`" class="icon-link fiche-link">
                        Voir la fiche
                    </router-link>                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { projectsService } from '@/services/projectsService';

export default {
    name: "Projects",
    setup() { 
        const projects = ref([]);
        const loading = ref(false);
        const error = ref('');
        const activeFilter = ref("all");
        
        const filters = ref([
            { label: "Tous", value: "all" },
            { label: "Scolaire", value: "Projet Scolaire" },
            { label: "Client", value: "Projet Client" },
            { label: "Perso", value: "Projet Perso" },
            { label: "Professionnel", value: "Projet Professionnel" },
            { label: "Pro", value: "Projet Pro" },
        ]);

        const tagColors = ref({
            JavaScript: "tag-yellow",
            React: "tag-react",
            "React.TS": "tag-react",
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
            "Node.js": "tag-node",
            Lua: "tag-lua",
            HTML: "tag-orange",
            CSS: "tag-css",
            PHP: "tag-php",
            SQL: "tag-sql",
            C: "tag-c",
            JAVA: "tag-java",
            "Vue.js": "tag-vue",
            "Vue.TS": "tag-vue",
            "Réseau": "tag-discord",
            TypeScript: "tag-typescript",
            Python: "tag-python",
            Vite: "tag-green",
            Strapi: "tag-purple",
            SEO: "tag-indigo",
        });

        // Computed properties
        const filteredProjects = computed(() => {
            if (activeFilter.value === "all") {
                return projects.value.filter(project => project.isVisible);
            }
            return projects.value.filter(project => 
                project.categorie === activeFilter.value && project.isVisible
            );
        });

        const totalProjects = computed(() => projects.value.filter(p => p.isVisible).length);
        const completedProjects = computed(() => 
            projects.value.filter(p => p.status === "Terminé" && p.isVisible).length
        );
        const inProgressProjects = computed(() => 
            projects.value.filter(p => p.status === "En cours" && p.isVisible).length
        );

        // Methods
        const fetchProjects = async () => {
            loading.value = true;
            try {
                const response = await projectsService.getProjects({ visible: true });
                if (response.success) {
                    console.log('Projets reçus de l\'API:', response.data);
                    projects.value = response.data.map(project => {
                        // Parser les tags si c'est une string JSON
                        let parsedTags = project.tags;
                        if (typeof project.tags === 'string') {
                            try {
                                parsedTags = JSON.parse(project.tags);
                            } catch (error) {
                                console.error('Erreur parsing tags:', error, 'pour le projet:', project.title);
                                parsedTags = [];
                            }
                        }
                        
                        console.log('Tags parsés du projet', project.title, ':', parsedTags);
                        return {
                            ...project,
                            tags: parsedTags,
                            showFullDescription: false,
                            spécialité: project.specialite // Adapter le nom du champ
                        };
                    });
                } else {
                    error.value = response.message || 'Erreur lors du chargement des projets';
                }
            } catch (err) {
                error.value = 'Erreur de connexion';
                console.error(err);
            } finally {
                loading.value = false;
            }
        };

        const setFilter = (filter) => {
            activeFilter.value = filter;
        };

        const toggleDescription = (project) => {
            project.showFullDescription = !project.showFullDescription;
        };

        const truncatedText = (text) => {
            const maxLength = 200;
            return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
        };

        const getTagClass = (tag) => {
            return tagColors.value[tag] || "tag-default";
        };

        const slugify = (text) => {
            return text
                .toString()
                .toLowerCase()
                .trim()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-')
                .replace(/^-+/, '')
                .replace(/-+$/, '');
        };

        onMounted(fetchProjects);

        return {
            projects,
            loading,
            error,
            activeFilter,
            filters,
            tagColors,
            filteredProjects,
            totalProjects,
            completedProjects,
            inProgressProjects,
            setFilter,
            toggleDescription,
            truncatedText,
            getTagClass,
            slugify
        };
    }
};
</script>

<style scoped>
.fiche-link {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem !important;
}

.projects-stats {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
}

.projects-stats span {
    background-color: #2a002a;
    color: #ffffff;
    padding: 10px 20px;
    border: 1px solid #4d004d;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.projects-stats span.active {
    background-color: #ff80ab;
    color: #1d001d;
}

.projects-stats span:hover {
    background-color: #ff80ab;
    color: #1d001d;
}

.icon-links {
    display: flex;
    border-radius: 8px;
    transition: transform 0.3s ease;
    position: relative;
    gap: 20px;
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
    font-size: 12px;
    padding: 5px 10px;
    border-radius: 5px;
    display: inline-block;
    color: #fff;
    background-color: #4caf5056;
    border: 1px solid #4caf50;
}

.status {
    font-size: 12px;
    padding: 5px 10px;
    border-radius: 5px;
    display: inline-block;
}

.specialite {
    font-size: 12px;
    padding: 5px 10px;
    border-radius: 5px;
    display: inline-block;
}

.web {
    color: #fff;
    background-color: #005b7456;
    border: 1px solid #005a74;
}

.fivem {
    color: #fff;
    background-color: #70007056;
    border: 1px solid #700070;
}

.discord {
    color: #fff;
    background-color: #7289da56;
    border: 1px solid #7289da;
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
    margin: 10px;
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
    padding: 5px;
}

.project-details h2 {
    font-size: 24px;
    margin: 0;
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
    font-size: 12px;
    font-weight: 500;
    color: #ffffff !important;
    display: inline-block;
    text-align: center;
    min-width: fit-content;
    white-space: nowrap;
    line-height: 1.2;
}

.tag-yellow {
    background-color: rgba(247, 222, 30, 0.8) !important;
    border: 1px solid #f7df1e;
    color: #1a1a1a !important;
}

.tag-blue {
    background-color: rgba(0, 91, 116, 0.8) !important;
    border: 1px solid #005a74;
}

.tag-sql {
    background-color: rgba(112, 0, 112, 0.8) !important;
    border: 1px solid #700070;
}

.tag-purple {
    background-color: rgba(110, 92, 192, 0.8) !important;
    border: 1px solid #6e5cc0;
}

.tag-teal {
    background-color: rgba(56, 178, 172, 0.8) !important;
    border: 1px solid #38b2ac;
}

.tag-red {
    background-color: rgba(229, 62, 62, 0.8) !important;
    border: 1px solid #e53e3e;
}

.tag-vue {
    background-color: rgba(0, 134, 78, 0.8) !important;
    border: 1px solid #00864e;
}

.tag-c {
    background-color: rgba(168, 185, 204, 0.8) !important;
    border: 1px solid #a8b9cc;
    color: #1a1a1a !important;
}

.tag-pink {
    background-color: rgba(237, 100, 166, 0.8) !important;
    border: 1px solid #ed64a6;
}

.tag-orange {
    background-color: rgba(246, 173, 85, 0.8) !important;
    border: 1px solid #f6ad55;
    color: #1a1a1a !important;
}

.tag-php {
    background-color: rgba(136, 146, 191, 0.8) !important;
    border: 1px solid #8892bf;
}

.tag-java {
    background-color: rgba(248, 152, 32, 0.8) !important;
    border: 1px solid #f89820;
    color: #1a1a1a !important;
}

.tag-cyan {
    background-color: rgba(49, 151, 149, 0.8) !important;
    border: 1px solid #319795;
}

.tag-gold {
    background-color: rgba(212, 175, 55, 0.8) !important;
    border: 1px solid #d4af37;
    color: #1a1a1a !important;
}

.tag-indigo {
    background-color: rgba(90, 103, 216, 0.8) !important;
    border: 1px solid #5a67d8;
}

.tag-css {
    background-color: rgba(90, 103, 216, 0.8) !important;
    border: 1px solid #5a67d8;
}

.tag-lightblue {
    background-color: rgba(99, 179, 237, 0.8) !important;
    border: 1px solid #63b3ed;
    color: #1a1a1a !important;
}

.tag-default {
    background-color: rgba(68, 68, 68, 0.8) !important;
    border: 1px solid #444444;
}

.tag-discord {
    background-color: rgba(114, 137, 218, 0.8) !important;
    border: 1px solid #7289da;
}

.tag-lua {
    background-color: rgba(64, 91, 189, 0.8) !important;
    border: 1px solid #2e48a7;
}

.tag-node {
    background-color: rgba(104, 160, 99, 0.8) !important;
    border: 1px solid #68a063;
}

.tag-typescript {
    background-color: rgba(49, 120, 198, 0.8) !important;
    border: 1px solid #3178c6;
}

.tag-react {
    background-color: rgba(97, 218, 251, 0.8) !important;
    border: 1px solid #61dafb;
    color: #1a1a1a !important;
}

.tag-python {
    background-color: rgba(48, 105, 152, 0.8) !important;
    border: 1px solid #306998;
}

.tag-green {
    background-color: rgba(72, 187, 120, 0.8) !important;
    border: 1px solid #48bb78;
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

    .projects-stats {
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