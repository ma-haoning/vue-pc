<template>
<!-- 面包屑elementui组件 -->
<!-- separator是分割器的意思  -class 使用了icon图标 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- 这里的to相当于是router-link内部的to 是要跳转到的地址 -->
        <el-breadcrumb-item to="/home">主页</el-breadcrumb-item>
        <el-breadcrumb-item><!-- 这里不一定会是什么  所以用到插槽 -->
            <slot name="breadCrumbs"></slot>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
