<template>
  <div style="width: 95%">
    <el-row>
      <el-col
        v-for="(item, index) in appList"
        :key="index"
        :xs="12"
        :sm="12"
        :md="12"
        :lg="6"
        :xl="6"
        style="padding: 6px"
      >
        <div class="app-item">
          <div class="app-item-img">
            <img class="responsive-image" object-fit="cover" :src="item.imgSrc" alt="" />
          </div>
          <!-- <el-image fit="cover" :src="item.imgSrc" style="opacity: 0.8"></el-image> -->
          <div class="app-item-title">{{ item.title }}</div>
          <div class="app-item-desc">{{ item.desc }}</div>
          <div class="app-item-btn">
            <!-- <div class="btn">🚀 前往</div> -->
            <div class="btn">
              <el-image style="width: 25px; margin-right: 5px" :src="item.icon"></el-image>
              前往
            </div>
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
  icon: string
}
const appList = ref<AppItem[]>([])
const prefix = 'https://www.tysb121.cn/images/'
onMounted(() => {
  appList.value = [
    {
      imgSrc: prefix + 'pEEZToj.jpg',
      title: '博客',
      desc: '一些收藏的文章',
      icon: '/img/icon/boke.png',
    },
    {
      imgSrc: prefix + 'pEEZ0sO.jpg',
      title: '网址集',
      desc: '收藏的网站',
      icon: '/img/icon/wangzhidiqiu.png',
    },
    {
      imgSrc: prefix + 'pEEZIeg.jpg',
      title: '今日热榜',
      desc: '关注最新资讯新闻，工作之余摸摸鱼',
      icon: '/img/icon/rebang.png',
    },
    {
      imgSrc: prefix + 'pEEZyod.jpg',
      title: '站点监测',
      desc: '流量访问监控',
      icon: '/img/icon/jiance.png',
    },
    {
      imgSrc: prefix + 'pEEmOqU.png',
      title: '面试题库',
      desc: '快来做题吧',
      icon: '/img/icon/datitiku.png',
    },
    {
      imgSrc: prefix + 'pEEnSi9.png',
      title: '番剧列表',
      desc: 'What can I say',
      icon: '/img/icon/fanju.png',
    },
    {
      imgSrc: prefix + 'pEEZfQf.jpg',
      title: '意见反馈',
      desc: '反馈是进步的阶梯，吐槽是创新的源泉',
      icon: '/img/icon/yijianfankui.png',
    },
  ]
})
</script>
<style lang="scss" scoped>
.app-item {
  width: 100%;
  background: rgba(0, 0, 0, 0.12);
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
  border-color: rgba(0, 0, 0, 0.12);
  border-style: solid;
  border-width: 0px;
  .app-item-img {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 比例 */
    overflow: hidden;
  }
  .responsive-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.6;
  }
  .app-item-title {
    line-height: 1.6;
    font-size: 1.1rem;
    padding: 3.2px 12.8px;
    font-weight: 500;
    hyphens: auto;
    letter-spacing: 0.0125em;
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
    letter-spacing: 0.0178571429em;
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
.btn {
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
  vertical-align: middle;
  &:hover {
    background-color: rgba($color: #fff, $alpha: 0.1);
  }
}
</style>