import Vue from 'vue';
import App from './App.vue';
import router from './router/router.js';
import './style/allStyle.scss';

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
