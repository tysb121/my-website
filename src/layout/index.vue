<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'
const activeIndex = ref('/')
const handleSelect = (key: string, keyPath: string) => {
  console.log(key, keyPath)
}
</script>
<template>
  <el-container>
    <el-header>
      <div class="container">
        <el-menu router :default-active="activeIndex" mode="horizontal" @select="handleSelect">
          <el-menu-item index="/">
            <el-icon><HomeFilled /></el-icon>首页
          </el-menu-item>
          <el-menu-item index="/blog">
            <el-icon><Management /></el-icon>文章
          </el-menu-item>
          <el-menu-item index="/webApp">
            <el-icon><Grid /></el-icon>站点
          </el-menu-item>
          <el-menu-item index="/about">
            <el-icon><InfoFilled /></el-icon>关于
          </el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-main>
      <div class="container">
        <RouterView></RouterView>
      </div>
    </el-main>
    <el-footer>
      <div class="container footer">
        <el-text>
          Copyright&nbsp;© 2025 - 2026 <el-link href="https://www.tysb121.cn">akm</el-link>
          &amp;&nbsp;Made&nbsp;by
          <el-link href="https://github.com/tysb121/my-web" target="_blank">tysb121</el-link>
          &amp;
          <el-link href="https://beian.miit.gov.cn" target="_blank"> 粤ICP备2023158793号</el-link>
        </el-text>
      </div>
    </el-footer>
  </el-container>
</template>

<style lang="scss" scoped>
.container {
  width: 1200px;
  margin: auto;
}
.footer {
  text-align: center;
  border-top: 1px solid #eee;
  line-height: 60px;
}
</style>
