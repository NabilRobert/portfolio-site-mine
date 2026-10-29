---
title: "Inspect AI: strict tool schemas, reported upstream"
summary: A bug found by this portfolio’s own evaluation harness, fixed in its own server, and reported to the open-source Inspect AI framework.
category: opensource
order: 7
status: review
stack: Python · Inspect AI · OpenAI API · MCP
coverAlt: "Cover with the word “Strict” over a card of tool-schema lines, one of them highlighted, stamped “400” in red, and an arrow rising to an open-issue mark; captioned “PR #6184 · In review”, with “Upstream” spelled out below."
links:
  - { label: "Issue #6093", href: "https://github.com/UKGovernmentBEIS/inspect_ai/issues/6093", primary: true }
  - { label: "PR #6184", href: "https://github.com/UKGovernmentBEIS/inspect_ai/pull/6184" }
  - { label: The fix in MCP-backbone, href: "https://github.com/NabilRobert/MCP-backbone/pull/3" }
---

An open-source contribution that grew out of this portfolio's own work. When the evaluation harness ran agents against MCP-backbone through Inspect AI, a widely used framework for evaluating AI models, every request failed with an error before the model even ran.

- **The cause:** Inspect's OpenAI-compatible provider marks every tool as *strict* by default, but OpenAI's strict mode only accepts tool schemas in which every argument is required. A tool with an optional or defaulted argument, which is common, makes the whole request fail.
- **Fixed at home:** MCP-backbone now publishes strict-valid schemas, with a test that fails on any schema that is not. The harness keeps strict mode off on purpose: every published run was made without it, and turning it on would change the agent being measured.
- **Reported upstream:** the MCP Python SDK had already declined this direction, so the report went to Inspect AI. It points to the exact lines, with a reproduction that needs no API key, and proposes a fix: check each tool's schema before marking it strict. Inspect's own Responses API path already avoids the problem.
- **Status:** the maintainers accepted the issue, and the fix is open as a pull request under review. With the fix, Inspect checks each tool's schema and sends `strict: false` only for tools strict mode would reject, with a warning naming the tool.

Found by my evaluation harness, fixed in my server, reported upstream.
