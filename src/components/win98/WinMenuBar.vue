<script setup>
// A window's menu bar. Items link out (`href`) or within the site (`to`).
// The first letter is underlined, as in 98's access keys.
defineProps({
  items: { type: Array, required: true }, // [{ label, href } | { label, to }]
  label: { type: String, required: true },
})
</script>

<template>
  <nav class="flex flex-wrap gap-0.5 px-0.5 py-[3px] text-sm" :aria-label="label">
    <component
      :is="item.to ? 'RouterLink' : 'a'"
      v-for="item in items"
      :key="item.to || item.href"
      v-bind="item.to ? { to: item.to } : { href: item.href }"
      class="px-2 py-px text-ink no-underline hover:bg-blue-deep hover:text-desk focus-visible:bg-blue-deep focus-visible:text-desk"
      ><span class="underline">{{ item.label.charAt(0) }}</span
      >{{ item.label.slice(1) }}</component
    >
  </nav>
</template>
