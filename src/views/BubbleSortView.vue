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
      <ModalConsultaPessoa v-show="isModalVisible" @closeModalCadastro="closeModal" @mandouArray="mandouArray" />
      <div class="modal-backdrop fade show" v-show="isModalVisible"></div>
      <!-- <h3>Atualize a página(F5) caso enfrente problemas</h3> -->
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
            <div id="box_j">j:</div>
            <div id="valor_i"></div>
            <div id="valor_j"></div>
          </div>
          <div class="imagemContainer">
            <pre v-highlightjs>
        <code class="python">
          def bubblesort(lista):
            lenght = len(lista)
            for i in range(lenght-1):
                for j in range(0, lenght-i-1):
                    if lista[j] > lista[j+1]:
                        temp = lista[j]
                        lista[j] = lista[j+1]
                        lista[j+1] = temp
          </code>
        </pre>
            <div id="bordacodigo"></div>
          </div>
        </div>
      </transition>
      <div class="centralizar">
        <input class="botoes" v-show="!ordenou" @click="bubbleSort" type="submit" data-toggle="button"
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

gsap.registerPlugin(TextPlugin);

import ModalConsultaPessoa from "../components/Modais/ModalCreateArray.vue"
import Vue from 'vue'
import Botao from '../components/Botao.vue'
var tl = gsap.timeline()

export default {
  components: { ModalConsultaPessoa, Botao },
  name: 'HomeView',
  data() {
    return {
      larguraDaTela: window.innerWidth,
      isModalVisible: true,
      elementos: [4, 3, 2, 1],
      oredenados: [1, 2, 3, 4],
      show: false,
      ordenou: false

    };
  },
  mounted() {
    this.show = !this.show

    gsap.set("#bordacodigo", { scale: 0 })
    gsap.set("#i", { scale: 0 })
    gsap.set("#j", { scale: 0 })
    gsap.set("#box_i", { scale: 0 })
    gsap.set("#box_j", { scale: 0 })

    // for (var i = 0; i < this.elementos.length; i++) {
    //   gsap.set(`#box${this.oredenados.indexOf(this.elementos[i])}` ,{ x: (i-this.oredenados.indexOf(this.elementos[i]))*100});

    // }
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

    bubbleSort() {
      this.ordenou = true
      tl.set("#bordacodigo", { scale: 0.5 })
      // for (let i = 3.2; i > -7.2; i = i-0.5) {
      //   const valor = 2.5 + i;
      //   tl.to("#bordacodigo", { y: -41.6666666667 * valor });
      // }
      tl.to("#bordacodigo", { y: -41.6666666667 * 2.2 });//controle da linha que le o codigo
      tl.to("#bordacodigo", { y: -41.6666666667 * 1.7 });//controle da linha que le o codigo
      for (var i = 0; i < this.elementos.length; i++) {
        gsap.set(`#box${this.oredenados.indexOf(this.elementos[i])}`, { x: (i - this.oredenados.indexOf(this.elementos[i])) * 100 });
      }//esse for é a primeira animação e é responsaável por desordenar o vetor mostrado na tela. multiplicado por 100, que é a largura do elemento HTML
      var length = this.elementos.length;//variavel tamanho do vetor  
      for (var i = 0; i < length; i++) {
        tl.to("#bordacodigo", { y: -41.6666666667 * 1.2 });//controle da linha que le o codigo
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
        for (var j = 0; j < (length - i - 1); j++) {
          tl.to("#bordacodigo", { y: -41.6666666667 * 0.7 });//controle da linha que le o codigo
          tl.set("#j", { scale: 1 })//box que seleciona o valor de j(animacao)
          tl.fromTo("#j", { x: (-0.5 * (this.elementos.length - 1) * document.querySelector(".box").offsetWidth + document.querySelector(".box").offsetWidth * (j - 1)) }, { x: (-0.5 * (this.elementos.length - 1) * document.querySelector(".box").offsetWidth + document.querySelector(".box").offsetWidth * (j)) });
          tl.to("#valor_j", {
            text: {
              value: String(j),//mostra na tela o valor que a variavel j armazena
            },
          });
          // tl.to("#bordacodigo", { y: -41.6666666667 * 2.5 });//controle da linha que le o codigo
          // tl.to("#bordacodigo", { y: -41.6666666667 * 2.5 });//controle da linha que le o codigo
          tl.to("#bordacodigo", { y: 41.6666666667 * 1.25 });
          if (this.elementos[j] > this.elementos[j + 1]) {
            // tl.to(`#box${this.oredenados.indexOf(this.elementos[j])}`, { 
            //   duration: 0.3,// Define a duração da animação em segundos.
            //   backgroundColor: 'blue',//Define a cor de fundo do elemento como 'orange'.
            //   yoyo: true,//Define se a animação deve alternar de ida e volta.
            //   repeat: 2,//Define o número de vezes que a animação deve se repetir.
            // });
            // tl.to(`#box${this.oredenados.indexOf(this.elementos[j+1])}`, { 
            //   duration: 0.3,
            //   backgroundColor: 'blue',
            //   yoyo: true,
            //   repeat: 2,
            // },"<");//"<" significa que deve começar imediatamente apos a animacao anterior
            // tl.to(`#box${this.oredenados.indexOf(this.elementos[j])}`, { 
            //   duration: 0.3,
            //   backgroundColor: 'pink',
            // });
            // tl.to(`#box${this.oredenados.indexOf(this.elementos[j+1])}`, { 
            //   duration: 0.3,
            //   backgroundColor: 'pink',
            // },"<");
            tl.to(`#box${this.oredenados.indexOf(this.elementos[j])}`, {
              duration: 1, ease: "sine.out",//Especifica a função de easing a ser usada durante a animação. 
              //Neste caso, a função de easing é uma função de saída sinusoidal, o que significa que a animação começará mais devagar e acelerará à medida que avança.
              y: -250,
            });//responsavel por 'levantar' os blocos do vetor pra fazer a troca
            tl.to(`#box${this.oredenados.indexOf(this.elementos[j + 1])}`, {
              duration: 1, ease: "sine.out",
              y: -250,

            }, "<");
            tl.to(`#box${this.oredenados.indexOf(this.elementos[j + 1])}`, { x: (j - this.oredenados.indexOf(this.elementos[j + 1])) * 100, duration: 2, ease: "sine.out", });
            //aqui é realizada a primeira troca de posicoes
            //x Define a posição horizontal final do elemento após a animação. 
            //A posição é calculada subtraindo o índice do elemento j pelo índice do elemento j+1, multiplicado por 100. 
            //Isso provavelmente visa posicionar o elemento na posição correta durante a ordenação.

            tl.to(`#box${this.oredenados.indexOf(this.elementos[j])}`, { x: ((j + 1) - this.oredenados.indexOf(this.elementos[j])) * 100, duration: 2, ease: "sine.out", }, "<");
            //mesma coisa da linha de codigo acima. Basicamente essas duas linhas sao responsaveis por trocar a posicao

            tl.to(`#box${this.oredenados.indexOf(this.elementos[j])}`, {
              duration: 1, ease: "sine.out",
              y: 0,
            });
            tl.to(`#box${this.oredenados.indexOf(this.elementos[j + 1])}`, {
              duration: 1, ease: "sine.out",
              y: 0,

            }, "<");//o trecho de codigo acima faz com que os blocos de vetor que foram levantados retornem ao local padrão
            // tl.to("#bordacodigo", { y: 41.6666666667 * -1.3 });//controle da linha que le o codigo
            if (((j + 1) - this.oredenados.indexOf(this.elementos[j])) == 0) {
              tl.to(`#box${this.oredenados.indexOf(this.elementos[j])}`, {
                duration: 0.3,
                backgroundColor: 'green',
                yoyo: true,
                repeat: 2,
              });
            }

            //atribuições finais dentro do if
            let tmp = this.elementos[j];
            this.$set(this.elementos, j, this.elementos[j + 1])
            this.$set(this.elementos, j + 1, tmp)
            //volta pro primeiro for
          }
        }

      }
      tl.to(`#box0`, {
        duration: 0.3,
        backgroundColor: 'green',
        yoyo: true,
        repeat: 2,
      });
      tl.set("#i", { scale: 0 })
      tl.set("#j", { scale: 0 })
      tl.set("#bordacodigo", { scale: 0 })
    }

  }

}

</script>

<style scoped>
.geral {
  /* background: radial-gradient(circle, rgba(59, 86, 219, 1) 0%, rgba(61, 74, 138, 1) 100%); */
  /* background: rgb(56, 58, 59); */
  background: #fff; 
  width: 100%;
  height: 100vh;
  /* adicionados */
  margin: 0;
  padding: 0;

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
  /* adicionados */
  width: 100%;
  height: 100vh;

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
  height: 200px;
  /* background: pink;  */
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
  margin-top: 70px
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
  width: 650px;
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
  color: #000;
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