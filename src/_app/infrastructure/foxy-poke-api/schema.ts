import { GetEnumsOutput } from '@@/infrastructure/dto/schema'
import { HttpMethod } from '@@/shared/http-utils'
import { PokeFactory } from '@@/shared/poke'

export const createSchemaMethods = (factory: PokeFactory) => {
  const schemaContext = factory.defineContext('schema')

  return {
    getEnums: schemaContext.defineMethod<void, GetEnumsOutput>({
      httpMethod: HttpMethod.Get,
      methodPath: 'getEnums',
    }),
  }
}
