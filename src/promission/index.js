// 专门处理路由权限
// 引入 路由
import router from '@/router'
router.beforeEach(function (to, from, next) {
//   console.log(to)
//   next()
//   console.log(to)
  // to 代表到哪里去  from 代表从哪里来 next 不管去哪里都要执行一下
  // 判断如果有home需要拦截  没有home就只有登录不需要拦截 要不然没办法登录
  if (to.path.startsWith('/home')) {
    // 如果有home进而判断是否有token
    const TOKEN = window.localStorage.getItem('user_token')
    if (TOKEN) {
      next() // 有token级可以执行
    } else {
      next('/login') // 没有token就去login
    }
  } else {
    next()
  }
})
