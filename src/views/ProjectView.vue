<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ProjectArticle from '@/components/sections/ProjectArticle.vue'
import NotFoundNotice from '@/components/sections/NotFoundNotice.vue'
import { getProject, loadProjectDetails, notFoundHead, projectHead } from '@/content'
import type { ProjectDetails } from '@/content'
import { useLocale } from '@/composables/useLocale'
import { usePageHead } from '@/composables/usePageHead'

const props = defineProps<{ slug: string }>()
const { lang, t, localePath } = useLocale()
const project = computed(() => getProject(lang.value, props.slug))

// The write-up and tour are fetched separately (see src/content/index.ts). A
// reply that arrives after the reader has moved to another project or
// language is dropped. The fetch can fail, typically in a tab left open
// across a deploy, once the file it asks for has been replaced; the page
// then says so and offers a reload, instead of staying silently blank.
const EMPTY: ProjectDetails = { html: '', screenshots: [] }
const details = ref<ProjectDetails>(EMPTY)
const detailsFailed = ref(false)
watch(
  [lang, () => props.slug],
  async ([currentLang, slug]) => {
    details.value = EMPTY
    detailsFailed.value = false
    const isCurrent = () => currentLang === lang.value && slug === props.slug
    try {
      const loaded = await loadProjectDetails(currentLang, slug)
      if (isCurrent()) details.value = loaded
    } catch {
      if (isCurrent()) detailsFailed.value = true
    }
  },
  { immediate: true },
)

usePageHead(() =>
  project.value ? projectHead(t.value, project.value) : notFoundHead(t.value, t.value.project.notFound),
)
</script>

<template>
  <ProjectArticle v-if="project" :project :details :details-failed="detailsFailed" />
  <NotFoundNotice v-else :text="t.project.notFound" :back="localePath('/projects')" :back-label="t.project.back" />
</template>
