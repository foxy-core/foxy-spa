import {
  ProfileWizardStep,
  ProfileWizardStepInterests,
  ProfileWizardStepName,
} from '@@/domain/profiles'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'

const LOCAL_STORAGE_KEY = 'foxy-profile-wizard'

export const useProfileWizardStore = defineStore(
  'profiles/profile-wizard',
  () => {
    const storage = useLocalStorage<
      Partial<{
        currentStep: ProfileWizardStep
        [ProfileWizardStep.Name]: Partial<ProfileWizardStepName>
        [ProfileWizardStep.Interests]: Partial<ProfileWizardStepInterests>
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
        [ProfileWizardStep.Name]: stepNameState.value,
        [ProfileWizardStep.Interests]: stepInterestsState.value,
      }
    }

    const emptyStorage = () => {
      storage.value = {}
    }

    const currentStep = ref<ProfileWizardStep>(
      storage.value.currentStep ?? ProfileWizardStep.Name,
    )

    // watch(() => currentStep.value, saveToLocalStorage)

    const stepNameState = ref<Partial<ProfileWizardStepName>>(
      storage.value[ProfileWizardStep.Name] ?? {},
    )

    const stepInterestsState = ref<Partial<ProfileWizardStepInterests>>(
      storage.value[ProfileWizardStep.Interests] ?? {
        interests: [],
      },
    )

    return {
      currentStep,
      saveToLocalStorage,
      emptyStorage,

      stepNameState,
      stepInterestsState,
    }
  },
)
