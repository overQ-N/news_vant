import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// import qs from 'qs'
import { Button, Toast, Form, Field } from 'vant'
Vue.use(Button, Toast, Form, Field)
Vue.use(Field)
Vue.use(Form)
Vue.config.productionTip = false
// axios.defaults.baseURL = 'http://127.0.0.1:3000/'

Vue.prototype.$axios = axios
// 给axios添加基准路径，添加完了之后请求的url就会拼接这个地址
axios.defaults.baseURL = 'http://localhost:3000'
axios.interceptors.request.use(config => {
  config.headers.Authorization = JSON.parse(sessionStorage.getItem('news_token')).token || ''
  return config
})
Vue.filter('formatDate', (val) => {
  const date = new Date(val)
  const Y = date.getFullYear()
  const M = date.getMonth() + 1
  const D = date.getDate()
  return `${Y}-${M}-${D}`
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
