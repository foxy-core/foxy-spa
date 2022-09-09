import {
  ProfileWizardStep,
  ProfileWizardStepInterests,
  ProfileWizardStepName,
  ProfileWizardStepPersonality,
  ProfileWizardStepSmokingDrinking,
} from '@@/domain/profiles'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const LOCAL_STORAGE_KEY = 'foxy-profile-wizard'

export const useProfileWizardStore = defineStore(
  'profiles/profile-wizard',
  () => {
    const storage = useLocalStorage<
      Partial<{
        currentStep: ProfileWizardStep
        [ProfileWizardStep.NameAge]: Partial<ProfileWizardStepName>
        [ProfileWizardStep.SmokingDrinking]: Partial<ProfileWizardStepSmokingDrinking>
        [ProfileWizardStep.Interests]: Partial<ProfileWizardStepInterests>
        [ProfileWizardStep.Personality]: Partial<ProfileWizardStepPersonality>
      }>
    >(
      LOCAL_STORAGE_KEY,
      {},
      {
        shallow: true,
        deep: false,
      },
    )

    const saveToLocalStorage = () => {
      storage.value = {
        currentStep: currentStep.value,
        [ProfileWizardStep.NameAge]: stepNameState.value,
        [ProfileWizardStep.Interests]: stepInterestsState.value,
        [ProfileWizardStep.SmokingDrinking]: stepSmokingDrinkingState.value,
        [ProfileWizardStep.Personality]: stepPersonalityState.value,
      }
    }

    const emptyStorage = () => {
      storage.value = {}
    }

    const currentStep = ref<ProfileWizardStep>(
      storage.value.currentStep ?? ProfileWizardStep.NameAge,
    )

    const stepNameState = ref<Partial<ProfileWizardStepName>>(
      storage.value[ProfileWizardStep.NameAge] ?? {},
    )

    const stepSmokingDrinkingState = ref<
      Partial<ProfileWizardStepSmokingDrinking>
    >(storage.value[ProfileWizardStep.SmokingDrinking] ?? {})

    const stepInterestsState = ref<Partial<ProfileWizardStepInterests>>(
      storage.value[ProfileWizardStep.Interests] ?? {
        interests: [],
      },
    )

    const stepPersonalityState = ref<Partial<ProfileWizardStepPersonality>>(
      storage.value[ProfileWizardStep.Personality] ?? {},
    )

    return {
      currentStep,
      saveToLocalStorage,
      emptyStorage,

      stepNameState,
      stepInterestsState,
      stepSmokingDrinkingState,
      stepPersonalityState,
    }
  },
)
