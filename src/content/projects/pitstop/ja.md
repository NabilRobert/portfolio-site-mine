---
title: "Pitstop：無人で稼働したエージェントパイプラインとその実績"
summary: 11週間にわたり無人で稼働し、その稼働記録をもとに検証したエージェントパイプラインです。
category: portfolio
order: 3
featured: true
status: live
stack: TypeScript · Node · Vue · Postgres
coverAlt: "Pitstopの4つのエージェントを、「AI」と記された車を整備するピットクルーとして描いたイラストです。「PIT STOP」「11 WEEKS UNATTENDED（11週間無人で稼働）」の文字とともに、Annaはグラフ、Ricoは上向きの矢印が描かれた看板、Sammyはクリップボード、批評役のCiriはチェッカーフラッグを手にしています。"
screenshots:
  - src: dashboard-overview.webp
    alt: "合成した広告データを表示したPitstopのダッシュボード画面です。過去3か月の表示回数、クリック数、クリック率、費用などの指標、日ごとの表示回数のグラフ、コンバージョン数によるキャンペーンの順位、そしてAnna、Rico、SammyによるAIレポートが表示され、批評役のCiriによる承認済みの印が付いています。"
    caption: "ダッシュボード画面（合成した広告データを使用）"
  - src: why-this-trail.webp
    alt: "日次レポート画面です。Annaの分析、Ricoの提案、Sammyの要約の3列が並び、いずれも評価Aで、Ciriの承認済みとなっています。その横には「Why this?」パネルが開かれ、元の下書きが表示されています。"
    caption: "日次レポートと、根拠をたどる「Why this?」パネル"
  - src: learning-grade-trend.webp
    alt: "Learningページです。Annaの最終レポートに対するCiriの判定を8週間分示した積み上げ棒グラフで、9月下旬まではほぼすべてが要修正と判定され、9月28日の週には大半が指摘付きで承認されています。同日に行われた2件のルール変更についての注記もあります。"
    caption: "Learningページ：週ごとのCiriの判定"
  - src: run-inspector-overview.webp
    alt: "日次実行#130のRun Inspector画面です。所要時間、8回のモデル呼び出し、トークン数、0.2427ドルのコストに続き、コンテキストの構築から各エージェントとモデル呼び出しに至るまで、すべてのステップがタイムラインで表示されています。"
    caption: "Run Inspector：1回の実行の全記録とコスト"
  - src: run-inspector-model-call.webp
    alt: "1回のモデル呼び出しを開いたRun Inspector画面です。Annaによるgpt-5-miniの呼び出しについて、トークン数とコスト、設定、そしてプロンプトと応答の全文が表示されています。"
    caption: "Run Inspector：1回のモデル呼び出しにおけるプロンプトと応答の全文"
links:
  - { label: ケーススタディ, href: "https://github.com/NabilRobert/pitstop-crew-public/blob/main/docs/case-study.md", primary: true }
  - { label: デモ, href: "https://pitcrew-public.my.id" }
  - { label: リポジトリ, href: "https://github.com/NabilRobert/pitstop-crew-public" }
---

Google広告向けのAIダッシュボードです。3つのエージェントが分析、提案、要約を担当し、4つ目の「批評役」のエージェントが、すべての出力を表示前に確認します。合成した広告データを用いて、約11週間にわたり無人で稼働しました。

- ケーススタディは、システム自身の稼働記録に基づいています。日次実行68回、原因を特定した3回の失敗、1回あたり約0.15ドルの費用、そして批評役による判定の推移を示しています。
- すべての数値は、公開しているSQLクエリによって算出しています。
- 公開デモは読み取り専用であり、費用が発生しないことを検証済みです。
