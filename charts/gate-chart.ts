// The regression gate's eight published comparisons, grouped by what the gate
// should have done. Data: agent-eval-harness RESULTS.md, "Comparisons (the
// regression gate)" table, on main (last changed in 59cdbcb). Points are the
// change in strict pass rate; the interval is its 95% interval.
import type { TopLevelSpec } from 'vega-lite'
import { measure, wrap } from './text-width.ts'
import { C, chartFrame, innerWidth, splitLines, wrapLabel } from './theme.ts'
import type { Lang, RowLayer, Size } from './theme.ts'
import { T } from './gate-chart.text.ts'
import type { RowId, Group, Outcome, Strings } from './gate-chart.text.ts'

export const slug = 'agent-eval-harness'
export const name = 'gate-chart'

type Row = [id: RowId, group: Group, change: number, low: number, high: number, flagged: boolean, outcome: Outcome]

const rows: Row[] = [
  ['db-aa', 'quiet', 0.5, -3.0, 4.5, false, 'quiet'],
  ['fs-aa', 'quiet', 0.0, -3.5, 3.5, false, 'quiet'],
  ['fs-discovery', 'worse', -61.2, -82.4, -37.6, true, 'caught'],
  ['fs-cap', 'worse', -20.0, -34.1, -7.1, true, 'caught'],
  ['db-schema', 'worse', -3.0, -9.5, 2.5, false, 'missed'],
  ['db-nano', 'worse', -4.5, -10.0, 0.5, false, 'missed'],
  ['db-prompt', 'worse', -2.5, -7.5, 2.0, false, 'missed'],
  ['fs-nano', 'none', -20.0, -35.3, -7.1, true, 'flagged'],
]

const fmt = (v: number, dec: string) => (v > 0 ? '+' : v < 0 ? '−' : '±') + Math.abs(v).toFixed(1).replace('.', dec)
const groupOrder: Group[] = ['quiet', 'worse', 'none']

const HEADER_SIZE = 13.5
const X = { type: 'quantitative' as const, scale: { domain: [-85, 10], nice: false } }
const Y = { y: { field: 'label', type: 'nominal' as const, sort: { field: 'order' }, axis: null } }

/** Sizes for one language at one width. */
interface Layout {
  t: Strings
  size: Size
  width: number
  isNarrow: boolean
  labelSize: number
  valueSize: number
  labelLineHeight: number
}

function layoutFor(lang: Lang, size: Size): Layout {
  const isNarrow = size.name === 'narrow'
  const labelSize = isNarrow ? 14 : 16
  return {
    t: T[lang],
    size,
    width: innerWidth(size),
    isNarrow,
    labelSize,
    valueSize: isNarrow ? 13 : 15,
    labelLineHeight: labelSize + 3,
  }
}

function rowValues(l: Layout) {
  const { t } = l
  // A row's label shares its line with the verdict, so it wraps short of it.
  const labelLines = (label: string, verdict: string) =>
    wrap(label, l.width - measure(verdict, l.valueSize, true) - 12, l.labelSize)
  return rows.map(([id, group, d, lo, hi, flagged, outcome], order) => ({
    order,
    group: wrapLabel(t.groups[group].toUpperCase(), l.width, HEADER_SIZE, true),
    gorder: groupOrder.indexOf(group),
    label: t.rows[id],
    labelText: labelLines(t.rows[id], t.outcome[outcome]).join('\n'),
    labelLineCount: labelLines(t.rows[id], t.outcome[outcome]).length,
    d,
    lo,
    hi,
    gate: flagged ? t.flag : t.pass,
    outcome: t.outcome[outcome],
    missed: outcome === 'missed',
    value: fmt(d, t.dec),
    side: lo < -70 ? 'right' : 'left',
  }))
}

const xAxis = (l: Layout) => ({
  values: [-80, -60, -40, -20, 0],
  title: wrap(l.t.axis, l.width, l.size.textSize),
  titleFontSize: l.size.textSize,
  labelFontSize: l.size.textSize,
  grid: true,
  labelExpr: "datum.value === 0 ? '0' : '−' + abs(datum.value)",
})

/** The zero line, per row, starting below the verdict so it never runs through the words. */
function zeroLineLayer(l: Layout): RowLayer {
  return {
    mark: { type: 'rule', color: C.cream, strokeWidth: 1.5 },
    encoding: {
      ...Y,
      y: { ...Y.y, bandPosition: 0.35 },
      y2: { field: 'label', bandPosition: 1 },
      x: { ...X, datum: 0, axis: xAxis(l) },
    },
  }
}

/** The 95% interval, coloured by the gate's verdict. */
function intervalLayer(l: Layout): RowLayer {
  const legend = {
    symbolType: 'stroke',
    symbolSize: 400,
    symbolStrokeWidth: 6,
    direction: l.isNarrow ? ('vertical' as const) : ('horizontal' as const),
    labelFontSize: l.size.textSize + 1,
  }
  return {
    mark: { type: 'rule', strokeWidth: 6, strokeCap: 'round' },
    encoding: {
      ...Y,
      x: { ...X, field: 'lo', axis: xAxis(l) },
      x2: { field: 'hi' },
      color: {
        field: 'gate',
        type: 'nominal',
        scale: { domain: [l.t.flag, l.t.pass], range: [C.red, C.blue] },
        legend,
      },
    },
  }
}

/** The change itself: a filled red dot when flagged, an outlined blue one when not. */
function pointLayers(l: Layout): RowLayer[] {
  const flagged = `datum.gate === '${l.t.flag}'`
  return [
    {
      transform: [{ filter: flagged }],
      mark: { type: 'point', filled: true, size: 220, color: C.red, stroke: C.ink, strokeWidth: 2, opacity: 1 },
      encoding: { ...Y, x: { ...X, field: 'd' } },
    },
    {
      transform: [{ filter: `!(${flagged})` }],
      mark: { type: 'point', filled: true, size: 170, fill: C.ink, stroke: C.blue, strokeWidth: 3, opacity: 1 },
      encoding: { ...Y, x: { ...X, field: 'd' } },
    },
  ]
}

/** The change as a number, beside its interval: left of it, or right where the left is full. */
function valueLayers(l: Layout): RowLayer[] {
  const text = { type: 'text' as const, fontSize: l.valueSize, fontWeight: 'bold' as const }
  return [
    {
      transform: [{ filter: "datum.side === 'left'" }],
      mark: { ...text, align: 'right', dx: -14 },
      encoding: { ...Y, x: { ...X, field: 'lo' }, text: { field: 'value' } },
    },
    {
      transform: [{ filter: "datum.side === 'right'" }],
      mark: { ...text, align: 'left', dx: 14 },
      encoding: { ...Y, x: { ...X, field: 'hi' }, text: { field: 'value' } },
    },
  ]
}

/**
 * Row labels sit above their interval. Vega draws extra lines downwards, so a
 * label of n lines is lifted by n - 1 lines to keep its last line in place.
 */
function labelLayers(l: Layout, lineCounts: number[]): RowLayer[] {
  return [...new Set(lineCounts)].map((lineCount) => ({
    transform: [{ filter: `datum.labelLineCount === ${lineCount}` }],
    mark: {
      type: 'text' as const,
      align: 'left' as const,
      baseline: 'bottom' as const,
      dy: -14 - (lineCount - 1) * l.labelLineHeight,
      fontSize: l.labelSize,
      lineHeight: l.labelLineHeight,
      lineBreak: '\n',
    },
    encoding: { ...Y, x: { ...X, datum: -85 }, text: { field: 'labelText' } },
  }))
}

/** Whether the gate did what it should have, at the end of the label's line; a miss in yellow. */
function verdictLayer(l: Layout): RowLayer {
  return {
    mark: { type: 'text', align: 'right', baseline: 'bottom', dy: -14, fontSize: l.valueSize, fontWeight: 'bold' },
    encoding: {
      ...Y,
      x: { ...X, datum: 10 },
      text: { field: 'outcome' },
      color: { condition: { test: 'datum.missed', value: C.yellow }, value: C.cream },
    },
  }
}

export function spec(lang: Lang, size: Size): TopLevelSpec {
  const l = layoutFor(lang, size)
  const values = rowValues(l)
  const header = { labelExpr: splitLines, labelFontSize: HEADER_SIZE, labelLineHeight: 17, labelLimit: l.width }
  return chartFrame(l.t, size, {
    data: { values },
    facet: { row: { field: 'group', sort: { field: 'gorder' }, header } },
    spacing: 18,
    resolve: { scale: { y: 'independent' } },
    spec: {
      width: l.width,
      height: { step: l.isNarrow ? 72 : 60 },
      layer: [
        zeroLineLayer(l),
        intervalLayer(l),
        ...pointLayers(l),
        ...valueLayers(l),
        ...labelLayers(
          l,
          values.map((v) => v.labelLineCount),
        ),
        verdictLayer(l),
      ],
    },
  })
}
