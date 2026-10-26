<script setup lang="ts">
import { computed } from 'vue'
import WinWindow from '@/components/win98/WinWindow.vue'
import CategoryWindow from '@/components/sections/CategoryWindow.vue'
import { getProjectsByCategory } from '@/content'
import { useLocale } from '@/composables/useLocale'

const { lang, t } = useLocale()
const groups = computed(() => getProjectsByCategory(lang.value))
</script>

<template>
  <WinWindow :title="t.projectsPage.window" icon="▤" heading-tag="h1">
    <p>{{ t.projectsPage.lead }}</p>
  </WinWindow>
  <CategoryWindow v-for="g in groups" :key="g.id" :category="g.id" :projects="g.projects" />
</template>
