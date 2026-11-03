<script setup lang="ts">
import NotFoundNotice from '@/components/sections/NotFoundNotice.vue'
import { notFoundHead } from '@/content'
import { useLocale } from '@/composables/useLocale'
import { usePageHead } from '@/composables/usePageHead'

const { t, localePath } = useLocale()

usePageHead(() => notFoundHead(t.value))
</script>

<template>
  <NotFoundNotice :text="t.notFound.text" :back="localePath('/')" :back-label="t.notFound.home" />
</template>
