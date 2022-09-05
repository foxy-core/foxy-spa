import { PokeFactory } from '@@/shared/poke'
import { HttpMethod } from '@@/shared/http-utils'
import { GetEnumsOutput } from '@@/infrastructure/dto/schema'

export const createSchemaMethods = (factory: PokeFactory) => {
  const schemaContext = factory.defineContext('schema')

  return {
    getEnums: schemaContext.defineMethod<void, GetEnumsOutput>({
      httpMethod: HttpMethod.Get,
      methodPath: 'getEnums',
    }),
  }
}
