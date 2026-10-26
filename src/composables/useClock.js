import { onScopeDispose, ref, toValue, watchEffect } from 'vue'

// A clock string in the visitor's own time, updated every 30 seconds and
// formatted for the given locale (a ref or a plain value).
export function useClock(locale) {
  const time = ref('')
  const format = () => {
    time.value = new Date().toLocaleTimeString(toValue(locale) === 'ja' ? 'ja-JP' : undefined, {
      hour: 'numeric',
      minute: '2-digit',
    })
  }
  watchEffect(format)
  const timer = setInterval(format, 30_000)
  onScopeDispose(() => clearInterval(timer))
  return time
}
