// Guards the content as it grows: a project added in one language but not
// another, a link that differs between languages, a typo in a category, or a
// locale missing a string all fail here instead of on the live site.
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { parseMarkdown } from '../build/markdown'
import { z } from 'zod'
import { categories, getProject, locales, splitTitle, statuses } from '../src/content'
import { projectFrontMatter } from '../src/content/schema'
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

    it.each(LANGS)('%s matches the front-matter schema and has a body', (lang) => {
      const { data, html } = read(slug, lang)
      const result = projectFrontMatter.safeParse(data)
      expect(result.success, result.success ? '' : z.prettifyError(result.error)).toBe(true)
      expect(html.trim().length, 'body').toBeGreaterThan(0)
    })

    it('has the same links and settings in every language', () => {
      const [first, ...rest] = LANGS.map((lang) => read(slug, lang).data)
      if (!first) throw new Error('no locales')
      const shape = (d: Partial<ProjectFrontMatter>) => ({
        category: d.category,
        order: d.order,
        featured: Boolean(d.featured),
        draft: Boolean(d.draft),
        status: d.status,
        hrefs: (d.links ?? []).map((l) => l.href),
        primary: (d.links ?? []).map((l) => Boolean(l.primary)),
        coverAlt: Boolean(d.coverAlt),
        screenshots: (d.screenshots ?? []).map((s) => [
          s.src,
          s.still ?? '',
          Boolean(s.description),
          s.terms?.length ?? 0,
        ]),
      })
      for (const other of rest) expect(shape(other)).toEqual(shape(first))
    })

    it('records where every image came from', () => {
      const images = readdirSync(join(PROJECTS, slug)).filter((f) => /\.(webp|png|jpe?g|gif|svg)$/.test(f))
      for (const image of images) {
        // An animation's still (step1-still.png), a chart's phone version (chart-narrow.svg)
        // and a language's version (chart.ja.svg) share the original's record.
        const record = image.replace(/(-still|-narrow)?(\.(?:en|ja|id))?\.\w+$/, '.source.txt')
        expect(existsSync(join(PROJECTS, slug, record)), `${slug}/${record}`).toBe(true)
      }
    })

    it.each(LANGS)('%s: every screenshot exists and has alt text', (lang) => {
      for (const shot of read(slug, lang).data.screenshots ?? []) {
        expect(existsSync(join(PROJECTS, slug, shot.src)), `${slug}/${shot.src}`).toBe(true)
        if (shot.still) expect(existsSync(join(PROJECTS, slug, shot.still)), `${slug}/${shot.still}`).toBe(true)
        expect(shot.alt?.trim(), `alt for ${shot.src} in ${lang}`).toBeTruthy()
        for (const k of shot.terms ?? [])
          expect(k.term && k.meaning, `key entry for ${shot.src} in ${lang}`).toBeTruthy()
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

  it.each(LANGS)('%s names every status', (lang) => {
    for (const s of statuses) expect(locales[lang].strings.status[s], s).toBeTruthy()
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

  it('use a language’s own version of an image when there is one', () => {
    const src = (lang: LocaleCode) => getProject(lang, 'agent-eval-harness')?.screenshots[0]?.src ?? ''
    expect(src('ja')).toMatch(/gate-chart\.ja.*\.svg/)
    expect(src('id')).toMatch(/gate-chart\.id.*\.svg/)
    expect(src('en')).toMatch(/gate-chart(?!\.(ja|id))/)
  })

  it('pick up a phone-width version of a chart, in the right language', () => {
    const narrow = (lang: LocaleCode) => getProject(lang, 'agent-eval-harness')?.screenshots[0]?.narrow ?? ''
    expect(narrow('ja')).toMatch(/gate-chart-narrow\.ja.*\.svg/)
    expect(narrow('en')).toMatch(/gate-chart-narrow(?!\.(ja|id))/)
  })

  it('leave `narrow` empty when there is no phone version', () => {
    expect(getProject('en', 'mcp-backbone')?.screenshots[0]?.narrow).toBe('')
  })
})
