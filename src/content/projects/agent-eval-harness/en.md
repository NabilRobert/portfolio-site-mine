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
screenshots:
  - src: gate-chart.svg
    alt: "Chart of the regression gate’s eight comparisons. On the database suite, running the same agent twice changed the strict pass rate by +0.5 points; removing the schema tools (−3.0), switching to the smaller model (−4.5) and removing one line from the prompt (−2.5) were all expected to be flagged, but none was. On the filesystem suite, the repeat run changed nothing (±0.0), and three changes were flagged as regressions: removing the discovery tools (−61.2), cutting the message cap from 20 to 12 (−20.0) and switching to the smaller model (−20.0)."
    caption: "The regression gate"
    description: "Each row compares one version of an agent with a baseline on the same tasks, five attempts per task. The dot shows how far the share of tasks passed under strict grading moved, and the bar around it is the 95% interval: the range the true change most likely falls in. The gate flags a regression when that whole range lies below zero, or when a task that always passed now always fails, so ordinary variation between runs is not mistaken for a decline. Both A/A rows, the same agent run twice, sit on zero and are rightly left alone, and on the filesystem suite all three deliberate breakages were caught. On the database suite, three smaller declines of 2.5 to 4.5 points were expected to be flagged and were not, because their intervals still cross zero. The project publishes these as unsuccessful proofs rather than leaving them out; for the smaller model, a follow-up on fresh trials of the tasks that dropped later confirmed a regression."
    terms:
      - { term: "Suite", meaning: "A fixed set of tasks with known answers. The database suite is 40 questions about Pagila, a practice database of a fictional DVD-rental shop, answered through MCP-backbone. The filesystem suite is 17 tasks that require finding information in the files of a made-up software project." }
      - { term: "Attempt", meaning: "One try at one task. Every task is attempted five times, because an AI agent does not always give the same answer twice." }
      - { term: "Strict pass rate", meaning: "The share of attempts whose answer was fully correct. On the database suite, the rows returned must match the expected ones exactly; on the filesystem suite, the answer must contain every expected value." }
      - { term: "Baseline and candidate", meaning: "Each row compares the agent as it was (the baseline) with a copy that has one deliberate change (the candidate)." }
      - { term: "The dot: change, in points", meaning: "How far the candidate’s strict pass rate moved from the baseline’s, in percentage points. −20.0 means that, out of every 100 attempts, 20 fewer passed." }
      - { term: "The bar: 95% interval", meaning: "The range the true change most likely lies in, allowing for chance. A wider bar means less certainty." }
      - { term: "The zero line", meaning: "No change. A bar lying wholly to the left of it means a decline too large to be put down to chance." }
      - { term: "A/A", meaning: "The same agent compared with itself: a check that the gate stays quiet when nothing has changed." }
      - { term: "Flagged", meaning: "The gate judged the candidate worse. In continuous integration, the build would fail." }
      - { term: "Expected a flag", meaning: "The change was made on purpose to make the agent worse, and written down before the run, so the gate should have caught it." }
      - { term: "Schema tools, discovery tools", meaning: "Tools the agent uses to look around before answering: the database’s tables and columns, or the files in the project." }
      - { term: "Message cap, smaller model", meaning: "The message cap limits how many messages the agent may exchange on one task. The smaller model is gpt-5-nano, a cheaper model than the gpt-5-mini used by default." }
---

Measures whether an agent setup works, and fails continuous integration when a change makes it worse by more than the variation between runs. It is built on Inspect AI, to which it adds a regression gate, regrading of earlier runs, and provenance records.

- **Evidence:** results are published with five attempts per task. On a database suite, `gpt-5-mini` scored 191/200 and 192/200 in two separate runs, at a cost of approximately $0.53 per run.
- The gate flagged a genuine regression (a fall of 61 points when the filesystem discovery tools were removed), and did not flag the same agent run twice.
- **Limitations, stated openly:** on the database suite, it did not detect some smaller deliberate declines. These are published as unsuccessful proofs.

## What the results measure

An agent here is an AI model given instructions and a set of tools, which it uses to complete tasks on its own. The harness runs an agent on a fixed set of tasks, a suite, five times each, and grades every answer automatically. To check that the gate works, deliberate changes that should make an agent worse were made, such as removing a tool or switching to a smaller model, and each changed version was compared with the original. The chart below shows those comparisons, with a key beside it.
