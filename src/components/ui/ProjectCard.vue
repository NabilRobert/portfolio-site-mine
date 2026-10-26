<script setup lang="ts">
import { computed } from 'vue'
import { shortTitle } from '@/content'
import type { Project } from '@/content'
import CoverImage from '@/components/ui/CoverImage.vue'
import { useLocale } from '@/composables/useLocale'

// A project in a grid: its tall cover, then a caption with its number, short
// name and summary. The whole card is one link; the cover is decorative
// because the caption already names the project.
const props = defineProps<{
  project: Project
  /** Position in the grid, from 1; shown as "01". */
  number: number
}>()
const { t, localePath } = useLocale()
const name = computed(() => shortTitle(props.project.title))
</script>

<template>
  <RouterLink :to="localePath(`/projects/${project.slug}`)" class="group block focus-visible:outline-offset-8">
    <CoverImage :src="project.cover" :glyph="name.charAt(0)">
      <span v-if="project.featured" class="eyebrow absolute right-4 bottom-4 bg-yellow px-2.5 py-1 text-ink">{{
        t.featured.label
      }}</span>
    </CoverImage>
    <div class="mt-5 grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-2">
      <span class="eyebrow pt-1 text-skin tabular-nums">{{ String(number).padStart(2, '0') }}</span>
      <h3
        class="text-lg leading-snug font-semibold text-cream decoration-yellow underline-offset-[0.25em] group-hover:underline"
      >
        {{ name }}
      </h3>
      <p class="col-start-2 mt-1.5 text-[0.9375rem] leading-relaxed text-skin">{{ project.summary }}</p>
    </div>
  </RouterLink>
</template>
