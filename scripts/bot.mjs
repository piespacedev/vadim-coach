// Проверка бота заявок: кто в группе, нет ли посторонних, тестовое сообщение туда.
// Токен берётся из .env.local (см. .env.example).
//
//   npm run bot:check
import { ADMIN_IDS, LEADS_CHAT_ID, botId, callTelegram, sendToLeadsChat } from '../server/telegram.js'

const [command] = process.argv.slice(2)

async function check() {
  const me = await callTelegram('getMe', {})
  console.log(`Бот: @${me.username}`)

  let chat
  try {
    chat = await callTelegram('getChat', { chat_id: LEADS_CHAT_ID })
  } catch (error) {
    if (error.migrateTo) throw new Error(`Группа стала супергруппой: замените LEADS_CHAT_ID на ${error.migrateTo} в server/telegram.js`)
    throw new Error(`Бот не видит группу ${LEADS_CHAT_ID}: добавьте его в неё. (${error.message})`)
  }
  console.log(`Группа: «${chat.title}» (${LEADS_CHAT_ID})`)

  const status = async (userId) =>
    (await callTelegram('getChatMember', { chat_id: LEADS_CHAT_ID, user_id: userId })).status
  const inChat = (s) => !['left', 'kicked'].includes(s)

  let admins = 0
  for (const id of ADMIN_IDS) {
    const s = await status(id)
    if (inChat(s)) admins++
    console.log(inChat(s) ? `  ✓ ${id} в группе` : `  ✗ ${id} не в группе — добавьте его, иначе он не увидит заявки`)
  }
  const strangers = (await callTelegram('getChatMemberCount', { chat_id: LEADS_CHAT_ID })) - admins - 1
  console.log(strangers > 0 ? `  ⚠ посторонних в группе: ${strangers} — удалите их вручную` : '  ✓ посторонних нет')

  const botIsAdmin = (await status(botId())) === 'administrator'
  console.log(
    botIsAdmin
      ? '  ✓ бот — админ: новых посторонних удалит сам (когда запущен сервис на сервере)'
      : '  · бот не админ: посторонних, добавленных в группу, удалять не сможет',
  )

  await sendToLeadsChat('🔔 Проверка связи: заявки с сайта приходят сюда.')
  console.log('Тестовое сообщение отправлено в группу.')
}

const commands = { check }
if (!commands[command]) {
  console.error('Команды: check')
  process.exit(1)
}
commands[command]().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
