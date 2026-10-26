<script setup lang="ts">
import WinWindow from '@/components/win98/WinWindow.vue'
import WinButton from '@/components/win98/WinButton.vue'
import { useLocale } from '@/composables/useLocale'

const { t, localePath } = useLocale()
</script>

<template>
  <WinWindow id="about" :title="t.about.window" icon="N" heading-tag="p">
    <h1 class="text-3xl leading-tight font-bold sm:text-5xl">
      {{ t.about.name }}<br /><span class="text-red-deep">{{ t.about.role }}</span>
    </h1>
    <p class="mt-3.5">{{ t.about.lead }}</p>
    <p v-if="t.about.seeking" class="mt-2 font-bold text-red-deep">{{ t.about.seeking }}</p>
    <template #buttons>
      <WinButton :to="localePath('/projects')" primary>{{ t.nav.projects }}</WinButton>
      <WinButton :to="{ path: localePath('/'), hash: '#contact' }">{{ t.nav.contact }}</WinButton>
    </template>
  </WinWindow>
</template>
