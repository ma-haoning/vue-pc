// 引入侧边布局的组件
import asideLayout from '@/components/home/asideLayout'
// 引入头部布局的组件
import headerLayout from '@/components/home/headerLayout'
export default {
  // 注册全局的普通组件  在任何地方都可以用到
  install: function (Vue) {
    // 全局注册组件不需要{}
    Vue.component('asideLayout', asideLayout // 组件名字和变量一样 可以只写变量
    )
    Vue.component('headerLayout', headerLayout// 组件名字和变量一样 可以只写变量
    )
  }
}
