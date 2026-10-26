// Guards the content as it grows: a project added in one language but not
// another, a link that differs between languages, a typo in a category, or a
// locale missing a string all fail here instead of on the live site.
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { parseMarkdown } from '../build/markdown.js'
import { categories, locales } from '../src/content/index.js'

const PROJECTS = join(__dirname, '../src/content/projects')
const LANGS = Object.keys(locales)
const slugs = readdirSync(PROJECTS, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)

const read = (slug, lang) => parseMarkdown(readFileSync(join(PROJECTS, slug, `${lang}.md`), 'utf8'))

function keyPaths(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v) ? keyPaths(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  )
}

describe('projects', () => {
  it('there is at least one', () => {
    expect(slugs.length).toBeGreaterThan(0)
  })

  describe.each(slugs)('%s', (slug) => {
    it.each(LANGS)('has a %s file', (lang) => {
      expect(existsSync(join(PROJECTS, slug, `${lang}.md`))).toBe(true)
    })

    it.each(LANGS)('%s has valid front matter and a body', (lang) => {
      const { data, html } = read(slug, lang)
      expect(data.title, 'title').toBeTypeOf('string')
      expect(data.summary, 'summary').toBeTypeOf('string')
      expect(categories, `category "${data.category}"`).toContain(data.category)
      expect(data.order, 'order').toBeTypeOf('number')
      expect(Array.isArray(data.links) && data.links.length > 0, 'at least one link').toBe(true)
      for (const link of data.links) {
        expect(link.label, 'link label').toBeTypeOf('string')
        expect(link.href, `link href in ${lang}`).toMatch(/^https:\/\//)
      }
      expect(html.trim().length, 'body').toBeGreaterThan(0)
    })

    it('has the same links and settings in every language', () => {
      const [first, ...rest] = LANGS.map((lang) => read(slug, lang).data)
      const shape = (d) => ({
        category: d.category,
        order: d.order,
        featured: Boolean(d.featured),
        status: d.status,
        hrefs: d.links.map((l) => l.href),
        primary: d.links.map((l) => Boolean(l.primary)),
      })
      for (const other of rest) expect(shape(other)).toEqual(shape(first))
    })
  })

  it('at most one project is featured', () => {
    const featured = slugs.filter((s) => read(s, 'en').data.featured)
    expect(featured.length).toBeLessThanOrEqual(1)
  })
})

describe('locale strings', () => {
  const reference = keyPaths(locales.en.strings).sort()

  it.each(LANGS)('%s has exactly the same keys as en', (lang) => {
    expect(keyPaths(locales[lang].strings).sort()).toEqual(reference)
  })

  it.each(LANGS)('%s names every category', (lang) => {
    for (const c of categories) expect(locales[lang].strings.categories[c]).toBeTruthy()
  })

  it('the "how they fit together" steps point at real projects', () => {
    for (const slug of Object.keys(locales.en.strings.flow.steps)) expect(slugs).toContain(slug)
  })
})
