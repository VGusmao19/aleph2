<template>
  <div class="modal fade show h-90 overflow-auto" id="modal-dialog modal-xl" style="display: block" aria-modal="true"
    role="dialog">
    <div class="modal-dialog modal-xl p-3">
      <div>
        <div class="modal-content border-rounded-detail">
          <div class="
              modal-header
              background-principal
              text-color-principal
              card-item-result
            ">
            <h5 class="modal-title mx-auto my-0">Diga os elementos do vetor e valor para busca </h5>

          </div>

          <div class="table-responsive max-height-content-detail-big p-2">



      <div class="modal-body">
        <p>Inputs</p>
        <div class="d-flex flex-row justify-content-center">
          <input  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  maxlength="2" class="form-control inputs mr-1"  v-for="(elemento, index) in array" :key="index" v-model="array[index]">
          
        </div>
        Valor Procurado: 
        <div class="d-flex flex-row justify-content-center">
          <input  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"  maxlength="2" class="form-control inputs mr-1"  v-model="valorProcurado" placeholder="Insira o valor procurado">
          <!-- adicionando input de valor procurado -->
        </div>
        
        

   
      </div>


            <div class="modal-footer">


    
              <input  @click="fechouModal" type="submit" class="btn btn-primary" data-toggle="button" value="Fechar"/>
            </div>
            <input  @click="pop" type="submit" class="btn btn-primary mr-2 fa-solid fa-plus" data-toggle="button" value="Retirar"> 
            <input  @click="push" type="submit" class="btn btn-primary" data-toggle="button" value="Adicionar"/>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>





export default {
  name: "ModalConsulta",

  data() {
    return {
      array:[4,3,2,1],
      // variavel para valor procurado
      valorProcurado: 4
    };
  },


  created() { },
  methods: {
    findUndefined(array){
      for(let i=0;i<array.length;i++){
        if(array[i]==undefined){
          return true
        }
      }
      return false
    },
    findRepetitions(array){
      for(let i=0;i<array.length-1;i++){
        for(let j=i+1;j<array.length;j++){
          if(array[i]==array[j]){
          return true
          }    
        }
      }
      return false
    },
    pop(){
      console.log("Antes do pop: "+this.array)
      console.log("Tamanho antes do pop: "+this.array.length)
      if(this.array.length>1){
        this.array.pop()
      }
      console.log("Depois do pop: "+this.array)
      console.log("Tamanho depois do pop: "+this.array.length)
    },
    push(){
      console.log("Antes do push: "+this.array)
      console.log("Tamanho antes do push: "+this.array.length)
      if (this.array.length<7){
        this.array.push(undefined)
      }
      console.log("Depois do push: "+this.array)
      console.log("Tamanho depois do push: "+this.array.length)
    },
    bubbleSort(array) {
        let n = array.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    // Troca os elementos se estiverem fora de ordem
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
    },
    fechouModal(){
      console.log("entou no fechouModal ")
      if(this.valorProcurado >7){
        console.log("entou no findRepetitions ")
        Toast.fire('Valor procurado não pode ser maior que 7!!', '', 'error')
      }
      if(this.findRepetitions(this.array)){
        console.log("entou no findRepetitions ")
        Toast.fire('Não é permitido números repetidos!!', '', 'error')
      }if(this.findUndefined(this.array)){
        console.log("entou no findUndefined ")
        Toast.fire('Não é permitido campos vazios!!', '', 'error')
      }if(!this.findUndefined(this.array)&&!this.findRepetitions(this.array)&&!(this.valorProcurado>7)){
        console.log("entou nos 3")
        for(let i=0;i<this.array.length;i++){
          this.array[i]=Number(this.array[i])
        }
        this.bubbleSort(this.array)
        this.valorProcurado = Number(this.valorProcurado)
        console.log("modal valor procuradoo: "+this.valorProcurado)
        console.log("array do modal "+this.array)
        console.log("Tamanho array do modal "+this.array.length)
        this.$emit('closeModalCadastro')
        this.$emit('mandouArray',this.array)
        this.$emit('mandouValor',this.valorProcurado)
      }

    }


  }
};
</script>
<style scoped>
.inputs{
  width: 45px;
  height: 45px;
}
</style>
