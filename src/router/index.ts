import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, RouterHistory } from 'vue-router'
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

export function createAppRouter(history: RouterHistory = createWebHistory()) {
  return createRouter({
    history,
    routes,
    scrollBehavior(to, _from, saved) {
      if (saved) return saved
      if (to.hash) return { el: to.hash, behavior: 'smooth' }
      return { top: 0 }
    },
  })
}
