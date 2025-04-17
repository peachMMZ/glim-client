import { ref } from 'vue'

export function useLongPress(callback: () => void, delay = 500) {
  const pressTimer = ref<ReturnType<typeof setTimeout> | null>(null)

  const start = (event: MouseEvent | TouchEvent) => {
    // event.preventDefault()
    if (event instanceof MouseEvent) {
      if (event.type === 'click' && event.button !== 0) return
    }
    if (pressTimer.value === null) {
      pressTimer.value = setTimeout(callback, delay)
    }
  }

  const end = () => {
    if (pressTimer.value !== null) {
      clearTimeout(pressTimer.value)
      pressTimer.value = null
    }
  }

  return { start, end }
}
