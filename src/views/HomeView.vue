<script setup lang="ts">
import { computed } from 'vue'
import ProjectGrid from '@/components/sections/ProjectGrid.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import { getProjectsByCategory } from '@/content'
import { useLocale } from '@/composables/useLocale'

// The cover: the projects first, as tall images, then who made them.
const { lang } = useLocale()
const groups = computed(() => getProjectsByCategory(lang.value))
</script>

<template>
  <div class="grid gap-24 md:gap-32">
    <ProjectGrid v-for="g in groups" :key="g.id" :category="g.id" :projects="g.projects" />
    <AboutSection />
  </div>
</template>
