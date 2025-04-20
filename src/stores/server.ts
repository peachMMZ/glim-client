import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useServerStore = defineStore('server', () => {

  const serverAddress = ref<string | null>(null)
  const apiBaseUrl = computed(() => {
    if (import.meta.env.DEV) {
      return '/api'
    } else {
      return serverAddress.value ? `${serverAddress.value}/api` : null
    }
  })
  const wsBaseUrl = computed(() => {
    if (import.meta.env.DEV) {
      return '/ws'
    } else {
      return serverAddress.value ? `${serverAddress.value.replace('http', 'ws')}/ws` : null
    }
  })

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
    apiBaseUrl,
    wsBaseUrl,
    init
  }
})
