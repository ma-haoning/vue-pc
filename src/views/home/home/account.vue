<template>
<el-card class="aa">
    <!-- elementui的slot -->
    <breadCrumb slot="header">
    <!-- 自己定义的slot -->
        <template slot="breadCrumb">账户信息</template>
    </breadCrumb>
    <el-form label-width="100px" :model="formData" :rules="rules" ref="jiaoyan">
        <div class="photo">
            <!-- 如果从后台获取到图片就显示 如果该用户没有 就用默认的 -->
            <img :src="formData.photo?formData.photo:defaultImg" alt="">
        </div>
        <el-form-item label="用户名" prop="name">
            <el-input style="width:30%" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="intro">
            <el-input style="width:30%" v-model="formData.intro"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input style="width:30%" v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
            <!-- disabled就是禁用的意思  注册的时候不能改变了 所以禁用 -->
            <el-input style="width:30%" disabled v-model="formData.mobile"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type='primary' @click="save">保存</el-button>
        </el-form-item>
    </el-form>
     <el-upload action="" :show-file-list="false" :http-request="uploadPhoto">
            <div class="change">更换头像</div>
     </el-upload>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      // 定义表单
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        email: '', // 邮箱
        mobile: '', // 手机号
        photo: '' // 头像
      },
      // 规则
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 1, max: 8, message: '用户名的个数在1-8之间', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }, {
          pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '请输入正确的格式', trigger: 'blur'
        }]
      },
      // 设置一个静态图片
      defaultImg: require('../../../assets/images/default.jpg')
    }
  },
  methods: {
    // 获取用户的数据
    getUserData () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        console.log(res)
        this.formData = res.data
      })
    },
    save () {
      this.$refs.jiaoyan.validate(isOk => {
        if (isOk) {
          // 校验成功发送请求
          this.$axios({
            url: '/user/profile',
            method: 'patch', // 类型
            data: this.formData
          }).then(res => {
            this.$message.success('保存信息成功')
          }).catch(() => {
            this.$message.error('保存信息失败')
          })
        } else {
          this.$message.error('请您重新校验')
        }
      })
    },
    uploadPhoto (params) {
      // 参数是个文件 所以要new FormData
      const data = new FormData()
      data.append('photo', params.file)
      //   得到应有的数据 就发送请求
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data // 要传递的参数  es6的模板
      }).then(res => {
        // console.log(res)
        this.formData.photo = res.data.photo
      }).catch()
    }
  },
  created () {
    //   钩子函数 直接调用
    this.getUserData()
  }
}
</script>

<style lang='less' scoped>
 .aa {
     height: 700px;
     position: relative;
 }
 .photo {
     width: 200px;
     height: 200px;
     position: absolute;
     right: 30px;
     top:50px;
     img {
         width: 100%;
         height: 100%;
         border-radius: 50%;
     }
 }
 .change {
     position: absolute;
     top:260px;
     right: 31px;
     background-color: #ccc;
     width: 201px;
     height: 20px;
     text-align: center;
     line-height: 20px;
     border-radius: 3px;
 }
</style>
