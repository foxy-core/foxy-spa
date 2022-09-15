import { sendEvent } from './analytics'

export const sendSignInEvent = (type: 'vk' | 'tg' | 'local') => {
  sendEvent('sign-in', {
    type,
  })
}

export const sendSignUpEvent = () => sendEvent('sign-up')

export const sendSignOutEvent = () => sendEvent('sign-out')
