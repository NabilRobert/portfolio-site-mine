---
title: "Pitstop: an agent pipeline in operation, with the evidence"
summary: An agent pipeline that ran unattended for eleven weeks, documented from its own records.
category: portfolio
order: 3
featured: true
status: live
stack: TypeScript · Node · Vue · Postgres
coverAlt: "Illustration: Pitstop’s four agents as a pit crew around a car marked “AI”, under the words “Pit Stop” and “11 weeks unattended”. Anna holds a chart, Rico a sign with an upward arrow, Sammy a clipboard, and Ciri, the critic, the chequered flag."
screenshots:
  - src: dashboard-overview.webp
    alt: "The Pitstop dashboard on synthetic advertising data: three months of figures (impressions, clicks, click-through rate and cost), a daily impressions chart, campaigns ranked by conversions, and the AI report by Anna, Rico and Sammy, marked as approved by Ciri, the critic."
    caption: "The dashboard: the account’s recent performance at a glance, with the day’s AI report from Anna, Rico and Sammy, each approved by Ciri. All the data is synthetic."
  - src: why-this-trail.webp
    alt: "A daily report in three columns, Anna’s analysis, Rico’s recommendation and Sammy’s summary, each graded A and approved by Ciri, with the “Why this?” panel open beside them showing the original draft."
    caption: "A daily report, with the “Why this?” trail open: it shows how each section was drafted, critiqued by Ciri and revised."
  - src: learning-grade-trend.webp
    alt: "The Learning page: a stacked bar chart of Ciri’s verdicts on Anna’s final reports over eight weeks, mostly flagged at first and mostly approved by the last week shown."
    caption: "The Learning page: how Ciri’s verdicts on the final reports changed from week to week."
  - src: run-inspector-overview.webp
    alt: "The Run Inspector for one daily run: summary figures for its duration, model calls, tokens and cost, then a timeline of every step, from preparing the data to each agent’s work."
    caption: "The Run Inspector: every step of a run, in order, with its timing and cost."
  - src: run-inspector-model-call.webp
    alt: "The Run Inspector with one of Anna’s model calls open, showing its token counts, cost and settings, and the full prompt and response."
    caption: "A single model call in the Run Inspector, with its full prompt and response, so any output can be traced back to what produced it."
links:
  - { label: Case study, href: "https://github.com/NabilRobert/pitstop-crew-public/blob/main/docs/case-study.md", primary: true }
  - { label: Live demo, href: "https://pitcrew-public.my.id" }
  - { label: Repository, href: "https://github.com/NabilRobert/pitstop-crew-public" }
---

An AI dashboard for Google Ads. Three agents analyse, recommend and summarise, and a fourth agent, the critic, reviews every output before it is shown. It ran unattended for approximately eleven weeks on synthetic advertising data.

## The four agents

- **Anna, analysis.** Reads the account's performance data and identifies trends, anomalies and standout segments, each backed by the figures behind it.
- **Rico, recommendations.** Turns Anna's findings into plain-language suggestions. They remain suggestions: nothing is ever applied to the account automatically.
- **Sammy, summaries.** Condenses the analysis and recommendations into a daily and weekly digest that is quick to read.
- **Ciri, the critic.** Reviews every output before it is shown, checking for weak evidence and overconfident claims, and sends it back for revision when it falls short.

Each agent works within its own guardrails: it stays within its role and the data it is given, treats that data as information rather than instructions, and cannot make changes to the advertising account.

## The evidence

- The case study is drawn from the system's own run records: 68 daily runs, 3 failures with their causes, approximately $0.15 per run, and the change in the critic's verdicts over time.
- Every figure is produced by a published SQL query.
- The live demonstration is read-only, and has been verified to be unable to incur costs.
