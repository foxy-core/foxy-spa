import { CategorizedEnum, Enum } from '@@/domain/layout'

export type FrequencyEnum = Enum

export type InterestsEnum = CategorizedEnum

export enum LookingFor {
  Love = 'Love',
  Friendship = 'Friendship',
  LikeMinded = 'LikeMinded',
}

export type MaritalStatusEnum = Enum

export type PersonalityEnum = Enum

export type SexEnum = Enum

export type ZodiacEnum = Enum

export type StoredEnums = {
  Frequency: FrequencyEnum
  Interests: InterestsEnum
  MaritalStatus: MaritalStatusEnum
  Personality: PersonalityEnum
  Sex: SexEnum
  Zodiac: ZodiacEnum
}
