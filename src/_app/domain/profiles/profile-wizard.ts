import { Profile } from './profile.model'

export const enum ProfileWizardStep {
  NameAge,
  // Parameters,
  //   LookingFor,
  //   MaritalStatus,
  //   SmokingDrinking,
  //   Personality,
  Interests,
  //   About,
  //   WorkGraduate,
  //   Contacts,
  Congratulations,
}

export type ProfileWizardStepName = Pick<Profile, 'name'>
export type ProfileWizardStepInterests = Pick<Profile, 'interests'>
