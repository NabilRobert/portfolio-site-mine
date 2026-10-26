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
  - src: step1.gif
    still: step1-still.png
    alt: "Claude Codeがquery-databaseスキルを読み込み、list_tablesとdescribe_tableを呼び出したうえで、貸し出し回数の多い映画3本を回答する様子です。"
    caption: "質問する：Claudeがスキーマを調べたうえで、読み取り専用のクエリを1回だけ実行します。"
  - src: step2.gif
    still: step2-still.png
    alt: "DELETE FROM rentalの実行を求められたサーバーが、SELECT文のみが許可されているとしてこれを拒否し、データが一切削除されなかった様子です。"
    caption: "データの変更を試みる：サーバーは、単一のSELECT文以外をすべて拒否します。"
  - src: step3.png
    alt: "コンソールの監査ログ画面です。拒否されたDELETEがその理由とともに赤字で、成功したクエリがそのコストとともに表示され、14日間の推移を示すグラフもあります。"
    caption: "実行内容を確認する：拒否されたものも含め、すべてのクエリが監査ログに記録されます。"
---

AIモデルがPostgresデータベースの構造を調べ、安全に問い合わせを行えるようにするMCPサーバーです。

- すべてのクエリは、構文解析とコストの確認を経たうえで、読み取り専用で実行され、記録されます。
- データベース側でも書き込みを拒否する設計のため、検証処理に不具合があっても、データの消失にはつながりません。
- **裏付け：** 攻撃を想定したレッドチームテストと、実際のPostgresを用いた141件のテストを備えています。ベンチマークでは、`gpt-5-mini`が厳格な採点基準のもとで30問中29問に正答しました。

他の2つのプロジェクトの基盤でもあります。評価ハーネスはこのサーバーを利用するエージェントを測定し、その過程でツールのスキーマがOpenAIのstrictモードに対応していないことが判明したため、修正を行いました。
