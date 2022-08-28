import { AuthOutputDto } from './general.dto'

export enum SignInStrategy {
  Local = 'local',
  RefreshToken = 'refreshToken',
  Vk = 'vk',
  Telegram = 'telegram',
}

export type LocalSignInInputDto = {
  strategy: SignInStrategy.Local
  email: string
  password: string
  clientId: string
}

export type RefreshSignInInputDto = {
  strategy: SignInStrategy.RefreshToken
  oldAccessToken: string
  refreshToken: string
  clientId: string
}

export type VkSignInInputDto = {
  strategy: SignInStrategy.Vk
  code: string
  clientId: string
}

export type TgSignInInputDto = {
  strategy: SignInStrategy.Telegram
  clientId: string
  data: Record<string, string>
}

export type SignInInputDto =
  | LocalSignInInputDto
  | RefreshSignInInputDto
  | VkSignInInputDto
  | TgSignInInputDto

export type SignInOutputDto = AuthOutputDto
