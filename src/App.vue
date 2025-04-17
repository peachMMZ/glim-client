<template>
  <NConfigProvider :locale="zhCN">
    <RouterView />
  </NConfigProvider>
</template>

<script setup lang="ts">
import {
  NConfigProvider,
  zhCN
} from 'naive-ui'
</script>

<style></style>
