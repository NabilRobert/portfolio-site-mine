<script setup>
import { computed } from 'vue'
import ProjectDetailWindow from '@/components/sections/ProjectDetailWindow.vue'
import WinWindow from '@/components/win98/WinWindow.vue'
import WinButton from '@/components/win98/WinButton.vue'
import { getProject } from '@/content'
import { useLocale } from '@/composables/useLocale'

const props = defineProps({ slug: { type: String, required: true } })
const { lang, t, localePath } = useLocale()
const project = computed(() => getProject(lang.value, props.slug))
</script>

<template>
  <ProjectDetailWindow v-if="project" :project />
  <WinWindow v-else :title="t.notFound.window" icon="!" inactive close-only heading-tag="h1">
    <p>{{ t.project.notFound }}</p>
    <template #buttons>
      <WinButton :to="localePath('/projects')" primary>{{ t.project.back }}</WinButton>
    </template>
  </WinWindow>
</template>
