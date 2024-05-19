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
    <ModalConsultaPessoa v-show="isModalVisible" @closeModalCadastro="closeModal" @mandouArray="mandouArray" />
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
          <div id="min">min:</div>
          <div id="boxmin"></div>
          <div id="box_i">i:</div>
          <div id="box_j">j:</div>
          <div id="valor_i"></div>
          <div id="valor_j"></div>
        </div>
        <div class="imagemContainer">
          <div id="bordacodigo"></div>
          <pre v-highlightjs>
                <code class="python">
                  def selection_sort(lista):
                    length = len(lista)
                    for i in range(length):
                      min = i
                      for j in range(i+1, length):
                          if lista[j] < lista[min]:
                              min = j
                      lista[i], lista[min] = lista[min], lista[i]
                </code>
              </pre>
        </div>
        <!-- <input @click="selectionSort" type="submit" class="btn btn-primary" data-toggle="button" value="Ordenar"/> -->
      </div>
    </transition>
    <div class="centralizar">
      <input class="botoes" v-show="!ordenou" @click="selectionSort" type="submit" data-toggle="button"
        value="Ordenar" />
      <input class="botoes" v-show="ordenou" @click="reverter" type="submit" data-toggle="button" value="Reverter" />
      <input class="botoes" v-show="ordenou" @click="pausar" type="submit" data-toggle="button"
        value="Pausar/Continuar" />
    </div>

    <!-- <button @click="selectionSort">Ordenar</button> -->
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
  name: 'SelectionSortView',
  data() {
    return {
      larguraDaTela: window.innerWidth,
      isModalVisible: true,
      elementos: [4, 3, 2, 1],
      oredenados: [1, 2, 3, 4],
      show: false,
      min: undefined,
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
    gsap.set("#boxmin", { scale: 0 })
    gsap.set("#min", { scale: 0 })

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

    selectionSort() {
      this.ordenou = true
      tl.set("#bordacodigo", { scale: 0.5 })
      tl.to("#bordacodigo", { y: -41.6666666667 * 2.2 });//controle da linha que le o codigo
      for (var i = 0; i < this.elementos.length; i++) {
        gsap.set(`#box${this.oredenados.indexOf(this.elementos[i])}`, { x: (i - this.oredenados.indexOf(this.elementos[i])) * 100 });
      }
      let n = this.elementos.length;
      var i = 0
      var j = i + 1
      for (i = 0; i < n; i++) {
        tl.to("#bordacodigo", { y: -41.6666666667 * 1.2 });//controle da linha que le o codigo
        tl.set("#boxmin", { scale: 1 })
        tl.set("#min", { scale: 1 })
        tl.set("#boxmin", { y: 180 })
        tl.set("#min", { y: 180 })
        tl.set("#boxmin", { x: 30 })
        tl.set("#min", { x: -40 })
        gsap.set("#box_i", { scale: 1 })
        gsap.set("#box_j", { scale: 1 })
        gsap.set("#valor_i", { scale: 1 })
        gsap.set("#valor_j", { scale: 1 })
        gsap.set("#box_i", { y: 100 })
        gsap.set("#box_j", { y: 100 })
        gsap.set("#valor_i", { y: 100 })
        gsap.set("#valor_j", { y: 100 })
        gsap.set("#valor_i", { x: -90 })
        gsap.set("#valor_j", { x: 110 })
        gsap.set("#box_i", { x: - 120 })
        gsap.set("#box_j", { x: 80 })
        tl.set("#i", { scale: 1 })
        tl.fromTo("#i", { x: (-0.5 * (this.elementos.length - 1) * document.querySelector(".box").offsetWidth + document.querySelector(".box").offsetWidth * (i - 1)) }, { x: (-0.5 * (this.elementos.length - 1) * document.querySelector(".box").offsetWidth + document.querySelector(".box").offsetWidth * (i)) });
        var min = i;
        tl.to("#boxmin", {
          text: {
            value: String(this.elementos[min]),
          },
          // ease: "none"
        });
        tl.to("#valor_i", {
          text: {
            value: String(i),
          },
        });
        for (j = i+1; j < n; j++) {
          tl.to("#bordacodigo", { y: -41.6666666667 * 0.2 });//controle da linha que le o codigo
          tl.to("#valor_j", {
            text: {
              value: String(j),
            },
          });
          tl.set("#j", { scale: 1 })
          tl.fromTo("#j", { x: (-0.5 * (this.elementos.length - 1) * document.querySelector(".box").offsetWidth + document.querySelector(".box").offsetWidth * (j - 1)) }, { x: (-0.5 * (this.elementos.length - 1) * document.querySelector(".box").offsetWidth + document.querySelector(".box").offsetWidth * (j)) });
          if (this.elementos[j] < this.elementos[min]) {
            min = j;
            tl.to("#boxmin", {
              text: {
                value: String(this.elementos[min]),
              },
            });
          }

        }
        tl.to("#bordacodigo", { y: -41.6666666667 * -1.3 });
          tl.to(`#box${this.oredenados.indexOf(this.elementos[i])}`, {
            duration: 0.3,
            backgroundColor: 'orange',
            yoyo: true,
            repeat: 2,
          });
          tl.to(`#box${this.oredenados.indexOf(this.elementos[min])}`, {
            duration: 0.3,
            backgroundColor: 'orange',
            yoyo: true,
            repeat: 2,
          }, "<");
          tl.to(`#box${this.oredenados.indexOf(this.elementos[i])}`, {
            duration: 0.3,
            backgroundColor: '#FFB6C1',
          });
          tl.to(`#box${this.oredenados.indexOf(this.elementos[min])}`, {
            duration: 0.3,
            backgroundColor: '#FFB6C1',
          }, "<");
          tl.to(`#box${this.oredenados.indexOf(this.elementos[i])}`, {
            duration: 1, ease: "sine.out",
            y: -150,
          });
          tl.to(`#box${this.oredenados.indexOf(this.elementos[min])}`, {
            duration: 1, ease: "sine.out",
            y: -150,
          }, "<");
          tl.to(`#box${this.oredenados.indexOf(this.elementos[min])}`, { x: (this.oredenados.indexOf(this.elementos[min]) - i) * 100, duration: 2, ease: "sine.out", });
          tl.to(`#box${this.oredenados.indexOf(this.elementos[i])}`, { x: (min - this.oredenados.indexOf(this.elementos[i])) * 100, duration: 2, ease: "sine.out", }, "<");
          tl.to(`#box${this.oredenados.indexOf(this.elementos[i])}`, {
            duration: 1, ease: "sine.out",
            y: 0,
          });
          tl.to(`#box${this.oredenados.indexOf(this.elementos[min])}`, {
            duration: 1, ease: "sine.out",
            y: 0,
          }, "<");
          if ((this.oredenados.indexOf(this.elementos[min]) - i) == 0) {
            tl.to(`#box${this.oredenados.indexOf(this.elementos[min])}`, {
              duration: 0.3,
              backgroundColor: 'green',
              yoyo: true,
              repeat: 2,
            });
          }
          let tmp = this.elementos[i];
          this.$set(this.elementos, i, this.elementos[min])
          this.$set(this.elementos, min, tmp)

        if ((this.oredenados.indexOf(this.elementos[min]) - i) == 0) {
          tl.to(`#box${this.oredenados.indexOf(this.elementos[min])}`, {
            duration: 0.3,
            backgroundColor: 'green',
            yoyo: true,
            repeat: 2,
          });
        }
        if ((min - this.oredenados.indexOf(this.elementos[i])) == 0) {
          tl.to(`#box${this.oredenados.indexOf(this.elementos[i])}`, {
            duration: 0.3,
            backgroundColor: 'green',
            yoyo: true,
            repeat: 2,
          });
        }

      }


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
  color: black
}

.centralizar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.imagemContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  width: 50rem;
  background: #fff;
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

#boxmin {
  position: absolute;
  font-size: 50px;
  margin-top: 70px
}

#min {
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
  flex-direction: column;
  height: 31.25px;
  width: 750px;
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