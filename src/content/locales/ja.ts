// Japanese interface strings, in formal です・ます style. Written for meaning
// rather than translated word for word from en.ts. TODO: a native speaker
// should review it before launch. tests/content.spec.ts keeps its keys in step.
import type { LocaleStrings } from '../types'

export default {
  meta: {
    title: 'ナビル・ロバート｜AIフルスタックエンジニア',
    description:
      'AIフルスタックエンジニア、ナビル・ロバートのポートフォリオです。AIによる誤用を防ぐデータベースMCPサーバー、エージェント評価ハーネス、11週間無人で稼働したエージェントパイプラインを紹介しています。',
  },
  nav: {
    label: 'メインメニュー',
    skip: '本文へ移動',
    work: '制作実績',
    about: 'プロフィール',
    contact: 'お問い合わせ',
    language: '表示言語',
  },
  about: {
    heading: 'プロフィール',
    name: 'ナビル・ロバート',
    role: 'AIフルスタックエンジニア',
    lead: 'AIシステムの設計・開発を行い、それが正しく機能することを根拠をもって示しています。本ポートフォリオでは、AIによる誤用を防ぐデータベースサーバー、エージェントの性能の向上や低下を測定するハーネス、そして11週間にわたり無人で稼働し、その稼働記録をもとに検証したエージェントパイプラインをご紹介します。',
    seeking: '',
  },
  featured: { label: '注目' },
  flow: {
    heading: '3つのプロジェクトの関係',
    steps: {
      'mcp-backbone': 'AIが利用するシステム',
      'agent-eval-harness': 'そうしたシステムを評価する仕組み',
      pitstop: '実際に稼働したシステムとその根拠',
    },
  },
  categories: {
    portfolio: 'ポートフォリオ',
    opensource: 'オープンソースへの貢献',
    other: 'その他の制作物',
  },
  status: { live: '公開中', ci: 'CI', archived: 'アーカイブ', wip: '開発中' },
  projectsPage: {
    heading: 'プロジェクト一覧',
    lead: 'いずれのプロジェクトも、ソースコードと、記載内容を裏付ける資料をご覧いただけます。',
  },
  project: {
    back: 'プロジェクト一覧',
    notFound: 'お探しのプロジェクトは見つかりませんでした。',
    stack: '使用技術',
    status: 'ステータス',
    screenshots: '画面のご案内',
    links: '関連リンク',
  },
  contact: {
    heading: 'お問い合わせ',
    text: 'いずれのプロジェクトについても、お気軽にお問い合わせください。詳細は各リポジトリに、裏付けとなる資料はケーススタディに掲載しています。',
    links: { github: 'GitHub', email: 'メール', linkedin: 'LinkedIn', cv: '履歴書（PDF）' },
  },
  notFound: {
    heading: 'ページが見つかりません',
    text: 'アドレスに誤りがあるか、ページが移動した可能性があります。',
    home: 'ホームに戻る',
  },
} satisfies LocaleStrings
