<template>
  <div class="default">
<h1 style="color:skyblue">湖人现役球星</h1>
      <el-carousel :interval="2000" type="card" height="200px" class="margin">
    <el-carousel-item v-for="item in list" :key="item">
      <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
  <el-carousel :interval="2000" type="card" height="200px" class="margin"> >
    <el-carousel-item v-for="item in list1" :key="item">
      <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel></div>

</template>

<script>
export default {
  data () {
    return {
      list: ['https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3517969070,673661098&fm=26&gp=0.jpg',
        'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2129844754,1976387103&fm=26&gp=0.jpg',
        'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2056137205,3573244825&fm=26&gp=0.jpg',
        'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4145481008,4243459547&fm=26&gp=0.jpg',
        'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1677870439,795281601&fm=26&gp=0.jpg'],
      list1: ['https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4189929686,1305257673&fm=26&gp=0.jpg',
        'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2061136616,2130593803&fm=26&gp=0.jpg',
        'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=946000446,618936493&fm=111&gp=0.jpg',
        'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2271148677,2494333691&fm=26&gp=0.jpg',
        'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2098828609,3253738755&fm=26&gp=0.jpg']
    }
  }
}
</script>

<style lang="less" scoped>
.default {
    height: calc(100vh - 100px);
    background-image: url("https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1471702318,3291649578&fm=26&gp=0.jpg");
    text-align:center;
    background-size: contain;
    .margin {
    margin-top:50px;
}
}
</style>
