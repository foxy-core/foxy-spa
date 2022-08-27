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

type SignInInput = {
  email: Email
  password: Password
}

export const useSignIn = () => {
  const pokeApi = usePokeApi()
  const notify = useNotify()
  const router = useRouter()

  return async (input: SignInInput) => {
    const response = await pokeApi.auth.signIn({
      input: {
        ...input,
        clientId: getClientId(),
        strategy: 'local',
      },
    })

    if (response.status === PokeResponseStatus.Resolved) {
      setTokenValidity(true, response.result.expiresIn)
      setRefreshToken(response.result.refreshToken)
      setAccessToken(response.result.token)
      router.push('/')
      return
    }

    if (
      [
        AuthenticationError.BadCredentials,
        AuthenticationError.UserNotFound,
      ].includes(response.result.reason)
    ) {
      notify({
        type: NotificationType.Error,
        text: 'Кажется, где-то здесь опечатка. Проверь e-mail и пароль и попробуй еще раз',
      })
    }
  }
}
