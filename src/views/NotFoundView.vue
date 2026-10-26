<script setup lang="ts">
import WinWindow from '@/components/win98/WinWindow.vue'
import WinButton from '@/components/win98/WinButton.vue'
import { useLocale } from '@/composables/useLocale'

const { t, localePath } = useLocale()
</script>

<template>
  <WinWindow :title="t.notFound.window" icon="!" inactive close-only heading-tag="h1">
    <p>{{ t.notFound.text }}</p>
    <template #buttons>
      <WinButton :to="localePath('/')" primary>{{ t.notFound.home }}</WinButton>
    </template>
  </WinWindow>
</template>
