// Writes sitemap.xml and robots.txt into the production build. The sitemap
// has every page in every language, each entry listing its versions in the
// other languages. The pages come from the project folders, so a new project
// is listed without editing anything here; drafts are left out, as they are
// from the build.
// Plain code rather than a sitemap plugin: a plugin would still need this
// list of pages, which is most of the work.
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import type { Plugin } from 'vite'
import { localePrefixes, prefixedPath } from '../src/content/constants.ts'
import { isDraftProject } from './markdown.ts'

const PROJECTS = join(import.meta.dirname, '../src/content/projects')

/** The slugs of the projects a production build publishes. */
export function publishedSlugs(projectsDir = PROJECTS): string[] {
  return readdirSync(projectsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !isDraftProject(join(projectsDir, entry.name)))
    .map((entry) => entry.name)
    .sort()
}

/** The sitemap for these pages (paths as in English: '/', '/projects', …) on this site. */
export function sitemapXml(site: string, pages: string[]): string {
  const prefixes = Object.entries(localePrefixes)
  const urls = pages.flatMap((page) =>
    prefixes.map(([, prefix]) => {
      const alternates = prefixes.map(
        ([lang, other]) =>
          `    <xhtml:link rel="alternate" hreflang="${lang}" href="${site}${prefixedPath(other, page)}"/>`,
      )
      return [`  <url>`, `    <loc>${site}${prefixedPath(prefix, page)}</loc>`, ...alternates, `  </url>`].join('\n')
    }),
  )
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
}

/** Lets every crawler in, and points it to the sitemap. */
export function robotsTxt(site: string): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`
}

export function sitemap(site: string): Plugin {
  return {
    name: 'sitemap',
    apply: 'build',
    generateBundle() {
      const pages = ['/', '/projects', ...publishedSlugs().map((slug) => `/projects/${slug}`)]
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml(site, pages) })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt(site) })
    },
  }
}
