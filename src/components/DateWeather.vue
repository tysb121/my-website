<template>
  <div class="dateBox v-cards">
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
</template>

<script lang="ts" setup>
import { reactive, onMounted, onBeforeUnmount, ref } from 'vue'
import { getCurrentTime } from '@/utils/getTime'
import Weather from '@/components/Weather.vue'
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
const timeInterval = ref<any>(undefined)

// 更新时间
const updateTimeData = () => {
  // currentTime = getCurrentTime()
  Object.assign(currentTime, getCurrentTime())
}

onMounted(() => {
  updateTimeData()
  timeInterval.value = setInterval(updateTimeData, 1000)
})

onBeforeUnmount(() => {
  if (timeInterval.value) {
    clearInterval(timeInterval.value)
  }
})
</script>

<style lang="scss" scoped>
.dateBox {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  animation: fade 0.5s;
  color: #fff;
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