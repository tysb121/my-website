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
        <el-col class="right-container" :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
          <div class="welcometitle">Hi, I'm Kenny</div>
          <el-row style="width: 100%" :gutter="24">
            <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
              <hitokoto />
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
              <DateWeather />
            </el-col>
          </el-row>
          <div class="list-title">
            <Icon size="20">
              <Link />
            </Icon>
            应用列表
          </div>
          <ApplicationView />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Introduction from './HomeComponents/Introduction.vue'
import polarchart from './HomeComponents/polarchart.vue'
import SocialLinks from './HomeComponents/SocialLinks.vue'
import Footer from './HomeComponents/Footer.vue'
import DateWeather from '@/components/DateWeather.vue'
import hitokoto from '@/components/hitokoto.vue'
import ApplicationView from './HomeComponents/applicationView.vue'
import imgUrl from '@/assets/1.jpg'
import { reactive, toRefs } from 'vue'
import { Icon } from '@vicons/utils'
import { Link } from '@vicons/fa' // 注意使用正确的类别

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
  .right-container {
    height: 95vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  .welcometitle {
    margin-top: 10px;
    color: #fff;
    padding: 0 2rem;
    height: 90px;
    width: 100%;
    font-family: Pacifico-Regular;
    font-size: 64px;
  }
}
.list-title {
  width: 100%;
  font-size: 24px;
  color: #fff;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
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