<template>
  <div class="description v-cards">
    <div class="content">
      <Icon size="16">
        <QuoteLeft />
      </Icon>
      <div class="text">
        <p>{{ descriptionText.hello }}</p>
        <p>{{ descriptionText.text }}</p>
      </div>
      <Icon size="16">
        <QuoteRight />
      </Icon>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Icon } from '@vicons/utils'
import { QuoteLeft, QuoteRight } from '@vicons/fa'
import { reactive, defineProps, watch } from 'vue'

const props = defineProps({
  config: {
    type: Object,
    default: () => {
      return {
        introduceTitle: '',
        introduce: '',
      }
    },
  },
})
// 简介区域文字
const descriptionText = reactive({
  hello: props.config.introduceTitle || 'Hello! World!',
  text: props.config.introduce || '一个建立于21世纪的小站，存活于互联网的边缘',
})
</script>
<style lang="scss" scoped>
.description {
  padding: 1rem;
  // margin-top: 3.5rem;
  // max-width: 460px;
  width: 80%;
  animation: fade 0.5s;

  .content {
    display: flex;
    justify-content: space-between;
    color: #fff;
    .text {
      margin: 0.75rem 1rem;
      line-height: 2rem;
      margin-right: auto;

      p {
        &:nth-of-type(1) {
          font-family: 'Pacifico-Regular';
        }
      }
    }

    .xicon:nth-of-type(2) {
      align-self: flex-end;
    }
  }
  @media (max-width: 720px) {
    max-width: 100%;
    pointer-events: none;
  }
}
</style>
