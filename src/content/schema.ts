// The shape of a project's front matter, checked at build time by
// build/markdown.ts (and in the content tests). The site imports only the
// types inferred from it (see types.ts), so Zod never reaches the browser.
import { z } from 'zod'
import { categories, statuses } from './constants.ts'

const link = z.strictObject({
  label: z.string().min(1),
  href: z.string().startsWith('https://', 'links must use https://'),
  primary: z.boolean().optional(),
})

/** What one term, number or colour in a picture means, shown beside it. */
const keyEntry = z.strictObject({
  term: z.string().min(1),
  meaning: z.string().min(1),
})

/** A screenshot or chart on the project's guided tour. `src` is a file in the project's folder. */
const screenshot = z.strictObject({
  src: z.string().min(1),
  /** For an animation: a still frame, shown instead when the visitor prefers reduced motion. */
  still: z.string().min(1).optional(),
  alt: z.string().min(1),
  /** The stop's title on the guided tour. */
  caption: z.string().optional(),
  /** What the reader is looking at, as a short walk-through; paragraphs separated by a blank line. */
  description: z.string().optional(),
  terms: z.array(keyEntry).optional(),
})

export const projectFrontMatter = z.strictObject({
  title: z.string().min(1),
  summary: z.string().min(1),
  category: z.enum(categories),
  order: z.number().int(),
  featured: z.boolean().optional(),
  /** Shown in the dev preview, left out of production builds: for work not ready to publish. */
  draft: z.boolean().optional(),
  status: z.enum(statuses).optional(),
  stack: z.string().optional(),
  /** Describes the cover for screen readers, when it shows something real (a screenshot, a chart). */
  coverAlt: z.string().optional(),
  links: z.array(link).min(1, 'at least one link'),
  /** Shown on the project's page, after the write-up. The same files in every language. */
  screenshots: z.array(screenshot).optional(),
})
