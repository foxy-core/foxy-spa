import Cookies from 'universal-cookie'

import { AuthorizationCookies, ClientId } from '@@/domain/auth'
import { IS_PROD } from '@@/shared/environment'

const INFINITE_MAX_AGE = 31536000

const cookies = new Cookies()

export const getClientId = () => cookies.get(AuthorizationCookies.ClientId)

export const setClientId = (id: ClientId) =>
  cookies.set(AuthorizationCookies.ClientId, id, {
    maxAge: INFINITE_MAX_AGE,
    secure: IS_PROD,
    path: '/',
  })

export const getAccessToken = () =>
  cookies.get(AuthorizationCookies.AccessToken)

export const setAccessToken = (token: string) =>
  cookies.set(AuthorizationCookies.AccessToken, token, {
    maxAge: INFINITE_MAX_AGE, // because this will be needed for refresh
    secure: IS_PROD,
    path: '/',
  })

export const clearAccessToken = () =>
  cookies.remove(AuthorizationCookies.AccessToken)

export const getRefreshToken = () =>
  cookies.get(AuthorizationCookies.RefreshToken)

export const setRefreshToken = (token: string) =>
  cookies.set(AuthorizationCookies.RefreshToken, token, {
    maxAge: INFINITE_MAX_AGE,
    secure: IS_PROD,
    path: '/',
  })

export const clearRefreshToken = () =>
  cookies.remove(AuthorizationCookies.RefreshToken)

export const getTokenValidity = (): boolean => {
  const json = cookies.get(AuthorizationCookies.TokenValidity)

  try {
    return JSON.parse(json)
  } catch (e) {
    return false
  }
}

export const setTokenValidity = (validity: boolean, maxAge: number) =>
  cookies.set(AuthorizationCookies.TokenValidity, validity, {
    maxAge,
    secure: IS_PROD,
    path: '/',
  })

export const clearTokenValidity = () =>
  cookies.remove(AuthorizationCookies.TokenValidity)
