---
title: "agent-observability: one trace across every agent project"
summary: Follows a single AI agent request through every system it touches, with the time and cost of each step, in one small self-hosted viewer.
category: portfolio
order: 5
status: ci
stack: Python · OpenTelemetry · Jaeger · Docker
coverAlt: "Illustration: a trace drawn as a waterfall of bars, each nested under the step that called it, under the word “Trace”, with the caption “+0.39 ms per call” and “Observability” spelled out below."
links:
  - { label: Repository, href: "https://github.com/NabilRobert/agent-observability", primary: true }
  - { label: Overhead measurement, href: "https://github.com/NabilRobert/agent-observability/blob/main/docs/mcp-backbone-overhead.md" }
  - { label: End-to-end check, href: "https://github.com/NabilRobert/agent-observability/blob/main/e2e/check.py" }
screenshots:
  - src: trace-end-to-end.webp
    alt: "The Jaeger trace viewer showing one evaluation sample from agent-eval-harness as a single trace: 36 spans over 2.0 seconds, in three services. Under the sample and its agent (blue), each MCP call enters the security gateway (orange), whose stages are rate limit, policy, audit, forward, detect and audit; inside forward, the call reaches MCP-backbone (purple), whose stages are authenticate, rate limit, validate, cost check, execute and audit, the last three marked as database steps."
    caption: "One request, end to end"
    description: "One of the harness's evaluation samples, run live: an agent is asked how many films the sample film-rental database holds, and answers through the MCP security gateway and MCP-backbone. The harness grades the answer a pass. The whole request is one trace across three separate programs: the harness's sample and agent in blue, the gateway in orange, MCP-backbone in purple. Each MCP call nests inside the gateway's \"forward\" step, and MCP-backbone's own stages sit inside that, down to the steps that touch the database. Read across, it shows where the time went: the first call, listing the tables, took 0.9 seconds, half of it in MCP-backbone and most of the rest a one-time warm-up in the gateway; the query itself took 0.16 seconds from end to end. The agent here is scripted, so no AI model is called and the run costs nothing."
    terms:
      - { term: "End to end", meaning: "From the agent that asks, through every program in between, to the database that answers." }
      - { term: "agent-eval-harness", meaning: "The portfolio's agent-evaluation project. Here it supplies the agent and grades its answer." }
      - { term: "MCP security gateway", meaning: "The portfolio's gateway that sits between an agent and an MCP server, checking permissions and scanning what comes back." }
      - { term: "Blue, orange and purple", meaning: "The three programs: the harness (blue), the gateway (orange) and MCP-backbone (purple)." }
      - { term: "Database steps", meaning: "The stages marked with a database icon: estimating the query's cost, running it, and writing the audit record." }
      - { term: "2.0 s, 36 spans", meaning: "How long the whole sample took, and how many steps it had." }
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
  - src: trace-harness-replay.webp
    alt: "The Jaeger trace viewer showing one evaluation sample from agent-eval-harness, replayed from its log: 15 spans over 11.8 seconds. Under the sample come the solver and the agent; under the agent, four model calls of 3.3, 4.2, 3.1 and 0.9 seconds alternate with four tool calls: listing the tables, describing one, running a query (each 50 to 100 milliseconds) and submitting the answer."
    caption: "An evaluation sample, replayed"
    description: "One of the harness's evaluation samples: an AI agent answering a question about a sample film-rental database through MCP-backbone's tools, recorded during a real run and replayed from the harness's log with its original timings. The trace keeps the structure the evaluation framework recorded: the sample, then the solver and the agent, then each model call and each tool call. Read across, it shows where the time went: of 11.8 seconds, the four calls to the AI model took 11.5, while the three database tools took 50 to 100 milliseconds each and submitting the answer took under one. Each model call carries its own token counts and cost, and the replay is checked to add up to the totals the harness recorded."
    terms:
      - { term: "agent-eval-harness", meaning: "The portfolio's agent-evaluation project: it runs an agent through fixed sets of tasks and grades the results." }
      - { term: "Sample", meaning: "One task, attempted once by the agent. The harness's published runs hold 1,777 of them, all replayed." }
      - { term: "Replayed", meaning: "Rebuilt as a trace from the run's saved log, with the times it recorded, rather than run again, so it costs nothing." }
      - { term: "Model call", meaning: "One request to the AI model, with its token counts and cost." }
      - { term: "Tool call", meaning: "One use of a tool, such as running a query; marked with a wrench icon." }
      - { term: "11.8 s, 15 spans", meaning: "How long the sample took, and how many steps it had." }
---
Tracing for the other projects. Each one sends OpenTelemetry traces, following the standard conventions for AI systems, to one small self-hosted viewer (Jaeger), so a single agent request can be followed from the agent, through an MCP server, to the database, with the time and cost of every step.

- **End to end:** one evaluation sample from the harness is followed as a single trace from the agent, through the MCP security gateway and MCP-backbone, to the database: 36 spans from three services, and the harness grades the answer a pass. An automated check confirms the trace has one starting point, loses no step between services, and reaches the database through every service in order.
- **The sources:**
  - MCP-backbone and the gateway, traced live, with a span for each stage of every tool call;
  - the evaluation harness, traced live (a span per sample and per agent), and its 20 published runs (1,777 evaluation samples, 7,068 real AI model calls) replayed from their logs, each model call with its own token counts and cost;
  - Pitstop, whose 62 recorded runs (653 steps) are replayed from a backup with their original timings.
- **Evidence:**
  - Tracing adds 0.39 ms to the median MCP-backbone tool call (1.4%), with no detectable difference for the slowest 5% and 1% of calls.
  - The replays are faithful: every recorded step appears once, with the same parent, start time and duration, and the model calls' cost and tokens add up to each run's recorded totals. All 62 Pitstop runs and all 1,777 harness samples pass the check.
  - No content by default: SQL text, prompts, responses and tool arguments are not recorded unless switched on, and tests check this.
  - Tracing cannot hurt the traced systems: with the viewer down, calls still succeed, and shutting down waits at most two seconds.
  - The viewer stays small: 79 MiB of its 256 MB limit, with all the replays loaded.
- **What the traces found:**
  - In MCP-backbone, the slowest step of a tool call was not the query but authentication: the database driver looked up one column's type again on every new connection. Changing that column's type took about 8.5 ms off every call.
  - In the gateway, the end-to-end check showed its last spans going missing whenever it was stopped the way servers are normally stopped: the web server it runs on ended the process before the gateway could send them. The gateway now shuts down cleanly.
- **What changed along the way:** the viewer was meant to keep traces on disk. Loading the harness's runs pushed that storage's memory use to 532 MiB, past the viewer's 256 MB limit, so the viewer now keeps traces in memory, where the same data takes 79 MiB. A restart empties it; the replays refill it in seconds.
- **Still to come:** deploying the viewer to the shared server. Everything above runs locally, at no model cost.

## What a trace shows

A trace is the record of one request as it passes through a system: every step becomes a span, with its start time and duration, nested under the step that called it. Here a span can also carry an AI model call's token counts and cost. Read from top to bottom, a trace shows what happened, in order; read across, it shows where the time went.
