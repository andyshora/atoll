// import axios from 'axios'
import moment from 'moment';
import Vue from 'vue';
// import VueAxios from 'vue-axios';
import App from './App.vue';
import config from './config';
import router from './router'
import { store } from './store/store';
import VueJsonp from 'vue-jsonp';

Vue.config.productionTip = false
// Vue.use(VueAxios, axios);
Vue.use(VueJsonp, 8000);

store.dispatch('fetchData');

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});
