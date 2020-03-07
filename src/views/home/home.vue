<template>
    <el-container>
        <!-- aside和el-container是同级 -->
        <el-aside  style="width:200px;min-height:100vh;background:#542684">
            <!-- 此处的asideLayout在全局已经注册过 可以随便使用 -->
            <asideLayout></asideLayout>
        </el-aside>
        <el-container>
            <el-header style="padding:0">
                <!-- 此处的headerLayout在全局已经注册过 可以随便使用 -->
                <headerLayout></headerLayout>
            </el-header>
            <el-main style="padding-bottom:0">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>

</style>
