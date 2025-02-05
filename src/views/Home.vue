<template>
    <section class="main-content">
        <div class="center-content">
            <div class="text-content">
                <div class="intro">
                    <h1 class="none" :class="{ 'fade-in': fadeInActive[0] }">Bonjour, je suis </h1>
                    <h1 class="none" :class="{ 'fade-in': fadeInActive[1] }">Abdelrahim Riche</h1>
                    <p class="none" :class="{ 'fade-in': fadeInActive[2] }">Spécialiste en développement web et mobile,
                        je
                        conçois des solutions créatives qui dynamisent les
                        marques et engagent les utilisateurs.</p>
                </div>
                <div class="cv-download none" :class="{ 'fade-in': fadeInActive[3] }">
                    <button @click="downloadCV">Télécharger mon CV</button>
                    <div class="icon-links">
                        <a :href="github.link" target="_blank" rel="noopener noreferrer" class="icon-link">
                            <i class="devicon-github-plain"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="image-content none" :class="{ 'fade-in': fadeInActive[4] }">
                <img src="@/assets/images/me.png" alt="Abdelrahim Riche">
            </div>
        </div>
        <div class="stats">
            <div class="stat-item none" :class="{ 'fade-in': fadeInActive[5] }">
                <p class="number">3+</p>
                <p>Années d'expérience</p>
            </div>
            <div class="stat-item none" :class="{ 'fade-in': fadeInActive[6] }">
                <p class="number">10</p>
                <p>Projets Terminés</p>
            </div>
            <div class="stat-item none" :class="{ 'fade-in': fadeInActive[7] }">
                <p class="number">28</p>
                <p>Technologies Maîtrisées</p>
            </div>
            <div class="stat-item none" :class="{ 'fade-in': fadeInActive[8] }">
                <p class="number">54</p>
                <p>Contributions GitHub</p>
            </div>
        </div>
    </section>
</template>

<script>
import cv from '@/assets/cv.pdf';
import { projectData } from '@/data/project_data';
export default {
    name: 'Home',
    data() {
        return {
            fadeInActive: [false, false, false, false, false, false, false, false, false],
            github: {
                link: 'https://github.com/AbdelRMB',
            },
        }
    },
    mounted() {
        this.animateElements();
    },
    methods: {
        downloadCV() {
            window.open(cv, '_blank');
        },
        animateElements() {
            this.fadeInActive.forEach((_, index) => {
                setTimeout(() => {
                    this.fadeInActive[index] = true;
                }, 100 * index);
            });
        }
    },
    computed: {
        totalProjects() {
            return this.projects.length;
        },
    },
}
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

.main-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 84vh;
    /* La hauteur prend en compte la navbar */
    padding: 20px;
    color: #ffffff;
}

.center-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.text-content {
    width: 50%;
    text-align: left;
    padding-left: 20%;
    padding-right: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.image-content {
    flex: 1;
    padding-right: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-content img {
    max-height: 80%;
}

.intro h1 {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
}

.intro p {
    font-size: 16px;
}

.stats {
    display: flex;
    justify-content: space-around;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.number {
    font-size: 20px;
    font-weight: bold;
}

.cv-download {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.cv-download button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
}

.cv-download button:hover {
    background-color: #45a049;
}

/* Media Queries */
@media (max-width: 1024px) {
    .center-content {
        flex-direction: column;
    }

    .text-content,
    .image-content {
        width: 100%;
        padding: 0;
        align-items: center;
    }

    .image-content img {
        max-width: 50%;
        max-height: 300px;
        /* Adjust height for smaller screens */
    }
}

@media (max-width: 768px) {
    .main-content {
        height: auto;
        /* Make the main content height auto to accommodate smaller screens */
    }

    .stats {
        flex-direction: column;
        align-items: center;
    }

    .stat-item {
        margin: 10px 0;
        /* Add some vertical spacing between stats */
    }

    .image-content {
        padding-top: 15px;
    }

    h1 {
        text-align: center;
    }

    .image-content img {
        max-height: 100%;
        border-radius: 5%;
    }
}

@media (max-width: 480px) {
    .intro h1 {
        font-size: 20px;
        /* Reduce font size for very small screens */
    }

    .intro p {
        font-size: 14px;
    }

    .cv-download button {
        padding: 8px 16px;
        font-size: 14px;
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
    animation: fadeIn 0.5s ease-out forwards;
}
</style>
