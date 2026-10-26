<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import TextLink from '@/components/ui/TextLink.vue'
import { useLocale } from '@/composables/useLocale'

// "Not found", centred, with one way back.
defineProps<{
  text: string
  back: RouteLocationRaw
  backLabel: string
}>()
const { t } = useLocale()
</script>

<template>
  <section class="mx-auto max-w-xl py-16 text-center md:py-24">
    <p class="eyebrow text-skin">404</p>
    <h1 class="mt-4 text-4xl font-semibold text-cream [font-stretch:112%] sm:text-5xl">{{ t.notFound.heading }}</h1>
    <p class="mt-5 text-lg text-skin">{{ text }}</p>
    <p class="mt-8">
      <TextLink :to="back" accent>{{ backLabel }}</TextLink>
    </p>
  </section>
</template>
