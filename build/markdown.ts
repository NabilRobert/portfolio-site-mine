// Turns content Markdown into data at build time, so the front-matter and
// Markdown parsers and the schema validator never ship to the browser. A
// project file is checked against the schema (src/content/schema.ts) and
// becomes `export default { data, html }`; a file that doesn't match fails
// the build with the file's path and what is wrong.
import matter from 'gray-matter'
import { marked } from 'marked'
import { z } from 'zod'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import type { Plugin } from 'vite'
import { projectFrontMatter } from '../src/content/schema.ts'

export interface ParsedMarkdown {
  data: Record<string, unknown>
  html: string
}

export function parseMarkdown(raw: string): ParsedMarkdown {
  if (!matter.test(raw)) throw new Error('missing YAML front matter')
  const { data, content } = matter(raw)
  return { data, html: marked.parse(content.trim(), { async: false }) }
}

const PROJECT_FILE = /[\\/]src[\\/]content[\\/]projects[\\/][^\\/]+[\\/][^\\/]+$/
const PROJECT_TEXT = /[\\/]src[\\/]content[\\/]projects[\\/][^\\/]+[\\/][a-z]{2}\.md$/
const DRAFT_STUB = `export default ${JSON.stringify({ data: { draft: true }, html: '' })}`

export function markdownContent(): Plugin {
  return {
    name: 'markdown-content',
    transform(code, id) {
      if (!id.endsWith('.md') || code === DRAFT_STUB) return null
      try {
        const parsed = parseMarkdown(code)
        if (PROJECT_TEXT.test(id)) {
          const result = projectFrontMatter.safeParse(parsed.data)
          if (!result.success) throw new Error(z.prettifyError(result.error))
        }
        return { code: `export default ${JSON.stringify(parsed)}`, map: null }
      } catch (err) {
        this.error(`${id}: ${(err as Error).message}`)
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
      return file.endsWith('.md') ? DRAFT_STUB : "export default ''"
    },
  }
}
