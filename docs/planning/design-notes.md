# Design notes

The site was redesigned in October 2026, from a Windows 98-style desktop to
an editorial look modelled on magazine and book covers. These notes record
the brief and the choices that shaped it.

## The concept

- **A magazine, not a dashboard.** The home page is a masthead (the name as a
  wide wordmark, the role beneath it) over a grid of tall 5:7 covers, one per
  project, each with a numbered caption: `01 MCP-backbone`, then a one-line
  summary.
- **A project page is a feature article.** The project's name is the
  headline and the rest of its title the subtitle. The cover sits beside the
  facts (stack, status, links) and the write-up. Below them, a guided tour
  walks through the screenshots and charts one stop at a time.
- **Evidence over adjectives.** Every claim on a project page links to the
  repository or results that back it, and every image records where it came
  from.

## Palette

Arthur's own palette, taken from his drawing, is used as it is. There are no
whites or greys: Tailwind's default colours are switched off
(`src/styles/theme.css`), so only these can be used.

| Token       | Hex       | Use                                     |
| ----------- | --------- | --------------------------------------- |
| `ink`       | `#1a222c` | The page                                |
| `cream`     | `#ebd4c1` | Body text                               |
| `skin`      | `#f9b288` | Secondary text, labels                  |
| `yellow`    | `#ffea35` | Links, emphasis, focus outlines         |
| `red`       | `#eb3230` | Large type, rules, decoration           |
| `red-deep`  | `#952a25` | Covers                                  |
| `rust`      | `#c2523d` | Rules, decoration                       |
| `blue`      | `#3773a5` | Covers, charts                          |
| `blue-deep` | `#2a4a84` | Code blocks, covers, chart grid lines   |

Contrast on the ink page (WCAG): cream 11.2:1, skin 9.0:1 and yellow 13.0:1,
so all three carry body text. Red (3.8:1) and rust (3.5:1) are kept to large
type, rules and decoration. On coloured blocks, ink on yellow is 13.0:1 and
cream on deep blue 6.1:1.

## Type

- **Archivo** (variable width, self-hosted) for Latin text. The wordmark and
  display headings use its wide cuts in capitals. Small letter-spaced
  capitals mark labels and captions.
- **Japanese** falls through to the system's Japanese gothic (Hiragino, Noto
  Sans JP, Yu Gothic). It follows strict line-breaking rules, spaces Latin
  letters and digits slightly apart from Japanese, and sets headings with
  proportional kana.
- Paragraphs avoid ending on a single word, and straight quotes become
  typographic ones at build time.

## Covers

Each cover is drawn for the site as an SVG, in the palette, in a simple
book-cover style: a large word at the top (MCP, EVAL, PIT, GATE …), a small
caption, one illustration, and a word at the foot. The lettering is set in
Cinzel and, for kanji, Noto Serif JP (both SIL Open Font License), converted
to outlines so the covers need no font files. Each cover has a
`cover.source.txt` saying how it was made.

## Content model

- A project is a folder in `src/content/projects/<slug>/`: `en.md`, `ja.md`
  and `id.md` (front matter plus a Markdown write-up), an optional cover, and
  tour images, each with a `.source.txt`.
- The front matter is checked against a schema at build time, and the tests
  check that every language has the same links, settings and images.
- A tour stop has a walk-through (what the reader is looking at) and a key
  (what each term, number and colour means), for a reader new to the project.
- Charts are drawn from specs in `charts/` at two widths, the narrow one for
  phones, and in each language.
- `draft: true` shows a project in the dev preview only; its text and images
  are left out of production builds.

## Languages

English, Japanese and Indonesian, in a formal register (です・ます in
Japanese; "Anda" in Indonesian). Japanese and Indonesian are written for
meaning rather than translated word for word. English is at `/`, the others
under `/ja` and `/id`.

## Accessibility

- A skip link, visible focus outlines in yellow, and the page language set
  for each locale.
- Covers on cards are decorative (the caption names the project); on a
  project page, a cover that shows something real has alt text.
- Animations have a still image for visitors who prefer reduced motion.
- Layouts are checked at 375 px and on desktop, with no sideways scrolling.
