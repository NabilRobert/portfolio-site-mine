<script setup>
import { computed } from 'vue'
import AboutWindow from '@/components/sections/AboutWindow.vue'
import FeaturedWindow from '@/components/sections/FeaturedWindow.vue'
import FlowWindow from '@/components/sections/FlowWindow.vue'
import CategoryWindow from '@/components/sections/CategoryWindow.vue'
import ContactWindow from '@/components/sections/ContactWindow.vue'
import { getProjectsByCategory } from '@/content'
import { useLocale } from '@/composables/useLocale'

const { lang } = useLocale()
const groups = computed(() => getProjectsByCategory(lang.value))
</script>

<template>
  <AboutWindow />
  <FeaturedWindow />
  <FlowWindow />
  <CategoryWindow v-for="g in groups" :key="g.id" :category="g.id" :projects="g.projects" />
  <ContactWindow />
</template>
