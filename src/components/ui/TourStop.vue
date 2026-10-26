<script setup lang="ts">
import { computed } from 'vue'

// One stop on a project's guided tour: a numbered title, the screenshot, then
// a walk-through of what the reader is looking at. The image is framed by a
// thin rule so a light page still reads as a picture on the dark site; an
// animation's `still` replaces it for visitors who prefer reduced motion.
const props = withDefaults(
  defineProps<{
    number: number
    src: string
    alt: string
    still?: string
    caption?: string
    /** Paragraphs separated by a blank line. */
    description?: string
  }>(),
  { still: '', caption: '', description: '' },
)
const paragraphs = computed(() =>
  props.description
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean),
)
</script>

<template>
  <div>
    <h3 v-if="caption" class="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-2">
      <span class="eyebrow text-skin tabular-nums">{{ String(number).padStart(2, '0') }}</span>
      <span class="text-lg leading-snug font-semibold text-cream">{{ caption }}</span>
    </h3>
    <picture class="mt-4 block">
      <source v-if="still" media="(prefers-reduced-motion: reduce)" :srcset="still" />
      <img :src :alt loading="lazy" decoding="async" class="block h-auto w-full ring-1 ring-rust" />
    </picture>
    <div v-if="paragraphs.length" class="mt-5 grid max-w-[64ch] gap-3 text-[1.0625rem] leading-relaxed text-cream">
      <p v-for="(p, i) in paragraphs" :key="i">{{ p }}</p>
    </div>
  </div>
</template>
