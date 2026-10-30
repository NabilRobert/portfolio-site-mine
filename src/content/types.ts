import type { z } from 'zod'
import type en from './locales/en'
import type { categories, localePrefixes, statuses } from './constants'
import type { projectFrontMatter } from './schema'

/** Interface strings: every locale must have exactly the shape of English. */
export type LocaleStrings = typeof en

export type LocaleCode = keyof typeof localePrefixes

export interface Locale {
  /** Route prefix: '' for the default locale, '/ja' and so on for others. */
  prefix: string
  /** Label in the language switch. */
  label: string
  strings: LocaleStrings
}

export type Category = (typeof categories)[number]
export type ProjectStatus = (typeof statuses)[number]

/** A project as written in its Markdown front matter: inferred from the schema in schema.ts. */
export type ProjectFrontMatter = z.output<typeof projectFrontMatter>
export type ProjectLink = ProjectFrontMatter['links'][number]
export type ProjectScreenshot = NonNullable<ProjectFrontMatter['screenshots']>[number]
export type KeyEntry = NonNullable<ProjectScreenshot['terms']>[number]

/**
 * The two parts each project Markdown file is imported as. build/markdown.ts
 * produces them; src/content/index.ts imports them with `?frontmatter` and
 * `?details`.
 */
/** What cards and headings need: the checked front matter, without the tour. */
export type FrontMatterPart = Omit<ProjectFrontMatter, 'screenshots'>
/** What only the project's own page shows: the write-up as HTML, and the tour as written. */
export interface DetailsPart {
  html: string
  screenshots: ProjectScreenshot[]
}

/** A project ready for display in one locale. */
export interface Project {
  slug: string
  title: string
  summary: string
  category: Category
  order: number
  featured: boolean
  draft: boolean
  status: ProjectStatus | ''
  stack: string
  links: ProjectLink[]
  cover: string | null
  /** '' when the cover is decorative, such as a typographic placeholder. */
  coverAlt: string
}

/** One stop on a project's tour. `src` and `still` are built URLs; `narrow` is the phone-width version (<name>-narrow.*), or ''. */
export type TourScreenshot = Required<ProjectScreenshot> & { narrow: string }

/** What only a project's own page shows, fetched when that page opens. */
export interface ProjectDetails {
  /** The write-up as HTML. */
  html: string
  screenshots: TourScreenshot[]
}

export interface Profile {
  /** The site's own address, without a trailing slash: used for canonical links and the sitemap. */
  site: string
  github: string
  email: string
  linkedin: string
  cv: string
}
