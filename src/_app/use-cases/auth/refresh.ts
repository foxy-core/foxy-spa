import { createFoxyPokeClient } from '@@/infrastructure/foxy-poke-api'
import { exists } from '@@/shared/guards'
import { PokeResponseStatus } from '@@/shared/poke'
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
  // creating separate client because it would call itself recursively
  // TODO: solve this
  const pokeApi = createFoxyPokeClient()

  return async () => {
    const accessToken = getAccessToken()
    const refreshToken = getRefreshToken()
    const tokenValidity = getTokenValidity()
    const clientId = getClientId()

    if (!exists(accessToken) && !exists(refreshToken)) {
      return
    }

    if (exists(tokenValidity)) {
      return
    }

    if (!exists(accessToken) || !exists(accessToken)) {
      return signOut()
    }

    // token is not valid anymore and tokens are present
    // so refresh
    const response = await pokeApi.auth.signIn({
      input: {
        strategy: 'refreshToken',
        oldAccessToken: accessToken,
        refreshToken,
        clientId,
      },
      meta: {
        expectedErrors: true,
      },
    })

    if (response.status === PokeResponseStatus.Rejected) {
      return signOut()
    }

    setAccessToken(response.result.token)
    setRefreshToken(response.result.refreshToken)
    setTokenValidity(true, response.result.expiresIn)
  }
}
