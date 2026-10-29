import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { draftContent, markdownContent } from './build/markdown.ts'
import { sitemap } from './build/sitemap.ts'
import { profile } from './src/content/profile.ts'

export default defineConfig({
  plugins: [draftContent(), markdownContent(), sitemap(profile.site), vue(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: true,
  },
  test: {
    environment: 'jsdom',
  },
})
