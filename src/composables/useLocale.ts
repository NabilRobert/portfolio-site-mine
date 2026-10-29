import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { defaultLocale, isLocale, locales, prefixedPath } from '@/content'
import type { LocaleCode } from '@/content'

/**
 * The current language, taken from the route, plus helpers to build links
 * that stay in it and to switch to the same page in another language.
 */
export function useLocale() {
  const route = useRoute()

  const lang = computed<LocaleCode>(() => (isLocale(route.meta.lang) ? route.meta.lang : defaultLocale))
  const t = computed(() => locales[lang.value].strings)

  /** '/projects' becomes '/ja/projects' in Japanese; '/' becomes '/ja'. */
  function localePath(path: string, target: LocaleCode = lang.value): string {
    return prefixedPath(locales[target].prefix, path)
  }

  /** The current page in another language, keeping the hash. */
  function switchPath(target: LocaleCode): string {
    const { prefix } = locales[lang.value]
    const bare = prefix && route.path.startsWith(prefix) ? route.path.slice(prefix.length) || '/' : route.path
    return localePath(bare, target) + (route.hash || '')
  }

  return { lang, t, localePath, switchPath }
}
