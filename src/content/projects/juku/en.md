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
screenshots:
  - src: stack.svg
    alt: "Planned architecture diagram. The learner’s phone shows a light web page served by the Juku app (Python and FastAPI), which holds Shiori, the chat, and the weekly reports by Keiko, Nikki and Tadashi, and calls an AI model through one provider. Every tool call goes through mcp-security-gateway, either to MCP-backbone, which reads the dictionaries, or to Juku’s own MCP server, which reads one learner’s progress and memory, and the dictionaries. It is traced by agent-observability and measured by agent-eval-harness."
    caption: "How Juku fits together"
    description: "A plan, not yet built. Learners use Juku from a phone, through a light web page served by a small Python app. Inside the app are the two kinds of agent work: Shiori, who answers questions in a chat, and the weekly reports written by Keiko, Nikki and Tadashi. Whenever an agent needs facts, it calls a tool, and every tool call passes through the security gateway, where each agent has its own key and its own list of allowed tools. Behind the gateway are two servers. MCP-backbone answers questions from open dictionaries. Juku’s own server holds each learner’s progress and memory, and is built so that a session can only ever see one learner: no tool even takes a learner’s ID. Both are read-only. The rest of the portfolio supplies the tracing and the quality measurement."
    terms:
      - { term: "MCP server", meaning: "A service that offers tools to AI agents through the Model Context Protocol, an open standard." }
      - { term: "mcp-security-gateway", meaning: "This portfolio’s gateway: it checks each agent’s key, allows only the tools on that agent’s list, screens tool outputs for injected instructions, and records every call." }
      - { term: "MCP-backbone", meaning: "This portfolio’s read-only database server, here serving the dictionaries." }
      - { term: "Juku’s MCP server", meaning: "A server for learner data, opened with a short-lived signed token for one learner and one purpose, so a session can never reach another learner’s data." }
      - { term: "JMdict, KANJIDIC2, Tatoeba", meaning: "Open data sets: a Japanese dictionary, a kanji dictionary and a collection of example sentences." }
      - { term: "Read-only", meaning: "Tools can look at data but cannot change it." }
  - src: weekly.svg
    alt: "Planned flow diagram of the weekly report. Facts are computed in code; Keiko plans the week from the code’s candidates; Tadashi checks the plan; Nikki writes the report in Indonesian; Tadashi checks the report; code re-checks every number, word and citation and decides; the report is published to the learner. A check that finds issues sends the work back for revision, at most twice; if it still fails, a facts-only report is published instead."
    caption: "The weekly report"
    description: "A plan, not yet built. Each week, for each learner, code first works out the facts: progress, recent mistakes and the words worth studying next. Keiko, the planner, chooses the week’s study from those candidates, and Tadashi, the critic, checks the plan against exactly what Keiko was given. Nikki then writes the report in Indonesian, and Tadashi checks it in the same way. If Tadashi finds a serious problem, the work goes back for revision, at most twice. Finally, code itself re-checks every number, word and citation and decides whether the report goes out, so a mistake the critic misses still cannot reach the learner. If a report keeps failing, the learner receives a plain report of the facts instead. This is Pitstop’s pattern, applied to learning."
    terms:
      - { term: "Facts", meaning: "Figures computed by code from the learner’s activity, never by an AI model, because models are unreliable at arithmetic over tables." }
      - { term: "Candidates", meaning: "The words and practice items that code proposes for the week. Keiko may only choose among them." }
      - { term: "Critic", meaning: "An agent whose only job is to find problems in another agent’s work: here, Tadashi." }
      - { term: "Serious problem", meaning: "An issue the critic rates as high severity, such as a figure that is not in the facts. Smaller issues are noted but do not block the report." }
      - { term: "Code decides", meaning: "The final approval is ordinary code with tests, not an AI model’s judgement." }
      - { term: "Facts-only report", meaning: "A plain report built from a template, used when the agents’ version keeps failing. How often this happens is counted." }
  - src: memory.svg
    alt: "Planned flow diagram of memory. An agent proposes a note with the learner’s activity that backs it up; code checks that it is about learning, that the evidence is this learner’s, and that the evidence really shows it. If not, it is rejected and counted; if so, it is stored as a note. The learner sees every note with its evidence and can remove it or mark it wrong. Each week, a note lapses once its evidence is over 30 days old and has not recurred."
    caption: "Memory the learner can see"
    description: "A plan, not yet built. Juku’s agents can remember things about a learner, such as a grammar point they keep getting wrong, but they cannot simply write it down. An agent can only propose a note, together with the records of the learner’s activity that support it. Code then checks the note: it must be about learning, the evidence must belong to this learner, and the evidence must really show the pattern. Notes that fail are rejected, and the rejections are counted. Notes that pass are stored, and the learner can see every one, with its evidence, and remove it or mark it wrong. Each week, a note fades once its evidence is more than 30 days old and the pattern has not come back."
    terms:
      - { term: "Note", meaning: "Something an agent remembers about a learner, stored with the evidence for it." }
      - { term: "Evidence", meaning: "The learner’s own activity records that show the pattern, such as answers to past exercises." }
      - { term: "About learning", meaning: "Only notes about learning are allowed; anything else about a person is refused." }
      - { term: "Lapses", meaning: "The note is removed once its evidence is old and the pattern has not recurred, so memory does not keep outdated claims." }
      - { term: "Counted", meaning: "Rejected proposals, learners’ corrections and outdated claims are all measured, to show how reliable the memory is." }
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
