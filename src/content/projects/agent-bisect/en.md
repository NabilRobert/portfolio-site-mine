---
title: "agent-bisect: finding the step that broke an agent run"
summary: "Planned, and starting to be built: a way to find which step made an AI agent’s run fail, by re-running the agent from points in the bad run, with a measurement of how well and how cheaply that works."
category: portfolio
order: 11
status: proposed
stack: Python · tracefork · PydanticAI · Inspect AI · Ollama
coverAlt: "Illustration of the planned method, under the word “Bisect”: a row of eight steps of a failing agent run, model calls as circles and tool calls as squares. Bars above them show how often the run fails when the agent keeps each step: low for the first four, then a jump past two dashed lines at the fifth step, in yellow. Below, three brackets narrow to that step. The caption reads “Finding the broken step”, and “Debugging” is spelled out below."
links:
  - { label: Repository, href: "https://github.com/NabilRobert/agent-bisect", primary: true }
  - { label: Measurement plan, href: "https://github.com/NabilRobert/agent-bisect/blob/main/docs/planning/measurement-plan.md" }
---
When an AI agent gives a bad answer, its trace shows what happened, but not which step made it go wrong, and the mistake often shows several steps after its cause. This project will find that step the way `git bisect` finds the commit that broke a build. It keeps the first steps of the bad run exactly as recorded, lets the agent carry on live from there a few times, and searches for the step after which failure is locked in. It builds on tracefork, an existing open-source tool (MIT licence) that records every model call and tool call of an agent run, replays the run exactly, and can fork it at any step. The work here is the measurement, a cheaper search, and the wiring into the rest of this portfolio.

- **The question:** does re-running from the bad run name the right step more often than an AI model that reads the log, and at what cost? Asking a model is the usual answer today. On one published benchmark, Who&When, the best such method names the right step 14% of the time.
- **How it will be measured:** faults of five kinds (a wrong tool result, a tool error, an instruction slipped into a tool result, a wrong model decision, lost context) will be planted in clean runs of two agents, so the right step is known. About 60 runs are to be frozen before the search code exists. Bisection will be compared with picking a random step, blaming the last step, three ways of asking a model judge, and tracefork’s own check, which re-runs from every step in turn. Everything will run on a small local model, `qwen3.5:4b`, at no cost. The limits are stated in advance: synthetic tasks, planted rather than real-world faults, one small model, and an interval of about ±12 points at 60 runs.
- **Targets, not results:** beat the best judge on naming the exact step, with a significance test (McNemar’s, p < 0.05), and use at most 40% of the live model calls of checking every step, while agreeing with it on at least 17 of 20 runs. If bisection misses, that is published as the result.
- **Incidents become tests:** a failing run will be saved as a regression test for agent-eval-harness, and replayed in CI with no model calls. The target is that at least 90% of saved incidents fail on the buggy version and pass on the fixed one.
- **Built on this portfolio:** Juku’s Shiori is to be one of the two agents, and the demo agent. Its tool calls will go through the MCP security gateway, with the gateway’s verdict kept on each step, and traces will go to agent-observability. Secrets are to be stripped before anything is saved.
- **Status:** the problem, requirements, decisions and measurement plan are written and on the main branch. The build has begun on branches, and nothing is merged or measured yet. A web page that walks through one incident is planned for the demo.
