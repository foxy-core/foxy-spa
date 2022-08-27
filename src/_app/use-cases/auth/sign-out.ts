import {
  clearAccessToken,
  clearRefreshToken,
  clearTokenValidity,
} from './cookies'

export const signOut = (navigate = true) => {
  clearAccessToken()
  clearRefreshToken()
  clearTokenValidity()

  console.log('cleared cookies')
  if (navigate) {
    // to cleanup stores and asyncData
    window.location.href = '/auth/sign-in'
  }
}
