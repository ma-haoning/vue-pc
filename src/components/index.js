// 引入侧边布局的组件
import asideLayout from '@/components/home/asideLayout'
// 引入头部布局的组件
import headerLayout from '@/components/home/headerLayout'
// 引入面包屑组件 就是这样的形式  主页 >  评论管理
import breadCrumb from '@/component/common/breadCrumb'
export default {
  // 注册全局的普通组件  在任何地方都可以用到
  install: function (Vue) {
    // 全局注册组件不需要{}
    Vue.component('asideLayout', asideLayout)
    Vue.component('headerLayout', headerLayout)
    Vue.component('breadCrumb', breadCrumb)
  }
}
