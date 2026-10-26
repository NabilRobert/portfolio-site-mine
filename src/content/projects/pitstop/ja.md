---
title: "Pitstop：無人で稼働したエージェントパイプラインとその実績"
summary: 11週間にわたり無人で稼働し、その稼働記録をもとに検証したエージェントパイプラインです。
category: portfolio
order: 3
featured: true
status: live
stack: TypeScript · Node · Vue · Postgres
links:
  - { label: ケーススタディ, href: "https://github.com/NabilRobert/pitstop-crew-public/blob/main/docs/case-study.md", primary: true }
  - { label: デモ, href: "https://pitcrew-public.my.id" }
  - { label: リポジトリ, href: "https://github.com/NabilRobert/pitstop-crew-public" }
---

Google広告向けのAIダッシュボードです。3つのエージェントが分析、提案、要約を担当し、4つ目の「批評役」のエージェントが、すべての出力を表示前に確認します。合成した広告データを用いて、約11週間にわたり無人で稼働しました。

- ケーススタディは、システム自身の稼働記録に基づいています。日次実行68回、原因を特定した3回の失敗、1回あたり約0.15ドルの費用、そして批評役による判定の推移を示しています。
- すべての数値は、公開しているSQLクエリによって算出しています。
- 公開デモは読み取り専用であり、費用が発生しないことを検証済みです。
