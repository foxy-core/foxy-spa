import { computed } from 'vue'

import { PokeResponseStatus } from '@@/shared/poke'
import { useEnumsStore } from '@@/stores/layout'
import { usePokeApi } from '@@/use-cases/shared'

export const useEnums = () => {
  const pokeApi = usePokeApi()
  const store = useEnumsStore()

  const fetchEnums = async () => {
    pokeApi.schema.getEnums().then(response => {
      if (response.status === PokeResponseStatus.Resolved) {
        store.enums = response.result.enums
      }
    })
  }

  fetchEnums()

  return {
    enums: computed(() => store.enums),
    fetchEnums,
  }
}
