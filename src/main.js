import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import axios from "axios";
import '@/styles/index.scss' // global css

import * as filters from "@/filters/index";
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

import Vue2Editor from "vue2-editor";
Vue.use(Vue2Editor);

import VCharts from "v-charts";
Vue.use(VCharts);

console.log(process.env.VUE_APP_BASE_API);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
