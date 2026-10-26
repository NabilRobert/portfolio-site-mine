<script setup lang="ts">
import NotFoundNotice from '@/components/sections/NotFoundNotice.vue'
import { useLocale } from '@/composables/useLocale'

const { t, localePath } = useLocale()
</script>

<template>
  <NotFoundNotice :text="t.notFound.text" :back="localePath('/')" :back-label="t.notFound.home" />
</template>
