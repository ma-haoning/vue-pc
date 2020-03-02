<template>
<div class="login">
    <!-- elementui的card属性 -->
    <el-card class="login_card">
        <div class="login_img">
            <img src="../../assets/images/logo_index.png" style="height:45px" alt="">
        </div>
        <!-- elementui的表单属性  manual 手动的意思-->
        <el-form class="sp" :model="loginForm" :rules="loginRules" ref="manualSubmit">
            <!-- elementui的表单的标签属性需要有个承接容器的item -->
            <!-- 用prop来过度字段名字 -->
            <el-form-item prop="telephone">
                <!-- 承接容器之后放入input -->
                <!-- 双向数据流来对应 -->
                <!-- <i class="el-icon-mobile-phone" style="font-size:35px;color:skyblue"></i> -->
                <el-input placeholder="请输入您的手机号" v-model="loginForm.telephone" ></el-input>
            </el-form-item>
             <el-form-item prop="code">
                <!-- 承接容器之后放入input -->
                <!-- <i class="el-icon-loading" style="color:skyblue;font-size:35px"></i> -->
                <el-input placeholder="请输入您的验证码" style="width:60%" v-model="loginForm.code"></el-input>
                <!-- button按钮-->
                <el-button plain style="float:right" @click.once="code">发送验证码</el-button>
            </el-form-item>
            <el-form-item prop="checked">
                <el-checkbox v-model="loginForm.checked">我已阅读同意<span>用户协议</span>和<span>隐私条款</span></el-checkbox>
            </el-form-item>
            <el-form-item>
                 <el-button type="primary" round style="width:100%" @click="manualSubmit" >登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      // modle对应的数据
      loginForm: {
        // 字段名
        telephone: '', // 手机号的字段名
        code: '', // 验证码的字段名
        checked: false // 设置false就是复选框未选中
      },
      // rules对应的数据
      loginRules: {
        // 规则内部先写字段名字  每一个字段对应的有好多规则  所以字段名后面是一个数组  数组内部是若干个对象
        telephone: [{ required: true, message: '您的手机号码不能为空' }, { pattern: /^1[3-9]\d{9}$/, message: '您的手机号码格式必须以1开头,第2个数字必须是[3-9]区间的11位数字' }],
        code: [{ required: true, message: '验证码不能为空' }, { pattern: /^\d{6}$/, message: '验证码必须是6位数字' }],
        // 对于复选框比较特殊 用到validator
        checked: [{
          // validator是校验的意思
          validator: function (rule, value, callback) {
            value ? callback() : callback(new Error('您还没同意我们的用户协议和隐私条款'))
          }
        }]
      }
    }
  },
  methods: {
    // 手动提交(登录按钮)
    manualSubmit () {
      // 通过ref获取当前组件对象(ref既可以获取原生的dom节点也可以获取当前的组件对象)
      // validate是组件对象的一个方法  方法内部是一个回调函数  也可以是 promise(then,catch)
      // 回调函数的两个参数分别对应 校验成功  校验失败
      this.$refs.manualSubmit.validate((isOk, isErr) => {
        if (isOk) {
          // 通过校验之后 可以发送axios请求
          // 因为上面是箭头函数 所以 this可以为所欲为
          this.$axios({
            url: '/authorizations',
            params: {}, // 请求的参数 这里不需要
            data: { mobile: this.loginForm.telephone, code: this.loginForm.code },
            method: 'post'
          }).then((res) => {
            // console.log(res)  前后端分离  现在需要token来接收 当做钥匙每次请求需要携带
            window.localStorage.setItem('user_token', res.data.data.token)
            // 跳转到home主页
            this.$router.push('/home')
          }).catch(() => { // 手机或者验证码出错的话提示
            this.$message({
              // x 显示
              showClose: true,
              // 文字居中显示
              center: true,
              // 提示的信息
              message: '您的手机号或者验证码输入错误',
              // 类型是警告
              type: 'error'
            })
          })
        //   console.log(isOk)
        } else { // 这是未通过校验的分支
        // 这个是elementUI的message提醒
          this.$message({
            // x 显示
            showClose: true,
            // 文字居中显示
            center: true,
            // 提示的信息
            message: '校验未通过',
            // 类型是警告
            type: 'warning'
          })
        }
      })
    },
    code () {
      this.loginForm.code = '246810'
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
