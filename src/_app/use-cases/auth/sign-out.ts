import { sendSignOutEvent } from '@@/use-cases/analytics'
import {
  clearAccessToken,
  clearRefreshToken,
  clearTokenValidity,
} from './cookies'

export const signOut = (navigate = true) => {
  sendSignOutEvent()

  clearAccessToken()
  clearRefreshToken()
  clearTokenValidity()

  if (navigate) {
    // to cleanup stores and asyncData
    window.location.href = '/auth/sign-in'
  }
}
