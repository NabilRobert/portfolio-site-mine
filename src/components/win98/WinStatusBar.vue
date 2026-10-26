<script setup>
// A status bar: sunken fields along the bottom of a window. The first one stretches.
defineProps({
  fields: { type: Array, required: true }, // strings
})
</script>

<template>
  <div class="mt-1.5 flex gap-1 text-[13px]">
    <span v-for="(f, i) in fields" :key="i" class="bevel-thin px-2 py-px" :class="{ 'flex-1': i === 0 }">{{ f }}</span>
  </div>
</template>
