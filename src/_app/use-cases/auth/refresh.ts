import { SignInStrategy } from '@@/infrastructure/dto/auth'
import { exists } from '@@/shared/guards'
import { PokeResponseStatus } from '@@/shared/poke'

import { usePokeApi } from '../shared'

import {
  getAccessToken,
  getClientId,
  getRefreshToken,
  getTokenValidity,
  setAccessToken,
  setRefreshToken,
  setTokenValidity,
} from './cookies'
import { signOut } from './sign-out'

export const useRefresh = () => {
  const pokeApi = usePokeApi()

  return async () => {
    const accessToken = getAccessToken()
    const refreshToken = getRefreshToken()
    const tokenValidity = getTokenValidity()
    const clientId = getClientId()

    if (!exists(accessToken) && !exists(refreshToken)) {
      return
    }

    if (tokenValidity) {
      return
    }

    if (!exists(accessToken) || !exists(refreshToken)) {
      return signOut()
    }

    // token is not valid anymore and tokens are present
    // so refresh
    const response = await pokeApi.auth.signIn({
      input: {
        strategy: SignInStrategy.RefreshToken,
        oldAccessToken: accessToken,
        refreshToken,
        clientId,
      },
      meta: {
        expectedErrors: true,
      },
      skipBeforeHooks: true,
    })

    if (response.status === PokeResponseStatus.Rejected) {
      return signOut()
    }

    setAccessToken(response.result.token)
    setRefreshToken(response.result.refreshToken)
    setTokenValidity(true, response.result.expiresIn)
  }
}
