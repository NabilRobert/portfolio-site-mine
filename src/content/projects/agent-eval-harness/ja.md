---
title: "agent-eval-harness：エージェントは今も正しく動作しているか"
summary: エージェントの性能を測定し、変更によって悪化した場合にはCIを失敗させます。
category: portfolio
order: 2
status: ci
stack: Python · Inspect AI · 統計
links:
  - { label: リポジトリ, href: "https://github.com/NabilRobert/agent-eval-harness", primary: true }
  - { label: 結果, href: "https://github.com/NabilRobert/agent-eval-harness/blob/main/RESULTS.md" }
---

エージェントの構成が正しく機能しているかを測定し、変更による性能の低下が実行ごとのばらつきの範囲を超えた場合に、継続的インテグレーション（CI）を失敗させます。Inspect AIを基盤とし、回帰の判定、過去の実行結果の再採点、実行条件の記録といった機能を追加しています。

- **裏付け：** 各タスクを5回ずつ試行した結果を公開しています。データベースを対象としたテスト群では、`gpt-5-mini`が2回の独立した実行で191/200および192/200を記録しました。1回の実行に要する費用は約0.53ドルです。
- 実際の性能低下（ファイルシステムの探索ツールを外した場合の61ポイントの低下）を検出し、同一のエージェントを2回実行した場合には、誤って検出することはありませんでした。
- **限界の明示：** データベースのテスト群では、意図的に加えた小さな性能低下の一部を検出できませんでした。これらも、検証に失敗した結果として公開しています。
