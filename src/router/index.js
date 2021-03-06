import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// 引入主页的组件
import Home from '@/views/home/home'
// 引入登录页的组件
import Login from '@/views/login/login'
// 引入home下的二级路由组件
import homeDefault from '@/views/home/home/default'
Vue.use(VueRouter)
const routes = [
  {
    path: '*', // 如果路由地址不包括以下的所有 就都是找不到
    component: () => import('@/views/home/home/404') // 按需加载
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/home',
    name: 'Home',
    component: Home,
    // 配置二级路由表 需要在一级路由表的下面设置children项 children 顾名思义会有很多的组件 而且是一个数组
    children: [{
      // path里面空字符串 就是默认打开的页面
      path: '',
      component: homeDefault
    },
    { // 评论列表的路由表
      path: 'comment', // 相当于是'/home/comment'
      component: () => import('@/views/home/home/comment') // 按需加载组件
    },
    {
      path: 'manager', // 相当于是'/home/manager' 素材管理的路由表
      component: () => import('@/views/home/home/material')
    },
    {
      path: 'content', // 相当于 '/home/content' 内容列表的路由表
      component: () => import('@/views/home/home/content') // 按需加载
    },
    {
      path: 'message/:articleId?', // 相当于 '/home/message'  发布文章列表的路由表
      component: () => import('@/views/home/home/articles') // 按需加载
    },
    {
      path: 'account', // 相当于 '/home/account' 账户信息的路由表
      component: () => import('@/views/home/home/account') // 按需加载
    }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
