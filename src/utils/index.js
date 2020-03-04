// 这个文件专门设置axios发出的拦截器
// 引入axios模块
// 拦截器每次请求和响应成功也好失败也好都需要return
import axios from 'axios'
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
// 导出拦截器
export default axios
