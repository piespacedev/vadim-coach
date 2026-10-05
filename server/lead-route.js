import { handleLead } from './telegram.js'

// Заявка больше этого — точно не от формы.
const MAX_BODY = 16 * 1024

/**
 * POST /api/lead — общий обработчик для бота на VPS (server/index.js) и dev-сервера Vite.
 * Принимает JSON из формы «Контакты», отвечает { ok } — см. handleLead.
 */
export async function leadRoute(req, res) {
  const reply = (status, body) => {
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(body))
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return reply(405, { ok: false })
  }

  let raw = ''
  let tooLarge = false
  for await (const chunk of req) {
    if (raw.length + chunk.length > MAX_BODY) tooLarge = true
    else raw += chunk
  }
  if (tooLarge) return reply(413, { ok: false })

  let body
  try {
    body = JSON.parse(raw)
  } catch {
    return reply(400, { ok: false, error: 'json' })
  }
  const result = await handleLead(body)
  reply(result.status, result.body)
}
