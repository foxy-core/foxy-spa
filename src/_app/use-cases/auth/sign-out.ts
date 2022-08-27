import {
  clearAccessToken,
  clearRefreshToken,
  clearTokenValidity,
} from './cookies'

export const signOut = (navigate = true) => {
  clearAccessToken()
  clearRefreshToken()
  clearTokenValidity()

  if (navigate) {
    // to cleanup stores and asyncData
    window.location.href = '/auth/sign-in'
  }
}
