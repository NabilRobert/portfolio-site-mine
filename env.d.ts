/// <reference types="vite/client" />

// Content Markdown is parsed at build time by build/markdown.ts.
declare module '*.md' {
  const content: { data: Record<string, unknown>; html: string }
  export default content
}
