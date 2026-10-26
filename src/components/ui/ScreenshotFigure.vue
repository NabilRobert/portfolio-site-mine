<script setup lang="ts">
// A screenshot or animation with an optional caption underneath, framed by a
// thin rule so a light page still reads as a picture on the dark site. An
// animation's `still` replaces it for visitors who prefer reduced motion.
withDefaults(
  defineProps<{
    src: string
    alt: string
    still?: string
    caption?: string
  }>(),
  { still: '', caption: '' },
)
</script>

<template>
  <figure>
    <picture>
      <source v-if="still" media="(prefers-reduced-motion: reduce)" :srcset="still" />
      <img :src :alt loading="lazy" decoding="async" class="block h-auto w-full ring-1 ring-rust" />
    </picture>
    <figcaption v-if="caption" class="mt-3 text-sm leading-relaxed text-skin">{{ caption }}</figcaption>
  </figure>
</template>
