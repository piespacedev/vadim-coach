// ─────────────────────────────────────────────────────────────
//  TELEGRAM-БОТ ЗАЯВОК (@vadimzayavkabot) — общая логика для бота на VPS
//  (server/index.js), dev-сервера Vite и scripts/bot.mjs.
//
//  Токен бота — только в переменной окружения TELEGRAM_BOT_TOKEN,
//  в браузер он не попадает: форма шлёт заявку на /api/lead, а уже сервер — в Telegram.
// ─────────────────────────────────────────────────────────────
import https from 'node:https'

/** Группа «Вадим заявки с сайта» — сюда бот присылает заявки. */
export const LEADS_CHAT_ID = -5260260971

/**
 * Единственные, у кого есть доступ к заявкам. Кого-то другого, добавленного в группу,
 * бот удаляет сам — если он в группе админ (см. README).
 */
export const ADMIN_IDS = [682100278, 8699350672]

/** Куда отправить человека, который случайно нашёл бота. */
const PUBLIC_CONTACT = 'https://t.me/+79152252241'

// Ограничения длины полей — заодно защита от мусора в заявках.
const LIMITS = { name: 100, contact: 100, goal: 100, comment: 1000 }

export const isAdmin = (id) => ADMIN_IDS.includes(Number(id))

function token() {
  const value = process.env.TELEGRAM_BOT_TOKEN
  if (!value) throw new Error('TELEGRAM_BOT_TOKEN не задан')
  return value
}

/** id самого бота — первая часть токена. */
export const botId = () => Number(token().split(':')[0])

/**
 * Один HTTPS-запрос к Bot API. Через node:https, а не fetch: на VPS до api.telegram.org
 * доходит только IPv6, и версию IP нужно задать явно — TELEGRAM_IP_FAMILY=6 в .env.
 * Пусто — как решит система (локально так и надо).
 */
function request(method, params, timeoutMs) {
  const body = JSON.stringify(params)
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        host: 'api.telegram.org',
        path: `/bot${token()}/${method}`,
        method: 'POST',
        family: Number(process.env.TELEGRAM_IP_FAMILY) || undefined,
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
        // Таймаут тишины: на VPS новое соединение иногда виснет, повтор проходит за ~50 мс.
        timeout: timeoutMs,
      },
      (res) => {
        let raw = ''
        res.setEncoding('utf8')
        res.on('data', (chunk) => (raw += chunk))
        res.on('error', reject)
        res.on('end', () => {
          let data = {}
          try {
            data = JSON.parse(raw)
          } catch {}
          resolve({ status: res.statusCode, data })
        })
      },
    )
    req.on('timeout', () => req.destroy(Object.assign(new Error('timeout'), { code: 'ETIMEDOUT' })))
    req.on('error', reject)
    req.end(body)
  })
}

/**
 * Вызов метода Bot API. Ошибку Telegram возвращает как исключение с его описанием;
 * если группа стала супергруппой, в error.migrateTo — её новый id.
 * Сетевой сбой повторяется до `attempts` раз: заявка важнее редкого дубля.
 * Для long polling (getUpdates) — долгий таймаут и одна попытка, повторяет сам цикл.
 */
export async function callTelegram(method, params, { timeoutMs = 3000, attempts = 4 } = {}) {
  for (let attempt = 1; ; attempt++) {
    let response
    try {
      response = await request(method, params, timeoutMs)
    } catch (error) {
      if (attempt < attempts) continue
      throw new Error(`${method}: нет связи с Telegram (${error.code ?? error.name})`)
    }
    const { status, data } = response
    if (!data.ok) {
      const error = new Error(`${method}: ${data.description ?? `HTTP ${status}`}`)
      error.migrateTo = data.parameters?.migrate_to_chat_id
      throw error
    }
    return data.result
  }
}

const sendMessage = (chatId, text) =>
  callTelegram('sendMessage', {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    link_preview_options: { is_disabled: true },
  })

/**
 * Сообщение в группу заявок. Если группа стала супергруппой (так бывает, когда
 * боту выдают права админа), у неё новый id — дошлём туда и попросим обновить LEADS_CHAT_ID.
 */
export async function sendToLeadsChat(text) {
  try {
    return await sendMessage(LEADS_CHAT_ID, text)
  } catch (error) {
    if (!error.migrateTo) throw error
    console.warn(`Группа заявок стала супергруппой: замените LEADS_CHAT_ID на ${error.migrateTo} в server/telegram.js`)
    return sendMessage(error.migrateTo, text)
  }
}

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const clean = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

function formatLead(lead) {
  const lines = [
    '<b>🔥 Новая заявка с сайта</b>',
    '',
    `<b>Имя:</b> ${escapeHtml(lead.name)}`,
    `<b>Контакт:</b> ${escapeHtml(lead.contact)}`,
  ]
  if (lead.goal) lines.push(`<b>Цель:</b> ${escapeHtml(lead.goal)}`)
  if (lead.comment) lines.push('', `<b>Комментарий:</b>\n${escapeHtml(lead.comment)}`)
  if (lead.lang === 'en') lines.push('', '🇬🇧 Заполнено на английской версии сайта')
  return lines.join('\n')
}

/**
 * Заявка из формы на сайте. Возвращает { status, body } — ответ для браузера.
 * Поле `website` — ловушка для ботов: людям оно не видно, спам-боты его заполняют.
 */
export async function handleLead(raw) {
  const body = raw && typeof raw === 'object' ? raw : {}
  if (body.website) return { status: 200, body: { ok: true } }

  const lead = {
    name: clean(body.name, LIMITS.name),
    contact: clean(body.contact, LIMITS.contact),
    goal: clean(body.goal, LIMITS.goal),
    comment: clean(body.comment, LIMITS.comment),
    lang: body.lang === 'en' ? 'en' : 'ru',
  }
  if (!lead.name || !lead.contact) return { status: 400, body: { ok: false, error: 'required' } }

  try {
    await sendToLeadsChat(formatLead(lead))
    return { status: 200, body: { ok: true } }
  } catch (error) {
    console.error('Заявка не отправлена:', error.message)
    return { status: 502, body: { ok: false, error: 'telegram' } }
  }
}

/** Убирает из группы заявок всех новых участников, кроме админов и самого бота. */
async function removeStrangers(message) {
  const strangers = message.new_chat_members.filter((m) => !isAdmin(m.id) && m.id !== botId())
  for (const member of strangers) {
    await callTelegram('banChatMember', { chat_id: message.chat.id, user_id: member.id })
    // В супергруппе бан ещё и закрывает вход — снимаем его, человек просто удалён.
    await callTelegram('unbanChatMember', {
      chat_id: message.chat.id,
      user_id: member.id,
      only_if_banned: true,
    }).catch(() => {})
    await sendMessage(
      message.chat.id,
      `Удалил ${escapeHtml(member.first_name ?? String(member.id))} из группы: доступ к заявкам только у двух аккаунтов.`,
    )
  }
}

/**
 * Входящее сообщение боту (long polling в server/index.js). В группе заявок — следим, кто вступает.
 * В личке: админам — подтверждение, остальным — «бот закрытый». В других группах — молчим.
 *
 * Заявки бот шлёт только в LEADS_CHAT_ID, поэтому чужая группа с ботом ничего не получит.
 * И всё же из группы, куда его добавил не админ, бот сразу выходит.
 */
export async function handleUpdate(update) {
  const message = update?.message
  if (!message?.from || !message.chat) return

  if (message.new_chat_members?.some((m) => m.id === botId()) && !isAdmin(message.from.id)) {
    return callTelegram('leaveChat', { chat_id: message.chat.id })
  }
  if (message.chat.id === LEADS_CHAT_ID && message.new_chat_members) return removeStrangers(message)
  if (message.chat.type !== 'private') return

  const text = isAdmin(message.from.id)
    ? '✅ Всё подключено. Новые заявки с сайта приходят в группу «Вадим заявки с сайта».'
    : `Это закрытый бот для заявок. Чтобы записаться на тренировку, напишите Вадиму: ${PUBLIC_CONTACT}`
  await sendMessage(message.chat.id, text)
}
