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
    caption: "The dashboard"
    description: "This is the first page after signing in to the demo. Along the top are the menu, the language switch and a “Demo mode” marker, a reminder that everything here runs on sample data. The cards summarise the last three months: impressions, clicks, click-through rate, cost, impression share and Google’s optimisation score, and the period can be changed from one week to five years. Below them, the trend chart shows impressions day by day and can switch to clicks, cost or conversions. At the bottom left, campaigns are ranked by conversions; on the right is the day’s AI report, with a tab each for Anna, Rico and Sammy, all marked as approved by Ciri."
    terms:
      - { term: "Google Ads", meaning: "Google’s advertising service: a business pays for its ads to appear in Google search results and on other sites." }
      - { term: "Impressions", meaning: "How many times the ads were shown." }
      - { term: "Clicks and CTR", meaning: "Clicks on the ads, and the click-through rate: clicks as a share of impressions." }
      - { term: "Cost", meaning: "What the ads cost over the period, in Indonesian rupiah (Rp)." }
      - { term: "Impression share", meaning: "Of all the times the ads could have been shown, the share in which they actually were." }
      - { term: "Optimization score", meaning: "Google’s own 0–100% rating of how far an account follows its suggestions." }
      - { term: "Conversions", meaning: "Actions counted as results, such as a customer enquiry." }
      - { term: "Sample data", meaning: "The demo runs on generated figures for a fictional account; no real business is shown." }
  - src: why-this-trail.webp
    alt: "A daily report in three columns, Anna’s analysis, Rico’s recommendation and Sammy’s summary, each graded A and approved by Ciri, with the “Why this?” panel open beside them showing the original draft."
    caption: "A daily report, and “Why this?”"
    description: "Each day’s report sets the three agents’ work side by side: Anna’s analysis, Rico’s recommendation and Sammy’s summary. The line above them shows how they connect: the analysis informs the recommendation, and the summary brings both together. Every column carries Ciri’s grade and approval, with two links beneath it: “Why this?” to trace where the text came from, and “Ask about this” to put a follow-up question. Here “Why this?” is open on Anna’s analysis. The panel on the right starts from the original draft and continues through Ciri’s critique to the version that was approved."
    terms:
      - { term: "Grade", meaning: "Ciri’s score for each section, from A (best) to F." }
      - { term: "Ciri-approved", meaning: "The section passed Ciri’s review before it was shown." }
      - { term: "Draft", meaning: "An agent’s first version of a section, before Ciri reviewed it." }
      - { term: "Why this?", meaning: "Opens the history behind a section: the first draft, Ciri’s critique and each revision." }
      - { term: "Ask about this", meaning: "Lets the reader put a follow-up question to the agent, answered from the same data." }
      - { term: "Performance Max, Search", meaning: "Types of Google Ads campaign that the reports discuss." }
  - src: learning-grade-trend.webp
    alt: "The Learning page: a stacked bar chart of Ciri’s verdicts on Anna’s final reports over eight weeks, mostly flagged at first and mostly approved by the last week shown."
    caption: "The Learning page"
    description: "The Learning page shows how the critic’s judgements develop over time. The chart counts each week’s final reports by Ciri’s verdict: green for approved without notes, yellow for approved with notes, red for flagged, and grey for not reviewed. It can be switched between Anna, Rico and Sammy, and between verdicts and quality grades. Here, for Anna, almost every week until late September is red. The dotted line on 28 September marks a change to the approval rule, and the note beneath it says plainly that more approvals after that date are not, on their own, proof of better reports. Further down, the grading criteria explain what each grade from A to F means."
    terms:
      - { term: "Final report", meaning: "The version a reader actually saw, after any revisions. Earlier drafts are not counted." }
      - { term: "Green, yellow, red, grey", meaning: "Approved without notes, approved with notes, flagged, and not reviewed." }
      - { term: "One bar", meaning: "The final reports from one week, shown as shares that add up to 100%." }
      - { term: "Anna, Rico, Sammy", meaning: "The chart shows one agent’s reports at a time." }
      - { term: "Outcomes and Quality", meaning: "Two views of the same reports: Ciri’s verdicts, or the A–F grades." }
      - { term: "28 September", meaning: "The day the approval rule changed, marked so that the weeks before and after are not compared as if nothing had changed." }
      - { term: "Grading criteria", meaning: "What each grade from A to F requires." }
  - src: run-inspector-overview.webp
    alt: "The Run Inspector for one daily run: summary figures for its duration, model calls, tokens and cost, then a timeline of every step, from preparing the data to each agent’s work."
    caption: "The Run Inspector"
    description: "Every run of the pipeline can be opened in the Run Inspector. The cards at the top give the run’s totals: how long it took, how many times it called the language model, the tokens sent and received, its cost and its number of steps. Below, the timeline lists every step in order, from preparing the data to each agent’s work and every model call within it, with a bar showing when each step ran and for how long. Any step can be expanded to see exactly what happened."
    terms:
      - { term: "Run", meaning: "One complete pass of the pipeline, from reading the data to the finished report." }
      - { term: "Model call", meaning: "One request to the language model. An agent may make several in a run." }
      - { term: "Tokens", meaning: "The small pieces of text a language model reads (in) and writes (out). What a call costs depends on them." }
      - { term: "Cost", meaning: "What the run’s model calls cost, in US dollars." }
      - { term: "Context", meaning: "The data prepared for the agents before they start." }
      - { term: "Agent", meaning: "One agent’s work within the run, with its model calls nested beneath it." }
      - { term: "Timeline", meaning: "Each bar shows when a step ran within the run, and for how long." }
  - src: run-inspector-model-call.webp
    alt: "The Run Inspector with one of Anna’s model calls open, showing its token counts, cost and settings, and the full prompt and response."
    caption: "Inside one model call"
    description: "Here one model call within Anna’s step has been expanded. It shows the call’s settings and token counts, then the full instructions the agent received and the full response it gave. Nothing in a report has to be taken on trust: any sentence can be traced back to the call that produced it."
    terms:
      - { term: "Prompt", meaning: "Everything the agent was given: its instructions and the data." }
      - { term: "Response", meaning: "The agent’s full answer, exactly as returned." }
      - { term: "Settings", meaning: "The parameters of the call, such as the longest answer allowed." }
      - { term: "In → out", meaning: "How many tokens went into the call, and how many came back." }
      - { term: "Finish reason", meaning: "Why the model stopped. “stop” means it finished normally." }
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
