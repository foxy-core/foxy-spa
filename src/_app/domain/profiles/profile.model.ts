import { z } from 'zod'
import { zodValidator } from '@@/domain/validation'

const latinAndCyrillic = /^[a-zа-яё]*$/i

const Age = z //
  .number()
  .int()
  .min(18, 'Только 18+')
  .max(80, 'Без комментариев')

export const Profile = z.object({
  name: z.string().regex(latinAndCyrillic, 'Только кириллица и латиница'),

  age: Age,
  searchAgeBoundaries: z
    .array(Age)
    .length(2, 'Incorrect age boundaries')
    .optional(),

  avatar: z.string().nullish(),
  photos: z.array(z.string()).max(8).default([]),

  sex: z.string(),
  height: z
    .number()
    .min(50, 'Even newborn babies are longer')
    .max(250, 'Sorry, its so hard for you to find a skyscraper here')
    .nullish(),
  weight: z.number().min(25).max(500).nullish(),
  lookingFor: z.string().nullish(),
  maritalStatus: z.string().nullish(),
  smoking: z.string().nullish(),
  alcohol: z.string().nullish(),
  personality: z.string().nullish(),
  about: z.string().max(300).nullish(),
  interests: z
    .array(z.string())
    .min(3, 'Выберите от 3 до 10 интересов')
    .max(10, 'Максимум - 10 интересов'),

  work: z
    .object({
      place: z.string().max(50).nullish(),
      position: z.string().max(25),
    })
    .optional(),
  graduate: z
    .object({
      place: z.string().max(50).nullish(),
      speciality: z.string().max(25),
    })
    .optional(),

  contacts: z
    .object({
      instagram: z.string().nullable(),
      telegram: z.string().nullable(),
      twitter: z.string().nullable(),
      vk: z.string().nullable(),
    })
    .partial()
    .refine(obj => Object.keys(obj).length > 0)
    .optional(),
})

export type Profile = z.infer<typeof Profile>

export const DEFAULT_AGE_DELTA = 3

export const nameValidator = zodValidator(Profile.shape.name)

export const interestsValidator = zodValidator(Profile.shape.interests)

export const ageValidator = zodValidator(Profile.shape.age)
