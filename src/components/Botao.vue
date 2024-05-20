<template>
  <router-link :to="{ name: 'Home' }" class="home-button">
    <img src="@/assets/home.png" alt="Home" class="home-icon" />
    <span class="home-text">Voltar ao Menu</span>
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
.home-button {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  color: #333;
  text-decoration: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.home-button:hover {
  background-color: #e0e0e0;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.home-icon {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  transition: transform 0.3s ease;
}

.home-text {
  font-size: 16px;
  transition: color 0.3s ease;
}

.home-button:hover .home-icon {
  transform: scale(1.1);
}

.home-button:hover .home-text {
  color: #555;
}
</style>
