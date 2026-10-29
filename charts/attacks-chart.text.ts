// The words of the planted-attacks chart in English, Japanese and Indonesian, kept
// apart from its data and drawing code (attacks-chart.ts) so a translation can be
// read and edited on its own.
import type { Lang } from './theme.ts'

export type SetupId = 'off' | 'policy' | 'on'

export interface Strings {
  title: string
  sub: string
  hit: string
  stopped: string
  setups: Record<SetupId, string>
  count: (hits: number) => string
  predicted: string
  /** One paragraph; it is wrapped to the chart's width. */
  notes: string
  source: string
}

export const T: Record<Lang, Strings> = {
  en: {
    title: 'Twelve planted attacks, three set-ups',
    sub: 'Each square is one attack: filled if it took effect, outlined if it was stopped',
    hit: 'Took effect',
    stopped: 'Stopped',
    setups: {
      off: 'Gateway, screening off',
      policy: 'Gateway, read-only tools only, no screening',
      on: 'Gateway, screening on',
    },
    count: (n) => `${n} of 12 took effect`,
    predicted: 'Stopped exactly the 7 attacks predicted before the run',
    notes:
      'The test agent obeys any instruction it reads, so this shows what the gateway does, not how often a real AI model would be fooled.',
    source: 'Source: eval/results/gullible in mcp-security-gateway.',
  },
  ja: {
    title: '仕込んだ12件の攻撃と、3つの構成',
    sub: '四角1つが攻撃1件です。塗りつぶしは攻撃が成立、枠のみは阻止を表します',
    hit: '攻撃が成立',
    stopped: '阻止',
    setups: {
      off: 'ゲートウェイ経由、検査なし',
      policy: 'ゲートウェイ経由、読み取り専用ツールのみ、検査なし',
      on: 'ゲートウェイ経由、検査あり',
    },
    count: (n) => `12件中${n}件が成立`,
    predicted: '実行前に予測した7件を、予測どおりに阻止',
    notes:
      'テスト用エージェントは読んだ指示に必ず従うため、これはゲートウェイの働きを示すもので、実際のAIモデルがだまされる頻度を示すものではありません。',
    source: '出典：mcp-security-gatewayのeval/results/gullible',
  },
  id: {
    title: 'Dua belas serangan yang ditanam, tiga susunan',
    sub: 'Setiap kotak adalah satu serangan: terisi jika berhasil, bergaris tepi jika dihentikan',
    hit: 'Berhasil',
    stopped: 'Dihentikan',
    setups: {
      off: 'Gateway, tanpa penyaringan',
      policy: 'Gateway, hanya alat baca-saja, tanpa penyaringan',
      on: 'Gateway, dengan penyaringan',
    },
    count: (n) => `${n} dari 12 berhasil`,
    predicted: 'Menghentikan tepat 7 serangan yang diprediksi sebelum pengujian',
    notes:
      'Agen uji selalu mematuhi instruksi apa pun yang dibacanya, sehingga grafik ini menunjukkan kerja gateway, bukan seberapa sering model AI sungguhan tertipu.',
    source: 'Sumber: eval/results/gullible di mcp-security-gateway.',
  },
}
