import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: () => import('../views/Home.vue') },
  { path: '/login', component: () => import('../views/Login.vue') },
  { path: '/regist', component: () => import('../views/Regist.vue') },
  { path: '/personal', component: () => import('../views/Personal.vue') },
  {
    name: 'editProfile',
    path: '/edit-profile',
    component: () => import('../views/EditProfile.vue')
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/home') {
    next()
  }
  const token = JSON.parse(sessionStorage.getItem('news_token')) || ''
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
