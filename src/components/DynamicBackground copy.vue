<template>
  <div class="dynamic-background" ref="parentContainer">
    <canvas ref="dynamicCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
const parentContainer = ref<HTMLElement | null>(null)
const dynamicCanvas = ref<HTMLCanvasElement | null>(null)
const initCanvas = () => {
  // console.log(dynamicCanvas.value)

  const canvas = dynamicCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  const parent = parentContainer.value
  if (!parent) return
  // 获取父元素的宽度和高度
  const parentWidth = parent.clientWidth
  const parentHeight = parent.clientHeight
  canvas.width = parentWidth
  canvas.height = parentHeight

  const shapes: Shape[] = []

  function randomColor() {
    return `hsl(${Math.random() * 360}, 100%, 50%)`
  }

  class Shape {
    x: number
    y: number
    radius: number
    color: string
    speed: number
    time: number
    constructor(x: number, y: number, radius: number, color: string, speed: number) {
      this.x = x
      this.y = y
      this.radius = radius
      this.color = color
      this.speed = speed
      this.time = 0
    }

    draw() {
      if (!ctx) return
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.fill()
    }

    update() {
      this.time += this.speed
      this.radius = 50 + Math.sin(this.time) * 20
      this.x += Math.cos(this.time) * 0.5
      this.y += Math.sin(this.time) * 0.5
    }
  }

  function createShapes() {
    if (!canvas) return
    for (let i = 0; i < 10; i++) {
      const radius = 50
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const color = randomColor()
      const speed = (Math.random() - 0.5) * 0.05
      shapes.push(new Shape(x, y, radius, color, speed))
    }
  }

  function animate() {
    requestAnimationFrame(animate)
    if (!ctx) return
    if (!canvas) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    shapes.forEach((shape) => {
      shape.update()
      shape.draw()
    })
  }

  createShapes()
  animate()
}
onMounted(() => {
  nextTick(() => {
    initCanvas()
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
