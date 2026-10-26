import type en from './locales/en'

/** Interface strings: every locale must have exactly the shape of English. */
export type LocaleStrings = typeof en

export type LocaleCode = 'en' | 'ja' | 'id'

export interface Locale {
  /** Route prefix: '' for the default locale, '/ja' and so on for others. */
  prefix: string
  /** Label in the taskbar's language switch. */
  label: string
  strings: LocaleStrings
}

export const categories = ['portfolio', 'opensource', 'other'] as const
export type Category = (typeof categories)[number]

export type ProjectStatus = keyof LocaleStrings['status']

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
  html: string
}

export interface Profile {
  github: string
  email: string
  linkedin: string
  cv: string
}
