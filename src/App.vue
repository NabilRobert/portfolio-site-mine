<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { useDocumentMeta } from '@/composables/useDocumentMeta'
import WinTaskbar from '@/components/win98/WinTaskbar.vue'

const { lang, t } = useLocale()
useDocumentMeta(computed(() => ({ lang: lang.value, ...t.value.meta })))
</script>

<template>
  <main class="mx-auto grid max-w-240 grid-cols-[minmax(0,1fr)] gap-6 px-4 pt-7 pb-20">
    <RouterView />
  </main>
  <WinTaskbar />
</template>
