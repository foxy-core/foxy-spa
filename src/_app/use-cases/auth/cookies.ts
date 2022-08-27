import Cookies from 'universal-cookie'

import { AuthorizationCookies, ClientId } from '@@/domain/auth'
import { IS_PROD } from '@@/shared/environment'

const INFINITE_MAX_AGE = 31536000

const cookies = new Cookies()

const CLIENT_ID_OPTIONS = {
  maxAge: INFINITE_MAX_AGE,
  secure: IS_PROD,
  path: '/',
}

export const getClientId = () => cookies.get(AuthorizationCookies.ClientId)

export const setClientId = (id: ClientId) =>
  cookies.set(AuthorizationCookies.ClientId, id, CLIENT_ID_OPTIONS)

const ACCESS_TOKEN_OPTIONS = {
  maxAge: INFINITE_MAX_AGE,
  secure: IS_PROD,
  path: '/',
}

export const getAccessToken = () =>
  cookies.get(AuthorizationCookies.AccessToken)

export const setAccessToken = (token: string) =>
  cookies.set(AuthorizationCookies.AccessToken, token, ACCESS_TOKEN_OPTIONS)

export const clearAccessToken = () =>
  cookies.remove(AuthorizationCookies.AccessToken, ACCESS_TOKEN_OPTIONS)

const REFRESH_TOKEN_OPTIONS = {
  maxAge: INFINITE_MAX_AGE,
  secure: IS_PROD,
  path: '/',
}

export const getRefreshToken = () =>
  cookies.get(AuthorizationCookies.RefreshToken)

export const setRefreshToken = (token: string) =>
  cookies.set(AuthorizationCookies.RefreshToken, token, REFRESH_TOKEN_OPTIONS)

export const clearRefreshToken = () =>
  cookies.remove(AuthorizationCookies.RefreshToken, REFRESH_TOKEN_OPTIONS)

const TOKEN_VALIDITY_OPTIONS = {
  secure: IS_PROD,
  path: '/',
}

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
    ...TOKEN_VALIDITY_OPTIONS,
    maxAge,
  })

export const clearTokenValidity = () =>
  cookies.remove(AuthorizationCookies.TokenValidity, TOKEN_VALIDITY_OPTIONS)
