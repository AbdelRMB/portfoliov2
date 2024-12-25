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
body{
  margin: 0;
  padding: 0;
  font-family: 'Press Start', cursive;
  background-color: #1d001d;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>