<template>
  <el-tabs v-model="activeName">
      <el-tab-pane  label="全部素材" name='all'>
              <div class="item" v-for="item in list" :key="item.id">
                  <img :src="item.url" alt="" @click="clickImg(item)">
              </div>
              <el-row type="flex" justify="center" align="middle" style="height:40px">
                  <el-pagination :total="paginations.total" :current-page="paginations.currentPage" :page-size="paginations.muchPage" layout="prev,pager,next" background @current-change="changePage"></el-pagination>
              </el-row>
      </el-tab-pane>
      <el-tab-pane label="上传图片"  name="upload">
          <el-upload action="" :show-file-list="false" :http-request="uploadImg">
               <i class='el-icon-plus'></i>
          </el-upload>
      </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [], // 这是获取全部素材的数组
      paginations: {
        total: 0,
        muchPage: 8,
        currentPage: 1
      }
    }
  },
  methods: {
    // 获取全部的素材
    getAll () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false, // 查询全部的素材 所以这里给一个false
          page: this.paginations.currentPage, // 当前页码
          per_page: this.paginations.muchPage // 每页多少条
        }
      }).then(result => {
        console.log(result)
        this.list = result.data.results // 获取全部素材的数据
        this.paginations.total = result.data.total_count // 将总数赋值给页码变量
      })
    },
    // 改变页码
    changePage (newPage) {
      this.paginations.currentPage = newPage
      this.getAll()
    },
    clickImg (item) {
      // 给父组件传值  把url传出去
      this.$emit('select', item.url)
    //   alert(item.url)
    },
    uploadImg (params) {
      // 调用上传接口
      //  params.file 就是需要上传的图片文件
      // 接口参数类型要求是 formData
      const data = new FormData() // 实例化一个formData对象
      data.append('image', params.file) // 加入文件参数
      // 开始发送上传请求了
      this.$axios({
        url: '/user/images', // 请求地址
        method: 'post', // 上传或者新增一般都是post类型
        data // es6简写
      }).then(result => {
        // 如果成功了  此时 我们的接口会返回给我们一个上传成功之后的图片地址
        // 拿到了返回的url地址 应该做什么
        // 根刚才一样 往外传
        this.$emit('select', result.data.url) // 将url参数传出去
      }).catch(() => {
        this.$message.error('上传素材失败')
      })
    }
  },
  created () {
    this.getAll()
  }
}
</script>

<style lang='less' scoped>

        .item {
            display: inline-block;
            width: 100px;
            height: 100px;
            margin:20px 35px;
            img {
                width: 100%;
                height: 100%;
            }
        }

        i{
            font-size: 300px;
            margin-left: 200px ;
        }

</style>
