import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/wishlist/create',
    name: 'wl-create',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditWishlistView.vue')
  },
  {
    path: '/wishlist/edit/:id?',
    name: 'wl-edit',
    component: () => import(/* webpackChunkName: "edit" */ '../views/EditWishlistView.vue')
  },
  {
    path: '/wishlist/:id',
    name: 'wl-detail',
    component: () => import(/* webpackChunkName: "wl-detail" */ '../views/WishlistView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
