<script setup lang="ts">
import { computed } from 'vue'
import WinWindow from '@/components/win98/WinWindow.vue'
import { getProject, shortTitle } from '@/content'
import type { Project } from '@/content'
import { useLocale } from '@/composables/useLocale'

// How the core projects connect, as boxes with arrows. Steps are keyed by
// project slug in the locale strings; a step whose project is missing is skipped.
const { lang, t, localePath } = useLocale()
const steps = computed(() =>
  Object.entries(t.value.flow.steps)
    .map(([slug, line]) => ({ slug, line, project: getProject(lang.value, slug) }))
    .filter((s): s is { slug: string; line: string; project: Project } => s.project !== null),
)
</script>

<template>
  <WinWindow :title="t.flow.window" icon="?" inactive close-only>
    <ol class="grid items-center gap-2 md:grid-flow-col md:auto-cols-fr">
      <li v-for="(s, i) in steps" :key="s.slug" class="flex items-center gap-2 max-md:flex-col">
        <RouterLink
          :to="localePath(`/projects/${s.slug}`)"
          class="bevel-raised block w-full bg-skin p-2.5 text-center text-sm text-ink no-underline hover:bg-cream hover:text-ink"
        >
          <b class="block text-[15px]">{{ i + 1 }}. {{ shortTitle(s.project.title) }}</b
          >{{ s.line }}
        </RouterLink>
        <span v-if="i < steps.length - 1" aria-hidden="true" class="text-xl font-bold text-red-deep max-md:rotate-90"
          >→</span
        >
      </li>
    </ol>
  </WinWindow>
</template>
