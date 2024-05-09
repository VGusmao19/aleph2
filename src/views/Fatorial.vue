<template>
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
  </head>
  <body>
    <div class="geral">
      <ModalConsulta v-show="isModalVisible" @closeModalCadastro="closeModal" @mandouArray="mandouArray"
        @mandouValor="mandouValor" />
      <div class="modal-backdrop fade show" v-show="isModalVisible"></div>
      <!-- <NavComponente/> -->
      <h3>Atualize a página(F5) caso enfrente problemas</h3>
      <transition name="fade">
        <div class="container">
          <div class="boxcontainer">
            <div class="caixas" v-for="(elemento, index) in elementos" :key="index">
              <div v-bind:id="`box${index}`" class="box">
                {{ elemento }}
              </div>
            </div>
            <div id="box_esquerda">resultado:</div>
            <div id="valor_esquerda"></div>
          </div>
          <div class="imagemContainer">
            <div v-if="!mostrarJavaScript">
              <pre v-highlightjs>
          <code class="python">
          def fatorial(num):
          if num == 0 or num == 1:
              return 1
          else:
              resultado = 1
              for i in range(2, num + 1):
                  resultado *= i
              return resultado
          </code>
        </pre>
            </div>
          </div>
        </div>
      </transition>
      <div class="centralizar">
        <input class="botoes" v-show="!ordenou" @click="fatorial" type="submit" data-toggle="button" value="Ordenar" />
        <input class="botoes" v-show="ordenou" @click="reverter" type="submit" data-toggle="button" value="Reverter" />
        <input class="botoes" v-show="ordenou" @click="pausar" type="submit" data-toggle="button"
          value="Pausar/Continuar" />
      </div>

    </div>
  </body>
  </html>
</template>
<script>

import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";



(TextPlugin);

import ModalConsulta from "../components/Modais/ModalSearch.vue"
import Vue from 'vue'


var tl = gsap.timeline()

export default {
  components: { ModalConsulta },
  name: 'HomeView',
  data() {
    return {
      larguraDaTela: window.innerWidth,
      isModalVisible: true,
      elementos: [],
      oredenados: [],
      show: false,
      ordenou: false,
      meuValor: '',
      mostrarJavaScript: false,
    };
  },
  mounted() {
    this.show = !this.show

    gsap.set("#bordacodigo", { scale: 0 }) //borda do codigo

  },
  created() {

  },
  methods: {
    sort(items) {
      let n = items.length;
      for (let i = 0; i < n; i++) {
        let min = i;
        for (let j = i + 1; j < n; j++) {
          if (items[j] < items[min]) {
            min = j;
          }
        }
        if (min != i) {
          let tmp = items[i];
          items[i] = items[min];
          items[min] = tmp;
        }
      }
    },
    exibirImplementacao() {
      this.mostrarJavaScript = !this.mostrarJavaScript;
    },
    mandouArray(array) {
      console.log("mandou o array")
      console.log(array)
      console.log(array.length)
      this.elementos = []
      this.oredenados = []
      for (let i = 0; i < 1; i++) {
        this.$set(this.elementos, i, i)
        this.oredenados.push(array[i])
      }
      sort(this.oredenados)
      console.log("elementos " + this.elementos)
      console.log("oredenados " + this.oredenados)
      console.log("elementos " + this.elementos)
      console.log("oredenados " + this.oredenados)

    },
    mandouValor(valorProcurado) {
      this.meuValor = valorProcurado;
      console.log("valor procurado: " + this.meuValor)
    },
    pausar() {
      tl.paused(!tl.paused())
    },
    reverter() {
      tl.reversed(!tl.reversed())
      if (tl.paused()) {
        tl.paused(!tl.paused())
      }
    },
    showModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
    },
    fatorial() {
      //irei usar valor direita como valor de n (numero que sera usado na funcao fatorial)
      this.ordenou = true
      tl.set("#bordacodigo", { scale: 0.5 })
      tl.to("#bordacodigo", { y: -41.6666666667 * 5.5 });//controle da linha que le o codigo
      tl.to("#bordacodigo", { y: -41.6666666667 * 4.5 });//controle da linha que le o codigo
      // for (var i = 0; i < this.elementos.length; i++) {
      //   gsap.set(`#box${this.oredenados.indexOf(this.elementos[i])}` ,{ x: (i-this.oredenados.indexOf(this.elementos[i]))*100});
      // }//esse for é a primeira animação e é responsaável por desordenar o vetor mostrado na tela. multiplicado por 100, que é a largura do elemento HTML
      // gsap.set("#box_i",{scale: 1})//tamanho da palavra subvalor
      gsap.set("#valor_esquerda", { x: -100 })//valor de valor retornado
      gsap.set("#valor_esquerda", { y: 150 })
      gsap.set("#valor_direita", { x: -80 })//valor de n
      gsap.set("#valor_direita", { y: 200 })
      gsap.set("#valor_i", { y: 100 })//valor de subvalor
      gsap.set("#valor_i", { x: -100 })
      var meuElementoI = document.getElementById(`box${0}`);
      var num = this.meuValor;
      var contaBloco = this.meuValor;
      this.meuValor = 1; //atribuindo 1 para o valor da recusão ficar certo
      for (let i = 2; i <= num; i++) {
        this.meuValor *= i;
        tl.to("#valor_esquerda", {
          text: {
            value: String(this.meuValor),
          },
        });      
        this.$createElement(this.elementos, 1, i);
        tl.to(meuElementoI, {
          text: {
            value: String(i),
          },
        });
      }
      tl.to("#valor_direita", {
        text: {
          value: String(this.meuValor),//mostra na tela o valor que a variavel i armazena
        },
      });
    }
  }
}

</script>

<style scoped>
.geral {
  /* background: radial-gradient(circle, rgba(59, 86, 219, 1) 0%, rgba(61, 74, 138, 1) 100%); */
  /* background: rgb(56, 58, 59); */
  width: 100%;
  height: 100vh;
}

.caixas {
  display: flex;
}

#asterisco {
  margin-top: 40px;
}

.box {
  background-color: #FFB6C1;
  height: 100px;
  width: 100px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  position: static;
  border-radius: 25px;
  border: 2px solid black;
}


.boxcontainer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 700px;
  width: 700px;
  color: BLACK
}


.imagemContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  width: 50rem;
  background: #fff;
}


.container {

  display: flex;
  align-items: center;
  justify-content: space-between;

}

.centralizar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.botoes {
  margin: 10px;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #699CFC;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 200px;
  box-shadow: 2px 4px 8px black;
}

#i {
  position: absolute;
  font-size: 50px;
  margin-top: 70px
}

#j {
  position: absolute;
  font-size: 50px;
  margin-top: 70px
}

#box_i {
  color: pink;
  position: absolute;
  font-size: 50px;
  margin-top: 70px;
  /* top: 70px; 
    left: 50%;  */
  transform: translate(-620%, 130%);
}

#box_esquerda {
  color: BLACK;
  position: absolute;
  font-size: 50px;
  margin-top: 70px;
  /* left: -20%;
    right: 35%;
    top: 60%; */
  transform: translate(-115%, 200%);
}

#box_direita {
  color: red;
  position: absolute;
  font-size: 50px;
  margin-top: 70px;
  /* left: -20%;
    right: 31%;
    top: 65%; */
  transform: translate(-387%, 260%);
}

#valor_i {
  position: absolute;
  font-size: 50px;
  margin-top: 70px;
  /* top: 140px;
    left: 50%;
    transform: translateX(-50%);*/
}

#valor_direita {
  position: absolute;
  font-size: 50px;
  margin-top: 70px;
  /* top: 140px;
    left: 50%;
    transform: translateX(-50%);*/
}

#valor_esquerda {
  position: absolute;
  font-size: 50px;
  margin-top: 70px;
  /* top: 140px;
    left: 50%;
    transform: translateX(-50%);*/
}

#valor_j {
  position: absolute;
  font-size: 50px;
  margin-top: 70px
}

#borda {
  background-color: white;
  border-style: solid;
  border-width: 4px;
  height: 100px;
  width: 100px;
  opacity: 0.5;
  border-radius: 25px;
}

#bordacodigo {
  height: 41.6666666667px;
  width: 500px;
  position: absolute;
  background-color: white;
  border-style: solid;
  border-width: 4px;
  opacity: 0.5;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 1;
}

.fade-enter-active

/* .fade-leave-active below version 2.1.8 */
  {
  transition: all 2s ease;
}

h3 {
  color: white;
}

h3 {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

code {
  display: block;
  overflow-x: auto;
  white-space: pre;
  background-color: inherit;
  /* ou defina a cor de fundo desejada */
}
</style>