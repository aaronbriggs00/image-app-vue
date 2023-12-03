import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import RegisterView from '../views/Register.vue'
import LoginView from '../views/Login.vue'

import ImageIndexView from '../views/ImageIndex.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/images',
    name: 'images-index',
    component: ImageIndexView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
