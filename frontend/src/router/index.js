import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
    path: '/articles',
    name: 'Articles',
    component: () => import('../views/Articles.vue')
}, {
    path:'/users/myprofile',
    name: 'UserProfil',
    component: () => import('../views/UserProfil.vue')
}, {
    path:'',
    name: 'LoginUser',
    component: () => import('../views/login.vue')
}, {
    path:'/users/signup',
    name: 'SignupUser',
    component: () => import('../views/signup.vue')
}, {
    path:'/new/',
    name: 'NewArticle',
    component: () => import('../views/NewArticle.vue')
}, {
   path:'/articles/:id',
   name: 'Article',
   component: () => import('../views/Article.vue')
}, {
    path:'/articles/edit/:id',
    name: 'UpdateArticle',
    component: () => import('../views/UpdateArticle.vue')
}, {
    path:'/users/edit/:id',
    name: 'UpdateUser',
    component: () => import('../views/UpdateUser.vue')
}, {
    path:'/comments',
    name: 'DeleteComment',
    component: () => import('../views/Article.vue')    
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;