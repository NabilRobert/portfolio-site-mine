// The site's content. Projects are Markdown files with YAML front matter:
//
//   src/content/projects/<slug>/en.md   (required)
//   src/content/projects/<slug>/ja.md   (required)
//   src/content/projects/<slug>/id.md   (required)
//   src/content/projects/<slug>/cover.(webp|png|jpg|svg)   (optional, 5:7 portrait)
//   src/content/projects/<slug>/cover.source.txt   (where the cover came from; required with a cover)
//
// Adding a project is adding a folder; nothing else needs to change.
// tests/content.spec.ts checks every project is complete in every language.
import en from './locales/en'
import ja from './locales/ja'
import id from './locales/id'
import { categories } from './types'
import type { Category, Locale, LocaleCode, Project, ProjectFrontMatter } from './types'

export { profile } from './profile'
export { categories }
export type * from './types'

export const locales: Record<LocaleCode, Locale> = {
  en: { prefix: '', label: 'EN', strings: en },
  ja: { prefix: '/ja', label: '日本語', strings: ja },
  id: { prefix: '/id', label: 'ID', strings: id },
}
export const defaultLocale: LocaleCode = 'en'

export function isLocale(value: unknown): value is LocaleCode {
  return typeof value === 'string' && value in locales
}

// Each .md file arrives already parsed as { data, html } (see build/markdown.ts).
const files = import.meta.glob<{ data: Record<string, unknown>; html: string }>('./projects/*/*.md', {
  import: 'default',
  eager: true,
})
const covers = import.meta.glob<string>('./projects/*/cover.{webp,png,jpg,jpeg,svg}', {
  import: 'default',
  eager: true,
})

const segments = (path: string) => path.split('/')
const slugOf = (path: string) => segments(path).at(-2) ?? ''

function coverFor(slug: string): string | null {
  const key = Object.keys(covers).find((p) => slugOf(p) === slug)
  return key ? (covers[key] ?? null) : null
}

function load(): Record<LocaleCode, Project[]> {
  const byLocale: Record<LocaleCode, Project[]> = { en: [], ja: [], id: [] }
  for (const [path, { data, html }] of Object.entries(files)) {
    const lang = (segments(path).at(-1) ?? '').replace(/\.md$/, '')
    if (!isLocale(lang)) continue
    const slug = slugOf(path)
    const fm = data as unknown as ProjectFrontMatter
    byLocale[lang].push({
      slug,
      title: fm.title,
      summary: fm.summary,
      category: fm.category,
      order: fm.order ?? 999,
      featured: Boolean(fm.featured),
      status: fm.status ?? '',
      stack: fm.stack ?? '',
      links: fm.links ?? [],
      cover: coverFor(slug),
      coverAlt: fm.coverAlt ?? '',
      html,
    })
  }
  for (const list of Object.values(byLocale)) list.sort((a, b) => a.order - b.order)
  return byLocale
}

const projectsByLocale = load()

export function getProjects(lang: LocaleCode): Project[] {
  return projectsByLocale[lang]
}

export function getProject(lang: LocaleCode, slug: string): Project | null {
  return getProjects(lang).find((p) => p.slug === slug) ?? null
}

export function getFeatured(lang: LocaleCode): Project | null {
  return getProjects(lang).find((p) => p.featured) ?? null
}

/** "MCP-backbone: a database server..." -> "MCP-backbone": a project's short name. */
export function shortTitle(title: string): string {
  return title.split(/[:：]/)[0]?.trim() || title
}

/** The categories that have at least one project, in display order. */
export function getProjectsByCategory(lang: LocaleCode): { id: Category; projects: Project[] }[] {
  const all = getProjects(lang)
  return categories
    .map((id) => ({ id, projects: all.filter((p) => p.category === id) }))
    .filter((c) => c.projects.length)
}
