import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuView from '../views/MenuView.vue'
import FoodMenu from '@/components/layouts/FoodMenu.vue'
import FoodProduct from '@/views/FoodProduct.vue'
import AdminLogin from '@/views/AdminLogin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      // path: '/:store_id/table/:table_id',
      path: '/menu',
      name: 'menu',
      component: MenuView
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/food',
      name: 'food',
      component: FoodMenu
    },
    {
      path: '/login',
      name: 'login',
      component: AdminLogin
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../components/layouts/AdminLayout.vue')
    },
    {
      path: '/foodproduct',
      name: 'foodproduct',
      component: FoodProduct
    },
    {
      path: '/drinkproduct',
      name: 'drinkproduct',
      component: () => import('../views/DrinkProduct.vue')
    }
  ]
})

export default router
