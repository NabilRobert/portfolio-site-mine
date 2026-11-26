---
title: "systems-monitoring: is it working, and who gets told?"
summary: "Monitoring for the live apps in this portfolio, built and tested in Docker but not yet deployed: security alerts, uptime and server health, and availability targets with error budgets, each alert sent to one phone with a runbook."
category: portfolio
order: 8
status: wip
stack: Vector · VictoriaMetrics · Alertmanager · blackbox_exporter · Telegram · Docker
coverAlt: "Cover with the word “Alert” over a line chart of an error budget that falls past a dashed threshold, the steep fall in red, beside a yellow bell and a phone showing a message; captioned “SLOs · Error budgets · Runbooks”, with “Monitoring” spelled out below."
links:
  - { label: Repository, href: "https://github.com/NabilRobert/systems-monitoring", primary: true }
screenshots:
  - src: path.svg
    alt: "Diagram of the alert path, marked “Built”. Three sources, Vector (logins, sudo, new open ports), probes and metrics (uptime, memory, disk, certificates) and slo-check (Juku’s SLOs, drawn dashed because it waits until Juku is live), send to Alertmanager, which groups, removes repeats, silences and routes alerts to a Telegram bot that messages only the operator. An alert is either a page, which makes the phone buzz, or a ticket, which arrives silently."
    caption: "How an alert reaches the operator"
    description: "Built and tested in Docker, but not yet deployed on the server. Vector reads the server’s login records and its open ports, and sends security alerts straight to Alertmanager. Probes check that each app answers and that its certificate is valid, and Vector also reports the server’s memory and disk. VictoriaMetrics keeps these numbers for 30 days, and vmalert turns them into alerts. The third source, a check over Juku’s own records, waits until Juku is live.\n\nAlertmanager groups the alerts, drops repeats, holds them during maintenance and routes them to a Telegram bot that messages only the operator. Urgent alerts, such as a security event, an app down or a budget burning fast, make the phone buzz. Others, such as a certificate that expires within 14 days, arrive silently, to be read later. Every alert links its runbook, and has a test of its rule and an end-to-end test that it arrives."
    terms:
      - { term: "Alert", meaning: "A message sent automatically when something needs a person’s attention." }
      - { term: "Vector", meaning: "Open-source software for moving logs and metrics. Here its configuration does the security detection, replacing a small watcher written first. It only detects; it changes nothing." }
      - { term: "Probe", meaning: "An automatic check, repeated all day, that a page or service answers correctly and in time." }
      - { term: "VictoriaMetrics, vmalert", meaning: "A store for numbers over time, kept for 30 days, and the program that checks the alert rules against it." }
      - { term: "Alertmanager", meaning: "Open-source software that receives alerts from every source, groups them, removes repeats and decides where each one goes." }
      - { term: "Page, ticket", meaning: "The two levels of urgency: a page makes the phone buzz; a ticket arrives silently." }
      - { term: "Runbook", meaning: "A short written guide, linked from each alert, saying what to check and what to do." }
  - src: slos.svg
    alt: "Table of Juku’s draft service level objectives over a rolling 28 days, marked “Draft”: availability 99.5%, with a budget of 201 bad minutes; chat latency, 95% of answers within 40 seconds and half within 15; chat success 99%; weekly reports on time, at most two late and never the same learner twice; answer quality, 95% of sampled answers passing checks in code."
    caption: "Juku’s service level objectives"
    description: "A draft, because Juku is not live yet. A service level objective is a promise stated as a number, measured over a rolling 28 days. Each comes with an error budget: the amount of failure the target still allows, such as 201 minutes of the site not answering. Alerts fire when that budget is being used up too fast, not at every single failure. The same method already runs for the live apps: each has a 99.5% availability target, with alerts when its budget burns too fast.\n\nJuku’s targets follow its own plan. The chat latency target, for example, allows 40 seconds, because an agent that calls tools and a model several times cannot honestly promise five. They stay drafts until two weeks of real traffic, and a missed target is published rather than quietly lowered."
    terms:
      - { term: "SLO (service level objective)", meaning: "A target for how reliably a service works, such as 99.5% of checks answering in time." }
      - { term: "Error budget", meaning: "The failure a target still allows over the window. When it runs out, the promise has been broken." }
      - { term: "Burn rate", meaning: "How fast the budget is being used. Spending 2% of it in an hour, or 5% in six hours, pages the operator; 10% in three days becomes a ticket." }
      - { term: "Rolling 28 days", meaning: "The window always covers the last four weeks, so each weekday counts the same." }
      - { term: "Reports on time", meaning: "A report counts as delivered if it is ready within an hour, including the plain facts-only report Juku falls back on." }
      - { term: "Checks in code", meaning: "Answer quality is checked by code at no cost: every cited dictionary entry must exist and match what the answer says." }
  - src: slices.svg
    alt: "Build order, marked “In progress”: 0 planning, 1 security alerts, 3 metrics and probes, and 4 errors, done; 2, deploying on the server, next; a checkpoint, with the server watched before Juku’s first user; then 5 Juku’s SLOs, 6 AI-specific signals, 7 a canary and 8 the write-up. Slice 4 found that GlitchTip did not fit in memory, so its fallback is in use. Everything costs nothing; slices 5 to 8 wait until Juku is live."
    caption: "Built in slices"
    description: "Four of the nine slices are done, locally. Each slice runs end to end, from a signal to a message on the phone, with tests, before the next begins. Security alerts came first, because they need nothing else. Then the server’s own health, so that it is watched before Juku has a single user. Slice 4 tried GlitchTip, a store for errors and their stack traces, and it failed the memory limit set in advance, so error counts will come from the apps’ own records instead.\n\nThe next step is deploying on the server, by hand, from a written runbook. The rest needs Juku live: its service level objectives, the failures specific to AI, and a canary, a scripted agent that runs one real task every hour to prove that the whole chain still works."
    terms:
      - { term: "Slice", meaning: "A small, complete piece of the system, built and tested end to end before the next one." }
      - { term: "Checkpoint", meaning: "The point at which the server is fully watched, before Juku’s first user." }
      - { term: "Canary", meaning: "A scripted agent that runs one real task every hour, at no cost, so that a break is noticed before users notice it." }
      - { term: "Memory gate", meaning: "A component is adopted only if its measured memory fits on the shared server; the numbers are published either way. GlitchTip failed its gate." }
      - { term: "Postmortem", meaning: "A written account of a real failure: what happened, why, and what changed." }
---

Monitoring for the live apps in this portfolio: MCP-backbone, the Pitstop demo and Framed, and Juku once it is live. agent-observability answers “what happened in this request”; this project answers “is it working right now, and who gets told when it isn’t”. The security alerts, the uptime and server health checks, and the availability targets are built and tested in Docker. Nothing is deployed on the server yet.

- **Security alerts:** a message for every login, every `sudo` command or refusal, and every new open port that isn’t on its allowed list. Failed logins are counted, not messaged, so the phone buzzes only when a person needs to act. It only detects: nothing in it changes the server’s settings. The detection is Vector configuration; a custom watcher was written first, and replaced once Vector passed the same end-to-end tests.
- **Uptime and server health:** whether each app answers, certificates close to expiring, disk, memory, a process killed for lack of memory, and the monitoring itself going quiet. A separate check compares each live app with its code on GitHub every 15 minutes, and files a ticket when one has been behind for a day.
- **Promises, not just graphs:** each app has a 99.5% availability target over 28 days, with alerts when its error budget is spent too fast, following the multi-window burn-rate method of Google’s SRE workbook. Testing added two rules: wait for most of a window’s checks first, or one failed check just after a deploy would page, and stay quiet while an “app down” alert already covers the outage.
- **Tested before deploying:** 90 rule tests, 79 deliberate breakages of the rules that each make a test fail, and 16 end-to-end tests that run the production setup in Docker, with stand-ins for Telegram and for an app. Measured locally, security alerts arrived 15–23 seconds after their log line; they will be measured again on the server.
- **Small, at no cost:** the five always-on containers run within 368 MB of memory caps, on free, open-source tools. GlitchTip, which groups errors with their stack traces, failed its memory test: within 256 MB, it stored only 440 of 1,000 test events. So error counts will come from the apps’ own records.
- **Status:** next is the deploy, from a written runbook; Juku’s own targets and its AI-specific signals wait until Juku is live. Open source under the MIT licence.
