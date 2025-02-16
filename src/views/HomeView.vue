<template>
  <div class="page">
    <DynamicBackground />
    <div class="user-info">
      <h2 style="font-size: 48px">Hello!👋</h2>
      <h1 style="font-size: 60px">世界因你而精彩！</h1>
      <div class="hitokoto cards" @click.stop>
        <!-- 一言内容 -->
        <Transition name="el-fade-in-linear" mode="out-in">
          <div :key="hitokotoData.text" class="content" @click="updateHitokoto">
            <span class="text">{{ hitokotoData.text }}</span>
            <span class="from">-「&nbsp;{{ hitokotoData.from }}&nbsp;」</span>
          </div>
        </Transition>
      </div>
      <div class="dateBox cards" style="margin-top: 10px">
        <div class="time">
          <div class="date">
            <span>{{ currentTime.year }}&nbsp;年&nbsp;</span>
            <span>{{ currentTime.month }}&nbsp;月&nbsp;</span>
            <span>{{ currentTime.day }}&nbsp;日&nbsp;</span>
            <span class="sm-hidden">{{ currentTime.weekday }}</span>
          </div>
          <div class="text">
            <span> {{ currentTime.hour }}:{{ currentTime.minute }}:{{ currentTime.second }}</span>
          </div>
        </div>
        <Weather />
      </div>
    </div>
    <div class="user-avatar">
      <el-avatar :size="250" :src="circleUrl" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs, onMounted, onBeforeUnmount, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getHitokoto } from '@/api/common'
import { debounce } from 'lodash-es'
import Weather from '@/components/Weather.vue'
import { getCurrentTime } from '@/utils/getTime'
import imgUrl from '@/assets/1.jpg'
import DynamicBackground from '../components/DynamicBackground.vue'
const state = reactive({
  circleUrl: imgUrl,
})
const { circleUrl } = toRefs(state)
interface Time {
  year: unknown
  month: unknown
  day: unknown
  weekday: unknown
  hour: unknown
  minute: unknown
  second: unknown
}
// 当前时间
const currentTime: Time = reactive({
  year: '',
  month: '',
  day: '',
  weekday: '',
  hour: '',
  minute: '',
  second: '',
})
const timeInterval = ref<number | undefined>(undefined)
// 一言数据
const hitokotoData = reactive({
  text: '这里应该显示一句话',
  from: '無名',
})

// 获取一言数据
const getHitokotoData = async () => {
  try {
    const result = await getHitokoto()
    hitokotoData.text = result.hitokoto
    hitokotoData.from = result.from
  } catch (error) {
    console.log(error)

    ElMessage.error({
      message: '一言获取失败',
    })
    hitokotoData.text = '这里应该显示一句话'
    hitokotoData.from = '無名'
  }
}

// 更新时间
const updateTimeData = () => {
  // currentTime = getCurrentTime()
  Object.assign(currentTime, getCurrentTime())
}

// 更新一言数据
const updateHitokoto = debounce(() => {
  getHitokotoData()
}, 500)

onMounted(() => {
  getHitokotoData()
  updateTimeData()
  timeInterval.value = setInterval(updateTimeData, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timeInterval.value)
})
</script>
<style lang="scss" scoped>
.page {
  height: calc(100vh - 200px);
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.bg-img {
  position: absolute;
  z-index: -1;
  // width: 100%;
  right: 0;
  bottom: 0;
  color: red;
  // height: 100%;
}
// 卡片样式
.cards {
  border-radius: 6px;
  background-color: #00000010;
  backdrop-filter: blur(10px);
  transform: scale(1);
  transition: backdrop-filter 0.3s, transform 0.3s;
  &:hover {
    transform: scale(1.01);
  }
  &:active {
    transform: scale(0.98);
  }
}
.hitokoto {
  width: 100%;
  height: 100%;
  padding: 20px;
  animation: fade 0.5s;
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .text {
      font-size: 1.1rem;
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .from {
      margin-top: 10px;
      font-weight: bold;
      align-self: flex-end;
      font-size: 1.1rem;
    }
  }
}

.dateBox {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  animation: fade 0.5s;
  .time {
    font-size: 1.1rem;
    text-align: center;
    .date {
      text-overflow: ellipsis;
      overflow-x: hidden;
      white-space: nowrap;
    }
    .text {
      margin-top: 10px;
      font-size: 3.25rem;
      letter-spacing: 2px;
      font-family: 'UnidreamLED';
    }
    @media (min-width: 1201px) and (max-width: 1280px) {
      font-size: 1rem;
    }
    @media (min-width: 911px) and (max-width: 992px) {
      font-size: 1rem;
      .text {
        font-size: 2.75rem;
      }
    }
  }
  .weather {
    text-align: center;
    width: 100%;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
  }
}
</style>
