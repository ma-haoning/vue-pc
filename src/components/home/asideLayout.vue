<template>
  <div class="aside">
      <div class="img">
          <img src="../../assets/images/logo_admin.png" alt="">
      </div>
      <el-menu background-color="#353b4e" text-color="#adafb5" class="elmenu">
          <el-menu-item>
              <i class="el-icon-s-home"></i>
              <span>主页</span>
          </el-menu-item>
          <el-submenu>
              <!-- 当前这里的具名插槽是elmentui封装好的 具名插槽就是二级菜单的名字 -->
              <template slot="title">
                  <i class="el-icon-box"></i>
                  <span>内容管理</span>
              </template>
              <el-menu-item>发布文章</el-menu-item>
              <el-menu-item>内容列表</el-menu-item>
              <el-menu-item>评论列表</el-menu-item>
              <el-menu-item>素材管理</el-menu-item>
          </el-submenu>
          <el-submenu>
              <!-- 当前这里的具名插槽是elmentui封装好的 具名插槽就是二级菜单的名字 -->
              <template slot="title">
                  <i class="el-icon-loading"></i>
                  <span>粉丝管理</span>
              </template>
              <el-menu-item>图文数据</el-menu-item>
              <el-menu-item>粉丝概况</el-menu-item>
              <el-menu-item>粉丝画像</el-menu-item>
              <el-menu-item>粉丝列表</el-menu-item>
          </el-submenu>
           <el-menu-item>
               <i class="el-icon-place"></i>
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
        background-color: #323745;
        .img {
            text-align: center;
            background-color: #2e2f32;
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
