import { createApp, type App } from 'vue'
import { createPinia } from 'pinia'

import AppComponent from './App.vue'
import router from './router'
import 'virtual:uno.css'
import 'vfonts/FiraCode.css'
import { webSocketService } from './services/websocket'
import { useServerStore } from '@/stores/server'

async function setupPinia(app: App) {
  const pinia = createPinia()
  app.use(pinia)
}

async function setupRouter(app: App) {
  app.use(router)
}

function setupWebSocket() {
  webSocketService.init()
}

async function setupStore() {
  const serverStore = useServerStore()
  await serverStore.init()
}

async function main() {
  const startTime = Date.now()

  const app = createApp(AppComponent)

  await setupPinia(app)
  await setupRouter(app)
  await setupStore()
  setupWebSocket()

  app.mount('#app')

  console.log(`App started in ${Date.now() - startTime}ms`)
}

main()
