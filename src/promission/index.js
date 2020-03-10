// 专门处理路由权限
// 引入 路由
import router from '@/router'
import progress from 'nprogress' // 进度条包
import 'nprogress/nprogress.css' // 样式文件
router.beforeEach(function (to, from, next) {
  // 使用进度条
  progress.start()
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
router.afterEach(() => {
  // 结束进度条  设置0.2秒之后结束进度条
  setTimeout(() => progress.done(), 200)
  // progress.done()
})
