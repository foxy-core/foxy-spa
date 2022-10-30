import { inject, provide } from 'vue'

import { createFoxyPokeClient } from '@@/infrastructure/foxy-poke-api'

export const POKE_API_INJECTION_KEY = 'POKE_API'

export const usePokeApi = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return inject<ReturnType<typeof createFoxyPokeClient>>(
    POKE_API_INJECTION_KEY,
  )!
}

export const providePokeApi = () => {
  const pokeApi = createFoxyPokeClient()

  provide(POKE_API_INJECTION_KEY, pokeApi)

  return pokeApi
}
