import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { Button, List, Toast, Form, Field, Uploader, Dialog, ActionSheet, Tab, Tabs } from 'vant'
import store from './store'
// import moment from 'moment'
// Vue.use(moment)
// import qs from 'qs'
var app
Vue.use(Button, Toast, Form, Field)
Vue.use(Field)
Vue.use(Form)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(ActionSheet)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(List)
Vue.config.productionTip = false
// axios.defaults.baseURL = 'http://127.0.0.1:3000/'

Vue.prototype.$axios = axios
// 给axios添加基准路径，添加完了之后请求的url就会拼接这个地址
axios.defaults.baseURL = 'http://localhost:3000'
axios.interceptors.request.use(config => {
  if (sessionStorage.getItem('news_token')) {
    config.headers.Authorization = JSON.parse(sessionStorage.getItem('news_token')).token || ''
  }
  return config
})
axios.interceptors.response.use(res => {
  return res
}, err => {
  console.log(err.response)
  const { statusCode, message } = err.response.data
  if (statusCode === 400) return Toast.fail(message)
  if (statusCode === 403) {
    const path = app.$route.path
    app.$router.push({
      path: '/login',
      query: {
        formUrl: path
      }
    })
  }
  return Promise.reject(err)
})
Vue.filter('formatDate', (val) => {
  const date = new Date(val)
  const Y = date.getFullYear()
  const M = date.getMonth() + 1
  const D = date.getDate()
  const H = date.getHours()
  const S = date.getMinutes()
  return [Y, M, D].map(formatNumber).join('-') + ' ' + [H, S].map(formatNumber).join(':')
})
const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
