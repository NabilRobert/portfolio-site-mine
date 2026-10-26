// The site's content. Projects are Markdown files with YAML front matter:
//
//   src/content/projects/<slug>/en.md   (required)
//   src/content/projects/<slug>/ja.md   (required)
//   src/content/projects/<slug>/id.md   (required)
//   src/content/projects/<slug>/cover.(webp|png|jpg|svg)   (optional thumbnail)
//
// Adding a project is adding a folder; nothing else needs to change.
// tests/content.spec.js checks every project is complete in every language.
import en from './locales/en.js'
import ja from './locales/ja.js'
import id from './locales/id.js'

export { profile } from './profile.js'

export const locales = {
  en: { prefix: '', label: 'EN', strings: en },
  ja: { prefix: '/ja', label: '日本語', strings: ja },
  id: { prefix: '/id', label: 'ID', strings: id },
}
export const defaultLocale = 'en'

// Display order of the categories; a project's `category` must be one of these.
export const categories = ['portfolio', 'opensource', 'other']

// Each .md file arrives already parsed as { data, html } (see build/markdown.js).
const files = import.meta.glob('./projects/*/*.md', { import: 'default', eager: true })
const covers = import.meta.glob('./projects/*/cover.{webp,png,jpg,jpeg,svg}', { import: 'default', eager: true })

function slugOf(path) {
  return path.split('/').at(-2)
}

function coverFor(slug) {
  const key = Object.keys(covers).find((p) => slugOf(p) === slug)
  return key ? covers[key] : null
}

function load() {
  const byLocale = Object.fromEntries(Object.keys(locales).map((l) => [l, []]))
  for (const [path, { data, html }] of Object.entries(files)) {
    const lang = path.split('/').at(-1).replace(/\.md$/, '')
    if (!byLocale[lang]) continue
    const slug = slugOf(path)
    byLocale[lang].push({
      slug,
      title: data.title,
      summary: data.summary,
      category: data.category,
      order: data.order ?? 999,
      featured: Boolean(data.featured),
      status: data.status ?? '',
      stack: data.stack ?? '',
      links: data.links ?? [],
      cover: coverFor(slug),
      html,
    })
  }
  for (const list of Object.values(byLocale)) list.sort((a, b) => a.order - b.order)
  return byLocale
}

const projectsByLocale = load()

export function getProjects(lang) {
  return projectsByLocale[lang] ?? projectsByLocale[defaultLocale]
}

export function getProject(lang, slug) {
  return getProjects(lang).find((p) => p.slug === slug) ?? null
}

export function getFeatured(lang) {
  return getProjects(lang).find((p) => p.featured) ?? null
}

// [{ id, projects }] for the categories that have at least one project.
export function getProjectsByCategory(lang) {
  const all = getProjects(lang)
  return categories
    .map((id) => ({ id, projects: all.filter((p) => p.category === id) }))
    .filter((c) => c.projects.length)
}
