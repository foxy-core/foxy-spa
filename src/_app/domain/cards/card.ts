import { LookingFor } from '@@/domain/profiles'

export type CardTagVM = {
  isHighlighted?: boolean
  tag: string
}

export type CardVM = {
  coverImageUrl: string
  lookingFor?: LookingFor
  name: string
  age: number
  location: string
  tags: CardTagVM[]
}
