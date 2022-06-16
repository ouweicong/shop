import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/login.vue'
import Index from '../views/index/index.vue'
import User from '../views/index/router/user.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    children: [
      {
        path: '/index/',
        name: 'user',
        component: () => import('../views/index/router/user.vue')
      },
      {
        path: '/index/shop',
        name: 'shop',
        component: () => import('../views/index/router/shop.vue')
      },
      {
        path: '/index/orders',
        name: 'orders',
        component: () => import('../views/index/router/orders.vue')
      },
      {
        path: '/index/goods',
        name: 'goods',
        component: () => import('../views/index/router/goods.vue')
      },
      {
        path: '/index/analyse',
        name: 'anslyse',
        component: () => import('../views/index/router/analyse.vue')
      },
      {
        path: '/index/advertising',
        name: 'advertising',
        component: () => import('../views/index/router/advertising.vue')
      },
      {
        path: '/index/adminUser',
        name: 'adminUser',
        component: () => import('../views/index/router/adminUser.vue')
      },
    ]
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]


const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
