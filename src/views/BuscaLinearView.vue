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
    <Botao/>
    <div class="geral">

      <ModalConsulta v-show="isModalVisible" @closeModalCadastro="closeModal" @mandouArray="mandouArray"
        @mandouValor="mandouValor" />
      <div class="modal-backdrop fade show" v-show="isModalVisible"></div>


      <!-- <NavComponente/> -->
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
            <div id="box_i">i:</div>
            <div id="valor_i"></div>
            <div id="valor_j"></div>
          </div>
          <div class="imagemContainer">
            <div id="bordacodigo"></div>
            <div v-if="!mostrarJavaScript">
              <pre v-highlightjs>
          <code class="python">
            def busca_linear(lista, alvo):
              for i in range(len(lista)):
                if lista[i] == alvo:
                    return i
            return -1
          </code>
        </pre>
            </div>
          </div>
        </div>
      </transition>
      <div class="centralizar">
        <input class="botoes" v-show="!ordenou" @click="buscaLinear" type="submit" data-toggle="button"
          value="Buscar" />
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

gsap.registerPlugin(TextPlugin);

import ModalConsulta from "../components/Modais/ModalSearch.vue"
import Vue from 'vue'
import Botao from '../components/Botao.vue'
var tl = gsap.timeline()

export default {
  components: { ModalConsulta, Botao },
  name: 'HomeView',
  data(valorProcurado) {
    return {
      larguraDaTela: window.innerWidth,
      isModalVisible: true,
      elementos: [4, 3, 2, 1],
      oredenados: [1, 2, 3, 4],
      show: false,
      ordenou: false,
      meuValor: '',
      mostrarJavaScript: false
    };
  },
  mounted() {
    this.show = !this.show

    gsap.set("#bordacodigo", { scale: 0 }) //borda do codigo
    gsap.set("#i", { scale: 0 })//retangulo que representa a variavel i
    gsap.set("#j", { scale: 0 }) //retangulo que representa a variavel i
    gsap.set("#box_i", { scale: 0 })//letra i
    gsap.set("#box_j", { scale: 0 })//letra j

    // for (var i = 0; i < this.elementos.length; i++) {
    //   gsap.set(`#box${this.oredenados.indexOf(this.elementos[i])}` ,{ x: (i-this.oredenados.indexOf(this.elementos[i]))*100});

    // }
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
    mandouValor(valorProcurado) {
      this.meuValor = valorProcurado;
      console.log("valor procurado: " + this.meuValor)
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
      console.log("elementos " + this.elementos)
      console.log("oredenados " + this.oredenados)
      this.sort(this.oredenados)
      // evitando bug, aqui o algoritmo ordena antes da animação
      console.log("elementos " + this.elementos)
      console.log("oredenados " + this.oredenados)

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



    buscaLinear() {
      this.ordenou = true
      tl.set("#bordacodigo", { scale: 0.5 })
      tl.to("#bordacodigo", { y: -41.6666666667 * 1.5 });//controle da linha que le o codigo
      tl.to("#bordacodigo", { y: -41.6666666667 * 1.0 });//controle da linha que le o codigo
      //  for (var i = 0; i < this.elementos.length; i++) {
      //    gsap.set(`#box${this.oredenados.indexOf(this.elementos[i])}` ,{ x: (i-this.oredenados.indexOf(this.elementos[i]))*100});
      //  }//esse for é a primeira animação e é responsaável por desordenar o vetor mostrado na tela. multiplicado por 100, que é a largura do elemento HTML
      var length = this.elementos.length;//variavel tamanho do vetor  
      for (var i = 0; i < length; i++) {
        tl.set("#i", { scale: 1 })//box que seleciona o valor de i(animacao)
        tl.fromTo("#i", { x: (-0.5 * (this.elementos.length - 1) * document.querySelector(".box").offsetWidth + document.querySelector(".box").offsetWidth * (i - 1)) }, { x: (-0.5 * (this.elementos.length - 1) * document.querySelector(".box").offsetWidth + document.querySelector(".box").offsetWidth * (i)) });
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
        gsap.set("#box_i", { x: - 120 })//posicao no eixo x da letra i 
        gsap.set("#box_j", { x: 80 }) //posicao no eixo x da letra j
        tl.to("#valor_i", {
          text: {
            value: String(i),//mostra na tela o valor que a variavel i armazena
          },
        });


        if (this.elementos[i] == this.meuValor) {
          tl.to("#bordacodigo", { y: -41.6666666667 * 0 });//controle da linha que le o codigo
          tl.to(`#box${this.oredenados.indexOf(this.elementos[i])}`, {
            duration: 1, ease: "sine.out",//Especifica a função de easing a ser usada durante a animação. 
            //Neste caso, a função de easing é uma função de saída sinusoidal, o que significa que a animação começará mais devagar e acelerará à medida que avança.
            y: -250,
            backgroundColor: 'green',
          });
          return this.meuValor;
        }


      }
    }



  }

}

</script>

<style scoped>
.geral {
  /* background: rgb(56, 58, 59); */
  /* background: radial-gradient(circle, rgba(59, 86, 219, 1) 0%, rgba(61, 74, 138, 1) 100%); */
  width: 100%;
  height: 100vh;
}

.container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  color: black;
}


.imagemContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  width: 50rem;
}

.botoes {
  margin: 5px;
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

.centralizar {
  display: flex;
  justify-content: center;
  align-items: center;
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
  margin-top: 70px
}

#box_j {
  position: absolute;
  font-size: 50px;
  margin-top: 70px
}

#valor_i {
  position: absolute;
  font-size: 50px;
  margin-top: 70px;
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
  display: flex;
  flex-direction: center;
  height: 41.6666666667px;
  width: 500px;
  margin-left: 100px;
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