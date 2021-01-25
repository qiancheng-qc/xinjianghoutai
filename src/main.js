import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'

import * as echarts from 'echarts'

import './assets/global.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

axios.defaults.baseURL = 'http://39.100.13.186:8084'
// axios.defaults.baseURL = 'http://192.168.2.108:8084'
axios.defaults.withCredentials = true
axios.defaults.timeout = 30000
axios.interceptors.response.use(config => {
  if (config.data.status === 200 || config.data.flag === true) {
    if (config.data.message === '登录失效,请重新登录') {
      ElementUI.Message({
        message: '登录失效,请重新登录',
        type: 'error'
      })
      router.push('/')
    }
  } else {
    ElementUI.Message({
      message: '获取数据失败，请重试',
      type: 'error'
    })
  }
  return config
})
Vue.prototype.$axios = axios

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
