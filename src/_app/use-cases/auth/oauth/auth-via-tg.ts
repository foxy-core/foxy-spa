import { useRouter } from 'vue-router'

import { usePokeApi } from '@@/use-cases/shared'
import { PokeResponseStatus } from '@@/shared/poke'
import { AuthPage } from '@@/domain/auth'
import { TelegramOauthResult } from '@@/shared/telegram'
import { sendSignInEvent } from '@@/use-cases/analytics'

import {
  getClientId,
  setAccessToken,
  setRefreshToken,
  setTokenValidity,
} from '../cookies'
import { CardsPage } from '@@/domain/cards'
import { SignInStrategy } from '@@/infrastructure/dto/auth'

export const useAuthViaTg = () => {
  const router = useRouter()
  const pokeApi = usePokeApi()

  return async (data: TelegramOauthResult) => {
    router.replace({
      name: AuthPage.OauthTg,
    })

    const response = await pokeApi.auth.signIn({
      input: {
        strategy: SignInStrategy.Telegram,
        clientId: getClientId(),
        data,
      },
      meta: {
        expectedErrors: true,
      },
    })

    if (response.status === PokeResponseStatus.Resolved) {
      setTokenValidity(true, response.result.expiresIn)
      setRefreshToken(response.result.refreshToken)
      setAccessToken(response.result.token)
      sendSignInEvent('tg')

      router.replace({
        name: CardsPage.Cards,
      })
      return
    }

    router.replace({
      name: AuthPage.SignIn,
    })
  }
}
