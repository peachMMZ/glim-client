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
        <NLayoutContent class="h-[calc(100%-7.5rem)]" :native-scrollbar="false" content-style="overflow-y: hidden">
          <div ref="scrollContent" class="flex flex-col p-x-4 p-y-2 gap-y-4">
            <ChatBubble
              v-for="(item, index) in messageList"
              :key="index"
              :text="item.text"
              :time="item.time"
              :reversed="item.sendByMe"
            />
          </div>
        </NLayoutContent>
        <NLayoutFooter ref="footer" class="h-18" bordered>
          <div class="h-full flex justify-between items-center px-2 gap-x-2">
            <NInput v-model:value="message" class="h-10 w-4/5 items-center text-lg" placeholder="" round />
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
import { shareService } from '@/services/share'
import { ref } from 'vue'

const themeVars = useThemeVars()

const messageList = [
  {
    time: new Date(),
    text: 'Hello, world!'
  },
  {
    time: new Date(),
    text: '《且听风吟》是日本作家村上春树的第一本小说。它首次出现在 1979 年 6 月的《群像》（日本最有影响力的文学杂志之一），并于次月出版成书。这部小说被日本导演 Kazuki Ōmori 改编成电影，并于 1981 年由艺术剧院协会发行。1987 年被阿尔弗雷德伯恩鲍姆译成英文。'
  },
  {
    time: new Date(),
    text: 'Hello, world!',
    sendByMe: true
  },
]

const message = ref('')
async function sendMessage() {
  const res = await shareService.pushMessage(message.value)
  const json = await res.json()
  console.log(json)
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
