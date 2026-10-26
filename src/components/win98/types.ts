import type { RouteLocationRaw } from 'vue-router'

/** A menu-bar entry: a link out (`href`) or a page on this site (`to`). */
export type MenuItem =
  { label: string; href: string; to?: undefined } | { label: string; to: RouteLocationRaw; href?: undefined }
