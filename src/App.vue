<template>
  <NConfigProvider :locale="zhCN">
    <NMessageProvider>
      <RouterView />
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import {
  NConfigProvider,
  NMessageProvider,
  zhCN
} from 'naive-ui'
import { useServerStore } from '@/stores/server'

const serverStore = useServerStore()

onMounted(() => {
  serverStore.init()
})
</script>

<style></style>
