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
    still: step1-still.webp
    alt: "Claude Code loads the query-database skill, calls list_tables and describe_table, then answers with the three most rented films."
    caption: "Ask a question"
    description: "The demo begins in Claude Code, an AI assistant that runs in the terminal, with a plain question about a sample film-rental database: which three films were rented most, and how many times each? Claude loads the MCP-backbone skill, looks up which tables exist and how they are structured, and asks the user to approve each step before it runs. Only then does it write a single read-only query. The answer comes back as a table: Cat Coneheads (123 rentals), Deer Virginian (112) and Muscle Bright (107). Claude also notes that it checked the next two films, to be sure there was no tie for third place."
    terms:
      - { term: "MCP (Model Context Protocol)", meaning: "An open standard that lets AI assistants use outside tools and data in a consistent way. MCP-backbone is a server that offers a database through it." }
      - { term: "Claude Code", meaning: "An AI assistant made by Anthropic that works in the terminal. Here it is the AI using the server." }
      - { term: "The sample database", meaning: "Pagila, a well-known practice database of a fictional DVD-rental shop. No real customer data is involved." }
      - { term: "Skill", meaning: "Written guidance, loaded first, that tells Claude how to use the server well." }
      - { term: "Approval prompt", meaning: "Before each tool call, Claude shows what it is about to do and waits for the user to allow it." }
      - { term: "Read-only query", meaning: "A request that can look at the data but cannot change it." }
      - { term: "123, 112, 107", meaning: "How many times each film was rented in the sample data." }
  - src: step2.gif
    still: step2-still.webp
    alt: "Asked to run DELETE FROM rental, the server rejects it: only SELECT statements are allowed, so nothing was deleted."
    caption: "Try to change data"
    description: "At the start, the user repeats the first question. The server limits how many queries can run in an hour, so Claude gives its earlier answer instead of querying again. Next, the user asks Claude to run a statement that would delete a rental record. The request reaches the server, which refuses it: only single SELECT statements are allowed, so nothing is deleted. Claude reports the refusal plainly and does not look for a way around it, explaining that the block is a deliberate safeguard and that changing data would need a separate account with write access."
    terms:
      - { term: "SELECT and DELETE", meaning: "Commands in SQL, the language of databases. SELECT reads data; DELETE removes it." }
      - { term: "Refused", meaning: "The server checks every command before it reaches the database, and rejects anything other than a single SELECT." }
      - { term: "Hourly limit", meaning: "A cap on how many queries the AI may run in an hour, so that an assistant stuck in a loop cannot overload the database." }
      - { term: "Write access", meaning: "Permission to change data. The server’s own database account does not have it, so even a flaw in its checks could not change data." }
  - src: step3.webp
    alt: "The console's audit trail: the refused DELETE in red with its reason, the successful query with its cost, and a 14-day chart."
    caption: "Check what ran"
    description: "Everything the AI does is recorded, including what it was not allowed to do. The console’s audit trail charts the last fourteen days of queries, split into those that succeeded and those that were rejected, failed or timed out. Below the chart, each query is listed with its time, its status, the full SQL, its estimated cost and, if it was refused, the reason. Both moments from the demo are here: the refused DELETE in red, with the reason that only SELECT statements are allowed, and the successful query that answered the question. The list can be filtered by status or by the text of the query."
    terms:
      - { term: "Console", meaning: "The web dashboard where the database’s owner manages access and reviews what the AI did." }
      - { term: "Audit trail", meaning: "The record of every query the AI attempted, whether it ran or not." }
      - { term: "Green and red bars", meaning: "Queries per day over the last 14 days: in green, those that succeeded; in red, those rejected, failed or timed out." }
      - { term: "Status", meaning: "Whether a query succeeded or was rejected." }
      - { term: "Cost", meaning: "The database’s own estimate of how much work a query takes. It measures effort, not money." }
      - { term: "Reason", meaning: "Why a query was refused, in plain words." }
---

An MCP server that allows an AI model to explore and query a Postgres database safely. MCP, the Model Context Protocol, is an open standard through which AI assistants use outside tools and data.

- Every query is parsed, checked for cost, executed read-only and logged.
- The database itself rejects writes, so a defect in the validator cannot result in a loss of data.
- **Evidence:** an adversarial red-team suite and 141 tests against a real Postgres database. In the benchmark, `gpt-5-mini` answered 29 of 30 questions correctly under strict grading.

It is the system on which the other two projects build. The evaluation harness measured agents that use it, and its tool schemas were corrected after the harness revealed that they were incompatible with OpenAI's strict mode.
