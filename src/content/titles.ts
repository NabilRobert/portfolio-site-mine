// Splitting a project's title into its name and the rest. Kept free of Vite
// so the build (build/pages.ts) can use it as well as the site.

/**
 * "MCP-backbone: a database server..." -> { name: "MCP-backbone", rest: "a database server..." }.
 * Splits at the first colon, Latin or Japanese; `rest` is '' when there is none.
 */
export function splitTitle(title: string): { name: string; rest: string } {
  const at = title.search(/[:：]/)
  if (at < 0) return { name: title.trim(), rest: '' }
  return { name: title.slice(0, at).trim() || title, rest: title.slice(at + 1).trim() }
}

/** "MCP-backbone: a database server..." -> "MCP-backbone": a project's short name. */
export function shortTitle(title: string): string {
  return splitTitle(title).name
}
