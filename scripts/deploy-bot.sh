#!/usr/bin/env bash
# Обновление бота на VPS: копирует server/ и перезапускает службу vadim-bot.
#   npm run deploy:bot
# Первая установка (пользователь, служба, nginx, сертификат) — в README, раздел «Бот на VPS».
set -euo pipefail

HOST="${DEPLOY_HOST:-root@201.34.132.115}"
DIR=/opt/vadim-bot

# package.json нужен только ради "type": "module" — зависимостей у бота нет.
tar czf - server package.json | ssh "$HOST" "set -e
  tmp=\$(mktemp -d)
  tar xzf - -C \"\$tmp\"
  chmod -R a+rX \"\$tmp\"
  rm -rf $DIR/server.old
  [ -d $DIR/server ] && mv $DIR/server $DIR/server.old
  mv \"\$tmp/server\" $DIR/server
  mv \"\$tmp/package.json\" $DIR/package.json
  rm -rf \"\$tmp\" $DIR/server.old
  systemctl restart vadim-bot
  sleep 3
  systemctl is-active --quiet vadim-bot || { journalctl -u vadim-bot -n 30 --no-pager; exit 1; }
  journalctl -u vadim-bot -n 2 --no-pager -o cat"
