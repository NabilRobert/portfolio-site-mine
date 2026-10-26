<script setup>
// A window's title bar: icon, title and the caption buttons (decorative).
defineProps({
  title: { type: String, required: true },
  icon: { type: String, default: '' },
  inactive: { type: Boolean, default: false },
  closeOnly: { type: Boolean, default: false },
  headingTag: { type: String, default: 'h2' },
})
</script>

<template>
  <div
    class="flex items-center justify-between gap-2 py-[3px] pr-[3px] pl-1.5 text-sm font-bold text-desk"
    :class="inactive ? 'bg-linear-to-r from-red-deep to-red' : 'bg-linear-to-r from-blue-deep to-blue'"
  >
    <div class="flex min-w-0 items-center gap-1.5">
      <span
        v-if="icon"
        aria-hidden="true"
        class="grid size-4 flex-none place-items-center border border-ink bg-desk text-[10px] text-ink"
        >{{ icon }}</span
      >
      <component :is="headingTag" class="truncate text-sm font-bold">{{ title }}</component>
    </div>
    <div class="flex flex-none gap-0.5" aria-hidden="true">
      <template v-if="!closeOnly">
        <span class="bevel-caption grid h-4 w-[18px] place-items-center bg-skin text-[11px] leading-none text-ink"
          >_</span
        >
        <span class="bevel-caption grid h-4 w-[18px] place-items-center bg-skin text-[11px] leading-none text-ink"
          >□</span
        >
      </template>
      <span class="bevel-caption ml-0.5 grid h-4 w-[18px] place-items-center bg-skin text-[11px] leading-none text-ink"
        >×</span
      >
    </div>
  </div>
</template>
