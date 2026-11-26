// Where the page scrolls after a navigation: to a section named in the hash,
// both when a menu link is clicked and when a shared link such as /#about is
// opened directly, before the page has finished rendering.
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createMemoryHistory, START_LOCATION } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import { createAppRouter, scrollTo } from '../src/router'

const at = (hash: string) => ({ hash, path: '/', matched: [] }) as unknown as RouteLocationNormalized
const elsewhere = { ...START_LOCATION, path: '/projects' } as RouteLocationNormalized

describe('scrolling after a navigation', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('scrolls smoothly to the section when a menu link is clicked', async () => {
    expect(await scrollTo(at('#about'), elsewhere, null)).toEqual({ el: '#about', behavior: 'smooth' })
  })

  it('on a direct load, waits for the page to render, then goes to the section', async () => {
    document.body.innerHTML = '<main id="main"></main>'
    setTimeout(() => {
      document.getElementById('main')!.innerHTML = '<section id="about">About</section>'
    }, 120)
    expect(await scrollTo(at('#about'), START_LOCATION, null)).toEqual({ el: '#about' })
  })

  it('on a direct load to a section that never appears, gives up and stays at the top', async () => {
    vi.useFakeTimers()
    document.body.innerHTML = '<main id="main"><p>page</p></main>'
    const position = scrollTo(at('#nowhere'), START_LOCATION, null)
    await vi.advanceTimersByTimeAsync(3500)
    expect(await position).toEqual({ top: 0 })
    vi.useRealTimers()
  })

  it('keeps the browser’s remembered position on back and forward', async () => {
    expect(await scrollTo(at('#about'), elsewhere, { left: 0, top: 640 })).toEqual({ left: 0, top: 640 })
  })

  it('goes to the top of a new page with no section named', async () => {
    expect(await scrollTo(at(''), elsewhere, null)).toEqual({ top: 0 })
  })

  it('is the scroll behaviour the router uses', () => {
    expect(createAppRouter(createMemoryHistory()).options.scrollBehavior).toBe(scrollTo)
  })
})
