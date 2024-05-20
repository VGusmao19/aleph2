<template>
  <router-link :to="{ name: 'Home' }">
    <img src="@/assets/home.png" alt="Home" class="home" />
  </router-link>
</template>

  <script>
  export default {
    name: 'Botao',
    methods: {
      goToRoute() {
        this.$router.push({ name: '/' });
      }
    }
  }
  </script>

  <style>
  .home {
    position: fixed;
    top: 10px;
    left: 10px;
    /* padding: 10px 20px; */
    color: black;
    border: none;
    cursor: pointer;
    width: 3%;
    height: 5%;
  }
  </style>
