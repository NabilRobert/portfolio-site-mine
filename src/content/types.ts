import type en from './locales/en'

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

export const categories = ['portfolio', 'opensource', 'other'] as const
export type Category = (typeof categories)[number]

export type ProjectStatus = keyof LocaleStrings['status']

/** A screenshot as written in the front matter: `src` is a file in the project's folder. */
export interface ProjectScreenshot {
  src: string
  /** For an animation: a still frame, shown instead when the visitor prefers reduced motion. */
  still?: string
  alt: string
  caption?: string
}

export interface ProjectLink {
  label: string
  href: string
  primary?: boolean
}

/** A project as written in its Markdown front matter. */
export interface ProjectFrontMatter {
  title: string
  summary: string
  category: Category
  order: number
  featured?: boolean
  status?: ProjectStatus
  stack?: string
  links: ProjectLink[]
  /** Describes the cover for screen readers, when it shows something real (a screenshot, a chart). */
  coverAlt?: string
  /** Shown on the project's page, after the write-up. The same files in every language. */
  screenshots?: ProjectScreenshot[]
}

/** A project ready for display in one locale. */
export interface Project {
  slug: string
  title: string
  summary: string
  category: Category
  order: number
  featured: boolean
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
