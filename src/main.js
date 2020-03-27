import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { Button, Toast, Form, Field } from 'vant'
Vue.use(Button, Toast, Form, Field)
Vue.use(Field)
Vue.use(Form)
Vue.config.productionTip = false

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000/'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
