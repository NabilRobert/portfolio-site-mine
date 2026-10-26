<script setup>
import { computed } from 'vue'
import WinWindow from '@/components/win98/WinWindow.vue'
import WinButton from '@/components/win98/WinButton.vue'
import { useLocale } from '@/composables/useLocale'

// A project's own page: its links as a menu bar, the Markdown write-up, and
// a status bar with the stack and status.
const props = defineProps({
  project: { type: Object, required: true },
})
const { t, localePath } = useLocale()
const status = computed(() => [props.project.stack, t.value.status[props.project.status] ?? ''].filter(Boolean))
</script>

<template>
  <WinWindow as="article" :title="project.title" icon="▶" :menu="project.links" :status heading-tag="h1">
    <!-- Trusted content: Markdown written in this repo, rendered at build time. -->
    <div class="win-prose" v-html="project.html"></div>
    <template #buttons>
      <WinButton :to="localePath('/projects')">← {{ t.project.back }}</WinButton>
      <WinButton v-for="l in project.links" :key="l.href" :href="l.href" :primary="l.primary">{{ l.label }}</WinButton>
    </template>
  </WinWindow>
</template>
