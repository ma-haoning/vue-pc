<template>
  <el-card class="top">
      <!-- 这是elementui的el-card的组件的具名插槽 -->
      <breadCrumb slot="header">
            <!-- 这是面包屑的全局组件 -->
          <template slot="breadCrumb">素材管理</template>
      </breadCrumb>
      <!-- 这个是el-tabs的组件 -->
      <el-tabs v-model="activeName" @tab-click="tabChange">
          <!-- {{activeName}} -->
          <el-tab-pane label="全部素材" name="all">
             <div class="layout">
                 <!-- v-for在哪个标签里就让哪个标签循环生成  item是数组内部的每一项，每一个成员是一个对象 id正好对应index url就是要循环的图片 -->
                 <div v-for="item in list" :key="item.id" class="img">
                     <img :src="item.url" alt="" style="width:100%;height:100%">
                     <div class="location">
                         <i class="el-icon-star-on"></i>
                         <i class="el-icon-delete-solid"></i>
                     </div>
                 </div>
             </div>
             <!-- 这个是elementui的一个组件  只是显示一行 -->
             <el-row type="flex" justify="center" align="middle">
                 <!-- 分页的必须的属性 total page_size current_page -->
                 <el-pagination background layout="prev,pager,next" :total=paginations.total :page-size="paginations.muchPage" :current-page="paginations.currentPage" @current-change="currentChange"></el-pagination>
             </el-row>
          </el-tab-pane>
          <el-tab-pane label="收藏素材" name="collect">
              <div class="layout">
                 <!-- v-for在哪个标签里就让哪个标签循环生成  item是数组内部的每一项，每一个成员是一个对象 id正好对应index url就是要循环的图片 -->
                 <div v-for="item in list" :key="item.id" class="img">
                     <img :src="item.url" alt="" style="width:100%;height:100%">
                 </div>
             </div>
              <el-row type="flex" justify="center" align="middle">
                 <!-- 分页的必须的属性 total page_size current_page -->
                 <el-pagination background layout="prev,pager,next" :total=paginations.total :page-size="paginations.muchPage" :current-page="paginations.currentPage" @current-change="currentChange"></el-pagination>
             </el-row>
          </el-tab-pane>
      </el-tabs>
      <!-- 添加上传文件按钮 -->
      <el-upload class="btn" action="" :http-request="uploadImg" :show-file-list="false">
          <el-button type="primary" size="small">上传图片</el-button>
      </el-upload>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 让当前对应的是全部素材的内容
      activeName: 'all',
      list: [],
      // 分页的三个最主要的属性
      paginations: {
        total: 0,
        currentPage: 1,
        muchPage: 8
      }
    }
  },
  methods: {
    // 获取全部素材的内容
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          // 用一个方法来解决两个按钮的实现  如果切换按钮的话 this.activeName就会改变 让它和collect作比较  如果两者一样 说明是true  就是收藏的素材的参数传过去  如果两者不一样 那么全部素材的参数传过去
          collect: this.activeName === 'collect', // 这是获取全部的素材
          per_page: this.paginations.muchPage, // 这里传参数的时候需要只要 你给后端传每页是多好个 人家才会给你每页多少条
          page: this.paginations.currentPage
        }
      }).then((res) => {
        console.log(res)
        // 响应回来的数据的总条数
        this.paginations.total = res.data.total_count
        this.list = res.data.results
      })
    },
    // 点击tab栏切换
    tabChange () {
      // 切换tab时  有可能对应的页码不一样 正常情况下切换后对应的应该是从第一页来时
      this.paginations.currentPage = 1
      // 点击切换之后 this.activeName的值会发生改变
      this.getMaterial()
    },
    // 分页切换
    currentChange (newPage) {
      // 点谁谁就是newPage  把点击的页数给了this.paginations.currentPage
      this.paginations.currentPage = newPage
      // 赋予新值后 重新获取
      this.getMaterial()
    },
    // 点击上传头像
    uploadImg (params) {
    //   console.log(params) 这个params就是所上传图片的信息
      var data = new FormData() // 构造一个formdata
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: data
      }).then(() => {
        // 成功之后提示上传成功
        this.$message({
          type: 'success',
          center: true,
          duration: 900,
          message: '上传图片成功'
        })
        this.getMaterial()
      })
    }
  },
  // 实例创建完执行此函数
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
    .layout {
        // display: flex;
        // justify-content: space-around;
        // flex-wrap: wrap;
        .img {
            display:inline-block;
            position: relative;
            width:220px;
            height:240px;
            margin:20px 40px;
            border:2px solid #542684;
            border-radius:5px;
          .location {
              position: absolute;
              left: 0;
              bottom: 0;
              width: 100%;
              height: 40px;
              background-color: #542684;
              display: flex;
              justify-content: space-around;
              align-items: center;
              i {
                  font-size: 30px;
              }
          }
        }

    }
    .top {
        position: relative;
        .btn {
            position: absolute;
            right: 15px;
            top: 70px;
        }
    }
</style>
