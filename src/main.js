// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
// import '@/assets/css/dharma.css';
import 'bootstrap/dist/css/bootstrap.min.css'
// import '@/inc/full-page-scroll.css';
// import '@/inc/jquery.ripples.js';
import store from './store';
import VueCarousel from 'vue-carousel';
 
Vue.use(VueCarousel);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})



// WEBPACK FOOTER //
// ./src/main.js