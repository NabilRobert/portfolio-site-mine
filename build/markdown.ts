// Turns content Markdown into data at build time, so the YAML and Markdown
// parsers never ship to the browser. A project file becomes
// `export default { data, html }`.
import { parse as parseYaml } from 'yaml'
import { marked } from 'marked'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import type { Plugin } from 'vite'

const FRONT_MATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

export interface ParsedMarkdown {
  data: Record<string, unknown>
  html: string
}

export function parseMarkdown(raw: string): ParsedMarkdown {
  const match = FRONT_MATTER.exec(raw)
  if (!match) throw new Error('missing YAML front matter')
  const [, frontMatter = '', body = ''] = match
  return {
    data: (parseYaml(frontMatter) as Record<string, unknown> | null) ?? {},
    html: marked.parse(body.trim(), { async: false }),
  }
}

export function markdownContent(): Plugin {
  return {
    name: 'markdown-content',
    transform(code, id) {
      if (!id.endsWith('.md')) return null
      try {
        return { code: `export default ${JSON.stringify(parseMarkdown(code))}`, map: null }
      } catch (err) {
        this.error(`${id}: ${(err as Error).message}`)
      }
    },
  }
}

const PROJECT_FILE = /[\\/]src[\\/]content[\\/]projects[\\/][^\\/]+[\\/][^\\/]+$/

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
      return file.endsWith('.md') ? '---\ndraft: true\n---\n' : "export default ''"
    },
  }
}
