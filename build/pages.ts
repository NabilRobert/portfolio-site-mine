// Writes an HTML file for every page of the production build, in every
// language (projects/pitstop/index.html, ja/projects/pitstop/index.html, …),
// plus 404.html for addresses that match no page. Each file is the same app
// shell with that page's own title, description, link-preview (Open Graph)
// tags, canonical address and languages in its head. Link previews don't run
// JavaScript, so without these every shared link looked like the home page.
// The titles and descriptions come from src/content/pageHeads.ts, the same
// rules the views use in the browser.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Plugin } from 'vite'
import { localePrefixes, prefixedPath } from '../src/content/constants.ts'
import { homeHead, notFoundHead, OG_LOCALES, projectHead, projectsHead } from '../src/content/pageHeads.ts'
import type { PageHead } from '../src/content/pageHeads.ts'
import type { LocaleCode, LocaleStrings } from '../src/content/types.ts'
import en from '../src/content/locales/en.ts'
import ja from '../src/content/locales/ja.ts'
import id from '../src/content/locales/id.ts'
import { checkedFrontMatter, parseMarkdown } from './markdown.ts'
import { sitePages } from './sitemap.ts'

const STRINGS: Record<LocaleCode, LocaleStrings> = { en, ja, id }
const LANGS = Object.keys(localePrefixes) as LocaleCode[]
const PROJECTS = join(import.meta.dirname, '../src/content/projects')

export interface PageFile {
  /** Where the file goes in dist/, such as 'ja/projects/pitstop/index.html'. */
  fileName: string
  html: string
}

/** Text made safe to put inside an HTML attribute or element. */
export function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** The head of a page, given as its English path ('/', '/projects', '/projects/<slug>'). */
function headFor(page: string, lang: LocaleCode): PageHead {
  const t = STRINGS[lang]
  if (page === '/') return homeHead(t)
  if (page === '/projects') return projectsHead(t)
  const file = join(PROJECTS, page.slice('/projects/'.length), `${lang}.md`)
  return projectHead(t, checkedFrontMatter(file, parseMarkdown(readFileSync(file, 'utf8')).data))
}

/** The tags that say where a page lives: its canonical address and its version in each language. */
function addressTags(site: string, page: string, lang: LocaleCode): string[] {
  const address = (code: LocaleCode) => escapeHtml(site + prefixedPath(localePrefixes[code], page))
  return [
    `<meta property="og:url" content="${address(lang)}" />`,
    `<link rel="canonical" href="${address(lang)}" />`,
    ...LANGS.map((code) => `<link rel="alternate" hreflang="${code}" href="${address(code)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${address('en')}" />`,
  ]
}

/** The whole head block for a page; `page` is null for "not found", which has no address. */
function headTags(site: string, head: PageHead, lang: LocaleCode, page: string | null): string {
  const title = escapeHtml(head.title)
  const description = escapeHtml(head.description)
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(STRINGS[lang].meta.title)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:locale" content="${OG_LOCALES[lang]}" />`,
    ...(page === null ? ['<meta name="robots" content="noindex" />'] : addressTags(site, page, lang)),
  ]
  return tags.map((tag) => `    ${tag}`).join('\n')
}

/** The app shell with its language set and its own title and description replaced by `tags`. */
function withHead(shell: string, lang: LocaleCode, tags: string): string {
  return shell
    .replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
    .replace(/\s*<title>[\s\S]*?<\/title>/, '')
    .replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, '')
    .replace(/\n\s*<\/head>/, `\n${tags}\n  </head>`)
}

/** Every page's HTML file, built from the app shell (the built index.html). */
export function staticPages(site: string, shell: string, pages = sitePages()): PageFile[] {
  const files = pages.flatMap((page) =>
    LANGS.map((lang) => {
      const path = prefixedPath(localePrefixes[lang], page)
      const fileName = path === '/' ? 'index.html' : `${path.slice(1)}/index.html`
      return { fileName, html: withHead(shell, lang, headTags(site, headFor(page, lang), lang, page)) }
    }),
  )
  files.push({ fileName: '404.html', html: withHead(shell, 'en', headTags(site, notFoundHead(en), 'en', null)) })
  return files
}

export function pages(site: string): Plugin {
  return {
    name: 'pages',
    apply: 'build',
    // After Vite has written index.html into the bundle.
    enforce: 'post',
    generateBundle(_options, bundle) {
      const shell = bundle['index.html']
      if (shell?.type !== 'asset') return this.error('pages: the build has no index.html to copy')
      for (const file of staticPages(site, String(shell.source))) {
        if (file.fileName === 'index.html') shell.source = file.html
        else this.emitFile({ type: 'asset', fileName: file.fileName, source: file.html })
      }
    },
  }
}
