import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxiosPlugin from 'vue-axios-plugin'
import VantConfig from './vant-config'

Vue.use(VueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config => ({
    ...config,
    baseURL: 'http://localhost:3000/',
  }),
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: response => response,
  resErrorFunc: error => Promise.reject(error)
})
Vue.prototype.axios = VueAxiosPlugin;

Vue.use(VantConfig)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
