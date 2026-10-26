import { toValue, watchEffect } from 'vue'

// Keeps <html lang>, the title and the meta description in step with the page.
// `meta` is a ref or getter returning { lang, title, description }.
export function useDocumentMeta(meta) {
  watchEffect(() => {
    const { lang, title, description } = toValue(meta)
    document.documentElement.lang = lang
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  })
}
