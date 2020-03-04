import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入elementui
import ElementUI from 'element-ui'
// 引入elementui样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入index.css样式
import '@/styles/index.less'
// 引入所有普通组件到main.js使用
import Comment from '@/components'
// 全局使用设置路由权限
import '@/promission'
// 引入axios拦截器
import axios from '@/utils'
// 给Vue上设置axios  任何地方都可以直接使用axios
Vue.prototype.$axios = axios
// 全局注册elementui
Vue.use(ElementUI)
// 全局使用Comment
Vue.use(Comment)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
