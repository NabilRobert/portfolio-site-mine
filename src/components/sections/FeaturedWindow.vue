<script setup>
import { computed } from 'vue'
import WinWindow from '@/components/win98/WinWindow.vue'
import WinButton from '@/components/win98/WinButton.vue'
import { getFeatured } from '@/content'
import { useLocale } from '@/composables/useLocale'

// The project marked `featured: true` in its front matter.
const { lang, t, localePath } = useLocale()
const project = computed(() => getFeatured(lang.value))
</script>

<template>
  <WinWindow v-if="project" :title="t.featured.window" icon="★">
    <h2 class="text-xl font-bold">{{ project.title }}</h2>
    <p class="mt-1.5">{{ project.summary }}</p>
    <template #buttons>
      <WinButton :to="localePath(`/projects/${project.slug}`)" primary>{{ t.featured.open }}</WinButton>
      <WinButton v-for="l in project.links.slice(0, 2)" :key="l.href" :href="l.href">{{ l.label }}</WinButton>
    </template>
  </WinWindow>
</template>
