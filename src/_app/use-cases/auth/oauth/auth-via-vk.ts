import { useRoute, useRouter } from 'vue-router'

import { usePokeApi } from '@@/use-cases/shared'
import { PokeResponseStatus } from '@@/shared/poke'
import { sendSignInEvent } from '@@/use-cases/analytics'
import { CardsPage } from '@@/domain/cards'

import {
  getClientId,
  setAccessToken,
  setRefreshToken,
  setTokenValidity,
} from '../cookies'
import { AuthPage } from '@@/domain/auth'
import { SignInStrategy } from '@@/infrastructure/dto/auth'

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
        strategy: SignInStrategy.Vk,
      },
      meta: {
        expectedErrors: true,
      },
    })

    if (response.status === PokeResponseStatus.Resolved) {
      setTokenValidity(true, response.result.expiresIn)
      setRefreshToken(response.result.refreshToken)
      setAccessToken(response.result.token)
      sendSignInEvent('vk')

      return router.replace({
        name: CardsPage.Cards,
      })
    }

    goToSignIn()
  }
}
