<template>
  <div class="hitokoto" @click.stop>
    <!-- 一言内容 -->
    <Transition name="el-fade-in-linear" mode="out-in">
      <div :key="hitokotoData.text" class="content" @click="updateHitokoto">
        <span class="text">
          <Icon size="16">
            <QuoteLeft />
          </Icon>
          {{ hitokotoData.text }}
          <Icon size="16">
            <QuoteRight />
          </Icon>
        </span>
        <span class="from">-「&nbsp;{{ hitokotoData.from }}&nbsp;」</span>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import { getHitokoto } from '@/api/common'
import { debounce } from 'lodash-es'
import { ElMessage } from 'element-plus'
import { Icon } from '@vicons/utils'
import { QuoteLeft, QuoteRight } from '@vicons/fa'
// import TypeIt from 'typeit'
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

// 更新一言数据
const updateHitokoto = debounce(() => {
  getHitokotoData()
}, 500)

onMounted(() => {
  getHitokotoData()
})
</script>

<style lang="scss" scoped>
.hitokoto {
  width: 100%;
  //   height: 100%;
  padding: 50px;
  animation: fade 0.5s;
  color: #fff;
  cursor: pointer;
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .text {
      font-size: 25px;
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
      font-size: 25px;
    }
  }
}
</style>