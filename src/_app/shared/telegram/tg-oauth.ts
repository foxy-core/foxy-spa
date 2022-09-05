import { withQuery } from 'ufo'

export type TelegramOauthResult = Record<string, string>

type TelegramOauthData = {
  event: string
  result: TelegramOauthResult
}

type TelegramOauthCallback = (data: TelegramOauthResult) => void

const TELEGRAM_OAUTH_ORIGIN = 'https://oauth.telegram.org'

export const getTelegramPopupUrl = (botId: string, origin: string) =>
  withQuery(`${TELEGRAM_OAUTH_ORIGIN}/auth`, {
    bot_id: botId,
    origin: origin,
    embed: '0',
    request_access: 'write',
  })

export const openTelegramPopup = (botId: string, origin: string) => {
  const width = 550
  const height = 470

  const options = {
    left: screen.width / 2 - width / 2,
    top: screen.height / 2 - height / 2,
    width,
    height,
    status: 0,
    location: 0,
    menubar: 0,
    toolbar: 0,
  }

  const optionsString = Object.entries(options)
    .map(([key, value]) => `${key}=${value}`)
    .join(',')

  const url = getTelegramPopupUrl(botId, origin)

  window.open(
    getTelegramPopupUrl(botId, origin),
    'telegram_oauth',
    optionsString,
  )
}

export const createTelegramOauthListener = (
  callback: TelegramOauthCallback,
) => {
  const listener = (event: MessageEvent) => {
    if (event.origin === TELEGRAM_OAUTH_ORIGIN) {
      try {
        const data = JSON.parse(event.data) as TelegramOauthData

        if (data.event === 'auth_result') {
          callback(data.result)
        }
      } catch (e) {
        console.warn(e)
      }
    }
  }

  window.addEventListener('message', listener)

  return () => window.removeEventListener('message', listener)
}
