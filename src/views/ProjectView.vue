<script setup lang="ts">
import { computed } from 'vue'
import ProjectArticle from '@/components/sections/ProjectArticle.vue'
import NotFoundNotice from '@/components/sections/NotFoundNotice.vue'
import { useHead } from '@unhead/vue'
import { getProject, shortTitle } from '@/content'
import { useLocale } from '@/composables/useLocale'

const props = defineProps<{ slug: string }>()
const { lang, t, localePath } = useLocale()
const project = computed(() => getProject(lang.value, props.slug))

useHead(() => {
  const p = project.value
  if (!p) return { title: `${t.value.notFound.heading} | ${t.value.meta.title}` }
  return {
    title: `${shortTitle(p.title)} | ${t.value.meta.title}`,
    meta: [{ name: 'description', content: p.summary }],
  }
})
</script>

<template>
  <ProjectArticle v-if="project" :project />
  <NotFoundNotice v-else :text="t.project.notFound" :back="localePath('/projects')" :back-label="t.project.back" />
</template>
