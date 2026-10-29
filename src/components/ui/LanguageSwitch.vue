<script setup lang="ts">
import { locales } from '@/content'
import { useLocale } from '@/composables/useLocale'

// EN / 日本語 / ID: the same page in another language. Each label is in its own
// language, so it is marked with `lang` for screen readers.
const { lang, t, switchPath } = useLocale()
</script>

<template>
  <nav :aria-label="t.nav.language">
    <ul class="flex items-center whitespace-nowrap">
      <li v-for="(l, code, i) in locales" :key="code" class="flex items-center">
        <span v-if="i > 0" aria-hidden="true" class="px-2 text-rust">/</span>
        <RouterLink
          :to="switchPath(code)"
          :hreflang="code"
          :lang="code"
          :aria-current="code === lang ? 'true' : undefined"
          class="underline-offset-[0.4em] transition-colors hover:text-cream"
          :class="code === lang ? 'text-yellow underline decoration-1' : 'text-skin'"
          >{{ l.label }}</RouterLink
        >
      </li>
    </ul>
  </nav>
</template>
