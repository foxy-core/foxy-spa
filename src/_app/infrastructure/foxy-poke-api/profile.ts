import { HttpMethod } from '@@/shared/http-utils'
import { PokeFactory } from '@@/shared/poke'

export const createProfileMethods = (factory: PokeFactory) => {
  const profileContext = factory.defineContext('profile')

  return {
    getMyProfile: profileContext.defineMethod<unknown, unknown>({
      httpMethod: HttpMethod.Get,
      methodPath: 'my',
    }),
  }
}
