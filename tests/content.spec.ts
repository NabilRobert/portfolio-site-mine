// Guards the content as it grows: a project added in one language but not
// another, a link that differs between languages, a typo in a category, or a
// locale missing a string all fail here instead of on the live site.
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { parseMarkdown } from '../build/markdown'
import { categories, getProject, locales, splitTitle } from '../src/content'
import type { LocaleCode, ProjectFrontMatter } from '../src/content'

const PROJECTS = join(__dirname, '../src/content/projects')
const LANGS = Object.keys(locales) as LocaleCode[]
const slugs = readdirSync(PROJECTS, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)

const read = (slug: string, lang: LocaleCode) => {
  const { data, html } = parseMarkdown(readFileSync(join(PROJECTS, slug, `${lang}.md`), 'utf8'))
  return { data: data as Partial<ProjectFrontMatter>, html }
}

function keyPaths(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v) ? keyPaths(v as object, `${prefix}${k}.`) : [`${prefix}${k}`],
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
      for (const link of data.links ?? []) {
        expect(link.label, 'link label').toBeTypeOf('string')
        expect(link.href, `link href in ${lang}`).toMatch(/^https:\/\//)
      }
      expect(html.trim().length, 'body').toBeGreaterThan(0)
    })

    it('has the same links and settings in every language', () => {
      const [first, ...rest] = LANGS.map((lang) => read(slug, lang).data)
      if (!first) throw new Error('no locales')
      const shape = (d: Partial<ProjectFrontMatter>) => ({
        category: d.category,
        order: d.order,
        featured: Boolean(d.featured),
        status: d.status,
        hrefs: (d.links ?? []).map((l) => l.href),
        primary: (d.links ?? []).map((l) => Boolean(l.primary)),
        coverAlt: Boolean(d.coverAlt),
        screenshots: (d.screenshots ?? []).map((s) => [s.src, s.still ?? '']),
      })
      for (const other of rest) expect(shape(other)).toEqual(shape(first))
    })

    it('records where every image came from', () => {
      const images = readdirSync(join(PROJECTS, slug)).filter((f) => /\.(webp|png|jpe?g|gif|svg)$/.test(f))
      for (const image of images) {
        // An animation's still (step1-still.png) shares its record (step1.source.txt).
        const record = image.replace(/(-still)?\.\w+$/, '.source.txt')
        expect(existsSync(join(PROJECTS, slug, record)), `${slug}/${record}`).toBe(true)
      }
    })

    it.each(LANGS)('%s: every screenshot exists and has alt text', (lang) => {
      for (const shot of read(slug, lang).data.screenshots ?? []) {
        expect(existsSync(join(PROJECTS, slug, shot.src)), `${slug}/${shot.src}`).toBe(true)
        if (shot.still) expect(existsSync(join(PROJECTS, slug, shot.still)), `${slug}/${shot.still}`).toBe(true)
        expect(shot.alt?.trim(), `alt for ${shot.src} in ${lang}`).toBeTruthy()
      }
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

describe('splitTitle', () => {
  it('splits a title at its first colon, Latin or Japanese', () => {
    expect(splitTitle('MCP-backbone: a server: safe')).toEqual({ name: 'MCP-backbone', rest: 'a server: safe' })
    expect(splitTitle('Pitstop：無人で稼働')).toEqual({ name: 'Pitstop', rest: '無人で稼働' })
  })

  it('keeps a title without a colon whole', () => {
    expect(splitTitle('Pitstop')).toEqual({ name: 'Pitstop', rest: '' })
  })
})

describe('screenshots', () => {
  it('resolve to built files, with their still, alt text and caption', () => {
    const [shot] = getProject('ja', 'mcp-backbone')?.screenshots ?? []
    expect(shot?.src).toMatch(/step1.*\.gif/)
    expect(shot?.still).toMatch(/step1-still.*\.png/)
    expect(shot?.alt).toContain('Claude Code')
    expect(shot?.caption).toContain('質問する')
  })
})
