// Turns content Markdown into data at build time, so the YAML and Markdown
// parsers never ship to the browser. A project file becomes
// `export default { data, html }`.
import { parse as parseYaml } from 'yaml'
import { marked } from 'marked'
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
