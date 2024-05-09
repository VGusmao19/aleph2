import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueToastr from "vue-toastr";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.min.css";
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueHighlightJS from 'vue-highlightjs'
import NavComponente from "./components/Nav.vue";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
// Tell Vue.js to use vue-highlightjs
Vue.use(VueHighlightJS)

Vue.component("NavComponente", NavComponente);
Vue.component("vue-toastr", VueToastr);

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false,
});
// salva a configuração global na palavra "Toast"
window.Toast = Toast;

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
