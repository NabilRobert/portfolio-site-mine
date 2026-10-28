---
title: "systems-monitoring: is it working, and who gets told?"
summary: "Monitoring, now in planning, for the live apps in this portfolio: promises with error budgets, and an alert, with a runbook, only when a person needs to act."
category: portfolio
order: 8
draft: true
status: wip
stack: Prometheus · Alertmanager · Grafana · Telegram
coverAlt: "Cover with the word “Alert” over a line chart of an error budget that falls past a dashed threshold, the steep fall in red, beside a yellow bell and a phone showing a message; captioned “SLOs · Error budgets · Runbooks”, with “Monitoring” spelled out below."
links:
  - { label: Repository, href: "https://github.com/NabilRobert/systems-monitoring", primary: true }
---

Monitoring for the live apps in this portfolio, now in planning. agent-observability answers “what happened in this request”; this project answers “is it working right now, and who gets told when it isn’t”. It will watch Juku once it has real users, the Pitstop demo and MCP-backbone, all of which run on one small shared server.

- **What it will watch:** whether pages and APIs respond and certificates are valid; latency, error rate, memory and disk; errors, with their stack traces; the AI-specific failures that still return a normal response, such as spend running ahead of its cap, refusals, gateway blocks and answer quality; and security events on the server, such as logins, `sudo` use and new listening ports.
- **Promises, not just graphs:** service level objectives with error budgets, such as “99% of Juku’s answers in under five seconds”, and an alert when a budget is burning too fast.
- **Only the alerts a person needs:** one channel to the operator’s phone, a runbook for every alert, and a test that fires every alert on purpose and checks that it arrives.
- **Detection only:** nothing in this project changes the server’s security settings.
- **Status:** in planning, with no code yet; most of it waits until Juku is live. Its results, including the misses, will be published as they are.
