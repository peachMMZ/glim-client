<template>
  <NConfigProvider :locale="zhCN" :theme-overrides="themeOverride">
    <NMessageProvider>
      <RouterView />
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import {
  NConfigProvider,
  NMessageProvider,
  zhCN,
  type GlobalThemeOverrides
} from 'naive-ui'

const themeOverride: GlobalThemeOverrides = {
  common: {
    primaryColor: '#6366F1',
    primaryColorHover: '#4F46E5',
    primaryColorPressed: '#828AF5FF',
    primaryColorSuppl: '#4F46E5',
    fontSize: '14px',
    fontWeight: '400',
  }
}
</script>
<style></style>
