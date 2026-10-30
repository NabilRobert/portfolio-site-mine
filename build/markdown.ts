// Turns content Markdown into data at build time, so the front-matter and
// Markdown parsers and the schema validator never ship to the browser. A
// project file's front matter is checked against the schema
// (src/content/schema.ts); a file that doesn't match fails the build with the
// file's path and what is wrong.
//
// Straight quotes become typographic ones (Anna's -> Anna’s, "x" -> “x”) with
// SmartyPants: in the Markdown through its marked extension, which leaves code
// alone, and in the front matter's reader-facing text, which is not Markdown.
import matter from 'gray-matter'
import { Marked } from 'marked'
import { markedSmartypants } from 'marked-smartypants'
import { smartypantsu } from 'smartypants'
import { z } from 'zod'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import type { Plugin } from 'vite'
import { projectFrontMatter } from '../src/content/schema.ts'
import type { DetailsPart, FrontMatterPart, ProjectFrontMatter } from '../src/content/types.ts'

// SmartyPants preset 2: quotes, `--` as an en dash, `---` as an em dash, `...` as an ellipsis.
const SMARTYPANTS_PRESET = 2
const markdown = new Marked(markedSmartypants({ config: SMARTYPANTS_PRESET }))
const typeset = (text: string) => smartypantsu(text, SMARTYPANTS_PRESET)

export interface ParsedMarkdown {
  data: Record<string, unknown>
  html: string
}

export function parseMarkdown(raw: string): ParsedMarkdown {
  if (!matter.test(raw)) throw new Error('missing YAML front matter')
  const { data, content } = matter(raw)
  return { data, html: markdown.parse(content.trim(), { async: false }) }
}

/** The front matter with its reader-facing text typeset; links, file names and settings are left as they are. */
export function typesetFrontMatter(data: ProjectFrontMatter): ProjectFrontMatter {
  return {
    ...data,
    title: typeset(data.title),
    summary: typeset(data.summary),
    coverAlt: data.coverAlt === undefined ? undefined : typeset(data.coverAlt),
    links: data.links.map((link) => ({ ...link, label: typeset(link.label) })),
    screenshots: data.screenshots?.map((shot) => ({
      ...shot,
      alt: typeset(shot.alt),
      caption: shot.caption === undefined ? undefined : typeset(shot.caption),
      description: shot.description === undefined ? undefined : typeset(shot.description),
      terms: shot.terms?.map((entry) => ({ term: typeset(entry.term), meaning: typeset(entry.meaning) })),
    })),
  }
}

const PROJECT_FILE = /[\\/]src[\\/]content[\\/]projects[\\/][^\\/]+[\\/][^\\/]+$/
const PROJECT_TEXT = /[\\/]src[\\/]content[\\/]projects[\\/][^\\/]+[\\/][a-z]{2}\.md$/

// A content file is imported in two parts, so a page downloads only what it
// shows: `?frontmatter`, what cards and headings need (the checked, typeset
// front matter without the tour), and `?details`, what only the project's own
// page shows (the write-up as HTML and the tour), loaded when that page opens.
type Part = 'frontmatter' | 'details'
const DRAFT_STUBS: Record<Part, string> = {
  frontmatter: `export default ${JSON.stringify({ draft: true })}`,
  details: `export default ${JSON.stringify({ html: '', screenshots: [] })}`,
}
const EMPTY_IMAGE = "export default ''"

/** The Markdown file and the part of it an import asks for, or null for anything else. */
function markdownPart(id: string): { file: string; part: Part } | null {
  const [file = '', query = ''] = id.split('?')
  if (!file.endsWith('.md') || (query !== 'frontmatter' && query !== 'details')) return null
  return { file, part: query }
}

/** A project file's front matter, checked against the schema and typeset. */
function checkedFrontMatter(file: string, data: Record<string, unknown>): ProjectFrontMatter {
  if (!PROJECT_TEXT.test(file))
    throw new Error('only a project file (projects/<slug>/<lang>.md) can be imported in parts')
  const result = projectFrontMatter.safeParse(data)
  if (!result.success) throw new Error(z.prettifyError(result.error))
  return typesetFrontMatter(result.data)
}

/** The value one part of a project file exports (the types are shared with src/content/index.ts). */
function partValue(part: Part, file: string, raw: string): FrontMatterPart | DetailsPart {
  const { data, html } = parseMarkdown(raw)
  const { screenshots = [], ...frontMatter } = checkedFrontMatter(file, data)
  return part === 'details' ? { html, screenshots } : frontMatter
}

export function markdownContent(): Plugin {
  return {
    name: 'markdown-content',
    transform(code, id) {
      const target = markdownPart(id)
      if (!target || code === DRAFT_STUBS[target.part]) return null
      try {
        return { code: `export default ${JSON.stringify(partValue(target.part, target.file, code))}`, map: null }
      } catch (err) {
        this.error(`${target.file}: ${(err as Error).message}`)
      }
    },
  }
}

/** Whether a project folder's English file marks it `draft: true`. */
export function isDraftProject(dir: string): boolean {
  try {
    return parseMarkdown(readFileSync(join(dir, 'en.md'), 'utf8')).data.draft === true
  } catch {
    return false
  }
}

// Keeps draft projects out of production builds entirely. Their Markdown
// becomes an empty draft stub (which the content loader skips) and their
// images become empty URLs, so no text, figure or image of a draft reaches
// dist/. The dev server and tests are unaffected, so drafts can be previewed.
export function draftContent(): Plugin {
  return {
    name: 'draft-content',
    apply: 'build',
    enforce: 'pre',
    load(id) {
      const file = id.split('?')[0] ?? id
      if (!PROJECT_FILE.test(file) || !isDraftProject(dirname(file))) return null
      const target = markdownPart(id)
      return target ? DRAFT_STUBS[target.part] : EMPTY_IMAGE
    },
  }
}
