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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { projectData } from '@/data/project_data';

export default {
    name: "Projects",
    data() {
        return {
            ...projectData,
            activeFilter: "all",
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
            return this.projects.filter((project) =>
                this.activeFilter === 'all' ||
                project.status === this.activeFilter ||
                project.categorie === this.activeFilter
            ).sort((a, b) => {
                if (a.status === 'En cours' && b.status !== 'En cours') {
                    return -1; // Mettre 'En cours' avant les autres
                } else if (a.status !== 'En cours' && b.status === 'En cours') {
                    return 1; // Mettre 'En cours' après les autres
                }
                return 0; // Garder l'ordre original si les deux projets ont le même statut
            });
        },
        totalProjects() {
            return this.projects.length;
        },
        completedProjects() {
            return this.projects.filter(project => project.status === 'Terminé').length;
        },
        inProgressProjects() {
            return this.projects.filter(project => project.status === 'En cours').length;
        }
    },
    created() {
        const statusFilters = ['Terminé', 'En cours'];
        statusFilters.forEach(status => {
            if (!this.filters.find(filter => filter.value === status)) {
                this.filters.push({ label: status, value: status });
            }
        });
    }
};
</script>

<style scoped>
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

.tag-typescript {
    color: #fff;
    background-color: #3178c656;
    border: 1px solid #3178c6;
}

.tag-react {
    color: #fff;
    background-color: #61dafb56;
    border: 1px solid #61dafb;
}

.tag-python {
    color: #fff;
    background-color: #30699856;
    border: 1px solid #306998;
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

.tag-lua {
    background-color: #405bbd56;
    border: 1px solid #2e48a7;
}

.tag-node {
    background-color: #68a06356;
    border: 1px solid #68a063;
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