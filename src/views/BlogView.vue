<template>
  <div class="blog-view">
    <h1 style="font-size: 48px">文章</h1>
    <p style="margin: 10px 0; color: #4b5563">收藏各类文章</p>
    <el-input placeholder="请输入搜索内容"></el-input>
    <div style="margin: 5px; font-size: 14px">Tag: <el-tag type="info">VUE</el-tag></div>
    <div class="blog-list">
      <el-card
        v-for="(item, index) in blogList"
        :key="index"
        shadow="hover"
        style="flex: 1; cursor: pointer"
        @click="() => $router.push(`/blog/${item.id}`)"
      >
        <div style="position: relative">
          <el-image :src="item.src" />
          <div class="blog-tag">
            <el-tag type="info">VUE</el-tag>
          </div>
        </div>
        <h3 class="blog-title">{{ item.title }}</h3>
        <p class="blog-count">
          <el-icon><View /></el-icon>{{ item.viewCount }}次
        </p>
        <div class="blog-date">发布时间：{{ fomatDate(item.date) }}</div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
interface Blog {
  id: string
  src: string
  title: string
  viewCount: number
  date: string
}
const blogList = ref<Blog[]>([])

for (let i = 0; i < 3; i++) {
  blogList.value.push({
    id: i + 1 + '',
    src: 'https://cdn.moeyy.cn/img/202309172109595.png/moeyy_webp',
    title: '使用fly.io实现负载均衡和自动弹性伸缩',
    viewCount: 1,
    date: '2023-07-01',
  })
}

const fomatDate = (date: string) => {
  if (!date) return ''
  return dayjs(date).format('YYYY-MM-DD')
}
</script>

<style lang="scss" scoped>
.blog-view {
  .blog-list {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
  }
  .blog-tag {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .blog-title {
    font-size: 18px;
    font-weight: bold;
    color: #1f2937;
  }
  .blog-count {
    margin-top: 5px;
    font-size: 14px;
    color: #4b5563;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .blog-date {
    margin-top: 5px;
    font-size: 14px;
    font-weight: bold;
    color: #1f2937;
  }
}
</style>
