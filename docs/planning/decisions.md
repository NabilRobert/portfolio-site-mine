# Decisions

Libraries and tools chosen for the site, with the reason and what each was
weighed against. The stack itself (Vue 3, TypeScript, Tailwind, Vite,
Vitest) is the one Arthur uses across his projects.

## Adopted

### Front matter: Zod and gray-matter

- **Does:** a Zod schema (`src/content/schema.ts`) checks every project's
  front matter at build time, and the TypeScript types come from it.
  gray-matter splits the front matter from the Markdown.
- **Replaced:** a hand-written interface, an unchecked cast and a
  front-matter regular expression.
- **Why:** a mistake in an entry fails the build with the file and the
  field, rather than reaching the site. Both run at build time only, so
  nothing is added to the site's download. Zod is already in Arthur's
  eazy-app and telur-pos-app.
- **Weighed against:** Valibot, which is smaller but new to his stack.

### Charts: Vega-Lite

- **Does:** the result charts are Vega-Lite specs with their data in
  `charts/`. `npm run charts` draws them to SVG in each language and at two
  widths; a test fails when a committed SVG no longer matches its spec.
- **Replaced:** SVGs placed by hand from a script outside the repo.
- **Why:** anyone can redraw a chart from the repo, and the page still shows
  an image with alt text and a walk-through, with no chart code in the
  browser.
- **Weighed against:** Chart.js, which Arthur uses in Pitstop, but it draws
  on a canvas in the browser and would replace the image-and-text tour stops.

### Chart text widths: a fixed Helvetica table

- **Does:** `charts/text-width.ts` measures text with Helvetica's published
  character widths, so Vega lays out and wraps labels correctly without a
  browser.
- **Why:** Vega's own fallback guesses widths about half again too wide,
  which padded the charts and cut labels short.
- **Weighed against:** node-canvas, which measures with the fonts installed
  on each machine, so the SVGs drawn on a Mac and in CI would differ and the
  drift test would fail.

### Page titles and descriptions: @unhead/vue

- **Does:** each page sets its own title and description, and the page
  language, through `useHead`.
- **Replaced:** a hand-rolled helper that set one title for the whole site.
- **Why:** each project page gets a title and description of its own, and
  language alternates can be added once the domain is known. About 6 KB
  gzipped.
- **Weighed against:** keeping the hand-rolled helper.

### Typographic quotes: SmartyPants

- **Does:** straight quotes and apostrophes become typographic ones at build
  time: in the Markdown through the `marked-smartypants` extension, which
  leaves code alone, and in the front matter's reader-facing text through
  `smartypants` itself.
- **Why:** the established tool for the job, run at build time only. Arthur
  approved it on 28 October 2026.
- **Weighed against:** converting quotes by hand in the content, which every
  new entry would have to repeat.

## Declined

### vue-i18n for interface strings

Matches Arthur's Pitstop frontend, but the site's typed strings and
route-based languages already work, vue-i18n would not handle the URL
prefixes, and it adds roughly 15–20 KB gzipped. The library is heavier than
the problem here.

### Animated WebP for the demo recordings

Tried on MCP-backbone's demos: the WebP came out larger than the GIF (1.70 MB
against 1.57 MB). The still screenshots did move to WebP (3–6 times smaller).
A video would be much smaller still, but it needs an encoder and video
support in the tour; not done yet.
