<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
// An underlined text link: `to` for a page on this site, `href` for anywhere
// else. Links out carry a small arrow, so the reader knows they leave the site.
withDefaults(
  defineProps<{
    to?: RouteLocationRaw
    href?: string
    /** Yellow instead of cream, for the one link that matters most. */
    accent?: boolean
  }>(),
  { to: undefined, href: undefined, accent: false },
)
</script>

<template>
  <component
    :is="to ? 'RouterLink' : 'a'"
    v-bind="to ? { to } : { href }"
    class="underline decoration-1 underline-offset-[0.3em] transition-colors hover:text-yellow"
    :class="accent ? 'text-yellow decoration-2' : 'text-cream decoration-rust hover:decoration-yellow'"
    ><slot /><span v-if="href" aria-hidden="true" class="ml-1 inline-block no-underline">↗</span></component
  >
</template>
