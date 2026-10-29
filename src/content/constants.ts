// The fixed lists the content is checked against. Kept free of any library,
// so the site's bundle can use them without pulling in the schema validator.

export const categories = ['portfolio', 'opensource', 'other'] as const
export const statuses = ['live', 'ci', 'archived', 'wip', 'proposed', 'review'] as const

/** Each language's route prefix: English at /, the others under /ja and /id. */
export const localePrefixes = { en: '', ja: '/ja', id: '/id' } as const

/** '/projects' in a language with prefix '/ja' is '/ja/projects'; '/' is '/ja'. */
export function prefixedPath(prefix: string, path: string): string {
  if (path === '/') return prefix || '/'
  return `${prefix}${path}`
}
