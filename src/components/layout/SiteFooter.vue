<script setup lang="ts">
import { computed } from 'vue'
import { profile } from '@/content'
import type { LocaleStrings } from '@/content'
import { useLocale } from '@/composables/useLocale'

// One small centred contact line, as on the reference. Links come from
// content/profile.ts; empty ones are left out.
const { t } = useLocale()
type ContactKey = keyof LocaleStrings['contact']['links']

const links = computed(() => {
  const entries: [ContactKey, string][] = [
    ['github', profile.github],
    ['email', profile.email && `mailto:${profile.email}`],
    ['linkedin', profile.linkedin],
    ['cv', profile.cv],
  ]
  return entries.filter(([, href]) => href).map(([key, href]) => ({ key, href, label: t.value.contact.links[key] }))
})
</script>

<template>
  <footer id="contact" class="frame pt-28 pb-10 text-center text-[0.8125rem] leading-relaxed text-skin md:pt-36">
    <h2 class="sr-only">{{ t.contact.heading }}</h2>
    <p class="mx-auto max-w-[62ch]">{{ t.contact.text }}</p>
    <ul class="mt-2 flex flex-wrap justify-center gap-x-3">
      <li v-for="(l, i) in links" :key="l.key" class="flex gap-x-3">
        <span v-if="i > 0" aria-hidden="true" class="text-rust">—</span>
        <a :href="l.href" class="text-cream underline decoration-rust underline-offset-[0.3em] hover:text-yellow">{{
          l.label
        }}</a>
      </li>
    </ul>
  </footer>
</template>
