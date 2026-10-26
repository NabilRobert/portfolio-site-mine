import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { markdownContent } from './build/markdown.ts'

export default defineConfig({
  plugins: [markdownContent(), vue(), tailwindcss()],
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
