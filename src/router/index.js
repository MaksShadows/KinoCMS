import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Banners from "../components/Banners";
import Films from '../components/Films'
import Cinemas from "../components/Cinemas.vue";
import News from "../components/News.vue";
import Promo from "../components/Promo.vue";
import Pages from "../components/Pages.vue";
import Users from "../components/Users.vue";
import Sends from "../components/Sends.vue";



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Banners
  },
  {
    path: '/films',
    name: 'Posts',
    component: Films
  },
  {
    path: '/cinemas',
    name: 'Posts',
    component: Cinemas
  },
  {
    path: '/news',
    name: 'Posts',
    component: News
  },
  {
    path: '/promo',
    name: 'Posts',
    component: Promo
  },
  {
    path: '/pages',
    name: 'Posts',
    component: Pages
  },
  {
    path: '/users',
    name: 'Posts',
    component: Users
  },
  {
    path: '/sends',
    name: 'Posts',
    component: Sends
  },

]

const router = new VueRouter({
  routes
})

export default router
