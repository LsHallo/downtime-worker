declare global {
  const WEB_AUTH: string;
  const TELEGRAM_BOT_KEY: string;
  const TELEGRAM_CHAT_ID: string;
}

import { handleRequest } from './handler'

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})
