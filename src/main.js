import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'

import qs from 'qs'

import * as echarts from 'echarts'

import './assets/global.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

axios.defaults.baseURL = 'http://39.100.13.186:8084'
// axios.defaults.baseURL = 'http://192.168.2.108:8084'
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios

Vue.prototype.$qs = qs
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
