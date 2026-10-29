# nabilrobert-portfolio-site

Muhammad Nabil Rinaldi's portfolio: an editorial, magazine-style site that presents each
project with a cover, a write-up and a guided tour of its screenshots and
charts, in English, Japanese and Indonesian. Built with Vue 3, TypeScript,
Tailwind CSS 4 and Vite.

## Run it

Needs Node 24.

```bash
npm install
npm run dev
```

Before committing, run what CI runs (types, lint, formatting, tests and a
production build):

```bash
npm run check
```

## Layout

| Folder                    | What it holds                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `src/content/projects/`   | One folder per project: `en.md`, `ja.md`, `id.md`, a cover, tour images, and a `.source.txt` for every image. |
| `src/content/`            | The content loader (`index.ts`), the front-matter schema (`schema.ts`), types and the interface strings.      |
| `src/content/locales/`    | Interface text in each language (`en.ts` is the reference; the others must match its keys).                   |
| `src/views/`              | One component per route: home, all projects, a project, not found.                                            |
| `src/components/`         | `layout/` (masthead, footer), `sections/` (page sections), `ui/` (cards, links, tour stops).                   |
| `src/router/`             | Routes, with `/ja` and `/id` prefixes for the other languages.                                                |
| `src/styles/`             | The palette and type (`theme.css`), base styles (`main.css`) and write-up styles (`prose.css`).               |
| `build/`                  | The Vite plugin that turns Markdown into data at build time, checks it against the schema and drops drafts.   |
| `charts/`                 | The result charts as Vega-Lite specs; `npm run charts` draws them into the project folders.                  |
| `tests/`                  | Content, component and chart tests (Vitest).                                                                  |
| `public/`                 | Files served as they are: the favicon and touch icon.                                                         |
| `docs/planning/`          | Design notes and the record of library decisions.                                                             |

## Common changes

- **Add a project:** add a folder under `src/content/projects/` with the three
  Markdown files (a cover is optional; without one the card shows the
  project's initial). Set `draft: true` to see it in `npm run dev`
  without publishing it. `npm run check` reports anything missing or
  inconsistent between the languages.
- **Change a chart:** edit its file in `charts/`, run `npm run charts`, and
  commit the SVGs it writes.
- **Change the colours or type:** `src/styles/theme.css`.

## Docs

- [docs/guide.md](docs/guide.md): how the site works, in plain English: how a
  project folder becomes a page, step by step, a glossary, and where to
  change things.
- [docs/planning/](docs/planning/README.md): how the site was designed and
  why it is built this way.
  - [Design notes](docs/planning/design-notes.md): the magazine-cover concept,
    the palette and its contrast, type, covers, the content model and
    languages.
  - [Decisions](docs/planning/decisions.md): each library chosen, the reason,
    and what it was weighed against.
