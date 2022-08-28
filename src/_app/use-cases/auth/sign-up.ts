import { useRouter } from 'vue-router'

import { usePokeApi } from '@@/use-cases/shared'
import { Email, Password } from '@@/domain/accounts'
import { PokeResponseStatus } from '@@/shared/poke'
import { useNotify } from '@@/use-cases/notifications'

import {
  getClientId,
  setAccessToken,
  setRefreshToken,
  setTokenValidity,
} from './cookies'
import { NotificationType } from '@@/domain/notifications'
import { AuthenticationError } from '@@/infrastructure/dto/errors'
import { CardsPage } from '@@/domain/cards'

type SignUpInput = {
  email: Email
  password: Password
}

export const useSignUp = () => {
  const pokeApi = usePokeApi()
  const router = useRouter()
  const notify = useNotify()

  return async (input: SignUpInput) => {
    const goToCards = () =>
      router.replace({
        name: CardsPage.Cards,
      })

    const result = await pokeApi.auth.signUp({
      input: {
        ...input,
        clientId: getClientId(),
        strategy: 'local',
      },
      meta: {
        expectedErrors: [AuthenticationError.AccountAlreadyExists],
      },
    })

    if (result.status === PokeResponseStatus.Resolved) {
      setRefreshToken(result.result.refreshToken)
      setAccessToken(result.result.token)
      setTokenValidity(true, result.result.expiresIn)
      goToCards()
      return
    }

    notify({
      type: NotificationType.Error,
      text: 'Аккаунт с таким e-mail уже существует',
    })
  }
}
