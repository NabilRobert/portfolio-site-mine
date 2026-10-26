---
title: "MCP-backbone：AIによる誤用を防ぐデータベースサーバー"
summary: AIがPostgresに安全に問い合わせを行うためのMCPサーバーです。
category: portfolio
order: 1
status: live
stack: Python · FastAPI · MCP SDK · Postgres
links:
  - { label: リポジトリ, href: "https://github.com/NabilRobert/MCP-backbone", primary: true }
  - { label: 公開サイト, href: "https://mcp.my.id" }
  - { label: レッドチーム, href: "https://github.com/NabilRobert/MCP-backbone/blob/main/RED_TEAM.md" }
  - { label: ベンチマーク, href: "https://github.com/NabilRobert/MCP-backbone/blob/main/BENCHMARK.md" }
screenshots:
  - src: landing.webp
    alt: "mcp.my.idのランディングページです。「Database MCP Server」という見出しと、AIはデータを読み取って説明することはできても、変更することはできないという説明文があり、その下のターミナルでは、Claude Codeが質問に答え、貸し出し回数の多い映画3本を表にまとめています。"
    caption: "mcp.my.idの公開ランディングページ（2026年10月26日撮影）"
---

AIモデルがPostgresデータベースの構造を調べ、安全に問い合わせを行えるようにするMCPサーバーです。

- すべてのクエリは、構文解析とコストの確認を経たうえで、読み取り専用で実行され、記録されます。
- データベース側でも書き込みを拒否する設計のため、検証処理に不具合があっても、データの消失にはつながりません。
- **裏付け：** 攻撃を想定したレッドチームテストと、実際のPostgresを用いた141件のテストを備えています。ベンチマークでは、`gpt-5-mini`が厳格な採点基準のもとで30問中29問に正答しました。

他の2つのプロジェクトの基盤でもあります。評価ハーネスはこのサーバーを利用するエージェントを測定し、その過程でツールのスキーマがOpenAIのstrictモードに対応していないことが判明したため、修正を行いました。
