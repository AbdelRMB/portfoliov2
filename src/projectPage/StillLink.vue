<template>
    <div class="project-main">
        <div class="project-details-page">
            <div class="project-header">
                <router-link to="/projects" class="back-link">← Retour aux projets</router-link>
                <h1>Still Link</h1>
                <h2>Mission</h2>
                <p>
                    Refonte complète du site web de l’entreprise Still Link, passant de l'outil
                    Odoo au code a un site coder, visant à moderniser
                    l’image de l’entreprise, améliorer l’expérience utilisateur, et mettre en
                    avant leurs services Internet, téléphonie, mobile et sécurité de manière plus
                    attractive.
                </p>
                <div class="tech-tags">
                    <span class="tag">HTML</span>
                    <span class="tag">CSS</span>
                    <span class="tag">JavaScript</span>
                    <span class="tag">Vue.TS</span>
                    <span class="tag">TypeScript</span>
                    <span class="tag">Vite.js</span>
                </div>
            </div>

            <div class="project-section">
                <h2>Situation</h2>
                <p>
                    Le site internet historique de Still Link était devenu obsolète en termes de design et
                    de fonctionnalités. Il peinait à mettre en valeur les services proposés et n’offrait
                    pas une navigation optimale, en particulier sur mobile, ce qui nuisait à l’image de marque.
                </p>
            </div>

            <div class="project-section">
                <h2>Tâche</h2>
                <p>
                    Développer un nouveau site web moderne, responsive, rapide et élégant, en intégrant
                    une navigation intuitive, un contenu structuré, des animations dynamiques,
                    ainsi qu'une section dédiée aux actualités, aux références clients et aux services proposés.
                </p>
            </div>

            <div class="project-section">
                <h2>Actions</h2>
                <ul>
                    <li>Conception d'une nouvelle architecture du site basée sur Vue et Vite.js</li>
                    <li>Création d'une interface utilisateur responsive et fluide</li>
                    <li>Intégration de sections claires et bien organisées</li>
                    <li>Implémentation d'un thème graphique, d'animations et de donnée personnalisé</li>
                    <li>Ajout d'animations dynamiques et optimisations SEO</li>
                    <li>Préparation à l'internationalisation (multilingue)</li>
                </ul>
            </div>

            <div class="project-section">
                <h2>Résultat</h2>
                <p>
                    Le nouveau site a revitalisé l'image de Still Link avec un design professionnel et engageant,
                    une navigation améliorée et de meilleures performances mobiles.
                </p>
            </div>

            <div class="project-section">
                <h2>Captures d'écran</h2>
                <div class="screenshots">
                    <div class="screenshot-item" v-for="(capture, index) in screenshots" :key="index">
                        <img :src="capture.src" :alt="capture.alt" @click="openPopup(capture.src)" />
                        <p class="screenshot-title">{{ capture.title }}</p>
                    </div>
                </div>
            </div>

            <!-- Popup -->
            <div v-if="popupVisible" class="popup" @click="closePopup">
                <img :src="popupImage" alt="Zoom" class="popup-image" />
            </div>

            <div class="project-section">
                <h2>Défis rencontrés</h2>
                <ul>
                    <li>Maintenir la cohérence graphique sur tous les appareils</li>
                    <li>Équilibrer animations modernes et rapidité du site</li>
                    <li>Optimiser le SEO avec React</li>
                    <li>Anticiper les ajouts futurs de contenu</li>
                </ul>
            </div>

            <div class="project-section">
                <h2>Apprentissages</h2>
                <ul>
                    <li>Gestion d’état avancée et animations sous React</li>
                    <li>Optimisations de performances avec Vite.js</li>
                    <li>Conception SEO-friendly pour sites React</li>
                    <li>Perfectionnement du responsive et de l'accessibilité web</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StillLinkProject',
    data() {
        return {
            popupVisible: false,
            popupImage: '',
            screenshots: [
                { src: '/assets/images/stilllink/acc_old.png', title: "Ancienne page d'accueil", alt: "Ancienne page d'accueil" },
                { src: '/assets/images/stilllink/still-link.png', title: "Nouvelle page d'accueil", alt: "Nouvelle page d'accueil" },
                { src: '/assets/images/stilllink/old_forfait_mobile.png', title: "Ancienne page forfait mobile", alt: "Ancienne page forfait mobile" },
                { src: '/assets/images/stilllink/forfait_mobile.png', title: "Nouvelle page forfait mobile", alt: "Nouvelle page forfait mobile" },
                { src: '/assets/images/stilllink/old_formulaire_contact.png', title: "Ancien formulaire de contact", alt: "Ancien formulaire de contact" },
                { src: '/assets/images/stilllink/formulaire_contact.png', title: "Nouveau formulaire de contact", alt: "Nouveau formulaire de contact" }
            ]
        };
    },
    methods: {
        openPopup(image) {
            this.popupImage = image;
            this.popupVisible = true;
        },
        closePopup() {
            this.popupVisible = false;
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
    width: 500px;
    height: 250px;
    border-radius: 10px;
    object-fit: cover;
    background: #2a002a;
    padding: 10px;
    border: 1px solid #4d004d;
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
</style>