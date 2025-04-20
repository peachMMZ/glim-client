import { createDiscreteApi } from 'naive-ui'
import { useServerStore } from '@/stores/server'
import { useShareStore } from '@/stores/share'

const { message } = createDiscreteApi(['message'])

class WebSocketService {

  socket: WebSocket | null = null
  private retryInterval: number = 5000 // 5 seconds
  private maxRetries: number = 5
  private retryCount: number = 0

  init () {
    const serverStore = useServerStore()
    const wsBaseUrl = serverStore.wsBaseUrl
    if (!wsBaseUrl) {
      message.error('无法连接至服务器')
      return
    }
    this.socket = new WebSocket(wsBaseUrl)
    this.socket.onopen = () => {
      message.success('连接成功')
    }
    this.socket.onmessage = (event) => {
      const shareStore = useShareStore()
      shareStore.onWsRecv(event)
    }
    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error)
      if (this.retryCount < this.maxRetries) {
        this.retryCount++
        setTimeout(() => {
          message.warning(`正在重连(${this.retryCount}/${this.maxRetries})...`)
          this.init()
        }, this.retryInterval)
      } else {
        message.error('连接失败')
      }
    }
    this.socket.onclose = () => {
      message.warning('连接关闭')
    }
  }

  send (data: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(data)
    } else {
      message.error('WebSocket未连接')
    }
  }
}

export const webSocketService = new WebSocketService()
