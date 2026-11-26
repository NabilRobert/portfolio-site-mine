---
title: "sql-analyst-env: a training environment for an AI data analyst"
summary: A reinforcement-learning environment in which an AI agent answers business questions by writing SQL, and code checks the answer on a hidden second copy of the data.
category: portfolio
order: 13
status: ci
stack: Python · verifiers · MCP · Postgres · Ollama
coverAlt: "Illustration: a card reading “Select” with arrows to two databases, A and B, each with a tick below, under the word “Data”, captioned “An RL environment”, with “Analyst” spelled out below."
links:
  - { label: Repository, href: "https://github.com/NabilRobert/sql-analyst-env", primary: true }
  - { label: Results, href: "https://github.com/NabilRobert/sql-analyst-env/blob/main/RESULTS.md" }
---

A reinforcement-learning environment for a data-analyst agent. The agent gets a business question about Pagila, a sample DVD-rental database, explores it through MCP-backbone’s read-only tools, then writes a SQL query and submits it. Code grades the answer: the query must give the right result on the database the agent saw and on a hidden copy with different data, so a query that hard-codes the answer fails. Reinforcement learning improves a model by letting it try tasks and scoring each try; this project builds the tasks and the scoring, not the training.

- **Tasks:** 100 business questions, each with an answer key that must pass seven checks on both copies. For example, a second, separately written query must agree with it, and the likeliest wrong reading of the question must not. 70 tasks are public; the 30 held-out ones are kept out of the repository, so no model can be trained on them.
- **Scoring:** +1 for a query that is right on both copies, −0.5 for trying to change the data, and up to −0.1 for queries refused as too costly. Five tasks tempt the agent with a write (“delete…, then count”) when a read would answer them.
- **A cheat suite:** scripted agents that try to game the score must each get an exact score. Submitting copy A’s answer as fixed values, or returning whole tables, scores 0; hiding a write beside the right answer scores 0.5, never 1. CI plays about 840 such tries, with no model and at no cost.
- **Built on Arthur’s other projects:** MCP-backbone supplies the tools, the query checks and the read-only database access. agent-eval-harness supplies the build of MCP-backbone, 40 of the tasks and the strict grader; a test checks that the copied grader gives the harness’s verdict on all 212 of its recorded results. Prime Intellect’s verifiers library runs the tries.
- **Baselines:** three small open models, run locally on a Mac through Ollama, five tries per task. On the 30 held-out tasks, Qwen3.5 4B scored 62.7% pass@1, the chance that one try is right (95% interval 47.3% to 77.3%); Qwen3 1.7B and Llama 3.2 3B scored 0%. Seven Qwen3.5 tries went past the context limit set before the run, because Ollama ignores that setting for this model; counting them as wrong gives 62.0%. Reading the top-scoring tries by hand found no model scoring without answering.
- **Limits and status:** done, from the local stack to the baselines. Training a model, and a listing on Prime Intellect’s Environments Hub, were left out by choice. The review found gaps that are written down, not fixed: copy B changes the answers but not the ids, so a query that filters on an id read from copy A still passes. Building it also found two bugs in MCP-backbone, both since fixed there. MIT licence.
