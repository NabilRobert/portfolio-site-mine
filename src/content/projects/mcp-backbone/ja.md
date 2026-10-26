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
    caption: "質問する"
    description: "デモは、ターミナル上で動作するAIアシスタントのClaude Codeで、映画レンタルのサンプルデータベースについて「貸し出し回数が最も多い映画3本と、それぞれの回数は？」と質問するところから始まります。ClaudeはMCP-backboneのスキルを読み込み、どのようなテーブルがあり、どのような構造になっているかを確認します。各ステップは、実行前に利用者の承認を求めます。そのうえで初めて、読み取り専用のクエリを1回だけ実行します。回答は表で示され、Cat Coneheads（123回）、Deer Virginian（112回）、Muscle Bright（107回）の3本が挙がっています。Claudeは、3位に同数の映画がないことを確かめるため、続く2本も確認したと説明しています。"
  - src: step2.gif
    still: step2-still.png
    alt: "DELETE FROM rentalの実行を求められたサーバーが、SELECT文のみが許可されているとしてこれを拒否し、データが一切削除されなかった様子です。"
    caption: "データの変更を試みる"
    description: "冒頭で、利用者は最初の質問を繰り返します。サーバーは1時間あたりに実行できるクエリの数を制限しているため、Claudeは再度問い合わせることなく、先ほどの回答を示します。続いて利用者は、レンタル記録を削除する文の実行を求めます。この要求はサーバーに届きますが、単一のSELECT文以外は許可されていないため拒否され、データは一切削除されません。Claudeは拒否されたことをそのまま伝え、回避策を探すことはしません。この制限は意図的な安全策であり、データを変更するには書き込み権限を持つ別のアカウントが必要であると説明しています。"
  - src: step3.png
    alt: "コンソールの監査ログ画面です。拒否されたDELETEがその理由とともに赤字で、成功したクエリがそのコストとともに表示され、14日間の推移を示すグラフもあります。"
    caption: "実行内容を確認する"
    description: "AIが行ったことは、許可されなかった操作も含め、すべて記録されます。コンソールの監査ログでは、過去14日間のクエリが、成功したものと、拒否・失敗・タイムアウトとなったものに分けてグラフで示されます。グラフの下には、各クエリが実行時刻、状態、SQLの全文、推定コスト、そして拒否された場合はその理由とともに一覧表示されます。デモの2つの場面もここに記録されています。赤で示された拒否済みのDELETEとその理由、そして質問に答えた成功したクエリです。一覧は、状態やクエリの文字列で絞り込むことができます。"
---

AIモデルがPostgresデータベースの構造を調べ、安全に問い合わせを行えるようにするMCPサーバーです。

- すべてのクエリは、構文解析とコストの確認を経たうえで、読み取り専用で実行され、記録されます。
- データベース側でも書き込みを拒否する設計のため、検証処理に不具合があっても、データの消失にはつながりません。
- **裏付け：** 攻撃を想定したレッドチームテストと、実際のPostgresを用いた141件のテストを備えています。ベンチマークでは、`gpt-5-mini`が厳格な採点基準のもとで30問中29問に正答しました。

他の2つのプロジェクトの基盤でもあります。評価ハーネスはこのサーバーを利用するエージェントを測定し、その過程でツールのスキーマがOpenAIのstrictモードに対応していないことが判明したため、修正を行いました。
