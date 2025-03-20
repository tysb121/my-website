<template>
  <div class="home-page" :class="{ pd: !isMobileDevice }">
    <!-- <transition name="fade">
      <div class="loading" v-show="isloading">
        <loader></loader>
      </div>
    </transition> -->
    <!-- 加载动画 -->
    <Loading :isloading="isloading" />
    <!-- 背景图片 -->
    <div
      v-if="bgType === 1"
      class="vapp-fullscreen-background"
      :class="{ isMobile: isMobileDevice }"
    ></div>
    <!-- 动态视频背景 -->
    <video
      v-if="bgType === 2"
      autoplay
      loop
      muted
      class="video-bg"
      :class="{ isMobile: isMobileDevice }"
      id="bg-video"
      ref="VdPlayer"
    >
      <source :src="videosrc" type="video/mp4" />
    </video>
    <!-- 内容 -->
    <transition name="slide-up">
      <div class="home-container" v-if="containerFlag">
        <el-row align="middle" justify="center">
          <el-col class="left-container" :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
            <el-avatar :size="150" :src="avatarUrl" />
            <Introduction :config="configObj" />
            <div class="">
              <polarchart />
            </div>
            <SocialLinks />
            <Footer />
          </el-col>
          <el-col class="right-container" :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
            <!-- <div class="welcometitle">Hi, I'm Kenny</div> -->
            <div class="welcometitle" v-if="!isMobileDevice">{{ welcomeText }}</div>
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
    </transition>
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
// import Loader from '@/components/Loader.vue'
import Loading from '@/components/Loading.vue'
import imgUrl from '@/assets/3.jpg'
import { reactive, toRefs, onBeforeMount, computed, onMounted, ref } from 'vue'
import { Icon } from '@vicons/utils'
import { Link } from '@vicons/fa' // 注意使用正确的类别
import { getNewConfig } from '@/api/common'
const VdPlayer = ref<HTMLVideoElement>()
const configObj = ref<any>({})
const state = reactive({
  avatarUrl: imgUrl,
  lastSelectedIndex: -1,
  isloading: true,
  bgImgSrc: '',
  containerFlag: false,
  videosrc: '',
  bgType: 1, //1为静态图片，2为动态视频
  welcomeText: `Hi, I'm KOBE`,
})
const { avatarUrl, lastSelectedIndex, isloading, containerFlag, videosrc, bgType, welcomeText } =
  toRefs(state)

// 计算属性来判断是否为移动端
const isMobileDevice = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
})

// 设置背景图片
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
    'dynamic-mobile/幻觉镇-gaako_illust/Hallucination_town.mp4',
    'dynamic-mobile/chuva/chuva.mp4',
    'dynamic-mobile/Doodle-小猫女仆降临/d12.mp4',
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

  // 判断是否为动态图片
  if (imgSrc.includes('dynamic')) {
    state.bgType = 2
    state.videosrc = `/img/wallpaper/${imgSrc}`
  } else {
    state.bgType = 1
    state.bgImgSrc = `/img/wallpaper/${imgSrc}`
    root.style.setProperty('--background-image-url', `url('${state.bgImgSrc}')`)
  }
}

function loadImage() {
  const imageUrls = state.bgImgSrc ? [state.bgImgSrc] : []
  return new Promise((resolve, reject) => {
    const imagePromises = imageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const imgs = new Image()
        imgs.src = url
        imgs.onload = () => resolve(true)
        imgs.onerror = (err) => reject(err)
      })
    })

    // 设置超时机制：2.5秒
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 2500)
    })

    // 等待所有图片加载完成或超时
    Promise.race([Promise.all(imagePromises), timeoutPromise]).then(() => {
      if (state.bgType === 1) {
        const img = new Image()
        img.src = state.bgImgSrc
        // resolve() 函数通将一个 Promise 对象从未完成状态转变为已完成状态
        img.onload = () => {
          resolve(true)
        }
        img.onerror = (err) => {
          reject(err)
        }
      } else {
        const video = VdPlayer.value
        if (!video) return
        video.onloadedmetadata = () => {
          setTimeout(() => {}, 200)
          resolve(true)
        }
        video.onerror = (err) => {
          resolve(true)
        }
      }
    })
  })
}

async function getConfig() {
  await getNewConfig().then((res) => {
    if (res.code === 0 && res.data) {
      configObj.value = res.data
      avatarUrl.value = res.data.avatar
      welcomeText.value = res.data.welcomeText
    }
  })
}

onBeforeMount(async () => {
  setBackgroundImg()
  await getConfig()
  loadImage().then(() => {
    state.isloading = false
    setTimeout(() => {
      state.containerFlag = true
    }, 500)
  })
})
onMounted(() => {
  state.isloading = true
})
</script>

<style scoped lang="scss">
.pd {
  padding: 1.7% 0.5%;
}
.home-page {
  width: 100%;
  height: 100vh;
  position: relative;

  background-color: #282c34;
  // overflow: hidden;
  .home-container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    // transform: translateY(10px);
    // transition: transform 0.5s ease-out;
    &::-webkit-scrollbar {
      width: 0;
    }
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
    // margin-top: 10px;
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
  // margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

/* 调整视频元素的样式，使其全屏作为背景 */
.video-bg {
  position: fixed;
  height: 96.6%;
  width: 99%;
  top: 1.7%;
  left: 0.5%;
  object-fit: cover;
  margin: auto;
  background-clip: padding-box;
  filter: brightness(85%);
  border-radius: 16px;
  &.isMobile {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: unset;
  }
}
.vapp-fullscreen-background {
  position: fixed;
  height: 96.6%;
  width: 99%;
  top: 1.7%;
  left: 0.5%;
  //   z-index: -1;
  &.isMobile {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    &::before {
      border-radius: unset;
    }
  }
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
// .loading {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: #282c34;
//   z-index: 9999;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

/* 定义过渡效果 */
.slide-up-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.slide-up-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-out;
}

.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
