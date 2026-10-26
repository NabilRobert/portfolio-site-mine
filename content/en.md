# Content draft (English)

The words for the site, settled before the design. Every figure is copied
from the linked project's own README or case study. Lines marked TODO
need Arthur.

## Intro

**[TODO: name as it should appear]**, AI and backend engineer.

I build AI systems and then prove they work: an AI-facing server that
can't be talked into damaging data, a harness that measures whether an
agent got better or worse, and an agent pipeline that ran unattended for
eleven weeks, with its real run records published.

[TODO: one line on what you're looking for: role, location, Japan?]

## Projects

The three are connected: the first is a system, the second measures
systems like it, and the third shows one in operation.

### 1. MCP-backbone: a database server an AI can't misuse

An MCP server that lets an AI model explore a Postgres database and query
it, safely.
- Every query is parsed, cost-checked, run read-only and logged.
- The database itself refuses writes, so a validator bug can't become a
  data-loss bug.
- **Proof:** an adversarial red-team suite and 141 tests against real
  Postgres. `gpt-5-mini` answered 29 of 30 questions correctly under strict
  grading.
- **Live:** https://mcp.my.id
- **Code:** https://github.com/NabilRobert/MCP-backbone

### 2. agent-eval-harness: does the agent still work?

Measures whether an agent setup works, and fails CI when a change makes
it worse by more than run-to-run noise. It's built on Inspect AI, and
adds the regression gate, regrading of old runs, and provenance.
- **Proof:** published runs with five attempts per task.
  - On a database suite, `gpt-5-mini` scored 191/200 and 192/200 on two
    separate runs.
  - The gate flagged a real regression (−61 points with the filesystem
    discovery tools removed), and didn't flag the same agent run twice.
  - A full run costs about $0.53.
- **Honest about its limits:** on the database suite it missed some
  smaller deliberate drops, and those are published as failed proofs.
- **Code:** https://github.com/NabilRobert/agent-eval-harness

### 3. Pitstop: an agent pipeline in operation, with the evidence

An AI dashboard for Google Ads. Three agents analyse, recommend and
summarise, and a fourth, the critic, reviews every output first.
- It ran unattended for about eleven weeks, on synthetic ad data.
- The case study is built from its own run records: 68 daily runs, 3
  failures with their causes, about $0.15 per run, and how the critic's
  verdicts changed.
- Every number comes from a published SQL query.
- **Live demo:** https://pitcrew-public.my.id. It's read-only, and it
  can't spend money; that's verified.
- **Code:** https://github.com/NabilRobert/pitstop-crew-public

## Other work

[TODO: which other projects to show, one line each]

## Contact

- Email: [TODO: which address to show publicly]
- GitHub: https://github.com/NabilRobert
- LinkedIn: [TODO]
- CV: [TODO: PDF]
