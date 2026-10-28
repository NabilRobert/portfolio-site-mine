---
title: "agent-observability: one trace across every agent project"
summary: Follows a single AI agent request through every system it touches, with the time and cost of each step, in one small self-hosted viewer.
category: portfolio
order: 5
draft: true
status: wip
stack: Python · OpenTelemetry · Jaeger · Docker
coverAlt: "Illustration: a trace drawn as a waterfall of bars, each nested under the step that called it, under the word “Trace”, with the caption “+0.39 ms per call” and “Observability” spelled out below."
links:
  - { label: Repository, href: "https://github.com/NabilRobert/agent-observability", primary: true }
  - { label: Overhead measurement, href: "https://github.com/NabilRobert/agent-observability/blob/main/docs/mcp-backbone-overhead.md" }
screenshots:
  - src: trace-mcp-backbone.webp
    alt: "The Jaeger trace viewer showing one request from a demo agent to MCP-backbone: 19 spans over 189 milliseconds, in two services. The agent’s steps are in blue and the server’s in orange. The first tool call runs through authenticate, rate limit, validate, cost check, execute and audit; the second stops at validate, marked with a red error icon, and is then audited."
    caption: "One request, two processes"
    description: "A small demo agent makes two calls to MCP-backbone’s query tool, and the whole exchange appears as one trace. The agent’s steps are in blue and the server’s in orange: the trace context travels inside each MCP request, so the server’s spans nest under the agent’s call even though they run in a different process. Inside the first call, the server’s stages appear in order, authenticate, rate limit, validate, cost check, execute and audit, each with how long it took. The second call is a refused DELETE: it stops at validate, marked with a red error icon, and the audit step still records the refusal. No SQL text is recorded in any span."
    terms:
      - { term: "Trace", meaning: "The record of one request through every system it touched." }
      - { term: "Span", meaning: "One step in a trace, with its start time and duration, nested under the step that called it." }
      - { term: "Blue and orange", meaning: "The two services: the demo agent (blue) and MCP-backbone (orange)." }
      - { term: "The bars", meaning: "When each step ran within the request, and for how long." }
      - { term: "Red icon", meaning: "The step where an error happened: here, the refused query." }
      - { term: "189 ms, 19 spans", meaning: "How long the whole request took, and how many steps it had." }
      - { term: "Jaeger", meaning: "The open-source trace viewer used here, running in a small container." }
  - src: trace-pitstop-replay.webp
    alt: "The Jaeger trace viewer showing a replayed Pitstop daily run from 6 October: 29 spans over 2.4 minutes. After syncing the data and building the context, Anna’s analysis is reviewed by Ciri, revised once and approved; Rico’s recommendation is likewise revised once and approved; Sammy’s summary is approved at its first review. Each model call is its own span, labelled with the model used."
    caption: "A Pitstop run, replayed"
    description: "One of Pitstop’s daily runs, from 6 October, rebuilt from its records with the original timings. It reads from top to bottom like the pipeline itself: syncing the data and building the context, then Anna’s analysis, Ciri’s review, a revision and a second review before approval. Rico’s recommendation follows the same path, and Sammy’s summary is approved at its first review. Each call to a language model is its own span, labelled with the model it used. The whole run took 2.4 minutes, and most of that time was spent waiting for model calls."
    terms:
      - { term: "Replayed", meaning: "Rebuilt from Pitstop’s stored records after the fact, rather than traced live, with each step’s original start time and duration." }
      - { term: "invoke_workflow, invoke_agent", meaning: "The standard names for a whole pipeline run and for one agent’s work within it." }
      - { term: "chat", meaning: "One call to a language model." }
      - { term: "Revise, Approve", meaning: "The critic’s decisions, recorded as steps of their own." }
      - { term: "2.4m, 29 spans", meaning: "How long the run took, and how many steps it had." }
  - src: trace-model-call.webp
    alt: "The Jaeger trace viewer with one model call from the replayed Pitstop run opened: a 27.4-second call, with attributes including its cost (agentobs.cost.usd = 0.010699) and operation (chat), and resource details showing that it is a replay from a named backup."
    caption: "Inside one model call"
    description: "Opening a single model call shows its details: how long it took and when it started within the run, and attributes such as its cost in US dollars, the kind of operation and the type of output. The resource line notes that the trace was replayed, and from which backup. The text of the prompt and the response is not stored in the trace."
    terms:
      - { term: "Attributes", meaning: "Facts attached to a span, such as its cost and the kind of operation." }
      - { term: "agentobs.cost.usd", meaning: "The call’s cost in US dollars: here, about one US cent." }
      - { term: "gen_ai.*", meaning: "Attributes defined by OpenTelemetry’s conventions for AI systems, which any compatible viewer can read." }
      - { term: "Resource", meaning: "Facts about where the trace came from: here, a replay from a named backup." }
      - { term: "GenAI tab", meaning: "A view that groups a model call’s AI-specific details." }
---

Tracing for the other projects. Each one sends OpenTelemetry traces, following the standard conventions for AI systems, to one small self-hosted viewer (Jaeger), so a single agent request can be followed from the agent, through an MCP server, to the database, with the time and cost of every step.

- **Two sources are in:** MCP-backbone, traced live, with a span for each stage of every tool call; and Pitstop, whose 62 recorded runs (653 steps) are replayed from a backup with their original timings.
- **Evidence:**
  - Tracing adds 0.39 ms to the median MCP-backbone tool call (1.4%), with no detectable difference for the slowest 5% and 1% of calls.
  - The replay is faithful: every recorded step appears once, with the same parent, start time and duration, and wherever a run recorded its total cost, its model calls add up to it. All 62 runs pass the check.
  - No content by default: SQL text, prompts and responses are not recorded unless switched on, and a test checks this along every path a query's text can take.
  - Tracing cannot hurt the traced system: with the viewer down, tool calls still succeed.
- **Still to come:** traces through the MCP security gateway and the evaluation harness, and the viewer's deployment to a shared server.

## What a trace shows

A trace is the record of one request as it passes through a system: every step becomes a span, with its start time and duration, nested under the step that called it. Here a span can also carry an AI model call's token counts and cost. Read from top to bottom, a trace shows what happened, in order; read across, it shows where the time went.
