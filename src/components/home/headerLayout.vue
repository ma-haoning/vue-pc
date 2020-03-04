<template>
    <el-row type="flex" align="middle" class="row">
        <el-col :span="12">
            <i class="el-icon-guide" style="margin: 0 15px;font-size:25px"></i>
            <span style="font-size:25px;font-weight:bolder">洛杉矶湖人</span>
        </el-col>
        <el-col :span="12">
            <el-row type="flex" justify="end" align="middle" style="padding-right:35px">
                <img :src="userInfo.photo" alt="" style="width:35px;height:35px;border-radius:50%;margin-right:10px">
                <!-- 给下拉菜单设置command事件 -->
                <el-dropdown trigger="click" @command="dropDownClick">
                    <span class="border">{{userInfo.name}}<i class="el-icon-caret-bottom"></i></span>
                      <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="info">个人信息</el-dropdown-item>
                      <el-dropdown-item command="github">NBA湖人</el-dropdown-item>
                      <el-dropdown-item command="exit">退出</el-dropdown-item>
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
    // console.log(TOKEN)
    this.$axios({ // 这个请求的时候需要请求头  这里的请求方式是get  可以省略
      url: '/user/profile'
    }).then(res => {
      // console.log(res)
      // 因为响应拦截器之前已经返回出了一个data 所以这里只需要一个data  而不是data.data
      this.userInfo = res.data
    })
  },
  methods: {
    dropDownClick (command) {
      if (command === 'info') {
        // 点击了个人信息
      } else if (command === 'github') {
        window.location.href = 'https://china.nba.com/lakers/'
      } else {
        window.localStorage.removeItem('user_token')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .row {
        height: 55px;
        background-color: #542684;
        .border {
          border: 1px solid skyblue;
          border-radius: 5px;
          color: yellowgreen;
        }
    }
</style>
