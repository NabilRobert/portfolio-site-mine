<script setup lang="ts">
import type { Category, Project } from '@/content'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import { useLocale } from '@/composables/useLocale'

// One category of projects: a label, then a row of tall covers with generous
// gutters, three across on a wide screen.
defineProps<{
  category: Category
  projects: Project[]
}>()
const { t } = useLocale()
</script>

<template>
  <section :aria-labelledby="`category-${category}`">
    <SectionLabel :id="`category-${category}`">{{ t.categories[category] }}</SectionLabel>
    <ul class="mt-8 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16">
      <li v-for="(p, i) in projects" :key="p.slug">
        <ProjectCard :project="p" :number="i + 1" />
      </li>
    </ul>
  </section>
</template>
