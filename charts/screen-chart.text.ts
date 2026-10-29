// The words of the screen chart in English, Japanese and Indonesian, kept
// apart from its data and drawing code (screen-chart.ts) so a translation can be
// read and edited on its own.
import type { Lang } from './theme.ts'

export type RowId = 'rules-practice' | 'rules-unseen' | 'model-unseen'

export interface Strings {
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

export const T: Record<Lang, Strings> = {
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
