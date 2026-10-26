---
title: "agent-eval-harness: does the agent still work?"
summary: Measures agents, and fails CI when a change makes one worse.
category: portfolio
order: 2
status: ci
stack: Python · Inspect AI · statistics
links:
  - { label: Repository, href: "https://github.com/NabilRobert/agent-eval-harness", primary: true }
  - { label: Results, href: "https://github.com/NabilRobert/agent-eval-harness/blob/main/RESULTS.md" }
---

Measures whether an agent setup works, and fails continuous integration when a change makes it worse by more than the variation between runs. It is built on Inspect AI, to which it adds a regression gate, regrading of earlier runs, and provenance records.

- **Evidence:** results are published with five attempts per task. On a database suite, `gpt-5-mini` scored 191/200 and 192/200 in two separate runs, at a cost of approximately $0.53 per run.
- The gate flagged a genuine regression (a fall of 61 points when the filesystem discovery tools were removed), and did not flag the same agent run twice.
- **Limitations, stated openly:** on the database suite, it did not detect some smaller deliberate declines. These are published as unsuccessful proofs.
