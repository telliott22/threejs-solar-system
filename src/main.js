import Vue from "vue";
import App from "./App.vue";
import styles from "./assets/scss/app.scss";
import Vuex from 'vuex'
import {
  store
} from './store'

Vue.use(Vuex)

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store
}).$mount("#app");