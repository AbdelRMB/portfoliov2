<template>
    <div class="resume-container">
        <!-- Colonne de gauche : Pourquoi me choisir -->
        <div class="resume-sidebar">
            <h1 class="fade-in" style="--delay: 0;">Pourquoi me choisir ?</h1>
            <p class="fade-in" style="--delay: 1;">
                Parce que je suis très passionné de technologies et je m'adapte très rapidement dans de nouveaux
                environnements.
            </p>
            <div class="resume-buttons">
                <button class="resume-button fade-in" v-for="(section, index) in sections" :key="section.id"
                    :class="{ active: activeSection === section.id }" @click="setActiveSection(section.id)"
                    :style="`--delay: ${index + 2};`">
                    <i :class="section.icon"></i>
                    {{ section.title }}
                </button>
            </div>
        </div>

        <!-- Colonne de droite : Contenu -->
        <div class="resume-content">
            <h2 class="fade-in" style="--delay: 0;">{{ activeSectionTitle }}</h2>
            <p v-if="activeSection === 1" class="fade-in" style="--delay: 1;">
                Durant mes 3 ans d’expériences, j’ai appris plusieurs langages, technologies et concepts tel que :
            </p>
            <div v-if="activeSection === 1" class="skills-grid">
                <div v-for="(skill, index) in skills" :key="skill.id" class="skill-item fade-in"
                    :style="`--delay: ${index + 2};`">
                    <i :class="skill.icon"></i>
                    <span class="tooltip">{{ skill.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Resume',
    data() {
        return {
            sections: [
                { id: 1, title: "Compétences", icon: "fas fa-tools" },
                { id: 2, title: "Expériences", icon: "fas fa-briefcase" },
                { id: 3, title: "Formations", icon: "fas fa-graduation-cap" },
                { id: 4, title: "À propos", icon: "fas fa-info-circle" },
            ],
            activeSection: 1,
            skills: [
                { id: 1, name: "HTML5", icon: "devicon-html5-plain" },
                { id: 2, name: "CSS3", icon: "devicon-css3-plain" },
                { id: 3, name: "JavaScript", icon: "devicon-javascript-plain" },
                { id: 4, name: "Vue.js", icon: "devicon-vuejs-plain" },
                { id: 5, name: "Node.js", icon: "devicon-nodejs-plain" },
                { id: 6, name: "React", icon: "devicon-react-original" },
                { id: 7, name: "Lua", icon: "devicon-lua-plain-wordmark" },
                { id: 8, name: "Java", icon: "devicon-java-plain" },
                { id: 9, name: "C", icon: "devicon-c-plain" },
                { id: 10, name: "PHP", icon: "devicon-php-plain" },
                { id: 11, name: "Python", icon: "devicon-python-plain" },
                { id: 12, name: "MySQL", icon: "devicon-mysql-plain" },
                { id: 13, name: "TypeScript", icon: "devicon-typescript-plain" },
                { id: 14, name: "TailwindCSS", icon: "devicon-tailwindcss-plain" },
                { id: 15, name: "JSON", icon: "devicon-json-plain" },
                { id: 16, name: "Figma", icon: "devicon-figma-plain" },
                { id: 17, name: "WordPress", icon: "devicon-wordpress-plain" },
                { id: 18, name: "Android Studio", icon: "devicon-androidstudio-plain" },
                { id: 19, name: "Discord.js", icon: "devicon-discordjs-plain" }, 
                { id: 20, name: "GitHub", icon: "devicon-github-plain" }, 
                { id: 21, name: "GitHub Codespaces", icon: "devicon-githubcodespaces-plain" }, 
                { id: 22, name: "GitLab", icon: "devicon-gitlab-plain" }, 
                { id: 23, name: "pnpm", icon: "devicon-pnpm-plain" }, 
                { id: 24, name: "Windows", icon: "devicon-windows8-plain" }, 
                { id: 25, name: "Linux", icon: "devicon-linux-plain" }, 
                { id: 26, name: "MariaDB", icon: "devicon-mariadb-plain" }, 
                { id: 27, name: "PHPStorm", icon: "devicon-phpstorm-plain" },],
        };
    }, computed: { activeSectionTitle() { const section = this.sections.find((s) => s.id === this.activeSection); return section ? section.title : ""; }, }, methods: { setActiveSection(id) { this.activeSection = id; }, },
}; </script>
<style scoped>
/* Conteneur principal */
.resume-container {
    display: flex;
    justify-content: space-between;
    padding: 50px;
    color: #ffffff;
    background-color: #1d001d;
}

/* Animation fade-in */
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
    animation-delay: calc(var(--delay, 0) * 0.2s);
}

/* Colonne de gauche */
.resume-sidebar {
    width: 35%;
}

.resume-sidebar h1 {
    font-size: 36px;
    margin-bottom: 20px;
}

.resume-sidebar p {
    font-size: 16px;
    margin-bottom: 30px;
    color: #cccccc;
}

.resume-buttons {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.resume-button {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: #004d4d;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    color: #ffffff;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.resume-button.active {
    background-color: #64ffda;
    color: #1d001d;
}

.resume-button i {
    font-size: 18px;
}

.resume-button:hover {
    background-color: #008080;
}

/* Colonne de droite */
.resume-content {
    width: 60%;
}

.resume-content h2 {
    font-size: 28px;
    margin-bottom: 20px;
    color: #64ffda;
}

.resume-content p {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 20px;
    color: #cccccc;
}

/* Grille des compétences */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 30px;
}

.skill-item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2a002a;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
    border: 1px solid #4d004d;
    position: relative;
}

.skill-item i {
    font-size: 40px;
    transition: transform 0.3s ease;
    color: #ff80ab;
}

.skill-item:hover {
    transform: scale(1.1);
}

/* Tooltip */
.tooltip {
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    white-space: nowrap;
}

.skill-item:hover .tooltip {
    opacity: 1;
    visibility: visible;
}

/* Responsive */
@media (max-width: 768px) {
    .resume-container {
        flex-direction: column;
    }

    .resume-sidebar {
        width: 100%;
        margin-bottom: 30px;
    }

    .resume-content {
        width: 100%;
    }

    .skills-grid {
        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    }
}
</style>
