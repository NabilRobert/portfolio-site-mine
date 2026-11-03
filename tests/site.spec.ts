// What search engines and link previews see: the sitemap and robots.txt the
// build writes, and each page's head (canonical address, its versions in the
// other languages, and its title and description for previews).
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { beforeEach, describe, expect, it } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createMemoryHistory } from 'vue-router'
import { createHead, renderDOMHead } from '@unhead/vue/client'
import { escapeHtml, staticPages } from '../build/pages'
import { publishedSlugs, robotsTxt, sitemapXml } from '../build/sitemap'
import { profile } from '../src/content'
import { createAppRouter } from '../src/router'
import ProjectView from '../src/views/ProjectView.vue'

const SITE = 'https://nabilrobert.my.id'

describe('sitemap', () => {
  const xml = sitemapXml(SITE, ['/', '/projects/pitstop'])

  it('lists every page in every language', () => {
    for (const path of ['/', '/ja', '/id', '/projects/pitstop', '/ja/projects/pitstop', '/id/projects/pitstop'])
      expect(xml).toContain(`<loc>${SITE}${path}</loc>`)
  })

  it('gives each entry its versions in the other languages', () => {
    expect(xml).toContain(`<xhtml:link rel="alternate" hreflang="ja" href="${SITE}/ja/projects/pitstop"/>`)
    expect(xml.match(/<xhtml:link/g)).toHaveLength(2 * 3 * 3)
  })

  it('includes published projects and leaves drafts out', () => {
    expect(publishedSlugs()).toContain('pitstop')
    expect(publishedSlugs()).not.toContain('systems-monitoring')
  })
})

describe('contact details', () => {
  it('link to a CV file that exists', () => {
    expect(existsSync(join(__dirname, '../public', profile.cv))).toBe(true)
  })
})

describe('robots.txt', () => {
  it('lets crawlers in and points them to the sitemap', () => {
    expect(robotsTxt(SITE)).toContain('Allow: /')
    expect(robotsTxt(SITE)).toContain(`Sitemap: ${SITE}/sitemap.xml`)
  })
})

describe('page head', () => {
  // The tests share one document, so each starts with an empty head.
  beforeEach(() => {
    document.head.innerHTML = ''
  })

  async function headOf(path: string, slug: string) {
    const router = createAppRouter(createMemoryHistory())
    router.push(path)
    await router.isReady()
    const head = createHead()
    mount(ProjectView, { props: { slug }, global: { plugins: [router, head] } })
    await flushPromises()
    await renderDOMHead(head, { document })
    const attr = (selector: string, name: string) => document.head.querySelector(selector)?.getAttribute(name)
    return { attr }
  }

  it('gives a project page its canonical address and its version in each language', async () => {
    const { attr } = await headOf('/ja/projects/pitstop', 'pitstop')
    expect(attr('link[rel="canonical"]', 'href')).toBe(`${SITE}/ja/projects/pitstop`)
    expect(attr('link[hreflang="en"]', 'href')).toBe(`${SITE}/projects/pitstop`)
    expect(attr('link[hreflang="id"]', 'href')).toBe(`${SITE}/id/projects/pitstop`)
    expect(attr('link[hreflang="x-default"]', 'href')).toBe(`${SITE}/projects/pitstop`)
    expect(attr('meta[property="og:title"]', 'content')).toContain('Pitstop')
    expect(attr('meta[property="og:locale"]', 'content')).toBe('ja_JP')
  })

  it('asks search engines to skip a project that does not exist', async () => {
    const { attr } = await headOf('/projects/nope', 'nope')
    expect(attr('meta[name="robots"]', 'content')).toBe('noindex')
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull()
  })
})

describe('the HTML each page is served with', () => {
  // The same app shell Vite builds from index.html, reduced to what matters here.
  const shell = `<!doctype html>
<html lang="en">
  <head>
    <title>Old title</title>
    <meta
      name="description"
      content="Old description"
    />
  </head>
  <body><div id="app"></div></body>
</html>`
  const files = staticPages(SITE, shell)
  const file = (name: string) => {
    const found = files.find((f) => f.fileName === name)
    if (!found) throw new Error(`${name} was not written`)
    return found.html
  }

  it('is written for every published page in every language, and for "not found"', () => {
    const names = files.map((f) => f.fileName)
    for (const name of [
      'index.html',
      'ja/index.html',
      'projects/index.html',
      'id/projects/pitstop/index.html',
      '404.html',
    ])
      expect(names).toContain(name)
    expect(names.some((name) => name.includes('systems-monitoring'))).toBe(false)
  })

  it("carries the page's own title, description, address and language for link previews", () => {
    const html = file('ja/projects/pitstop/index.html')
    expect(html).toContain('<html lang="ja">')
    expect(html).toMatch(/<title>Pitstop \| ムハンマド・ナビル・リナルディ｜AIフルスタックエンジニア<\/title>/)
    expect(html).toContain(`<meta property="og:url" content="${SITE}/ja/projects/pitstop" />`)
    expect(html).toContain(`<link rel="canonical" href="${SITE}/ja/projects/pitstop" />`)
    expect(html).toContain(`<link rel="alternate" hreflang="en" href="${SITE}/projects/pitstop" />`)
    expect(html).toMatch(/<meta property="og:title" content="Pitstop \| /)
    expect(html).toMatch(/<meta name="description" content="[^"]*エージェント/)
  })

  it("replaces the shell's own title and description rather than adding a second", () => {
    const html = file('projects/index.html')
    expect(html.match(/<title>/g)).toHaveLength(1)
    expect(html.match(/name="description"/g)).toHaveLength(1)
    expect(html).not.toContain('Old title')
  })

  it('marks the "not found" page for search engines to skip, with no canonical address', () => {
    const html = file('404.html')
    expect(html).toContain('<meta name="robots" content="noindex" />')
    expect(html).not.toContain('rel="canonical"')
  })

  it('escapes text so a quote or an ampersand cannot break the tags', () => {
    expect(escapeHtml(`Q&A "quoted" <b>`)).toBe('Q&amp;A &quot;quoted&quot; &lt;b&gt;')
  })
})
