<template>
    <div class="project-main">
        <div v-if="loading" class="loading">
            <p>Chargement du projet...</p>
        </div>
        
        <div v-else-if="error" class="error">
            <p>{{ error }}</p>
            <router-link to="/projects" class="back-link">← Retour aux projets</router-link>
        </div>
        
        <div v-else-if="project" class="project-details-page">
            <router-link to="/projects" class="back-link fade-in">← Retour aux projets</router-link>
            <h1 class="fade-in">{{ project.title }}</h1>
            <h2 class="fade-in">Mission</h2>
            <p class="fade-in">{{ project.description }}</p>

            <div class="tech-tags fade-in">
                <span v-for="(tag, index) in project.tags" :key="index" class="tag fade-in">
                    {{ tag }}
                </span>
            </div>

            <div class="project-section fade-in">
                <h2 class="fade-in">Informations</h2>
                <ul class="fade-in">
                    <li class="fade-in"><strong>Catégorie :</strong> {{ project.categorie }}</li>
                    <li class="fade-in"><strong>Spécialité :</strong> {{ project.specialite }}</li>
                    <li class="fade-in"><strong>Status :</strong> {{ project.status }}</li>
                    <li v-if="project.version" class="fade-in"><strong>Version :</strong> {{ project.version }}</li>
                </ul>
                <div class="links fade-in">
                    <a v-if="project.github" :href="project.github" target="_blank" class="link-button fade-in">Voir
                        GitHub</a>
                    <a v-if="project.website" :href="project.website" target="_blank" class="link-button fade-in">Voir
                        Site</a>
                </div>
            </div>

            <div class="project-section fade-in" v-if="project.situation">
                <h2>Situation</h2>
                <p>
                    {{ project.situation }}
                </p>
            </div>

            <div class="project-section fade-in" v-if="project.actions && project.actions.length">
                <h2>Actions</h2>
                <ul>
                    <li v-for="(action, index) in project.actions" :key="index">
                        {{ action.description }}
                    </li>
                </ul>
            </div>

            <div class="project-section fade-in" v-if="project.resultat">
                <h2>Résultat</h2>
                <p>
                    {{ project.resultat }}
                </p>
            </div>

            <div v-if="project.screenshots && project.screenshots.length" class="project-section fade-in">
                <h2>Captures d'écran</h2>
                <div class="screenshots fade-in">
                    <div class="screenshot-item fade-in" v-for="(capture, index) in project.screenshots" :key="index">
                        <img :src="capture.src" :alt="capture.alt" @click="openPopup(capture.src)" />
                        <p class="screenshot-title fade-in">{{ capture.title }}</p>
                    </div>
                </div>
            </div>

            <!-- Popup -->
            <div v-if="popupVisible" class="popup" @click="closePopup">
                <img :src="popupImage" alt="Zoom" class="popup-image" />
            </div>

            <div class="project-section fade-in" v-if="project.challenges && project.challenges.length">
                <h2>Défis rencontrés</h2>
                <ul>
                    <li v-for="(challenge, index) in project.challenges" :key="index">
                        {{ challenge.description }}
                    </li>
                </ul>
            </div>

            <div class="project-section fade-in" v-if="project.apprentissages && project.apprentissages.length">
                <h2>Apprentissages</h2>
                <ul>
                    <li v-for="(apprentissage, index) in project.apprentissages" :key="index">
                        {{ apprentissage.description }}
                    </li>
                </ul>
            </div>
        </div>
        
        <div v-else>
            <p>Projet introuvable.</p>
            <router-link to="/projects" class="back-link">← Retour aux projets</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProjectDetail',
    data() {
        return {
            project: null,
            screenshots: [],
            popupVisible: false,
            popupImage: '',
            loading: true,
            error: null
        };
    },
    async created() {
        const titleParam = this.$route.params.title;
        await this.fetchProject(titleParam);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // Animation douce
        });
    },
    methods: {
        async fetchProject(titleSlug) {
            this.loading = true;
            this.error = null;
            
            try {
                const response = await fetch('https://api.abdelrahimriche.com/api/projects');
                const data = await response.json();
                
                if (data.success) {
                    // Parser les données JSON pour chaque projet
                    const projects = data.data.map(project => {
                        let parsedTags = project.tags;
                        let parsedScreenshots = project.screenshots;
                        let parsedActions = project.actions;
                        let parsedChallenges = project.challenges;
                        let parsedApprentissages = project.apprentissages;
                        
                        // Parser les tags
                        if (typeof project.tags === 'string') {
                            try {
                                parsedTags = JSON.parse(project.tags);
                            } catch (error) {
                                console.error('Erreur parsing tags:', error);
                                parsedTags = [];
                            }
                        }
                        
                        // Parser les screenshots
                        if (typeof project.screenshots === 'string') {
                            try {
                                parsedScreenshots = JSON.parse(project.screenshots);
                            } catch (error) {
                                console.error('Erreur parsing screenshots:', error);
                                parsedScreenshots = [];
                            }
                        }
                        
                        // Parser les actions
                        if (typeof project.actions === 'string') {
                            try {
                                parsedActions = JSON.parse(project.actions);
                            } catch (error) {
                                console.error('Erreur parsing actions:', error);
                                parsedActions = [];
                            }
                        }
                        
                        // Parser les challenges
                        if (typeof project.challenges === 'string') {
                            try {
                                parsedChallenges = JSON.parse(project.challenges);
                            } catch (error) {
                                console.error('Erreur parsing challenges:', error);
                                parsedChallenges = [];
                            }
                        }
                        
                        // Parser les apprentissages
                        if (typeof project.apprentissages === 'string') {
                            try {
                                parsedApprentissages = JSON.parse(project.apprentissages);
                            } catch (error) {
                                console.error('Erreur parsing apprentissages:', error);
                                parsedApprentissages = [];
                            }
                        }
                        
                        return {
                            ...project,
                            tags: parsedTags,
                            screenshots: parsedScreenshots,
                            actions: parsedActions,
                            challenges: parsedChallenges,
                            apprentissages: parsedApprentissages
                        };
                    });
                    
                    // Trouver le projet correspondant au slug
                    this.project = projects.find(p => this.slugify(p.title) === titleSlug);
                    
                    if (!this.project) {
                        this.error = 'Projet non trouvé';
                    }
                } else {
                    this.error = data.message;
                }
            } catch (err) {
                this.error = 'Erreur lors du chargement du projet';
                console.error(err);
            } finally {
                this.loading = false;
            }
        },
        
        openPopup(image) {
            this.popupImage = image;
            this.popupVisible = true;
        },
        closePopup() {
            this.popupVisible = false;
        },
        slugify(text) {
            return text
                .toString()
                .toLowerCase()
                .replace(/\s+/g, '-')           // Remplace les espaces par -
                .replace(/[^\w\-]+/g, '')        // Enlève tout ce qui n'est pas alphanumérique
                .replace(/\-\-+/g, '-')          // Plusieurs '-' -> un seul
                .replace(/^-+/, '')              // Enlève '-' au début
                .replace(/-+$/, '');              // Enlève '-' à la fin
        }
    }
};
</script>

<style scoped>
.project-main {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.project-details-page {
    width: 70%;
    padding: 2rem;
    color: #ffffff;
    background-color: #1d001d;
}

.back-link {
    color: #ff80ab;
    text-decoration: none;
    margin-bottom: 20px;
    display: inline-block;
}

.project-header h1,
.project-header h2 {
    margin-top: 0;
    color: #ff80ab;
}

.project-section {
    margin-top: 40px;
}

.project-section h2 {
    color: #ff80ab;
    margin-bottom: 10px;
}

.links {
    display: flex;
    gap: 20px;
    margin-top: 10px;
}

.link-button {
    background-color: #ff80ab;
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease;
}

.link-button:hover {
    background-color: #ff4081;
}

.tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
}

.tag {
    background-color: #2a002a;
    border: 1px solid #4d004d;
    border-radius: 5px;
    padding: 5px 10px;
}

.screenshots {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    margin-top: 20px;
}

.screenshot-item {
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.screenshot-item:hover {
    transform: scale(1.05);
}

.screenshot-item img {
    width: 100%;
    max-width: 500px;
    height: 250px;
    border-radius: 10px;
    object-fit: cover;
    background: #2a002a;
    padding: 10px;
    border: 1px solid #4d004d;
}

/* Responsive : 1 image par ligne quand largeur < 768px */
@media (max-width: 768px) {
    .screenshots {
        grid-template-columns: 1fr;
    }

    .screenshot-item img {
        width: 100%;
        height: auto;
    }



    .project-details-page {
        width: 80%;
        padding: 2rem;
        color: #ffffff;
        background-color: #1d001d;
    }
}

.screenshot-title {
    margin-top: 10px;
    font-size: 16px;
    color: #ff80ab;
}

ul {
    list-style: disc inside;
}

/* POPUP */
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(29, 0, 29, 0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    animation: fadeIn 0.5s ease;
}

.popup-image {
    max-width: 80%;
    max-height: 80%;
    border-radius: 20px;
    animation: zoomIn 0.5s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes zoomIn {
    from {
        transform: scale(0.7);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

.fade-in {
    opacity: 0;
    animation: fadeIn 0.7s ease-out forwards;
    animation-delay: calc(var(--delay, 0) * 0.1s);
}

.loading, .error {
    text-align: center;
    padding: 3rem;
    color: #ff80ab;
}

.loading p, .error p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

.error {
    background-color: rgba(255, 128, 171, 0.1);
    border: 1px solid #ff80ab;
    border-radius: 8px;
    margin: 2rem;
}
</style>