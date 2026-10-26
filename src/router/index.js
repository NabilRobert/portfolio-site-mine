import { createRouter, createWebHistory } from 'vue-router'
import { locales } from '@/content'

const HomeView = () => import('@/views/HomeView.vue')
const ProjectsView = () => import('@/views/ProjectsView.vue')
const ProjectView = () => import('@/views/ProjectView.vue')
const NotFoundView = () => import('@/views/NotFoundView.vue')

// The same pages under each locale's prefix: '/', '/projects', '/projects/:slug'
// in English, and '/ja', '/ja/projects', ... in Japanese.
const pageRoutes = Object.entries(locales).flatMap(([lang, { prefix }]) => [
  { path: prefix || '/', name: `home-${lang}`, component: HomeView, meta: { lang } },
  { path: `${prefix}/projects`, name: `projects-${lang}`, component: ProjectsView, meta: { lang } },
  { path: `${prefix}/projects/:slug`, name: `project-${lang}`, component: ProjectView, meta: { lang }, props: true },
])

export const routes = [
  ...pageRoutes,
  { path: '/:rest(.*)*', name: 'not-found', component: NotFoundView, meta: { lang: 'en' } },
]

export function createAppRouter(history = createWebHistory()) {
  return createRouter({
    history,
    routes,
    scrollBehavior(to, from, saved) {
      if (saved) return saved
      if (to.hash) return { el: to.hash, behavior: 'smooth' }
      return { top: 0 }
    },
  })
}
