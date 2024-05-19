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
      <Botao/>
      <ModalConsulta v-show="isModalVisible" @closeModalCadastro="closeModal" @mandouArray="mandouArray"
        @mandouValor="mandouValor" />
      <div class="modal-backdrop fade show" v-show="isModalVisible"></div>
      <h3>Atualize a página(F5) caso enfrente problemas</h3>
      <transition name="fade">
        <div class="container">
          <div class="boxcontainer">
            <div v-bind:id="`box${index}`" class="box" v-for="(elemento, index) in elementos" :key="index">
              {{ elemento }}
            </div>

            <div id="i">
              <div id="borda"></div>i
            </div>
            <div id="j">
              <div id="borda"></div>j
            </div>
            <div id="box_i">meio:</div>
            <div id="box_esquerda">esquerda:</div>
            <div id="box_direita">direita:</div>
            <div id="valor_i"></div>
            <div id="valor_esquerda"></div>
            <div id="valor_direita"></div>
          </div>
          <div class="imagemContainer">
            <div id="bordacodigo"></div>
            <pre v-highlightjs>
                <code class="python">
                  function buscaBinaria(lista, alvo) {
                      let esquerda = 0;
                      let direita = lista.length - 1;
                      while(esquerda <= direita) {
                          let meio = Math.floor((esquerda + direita) / 2);
                          if (lista[meio] === alvo) {
                              return meio;
                          } else if (lista[meio] > alvo) {
                            direita = meio - 1;
                          } else {
                            esquerda = meio + 1;
                          }
                      }
                      return -1;
                </code>
              </pre>
          </div>
        </div>
      </transition>

      <div class="centralizar">
        <input class="botoes" v-show="!ordenou" @click="BuscaBinaria" type="submit" data-toggle="button"
          value="Ordenar" />
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
import hljs from 'highlight.js';
import Botao from '../components/Botao.vue'
var tl = gsap.timeline()

export default {
  components: { ModalConsulta, Botao },
  name: 'HomeView',
  data() {
    return {
      larguraDaTela: window.innerWidth,
      isModalVisible: true,
      elementos: [4, 3, 2, 1],
      oredenados: [1, 2, 3, 4],
      show: false,
      ordenou: false,
      meuValor: '',
      mostrarJavaScript: false,
    };
  },
  mounted() {
    this.show = !this.show
    gsap.set("#bordacodigo", { scale: 0 }) //borda do codigo
    gsap.set("#i", { scale: 0 })//retangulo que representa a variavel i
    gsap.set("#j", { scale: 0 }) //retangulo que representa a variavel i
    gsap.set("#box_i", { scale: 0 })//letra i
    gsap.set("#box_j", { scale: 0 })//letra j
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
      for (let i = 0; i < array.length; i++) {
        this.$set(this.elementos, i, array[i])
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



    BuscaBinaria() {
      this.ordenou = true
      tl.set("#bordacodigo", { scale: 0.5 })
      tl.to("#bordacodigo", { y: -41.6666666667 * 3.8 });//controle da linha que le o codigo
      tl.to("#bordacodigo", { y: -41.6666666667 * 3.3 });//controle da linha que le o codigo
      tl.to("#bordacodigo", { y: -41.6666666667 * 2.8 });//controle da linha que le o codigo
      tl.to("#bordacodigo", { y: -41.6666666667 * 2.3 });//controle da linha que le o codigo
      tl.to("#bordacodigo", { y: -41.6666666667 * 1.75 });//controle da linha que le o codigo
      var length = this.elementos.length;//variavel tamanho do vetor
      var esquerda = 0;
      var direita = length - 1;
      var meio = Math.ceil((esquerda + direita) / 2);
      while (esquerda <= direita) {
        meio = Math.ceil((esquerda + direita) / 2)
        tl.set("#i", { scale: 1 })//box que seleciona o valor de i(animacao)
        tl.fromTo("#i", { x: (-0.5 * (this.elementos.length - 1) * document.querySelector(".box").offsetWidth + document.querySelector(".box").offsetWidth * (meio - 1)) }, { x: (-0.5 * (this.elementos.length - 1) * document.querySelector(".box").offsetWidth + document.querySelector(".box").offsetWidth * (meio)) });
        //o trecho de cogio acima cria a animacao de entrada da caixa de seleção (quadrado que seleciona) a variavel i
        gsap.set("#box_i", { scale: 1 })//tamanho da letra i, que marca o valor da variavel
        gsap.set("#box_j", { scale: 1 })//tamanho da letra j, que marca o valor da variavel
        gsap.set("#valor_i", { scale: 1 })//tamanho do numero que i armazena
        gsap.set("#valor_j", { scale: 1 })//tamanho do numero que j armazena
        gsap.set("#box_i", { y: 100 })//posicao da letra i
        gsap.set("#box_j", { y: 100 })//posicao da letra j
        gsap.set("#valor_i", { y: 100 })//posicao no eixo y do valor que a variavel i armzena
        gsap.set("#valor_j", { y: 100 })//posicao no eixo y do valor que a variavel j armzena
        gsap.set("#valor_i", { x: -90 })//posicao no eixo x do valor que a variavel i armzena
        gsap.set("#valor_j", { x: 110 })//posicao no eixo x do valor que a variavel j armzena
        gsap.set("#valor_esquerda", { x: -90 })
        gsap.set("#valor_direita", { x: -90 })
        gsap.set("#valor_esquerda", { y: 150 })
        gsap.set("#valor_direita", { y: 200 })
        gsap.set("#box_i", { x: - 120 })//posicao no eixo x da letra i
        gsap.set("#box_j", { x: 80 }) //posicao no eixo x da letra j
        tl.to("#valor_i", {
          text: {
            value: String(meio),//mostra na tela o valor que a variavel i armazena
          },
        });
        tl.to("#valor_esquerda", {
          text: {
            value: String(esquerda),//mostra na tela o valor que a variavel i armazena
          },
        });
        tl.to("#valor_direita", {
          text: {
            value: String(direita),//mostra na tela o valor que a variavel i armazena
          },
        });
        if (this.elementos[meio] == this.meuValor) {
          tl.to("#bordacodigo", { y: -41.6666666667 * 1.25 });//controle da linha que le o codigo
          tl.to(`#box${this.oredenados.indexOf(this.elementos[meio])}`, {
            duration: 0.3,
            backgroundColor: 'green',
            yoyo: true,
            repeat: 2,
          });
          return meio;
        }
        else if (this.elementos[meio] > this.meuValor) {
          tl.to("#bordacodigo", { y: -41.6666666667 * 0.2 });//controle da linha que le o codigo
          direita = meio - 1;
          for (var i = direita + 1; i < length; i++) {
            tl.to(`#box${this.oredenados.indexOf(this.elementos[i])}`, {
              duration: 0.3,
              backgroundColor: 'grey',
            });
          }
        } else {
          tl.to("#bordacodigo", { y: -41.6666666667 * -0.8 });//controle da linha que le o codigo
          esquerda = meio + 1;
          for (var i = 0; i < esquerda; i++) {
            tl.to(`#box${this.oredenados.indexOf(this.elementos[i])}`, {
              duration: 0.3,
              backgroundColor: 'grey',
              // y: +20,
            });
          }
        }
      }
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
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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


.container {

  display: flex;
  align-items: center;
  justify-content: space-between;

}

.boxcontainer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 700px;
  width: 700px;
}


.imagemContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  background: white;
  width: 50rem;
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
  position: absolute;
  font-size: 50px;
  margin-top: 70px;
  transform: translateX(-50%);
}

#box_esquerda {
  position: absolute;
  font-size: 50px;
  margin-top: 70px;
  /* left: -20%;
  right: 35%;
  top: 60%; */
  transform: translate(-105%, 200%);
}

#box_direita {
  position: absolute;
  font-size: 50px;
  margin-top: 70px;
  /* left: -20%;
  right: 31%;
  top: 65%; */
  transform: translate(-130%, 260%);
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
  width: 1050px;
  position: absolute;
  border-style: solid;
  border-width: 4px;
  opacity: 0.5;
  margin-left: 50px;
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