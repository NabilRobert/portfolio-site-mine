---
title: "Inspect AI：strictモードのツールスキーマ問題を上流に報告"
summary: 本ポートフォリオの評価ハーネスが見つけた不具合を、自作のサーバーで修正し、オープンソースのInspect AIに報告したものです。
category: opensource
order: 7
status: proposed
stack: Python · Inspect AI · OpenAI API · MCP
coverAlt: "「STRICT」の文字の下に、1行が強調されたツールスキーマのカードがあり、赤い「400」の印が押されています。そこから矢印が、未解決の課題を示す印へと伸びています。「ISSUE #6093 · PROPOSED（課題#6093・提案中）」の説明と、下部に「UPSTREAM」の文字があります。"
links:
  - { label: "Issue #6093", href: "https://github.com/UKGovernmentBEIS/inspect_ai/issues/6093", primary: true }
  - { label: MCP-backboneでの修正, href: "https://github.com/NabilRobert/MCP-backbone/pull/3" }
---

本ポートフォリオ自身の作業から生まれた、オープンソースへの貢献です。評価ハーネスが、AIモデルの評価に広く使われているフレームワークであるInspect AIを通じて、MCP-backboneを使うエージェントを動かしたところ、すべての要求がモデルの実行前にエラーで失敗しました。

- **原因：** InspectのOpenAI互換プロバイダーは、既定ですべてのツールを「strict」として送信します。しかしOpenAIのstrictモードは、すべての引数が必須であるスキーマしか受け付けません。省略可能な引数や既定値のある引数を持つツールはよく見られ、その場合は要求全体が失敗します。
- **手元での修正：** MCP-backboneは、strictモードに適合するスキーマを公開するよう修正し、適合しないスキーマがあれば失敗するテストを加えました。ハーネスでは、当面strictモードを無効にしています。
- **上流への報告：** MCP Python SDKはすでにこの方向の変更を見送っていたため、報告先はInspect AIとしました。報告では、APIキーなしで再現できる手順とともに該当箇所を示し、ツールをstrictとして送る前にそのスキーマを確認するという修正を提案しています。Inspect自身のResponses APIの経路では、この問題はすでに回避されています。
- **状況：** 提案中です。報告はトリアージを待っている段階で、プルリクエストはメンテナーに受け入れられてから提出します。

評価ハーネスで発見し、自分のサーバーで修正し、上流に報告しました。
