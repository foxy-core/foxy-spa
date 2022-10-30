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

  avatar: z.string().optional(),
  photos: z.array(z.string()).max(8).default([]),

  sex: z.string(),
  height: z
    .number()
    .min(50, 'Even newborn babies are longer')
    .max(250, 'Sorry, its so hard for you to find a skyscraper here')
    .optional(),
  weight: z.number().min(25).max(500).optional(),
  lookingFor: z.string().optional(),
  maritalStatus: z.string().optional(),
  smoking: z.string().optional(),
  alcohol: z.string().optional(),
  personality: z.string().optional(),
  about: z.string().max(300).optional(),
  interests: z
    .array(z.string())
    .min(3, 'Выберите от 3 до 10 интересов')
    .max(10, 'Максимум - 10 интересов'),

  work: z
    .object({
      place: z.string().max(50).optional(),
      position: z.string().max(25),
    })
    .optional(),
  graduate: z
    .object({
      place: z.string().max(50).optional(),
      speciality: z.string().max(25),
    })
    .optional(),

  contacts: z
    .object({
      instagram: z.string().optional(),
      telegram: z.string().optional(),
      twitter: z.string().optional(),
      vk: z.string().optional(),
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

export const alcoholValidator = zodValidator(Profile.shape.alcohol)
export const smokingValidator = zodValidator(Profile.shape.smoking)

export const personalityValidator = zodValidator(Profile.shape.personality)
