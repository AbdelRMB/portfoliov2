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
            <div v-if="activeSection === 2" class="timeline">
                <div class="timeline-item fade-in" style="--delay: 1;" v-for="(experience, index) in experiences"
                    :key="experience.id" :style="`--delay: ${index + 2};`">
                    <div class="timeline-icon">
                        <i :class="experience.icon"></i>
                    </div>
                    <div class="timeline-content">
                        <h3>{{ experience.title }}</h3>
                        <h4>{{ experience.company }}</h4>
                        <p>{{ experience.description }}</p>
                        <div v-if="experience.languages" class="languages-used">
                            <strong>Langages utilisés :</strong>
                            <div class="languages-icons">
                                <i v-for="(lang, idx) in experience.languages" :key="idx" :class="lang"
                                    class="language-icon"></i>
                            </div>
                        </div>
                        <span class="timeline-date">{{ experience.date }}</span>
                    </div>
                </div>
            </div>
            <div v-if="activeSection === 3" class="timeline">
                <div class="timeline-item fade-in" v-for="(formation, index) in formations" :key="formation.id"
                    :style="`--delay: ${index + 2};`">
                    <div class="timeline-icon">
                        <i :class="formation.icon"></i>
                    </div>
                    <div class="timeline-content">
                        <h3>{{ formation.title }}</h3>
                        <h4>{{ formation.institution }}</h4>
                        <p>{{ formation.description }}</p>
                        <span class="timeline-date">{{ formation.date }}</span>
                    </div>
                </div>
            </div>
            <div v-if="activeSection === 4" class="about fade-in" style="--delay: 1;">
                <p class="fade-in" style="--delay: 2;">{{ aboutTextCitation }} <i>- Jean Dion / Le Devoir - 10 Mai
                        1997</i></p>
                <p class="fade-in" style="--delay: 3;">{{ aboutText }}</p>
                <ul class="about-list">
                    <li v-for="(item, index) in aboutPoints" :key="index" class="fade-in"
                        :style="`--delay: ${index + 4};`">
                        <i class="fas fa-check-circle"></i>
                        {{ item }}
                    </li>
                </ul>
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
            aboutTextCitation: "“Le principe de l'évolution est beaucoup plus rapide en informatique que chez le bipède.”",
            aboutText: "Je suis un développeur passionné par la technologie et l'innovation. J'aime relever des défis techniques et travailler sur des projets ambitieux. Mon objectif est de fournir des solutions efficaces et esthétiques adaptées aux besoins des utilisateurs.",
            aboutPoints: [
                "3 ans d'expérience en développement logiciel/Web/applications",
                "Maîtrise de plusieurs langages et frameworks modernes",
                "Capacité à collaborer en équipe et à travailler sur des projets complexes",
                "Toujours en quête d'amélioration et d'apprentissage",
            ],
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
                { id: 27, name: "PHPStorm", icon: "devicon-phpstorm-plain" },
                { id: 28, name: "Visual Studio Code", icon: "devicon-vscode-plain" },
                { id: 29, name: "Postman", icon: "devicon-postman-plain" },
                { id: 30, name: "Strapi", icon: "devicon-strapi-plain" },
                { id: 31, name: "Bootstrap", icon: "devicon-bootstrap-plain" },
                { id: 32, name: "Sass", icon: "devicon-sass-original" },
            ],
            experiences: [
                {
                    id: 1,
                    title: "Freelance Développeur UI/UX",
                    company: "Linear Studio",
                    date: "2024",
                    description:
                        "Création d'interfaces utilisateur personnalisées pour un studio de développement FiveM. Développement avec Vue.js, JavaScript et TailwindCSS pour concevoir des menus dynamiques et interactifs adaptés aux besoins spécifiques des joueurs et des administrateurs.",
                    icon: "fas fa-laptop-code",
                    languages: ["devicon-javascript-plain", "devicon-vuejs-plain", "devicon-tailwindcss-plain", "devicon-html5-plain", "devicon-css3-plain", "devicon-lua-plain"],
                },
                {
                    id: 2,
                    title: "Développeur Web/IA",
                    company: "I-Oasis",
                    date: "Juillet 2024 - Septembre 2024",
                    description:
                        "Implémentation et manipulation de données en base de données permettant l'utilisation par une IA. Développement et maintenance de sites Web.",
                    icon: "fas fa-laptop-code",
                    languages: ["devicon-html5-plain", "devicon-css3-plain", "devicon-javascript-plain", "devicon-mysql-plain", "devicon-nodejs-plain", "devicon-php-plain", "devicon-wordpress-plain"],
                },
                {
                    id: 3,
                    title: "Stagiaire Développeur",
                    company: "Iffen",
                    date: "Avril 2024 - Juin 2024",
                    description:
                        "Développement et maintenance de sites Web. Création et implémentation d'un 'Help Bot' pour améliorer l'expérience utilisateur.",
                    icon: "fas fa-laptop-code",
                    languages: ["devicon-html5-plain", "devicon-css3-plain", "devicon-javascript-plain", "devicon-mysql-plain", "devicon-nodejs-plain", "devicon-php-plain", "devicon-wordpress-plain"],
                },
                {
                    id: 4,
                    title: "Chef de Poste Coordinateur Dégeivrage",
                    company: "Groupe 3S - Aéroport Roissy Charles de Gaulle",
                    date: "2022 - 2024",
                    description:
                        "Coordination des opération de dégivrage sur les aéronefs. Gestion et coordination d'une équipe. Respect des procédures de sécurité et de qualité.",
                    icon: "fas fa-plane",
                },
            ],
            formations: [
                {
                    id: 1,
                    title: "BUT Informatique",
                    institution: "IUT Marne-la-Vallée",
                    date: "2022 - 2026",
                    description: "Les étudiants formés doivent être capables de participer à la conception, la réalisation et la mise en œuvre de systèmes informatiques correspondant aux besoins des utilisateurs. Pour assumer ces responsabilités, les informaticiens doivent être compétents sur le plan technologique, connaître l'environnement socio-économique dans lequel ils auront à exercer leur profession, posséder une bonne culture générale et se montrer aptes à la communication..",
                    icon: "fas fa-graduation-cap",
                },
                {
                    id: 2,
                    title: "Baccalauréat Scientifique",
                    institution: "Lycée Voillaume",
                    date: "2019 - 2022",
                    description: "Spécialité Sciences de l'Ingénieur, Mathématiques. Option Maths expertes.",
                    icon: "fas fa-school",
                },
            ],
        };
    }, computed: {
        activeSectionTitle() {
            const section = this.sections.find((s) => s.id === this.activeSection); return section ? section.title : "";
        },
    }, methods: {
        setActiveSection(id) { this.activeSection = id; },
    },
}; </script>
<style scoped>
.about {
    background-color: #2a002a;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    border: 1px solid #4d004d;
    color: #ffffff;
    line-height: 1.6;
}

.about-list {
    list-style: none;
    margin: 20px 0 0;
    padding: 0;
}

.about-list li {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}

.about-list i {
    color: #ff80ab;
}

.languages-used {
    margin-top: 10px;
    font-size: 14px;
    color: #ff80ab;
}

.languages-icons {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.language-icon {
    font-size: 24px;
    color: #ff80ab;
    transition: transform 0.3s ease, color 0.3s ease;
}

.language-icon:hover {
    transform: scale(1.2);
    color: #ffffff;
}

.timeline {
    display: flex;
    flex-direction: column;
    gap: 30px;
    position: relative;
    padding-left: 30px;
    border-left: 2px solid #4d004d;
    height: 600px;
    overflow-y: auto;
}

.timeline::-webkit-scrollbar {
    width: 8px;
}

.timeline::-webkit-scrollbar-track {
    background: transparent;
    margin: 10px 0;
}

.timeline::-webkit-scrollbar-thumb {
    background-color: #ff80ab;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.timeline::-webkit-scrollbar-thumb:hover {
    background-color: #ff4d94;
}

/* Pour Firefox */
.timeline {
    scrollbar-width: thin;
    scrollbar-color: #ff80ab transparent;
}

.timeline-item {
    display: flex;
    align-items: flex-start;
    position: relative;
    animation: fadeIn 0.7s ease-out forwards;
    opacity: 0;
}

.timeline-icon {
    width: 50px;
    height: 50px;
    background-color: #ff80ab;
    color: #1d001d;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: -30px;
    top: 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    font-size: 20px;
}

.timeline-content {
    background-color: #2a002a;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    border: 1px solid #4d004d;
    color: #ffffff;
    width: 100%;
}

.timeline-content h3 {
    font-size: 20px;
    color: #ff80ab;
    margin-bottom: 5px;
}

.timeline-content h4 {
    font-size: 16px;
    color: #cccccc;
    margin-bottom: 10px;
}

.timeline-content p {
    font-size: 14px;
    line-height: 1.6;
    color: #cccccc;
    margin-bottom: 10px;
}

.timeline-date {
    font-size: 12px;
    color: #999999;
}

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
        transform: translateY(50px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    opacity: 0;
    animation: fadeIn 0.7s ease-out forwards;
    animation-delay: calc(var(--delay, 0) * 0.07s);
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

/* Nouvelle barre de navigation */
.resume-buttons {
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: #2a002a;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #4d004d;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

/* Nouveau style pour les boutons */
.resume-button {
    display: flex;
    align-items: center;
    gap: 12px;
    background-color: transparent;
    border: none;
    font-size: 18px;
    font-weight: bold;
    color: #cccccc;
    padding: 12px 20px;
    border-radius: 8px;
    transition: background-color 0.4s ease, transform 0.3s ease, color 0.3s ease;
    position: relative;
    cursor: pointer;
    overflow: hidden;
}

/* Animation de survol */
.resume-button::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 0%;
    height: 100%;
    background-color: #ff80ab;
    transition: width 0.4s ease;
    z-index: -1;
}

.resume-button:hover::after {
    width: 100%;
}

.resume-button:hover {
    color: #1d001d;
    transform: translateX(5px);
}

/* Quand bouton actif */
.resume-button.active {
    background-color: #ff80ab;
    color: #1d001d;
}

.resume-button.active::after {
    width: 100%;
}

/* Icônes */
.resume-button i {
    font-size: 20px;
}


/* Colonne de droite */
.resume-content {
    width: 60%;
}

.resume-content h2 {
    font-size: 28px;
    margin-bottom: 20px;
    color: #ff80ab;
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

    .timeline {
        padding-left: 20px;
    }

    .timeline-icon {
        width: 40px;
        height: 40px;
        font-size: 16px;
        left: -20px;
    }

    .timeline-content {
        padding: 15px;
    }
}
</style>
