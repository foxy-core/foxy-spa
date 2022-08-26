import { useRouter } from 'vue-router'

import { usePokeApi } from '@@/use-cases/shared'
import { Email, Password } from '@@/domain/accounts'
import { PokeResponseStatus } from '@@/shared/poke'

import {
  getClientId,
  setAccessToken,
  setRefreshToken,
  setTokenValidity,
} from './cookies'

type SignUpInput = {
  email: Email
  password: Password
}

export const useSignUp = () => {
  const pokeApi = usePokeApi()
  const router = useRouter()

  return async (input: SignUpInput) => {
    const result = await pokeApi.auth.signUp({
      input: {
        ...input,
        clientId: getClientId(),
        strategy: 'local',
      },
    })

    if (result.status === PokeResponseStatus.Resolved) {
      router.push('/')

      setRefreshToken(result.result.refreshToken)
      setAccessToken(result.result.token)
      setTokenValidity(true, result.result.expiresIn)
      return
    }

    // notify({
    //   status: NotificationStatus.Error,
    //   text: 'Ошибка при авторизации(',
    // })
  }
}
