import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    // Страховка от двух копий React при подключении новых зависимостей.
    dedupe: ['react', 'react-dom'],
  },
  server: {
    host: true,
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
})
