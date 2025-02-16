<template>
  <div class="dynamic-background" ref="parentContainer">
    <canvas ref="dynamicCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
const parentContainer = ref<HTMLElement | null>(null)
const dynamicCanvas = ref<HTMLCanvasElement | null>(null)
let canvas = dynamicCanvas.value
let ctx = null
// 光点对象
class Light {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  }

  // 绘制光点
  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
  }

  // 更新光点位置
  update() {
    this.draw()
    this.x += this.velocity.x
    this.y += this.velocity.y

    // 如果光点超出屏幕，重置位置
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
    }
  }
}
// 创建光点数组
const lights = []
const colors = ['#ff9a9e', '#fad0c4', '#a18cd1', '#fbc2eb', '#8ec5fc'] // 光点颜色

const initCanvas = () => {
  const parent = parentContainer.value
  if (!parent) return
  if (!ctx) return
  // 获取父元素的宽度和高度
  const parentWidth = parent.clientWidth
  const parentHeight = parent.clientHeight
  canvas.width = parentWidth
  canvas.height = parentHeight

  for (let i = 0; i < 100; i++) {
    const radius = Math.random() * 3 + 1 // 随机半径
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const color = colors[Math.floor(Math.random() * colors.length)]
    const velocity = {
      x: (Math.random() - 0.5) * 2, // 随机速度
      y: (Math.random() - 0.5) * 2,
    }
    lights.push(new Light(x, y, radius, color, velocity))
  }
}

// 动画循环
function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 更新并绘制所有光点
  lights.forEach((light) => {
    light.update()
  })

  // 绘制光点之间的连线
  for (let i = 0; i < lights.length; i++) {
    for (let j = i + 1; j < lights.length; j++) {
      const dx = lights[i].x - lights[j].x
      const dy = lights[i].y - lights[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // 如果光点之间的距离小于一定值，则绘制连线
      if (distance < 100) {
        ctx.beginPath()
        ctx.moveTo(lights[i].x, lights[i].y)
        ctx.lineTo(lights[j].x, lights[j].y)
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }
  }
}

onMounted(() => {
  canvas = dynamicCanvas.value
  if (!canvas) return
  ctx = canvas.getContext('2d')

  nextTick(() => {
    initCanvas()
    animate()
  })
})
</script>

<style scoped>
.dynamic-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
canvas {
  display: block;
}
</style>
