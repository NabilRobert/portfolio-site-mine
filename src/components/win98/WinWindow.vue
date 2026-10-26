<script setup lang="ts">
import type { MenuItem } from './types'
import WinTitleBar from './WinTitleBar.vue'
import WinMenuBar from './WinMenuBar.vue'
import WinStatusBar from './WinStatusBar.vue'

// A Windows 98 window. The default slot goes inside a sunken panel unless
// `flush` is set (for grids of tiles); `buttons` sits bottom-right like a
// dialog's OK / Cancel row.
withDefaults(
  defineProps<{
    title: string
    icon?: string
    inactive?: boolean
    closeOnly?: boolean
    menu?: MenuItem[]
    status?: string[]
    flush?: boolean
    as?: string
    headingTag?: string
  }>(),
  {
    icon: '',
    inactive: false,
    closeOnly: false,
    menu: () => [],
    status: () => [],
    flush: false,
    as: 'section',
    headingTag: 'h2',
  },
)
</script>

<template>
  <component :is="as" class="bevel-raised min-w-0 bg-skin p-[3px]">
    <WinTitleBar :title :icon :inactive :close-only="closeOnly" :heading-tag="headingTag" />
    <WinMenuBar v-if="menu.length" :items="menu" :label="title" />
    <div class="px-3 pt-3 pb-3.5">
      <slot v-if="flush" />
      <div v-else class="bevel-sunken bg-cream px-4 py-3.5 text-[15px] leading-relaxed">
        <slot />
      </div>
      <div v-if="$slots.buttons" class="mt-3.5 flex flex-wrap justify-end gap-2">
        <slot name="buttons" />
      </div>
      <WinStatusBar v-if="status.length" :fields="status" />
    </div>
  </component>
</template>
