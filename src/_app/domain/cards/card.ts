import { LookingFor } from '@@/domain/profiles'

export type CardTagVM = {
  isHighlighted?: boolean
  tag: string
}

export type CardVM = {
  id: string
  coverImageUrl: string
  lookingFor?: LookingFor
  name: string
  age: number
  location: string
  tags: CardTagVM[]
}
