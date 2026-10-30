// The words of the regression gate chart in English, Japanese and Indonesian, kept
// apart from its data and drawing code (gate-chart.ts) so a translation can be
// read and edited on its own.
import type { Lang } from './theme.ts'

export type RowId = 'db-aa' | 'fs-aa' | 'fs-discovery' | 'fs-cap' | 'db-schema' | 'db-nano' | 'db-prompt' | 'fs-nano'

/** What the gate should have done: stay quiet, flag a deliberate decline, or no expectation. */
export type Group = 'quiet' | 'worse' | 'none'

export type Outcome = 'quiet' | 'caught' | 'missed' | 'flagged'

export interface Strings {
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

export const T: Record<Lang, Strings> = {
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
