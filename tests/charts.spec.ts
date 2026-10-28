// @vitest-environment node
// The result charts are committed as SVG files drawn by charts/*.ts. This keeps
// them in step: change a chart's data, words or style without re-running
// `npm run charts`, and the file it would draw no longer matches.
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { charts, langs, outPath, render } from '../charts/render'
import { measure } from '../charts/text-width'

describe.each(charts)('$slug/$name', (chart) => {
  it.each(langs)('the committed %s SVG matches what the script draws', async (lang) => {
    const committed = readFileSync(outPath(chart, lang), 'utf8')
    expect(committed === (await render(chart, lang)), 'run npm run charts').toBe(true)
  })

  it.each(langs)('the %s chart is 640 px wide, the width of the page column', async (lang) => {
    expect(await render(chart, lang)).toMatch(/^<svg[^>]* width="640"/)
  })
})

describe('text widths', () => {
  it('follow Helvetica: an "i" is narrower than an "m"', () => {
    expect(measure('i', 16)).toBeLessThan(measure('m', 16))
  })

  it('count Japanese characters as one em each', () => {
    expect(measure('検査', 10)).toBe(20)
  })

  it('make bold text wider than regular', () => {
    expect(measure('Stopped', 15, true)).toBeGreaterThan(measure('Stopped', 15))
  })
})
