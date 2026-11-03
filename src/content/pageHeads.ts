// Each kind of page's title and description, in one place. The views set
// them in the browser (usePageHead), and the build writes them into each
// page's HTML (build/pages.ts), so a link preview and the open page agree.
import { shortTitle } from './titles.ts'
import type { LocaleCode, LocaleStrings } from './types.ts'

export interface PageHead {
  title: string
  description: string
  /** false for pages search engines should skip, such as "not found". */
  indexable?: boolean
}

/** The language tags link previews (Open Graph) expect. */
export const OG_LOCALES: Record<LocaleCode, string> = { en: 'en_US', ja: 'ja_JP', id: 'id_ID' }

export const homeHead = (t: LocaleStrings): PageHead => ({ title: t.meta.title, description: t.meta.description })

export const projectsHead = (t: LocaleStrings): PageHead => ({
  title: `${t.projectsPage.heading} | ${t.meta.title}`,
  description: t.projectsPage.lead,
})

export const projectHead = (t: LocaleStrings, project: { title: string; summary: string }): PageHead => ({
  title: `${shortTitle(project.title)} | ${t.meta.title}`,
  description: project.summary,
})

export const notFoundHead = (t: LocaleStrings, description = t.notFound.text): PageHead => ({
  title: `${t.notFound.heading} | ${t.meta.title}`,
  description,
  indexable: false,
})
