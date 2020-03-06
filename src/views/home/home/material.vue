<template>
  <el-card>
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
          </el-tab-pane>
          <el-tab-pane label="收藏素材" name="collect">
              <div class="layout">
                 <!-- v-for在哪个标签里就让哪个标签循环生成  item是数组内部的每一项，每一个成员是一个对象 id正好对应index url就是要循环的图片 -->
                 <div v-for="item in list" :key="item.id" class="img">
                     <img :src="item.url" alt="" style="width:100%;height:100%">
                 </div>
             </div>
          </el-tab-pane>
      </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 让当前对应的是全部素材的内容
      activeName: 'all',
      list: []
    }
  },
  methods: {
    // 获取全部素材的内容
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          // 用一个方法来解决两个按钮的实现  如果切换按钮的话 this.activeName就会改变 让它和collect作比较  如果两者一样 说明是true  就是收藏的素材的参数传过去  如果两者不一样 那么全部素材的参数传过去
          collect: this.activeName === 'collect' // 这是获取全部的素材
        }
      }).then((res) => {
        // console.log(res)
        this.list = res.data.results
      })
    },
    // 点击tab栏切换
    tabChange () {
      // 点击切换之后 this.activeName的值会发生改变
      this.getMaterial()
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
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        .img {
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
</style>
