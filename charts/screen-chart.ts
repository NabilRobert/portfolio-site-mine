// How much of the attack text the gateway's screen catches, on the attacks its
// rules were written from and on unseen ones. Data: the "Held-out test split"
// table and dev numbers in mcp-security-gateway README.md, and eval/results/
// *.json, on main (commit 414c755). Recall on injected samples; the false-
// positive rate is the share of benign samples wrongly flagged.
import type { TopLevelSpec } from 'vega-lite'
import { C, chartFrame, innerWidth, rowHeader, splitLines, wrapLabel } from './theme.ts'
import type { Lang, RowLayer, Size } from './theme.ts'
import { T } from './screen-chart.text.ts'
import type { RowId, Strings } from './screen-chart.text.ts'

export const slug = 'mcp-security-gateway'
export const name = 'screen-chart'

// [id, share caught (%), share of normal outputs wrongly blocked (%), practice set]
type Row = [id: RowId, caught: number, wronglyBlocked: number, isPracticeSet: boolean]

const rows: Row[] = [
  ['rules-practice', 100, 0.0, true],
  ['rules-unseen', 14.6, 0.0, false],
  ['model-unseen', 49.7, 1.2, false],
]

const percent = (v: number, dec: string, digits: number) => `${v.toFixed(digits).replace('.', dec)}%`

// Room right of the longest bar for its value label, in pixels.
const VALUE_LABEL_ROOM = 60
// Width of a legend entry's symbol and the gap after it, in pixels.
const LEGEND_SYMBOL_ROOM = 32

/** Sizes and shared encodings for one language at one width. */
interface Layout {
  t: Strings
  size: Size
  width: number
  isNarrow: boolean
  headerSize: number
  legendSize: number
  /** The legend's two entries, wrapped to fit. */
  practice: string
  test: string
}

function layoutFor(lang: Lang, size: Size): Layout {
  const t = T[lang]
  const width = innerWidth(size)
  const legendSize = size.textSize + 1
  return {
    t,
    size,
    width,
    isNarrow: size.name === 'narrow',
    headerSize: size.name === 'narrow' ? 15 : 16.5,
    legendSize,
    practice: wrapLabel(t.practice, width - LEGEND_SYMBOL_ROOM, legendSize),
    test: wrapLabel(t.test, width - LEGEND_SYMBOL_ROOM, legendSize),
  }
}

// The scale runs past 100% so a full bar still has room for its label.
const xScale = (l: Layout) => ({
  type: 'quantitative' as const,
  scale: { domain: [0, (100 * l.width) / (l.width - VALUE_LABEL_ROOM)], nice: false },
})
const setEncoding = (l: Layout) => ({
  field: 'set',
  type: 'nominal' as const,
  scale: { domain: [l.practice, l.test] },
})

function rowValues(l: Layout) {
  return rows.map(([id, caught, wronglyBlocked, isPracticeSet], order) => ({
    label: wrapLabel(l.t.rows[id], l.width, l.headerSize),
    order,
    caught,
    set: isPracticeSet ? l.practice : l.test,
    value: percent(caught, l.t.dec, caught === 100 ? 0 : 1),
    fp: l.t.fp(percent(wronglyBlocked, l.t.dec, 1)),
  }))
}

/** The bar: outlined for the practice set, filled for unseen attacks. */
function barLayer(l: Layout): RowLayer {
  const set = setEncoding(l)
  const legend = {
    symbolType: 'square',
    symbolSize: 260,
    symbolStrokeWidth: 3,
    direction: 'vertical' as const,
    rowPadding: 8,
    labelFontSize: l.legendSize,
    labelExpr: splitLines,
  }
  const axis = {
    values: [0, 25, 50, 75, 100],
    title: l.t.axis,
    grid: false,
    labelExpr: "datum.value + '%'",
    labelFontSize: l.size.textSize,
  }
  return {
    mark: { type: 'bar', height: 26, strokeWidth: 3, strokeOffset: -1.5, cornerRadiusEnd: 2 },
    encoding: {
      x: { ...xScale(l), field: 'caught', axis },
      y: { value: 14 },
      fill: { ...set, scale: { ...set.scale, range: [C.ink, C.blue] }, legend },
      stroke: { ...set, scale: { ...set.scale, range: [C.blue, C.blue] } },
    },
  }
}

/** The share caught, just right of the bar. */
function valueLayer(l: Layout): RowLayer {
  return {
    mark: {
      type: 'text',
      align: 'left',
      baseline: 'middle',
      dx: 10,
      fontSize: l.isNarrow ? 15 : 17,
      fontWeight: 'bold',
    },
    encoding: { x: { ...xScale(l), field: 'caught' }, y: { value: 14 }, text: { field: 'value' } },
  }
}

/** The share of normal outputs wrongly blocked, under the bar. */
function wronglyBlockedLayer(l: Layout): RowLayer {
  return {
    mark: { type: 'text', align: 'left', baseline: 'middle', fontSize: l.size.textSize, color: C.skin },
    encoding: { x: { value: 0 }, y: { value: 48 }, text: { field: 'fp' } },
  }
}

export function spec(lang: Lang, size: Size): TopLevelSpec {
  const l = layoutFor(lang, size)
  return chartFrame(l.t, size, {
    data: { values: rowValues(l) },
    facet: { row: { field: 'label', sort: { field: 'order' }, header: rowHeader(l.headerSize, l.width) } },
    spacing: 22,
    spec: { width: l.width, height: 62, layer: [barLayer(l), valueLayer(l), wronglyBlockedLayer(l)] },
  })
}
