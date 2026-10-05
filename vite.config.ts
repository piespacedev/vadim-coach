import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { leadRoute } from './server/lead-route.js'

/**
 * На опубликованном сайте заявки принимает бот на VPS (server/index.js). В `npm run dev`
 * тот же обработчик подключён к dev-серверу Vite: форму можно проверить локально
 * с токеном из .env.local — заявка уйдёт в группу по-настоящему.
 */
function devLeadApi(): Plugin {
  return {
    name: 'dev-lead-api',
    configureServer(server) {
      server.middlewares.use('/api/lead', leadRoute)
    },
  }
}

export default defineConfig(({ mode }) => {
  // Переменные бота (TELEGRAM_*) — только для сервера, в бандл сайта они не попадают.
  Object.assign(process.env, loadEnv(mode, process.cwd(), 'TELEGRAM_'))

  return {
    plugins: [react(), devLeadApi()],
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
  }
})
