<script setup>
// A desktop-icon style tile: a picture (or a lettered placeholder) and a
// label underneath, the whole tile linking to `to`.
defineProps({
  to: { type: [String, Object], required: true },
  label: { type: String, required: true },
  caption: { type: String, default: '' },
  image: { type: String, default: null },
  glyph: { type: String, default: '?' },
})
</script>

<template>
  <RouterLink
    :to
    class="group bevel-raised flex flex-col bg-skin p-2 text-ink no-underline hover:text-ink focus-visible:outline-offset-[-4px]"
  >
    <div class="bevel-sunken grid aspect-video place-items-center overflow-hidden bg-cream">
      <img v-if="image" :src="image" :alt="''" class="size-full object-cover" loading="lazy" />
      <span v-else aria-hidden="true" class="text-5xl font-bold text-red [text-shadow:3px_3px_0_var(--color-ink)]">{{
        glyph
      }}</span>
    </div>
    <div class="mt-2 px-1">
      <span
        class="inline-block px-1 text-[15px] font-bold group-hover:bg-blue-deep group-hover:text-desk group-focus-visible:bg-blue-deep group-focus-visible:text-desk"
        >{{ label }}</span
      >
      <p v-if="caption" class="mt-1 text-[13px] leading-snug">{{ caption }}</p>
    </div>
  </RouterLink>
</template>
