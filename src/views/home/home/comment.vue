<template>
    <el-card><!-- 这里的面包屑组件是在全局注册的  所以随便用  需要填坑 -->
    <!-- 第一个是面包屑的内容 -->
    <!-- 当前的这个slot是elementui内置好的组件 -->
    <breadCrumb slot="header">
        <template slot="breadCrumb">评论列表</template>
    </breadCrumb>
    <!-- 第二个是表格的内容  用data属性来获取数据  再通过prop属性把字段名字写在上面内部会自己运行-->
    <el-table :data="list" :row-class-name="rowShowColor" v-loading="loading">
        <el-table-column label="标题" width="600" prop="title"></el-table-column>
        <el-table-column label="评论状态" prop="comment_status" align="center" :formatter="formatterShow"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count" align="center"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count" align="center"></el-table-column>
        <el-table-column label="操作">
          <!-- el-table-column有一个具名插槽可以获取到当前的row $index -->
           <template slot-scope='obj'>
            <el-button type="text">修改</el-button>
            <el-button type="text" @click="openAndClose(obj.row)">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
           </template>
        </el-table-column>
    </el-table>
    <!-- 添加分页的功能 -->
    <el-row type="flex" style="height:80px" align="middle" justify="center">
      <el-pagination layout="prev,pager,next" :total="paginations.total" background :page-size="paginations.much_page" :current-page="paginations.current_page"  @current-change="currentChange"></el-pagination>
    </el-row>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      paginations: {
        // 分页的重要成员  这里的成员的数量可以随机定义 因为获取到请求数据之后把总数和每页的条数都会反馈出一个新数据
        current_page: 1,
        total: 0,
        much_page: 15
      },
      // 加载转圈圈
      loading: false
    }
  },
  methods: {
    // 每一行的背景颜色
    rowShowColor ({ row, rowIndex }) {
      // console.log(row) // 显示的是每一行的内容 是一个对象
      // console.log(rowIndex) // 显示的是行的索引
      if (rowIndex + 1) {
        return 'color'
      } else {
        return ''
      }
    },
    // 发送请求 接收数据
    getComment () {
      // 每次发送请求之前loading
      this.loading = true
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment', // 因为这个接口对应好几个不同参数的数据
          page: this.paginations.current_page, // 这是发送请求时传的参数 当前页码的参数
          per_page: this.paginations.much_page // 这是每页的条数
        }
      }).then((res) => {
        // 这里是箭头函数 可以随便用this
        console.log(res)
        // res返回的数据有要显示的分页总数数据
        this.paginations.total = res.data.total_count
        // res返回的数据有要显示的每页的条数的多少
        this.paginations.much_page = res.data.per_page
        // 因为el-table不能处理boolean值 所以需要
        this.list = res.data.results
        // 这里请求结束再让loading==false
        this.loading = false
      })
    },
    // 格式化 true和false的那一列
    formatterShow (row, column, cellValue, index) {
      // console.log(row, column, cellValue, index)
      return cellValue ? '正常' : '关闭'
    },
    // 打开和关闭评论的方法
    openAndClose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`你确定要${mess}评论吗?`, '提示信息', {
        type: 'warning'
      })
      //  如果点击确定 会进入then分支
        .then(() => {
          this.$axios({
            url: '/comments/status',
            method: 'put',
            // 查询字符串的参数
            params: { article_id: row.id.toString() },
            // 请求体的参数
            data: { allow_comment: !row.comment_status }
          }) // 这个.then是发送请求成功之后所要执行的内容
            .then(() => { // 获取axios的成功分支
              this.$message({
                message: `${mess}评论成功`,
                duration: 900,
                center: true,
                type: 'success'
              })
              // 更新数据之后重新获取数据
              this.getComment()
            }).catch(() => { // 获取axios的失败分支
              this.$message({
                message: `${mess}评论失败`,
                duration: 900,
                center: true
              })
            })
        })
        // 如果点击取消 会进入catch分支
        .catch(() => {
          this.$message({
            message: `${mess}评论失败`,
            duration: 900,
            center: true
          })
        })
    },
    // 切换页码会执行该函数
    currentChange (newPage) {
      // alert(newPage) // 这里的newPage就可以获取到要去的位置页码
      this.paginations.current_page = newPage // 把当前的点击的页码给了发送请求的参数会重新赋值
      this.getComment() // 再次调用有新参数的获取评论列表的方法
    }
  },
  // 实例创建完执行此函数
  created () {
    this.getComment()
  }
}
</script>

<style>
/* 初步判断 elementui不承认less的用法 */
 .el-table .color {
    background: oldlace;
 }
/* 鼠标悬浮在当前的行上 name当前行的所有列的背景变颜色 */
 .el-table tr:hover>td{
    background-color: #c6cfdf !important;
}

 /* .el-table tr:hover>td{
   background-color:red !important;
 } */
</style>
