<template>
  <div class="web-app-view">
    <h1 style="font-size: 48px">收藏网站</h1>
    <div class="web-app-list">
      <el-card
        v-for="(item, index) in webAppList"
        :key="index"
        shadow="hover"
        style="flex: 1; cursor: pointer"
      >
        <h1 style="font-size: 18px; font-weight: bold">{{ item.title }}</h1>
        <p style="font-size: 14px; color: #374151">{{ item.description }}</p>
        <!-- <div class="web-app-link">前往>></div> -->
        <el-link>前往>></el-link>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const webAppList = ref([
  {
    title: 'GitHub',
    url: 'https://github.com/',
    description: 'xx',
  },
  {
    title: 'Gitee',
    url: 'https://gitee.com/',
    description: 'xxx',
  },
  {
    title: 'Gitee',
    url: 'https://gitee.com/',
    description: 'xxx',
  },
])
</script>
<style lang="scss" scoped>
.web-app-view {
  .web-app-list {
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
  }
}
</style>
