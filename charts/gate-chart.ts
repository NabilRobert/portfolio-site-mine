// The regression gate's eight published comparisons, grouped by what the gate
// should have done. Data: agent-eval-harness RESULTS.md, "Comparisons (the
// regression gate)" table, on main (last changed in 59cdbcb). Points are the
// change in strict pass rate; the interval is its 95% interval.
import type { TopLevelSpec } from 'vega-lite'
import { measure, wrap } from './text-width.ts'
import { C, chartFrame, innerWidth, splitLines, wrapLabel } from './theme.ts'
import type { Lang, RowLayer, Size } from './theme.ts'

export const slug = 'agent-eval-harness'
export const name = 'gate-chart'

type RowId = 'db-aa' | 'fs-aa' | 'fs-discovery' | 'fs-cap' | 'db-schema' | 'db-nano' | 'db-prompt' | 'fs-nano'
/** What the gate should have done: stay quiet, flag a deliberate decline, or no expectation. */
type Group = 'quiet' | 'worse' | 'none'
type Outcome = 'quiet' | 'caught' | 'missed' | 'flagged'
type Row = [id: RowId, group: Group, change: number, low: number, high: number, flagged: boolean, outcome: Outcome]

interface Strings {
  title: string
  sub: string
  flag: string
  pass: string
  dec: string
  groups: Record<Group, string>
  rows: Record<RowId, string>
  outcome: Record<Outcome, string>
  axis: string
  /** One paragraph; it is wrapped to the chart's width. */
  notes: string
  source: string
}

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

const T: Record<Lang, Strings> = {
  en: {
    title: 'Did the regression gate make the right call?',
    sub: 'Change in strict pass rate (dot), with its 95% margin of error (bar)',
    flag: 'Flagged as a regression',
    pass: 'Not flagged',
    dec: '.',
    groups: {
      quiet: 'Nothing changed: the gate should stay quiet',
      worse: 'Made worse on purpose: the gate should flag it',
      none: 'No expectation set in advance',
    },
    rows: {
      'db-aa': 'Database: same agent, run twice',
      'fs-aa': 'Filesystem: same agent, run twice',
      'fs-discovery': 'Filesystem: discovery tools removed',
      'fs-cap': 'Filesystem: message cap cut from 20 to 12',
      'db-schema': 'Database: schema tools removed',
      'db-nano': 'Database: smaller model (gpt-5-nano)',
      'db-prompt': 'Database: one line removed from the prompt',
      'fs-nano': 'Filesystem: smaller model (gpt-5-nano)',
    },
    outcome: { quiet: '✓ stayed quiet', caught: '✓ caught', missed: '✗ missed', flagged: 'flagged' },
    axis: '← fewer attempts passed (percentage points) · 0 = no change',
    notes:
      'The gate flags a change only when its whole bar lies left of 0. A bar that crosses 0 could be chance, so it is not flagged.',
    source: 'Source: RESULTS.md in agent-eval-harness. Five attempts per task.',
  },
  ja: {
    title: '回帰ゲートの判定は正しかったか',
    sub: '厳密な合格率の変化（点）と、その95%の誤差の範囲（バー）',
    flag: '回帰と判定',
    pass: '判定なし',
    dec: '.',
    groups: {
      quiet: '何も変えていない：ゲートは反応しないべき',
      worse: '意図的に性能を下げた：ゲートは検出すべき',
      none: '事前の想定なし',
    },
    rows: {
      'db-aa': 'データベース：同じエージェントを2回実行',
      'fs-aa': 'ファイルシステム：同じエージェントを2回実行',
      'fs-discovery': 'ファイルシステム：探索用ツールを削除',
      'fs-cap': 'ファイルシステム：メッセージ上限を20から12に削減',
      'db-schema': 'データベース：スキーマ用ツールを削除',
      'db-nano': 'データベース：小型モデル（gpt-5-nano）',
      'db-prompt': 'データベース：プロンプトから1行を削除',
      'fs-nano': 'ファイルシステム：小型モデル（gpt-5-nano）',
    },
    outcome: { quiet: '✓ 反応なし', caught: '✓ 検出', missed: '✗ 見逃し', flagged: '回帰と判定' },
    axis: '← 合格した試行が減少（パーセントポイント）・0 = 変化なし',
    notes:
      'バー全体が0より左にある場合にのみ、回帰と判定します。バーが0をまたぐ場合、その変化は偶然の可能性があるため判定しません。',
    source: '出典：agent-eval-harnessのRESULTS.md。各タスク5回試行。',
  },
  id: {
    title: 'Apakah gerbang regresi memutuskan dengan tepat?',
    sub: 'Perubahan tingkat kelulusan ketat (titik), dengan rentang galat 95% (batang)',
    flag: 'Ditandai sebagai regresi',
    pass: 'Tidak ditandai',
    dec: ',',
    groups: {
      quiet: 'Tidak ada yang diubah: gerbang seharusnya diam',
      worse: 'Sengaja diperburuk: gerbang seharusnya menandai',
      none: 'Tanpa ekspektasi sebelumnya',
    },
    rows: {
      'db-aa': 'Basis data: agen yang sama, dua kali',
      'fs-aa': 'Sistem berkas: agen yang sama, dua kali',
      'fs-discovery': 'Sistem berkas: alat penemuan dihapus',
      'fs-cap': 'Sistem berkas: batas pesan dari 20 ke 12',
      'db-schema': 'Basis data: alat skema dihapus',
      'db-nano': 'Basis data: model lebih kecil (gpt-5-nano)',
      'db-prompt': 'Basis data: satu baris prompt dihapus',
      'fs-nano': 'Sistem berkas: model lebih kecil (gpt-5-nano)',
    },
    outcome: { quiet: '✓ tetap diam', caught: '✓ terdeteksi', missed: '✗ terlewat', flagged: 'ditandai' },
    axis: '← lebih sedikit percobaan yang lulus (poin persentase) · 0 = tidak berubah',
    notes:
      'Gerbang hanya menandai perubahan jika seluruh batangnya berada di kiri 0. Batang yang melewati 0 bisa jadi kebetulan, sehingga tidak ditandai.',
    source: 'Sumber: RESULTS.md di agent-eval-harness. Lima percobaan per tugas.',
  },
}

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
