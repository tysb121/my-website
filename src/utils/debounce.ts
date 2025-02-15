// 防抖
let timeout: ReturnType<typeof setTimeout> | null = null
export function debounce(func: (...args: unknown[]) => void, wait = 300, immediate = false) {
  // 清除定时器
  if (timeout !== null) {
    clearTimeout(timeout)
  }
  // 立即执行
  if (immediate) {
    const callNow = !timeout
    timeout = setTimeout(function () {
      timeout = null
    }, wait)
    if (callNow && isFunc(func)) func()
  } else {
    timeout = setTimeout(function () {
      if (isFunc(func)) {
        func()
      }
    }, wait)
  }
}

function isFunc(func: unknown) {
  return Object.prototype.toString.call(func) === '[object Function]'
}
