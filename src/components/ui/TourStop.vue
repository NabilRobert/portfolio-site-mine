<script setup lang="ts">
import { computed } from 'vue'
import type { KeyEntry } from '@/content'
import { useLocale } from '@/composables/useLocale'

// One stop on a project's guided tour: a numbered title, the screenshot or
// chart, a walk-through of what the reader is looking at, and beside it a key
// that says what each term, number and colour means, for a reader new to the
// project. The image is framed by a thin rule so a light page still reads as a
// picture on the dark site; an animation's `still` replaces it for visitors
// who prefer reduced motion, and a chart's `narrow` version replaces it on
// phones, where the wide one would shrink its text out of reading size.
const props = withDefaults(
  defineProps<{
    number: number
    src: string
    alt: string
    still?: string
    narrow?: string
    caption?: string
    /** Paragraphs separated by a blank line. */
    description?: string
    terms?: KeyEntry[]
  }>(),
  { still: '', narrow: '', caption: '', description: '', terms: () => [] },
)
const { t } = useLocale()
const paragraphs = computed(() =>
  props.description
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean),
)
</script>

<template>
  <div class="grid gap-x-12 gap-y-8 lg:grid-cols-12">
    <div class="lg:col-span-8">
      <h3 v-if="caption" class="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-2">
        <span class="eyebrow text-skin tabular-nums">{{ String(number).padStart(2, '0') }}</span>
        <span class="text-lg leading-snug font-semibold text-cream">{{ caption }}</span>
      </h3>
      <picture class="mt-4 block">
        <source v-if="still" media="(prefers-reduced-motion: reduce)" :srcset="still" />
        <source v-if="narrow" media="(width < 40rem)" :srcset="narrow" />
        <img :src :alt loading="lazy" decoding="async" class="block h-auto w-full ring-1 ring-rust" />
      </picture>
      <div v-if="paragraphs.length" class="mt-5 grid max-w-[68ch] gap-3 text-[1.0625rem] leading-relaxed text-cream">
        <p v-for="(p, i) in paragraphs" :key="i">{{ p }}</p>
      </div>
    </div>
    <div v-if="terms.length" class="lg:col-span-4 lg:pt-11">
      <h4 class="eyebrow border-t border-rust pt-3 text-skin">{{ t.project.key }}</h4>
      <dl class="mt-4 grid gap-4 text-[0.9375rem] leading-relaxed">
        <div v-for="k in terms" :key="k.term">
          <dt class="font-semibold text-cream">{{ k.term }}</dt>
          <dd class="mt-0.5 text-skin">{{ k.meaning }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>
