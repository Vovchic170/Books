
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/books',
    name: 'Books',
    component: () => import('../components/Books.vue')
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('../components/Categories.vue')
  },
  {
    path: '/categories/:id',
    name: 'CategoryDetail',
    component: () => import('../components/CategoryDetail.vue')
  },
  {
    path: '/book/:id',
    name: 'BookDetail',
    component: () => import('../views/BookDetail.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../components/Checkout.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
