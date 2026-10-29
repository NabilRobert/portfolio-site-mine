import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { locales, profile } from '@/content'
import type { LocaleCode } from '@/content'
import { useLocale } from '@/composables/useLocale'

export interface PageHead {
  title: string
  description: string
  /** false for pages search engines should skip, such as "not found". */
  indexable?: boolean
}

const OG_LOCALES: Record<LocaleCode, string> = { en: 'en_US', ja: 'ja_JP', id: 'id_ID' }

/**
 * A page's head: its title and description (also used for link previews),
 * its canonical address, and the same page in each language, so search
 * engines show the right language and treat the three as one page.
 */
export function usePageHead(page: () => PageHead) {
  const route = useRoute()
  const { lang, switchPath } = useLocale()
  const address = (path: string) => profile.site + path.replace(/#.*$/, '')

  useHead(() => {
    const { title, description, indexable = true } = page()
    const languages = Object.keys(locales) as LocaleCode[]
    const alternates = languages.map((code) => ({
      rel: 'alternate' as const,
      hreflang: code,
      href: address(switchPath(code)),
    }))
    return {
      title,
      meta: [
        { name: 'description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: address(route.path) },
        { property: 'og:locale', content: OG_LOCALES[lang.value] },
        ...(indexable ? [] : [{ name: 'robots', content: 'noindex' }]),
      ],
      link: indexable
        ? [
            { rel: 'canonical', href: address(route.path) },
            ...alternates,
            { rel: 'alternate', hreflang: 'x-default', href: address(switchPath('en')) },
          ]
        : [],
    }
  })
}
