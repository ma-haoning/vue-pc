<template>
<el-card class="all">
    <!-- 这个slot是elementui的具名插槽 -->
    <breadCrumb slot="header">
        <template slot="breadCrumb">内容列表</template><!-- 全局组件面包屑  slot是自己定义的具名插槽 -->
    </breadCrumb>
    <el-form style="padding-left:30px">
       <el-form-item label="文章状态">
           <el-radio-group v-model="formData.radio">
               <el-radio :label=5>全部</el-radio>
               <el-radio :label=0>草稿</el-radio>
               <el-radio :label=1>待审核</el-radio>
               <el-radio :label=2>已发布</el-radio>
               <el-radio :label=3>审核失败</el-radio>
           </el-radio-group>
       </el-form-item>
        <!-- {{radio}} -->
       <el-form-item label="频道列表">
           <el-select placeholder="请选择频道" v-model="formData.pullList">
               <el-option :label="item.name" :value="item.id" v-for="item in list" :key="item.id"></el-option>
           </el-select>
       </el-form-item>
       <!-- {{pullList}} -->
       <el-form-item label="时间选择">
           <el-date-picker v-model="formData.shijian" type="daterange"></el-date-picker>
       </el-form-item>
       <!-- {{formData.shijian}} -->
        <!-- 以下是数据的内容 -->
       <div class="total">共找到{{total.total_count}}条数据</div>
       <div class="layout" v-for="item in list1" :key="item.id.toString()">
           <div class="layout_left">
               <img :src="item.cover.images.length>0 ? item.cover.images : imgDefault" alt="">
               <div class="sange"><span>{{item.title}}</span>
               <span><el-tag :type="item.status | filter_type" class="tagg">{{item.status | filter_status}}</el-tag></span>
               <span>{{item.pubdate}}</span></div>
           </div>
           <div class="layout_right">
               <i class="el-icon-edit">修改</i>
               <i class="el-icon-delete">删除</i>
           </div>
       </div>
    </el-form>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        // 默认的单选按钮
        radio: 2,
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
      total: {} // 总数
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
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(res => { // 获取成功之后把数据付给list1
        console.log(res)
        // 把总数赋值给total
        this.total = res.data
        this.list1 = res.data.results
      })
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
