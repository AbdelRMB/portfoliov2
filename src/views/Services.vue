<template>
    <div class="services-container">
        <div class="service-card none" v-for="service in services" :key="service.id"
            :class="{ 'fade-in': fadeInActive[service.id - 1] }">
            <div class="service-header">{{ service.number }}</div>
            <div class="service-content">
                <h3>{{ service.title }}</h3>
                <p>{{ service.description }}</p>
                <a href="https://discord.gg/Ahq9mPtf36" class="continue-button">Continuer →</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Services',
    data() {
        return {
            services: [
                { id: 1, number: "01", title: "UX/UI Design", description: "Je conçois des interfaces utilisateur intuitives et esthétiques qui offrent une expérience utilisateur optimale. Mon objectif est de créer des designs qui non seulement attirent l'œil, mais qui sont également fonctionnels et faciles à utiliser." },
                { id: 2, number: "02", title: "Développement web", description: "Vous avez besoin d'une application web moderne, responsive, épurée et attrayante qui respecte parfaitement votre charte graphique ? Je suis là pour transformer vos idées en réalité avec des solutions web sur mesure." },
                { id: 3, number: "03", title: "Développement mobile", description: "Vous avez besoin d’une application mobile moderne, épurée et attrayante, accessible sur iOS et Android, qui respecte parfaitement votre charte graphique ? Je développe des applications mobiles performantes et user-friendly." },
                { id: 4, number: "04", title: "Développement FiveM/GMOD", description: "Vous cherchez un développeur FiveM en Lua ou JS afin de développer des ressources ou pour des missions a courte durée ? Je suis la personne qu'il vous faut !" },
                { id: 5, number: "05", title: "Développement Bot Discord", description: "Vous avez besoin d'un bot discord fonctionnel simple d'utilisation et rapidement ? Je suis à votre entière disposition afin de pouvoir vous fournir un travail à la hauteur de votre demande." },
                { id: 6, number: "06", title: "Maintenance", description: "Je peux effectuer un service de maintenance sur vos produit afin de garantir une stabilité et un amélioration constante de ces derniers !" },
            ],
            fadeInActive: new Array(4).fill(false) // Assuming there are 4 services
        };
    },
    mounted() {
        this.animateServices();
    },
    methods: {
        animateServices() {
            this.services.forEach((service, index) => {
                setTimeout(() => {
                    this.fadeInActive.splice(service.id - 1, 1, true);
                }, 200 * index); // Animates each card with a delay of 0.5s between them
            });
        }
    }
}
</script>

<style scoped>
.services-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 100px 200px;
    background-color: #1d001d;
    /* Fond global */
}

.service-card {
    background-color: #2a002a;
    /* Couleur légèrement plus claire que le fond pour le contraste */
    color: #ffffff;
    padding: 20px;
    margin: 20px;
    width: calc(45% - 40px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* Effet d'ombre subtil */
    border-radius: 10px;
    /* Ajout d'un effet arrondi */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid #4d004d;
}

.service-card:hover {
    transform: translateY(-10px);
    /* Effet de survol pour plus de dynamisme */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

.service-header {
    font-size: 24px;
    font-weight: bold;
    color: #e91e63;
    /* Accent couleur pour le titre (rose vif) */
}

.service-content h3 {
    margin-top: 10px;
    color: #ff80ab;
    /* Couleur rose pâle pour les titres */
}

.service-content p {
    font-size: 16px;
    color: #e0e0e0;
    /* Texte descriptif en gris clair */
    line-height: 1.5;
}

.continue-button {
    background: transparent;
    border: 1px solid #e91e63;
    color: #e91e63;
    padding: 8px 16px;
    margin-top: 20px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, transform 0.3s;
}

.continue-button:hover {
    background-color: #e91e63;
    color: #1d001d;
    transform: scale(1.05);
    /* Légère mise en avant au survol */
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .service-card {
        width: 100%;
        margin: 20px 0;
    }
}

@media (max-width: 1024px) {
    .service-card {
        width: calc(100% - 40px);
        /* Une carte par ligne */
        margin: 20px 0;
    }

    .services-container {
        padding: 50px 20px;
        /* Réduction des marges pour les petits écrans */
    }
}

/* Pour petits écrans (téléphones) */
@media (max-width: 768px) {
    .service-card {
        width: 100%;
        /* Prend toute la largeur */
        margin: 10px 0;
        /* Moins d'espacement vertical */
    }

    .services-container {
        padding: 20px;
        /* Moins de padding sur les côtés */
    }

    .service-header {
        font-size: 20px;
        /* Réduction de la taille du titre */
    }

    .service-content p {
        font-size: 14px;
        /* Texte plus petit pour les écrans étroits */
    }

    .continue-button {
        padding: 6px 12px;
        font-size: 14px;
        /* Bouton plus petit */
    }
}

/* Pour très petits écrans (moins de 480px) */
@media (max-width: 480px) {
    .service-header {
        font-size: 18px;
        /* Réduction supplémentaire du titre */
    }

    .service-content h3 {
        font-size: 16px;
    }

    .service-content p {
        font-size: 12px;
        /* Texte descriptif encore plus compact */
    }

    .continue-button {
        font-size: 12px;
        /* Bouton encore plus compact */
        padding: 5px 10px;
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
