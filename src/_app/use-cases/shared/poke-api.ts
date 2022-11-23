import { App, inject, Plugin } from 'vue'

import { createFoxyPokeClient } from '@@/infrastructure/foxy-poke-api'

export const POKE_API_SYMBOL = Symbol('POKE_API')

export const usePokeApi = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return inject<ReturnType<typeof createFoxyPokeClient>>(POKE_API_SYMBOL)!
}

export const providePokeApi = (app: App) => {
  const pokeApi = createFoxyPokeClient()

  app.provide(POKE_API_SYMBOL, pokeApi)

  return pokeApi
}

export const vuePokeApiPlugin: Plugin = {
  install(app) {
    providePokeApi(app)
  },
}
