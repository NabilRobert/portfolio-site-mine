// Text widths for Vega's layout when rendering without a browser. Vega's own
// fallback guesses 0.8 em per character, about half again too wide for
// Helvetica, which pads the charts and cuts legend labels short. Measuring with
// a real canvas (node-canvas) would depend on the fonts installed on each
// machine, so the committed SVGs would differ between a Mac and CI; a fixed
// table keeps them identical everywhere.
//
// Widths are Helvetica's published metrics (Adobe AFM, in 1/1000 em) for
// printable ASCII. Bold text is about 7% wider; Japanese and other full-width
// characters are 1 em; anything else (✓, −, ←) is counted as 0.6 em.

/** The fields of a Vega text mark that decide its width. */
interface TextItem {
  text?: string | string[]
  fontSize?: number
  fontWeight?: string | number
  limit?: number
}

const ASCII_FROM = 32
// prettier-ignore
const HELVETICA = [
  278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278, // space to /
  556, 556, 556, 556, 556, 556, 556, 556, 556, 556, // 0 to 9
  278, 278, 584, 584, 584, 556, 1015, // : to @
  667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, // A to M
  722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, // N to Z
  278, 278, 278, 469, 556, 333, // [ to `
  556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, // a to m
  556, 556, 556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, // n to z
  334, 260, 334, 584, // { to ~
]
const BOLD_FACTOR = 1.07
const FULL_WIDTH = 1000
const OTHER = 600
const FIRST_FULL_WIDTH = 0x2e80 // CJK radicals; kana, kanji and full-width forms follow

function charWidth(char: string): number {
  const code = char.codePointAt(0) ?? 0
  const ascii = HELVETICA[code - ASCII_FROM]
  if (ascii !== undefined) return ascii
  return code >= FIRST_FULL_WIDTH ? FULL_WIDTH : OTHER
}

/** Width in pixels of one line of text at the given size. */
export function measure(text: string, fontSize: number, bold = false): number {
  let units = 0
  for (const char of text) units += charWidth(char)
  return (units / 1000) * fontSize * (bold ? BOLD_FACTOR : 1)
}

/** A drop-in for vega.textMetrics.width: (item, line) => pixels. */
export function textWidth(item: TextItem, line?: string): number {
  const text = String(line ?? item.text ?? '').trim()
  const fontSize = item.fontSize ?? 11
  const bold = item.fontWeight === 'bold' || Number(item.fontWeight) >= 600
  const width = measure(text, fontSize, bold)
  // A label longer than its limit is drawn cut short with an ellipsis.
  return item.limit && item.limit > 0 ? Math.min(width, item.limit) : width
}
