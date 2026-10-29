// The site's palette and type for charts drawn with Vega-Lite, on the page's
// own dark colour. Mark colours were checked for colour-blind separation and
// contrast against it.
import type { Config, TopLevelSpec } from 'vega-lite'
import { wrap } from './text-width.ts'

/** One chart inside a vertical stack (vconcat) of charts. */
export type StackedSpec = Extract<TopLevelSpec, { vconcat: unknown }>['vconcat'][number]

/** The languages every chart is drawn in, as the site's locale codes. */
export type Lang = 'en' | 'ja' | 'id'

/**
 * The widths each chart is drawn at. The page shows the narrow one on phones
 * (below 40rem), where the wide one would be scaled down to about half size
 * and its text would be too small to read.
 */
export interface Size {
  name: 'wide' | 'narrow'
  /** The whole SVG, in pixels. */
  width: number
  /** The margin on every side. */
  padding: number
  titleSize: number
  /** Body text: labels, notes and the source line. */
  textSize: number
}
export const sizes: Size[] = [
  { name: 'wide', width: 640, padding: 24, titleSize: 22, textSize: 14 },
  { name: 'narrow', width: 360, padding: 16, titleSize: 19, textSize: 13 },
]

/** The width left for the chart itself, inside the margins. */
export const innerWidth = (size: Size) => size.width - 2 * size.padding

/** A chart module: which project folder it belongs to, its file name, and its spec per language and size. */
export interface Chart {
  slug: string
  name: string
  spec: (lang: Lang, size: Size) => TopLevelSpec
}
export const C = {
  ink: '#1a222c',
  cream: '#ebd4c1',
  skin: '#f9b288',
  yellow: '#ffea35',
  red: '#eb3230',
  blue: '#3773a5',
  blueDeep: '#2a4a84',
}

export const font =
  "'Helvetica Neue', Helvetica, Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Noto Sans JP', 'Yu Gothic', Meiryo, sans-serif"

/** Common Vega-Lite config, on the page's colour. Each spec sets its own padding. */
export const config: Config = {
  background: C.ink,
  font,
  view: { stroke: null },
  axisY: { minExtent: 0 },
  facet: { spacing: 18 },
  title: {
    color: C.cream,
    subtitleColor: C.skin,
    fontSize: 22,
    subtitleFontSize: 14.5,
    anchor: 'start',
    offset: 18,
    subtitlePadding: 8,
  },
  axis: {
    labelColor: C.skin,
    titleColor: C.skin,
    labelFontSize: 14,
    titleFontSize: 14,
    titleFontWeight: 'normal',
    gridColor: C.blueDeep,
    gridDash: [2, 4],
    domain: false,
    ticks: false,
    labelPadding: 8,
  },
  header: {
    labelColor: C.skin,
    labelFontSize: 13.5,
    labelFontWeight: 'bold',
    labelAngle: 0,
    labelAlign: 'left',
    labelAnchor: 'start',
    labelOrient: 'top',
    labelPadding: 6,
    title: null,
  },
  legend: {
    labelColor: C.cream,
    labelFontSize: 15,
    labelLimit: 400,
    orient: 'top',
    direction: 'horizontal',
    title: null,
    symbolStrokeWidth: 5,
    columnPadding: 28,
    offset: 22,
  },
  text: { font, color: C.cream },
}

/** The chart's title and subtitle, wrapped to its width. */
export function heading(title: string, subtitle: string, size: Size) {
  return {
    text: wrap(title, innerWidth(size), size.titleSize, true),
    subtitle: wrap(subtitle, innerWidth(size), size.textSize + 0.5),
    fontSize: size.titleSize,
    subtitleFontSize: size.textSize + 0.5,
  }
}

/** Notes under a chart, wrapped to its width, then the source line. */
export function footnotes(notes: string, source: string, size: Size): StackedSpec {
  const width = innerWidth(size)
  const lines = [
    ...wrap(notes, width, size.textSize).map((text) => ({ text, kind: 'note' })),
    ...wrap(source, width, size.textSize).map((text) => ({ text, kind: 'source' })),
  ]
  return {
    width,
    height: { step: Math.round(size.textSize * 1.6) },
    data: { values: lines.map((line, i) => ({ ...line, i })) },
    mark: { type: 'text', align: 'left', baseline: 'middle', fontSize: size.textSize },
    encoding: {
      y: { field: 'i', type: 'ordinal', axis: null },
      x: { datum: 0, type: 'quantitative', scale: { domain: [0, 1] }, axis: null },
      text: { field: 'text' },
      color: {
        field: 'kind',
        type: 'nominal',
        scale: { domain: ['note', 'source'], range: [C.cream, C.skin] },
        legend: null,
      },
    },
  }
}

/**
 * Text Vega draws as one label (a facet header or legend entry), wrapped:
 * lines are joined with a newline, and `labelExpr: splitLines` splits them again.
 */
export const wrapLabel = (text: string, maxWidth: number, fontSize: number, bold = false) =>
  wrap(text, maxWidth, fontSize, bold).join('\n')
export const splitLines = "split(datum.label, '\\n')"

/** One layer of a faceted chart's rows. */
type FacetSpec = Extract<StackedSpec, { facet: unknown }>
export type RowLayer = Extract<FacetSpec['spec'], { layer: unknown }>['layer'][number]

/** A facet row's header in the chart's own text style: cream, wrapped, never cut short. */
export function rowHeader(fontSize: number, width: number) {
  return {
    labelExpr: splitLines,
    labelFontSize: fontSize,
    labelLineHeight: Math.round(fontSize * 1.3),
    labelFontWeight: 'normal' as const,
    labelColor: C.cream,
    labelLimit: width,
  }
}

/** The text around a chart: its title and subtitle above, its notes and source below. */
export interface FrameText {
  title: string
  sub: string
  notes: string
  source: string
}

/**
 * A whole chart: the title, then `body` (the chart itself), then the notes.
 * Each colour channel keeps its own scale, so the notes' colours never mix
 * with the chart's. `spacing` is the gap between the chart and its notes.
 */
export function chartFrame(text: FrameText, size: Size, body: StackedSpec, spacing?: number): TopLevelSpec {
  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v6.json',
    config,
    padding: size.padding,
    title: heading(text.title, text.sub, size),
    resolve: { scale: { fill: 'independent', stroke: 'independent', color: 'independent' } },
    ...(spacing === undefined ? {} : { spacing }),
    vconcat: [body, footnotes(text.notes, text.source, size)],
  }
}
