<template>
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap"
      rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
  </head>

  <body>
    <div class="tudo">
      <div class="tela">
        <div class="title-container">
          <!-- <h1>Algoritmos disponíveis para visualização:</h1> -->
        </div>
        <div class="buttons-container">
          <div class="button-content">
            <button v-for="(button, index) in topButtons" :key="index" class="botao" @click="goToPage(button.route)">
            <img :src="button.icon" alt="Ícone" class="button-icon" :style="{ width: button.iconWidth, height: button.iconHeight, color: button.color }">
            {{button.text }}</button>
          </div>
        </div>
        <div class="buttons-container">
          <button v-for="(button, index) in bottomButtons" :key="index" class="botao" @click="goToPage(button.route)">
          <img :src="button.icon" alt="Ícone" class="button-icon" :style="{ width: button.iconWidth, height: button.iconHeight, color: button.color }">
          {{ button.text }}</button>
        </div>
      </div>
    </div>
  </body>

  </html>


</template>

<script>
export default {
  data() {
    return {
      topButtons: [
        { text: 'BUBBLE SORT', route: '/BubbleSort', icon: require("@/assets/bolhas.png"), iconWidth: '30px', iconHeight: '30px', color:'black' },
        { text: 'FATORIAL', route: '/Fatorial', icon: require("@/assets/exclamacao.png"), iconWidth: '30px', iconHeight: '30px', color:'black' },
        { text: 'INSERTION SORT', route: '/InsertionSort', icon: require("@/assets/inserir.png"), iconWidth: '30px', iconHeight: '30px', color:'black' },
        // Adicione outros botões e rotas conforme necessário
      ],
      bottomButtons: [
        { text: 'BUSCA BINÁRIA', route: '/BuscaBinaria', icon: require("@/assets/binario.png"), iconWidth: '30px', iconHeight: '30px', color:'black' },
        { text: 'BUSCA LINEAR', route: '/BuscaLinear', icon: require("@/assets/lupa.png"), iconWidth: '30px', iconHeight: '30px', color:'black' },
        { text: 'SELECT SORT', route: '/SelectionSort', icon: require("@/assets/escolha.png"), iconWidth: '30px', iconHeight: '30px', color:'black'  },
        // Adicione outros botões e rotas conforme necessário
      ]
    };
  },
  methods: {
    goToPage(route) {
      this.$router.push(route); // Navegar para a rota especificada
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.tudo {
  width: 100%;
  /* background: linear-gradient(to bottom, #0ea1eb, #353333); */
  /* background: rgb(56, 58, 59); */
  /* background: radial-gradient(circle, rgba(59, 86, 219, 1) 0%, rgba(61, 74, 138, 1) 100%); */
  overflow-y: auto;
  overflow-x: auto;
  max-height: 100%;
}

.title-container {
  margin-bottom: 60px;
  font-family: "Exo 2", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-size: larger;
}

.tela {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

.buttons-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  height: 200px;
  font-family: "Exo 2", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-size: larger;
}

.botao {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: white;
  border: black;
  border-radius: 5px;
  cursor: pointer;
  width: 200px;
  height: 200px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0px 2px 4px black;
  border-color: black;
  border-style: solid;
  border-width: 2px;
  height: 200px;
  width: 200px;
  opacity: 0.5;
  border-radius: 25px;
}


.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button:hover {
  background-color: #a0a0a0;
}

h1 {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>
