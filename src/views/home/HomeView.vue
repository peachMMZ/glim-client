<template>
  <div class="h-screen w-screen">
    <NLayout class="h-full">
      <NLayout ref="main" class="h-full">
        <NLayoutHeader ref="header" class="h-12" bordered>
          <div class="h-full flex justify-between items-center p-x-2"
            :style="{ backgroundColor: themeVars.primaryColor }">
            <div class="basis-1/3 flex items-center">
              <NIcon :component="Menu" :size="32" :color="themeVars.baseColor" />
            </div>
            <div class="basis-1/3 text-center">
              <NText class="text-lg" :style="{ color: themeVars.baseColor }">我的电脑</NText>
            </div>
            <div class="basis-1/3">
            </div>
          </div>
        </NLayoutHeader>
        <NLayoutContent
          class="h-[calc(100%-7.5rem)]"
          :native-scrollbar="false"
          content-style="overflow-y: hidden"
        >
          <div ref="scrollContent" class="flex flex-col p-x-4 p-y-2 gap-y-4">
            <ChatBubble
              v-for="(item, index) in shareStore.messageList"
              :key="index"
              :text="item.text"
              :time="item.timestamp"
              :reversed="item.bySelf"
            />
          </div>
        </NLayoutContent>
        <NLayoutFooter ref="footer" class="h-18" bordered>
          <div class="h-full flex justify-between items-center px-2 gap-x-2">
            <NInput v-model:value="message" class="h-10 w-4/5 items-center" placeholder="" round />
            <NButton class="h-10 rounded-lg" type="primary" @click="sendMessage">发送</NButton>
          </div>
        </NLayoutFooter>
      </NLayout>
    </NLayout>
  </div>
</template>

<script setup lang="ts">
import {
  NLayout,
  NLayoutHeader,
  NLayoutFooter,
  NLayoutContent,
  NIcon,
  NText,
  NInput,
  NButton,
  useThemeVars
} from 'naive-ui'
import { Menu } from 'lucide-vue-next'
import ChatBubble from '@/components/chat/ChatBubble.vue'
import { ref } from 'vue'
import { useShareStore } from '@/stores/share'

const themeVars = useThemeVars()
const shareStore = useShareStore()

const message = ref('')
async function sendMessage() {
  shareStore.send(message.value)
  message.value = ''
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  filter: blur(5px);
}
</style>
