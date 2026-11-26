import { createRouter, createWebHistory, START_LOCATION } from 'vue-router'
import type { RouteLocationNormalized, RouteRecordRaw, RouterHistory, RouterScrollBehavior } from 'vue-router'
import { locales } from '@/content'
import type { LocaleCode } from '@/content'

declare module 'vue-router' {
  interface RouteMeta {
    lang?: LocaleCode
  }
}

const HomeView = () => import('@/views/HomeView.vue')
const ProjectsView = () => import('@/views/ProjectsView.vue')
const ProjectView = () => import('@/views/ProjectView.vue')
const NotFoundView = () => import('@/views/NotFoundView.vue')

// The same pages under each locale's prefix: '/', '/projects', '/projects/:slug'
// in English, and '/ja', '/ja/projects', ... in the others.
const pageRoutes: RouteRecordRaw[] = (Object.entries(locales) as [LocaleCode, (typeof locales)[LocaleCode]][]).flatMap(
  ([lang, { prefix }]) => [
    { path: prefix || '/', name: `home-${lang}`, component: HomeView, meta: { lang } },
    { path: `${prefix}/projects`, name: `projects-${lang}`, component: ProjectsView, meta: { lang } },
    { path: `${prefix}/projects/:slug`, name: `project-${lang}`, component: ProjectView, meta: { lang }, props: true },
  ],
)

export const routes: RouteRecordRaw[] = [
  ...pageRoutes,
  { path: '/:rest(.*)*', name: 'not-found', component: NotFoundView, meta: { lang: 'en' } },
]

// How long a direct load waits for its section, and how often it looks.
const SECTION_WAIT_MS = 3000
const SECTION_POLL_MS = 50

/** Resolves true once the page's view has rendered with the element `id` on it, or false after `waitMs`. */
function whenRendered(id: string, waitMs: number): Promise<boolean> {
  const started = Date.now()
  return new Promise((resolve) => {
    const check = () => {
      const viewHasRendered = (document.getElementById('main')?.childElementCount ?? 0) > 0
      if (viewHasRendered && document.getElementById(id)) return resolve(true)
      if (Date.now() - started > waitMs) return resolve(false)
      setTimeout(check, SECTION_POLL_MS)
    }
    check()
  })
}

/**
 * Where to scroll after a navigation. Back and forward keep the remembered
 * position; a menu link to a section scrolls there smoothly. A link opened
 * directly (a shared /#about) arrives before the page has rendered, so it
 * waits for the section first; the footer's #contact is there early, but in
 * the wrong place until the page above it renders.
 */
export const scrollTo = (async (to: RouteLocationNormalized, from: RouteLocationNormalized, saved) => {
  if (saved) return saved
  if (!to.hash) return { top: 0 }
  if (from !== START_LOCATION) return { el: to.hash, behavior: 'smooth' }
  const found = await whenRendered(to.hash.slice(1), SECTION_WAIT_MS)
  return found ? { el: to.hash } : { top: 0 }
}) satisfies RouterScrollBehavior

export function createAppRouter(history: RouterHistory = createWebHistory()) {
  return createRouter({
    history,
    routes,
    scrollBehavior: scrollTo,
  })
}
