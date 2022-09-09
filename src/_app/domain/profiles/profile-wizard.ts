import { Profile } from './profile.model'

export const enum ProfileWizardStep {
  NameAge,
  // LookingFor,
  // MaritalStatus,
  SmokingDrinking,
  Personality,
  // Parameters,
  Interests,
  // About,
  // WorkGraduate,
  // Contacts,
  Congratulations,
}

export type ProfileWizardStepName = Pick<Profile, 'name'>
export type ProfileWizardStepInterests = Pick<Profile, 'interests'>
export type ProfileWizardStepSmokingDrinking = Pick<
  Profile,
  'smoking' | 'alcohol'
>
