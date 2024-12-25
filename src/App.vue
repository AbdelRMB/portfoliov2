<template>
  <div id="app">
    <Navebar />
    <router-view/>
  </div>
</template>

<script>
import Navebar from './components/Navebar.vue';
import Home from './views/Home.vue';

export default {
  name: 'App',
  components: {
    Navebar,
    Home
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

body {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif; /* Remplace 'Press Start' */
  background-color: #1d001d;
  color: #ffffff; /* Couleur du texte pour un bon contraste */
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600; /* Poids gras pour les titres */
}

p, a, span, li {
  font-weight: 400; /* Poids normal pour les autres textes */
}
</style>
