<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { useDocumentMeta } from '@/composables/useDocumentMeta'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'

const { lang, t } = useLocale()
useDocumentMeta(computed(() => ({ lang: lang.value, ...t.value.meta })))
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
