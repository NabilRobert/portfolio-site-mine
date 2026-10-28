// How much of the attack text the gateway's screen catches, on the attacks its
// rules were written from and on unseen ones. Data: the "Held-out test split"
// table and dev numbers in mcp-security-gateway README.md, and eval/results/
// *.json, on main (commit 414c755). Recall on injected samples; the false-
// positive rate is the share of benign samples wrongly flagged.
import type { TopLevelSpec } from 'vega-lite'
import { C, config, footnotes } from './theme.ts'
import type { Lang } from './theme.ts'

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
  notes: string[]
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
    notes: ['The practice score is flattering by design; the unseen score is the honest one.'],
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
    notes: ['練習用セットの数値は構造上よく見えるものであり、', '実力を示すのは未知の攻撃での数値です。'],
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
    notes: ['Skor set latihan memang tampak bagus; skor yang jujur adalah skor pada serangan baru.'],
    source: 'Sumber: README.md dan eval/results di mcp-security-gateway.',
  },
}

const percent = (v: number, dec: string, digits: number) => `${v.toFixed(digits).replace('.', dec)}%`

export function spec(lang: Lang): TopLevelSpec {
  const t = T[lang]
  const values = rows.map(([id, caught, wronglyBlocked, isPracticeSet], order) => ({
    label: t.rows[id],
    order,
    caught,
    set: isPracticeSet ? t.practice : t.test,
    value: percent(caught, t.dec, caught === 100 ? 0 : 1),
    fp: t.fp(percent(wronglyBlocked, t.dec, 1)),
  }))
  // Room to the right of 100% for the value label.
  const x = { type: 'quantitative' as const, scale: { domain: [0, 112], nice: false } }
  const set = { field: 'set', type: 'nominal' as const, scale: { domain: [t.practice, t.test] } }
  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v6.json',
    config,
    title: { text: t.title, subtitle: t.sub },
    resolve: { scale: { fill: 'independent', stroke: 'independent', color: 'independent' } },
    vconcat: [
      {
        data: { values },
        facet: {
          row: {
            field: 'label',
            sort: { field: 'order' },
            header: { labelFontSize: 16.5, labelFontWeight: 'normal', labelColor: C.cream, labelLimit: 592 },
          },
        },
        spacing: 22,
        spec: {
          width: 592,
          height: 62,
          layer: [
            {
              mark: { type: 'bar', height: 26, strokeWidth: 3, strokeOffset: -1.5, cornerRadiusEnd: 2 },
              encoding: {
                x: {
                  ...x,
                  field: 'caught',
                  axis: { values: [0, 25, 50, 75, 100], title: t.axis, grid: false, labelExpr: "datum.value + '%'" },
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
                  },
                },
                stroke: { ...set, scale: { ...set.scale, range: [C.blue, C.blue] } },
              },
            },
            {
              mark: { type: 'text', align: 'left', baseline: 'middle', dx: 10, fontSize: 17, fontWeight: 'bold' },
              encoding: { x: { ...x, field: 'caught' }, y: { value: 14 }, text: { field: 'value' } },
            },
            {
              mark: { type: 'text', align: 'left', baseline: 'middle', fontSize: 14, color: C.skin },
              encoding: { x: { value: 0 }, y: { value: 48 }, text: { field: 'fp' } },
            },
          ],
        },
      },
      footnotes(t.notes, t.source),
    ],
  }
}
