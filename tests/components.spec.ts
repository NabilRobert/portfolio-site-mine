import { describe, expect, it } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createMemoryHistory } from 'vue-router'
import { defineComponent, h } from 'vue'
import type { Component } from 'vue'
import type { VueWrapper } from '@vue/test-utils'
import { createAppRouter } from '../src/router'
import { useLocale } from '../src/composables/useLocale'
import WinWindow from '../src/components/win98/WinWindow.vue'
import WinButton from '../src/components/win98/WinButton.vue'

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

describe('WinWindow', () => {
  it('renders its title, menu, body and status bar', async () => {
    const { wrapper } = await withRouter(
      WinWindow,
      '/',
      {
        title: 'Hello',
        icon: 'H',
        menu: [{ label: 'Repository', href: 'https://example.com' }],
        status: ['left', 'right'],
      },
      { default: '<p>body text</p>' },
    )
    expect(wrapper.find('h2').text()).toBe('Hello')
    expect(wrapper.find('nav a').attributes('href')).toBe('https://example.com')
    expect(wrapper.text()).toContain('body text')
    expect(wrapper.text()).toContain('right')
  })

  it('shows only a close button when closeOnly is set', async () => {
    const { wrapper } = await withRouter(WinWindow, '/', { title: 'Dialog', closeOnly: true })
    expect(wrapper.findAll('[aria-hidden="true"] > span')).toHaveLength(1)
  })
})

describe('WinButton', () => {
  it('links within the site with `to`', async () => {
    const { wrapper } = await withRouter(WinButton, '/', { to: '/projects' }, { default: 'Go' })
    expect(wrapper.find('a').attributes('href')).toBe('/projects')
  })

  it('links out with `href`', async () => {
    const { wrapper } = await withRouter(WinButton, '/', { href: 'https://example.com' }, { default: 'Out' })
    expect(wrapper.find('a').attributes('href')).toBe('https://example.com')
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
