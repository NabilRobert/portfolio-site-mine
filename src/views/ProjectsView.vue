<script setup lang="ts">
import { computed } from 'vue'
import ProjectGrid from '@/components/sections/ProjectGrid.vue'
import { useHead } from '@unhead/vue'
import { getProjectsByCategory } from '@/content'
import { useLocale } from '@/composables/useLocale'

const { lang, t } = useLocale()
const groups = computed(() => getProjectsByCategory(lang.value))

useHead(() => ({
  title: `${t.value.projectsPage.heading} | ${t.value.meta.title}`,
  meta: [{ name: 'description', content: t.value.projectsPage.lead }],
}))
</script>

<template>
  <header class="max-w-3xl">
    <h1 class="text-4xl leading-tight font-semibold text-cream [font-stretch:112%] sm:text-5xl lg:text-6xl">
      {{ t.projectsPage.heading }}
    </h1>
    <p class="mt-5 text-lg leading-relaxed text-skin sm:text-xl">{{ t.projectsPage.lead }}</p>
  </header>
  <div class="mt-16 grid gap-24 md:mt-20 md:gap-32">
    <ProjectGrid v-for="g in groups" :key="g.id" :category="g.id" :projects="g.projects" />
  </div>
</template>
