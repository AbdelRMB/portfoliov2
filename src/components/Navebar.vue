<template>
    <header class="header">
        <nav class="navbar2">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">Abdelrahim Riche</router-link>
                </li>
            </ul>
        </nav>
        <!-- Hamburger menu -->
        <div class="hamburger-menu" @click="toggleMenu">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <nav class="navbar" :class="{ open: isMenuOpen }">
            <ul class="navbar-nav">
                <li class="nav-item" v-for="item in menuItems" :key="item.name">
                    <router-link :to="item.route" class="nav-link" active-class="nav-link-active" @click="closeMenu">
                        {{ item.name }}
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: "Navbar",
    data() {
        return {
            menuItems: [
                { name: "Présentation", route: "/" },
                { name: "Services", route: "/services" },
                { name: "Résumé", route: "/resume" },
                { name: "Projets", route: "/projects" },
                { name: "Contact", route: "/contact" },
            ],
            isMenuOpen: false, // État pour le menu hamburger
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen; // Bascule entre ouvert et fermé
        },
        closeMenu() {
            this.isMenuOpen = false; // Ferme le menu après avoir cliqué sur un lien
        },
    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

.header {
    margin: 0;
    padding: 0;
    background-color: #1d001d;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    font-family: "Press Start 2P", cursive;
    align-items: center;
}

.navbar2 {
    margin-left: 50px;
}

.navbar {
    display: flex;
    list-style: none;
    padding: 0;
}

.navbar-nav {
    display: flex;
    gap: 50px;
}

.nav-item {
    margin: 0;
}

.nav-link {
    color: #ffffff;
    text-decoration: none;
    font-size: 10px;
    font-weight: 500;
    position: relative;
    padding-bottom: 5px;
}

.nav-link:hover,
.nav-link-active {
    color: #d14f81;
}

.nav-link::after {
    content: "";
    display: block;
    width: 0;
    margin-top: 5px;
    height: 2px;
    background: #d14f81;
    transition: width 0.3s;
}

.nav-link:hover::after,
.nav-link-active::after {
    width: 100%;
}

/* Hamburger menu */
.hamburger-menu {
    display: none;
    flex-direction: column;
    cursor: pointer;
    padding: 10px;
}

.hamburger-menu div {
    background-color: #ffffff;
    height: 2px;
    width: 25px;
    margin: 3px 0;
    transition: all 0.3s ease;
}

.hamburger-menu:hover div {
    background-color: #d14f81;
}

@keyframes slideDown {
    from {
        max-height: 0;
        opacity: 0;
    }

    to {
        max-height: 500px;
        /* Assurez-vous que ce soit suffisamment grand pour votre menu */
        opacity: 1;
    }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
    .navbar {
        display: none;
        /* Masqué par défaut */
        overflow: hidden;
        /* Empêche le débordement lors de l'animation */
        max-height: 0;
        /* Taille initiale à 0 */
        transition: max-height 0.3s ease, opacity 0.3s ease;
    }

    .hamburger-menu {
        display: flex;
    }

    .navbar.open {
        display: flex;
        /* Affiche le menu lorsque ouvert */
        max-height: 500px;
        /* Taille maximum pour le menu déroulant */
        flex-direction: column;
        position: absolute;
        top: 60px;
        right: 0;
        background-color: #1d001d;
        width: 100%;
        padding: 1rem;
        z-index: 10;
        animation: slideDown 0.3s ease forwards;
    }

    .navbar-nav {
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
    }

    .nav-link {
        font-size: 14px;
        padding: 10px 0;
        width: 100%;
        text-align: left;
    }
}

@media (max-width: 480px) {
    .header {
        padding: 0.5rem 1rem;
    }
}
</style>
