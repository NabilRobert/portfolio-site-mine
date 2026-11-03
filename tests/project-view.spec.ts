// What a project page does when its write-up and tour fail to load, for
// example in a tab left open across a deploy, after the files it asks for
// have been replaced. loadProjectDetails is replaced here to fail on demand.
import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createMemoryHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import { createAppRouter } from '../src/router'
import ProjectView from '../src/views/ProjectView.vue'
import * as content from '../src/content'

vi.mock('../src/content', async (importOriginal) => {
  const original = await importOriginal<typeof import('../src/content')>()
  return { ...original, loadProjectDetails: vi.fn(original.loadProjectDetails) }
})

async function openProject(path: string, slug: string) {
  const router = createAppRouter(createMemoryHistory())
  router.push(path)
  await router.isReady()
  const wrapper = mount(ProjectView, { props: { slug }, global: { plugins: [router, createHead()] } })
  await flushPromises()
  return wrapper
}

describe('a project page whose write-up fails to load', () => {
  afterEach(() => vi.mocked(content.loadProjectDetails).mockRestore())

  it('says so, in the page’s language, and offers to reload', async () => {
    vi.mocked(content.loadProjectDetails).mockRejectedValueOnce(
      new Error('Failed to fetch dynamically imported module'),
    )
    const wrapper = await openProject('/id/projects/pitstop', 'pitstop')
    const alert = wrapper.find('[role="alert"]')
    expect(alert.exists()).toBe(true)
    expect(alert.text()).toContain('gagal dimuat')
    expect(alert.find('button').text()).toBe('Muat ulang halaman')
  })

  it('shows no message when the write-up loads', async () => {
    const wrapper = await openProject('/projects/pitstop', 'pitstop')
    // The real write-up is a separate file; under load it can take longer than one tick.
    await vi.waitFor(() => expect(wrapper.find('.prose-editorial').text()).toContain('Anna'))
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })
})
