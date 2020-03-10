// 引入侧边布局的组件
import asideLayout from '@/components/home/asideLayout'
// 引入头部布局的组件
import headerLayout from '@/components/home/headerLayout'
// 引入面包屑组件 就是这样的形式  主页 >  评论管理
import breadCrumb from '@/components/common/breadCrumb'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  // 注册全局的普通组件  在任何地方都可以用到
  install: function (Vue) {
    // 全局注册组件不需要{}
    Vue.component('asideLayout', asideLayout)
    Vue.component('headerLayout', headerLayout)
    Vue.component('breadCrumb', breadCrumb)
    // 注册富文本框
    Vue.use(VueQuillEditor)
  }
}
