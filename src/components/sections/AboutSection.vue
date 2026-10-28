<script setup lang="ts">
import { computed } from 'vue'
import { getProject, shortTitle } from '@/content'
import type { Project } from '@/content'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import { useLocale } from '@/composables/useLocale'

// Who the author is, in one large paragraph, then how the published projects connect.
// The steps are keyed by project slug in the locale strings; a step whose
// project is missing is skipped.
const { lang, t, localePath } = useLocale()
const steps = computed(() =>
  Object.entries(t.value.flow.steps)
    .map(([slug, line]) => ({ slug, line, project: getProject(lang.value, slug) }))
    .filter((s): s is { slug: string; line: string; project: Project } => s.project !== null),
)
</script>

<template>
  <section id="about" aria-labelledby="about-heading" class="grid gap-x-12 gap-y-6 scroll-mt-8 md:grid-cols-12">
    <SectionLabel id="about-heading" class="md:col-span-3">{{ t.about.heading }}</SectionLabel>
    <div class="md:col-span-9 md:border-t md:border-rust md:pt-3">
      <p class="max-w-[40ch] text-xl leading-snug text-cream sm:text-2xl lg:text-[1.75rem] lg:leading-[1.4]">
        {{ t.about.lead }}
      </p>
      <p v-if="t.about.seeking" class="mt-6 text-lg text-yellow">{{ t.about.seeking }}</p>

      <h3 class="eyebrow mt-14 text-skin">{{ t.flow.heading }}</h3>
      <ol class="mt-5 grid gap-6 sm:grid-cols-3">
        <li v-for="(s, i) in steps" :key="s.slug">
          <RouterLink :to="localePath(`/projects/${s.slug}`)" class="group block border-l-2 border-red pl-4">
            <span class="eyebrow block text-skin tabular-nums">{{ String(i + 1).padStart(2, '0') }}</span>
            <span
              class="mt-1 block font-semibold text-cream decoration-yellow underline-offset-[0.25em] group-hover:underline"
              >{{ shortTitle(s.project.title) }}</span
            >
            <span class="mt-1 block text-[0.9375rem] leading-relaxed text-skin">{{ s.line }}</span>
          </RouterLink>
        </li>
      </ol>
    </div>
  </section>
</template>
