import { webSocketService } from '@/services/websocket'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createDiscreteApi } from 'naive-ui'

const { message } = createDiscreteApi(['message'])

interface ShareMessage {
  text: string
  timestamp: number
  bySelf?: boolean
}

export const useShareStore = defineStore('share', () => {
  const messageList = ref<ShareMessage[]>([])

  const onWsRecv = (event: MessageEvent) => {
    switch(event.type) {
      case 'message':
        const data: string = event.data
        messageList.value.push({
          text: data,
          timestamp: Date.now(),
          bySelf: false,
        })
        break
      default:
        console.warn('Unknown message type:', event.type)
        break
    }
  }

  const send = (text: string) => {
    if (!text) {
      message.error('请输入内容')
      return
    }
    try {
      webSocketService.send(text)
    } catch (error) {
      console.error('Error sending message:', error)
      message.error('发送失败')
      return
    }
    const shareMessage: ShareMessage = {
      text,
      timestamp: Date.now(),
      bySelf: true,
    }
    messageList.value.push(shareMessage)
  }

  return {
    messageList,
    onWsRecv,
    send
  }
})
