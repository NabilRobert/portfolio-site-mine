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
    caption: "The dashboard, on synthetic advertising data."
  - src: why-this-trail.webp
    alt: "A daily report in three columns, Anna’s analysis, Rico’s recommendation and Sammy’s summary, each graded A and approved by Ciri, with the “Why this?” panel open beside them showing the original draft."
    caption: "A daily report, with the “Why this?” trail open."
  - src: learning-grade-trend.webp
    alt: "The Learning page: a stacked bar chart of Ciri’s verdicts on Anna’s final reports over eight weeks, almost all flagged until late September and mostly approved with notes in the week of 28 September, with a note on the two rule changes made that day."
    caption: "The Learning page: Ciri’s verdicts, week by week."
  - src: run-inspector-overview.webp
    alt: "The Run Inspector for daily run #130: its duration, eight model calls, token counts and a cost of $0.2427, then a timeline of every step, from building the context to each agent and model call."
    caption: "The Run Inspector: a run’s full trace and cost."
  - src: run-inspector-model-call.webp
    alt: "The Run Inspector with one model call open: Anna’s call to gpt-5-mini, with its token counts and cost, its settings, and the full prompt and response."
    caption: "The Run Inspector: one model call’s full prompt and response."
links:
  - { label: Case study, href: "https://github.com/NabilRobert/pitstop-crew-public/blob/main/docs/case-study.md", primary: true }
  - { label: Live demo, href: "https://pitcrew-public.my.id" }
  - { label: Repository, href: "https://github.com/NabilRobert/pitstop-crew-public" }
---

An AI dashboard for Google Ads. Three agents analyse, recommend and summarise, and a fourth agent, the critic, reviews every output before it is shown. It ran unattended for approximately eleven weeks on synthetic advertising data.

- The case study is drawn from the system's own run records: 68 daily runs, 3 failures with their causes, approximately $0.15 per run, and the change in the critic's verdicts over time.
- Every figure is produced by a published SQL query.
- The live demonstration is read-only, and has been verified to be unable to incur costs.
