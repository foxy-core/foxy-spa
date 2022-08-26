import { PokeFactory } from '@@/shared/poke'
import { HttpMethod } from '@@/shared/http-utils'
import {
  SignInInputDto,
  SignInOutputDto,
  SignUpInputDto,
  SignUpOutputDto,
} from '@@/infrastructure/dto/auth'

export const createAuthMethods = (factory: PokeFactory) => {
  const authContext = factory.defineContext('authentication')

  return {
    signIn: authContext.defineMethod<SignInInputDto, SignInOutputDto>({
      httpMethod: HttpMethod.Post,
      methodPath: 'auth',
    }),
    signUp: authContext.defineMethod<SignUpInputDto, SignUpOutputDto>({
      httpMethod: HttpMethod.Post,
      methodPath: 'register',
    }),
  }
}
