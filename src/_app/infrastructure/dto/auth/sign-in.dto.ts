import { AuthOutputDto } from './general.dto'

export type LocalSignInInputDto = {
  strategy: 'local'
  email: string
  password: string
  clientId: string
}

export type RefreshSignInInputDto = {
  strategy: 'refreshToken'
  oldAccessToken: string
  refreshToken: string
  clientId: string
}

export type VkSignInInputDto = {
  strategy: 'vk'
  code: string
  clientId: string
}

export type SignInInputDto =
  | LocalSignInInputDto
  | RefreshSignInInputDto
  | VkSignInInputDto

export type SignInOutputDto = AuthOutputDto
