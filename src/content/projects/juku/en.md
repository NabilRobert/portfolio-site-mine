---
title: "Juku: an agent crew that coaches learners of Japanese"
summary: A learning platform, now in planning, for Indonesian adults preparing for the JLPT, run by a small crew of AI agents on this portfolio’s own MCP stack.
category: portfolio
order: 6
draft: true
status: wip
stack: Python · FastAPI · Postgres · MCP
coverAlt: "Illustration: four name cards, each with a large kanji and a name (栞 Shiori, with a red bookmark ribbon; 稽 Keiko; 日 Nikki; 正 Tadashi), under the word “Juku”, with the caption “JLPT N5 → N2” and “Agents” spelled out below."
links:
  - { label: Repository, href: "https://github.com/NabilRobert/juku-agents", primary: true }
---

A learning platform, now in planning, for Indonesian adults studying for the Japanese-Language Proficiency Test (JLPT), from level N5 to N2. *Juku* (塾) is the Japanese word for a cram school, where staff coach students towards an exam; here the staff is a small crew of AI agents, each named with a pun on its job.

It follows Pitstop's pattern, this time for learning Japanese: code computes each learner's progress, a small team of agents plans the week and writes a report in Indonesian, and a critic checks every number and word against the data before code decides whether it is approved.

- **The crew:**
  - **Shiori** (栞, a bookmark: it keeps your place): the lead, and the keeper of each learner's memory.
  - **Keiko** (稽古, practice): plans each week.
  - **Nikki** (日記, a diary): writes the weekly report.
  - **Tadashi** (正しい, correct): the critic.
- **Memory the learner can see:** what Shiori remembers about each learner is structured and backed by evidence, and learners can see it and remove any of it.
- **Built on the rest of this portfolio:** all knowledge of Japanese comes from open dictionaries (JMdict, KANJIDIC2, Tatoeba), reached only through MCP tools served by MCP-backbone, behind the MCP security gateway. The evaluation harness measures quality, and agent-observability traces each request.
- **Checked from the start:** evaluations are written before the agents, and every guardrail is code with its own test.
- **Status:** in planning, with no code yet. It will be the first project in this portfolio with real users: a study group of Indonesian learners.
