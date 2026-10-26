import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { defaultLocale, locales } from '@/content'

// The current language, taken from the route, plus helpers to build links
// that stay in it and to switch to the same page in another language.
export function useLocale() {
  const route = useRoute()

  const lang = computed(() => (locales[route.meta.lang] ? route.meta.lang : defaultLocale))
  const t = computed(() => locales[lang.value].strings)

  // '/projects' -> '/ja/projects' in Japanese; '/' -> '/ja'.
  function localePath(path, target = lang.value) {
    const prefix = locales[target].prefix
    if (path === '/') return prefix || '/'
    return `${prefix}${path}`
  }

  // The current page in another language, keeping the hash.
  function switchPath(target) {
    const prefix = locales[lang.value].prefix
    const bare = prefix && route.path.startsWith(prefix) ? route.path.slice(prefix.length) || '/' : route.path
    return localePath(bare, target) + (route.hash || '')
  }

  return { lang, t, localePath, switchPath }
}
