import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入elementui
import ElementUI from 'element-ui'
// 引入elementui样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入axios模块
import axios from 'axios'
// 引入index.css样式
import '@/styles/index.less'
// 设置axios的基地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 给Vue上设置axios  任何地方都可以直接使用axios
Vue.prototype.$axios = axios
// 全局注册elementui
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
