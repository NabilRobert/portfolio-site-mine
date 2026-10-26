<script setup lang="ts">
import { computed } from 'vue'
import WinWindow from '@/components/win98/WinWindow.vue'
import WinButton from '@/components/win98/WinButton.vue'
import { profile } from '@/content'
import type { LocaleStrings } from '@/content'
import { useLocale } from '@/composables/useLocale'

// Contact links from content/profile.js; empty ones are left out.
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
  <WinWindow id="contact" :title="t.contact.window" icon="@" close-only>
    <p>{{ t.contact.text }}</p>
    <template #buttons>
      <WinButton v-for="(l, i) in links" :key="l.key" :href="l.href" :primary="i === 0">{{ l.label }}</WinButton>
    </template>
  </WinWindow>
</template>
