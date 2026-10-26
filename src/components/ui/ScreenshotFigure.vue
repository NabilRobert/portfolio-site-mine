<script setup lang="ts">
// A screenshot with an optional caption underneath, framed by a thin rule so
// a light page still reads as a picture on the dark site.
withDefaults(
  defineProps<{
    src: string
    alt: string
    caption?: string
  }>(),
  { caption: '' },
)
</script>

<template>
  <figure>
    <img :src :alt loading="lazy" decoding="async" class="block h-auto w-full ring-1 ring-rust" />
    <figcaption v-if="caption" class="mt-3 text-sm leading-relaxed text-skin">{{ caption }}</figcaption>
  </figure>
</template>
