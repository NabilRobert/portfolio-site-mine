// @vitest-environment node
// The result charts are committed as SVG files drawn by charts/*.ts. This keeps
// them in step: change a chart's data, words or style without re-running
// `npm run charts`, and the file it would draw no longer matches.
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { charts, langs, outPath, render } from '../charts/render'
import { sizes } from '../charts/theme'
import { measure, wrap } from '../charts/text-width'

const cases = charts.flatMap((chart) =>
  sizes.map((size) => ({ chart, size, label: `${chart.slug}/${chart.name}, ${size.name}` })),
)

describe.each(cases)('$label', ({ chart, size }) => {
  it.each(langs)('the committed %s SVG matches what the script draws', async (lang) => {
    const committed = readFileSync(outPath(chart, lang, size), 'utf8')
    expect(committed === (await render(chart, lang, size)), 'run npm run charts').toBe(true)
  })

  it.each(langs)('the %s chart keeps to its width, so nothing runs off the edge', async (lang) => {
    expect(await render(chart, lang, size)).toMatch(new RegExp(`^<svg[^>]* width="${size.width}"`))
  })
})

describe('text widths', () => {
  it('follow Helvetica: an "i" is narrower than an "m"', () => {
    expect(measure('i', 16)).toBeLessThan(measure('m', 16))
  })

  it('wrap Japanese without starting a line on a closing mark or small kana', () => {
    for (const line of wrap('バー全体が0より左にある場合にのみ、回帰と判定します。ファイルシステム', 80, 14).slice(1))
      expect(line.charAt(0)).not.toMatch(/[、。）ッャュョ]/)
  })

  it('wrap Latin text between words', () => {
    expect(wrap('Twelve planted attacks, three set-ups', 150, 14)).toEqual(['Twelve planted attacks,', 'three set-ups'])
  })

  it('count Japanese characters as one em each', () => {
    expect(measure('検査', 10)).toBe(20)
  })

  it('make bold text wider than regular', () => {
    expect(measure('Stopped', 15, true)).toBeGreaterThan(measure('Stopped', 15))
  })
})
