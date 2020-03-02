<template>
<div class="login">
    <!-- elementui的card属性 -->
    <el-card class="login_card">
        <div class="login_img">
            <img src="../../assets/images/logo_index.png" style="height:45px" alt="">
        </div>
        <!-- elementui的表单属性 -->
        <el-form class="sp">
            <!-- elementui的表单的标签属性需要有个承接容器的item -->
            <el-form-item>
                <!-- 承接容器之后放入input -->
                <el-input placeholder="请输入您的手机号"></el-input>
            </el-form-item>
             <el-form-item>
                <!-- 承接容器之后放入input -->
                <el-input placeholder="请输入您的验证码" style="width:60%"></el-input>
                <!-- button按钮-->
                <el-button plain style="float:right">发送验证码</el-button>
            </el-form-item>
            <el-form-item style="text-align:center">
                <el-checkbox>我已阅读同意<span>用户协议</span>和<span>隐私条款</span></el-checkbox>
            </el-form-item>
            <el-form-item>
                 <el-button type="primary" round style="width:100%" @click="a">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</div>
</template>

<script>
export default {
  methods: {
    // 跳转页面
    a () {
      this.$router.push('/home')
    }
  }
}
</script>
<style lang="less" scoped>
// 引用lang="less" 就可以用less实现预处理 scoped 是局部的意思  如果没有这句话 后面的组件也会出现用样的效果
.login {
    background-image: url("../../assets/images/bg_login1.jpg");
    height: 100vh;
    background-size: contain;
    display: flex;
    justify-content: center;
    align-items: center;
    .login_card{
        width: 540px;
        height: 350px;
        background-color: transparent !important;
        // background: rgba(0, 0, 0, 0.01)
        .login_img {
            text-align: center;
            margin-bottom: 30px;
            font-size: 36px;
            color: yellowgreen;
            }
        .sp{
            span{
                color: skyblue;
                cursor: pointer;
                text-decoration: underline;
            }
        }
    }
}
</style>
