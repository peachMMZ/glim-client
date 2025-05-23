<template>
  <div :class="classes.wrapper">
    <div :class="classes.bubble">
      <div class="flex flex-col justify-start">
        <div class="h-4 text-xs text-slate-400">
        </div>
        <NAvatar src="/avatar.png" round></NAvatar>
      </div>
      <div class="flex flex-col justify-start">
        <div :class="classes.time">
          <NTime :time="time" :format="timeFormat"></NTime>
        </div>
        <div :class="classes.text" :style="{ backgroundColor: themeVars.primaryColor }"
          @contextmenu="handleContextMenu">
          <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
          <NText v-html="text" class="text-slate-100"></NText>
        </div>
      </div>
      <NDropdown placement="bottom-start" trigger="manual" size="small" :x="contextMenuPosition.x"
        :y="contextMenuPosition.y" :options="dropdownOptions" :show="showDropdown"
        :on-clickoutside="() => { showDropdown = false }" @select="(key) => handleDropdownSelect(key, props)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import {
  NAvatar,
  NText,
  NTime,
  NDropdown,
  type DropdownOption,
  useThemeVars,
  useMessage
} from 'naive-ui'
import { Copy, Star } from 'lucide-vue-next'
import { renderIcon } from '@/util/render'

const themeVars = useThemeVars()
const message = useMessage()

type BubbleOptions = {
  text: string
  time?: number | Date
  reversed?: boolean
}

const props = defineProps<BubbleOptions>()

const classes = computed(() => ({
  wrapper: `w-full flex ${props.reversed ? 'justify-end' : 'justify-start'}`,
  bubble: `max-w-2/3 flex ${props.reversed ? 'flex-row-reverse' : undefined} justify-start items-start gap-2`,
  text: `p-2 rounded ${props.reversed ? 'self-end' : 'self-start'}`,
  time: `h-4 flex ${props.reversed ? 'justify-end' : 'justify-start'} text-xs text-slate-400`
}))

const contextMenuPosition = ref({ x: 0, y: 0 })
const showDropdown = ref(false)
const dropdownOptions: DropdownOption[] = [
  {
    key: 'copy',
    label: '复制',
    icon: renderIcon(Copy)
  },
  {
    key: 'collect',
    label: '收藏',
    icon: renderIcon(Star)
  }
]
function handleContextMenu(e: MouseEvent) {
  e.preventDefault()
  showDropdown.value = false
  nextTick(() => {
    showDropdown.value = true
    contextMenuPosition.value = {
      x: e.clientX,
      y: e.clientY
    }
  })
}
function handleDropdownSelect(key: string, data: BubbleOptions) {
  switch (key) {
    case 'copy':
      navigator.clipboard.writeText(data.text).then(() => {
        message.success('已复制到剪贴板')
      })
      break
  }
  showDropdown.value = false
}
const timeFormat = computed(() => isSameDay(props.time) ? 'HH:mm' : 'yyyy-MM-dd HH:mm')
function isSameDay(time: BubbleOptions['time']) {
  if (time) {
    return new Date(time).toDateString() === new Date().toDateString()
  } else {
    return false
  }
}
</script>
<style>
p {
  margin: 0;
}

img {
  max-width: 100%;
}
</style>
