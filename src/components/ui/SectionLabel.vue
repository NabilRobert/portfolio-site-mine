<script setup lang="ts">
// A section's heading as a small letter-spaced label over a thin rule.
withDefaults(defineProps<{ as?: 'h1' | 'h2' | 'h3' | 'p' }>(), { as: 'h2' })
</script>

<template>
  <component :is="as" class="eyebrow border-t border-rust pt-3 text-skin"><slot /></component>
</template>
