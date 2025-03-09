<template>
  <div style="width: 100%">
    <el-row :gutter="20" style="flex-wrap: wrap">
      <el-col
        v-for="(item, index) in appList"
        :key="index"
        :xs="12"
        :sm="12"
        :md="12"
        :lg="6"
        :xl="6"
      >
        <div class="app-item">
          <el-image :src="item.imgSrc" style="opacity: 0.8;"></el-image>
          <div class="app-item-title">{{ item.title }}</div>
          <div class="app-item-desc">{{ item.desc }}</div>
          <div class="app-item-btn">
            <div class="btn">🚀 前往</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
interface AppItem {
  imgSrc: string
  title: string
  desc: string
}
const appList = ref<AppItem[]>([])

onMounted(() => {
  appList.value = [
    {
      imgSrc: 'https://www.leleo.top/img/pEEZToj.jpg',
      title: 'WebApp',
      desc: 'WebApp',
    },
    {
      imgSrc: 'https://www.leleo.top/img/pEEZToj.jpg',
      title: 'WebApp',
      desc: 'WebApp',
    },
    {
      imgSrc: 'https://www.leleo.top/img/pEEZToj.jpg',
      title: 'WebApp',
      desc: 'WebApp',
    },
    {
      imgSrc: 'https://www.leleo.top/img/pEEZToj.jpg',
      title: 'WebApp',
      desc: 'WebApp',
    },
  ]
})
</script>
<style lang="scss" scoped>
.app-item {
  width: 100%;
  background: transparent;
  backdrop-filter: blur(7px);
  border-radius: 5%;
  color: #fff;
  overflow: hidden;
  overflow-wrap: break-word;
  position: relative;
  padding: 0;
  text-decoration: none;
  transition-duration: 0.28s;
  transition-property: box-shadow, opacity, background;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
  .app-item-title {
    line-height: 1.6;
    font-size: 1.1rem;
    padding: 3.2px 12.8px;
    font-weight: 500;
    hyphens: auto;
    letter-spacing: .0125em;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: none;
    white-space: nowrap;
    word-break: normal;
    word-wrap: break-word;
  }
  .app-item-desc {
    // font-size: 0.8rem;
    padding: 2.4px 9.6px;
    line-height: 1.4;
    // font-weight: 400;
    letter-spacing: .0178571429em;
    opacity: 0.6;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: none;
    white-space: nowrap;
  }
  .app-item-btn {
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.btn{
    display: inline-block;
    // padding: 10px;
    height: 36px;
    padding: 0 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    border-radius: 5px;
    &:hover{
        background-color: rgba($color: #fff, $alpha: 0.1);
    }
}
</style>