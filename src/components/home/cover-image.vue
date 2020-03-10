<template>
    <div class="coverImage">
        <div class="content" v-for="(item,index) in list" :key="index">
            <img :src="item?item:defaultImg" alt="" @click='clickImg(index)'>
        </div>
        <el-dialog :visible="kejian" @close='kejian=false'>
            <selectImg @select='zhi'></selectImg>
        </el-dialog>
    </div>
</template>

<script>
export default {
  // 通过props接收
  props: ['list'],
  data () {
    return {
      // 定义一个默认的图片
      defaultImg: require('../../assets/images/pic_bg.png'),
      // 当前的会话窗口
      kejian: false,
      currentIndex: -1
    }
  },
  methods: {
    clickImg (index) {
      this.kejian = true
      this.currentIndex = index
    },
    zhi (url) {
    //   console.log(url)  失去遮罩
      this.kejian = false
      this.$emit('bigZhi', url, this.currentIndex)
    }
  }
}
</script>

<style lang='less' scoped>
    .coverImage {
        // border: 1px solid #000;
        display: flex;
        margin: 20px 50px;
        .content {
        width: 200px;
        height: 200px;
        border: 1px solid #ccc;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
