<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
// A Windows 98 push button, as a link: `to` for a page on this site, `href`
// for anywhere else. `primary` adds the default-button ring.
withDefaults(
  defineProps<{
    to?: RouteLocationRaw
    href?: string
    primary?: boolean
  }>(),
  { to: undefined, href: undefined, primary: false },
)
</script>

<template>
  <component
    :is="to ? 'RouterLink' : 'a'"
    v-bind="to ? { to } : { href }"
    class="bevel-raised inline-block min-w-24 bg-skin px-3.5 py-1 text-center text-sm text-ink no-underline hover:bg-cream hover:text-ink active:bevel-pressed"
    :class="{ 'outline-1 -outline-offset-[5px] outline-ink outline-solid': primary }"
    ><slot
  /></component>
</template>
