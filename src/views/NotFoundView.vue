<script setup lang="ts">
import NotFoundNotice from '@/components/sections/NotFoundNotice.vue'
import { useLocale } from '@/composables/useLocale'
import { usePageHead } from '@/composables/usePageHead'

const { t, localePath } = useLocale()

usePageHead(() => ({
  title: `${t.value.notFound.heading} | ${t.value.meta.title}`,
  description: t.value.notFound.text,
  indexable: false,
}))
</script>

<template>
  <NotFoundNotice :text="t.notFound.text" :back="localePath('/')" :back-label="t.notFound.home" />
</template>
