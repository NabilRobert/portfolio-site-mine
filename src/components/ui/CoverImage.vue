<script setup lang="ts">
// A tall 5:7 cover. Without an image it falls back to a coloured block with a
// large initial, so a new project still looks finished before it has a cover.
withDefaults(
  defineProps<{
    src: string | null
    /** '' marks the image as decorative, e.g. when the link around it already names the project. */
    alt?: string
    glyph?: string
    eager?: boolean
  }>(),
  { alt: '', glyph: '', eager: false },
)
</script>

<template>
  <div class="aspect-[5/7] overflow-hidden bg-blue-deep">
    <img
      v-if="src"
      :src
      :alt
      width="500"
      height="700"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      class="size-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
    />
    <span v-else aria-hidden="true" class="display grid size-full place-items-center text-[9rem] text-yellow">{{
      glyph
    }}</span>
  </div>
</template>
