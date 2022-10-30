import {
  SignInInputDto,
  SignInOutputDto,
  SignUpInputDto,
  SignUpOutputDto,
} from '@@/infrastructure/dto/auth'
import { HttpMethod } from '@@/shared/http-utils'
import { PokeFactory } from '@@/shared/poke'

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
