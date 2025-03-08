<template>
  <div class="home-page">
    <div class="vapp-fullscreen-background"></div>
    <div class="home-container">
      <el-row align="middle" justify="center">
        <el-col class="left-container" :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
          <el-avatar :size="150" :src="circleUrl" />
          <Introduction />
          <div class="">
            <polarchart />
          </div>
          <SocialLinks />
          <Footer />
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18"> </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Introduction from './HomeComponents/Introduction.vue'
import polarchart from './HomeComponents/polarchart.vue'
import SocialLinks from './HomeComponents/SocialLinks.vue'
import Footer from './HomeComponents/Footer.vue'
import imgUrl from '@/assets/1.jpg'
import { reactive, toRefs } from 'vue'

const state = reactive({
  circleUrl: imgUrl,
})
const { circleUrl } = toRefs(state)
</script>

<style scoped lang="scss">
.home-page {
  width: 100%;
  height: 100vh;
  position: relative;
  padding: 1.7% 0.5%;
  background-color: #282c34;
  .home-container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  .left-container {
    height: 95vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    // gap: 24px;
  }
}
.vapp-fullscreen-background {
  position: fixed;
  height: 96.6%;
  width: 99%;
  top: 1.7%;
  left: 0.5%;
  //   z-index: -1;
}
/* 添加一个::before伪元素降低背景图片的亮度，而不会影响background元素的其他内容 */
.vapp-fullscreen-background::before {
  border-radius: 16px;
  content: '';
  background-image: url('../assets/image.png');
  transition: background-image 0.8s ease;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  /* 调整亮度值  */
  filter: brightness(85%);
}
</style>