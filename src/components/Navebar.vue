<template>
    <header class="header">
        <nav class="navbar2">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">Abdelrahim Riche</router-link>
                </li>
            </ul>
        </nav>
        <nav class="navbar">
            <ul class="navbar-nav">
                <li class="nav-item" v-for="item in menuItems" :key="item.name">
                    <router-link :to="item.route" class="nav-link" active-class="nav-link-active">
                        {{ item.name }}
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Navebar',
    data() {
        return {
            menuItems: [
                { name: 'Présentation', route: '/' },
                { name: 'Services', route: '/services' },
                { name: 'Résumé', route: '/resume' },
                { name: 'Projets', route: '/projects' },
                { name: 'Contact', route: '/contact' }
            ]
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.header {
    margin: 0;
    padding: 0;
    background-color: #1d001d;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    font-family: 'Press Start 2P', cursive;
    align-items: center; /* Assure that items are aligned vertically center */
}

.navbar2 {
    margin-left: 50px;
}

.navbar {
    display: flex;
    list-style: none;
    padding: 0;
}

.nav-item {
    margin: 0 20px;
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
    content: '';
    display: block;
    width: 0;
    margin-top: 5px;
    height: 2px;
    background: #d14f81;
    transition: width .3s;
}

.nav-link:hover::after,
.nav-link-active::after {
    width: 100%;
}

ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    align-items: center;
}

/* Media Queries */
@media (max-width: 1024px) {
    .header {
        flex-direction: column;
        padding: 1rem 1rem;
    }

    .navbar,
    .navbar2 {
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .nav-item {
        margin: 10px 0;
    }
}

@media (max-width: 768px) {
    .navbar {
        display: none; /* Hide navbar items and potentially replace with a hamburger menu */
    }

    .navbar2 .nav-link {
        font-size: 12px; /* Slightly larger font for the main site title on smaller screens */
    }

    /* Hamburger icon style */
    .hamburger-menu {
        display: flex; /* Show hamburger icon */
        flex-direction: column;
        cursor: pointer;
        padding: 10px 0;
    }

    .hamburger-menu div {
        background-color: #ffffff;
        height: 2px;
        width: 25px;
        margin: 3px 0;
    }
}

@media (max-width: 480px) {
    .header {
        padding: 0.5rem 1rem;
    }
}
</style>
