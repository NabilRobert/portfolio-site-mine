<script setup lang="ts">
import { computed } from 'vue'
import ProjectArticle from '@/components/sections/ProjectArticle.vue'
import NotFoundNotice from '@/components/sections/NotFoundNotice.vue'
import { getProject } from '@/content'
import { useLocale } from '@/composables/useLocale'

const props = defineProps<{ slug: string }>()
const { lang, t, localePath } = useLocale()
const project = computed(() => getProject(lang.value, props.slug))
</script>

<template>
  <ProjectArticle v-if="project" :project />
  <NotFoundNotice v-else :text="t.project.notFound" :back="localePath('/projects')" :back-label="t.project.back" />
</template>
