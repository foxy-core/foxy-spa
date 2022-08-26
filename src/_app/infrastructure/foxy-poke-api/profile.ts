import { PokeFactory } from '@@/shared/poke'
import { HttpMethod } from '@@/shared/http-utils'

export const createProfileMethods = (factory: PokeFactory) => {
  const profileContext = factory.defineContext('profile')

  return {
    getMyProfile: profileContext.defineMethod<any, any>({
      httpMethod: HttpMethod.Get,
      methodPath: 'my',
    }),
  }
}
