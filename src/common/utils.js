export function debounce(func, delay) { // 防抖函数
  let time = null
  return function(...args) {
    if(time) clearTimeout(time)
    time = setTimeout(() => {
      func.apply(this, args)
    },delay)
  }
}
