<template>
    <el-card><!-- 这里的面包屑组件是在全局注册的  所以随便用  需要填坑 -->
    <!-- 第一个是面包屑的内容 -->
    <!-- 当前的这个slot是elementui内置好的组件 -->
    <breadCrumb slot="header">
        <template slot="breadCrumb">评论列表</template>
    </breadCrumb>
    <!-- 第二个是表格的内容  用data属性来获取数据  再通过prop属性把字段名字写在上面内部会自己运行-->
    <el-table :data="list" :row-class-name="rowShowColor">
        <el-table-column label="标题" width="600" prop="id"></el-table-column>
        <el-table-column label="评论状态" prop="status" align="center"></el-table-column>
        <el-table-column label="总评论数" prop="zong" align="center"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans" align="center"></el-table-column>
        <el-table-column label="操作">
            <el-button type="text">修改</el-button>
            <el-button type="text">打开评论</el-button>
        </el-table-column>
    </el-table>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [{ id: 1, status: '正常', zong: 200, fans: 20 },
        { id: 2, status: '正常', zong: 200, fans: 20 },
        { id: 3, status: '正常', zong: 200, fans: 20 },
        { id: 4, status: '正常', zong: 200, fans: 20 },
        { id: 5, status: '正常', zong: 200, fans: 20 }]
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
    }
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
