<template>
  <router-link :to="{ name: 'Home' }">
    <img src="@/assets/home.png" alt="Home" class="top-left-button" />
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
  
  <style scoped>
  .top-left-button {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 10px 20px;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 5%;
    height: 8%;
  }
  </style>
  