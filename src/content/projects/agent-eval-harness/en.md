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
---

Measures whether an agent setup works, and fails continuous integration when a change makes it worse by more than the variation between runs. It is built on Inspect AI, to which it adds a regression gate, regrading of earlier runs, and provenance records.

- **Evidence:** results are published with five attempts per task. On a database suite, `gpt-5-mini` scored 191/200 and 192/200 in two separate runs, at a cost of approximately $0.53 per run.
- The gate flagged a genuine regression (a fall of 61 points when the filesystem discovery tools were removed), and did not flag the same agent run twice.
- **Limitations, stated openly:** on the database suite, it did not detect some smaller deliberate declines. These are published as unsuccessful proofs.
