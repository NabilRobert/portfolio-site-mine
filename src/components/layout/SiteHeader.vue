<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { profile } from '@/content'
import LanguageSwitch from '@/components/ui/LanguageSwitch.vue'
import { useLocale } from '@/composables/useLocale'

// The masthead: page links on the left, the wordmark in the centre and the
// language switch on the right, like a magazine cover. On a phone the three
// stack, centred. On the home page the wordmark is the page's h1; elsewhere
// each page has its own.
const route = useRoute()
const { t, localePath } = useLocale()
const page = computed(() => String(route.name ?? ''))
const isHome = computed(() => page.value.startsWith('home-'))
// The full name is too long for one line of wide capitals on a phone, so it
// may wrap, but only between its parts ("Muhammad Nabil / Rinaldi"), never
// inside one. A Japanese part keeps its "・" at its end.
const nameParts = computed(() => t.value.about.name.split(/(?<=・)|\s+/).filter(Boolean))
// Only "Work" is a page of its own; the other two are places on a page.
const links = computed(() => [
  { key: 'work', to: localePath('/projects'), label: t.value.nav.work, current: page.value.startsWith('projects-') },
  { key: 'about', to: { path: localePath('/'), hash: '#about' }, label: t.value.nav.about, current: false },
  { key: 'contact', to: { hash: '#contact' }, label: t.value.nav.contact, current: false },
])
</script>

<template>
  <header
    class="frame grid items-center gap-y-5 pt-8 pb-12 sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-[1fr_auto_1fr] lg:pt-10 lg:pb-16"
  >
    <component
      :is="isHome ? 'h1' : 'p'"
      class="mb-3 justify-self-center sm:col-span-2 sm:mb-0 lg:col-span-1 lg:col-start-2 lg:row-start-1"
    >
      <RouterLink :to="localePath('/')" class="block text-center">
        <span
          class="display block pl-[0.14em] text-[1.6rem] leading-[1.15] tracking-[0.14em] text-balance text-cream sm:text-[2rem] lg:text-[2.4rem]"
        >
          <template v-for="(part, i) in nameParts" :key="i"
            ><span class="inline-block">{{ part }}</span
            >{{ i < nameParts.length - 1 && !part.endsWith('・') ? ' ' : '' }}</template
          >
        </span>
        <span class="display mt-2.5 block pl-[0.4em] text-[0.7rem] font-medium tracking-[0.4em] text-skin sm:text-xs">{{
          t.about.role
        }}</span>
      </RouterLink>
    </component>

    <nav :aria-label="t.nav.label" class="justify-self-center sm:justify-self-start lg:col-start-1 lg:row-start-1">
      <ul class="flex gap-x-6 text-sm whitespace-nowrap sm:gap-x-7">
        <li v-for="l in links" :key="l.key">
          <RouterLink
            :to="l.to"
            :aria-current="l.current ? 'page' : undefined"
            active-class=""
            exact-active-class=""
            class="text-cream aria-[current=page]:text-yellow underline-offset-[0.4em] transition-colors hover:text-yellow hover:underline"
            >{{ l.label }}</RouterLink
          >
        </li>
      </ul>
    </nav>

    <div
      class="flex items-center gap-x-7 justify-self-center text-sm whitespace-nowrap sm:justify-self-end lg:col-start-3 lg:row-start-1"
    >
      <a
        :href="profile.github"
        class="hidden text-cream underline-offset-[0.4em] transition-colors hover:text-yellow hover:underline sm:inline"
        >GitHub</a
      >
      <LanguageSwitch />
    </div>
  </header>
</template>
