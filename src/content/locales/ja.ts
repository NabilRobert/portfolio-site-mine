// Japanese interface strings, in formal です・ます style. Written for meaning
// rather than translated word for word from en.ts. TODO: a native speaker
// should review it before launch. tests/content.spec.ts keeps its keys in step.
import type { LocaleStrings } from '../types'

export default {
  meta: {
    title: 'ムハンマド・ナビル・リナルディ｜AIフルスタックエンジニア',
    description:
      'AIフルスタックエンジニア、ムハンマド・ナビル・リナルディのポートフォリオです。AIによる誤用を防ぐデータベースMCPサーバー、効果を測定したAIエージェントのツール向けセキュリティゲートウェイ、エージェント評価ハーネス、エージェントの要求を最初から最後まで追跡する仕組み、11週間無人で稼働したエージェントパイプラインを紹介しています。',
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
    name: 'ムハンマド・ナビル・リナルディ',
    role: 'AIフルスタックエンジニア',
    lead: 'AIシステムの設計・開発を行い、それが正しく機能することを根拠をもって示しています。本ポートフォリオでは、AIによる誤用を防ぐデータベースサーバー、エージェントの性能の向上や低下を測定するハーネス、11週間にわたり無人で稼働したエージェントパイプライン、効果を測定で裏付けたAIエージェントのツール防御ゲートウェイ、これらのシステムを通るエージェントの要求を最初から最後まで追跡する仕組み、小さなAIエージェントのチームが運営する日本語学習プラットフォーム、そしてハーネスが見つけた不具合をオープンソースのInspect AIに報告した取り組みをご紹介します。',
    seeking: 'AIエンジニアとしての仕事を探しています。',
  },
  featured: { label: '注目', draft: '下書き（非公開）' },
  flow: {
    heading: '7つのプロジェクトの関係',
    steps: {
      'mcp-backbone': 'AIが利用するシステム',
      'agent-eval-harness': 'そうしたシステムを評価する仕組み',
      pitstop: '実際に稼働したシステムとその根拠',
      'mcp-security-gateway': 'AIが使うツールを守る仕組み',
      'agent-observability': 'これらを通る要求を、時間と費用ごと追跡',
      juku: 'これらすべてを日本語学習に活用',
      'inspect-strict-tools': 'ハーネスが見つけた不具合の上流への報告',
    },
  },
  categories: {
    portfolio: 'ポートフォリオ',
    opensource: 'オープンソースへの貢献',
    other: 'その他の制作物',
  },
  status: { live: '公開中', ci: 'CI', archived: 'アーカイブ', wip: '開発中', proposed: '提案中', review: 'レビュー中' },
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
    key: '用語の説明',
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
