<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light navbar navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="@/assets/iconmonstr-sort-25.png" width="70" height="30" class="d-inline-block align-top" alt="">
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-item nav-link active" to="/">SelectionSort</router-link>
          <router-link class="nav-item nav-link active" to="/BubbleSort">BubbleSort</router-link>
          <router-link class="nav-item nav-link active" to="/InsertionSort">InsertionSort</router-link>
          <router-link class="nav-item nav-link active" to="/BuscaLinear">Busca Linear</router-link>
          <router-link class="nav-item nav-link active" to="/BuscaBinaria">Busca Binaria</router-link>
          <router-link class="nav-item nav-link active" to="/Fatorial">Fatorial</router-link>
        </div>
      </div>
    </nav> 


</div>


</template>

<script>
export default {
  name: "NavComponente"
};
</script>

<style>
img{
  border-radius: 5%;
}
</style>
