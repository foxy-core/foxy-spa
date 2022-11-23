import { createPokeFactory } from '@@/shared/poke'

import { createAuthMethods } from './auth'
import { createProfileMethods } from './profile'
import { createSchemaMethods } from './schema'

export const createFoxyPokeClient = () => {
  const factory = createPokeFactory({
    baseUrl:
      (import.meta.env.VITE_POKE_BASE_URL as string) ??
      'https://foxy.s.talkiiing.ru/api',
  })

  const auth = createAuthMethods(factory)
  const profile = createProfileMethods(factory)
  const schema = createSchemaMethods(factory)

  return {
    _factory: factory,
    auth,
    profile,
    schema,
  }
}
