<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
import { useHead } from '@unhead/vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'

const { lang, t } = useLocale()
// The site-wide language, title and description; pages override the title
// and description with their own (see the views).
useHead(() => ({
  htmlAttrs: { lang: lang.value },
  title: t.value.meta.title,
  meta: [{ name: 'description', content: t.value.meta.description }],
}))
</script>

<template>
  <a
    href="#main"
    class="eyebrow sr-only bg-yellow px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-10"
    >{{ t.nav.skip }}</a
  >
  <SiteHeader />
  <main id="main" tabindex="-1" class="frame focus:outline-none">
    <RouterView />
  </main>
  <SiteFooter />
</template>
