<template>
  <canvas id="polarChart"></canvas>
</template>

<script lang="ts" setup>
import { Chart, registerables } from 'chart.js'
import { defineOptions, onMounted, ref } from 'vue'
Chart.register(...registerables)

defineOptions({
  name: 'polarChart',
})
const skills = [
  'Vue.js',
  'React',
  'JavaScript',
  'Node',
  'Java',
  'Python',
  'linux',
  'Docker',
  'MySQL',
  'MongoDB',
  'AWS',
]
const skillPoints = [85, 78, 88, 90, 80, 78, 85, 65, 82, 78, 70]

function generateColors(count: number) {
  const colors = []
  for (let i = 0; i < count; i++) {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    colors.push(`rgba(${r}, ${g}, ${b}, 0.6)`)
  }
  return colors
}
function renderChart() {
  const ctx = document.getElementById('polarChart').getContext('2d')
  const colors = generateColors(skills.length)
  new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: skills,
      datasets: [
        {
          label: '技能点',
          data: skillPoints,
          backgroundColor: colors,
          borderColor: colors.map((color) => color.replace('0.6', '1')),
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(40, 40, 40, 0.7)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 2,
          padding: 10,
          caretSize: 6,
          caretPadding: 8,
          cornerRadius: 6,
          boxWidth: 10,
          boxHeight: 10,
          displayColors: true,
          callbacks: {
            label: function (context) {
              const label = context.label || ''
              const value = context.raw || ''
              return `${label}: ${value} 技能点`
            },
            title: function (context) {
              return `${context[0].label}`
            },
          },
        },
      },
      scales: {
        r: {
          ticks: {
            display: false,
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
            lineWidth: 0.5,
          },
          angleLines: {
            color: 'rgba(0, 0, 0, 0.2)',
            lineWidth: 1,
          },
        },
      },
      animation: {
        duration: 1800,
        easing: 'easeOutQuad',
        animateRotate: true,
        animateScale: true,
      },
    },
  })
}
onMounted(() => {
  renderChart()
})
</script>

<style scoped>
#polarChart {
  height: 270px;
  display: block;
  box-sizing: border-box;
  width: 540px;
}
</style>