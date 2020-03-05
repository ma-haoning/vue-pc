<template>
  <div class="aside">
      <div class="img">
          <img src="../../assets/images/time.png" alt="">
      </div>
      <!-- 给el-menu设置router  router和index是一起的相当于是路由所要跳转的页面 -->
      <el-menu background-color="#542684" text-color="#adafb5" class="elmenu" router>
          <el-menu-item index="/home">
              <i class="el-icon-s-home"></i>
              <span>首页</span>
          </el-menu-item>
          <el-submenu index="1">
              <!-- 当前这里的具名插槽是elmentui封装好的 具名插槽就是二级菜单的名字 -->
              <template slot="title">
                  <i class="el-icon-s-comment"></i>
                  <span>最近动态</span>
              </template>
               <el-menu-item index="/home/message">最新资讯</el-menu-item>
              <el-menu-item index="/home/rank">队内排行</el-menu-item>
              <el-menu-item index="/home/comment">评论列表</el-menu-item>
              <el-menu-item index="/home/manager">素材管理</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
              <!-- 当前这里的具名插槽是elmentui封装好的 具名插槽就是二级菜单的名字 -->
              <template slot="title">
                  <i class="el-icon-loading"></i>
                  <span>粉丝管理</span>
              </template>
              <el-menu-item index="/home/imgData">图文数据</el-menu-item>
              <el-menu-item index="/home/fansIntroduce">粉丝概况</el-menu-item>
              <el-menu-item index="/home/fansPhoto">粉丝画像</el-menu-item>
              <el-menu-item index="/home/fansList">粉丝列表</el-menu-item>
          </el-submenu>
           <el-menu-item index="/home/account">
               <i class="el-icon-s-custom"></i>
               <span>账户信息</span>
           </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .aside{
        height: 100vh;
        .img {
            text-align: center;
            padding: 10px 0;
            img{
                width: 120px;
            }
        }
        .elmenu {
            border-right:none;
            }
    }
</style>
