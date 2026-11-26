---
title: "AI Flight School: a release gate for customer-support agents"
summary: Simulated customers talk to a support agent that calls tools. The tools are fakes held by the gate, and code, not a model, checks every call against written rules. In progress.
category: portfolio
order: 12
status: wip
stack: Python · Inspect AI · MCP SDK · FastAPI
coverAlt: "Cover with the word “Flight” over a paper plane on a runway, stopped at a lowered red-and-white barrier. Above it are two chat bubbles and a board of three checked tool calls: two ticked, one crossed out in red. The caption reads “Support bot release gate”, with “School” spelled out below."
links:
  - { label: Repository, href: "https://github.com/NabilRobert/ai-flight-school", primary: true }
  - { label: Accuracy report, href: "https://github.com/NabilRobert/ai-flight-school/blob/main/docs/accuracy.md" }
  - { label: Pilot note, href: "https://github.com/NabilRobert/ai-flight-school/blob/main/docs/thesis-pilot-note.md" }
---
A test a support agent has to pass before it ships. Simulated customers talk to the agent: confused, angry, or trying to trick it. The agent’s tools are fakes that the gate holds, so every call it makes is recorded. Then code, not a model, checks each call against the team’s rules. A refund over the order total, or one made before the customer’s identity is checked, fails the build.

- **A fake shop and written rules:** seven tools an agent might have, such as looking up an order or issuing a refund, with a fresh copy of the shop for each conversation. Rules are data, in six kinds, such as “this tool needs that one first” or “no more than this amount”. The checker gets all 46 hand-labelled test conversations right.
- **One exit code:** the gate fails on any serious rule broken in any conversation, and reports a crash as inconclusive, never a pass. Given an earlier run, it also fails when the agent finishes fewer tasks, using the statistics of agent-eval-harness, another project on this site. It runs as a command or a GitHub Action.
- **Agents in any language:** an agent can answer over HTTP and call its fake tools over MCP. An agent that keeps its own tools behind mcp-security-gateway is checked from the gateway’s log of its calls, so the calls are observed, not reported by the agent. A suite for Juku’s Shiori has run this way on a scripted model.
- **Measured at $0:** a reference agent has seven planted bugs, such as refunding twice, trusting a customer who claims a manager approved it, or obeying instructions hidden in an order note. Each scenario ran 5 times. The gate caught all 7 bugs in every run, and raised no false alarm on the correct agent. Both sides were scripted, so this measures the checker and the gate, not how well a simulated customer finds bugs.
- **A first run on real models:** a research pilot ran 150 synthetic Indonesian sales chats on small local models, at $0. The pipeline worked end to end, and the result is a warning. A deliberately worse agent gave a price in 14 of 50 chats, against 39 and 42 for two runs of the normal one. Yet it still passed 37 of 50 once corrected, against 40 and 44, because the simulated customer judged itself satisfied without a price. The pass rule needs a better judge.
- **Status:** in progress, with slices 1 to 6 of 8 built. Not done yet: a timed test of a newcomer setting it up, and a run of Shiori on a real model. Next is a paid accuracy run with model customers, which has no budget yet. The code is open source under the Apache-2.0 licence.
