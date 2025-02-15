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
    dx: number
    dy: number
    constructor(x: number, y: number, radius: number, color: string) {
      this.x = x
      this.y = y
      this.radius = radius
      this.color = color
      this.dx = (Math.random() - 0.5) * 2
      this.dy = (Math.random() - 0.5) * 2
    }

    draw() {
      if (!ctx) return
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      ctx.fillStyle = this.color
      ctx.fill()
    }

    update() {
      if (!canvas) return
      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.dx = -this.dx
      }
      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        this.dy = -this.dy
      }
      this.x += this.dx
      this.y += this.dy
      this.draw()
    }
  }

  function createShapes() {
    if (!canvas) return
    for (let i = 0; i < 50; i++) {
      const radius = Math.random() * 30 + 10
      const x = Math.random() * (canvas.width - radius * 2) + radius
      const y = Math.random() * (canvas.height - radius * 2) + radius
      const color = randomColor()
      shapes.push(new Shape(x, y, radius, color))
    }
  }

  function animate() {
    requestAnimationFrame(animate)
    if (!ctx) return
    if (!canvas) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    shapes.forEach((shape) => shape.update())
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
