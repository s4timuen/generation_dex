import Vue from 'vue';
import App from './App.vue';
import VueCookies from 'vue-cookies';
import router from '@/components/router/router.js';
import store from '@/components/store/store.js';
import i18n from '@/components/locales/i18n.js';

import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

Vue.use(VueCookies);
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
