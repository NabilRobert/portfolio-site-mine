// smartypants ships without type definitions (there is no @types package);
// this covers the one function build/markdown.ts uses. Listed in both
// tsconfig.node.json and tsconfig.app.json, since the tests import that file.
declare module 'smartypants' {
  /** Typographic punctuation as Unicode characters. `config` is a preset (-1 to 3) or a string of rule letters. */
  export function smartypantsu(text: string, config?: string | number): string
}
