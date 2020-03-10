<template>
<el-card>
    <breadCrumb slot="header">
    <template slot="breadCrumb">发布文章</template>
    </breadCrumb>
    <el-form style="margin-left:50px" :model="formData" :rules="rules" ref="jiaoYan">
        <el-form-item label="标题" prop="title">
            <el-input placeholder="请输入您的标题" style="width:60%" v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
           <quill-editor style="height:300px;margin-left:50px;margin-bottom:100px" v-model="formData.content"></quill-editor>
        </el-form-item>
        <el-form-item label="封面" prop="cover">
            <el-radio-group v-model="formData.cover.type">
                <el-radio :label=0>无图</el-radio>
                <el-radio :label=1>单图</el-radio>
                <el-radio :label=3>三图</el-radio>
                <el-radio :label=-1>自动</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
            <el-select placeholder="请选择频道" v-model="formData.channel_id">
            <el-option :label="item.name" :value="item.id" v-for="item in list" :key="item.id"></el-option></el-select>
        </el-form-item>
       <el-form-item>
            <el-button type="primary" @click="publish(false)">发布</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
       </el-form-item>
    </el-form>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      // 频道的列表
      list: [],
      // 表单对象
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0, // -1 是自动 0是无图  1 是单图 3 是三图
          images: [] // 字符串数组 对应type  假如 type 为1 images中应该有一个值 假如为3 images应该有三个值 0 images为空
        },
        channel_id: null // 频道id
      },
      // 表单规则
      rules: {
        title: [{ required: true, message: '文章标题不能为空', trigger: 'blur' }, {
          min: 5, max: 30, message: '标题应该在5-30字符之间', trigger: 'blur'
        }],
        content: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }],
        channel_id: [{ required: true, message: '频道内容不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 获取频道列表的方法
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((res) => {
        console.log(res)
        this.list = res.data.channels
      })
    },
    // 发布文章
    publish (draft) {
      this.$refs.jiaoYan.validate(isOk => {
        const { articleId } = this.$route.params
        if (isOk) {
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: {
              draft
            },
            data: this.formData
          }).then(() => {
            this.$message.success('操作成功!')
            // 如果发布成功
            this.$router.push('/home/content') // 跳到文章列表
          }).catch(() => {
            this.$message.error('发布失败!')
          })
        } else { // 校验失败的分支
          this.$message({
            type: 'warning',
            center: true,
            message: '校验失败啦',
            duration: 900
          })
        }
      })
    },
    // 对应的id
    getArticle (id) {
      //  获取数据
      this.$axios({
        url: `/articles/${id}` // 请求地址
      }).then(result => {
        this.formData = result.data // 将数据赋值给表单数据
      })
    }
  },
  created () {
    this.getChannels()
    // 判断当前的路由是否有id
    const { articleId } = this.$route.params
    articleId && this.getArticle(articleId) // 开发中常用写法  前者存在就调用后者
  }
}
</script>

<style>

</style>
