<template>
<el-card class="all">
    <!-- 这个slot是elementui的具名插槽 -->
    <breadCrumb slot="header">
        <template slot="breadCrumb">内容列表</template><!-- 全局组件面包屑  slot是自己定义的具名插槽 -->
    </breadCrumb>
    <el-form style="padding-left:30px">
       <el-form-item label="文章状态">
           <el-radio-group v-model="formData.radio" @change="changeCondition">
               <el-radio :label=5>全部</el-radio>
               <el-radio :label=0>草稿</el-radio>
               <el-radio :label=1>待审核</el-radio>
               <el-radio :label=2>已发布</el-radio>
               <el-radio :label=3>审核失败</el-radio>
           </el-radio-group>
       </el-form-item>
        <!-- {{radio}} -->
       <el-form-item label="频道列表">
           <el-select placeholder="请选择频道" v-model="formData.pullList" @change="changeCondition">
               <el-option :label="item.name" :value="item.id" v-for="item in list" :key="item.id"></el-option>
           </el-select>
       </el-form-item>
       <!-- {{pullList}} -->
       <el-form-item label="时间选择">
           <el-date-picker v-model="formData.shijian" type="daterange" @change="changeCondition" value-format="yyyy-MM-dd"></el-date-picker>
       </el-form-item>
       <!-- {{formData.shijian}} -->
        <!-- 以下是数据的内容 -->
       <div class="total">共找到{{total.total_count}}条数据</div>
       <div class="layout" v-for="item in list1" :key="item.id.toString()">
           <div class="layout_left">
               <img :src="item.cover.images.length>0 ? item.cover.images[0] : imgDefault" alt="">
               <div class="sange"><span>{{item.title}}</span>
               <span><el-tag :type="item.status | filter_type" class="tagg">{{item.status | filter_status}}</el-tag></span>
               <span>{{item.pubdate}}</span></div>
           </div>
           <div class="layout_right">
               <i class="el-icon-edit" @click="toArticles(item.id.toString())" style="cursor:pointer; user-select: none;">修改</i>
               <i class="el-icon-delete" @click="del(item.id.toString())" style="cursor:pointer; user-select: none;">删除</i>
           </div>
       </div>
       <el-row type="flex" justify="center" align="middle" style="height:80px">
         <el-pagination background layout="prev,pager,next" :page-size="paginations.muchPage" :total="paginations.total" :current-page="paginations.currenPage" @current-change="changePage"></el-pagination>
       </el-row>
    </el-form>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        // 默认的单选按钮
        radio: 5,
        // 默认的下拉菜单项为空
        pullList: null,
        // 时间日期的默认值
        shijian: ''
      },
      // 频道获取结束用list来接收
      list: [],
      // 获取文章的数据用list1来接收
      list1: [],
      // 因为代码都是编译完在运行的  如果一直是当前目录下的图片  运行的时候会报错  因为是运行和编译前的两种格式不一样
      imgDefault: require('../../../assets/images/default.gif'),
      total: {}, // 总数
      paginations: {
        total: 0,
        muchPage: 10,
        currentPage: 1
      }
    }
  },
  methods: {
    // 获取频道的数据 axios
    getCannel () {
      this.$axios({
        url: '/channels'
      }).then((res) => {
        console.log(res)
        this.list = res.data.channels
      })
    },
    // 获取文章的列表
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params // es6的语法 变量和属性一样 就可以直接写变量
      }).then(res => { // 获取成功之后把数据付给list1
        console.log(res)
        // 把总数赋值给total
        this.total = res.data
        this.list1 = res.data.results
        // 把获取到的总数给total
        this.paginations.total = res.data.total_count
      })
    },
    // 当条件改变的时候执行这个函数
    changeCondition () {
      // 既然是双向绑定数据 只要改变 formData就会变化
      const params = {
        per_page: this.paginations.muchPage,
        page: this.paginations.currentPage,
        // 判断是因为当他是 全部 的时候  就是显示全部的内容 不需要处理
        status: this.formData.radio === 5 ? null : this.formData.radio,
        channel_id: this.formData.pullList, // 这是频道的类型
        begin_pubdate: this.formData.shijian && this.formData.shijian.length ? this.formData.shijian[0] : null, // 只要有长度 开始的时间就是数组的第一个
        end_pubdate: this.formData.shijian && this.formData.shijian.length > 1 ? this.formData.shijian[1] : null // 这里的length>1  是因为 如果length=1  就取不到[1]这个值

      }
      this.getArticles(params)
    },
    // 改变页数
    changePage (newPage) {
      this.paginations.currentPage = newPage // 吧当前点击的页码给了currentPage
      this.changeCondition() // 再次调用
    },
    // 删除草稿文章
    // 删除素材方法
    del (id) {
      //  先友好的提示一下
      this.$confirm('您确定删除此条数据?', '提示').then(() => {
        // 如果进入了then 表示点击了确定
        this.$axios({
          method: 'delete',
          url: `/articles/${id}` // 地址 是  /articles/:target target 是文章id
        }).then(() => {
          // 如果删除成功了
          // 重新获取数据
          //  this.getArticles() // 如果这么写 就意味着你 舍去了当前的页码和条件 不能这么写
          // 应该带着条件和页码去加载
          this.changeCondition() // 重新加载
        }).catch(() => {
          this.$message.error('删除文章失败')
        })
      })
    },
    // 跳转到id对应的文章页面
    toArticles (id) {
      this.$router.push(`/home/message/${id}`)
    }
  },
  filters: {
    // 过滤的是status  tag标签内部的文字  val这个参数是过滤器前面的值
    filter_status (val) {
      switch (val) {
        case 1:
          return '待审核'
        case 2:
          return '已发布'
        case 3:
          return '审核失败'
        case 5:
          return '全部'
        case 0:
          return '草稿'
      }
    },
    // 过滤的是status tag的type  success info danger warning  v-bind也可以绑定过滤器
    filter_type (val) {
      switch (val) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          // 已发布就是默认的 type
          return ''
        case 3:
          return 'danger'
        case 5:
          // 全部
          return 'success'
      }
    }
  },
  // 钩子函数 实例加载完执行
  created () {
    // 获取频道的信息
    this.getCannel()
    // 获取文章列表
    this.getArticles()
  },
  watch: {
    formData: {
      // 对输入框进行深度监听
      deep: true,
      handler () {
        // 改变条件的时候需要把当钱的页面为1
        this.paginations.currentPage = 1
        this.changeCondition()
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .all {
        .total {
            width: 100%;
            margin-top:50px;
            padding-top: 20px;
            height: 60px;
            border-bottom: 1px dashed #ccc;
        }
        .layout{

            display: flex;
            justify-content: space-between;
            height: 140px;
            padding:20px 0;
            border-bottom: 1px dashed #ccc;
            .layout_left {
                display: flex;
                img {
                    width: 150px;
                    height: 100%;
                }
                .sange {
                    margin-left: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    font-size: 14px;
                    span:nth-child(3) {
                        font-size: 12px;
                        color: #999;
                    }
                    .tagg {
                        width: 60px;
                        text-align: center;
                    }
                }
            }
            .layout_right {
                font-size: 12px;
                i:nth-child(2) {
                    margin-left: 30px;
                }
            }
        }
    }
</style>
