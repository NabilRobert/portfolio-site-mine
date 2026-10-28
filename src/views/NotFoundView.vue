<script setup lang="ts">
import NotFoundNotice from '@/components/sections/NotFoundNotice.vue'
import { useHead } from '@unhead/vue'
import { useLocale } from '@/composables/useLocale'

const { t, localePath } = useLocale()

useHead(() => ({ title: `${t.value.notFound.heading} | ${t.value.meta.title}` }))
</script>

<template>
  <NotFoundNotice :text="t.notFound.text" :back="localePath('/')" :back-label="t.notFound.home" />
</template>
