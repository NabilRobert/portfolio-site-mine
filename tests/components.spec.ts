import { describe, expect, it } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createMemoryHistory } from 'vue-router'
import { defineComponent, h } from 'vue'
import type { Component } from 'vue'
import type { VueWrapper } from '@vue/test-utils'
import { createAppRouter } from '../src/router'
import { useLocale } from '../src/composables/useLocale'
import { getProject } from '../src/content'
import TextLink from '../src/components/ui/TextLink.vue'
import LanguageSwitch from '../src/components/ui/LanguageSwitch.vue'
import ProjectCard from '../src/components/ui/ProjectCard.vue'
import SiteHeader from '../src/components/layout/SiteHeader.vue'
import ProjectArticle from '../src/components/sections/ProjectArticle.vue'

async function withRouter(
  component: Component,
  path = '/',
  props: Record<string, unknown> = {},
  slots: Record<string, string> = {},
) {
  const router = createAppRouter(createMemoryHistory())
  router.push(path)
  await router.isReady()
  const wrapper = mount(component, { props, slots, global: { plugins: [router] } })
  await flushPromises()
  return { wrapper, router }
}

describe('TextLink', () => {
  it('links within the site with `to`, without the outward arrow', async () => {
    const { wrapper } = await withRouter(TextLink, '/', { to: '/projects' }, { default: 'Go' })
    expect(wrapper.find('a').attributes('href')).toBe('/projects')
    expect(wrapper.text()).toBe('Go')
  })

  it('links out with `href`, with an arrow hidden from screen readers', async () => {
    const { wrapper } = await withRouter(TextLink, '/', { href: 'https://example.com' }, { default: 'Out' })
    expect(wrapper.find('a').attributes('href')).toBe('https://example.com')
    expect(wrapper.find('[aria-hidden="true"]').text()).toBe('↗')
  })
})

describe('LanguageSwitch', () => {
  it('offers the same page in each language and marks the current one', async () => {
    const { wrapper } = await withRouter(LanguageSwitch, '/ja/projects/pitstop')
    const links = wrapper.findAll('a')
    expect(links.map((a) => a.attributes('href'))).toEqual([
      '/projects/pitstop',
      '/ja/projects/pitstop',
      '/id/projects/pitstop',
    ])
    expect(links.map((a) => a.attributes('lang'))).toEqual(['en', 'ja', 'id'])
    expect(links.filter((a) => a.attributes('aria-current')).map((a) => a.text())).toEqual(['日本語'])
  })
})

describe('ProjectCard', () => {
  const project = getProject('ja', 'pitstop')
  if (!project) throw new Error('pitstop is missing')

  it('links to the project in the current language and names it in a heading', async () => {
    const { wrapper } = await withRouter(ProjectCard, '/ja', { project, number: 3 })
    expect(wrapper.find('a').attributes('href')).toBe('/ja/projects/pitstop')
    expect(wrapper.find('h3').text()).toBe('Pitstop')
    expect(wrapper.text()).toContain('03')
  })

  it('keeps the cover decorative, since the caption names the project', async () => {
    const { wrapper } = await withRouter(ProjectCard, '/', { project, number: 1 })
    expect(wrapper.find('img').attributes('alt')).toBe('')
  })

  it('tags the featured project', async () => {
    const { wrapper } = await withRouter(ProjectCard, '/ja', { project: { ...project, featured: true }, number: 1 })
    expect(wrapper.text()).toContain('注目')
  })
})

describe('ProjectArticle', () => {
  it('shows screenshots with their alt text and caption, under a heading', async () => {
    const project = getProject('id', 'mcp-backbone')
    if (!project) throw new Error('mcp-backbone is missing')
    const { wrapper } = await withRouter(ProjectArticle, '/id/projects/mcp-backbone', { project })
    expect(wrapper.find('#screenshots-heading').text()).toBe('Tangkapan layar')
    const figure = wrapper.find('figure')
    expect(figure.find('img').attributes('alt')).toBe(project.screenshots[0]?.alt)
    expect(figure.find('figcaption').text()).toContain('26 Oktober 2026')
  })

  it('leaves the section out for a project without screenshots', async () => {
    const project = getProject('en', 'pitstop')
    if (!project) throw new Error('pitstop is missing')
    const { wrapper } = await withRouter(ProjectArticle, '/projects/pitstop', { project })
    expect(wrapper.find('figure').exists()).toBe(false)
  })
})

describe('SiteHeader', () => {
  it('makes the wordmark the h1 on the home page only', async () => {
    const home = await withRouter(SiteHeader, '/id')
    expect(home.wrapper.find('h1').text()).toContain('Nabil Robert')
    const other = await withRouter(SiteHeader, '/id/projects')
    expect(other.wrapper.find('h1').exists()).toBe(false)
  })

  it('marks "Work" as the current page on the project list', async () => {
    const { wrapper } = await withRouter(SiteHeader, '/projects')
    const current = wrapper.findAll('a[aria-current="page"]')
    expect(current.map((a) => a.text())).toEqual(['Work'])
  })
})

describe('useLocale', () => {
  const Probe = defineComponent({
    setup() {
      const l = useLocale()
      return () =>
        h(
          'pre',
          JSON.stringify({
            lang: l.lang.value,
            toProjects: l.localePath('/projects'),
            toJa: l.switchPath('ja'),
            toEn: l.switchPath('en'),
            toId: l.switchPath('id'),
          }),
        )
    },
  })
  const read = (wrapper: VueWrapper) => JSON.parse(wrapper.find('pre').text())

  it('reads the language from the path and keeps links in it', async () => {
    const { wrapper } = await withRouter(Probe, '/ja/projects/pitstop')
    expect(read(wrapper)).toEqual({
      lang: 'ja',
      toProjects: '/ja/projects',
      toJa: '/ja/projects/pitstop',
      toEn: '/projects/pitstop',
      toId: '/id/projects/pitstop',
    })
  })

  it('defaults to English at the root', async () => {
    const { wrapper } = await withRouter(Probe, '/')
    expect(read(wrapper)).toMatchObject({ lang: 'en', toProjects: '/projects', toJa: '/ja', toId: '/id' })
  })
})
