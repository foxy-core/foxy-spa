import { useRoute, useRouter } from 'vue-router'

import { usePokeApi } from '@@/use-cases/shared'
import { PokeResponseStatus } from '@@/shared/poke'

import {
  getClientId,
  setAccessToken,
  setRefreshToken,
  setTokenValidity,
} from '../cookies'
import { AuthPage } from '@@/domain/auth'

const VK_OAUTH_CODE_QUERY = 'code'

export const useAuthViaVk = () => {
  const route = useRoute()
  const router = useRouter()
  const pokeApi = usePokeApi()

  return async () => {
    const goToSignIn = () =>
      router.replace({
        name: AuthPage.SignIn,
      })

    const code = route.query[VK_OAUTH_CODE_QUERY]

    if (typeof code !== 'string') {
      return goToSignIn()
    }

    const response = await pokeApi.auth.signIn({
      input: {
        code,
        clientId: getClientId(),
        strategy: 'vk',
      },
      meta: {
        expectedErrors: true,
      },
    })

    if (response.status === PokeResponseStatus.Resolved) {
      setTokenValidity(true, response.result.expiresIn)
      setRefreshToken(response.result.refreshToken)
      setAccessToken(response.result.token)
    }

    goToSignIn()
  }
}
