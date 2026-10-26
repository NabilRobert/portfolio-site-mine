// Turns content Markdown into data at build time, so the YAML and Markdown
// parsers never ship to the browser. A project file becomes
// `export default { data, html }`.
import { parse as parseYaml } from 'yaml'
import { marked } from 'marked'

const FRONT_MATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

export function parseMarkdown(raw) {
  const match = FRONT_MATTER.exec(raw)
  if (!match) throw new Error('missing YAML front matter')
  return { data: parseYaml(match[1]) ?? {}, html: marked.parse(match[2].trim()) }
}

export function markdownContent() {
  return {
    name: 'markdown-content',
    transform(code, id) {
      if (!id.endsWith('.md')) return null
      try {
        return { code: `export default ${JSON.stringify(parseMarkdown(code))}`, map: null }
      } catch (err) {
        this.error(`${id}: ${err.message}`)
      }
    },
  }
}
