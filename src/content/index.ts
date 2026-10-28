// The site's content. Projects are Markdown files with YAML front matter:
//
//   src/content/projects/<slug>/en.md   (required)
//   src/content/projects/<slug>/ja.md   (required)
//   src/content/projects/<slug>/id.md   (required)
//   src/content/projects/<slug>/cover.(webp|png|jpg|svg)   (optional, 5:7 portrait)
//   src/content/projects/<slug>/<name>.(webp|png|jpg|gif|svg)   (optional screenshots, listed under
//                                                                `screenshots` in the front matter;
//                                                                <name>.ja.svg and so on replace it
//                                                                in that language, e.g. a translated chart,
//                                                                and <name>-narrow.svg is shown on phones)
//   src/content/projects/<slug>/<name>.source.txt   (where each image came from; required, and
//                                                    shared by <name>-still.* for an animation)
//
// Adding a project is adding a folder; nothing else needs to change. A project
// with `draft: true` shows in the dev preview but is left out of production builds.
// tests/content.spec.ts checks every project is complete in every language.
import en from './locales/en'
import ja from './locales/ja'
import id from './locales/id'
import { categories, statuses } from './constants'
import type { Category, Locale, LocaleCode, Project, ProjectFrontMatter } from './types'

export { profile } from './profile'
export { categories, statuses }
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
// Every image in a project folder, as its built URL.
const images = import.meta.glob<string>('./projects/*/*.{webp,png,jpg,jpeg,gif,svg}', {
  import: 'default',
  eager: true,
})

const segments = (path: string) => path.split('/')
const slugOf = (path: string) => segments(path).at(-2) ?? ''

function coverFor(slug: string): string | null {
  const key = Object.keys(images).find((p) => slugOf(p) === slug && /\/cover\.\w+$/.test(p))
  return key ? (images[key] ?? null) : null
}

/**
 * A file named in a project's front matter, as its built URL ('' if it is missing).
 * A language's own version, such as chart.ja.svg for chart.svg, is preferred when it exists.
 */
function imageFor(slug: string, file: string, lang: LocaleCode): string {
  const localised = file.replace(/(\.\w+)$/, `.${lang}$1`)
  return images[`./projects/${slug}/${localised}`] ?? images[`./projects/${slug}/${file}`] ?? ''
}

function load(): Record<LocaleCode, Project[]> {
  const byLocale: Record<LocaleCode, Project[]> = { en: [], ja: [], id: [] }
  for (const [path, { data, html }] of Object.entries(files)) {
    const lang = (segments(path).at(-1) ?? '').replace(/\.md$/, '')
    if (!isLocale(lang)) continue
    const slug = slugOf(path)
    // Checked against the schema at build time (build/markdown.ts), so the cast is safe.
    const fm = data as unknown as ProjectFrontMatter
    if (fm.draft && !import.meta.env.DEV) continue
    byLocale[lang].push({
      slug,
      title: fm.title,
      summary: fm.summary,
      category: fm.category,
      order: fm.order ?? 999,
      featured: Boolean(fm.featured),
      draft: Boolean(fm.draft),
      status: fm.status ?? '',
      stack: fm.stack ?? '',
      links: fm.links ?? [],
      cover: coverFor(slug),
      coverAlt: fm.coverAlt ?? '',
      screenshots: (fm.screenshots ?? []).map((s) => ({
        src: imageFor(slug, s.src, lang),
        still: s.still ? imageFor(slug, s.still, lang) : '',
        narrow: imageFor(slug, s.src.replace(/(\.\w+)$/, '-narrow$1'), lang),
        alt: s.alt,
        caption: s.caption ?? '',
        description: s.description ?? '',
        terms: s.terms ?? [],
      })),
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

/**
 * "MCP-backbone: a database server..." -> { name: "MCP-backbone", rest: "a database server..." }.
 * Splits at the first colon, Latin or Japanese; `rest` is '' when there is none.
 */
export function splitTitle(title: string): { name: string; rest: string } {
  const at = title.search(/[:：]/)
  if (at < 0) return { name: title.trim(), rest: '' }
  return { name: title.slice(0, at).trim() || title, rest: title.slice(at + 1).trim() }
}

/** "MCP-backbone: a database server..." -> "MCP-backbone": a project's short name. */
export function shortTitle(title: string): string {
  return splitTitle(title).name
}

/** The categories that have at least one project, in display order. */
export function getProjectsByCategory(lang: LocaleCode): { id: Category; projects: Project[] }[] {
  const all = getProjects(lang)
  return categories
    .map((id) => ({ id, projects: all.filter((p) => p.category === id) }))
    .filter((c) => c.projects.length)
}
