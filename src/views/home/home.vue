<template>
    <el-container>
        <!-- aside和el-container是同级 -->
        <el-aside  style="width:200px">
            <!-- 此处的asideLayout在全局已经注册过 可以随便使用 -->
            <asideLayout></asideLayout>
        </el-aside>
        <el-container>
            <el-header>
                <!-- 此处的headerLayout在全局已经注册过 可以随便使用 -->
                <headerLayout></headerLayout>
            </el-header>
            <el-main>主体部分</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
