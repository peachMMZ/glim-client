import { useServerStore } from '@/stores/server'

const serverStore = useServerStore()

class ShareService {
  pushMessage(message: string) {
    const data = {
      pushType: 'Text',
      payload: message
    }
    const baseUrl = serverStore.baseUrl
    return fetch(`${baseUrl}/push/message`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
}

export const shareService = new ShareService()
