<script setup lang="ts">
import { computed } from 'vue'
import { splitTitle } from '@/content'
import type { Project, ProjectDetails } from '@/content'
import CoverImage from '@/components/ui/CoverImage.vue'
import TextLink from '@/components/ui/TextLink.vue'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import TourStop from '@/components/ui/TourStop.vue'
import { useLocale } from '@/composables/useLocale'

// A project's own page, laid out like a magazine feature: the name as the
// headline and the rest of the title as its subtitle, then the cover with the
// facts and links beside the Markdown write-up, then a guided tour of any
// screenshots across the full width, each with its key.
const props = defineProps<{
  project: Project
  /** The write-up and tour; empty while they are still loading. */
  details: ProjectDetails
}>()
const { t, localePath } = useLocale()
const title = computed(() => splitTitle(props.project.title))
const statusLabel = computed(() => (props.project.status ? t.value.status[props.project.status] : ''))
const links = computed(() => [...props.project.links].sort((a, b) => Number(!!b.primary) - Number(!!a.primary)))
</script>

<template>
  <article>
    <RouterLink :to="localePath('/projects')" class="eyebrow inline-block text-skin transition-colors hover:text-yellow"
      >← {{ t.project.back }}</RouterLink
    >

    <header class="mt-10 md:mt-14">
      <p class="eyebrow text-skin">{{ t.categories[project.category] }}</p>
      <h1 class="mt-4">
        <span
          class="block text-[2.5rem] leading-[1.02] font-semibold tracking-[-0.01em] text-cream [font-stretch:112%] sm:text-6xl lg:text-7xl"
          >{{ title.name }}</span
        >
        <span
          v-if="title.rest"
          class="mt-4 block max-w-[32ch] text-xl leading-snug font-normal text-skin first-letter:uppercase sm:text-2xl lg:text-[2rem]"
          >{{ title.rest }}</span
        >
      </h1>
    </header>

    <div class="mt-12 grid gap-x-12 gap-y-12 md:mt-16 md:grid-cols-12 xl:gap-x-20">
      <div class="md:col-span-5 lg:col-span-4">
        <CoverImage :src="project.cover" :alt="project.coverAlt" :glyph="title.name.charAt(0)" eager />
        <dl
          class="mt-8 grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] gap-x-4 gap-y-3 border-t border-rust pt-4 text-sm"
        >
          <template v-if="project.stack">
            <dt class="eyebrow pt-0.5 text-skin">{{ t.project.stack }}</dt>
            <dd class="text-cream">{{ project.stack }}</dd>
          </template>
          <template v-if="statusLabel">
            <dt class="eyebrow pt-0.5 text-skin">{{ t.project.status }}</dt>
            <dd class="text-cream">{{ statusLabel }}</dd>
          </template>
        </dl>
        <h2 class="eyebrow mt-8 border-t border-rust pt-4 text-skin">{{ t.project.links }}</h2>
        <ul class="mt-3 grid gap-2.5">
          <li v-for="l in links" :key="l.href">
            <TextLink :href="l.href" :accent="l.primary">{{ l.label }}</TextLink>
          </li>
        </ul>
      </div>

      <div class="md:col-span-7 lg:col-start-6">
        <!-- Trusted content: Markdown written in this repo, rendered at build time. -->
        <div class="prose-editorial" v-html="details.html"></div>
      </div>
    </div>

    <section v-if="details.screenshots.length" aria-labelledby="screenshots-heading" class="mt-20 md:mt-28">
      <SectionLabel id="screenshots-heading">{{ t.project.screenshots }}</SectionLabel>
      <ol class="mt-10 grid gap-20">
        <li v-for="(s, i) in details.screenshots" :key="s.src">
          <TourStop :number="i + 1" v-bind="s" />
        </li>
      </ol>
    </section>
  </article>
</template>
