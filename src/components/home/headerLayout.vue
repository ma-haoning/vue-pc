<template>
    <el-row type="flex" align="middle" class="row">
        <el-col :span="12">
            <i class="el-icon-guide" style="margin: 0 15px;font-size:25px"></i>
            <span>洛杉矶湖人</span>
        </el-col>
        <el-col :span="12">
            <el-row type="flex" justify="end" align="middle" style="padding-right:35px">
                <img src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3256100974,305075936&fm=26&gp=0.jpg" alt="" style="width:35px;height:35px;border-radius:50%;margin-right:10px">
                <el-dropdown trigger="click">
                    <span>宁i<i class="el-icon-caret-bottom"></i></span>
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

}
</script>

<style lang="less" scoped>
    .row {
        height: 55px;
        background-color: #fff;
    }
</style>
