// ─────────────────────────────────────────────────────────────
//  Бот заявок на VPS 201.34.132.115 (см. deploy/ и README, раздел «Бот на VPS»):
//   — принимает заявки с формы сайта (сайт на Vercel): POST /api/lead → группа в Telegram;
//   — держит бота на связи через long polling: отвечает на /start в личке
//     и удаляет посторонних из группы заявок. Вебхук для Telegram не нужен.
//  Снаружи — nginx с HTTPS: https://vadim-bot.201-34-132-115.sslip.io/api/lead.
// ─────────────────────────────────────────────────────────────
import { createServer } from 'node:http'
import { setTimeout as sleep } from 'node:timers/promises'
import { leadRoute } from './lead-route.js'
import { callTelegram, handleUpdate } from './telegram.js'

const PORT = Number(process.env.PORT) || 3300

// Форма живёт на другом домене (Vercel), поэтому браузеру нужно разрешение CORS.
// Звёздочка безопасна: эндпоинт и так публичный, от спама защищают ловушка и лимит в nginx.
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
}

const server = createServer((req, res) => {
  if (req.url?.split('?')[0] !== '/api/lead') {
    res.statusCode = 404
    return res.end()
  }
  for (const [name, value] of Object.entries(CORS)) res.setHeader(name, value)
  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    return res.end()
  }
  return leadRoute(req, res)
})

server.listen(PORT, '127.0.0.1', () => console.log(`Заявки: http://127.0.0.1:${PORT}/api/lead`))

async function pollBot() {
  const me = await callTelegram('getMe', {})
  // getUpdates не работает, пока у бота есть вебхук.
  await callTelegram('deleteWebhook', {})
  console.log(`Бот @${me.username} на связи`)

  let offset = 0
  for (;;) {
    try {
      const updates = await callTelegram(
        'getUpdates',
        { offset, timeout: 50, allowed_updates: ['message'] },
        { timeoutMs: 60_000, attempts: 1 },
      )
      for (const update of updates) {
        offset = update.update_id + 1
        await handleUpdate(update).catch((error) => console.error('Бот:', error.message))
      }
    } catch (error) {
      // Сеть моргнула или запущена вторая копия бота — ждём и пробуем снова.
      console.error('getUpdates:', error.message)
      await sleep(5000)
    }
  }
}

pollBot().catch((error) => {
  console.error('Бот не запустился:', error.message)
  process.exit(1)
})
