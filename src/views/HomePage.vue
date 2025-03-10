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
          <!-- <div class="welcometitle">Hi, I'm Kenny</div> -->
          <div class="welcometitle" v-if="!isMobileDevice">Hi, I'm KOBE</div>
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
import imgUrl from '@/assets/3.jpg'
import { reactive, toRefs, onBeforeMount, computed } from 'vue'
import { Icon } from '@vicons/utils'
import { Link } from '@vicons/fa' // 注意使用正确的类别

const state = reactive({
  circleUrl: imgUrl,
  lastSelectedIndex: -1,
})
const { circleUrl, lastSelectedIndex } = toRefs(state)

// 计算属性来判断是否为移动端
const isMobileDevice = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
})

function setBackgroundImg() {
  const root = document.documentElement
  //PC端的背景图片
  const imgFilePC = [
    'static/安逸舒适/image.png',
    'static/海洋女孩/image.png',
    'static/书房夜晚/image.png',
    'dynamic/尼尔：机械纪元 团队/Nier-Automata-Team.webm',
    'dynamic/向往航天的女孩/Toy-Aeroplane.webm',
  ]
  for (let i = 1; i <= 10; i++) {
    //添加另外一个文件夹的图片
    imgFilePC.push(`landscape/background${i}.jpg`)
  }

  const imgFileMobile = [
    // 'dynamic-mobile/幻觉镇-gaako_illust/Hallucination_town.mp4',
    // 'dynamic-mobile/chuva/chuva.mp4',
    // 'dynamic-mobile/Doodle-小猫女仆降临/d12.mp4',
  ]
  for (let i = 1; i <= 4; i++) {
    imgFileMobile.push(`static-mobile/000${i}/image.png`)
  }

  let newIndex = lastSelectedIndex.value

  while (newIndex === lastSelectedIndex.value) {
    if (isMobileDevice.value) {
      newIndex = Math.floor(Math.random() * imgFileMobile.length)
    } else {
      newIndex = Math.floor(Math.random() * imgFilePC.length)
    }
  }
  state.lastSelectedIndex = newIndex
  let imgSrc = ''
  if (isMobileDevice.value) {
    imgSrc = imgFileMobile[newIndex]
  } else {
    imgSrc = imgFilePC[newIndex]
  }

  root.style.setProperty('--background-image-url', `url('/src/assets/img/wallpaper/${imgSrc}')`)
}
onBeforeMount(() => {
  setBackgroundImg()
})
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
  width: 95%;
  font-size: 24px;
  color: #fff;
  margin-left: 2%;
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
  // background-image: url('../assets/image.png');
  background-image: var(--background-image-url);
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