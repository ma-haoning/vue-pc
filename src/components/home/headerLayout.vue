<template>
    <el-row type="flex" align="middle" class="row">
        <el-col :span="12">
            <i class="el-icon-guide" style="margin: 0 15px;font-size:25px"></i>
            <span>洛杉矶湖人</span>
        </el-col>
        <el-col :span="12">
            <el-row type="flex" justify="end" align="middle" style="padding-right:35px">
                <img :src="userInfo.photo" alt="" style="width:35px;height:35px;border-radius:50%;margin-right:10px">
                <el-dropdown trigger="click">
                    <span>{{userInfo.name}}<i class="el-icon-caret-bottom"></i></span>
                      <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>个人信息</el-dropdown-item>
                      <el-dropdown-item>git地址</el-dropdown-item>
                      <el-dropdown-item>退出</el-dropdown-item>
                      </el-dropdown-menu>
                </el-dropdown>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  // 创建完实例执行
  created () {
    // 获取token 登录进来的时候回存在一个钥匙 token
    const TOKEN = window.localStorage.getItem('user_token')
    // console.log(TOKEN)
    this.$axios({ // 这个请求的时候需要请求头  这里的请求方式是get  可以省略
      url: '/user/profile',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    }).then(res => {
    //   console.log(res)
      this.userInfo = res.data.data
    })
  }
}
</script>

<style lang="less" scoped>
    .row {
        height: 55px;
        background-color: #fff;
    }
</style>
