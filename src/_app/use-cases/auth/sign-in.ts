import { useRouter } from 'vue-router'

import { PokeResponseStatus } from '@@/shared/poke'
import { usePokeApi } from '@@/use-cases/shared'
import { Email, Password } from '@@/domain/accounts'
import { useNotify } from '@@/use-cases/notifications'
import { NotificationType } from '@@/domain/notifications'
import { AuthenticationError } from '@@/infrastructure/dto/errors'

import {
  getClientId,
  setAccessToken,
  setRefreshToken,
  setTokenValidity,
} from './cookies'
import { CardsPage } from '@@/domain/cards'
import { SignInStrategy } from '@@/infrastructure/dto/auth'

type SignInInput = {
  email: Email
  password: Password
}

export const useSignIn = () => {
  const pokeApi = usePokeApi()
  const notify = useNotify()
  const router = useRouter()

  return async (input: SignInInput) => {
    const goToCards = () =>
      router.replace({
        name: CardsPage.Cards,
      })

    const response = await pokeApi.auth.signIn({
      input: {
        ...input,
        clientId: getClientId(),
        strategy: SignInStrategy.Local,
      },
      meta: {
        expectedErrors: [
          AuthenticationError.BadCredentials,
          AuthenticationError.UserNotFound,
        ],
      },
    })

    if (response.status === PokeResponseStatus.Resolved) {
      setTokenValidity(true, response.result.expiresIn)
      setRefreshToken(response.result.refreshToken)
      setAccessToken(response.result.token)
      goToCards()
      return
    }

    notify({
      type: NotificationType.Error,
      text: 'Кажется, где-то здесь опечатка. Проверь e-mail и пароль и попробуй еще раз',
    })
  }
}
