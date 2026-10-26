<script setup>
import { computed } from 'vue'
import { getProjects, locales } from '@/content'
import { useLocale } from '@/composables/useLocale'
import { useClock } from '@/composables/useClock'

// The taskbar: Start goes home, one task per project, and the tray holds the
// language switch and a clock in the visitor's own time.
const { lang, t, localePath, switchPath } = useLocale()
const clock = useClock(lang)
const tasks = computed(() =>
  getProjects(lang.value).map((p) => ({ slug: p.slug, label: p.title.split(':')[0].split('：')[0] })),
)
</script>

<template>
  <nav
    :aria-label="t.nav.taskbar"
    class="fixed inset-x-0 bottom-0 z-10 flex h-10 items-center gap-1.5 border-t-2 border-cream bg-skin px-1.5 py-[3px]"
  >
    <RouterLink
      :to="localePath('/')"
      class="bevel-raised flex items-center gap-1.5 bg-skin px-2.5 py-0.5 text-sm font-bold text-ink no-underline hover:text-ink"
    >
      <span
        aria-hidden="true"
        class="h-3.5 w-4 border border-ink bg-linear-to-r from-red from-50% to-blue to-50%"
      ></span>
      {{ t.nav.start }}
    </RouterLink>
    <RouterLink
      v-for="task in tasks"
      :key="task.slug"
      :to="localePath(`/projects/${task.slug}`)"
      active-class="bevel-pressed bg-cream"
      class="bevel-raised hidden max-w-44 truncate px-2.5 py-0.5 text-[13px] text-ink no-underline hover:bg-cream hover:text-ink md:block"
      >{{ task.label }}</RouterLink
    >
    <div class="bevel-thin ml-auto flex items-center gap-2 px-2.5 py-0.5 text-[13px]">
      <RouterLink
        v-for="(l, code) in locales"
        :key="code"
        :to="switchPath(code)"
        :hreflang="code"
        :lang="code"
        :aria-current="code === lang ? 'true' : undefined"
        class="px-1 font-bold no-underline"
        :class="code === lang ? 'bg-blue-deep text-desk hover:text-desk' : 'text-ink hover:text-ink'"
        >{{ l.label }}</RouterLink
      >
      <span aria-hidden="true">{{ clock }}</span>
    </div>
  </nav>
</template>
