import { toValue, watchEffect } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

export interface DocumentMeta {
  lang: string
  title: string
  description: string
}

/** Keeps <html lang>, the title and the meta description in step with the page. */
export function useDocumentMeta(meta: MaybeRefOrGetter<DocumentMeta>) {
  watchEffect(() => {
    const { lang, title, description } = toValue(meta)
    document.documentElement.lang = lang
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  })
}
