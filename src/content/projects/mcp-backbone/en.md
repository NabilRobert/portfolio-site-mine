---
title: "MCP-backbone: a database server that an AI cannot misuse"
summary: An MCP server that allows an AI model to query Postgres safely.
category: portfolio
order: 1
status: live
stack: Python · FastAPI · MCP SDK · Postgres
links:
  - { label: Repository, href: "https://github.com/NabilRobert/MCP-backbone", primary: true }
  - { label: Live site, href: "https://mcp.my.id" }
  - { label: Red team, href: "https://github.com/NabilRobert/MCP-backbone/blob/main/RED_TEAM.md" }
  - { label: Benchmark, href: "https://github.com/NabilRobert/MCP-backbone/blob/main/BENCHMARK.md" }
screenshots:
  - src: step1.gif
    still: step1-still.png
    alt: "Claude Code loads the query-database skill, calls list_tables and describe_table, then answers with the three most rented films."
    caption: "Ask a question. Claude explores the schema, then runs one read-only query."
  - src: step2.gif
    still: step2-still.png
    alt: "Asked to run DELETE FROM rental, the server rejects it: only SELECT statements are allowed, so nothing was deleted."
    caption: "Try to change data. The server refuses anything but a single SELECT."
  - src: step3.png
    alt: "The console's audit trail: the refused DELETE in red with its reason, the successful query with its cost, and a 14-day chart."
    caption: "Check what ran. Every query, including refused ones, appears in the audit trail."
---

An MCP server that allows an AI model to explore and query a Postgres database safely.

- Every query is parsed, checked for cost, executed read-only and logged.
- The database itself rejects writes, so a defect in the validator cannot result in a loss of data.
- **Evidence:** an adversarial red-team suite and 141 tests against a real Postgres database. In the benchmark, `gpt-5-mini` answered 29 of 30 questions correctly under strict grading.

It is the system on which the other two projects build. The evaluation harness measured agents that use it, and its tool schemas were corrected after the harness revealed that they were incompatible with OpenAI's strict mode.
