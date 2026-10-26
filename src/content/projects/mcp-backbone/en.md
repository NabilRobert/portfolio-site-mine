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
    caption: "Ask a question"
    description: "The demo begins in Claude Code, an AI assistant that runs in the terminal, with a plain question about a sample film-rental database: which three films were rented most, and how many times each? Claude loads the MCP-backbone skill, looks up which tables exist and how they are structured, and asks the user to approve each step before it runs. Only then does it write a single read-only query. The answer comes back as a table: Cat Coneheads (123 rentals), Deer Virginian (112) and Muscle Bright (107). Claude also notes that it checked the next two films, to be sure there was no tie for third place."
  - src: step2.gif
    still: step2-still.png
    alt: "Asked to run DELETE FROM rental, the server rejects it: only SELECT statements are allowed, so nothing was deleted."
    caption: "Try to change data"
    description: "At the start, the user repeats the first question. The server limits how many queries can run in an hour, so Claude gives its earlier answer instead of querying again. Next, the user asks Claude to run a statement that would delete a rental record. The request reaches the server, which refuses it: only single SELECT statements are allowed, so nothing is deleted. Claude reports the refusal plainly and does not look for a way around it, explaining that the block is a deliberate safeguard and that changing data would need a separate account with write access."
  - src: step3.png
    alt: "The console's audit trail: the refused DELETE in red with its reason, the successful query with its cost, and a 14-day chart."
    caption: "Check what ran"
    description: "Everything the AI does is recorded, including what it was not allowed to do. The console’s audit trail charts the last fourteen days of queries, split into those that succeeded and those that were rejected, failed or timed out. Below the chart, each query is listed with its time, its status, the full SQL, its estimated cost and, if it was refused, the reason. Both moments from the demo are here: the refused DELETE in red, with the reason that only SELECT statements are allowed, and the successful query that answered the question. The list can be filtered by status or by the text of the query."
---

An MCP server that allows an AI model to explore and query a Postgres database safely.

- Every query is parsed, checked for cost, executed read-only and logged.
- The database itself rejects writes, so a defect in the validator cannot result in a loss of data.
- **Evidence:** an adversarial red-team suite and 141 tests against a real Postgres database. In the benchmark, `gpt-5-mini` answered 29 of 30 questions correctly under strict grading.

It is the system on which the other two projects build. The evaluation harness measured agents that use it, and its tool schemas were corrected after the harness revealed that they were incompatible with OpenAI's strict mode.
