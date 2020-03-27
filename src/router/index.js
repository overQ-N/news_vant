import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: () => import('../views/Login.vue') },
  { path: '/home', component: () => import('../views/Home.vue') },
  { path: '/regist', component: () => import('../views/Regist.vue') },
  { path: '/personal', component: () => import('../views/Personal.vue') }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next()
  }
  if (to.path === '/personal') {
    const token = JSON.parse(sessionStorage.getItem('news_token')) || ''
    if (token) {
      next()
    } else {
      next('/')
    }
  }
})
export default router
