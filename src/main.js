import Vue from 'vue';
import App from './App.vue';
import router from './router/router.js';
import './style/home/home.scss';

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
