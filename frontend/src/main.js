import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/main.css'

import headers from './components/headers.vue'
import footers from './components/footers.vue'
import login from './components/login.vue'
import signup from './components/signup.vue'

Vue.component('headers-nav', headers)
Vue.component('footer-footer', footers)
Vue.component('login', login)
Vue.component('signup', signup)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
