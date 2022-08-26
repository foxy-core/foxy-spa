import { useRouter } from 'vue-router'

import { PokeResponseStatus } from '@@/shared/poke'
import { usePokeApi } from '@@/use-cases/shared'
import { Email, Password } from '@@/domain/accounts'

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

  const router = useRouter()

  return async (input: SignInInput) => {
    const result = await pokeApi.auth.signIn({
      input: {
        ...input,
        clientId: getClientId(),
        strategy: 'local',
      },
    })

    if (result.status === PokeResponseStatus.Resolved) {
      setTokenValidity(true, result.result.expiresIn)
      setRefreshToken(result.result.refreshToken)
      setAccessToken(result.result.token)
      router.push('/')
      return
    }

    // TODO: уведомления
    // notify({
    //   status: NotificationStatus.Error,
    //   text: 'Ошибка при авторизации(',
    // })
  }
}
