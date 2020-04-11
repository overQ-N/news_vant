import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: () => import('../views/Home.vue') },
  { path: '/login', component: () => import('../views/Login.vue') },
  { path: '/regist', component: () => import('../views/Regist.vue') },
  {
    path: '/personal',
    component: () => import('../views/Personal.vue'),
    meta: {
      Authorazation: true
    }
  },
  {
    name: 'editProfile',
    path: '/edit-profile',
    component: () => import('../views/EditProfile.vue'),
    meta: {
      Authorazation: true
    }
  },
  {
    path: '/comments',
    component: () => import('../views/Comments.vue'),
    meta: {
      Authorazation: true
    }
  },
  {
    path: '/star',
    component: () => import('../views/Star.vue'),
    meta: {
      Authorazation: true
    }
  },
  {
    path: '/follow',
    component: () => import('../views/Follow.vue'),
    meta: {
      Authorazation: true
    }
  },
  {
    path: '/catemanage',
    component: () => import('../views/CateManage.vue')
  }, {
    path: '/search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/postDetail/:id',
    component: () => import('../views/Post_detail.vue')
  },
  {
    path: '/video/:id',
    component: () => import('../views/Video.vue')
  },
  {
    path: '/post-comments/:post_id',
    component: () => import('../views/PostComments.vue')
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // if (to.path === '/login') {
  //   return next()
  // }
  // const token = JSON.parse(sessionStorage.getItem('news_token')) || ''
  // if (token) {
  //   next()
  // } else {
  //   next('/login')
  // }
  if (to.meta.Authorazation) {
    const token = JSON.parse(sessionStorage.getItem('news_token')) || ''
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
