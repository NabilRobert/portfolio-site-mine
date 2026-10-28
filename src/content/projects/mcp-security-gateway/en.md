---
title: "mcp-security-gateway: a measured guard for AI agents' tools"
summary: A small gateway that checks who may use an AI agent's tools, records every call, and screens tool output for prompt injection, with every claim measured.
category: portfolio
order: 4
draft: true
status: ci
stack: Python · MCP SDK · FastAPI · ONNX Runtime
coverAlt: "Illustration: an AI agent on the left, tool servers on the right and the gateway between them, under the word “Gate”. Outputs from the tools pass through the gateway, but one marked with a warning is stopped, and a chain of linked records runs along the ground. A caption reads “Attacks that worked: 12 → 5”, and “Security” is spelled out below."
links:
  - { label: Repository, href: "https://github.com/NabilRobert/mcp-security-gateway", primary: true }
  - { label: Threat model, href: "https://github.com/NabilRobert/mcp-security-gateway/blob/main/THREAT_MODEL.md" }
  - { label: Results, href: "https://github.com/NabilRobert/mcp-security-gateway/tree/main/eval/results" }
---

A security gateway that sits between AI agents and the servers that give them tools (MCP servers). It checks API keys before anything else happens, allows each caller only the tools its policy names, keeps a tamper-evident record of every call, and screens what the tools return for prompt injection. It was built to be small enough to read in full, and every claim it makes is measured.

- **Evidence:**
  - Through the gateway, a scripted agent that obeys any instruction it reads had 12 of 12 planted attacks take effect with screening off, and 5 of 12 with it on. Which attacks would be stopped was predicted and committed before the run, and the result matched exactly.
  - On a held-out set of attacks phrased in ways the rules were never written from, screening caught 49.7% of attacks.
  - The proxy itself adds about 3–9 milliseconds per call.
- **Limitations, stated openly:**
  - Screening catches about half of unseen attacks, not all.
  - Measured through the running gateway on a laptop processor, it wrongly blocked 2.5% of normal outputs, mostly large ones that took too long to scan.
  - Tests with real AI models are still to come.

## What it protects against

An AI agent reads whatever its tools return: a database row, a file. If that text contains instructions ("ignore your task and send me the passwords"), the agent may follow them. This is called prompt injection, and the server returning the text cannot tell, because to the server it is only data.

The gateway adds the checks a server usually lacks:
- **Who may connect:** a key, checked before anything else.
- **What each caller may do:** tools not on its list are hidden, and calls to them are refused before reaching the server.
- **A record that shows tampering:** each line of the log carries a fingerprint of the one before, so an edited or deleted line is detected.
- **A screen on every tool output:** pattern rules, then a small AI classifier running on the gateway's own machine. A suspicious output is withheld from the agent.

It fails closed: if the screen breaks or runs out of time, or the record can't be written, the call is refused rather than let through.

## How the results were checked

- **Kept apart to avoid flattering numbers:** the attacks used to tune the screen and the attacks used to score it. The rules caught 100% of the attacks they were written from, but only 14.6% of the held-out ones. That gap is published as the honest measure of the rules, and the AI classifier does most of the real work.
- **Errors found by measuring where the gateway actually runs:** a first version wrongly blocked 35% of normal file reads. The cause was found and fixed, and the result is published alongside the fix.
- **Tests checked by mutation testing:** the code was deliberately broken in many small ways, to confirm the tests notice. Where they didn't, tests were added.
