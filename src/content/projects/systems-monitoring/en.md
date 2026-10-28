---
title: "systems-monitoring: is it working, and who gets told?"
summary: "Monitoring, now in planning, for the live apps in this portfolio: promises with error budgets, and an alert, with a runbook, only when a person needs to act."
category: portfolio
order: 8
draft: true
status: wip
stack: VictoriaMetrics · Alertmanager · Python · Telegram
coverAlt: "Cover with the word “Alert” over a line chart of an error budget that falls past a dashed threshold, the steep fall in red, beside a yellow bell and a phone showing a message; captioned “SLOs · Error budgets · Runbooks”, with “Monitoring” spelled out below."
links:
  - { label: Repository, href: "https://github.com/NabilRobert/systems-monitoring", primary: true }
screenshots:
  - src: path.svg
    alt: "Planned diagram of the alert path. Three sources, authwatch (logins, sudo, new open ports), probes and metrics (uptime, memory, disk, certificates) and slo-check (Juku’s records and error budgets), send to Alertmanager, which groups, removes repeats, silences and routes alerts to a Telegram bot that messages only the operator. An alert is either a page, which makes the phone buzz, or a ticket, which arrives silently."
    caption: "How an alert reaches the operator"
    description: "A plan, not yet built. Three kinds of sources watch the system. A small watcher reads the server’s login records and its open ports. Probes and metrics check every minute that each app answers, and track memory, disk and certificates. A check over Juku’s own records measures its service level objectives. All of them send their alerts to one Alertmanager, which groups them, drops repeats, holds them during maintenance and routes them to a Telegram bot that messages only the operator. Urgent alerts, such as a security event or a budget burning fast, make the phone buzz; others, such as a certificate that expires in ten days, arrive silently, to be read later. Every alert comes with a runbook and two tests, and links to the request’s trace in agent-observability."
    terms:
      - { term: "Alert", meaning: "A message sent automatically when something needs a person’s attention." }
      - { term: "authwatch", meaning: "The project’s own small watcher for security events: logins, sudo use and newly opened ports. It only detects; it changes nothing." }
      - { term: "Probe", meaning: "An automatic check, every minute, that a page or service answers correctly and in time." }
      - { term: "Alertmanager", meaning: "Open-source software that receives alerts from every source, groups them, removes repeats and decides where each one goes." }
      - { term: "Page, ticket", meaning: "The two levels of urgency: a page makes the phone buzz; a ticket arrives silently." }
      - { term: "Runbook", meaning: "A short written guide, linked from each alert, saying what to check and what to do." }
  - src: slos.svg
    alt: "Planned table of Juku’s draft service level objectives over a rolling 28 days: availability 99.5%, with a budget of 201 bad minutes; chat latency, 95% of answers within 40 seconds and half within 15; chat success 99%; weekly reports on time, at most two late and never the same learner twice; answer quality, 95% of sampled answers passing checks in code."
    caption: "Juku’s service level objectives"
    description: "A plan, not yet built. A service level objective is a promise stated as a number, measured over a rolling 28 days. Each comes with an error budget: the amount of failure the target still allows, such as 201 minutes of the site not answering. Alerts fire when that budget is being used up too fast, not at every single failure. The targets follow Juku’s own plan: the chat latency target, for example, allows 40 seconds, because an agent that calls tools and a model several times cannot honestly promise five. They stay drafts until two weeks of real traffic, and a missed target is published rather than quietly lowered."
    terms:
      - { term: "SLO (service level objective)", meaning: "A target for how reliably a service works, such as 99.5% of checks answering in time." }
      - { term: "Error budget", meaning: "The failure a target still allows over the window. When it runs out, the promise has been broken." }
      - { term: "Burn rate", meaning: "How fast the budget is being used. A fast burn pages the operator; a slow one becomes a ticket." }
      - { term: "Rolling 28 days", meaning: "The window always covers the last four weeks, so each weekday counts the same." }
      - { term: "Reports on time", meaning: "A report counts as delivered if it is ready within an hour, including the plain facts-only report Juku falls back on." }
      - { term: "Checks in code", meaning: "Answer quality is checked by code at no cost: every cited dictionary entry must exist and match what the answer says." }
  - src: slices.svg
    alt: "Planned build order: 0 planning, done; 1 security alerts, next; 2 deploy on the server; 3 metrics and probes; 4 errors, if they fit in memory; a checkpoint, with the server watched before Juku’s first user; 5 Juku’s SLOs; 6 AI-specific signals; 7 a canary; 8 the write-up. Everything costs nothing; slices 5 to 8 wait until Juku is live."
    caption: "Built in slices"
    description: "A plan, with only its first step done. The work is cut into slices, and each runs end to end, from a signal to a message on the phone, with tests, before the next begins. Security alerts come first, because they need nothing else. Then the server’s own health, so that it is watched before Juku has a single user. The rest needs Juku live: its service level objectives, the failures specific to AI, and a canary, a scripted agent that runs one real task every hour to prove that the whole chain still works. What to cut if time or memory runs short was decided in advance; the security alerts and the published results are never cut."
    terms:
      - { term: "Slice", meaning: "A small, complete piece of the system, built and tested end to end before the next one." }
      - { term: "Checkpoint", meaning: "The point at which the server is fully watched, before Juku’s first user." }
      - { term: "Canary", meaning: "A scripted agent that runs one real task every hour, at no cost, so that a break is noticed before users notice it." }
      - { term: "Memory gate", meaning: "A component is adopted only if its measured memory fits on the shared server; the numbers are published either way." }
      - { term: "Postmortem", meaning: "A written account of a real failure: what happened, why, and what changed." }
---

Monitoring for the live apps in this portfolio, now in planning. agent-observability answers “what happened in this request”; this project answers “is it working right now, and who gets told when it isn’t”. It will watch Juku once it has real users, the Pitstop demo and MCP-backbone, all of which run on one small shared server.

- **What it will watch:** whether pages and APIs respond and certificates are valid; latency, error rate, memory and disk; errors, with their stack traces; the AI-specific failures that still return a normal response, such as spend running ahead of its cap, refusals, gateway blocks and answer quality; and security events on the server, such as logins, `sudo` use and new listening ports.
- **Promises, not just graphs:** service level objectives with error budgets, such as “95% of Juku’s chat answers within 40 seconds”, drafts until two weeks of real traffic, and an alert when a budget is burning too fast.
- **Only the alerts a person needs:** one channel to the operator’s phone, a runbook for every alert, and a test that fires every alert on purpose and checks that it arrives.
- **Detection only:** nothing in this project changes the server’s security settings.
- **Status:** planned, and starting with the security alerts; most of the rest waits until Juku is live. Its results, including the misses, will be published as they are.
