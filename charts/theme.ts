// The site's palette and type for charts drawn with Vega-Lite, on the page's
// own dark colour. Mark colours were checked for colour-blind separation and
// contrast against it.
import type { Config, TopLevelSpec } from 'vega-lite'

/** One chart inside a vertical stack (vconcat) of charts. */
export type StackedSpec = Extract<TopLevelSpec, { vconcat: unknown }>['vconcat'][number]

/** The languages every chart is drawn in, as the site's locale codes. */
export type Lang = 'en' | 'ja' | 'id'

/** A chart module: which project folder it belongs to, its file name, and its spec per language. */
export interface Chart {
  slug: string
  name: string
  spec: (lang: Lang) => TopLevelSpec
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

/** Common Vega-Lite config: 640 px wide in total, on the page's colour. */
export const config: Config = {
  background: C.ink,
  padding: 24,
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

/** Notes under a chart: each entry is a line of text; the last is the source. */
export function footnotes(lines: string[], source: string): StackedSpec {
  const values = [...lines.map((t, i) => ({ i, t, kind: 'note' })), { i: lines.length, t: source, kind: 'source' }]
  return {
    width: 592,
    height: { step: 22 },
    data: { values },
    mark: { type: 'text', align: 'left', baseline: 'middle', fontSize: 14 },
    encoding: {
      y: { field: 'i', type: 'ordinal', axis: null },
      x: { datum: 0, type: 'quantitative', scale: { domain: [0, 1] }, axis: null },
      text: { field: 't' },
      color: {
        field: 'kind',
        type: 'nominal',
        scale: { domain: ['note', 'source'], range: [C.cream, C.skin] },
        legend: null,
      },
    },
  }
}
