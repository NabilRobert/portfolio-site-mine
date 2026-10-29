// How much of the attack text the gateway's screen catches, on the attacks its
// rules were written from and on unseen ones. Data: the "Held-out test split"
// table and dev numbers in mcp-security-gateway README.md, and eval/results/
// *.json, on main (commit 414c755). Recall on injected samples; the false-
// positive rate is the share of benign samples wrongly flagged.
import type { TopLevelSpec } from 'vega-lite'
import { C, chartFrame, innerWidth, rowHeader, splitLines, wrapLabel } from './theme.ts'
import type { Lang, RowLayer, Size } from './theme.ts'

export const slug = 'mcp-security-gateway'
export const name = 'screen-chart'

// [id, share caught (%), share of normal outputs wrongly blocked (%), practice set]
type RowId = 'rules-practice' | 'rules-unseen' | 'model-unseen'
type Row = [id: RowId, caught: number, wronglyBlocked: number, isPracticeSet: boolean]

interface Strings {
  title: string
  sub: string
  practice: string
  test: string
  dec: string
  rows: Record<RowId, string>
  fp: (share: string) => string
  axis: string
  /** One paragraph; it is wrapped to the chart's width. */
  notes: string
  source: string
}

const rows: Row[] = [
  ['rules-practice', 100, 0.0, true],
  ['rules-unseen', 14.6, 0.0, false],
  ['model-unseen', 49.7, 1.2, false],
]

const T: Record<Lang, Strings> = {
  en: {
    title: 'How much of the attack text the screen catches',
    sub: 'Share of attacks caught, on attacks the rules were written from and on unseen ones',
    practice: 'Practice set (the rules were written from it)',
    test: 'Unseen test set (632 attacks)',
    dec: '.',
    rows: {
      'rules-practice': 'Pattern rules, practice set',
      'rules-unseen': 'Pattern rules, unseen attacks',
      'model-unseen': 'Rules + AI classifier, unseen attacks',
    },
    fp: (v) => `Normal outputs wrongly blocked: ${v}`,
    axis: 'Attacks caught',
    notes: 'The practice score is flattering by design; the unseen score is the honest one.',
    source: 'Source: README.md and eval/results in mcp-security-gateway.',
  },
  ja: {
    title: '検査は攻撃文をどれだけ見抜けるか',
    sub: '攻撃を検出できた割合。ルール作成に使った攻撃と、未知の攻撃のそれぞれについて',
    practice: '練習用セット（ルールの作成に使用）',
    test: '未知のテストセット（攻撃632件）',
    dec: '.',
    rows: {
      'rules-practice': 'パターンルール、練習用セット',
      'rules-unseen': 'パターンルール、未知の攻撃',
      'model-unseen': 'ルール＋AI分類器、未知の攻撃',
    },
    fp: (v) => `正常な出力を誤って遮断した割合：${v}`,
    axis: '検出できた攻撃の割合',
    notes: '練習用セットの数値は構造上よく見えるものであり、実力を示すのは未知の攻撃での数値です。',
    source: '出典：mcp-security-gatewayのREADME.mdおよびeval/results',
  },
  id: {
    title: 'Seberapa banyak teks serangan yang tertangkap',
    sub: 'Proporsi serangan yang terdeteksi, pada serangan sumber aturan dan pada serangan baru',
    practice: 'Set latihan (sumber penyusunan aturan)',
    test: 'Set uji yang belum pernah dilihat (632 serangan)',
    dec: ',',
    rows: {
      'rules-practice': 'Aturan pola, set latihan',
      'rules-unseen': 'Aturan pola, serangan baru',
      'model-unseen': 'Aturan + pengklasifikasi AI, serangan baru',
    },
    fp: (v) => `Keluaran normal yang keliru diblokir: ${v}`,
    axis: 'Serangan yang terdeteksi',
    notes: 'Skor set latihan memang tampak bagus; skor yang jujur adalah skor pada serangan baru.',
    source: 'Sumber: README.md dan eval/results di mcp-security-gateway.',
  },
}

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
