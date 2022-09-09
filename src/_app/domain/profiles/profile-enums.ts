import { CategorizedEnum, Enum } from '@@/domain/layout'

export type FrequencyEnum = Enum

export type InterestsEnum = CategorizedEnum

export type LookingForEnum = Enum

export type MaritalStatusEnum = Enum

export type PersonalityEnum = Enum

export type SexEnum = Enum

export type ZodiacEnum = Enum

export type StoredEnums = {
  Frequency: FrequencyEnum
  Interests: InterestsEnum
  LookingFor: LookingForEnum
  MaritalStatus: MaritalStatusEnum
  Personality: PersonalityEnum
  Sex: SexEnum
  Zodiac: ZodiacEnum
}
