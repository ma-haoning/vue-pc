// 这个文件专门设置axios发出的拦截器
// 引入router下的index.js文件
import router from '@/router'
// 引入axios模块
// 拦截器每次请求和响应成功也好失败也好都需要return
import axios from 'axios'
// 引入json-bigint
import JSONBig from 'json-bigint'
// 设置请求响应的默认
axios.defaults.transformResponse = [function (data) {
  // debugger
  // 原来这里默认是 JSON.parse  现在改成 json-bigint的格式的数据  就为了处理超过最大安全数字的问题
  return data ? JSONBig.parse(data) : {}
}]
// 设置axios的基地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 设置axios拦截器发送请求之前的拦截器
// interceptors是拦截器的意思 use内部两个回调函数  第一个是请求发送之前成功的函数  第二个是请求发送之前失败的函数
axios.interceptors.request.use(function (config) {
// config是配置的意思 对axios的配置项进行操作 因为API中需要headers这个参数 这里统一处理 以后就不需要一一写下来
  // 获取token
  const TOKEN = window.localStorage.getItem('user_token')
  config.headers.Authorization = `Bearer ${TOKEN}`
  //   debugger
  return config // 切记需要return
}, function (error) { // 如果发送请求之前失败了 axios发送请求会进入当前axios的catch分支
//   console.log(error)
  return Promise.reject(error)
})
// 这是axios发送请求之后响应之前的拦截器
axios.interceptors.response.use(function (response) {
  // 这个拦截器是在响应之前要执行的函数
//   console.log(response)
//   debugger
  // 这是在把data下面的data给弄出来 三元表达式 如果存在response.data就返回出去response.data 否则返回出去一个空对象
  return response.data ? response.data : {}
}, function (error) {
  // 这是在判断token是否失效
//   debugger
  // ==401 说明token失效
  // console.log(error)

  if (error.response.status === 401) {
    window.localStorage.removeItem('user_token')
    // 跳转到login页面  需要引入router  记住这种路由跳转的方法
    router.push('/login')
  }
  //   console.log(error)
  //   debugger

  return Promise.reject(error) // 和发送请求axios之前的拦截器一样  进入当前axios的catch分支
})
// 导出拦截器
export default axios
