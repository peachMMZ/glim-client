import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useServerStore = defineStore('server', () => {

  const serverAddress = ref<string | null>(null)
  const baseUrl = computed(() => serverAddress.value ? `${serverAddress.value}/api` : null)

  const init = async () => {
    const address = window.location.href.replace(/\/$/, '')
    if (address) {
      serverAddress.value = address
      console.log('Server address:', address)
    } else {
      throw new Error('Server address not found')
    }
  }

  return {
    serverAddress,
    baseUrl,
    init
  }
})
