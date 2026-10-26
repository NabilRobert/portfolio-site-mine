<script setup>
import WinWindow from '@/components/win98/WinWindow.vue'
import WinIconTile from '@/components/win98/WinIconTile.vue'
import { useLocale } from '@/composables/useLocale'

// One category of projects as a grid of desktop-icon tiles.
defineProps({
  category: { type: String, required: true },
  projects: { type: Array, required: true },
})
const { t, localePath } = useLocale()
</script>

<template>
  <WinWindow :id="`category-${category}`" :title="t.categories[category]" icon="▤" flush>
    <ul class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
      <li v-for="p in projects" :key="p.slug" class="grid">
        <WinIconTile
          :to="localePath(`/projects/${p.slug}`)"
          :label="p.title.split(/[:：]/)[0]"
          :caption="p.summary"
          :image="p.cover"
          :glyph="p.title.charAt(0)"
        />
      </li>
    </ul>
  </WinWindow>
</template>
