import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/signup',
    name: 'signup-page',
    component: () => import('../components/signup.vue')
  },
  {
    path: '/login',
    name: 'login-page',
    component: () => import('../components/login.vue')
  },
 
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
