<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ProjectArticle from '@/components/sections/ProjectArticle.vue'
import NotFoundNotice from '@/components/sections/NotFoundNotice.vue'
import { useHead } from '@unhead/vue'
import { getProject, loadProjectDetails, shortTitle } from '@/content'
import type { ProjectDetails } from '@/content'
import { useLocale } from '@/composables/useLocale'

const props = defineProps<{ slug: string }>()
const { lang, t, localePath } = useLocale()
const project = computed(() => getProject(lang.value, props.slug))

// The write-up and tour are fetched separately (see src/content/index.ts). A
// reply that arrives after the reader has moved to another project or
// language is dropped.
const EMPTY: ProjectDetails = { html: '', screenshots: [] }
const details = ref<ProjectDetails>(EMPTY)
watch(
  [lang, () => props.slug],
  async ([currentLang, slug]) => {
    details.value = EMPTY
    const loaded = await loadProjectDetails(currentLang, slug)
    if (currentLang === lang.value && slug === props.slug) details.value = loaded
  },
  { immediate: true },
)

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
  <ProjectArticle v-if="project" :project :details />
  <NotFoundNotice v-else :text="t.project.notFound" :back="localePath('/projects')" :back-label="t.project.back" />
</template>
