// How much of the attack text the gateway's screen catches, on the attacks its
// rules were written from and on unseen ones. Data: the "Held-out test split"
// table and dev numbers in mcp-security-gateway README.md, and eval/results/
// *.json, on main (commit 414c755). Recall on injected samples; the false-
// positive rate is the share of benign samples wrongly flagged.
import type { TopLevelSpec } from 'vega-lite'
import { C, config, footnotes, heading, innerWidth, splitLines, wrapLabel } from './theme.ts'
import type { Lang, Size } from './theme.ts'

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

export function spec(lang: Lang, size: Size): TopLevelSpec {
  const t = T[lang]
  const width = innerWidth(size)
  const isNarrow = size.name === 'narrow'
  const headerSize = isNarrow ? 15 : 16.5
  const legendSize = size.textSize + 1
  const practice = wrapLabel(t.practice, width - LEGEND_SYMBOL_ROOM, legendSize)
  const test = wrapLabel(t.test, width - LEGEND_SYMBOL_ROOM, legendSize)
  const values = rows.map(([id, caught, wronglyBlocked, isPracticeSet], order) => ({
    label: wrapLabel(t.rows[id], width, headerSize),
    order,
    caught,
    set: isPracticeSet ? practice : test,
    value: percent(caught, t.dec, caught === 100 ? 0 : 1),
    fp: t.fp(percent(wronglyBlocked, t.dec, 1)),
  }))
  // The scale runs past 100% so a full bar still has room for its label.
  const x = {
    type: 'quantitative' as const,
    scale: { domain: [0, (100 * width) / (width - VALUE_LABEL_ROOM)], nice: false },
  }
  const set = { field: 'set', type: 'nominal' as const, scale: { domain: [practice, test] } }
  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v6.json',
    config,
    padding: size.padding,
    title: heading(t.title, t.sub, size),
    resolve: { scale: { fill: 'independent', stroke: 'independent', color: 'independent' } },
    vconcat: [
      {
        data: { values },
        facet: {
          row: {
            field: 'label',
            sort: { field: 'order' },
            header: {
              labelExpr: splitLines,
              labelFontSize: headerSize,
              labelLineHeight: Math.round(headerSize * 1.3),
              labelFontWeight: 'normal',
              labelColor: C.cream,
              labelLimit: width,
            },
          },
        },
        spacing: 22,
        spec: {
          width,
          height: 62,
          layer: [
            {
              mark: { type: 'bar', height: 26, strokeWidth: 3, strokeOffset: -1.5, cornerRadiusEnd: 2 },
              encoding: {
                x: {
                  ...x,
                  field: 'caught',
                  axis: {
                    values: [0, 25, 50, 75, 100],
                    title: t.axis,
                    grid: false,
                    labelExpr: "datum.value + '%'",
                    labelFontSize: size.textSize,
                  },
                },
                y: { value: 14 },
                fill: {
                  ...set,
                  scale: { ...set.scale, range: [C.ink, C.blue] },
                  legend: {
                    symbolType: 'square',
                    symbolSize: 260,
                    symbolStrokeWidth: 3,
                    direction: 'vertical',
                    rowPadding: 8,
                    labelFontSize: legendSize,
                    labelExpr: splitLines,
                  },
                },
                stroke: { ...set, scale: { ...set.scale, range: [C.blue, C.blue] } },
              },
            },
            {
              mark: {
                type: 'text',
                align: 'left',
                baseline: 'middle',
                dx: 10,
                fontSize: isNarrow ? 15 : 17,
                fontWeight: 'bold',
              },
              encoding: { x: { ...x, field: 'caught' }, y: { value: 14 }, text: { field: 'value' } },
            },
            {
              mark: { type: 'text', align: 'left', baseline: 'middle', fontSize: size.textSize, color: C.skin },
              encoding: { x: { value: 0 }, y: { value: 48 }, text: { field: 'fp' } },
            },
          ],
        },
      },
      footnotes(t.notes, t.source, size),
    ],
  }
}
