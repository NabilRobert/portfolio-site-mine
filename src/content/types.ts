import type { z } from 'zod'
import type en from './locales/en'
import type { categories, statuses } from './constants'
import type { projectFrontMatter } from './schema'

/** Interface strings: every locale must have exactly the shape of English. */
export type LocaleStrings = typeof en

export type LocaleCode = 'en' | 'ja' | 'id'

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
  /** `src` is the built URL here. */
  screenshots: Required<ProjectScreenshot>[]
  html: string
}

export interface Profile {
  github: string
  email: string
  linkedin: string
  cv: string
}
