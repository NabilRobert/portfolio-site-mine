import { onScopeDispose, ref, toValue, watchEffect } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { LocaleCode } from '@/content'

const intlLocale: Record<LocaleCode, string> = { en: 'en-GB', ja: 'ja-JP', id: 'id-ID' }

/** A clock in the visitor's own time, updated every 30 seconds, in the given locale. */
export function useClock(locale: MaybeRefOrGetter<LocaleCode>) {
  const time = ref('')
  const format = () => {
    time.value = new Date().toLocaleTimeString(intlLocale[toValue(locale)], { hour: 'numeric', minute: '2-digit' })
  }
  watchEffect(format)
  const timer = setInterval(format, 30_000)
  onScopeDispose(() => clearInterval(timer))
  return time
}
