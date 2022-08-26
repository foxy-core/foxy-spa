import { PokeFactory } from '@@/shared/poke'
import { HttpMethod } from '@@/shared/http-utils'

export const createSchemaMethods = (factory: PokeFactory) => {
  const schemaContext = factory.defineContext('schema')

  return {
    getEnums: schemaContext.defineMethod<any, any>({
      httpMethod: HttpMethod.Get,
      methodPath: 'getEnums',
    }),
  }
}
