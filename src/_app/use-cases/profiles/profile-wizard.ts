
import { computed, toRef } from 'vue'

import {
  ageValidator,
  alcoholValidator,
  interestsValidator,
  nameValidator,
  personalityValidator,
  ProfileWizardStep,
  smokingValidator,
} from '@@/domain/profiles'
import { FormFieldType, useForm } from '@@/shared/forms'
import {
  categorizedEnumToPickerOptions,
  enumToPickerOptions,
} from '@@/shared/ui-utils'
import { useProfileWizardStore } from '@@/stores/profiles'
import { useEnums } from '@@/use-cases/layout'

export const useProfileWizard = () => {
  const store = useProfileWizardStore()
  const { enums } = useEnums()

  const currentStep = computed(() => store.currentStep)

  const nextStep = () => {
    store.currentStep++
    if (currentStep.value < ProfileWizardStep.Congratulations) {
      store.saveToLocalStorage()
    } else {
      store.emptyStorage()
    }
  }
  const previousStep = () => store.currentStep--

  const stepNameForm = useForm({
    onSubmitted() {
      nextStep()
    },
    state: toRef(store, 'stepNameState'),
    fields: {
      name: {
        validator: nameValidator,
        type: FormFieldType.Input,
      },
      age: {
        validator: ageValidator,
        type: FormFieldType.InputNumber,
        initialValue: 18,
      },
    },
  })

  const interestsOptions = computed(() =>
    enums.value ? categorizedEnumToPickerOptions(enums.value.Interests) : [],
  )

  const stepSmokingDrinkingForm = useForm({
    onSubmitted() {
      nextStep()
    },
    state: toRef(store, 'stepSmokingDrinkingState'),
    fields: {
      smoking: {
        type: FormFieldType.Picker,
        validator: smokingValidator,
      },
      alcohol: {
        type: FormFieldType.Picker,
        validator: alcoholValidator,
      },
    },
  })

  const frequencyOptions = computed(() =>
    enums.value ? enumToPickerOptions(enums.value.Frequency) : [],
  )

  const stepInterestsForm = useForm({
    onSubmitted() {
      nextStep()
    },
    state: toRef(store, 'stepInterestsState'),
    fields: {
      interests: {
        validator: interestsValidator,
        type: FormFieldType.Multipicker,
      },
    },
  })

  const personalityOptions = computed(() =>
    enums.value ? enumToPickerOptions(enums.value.Personality) : [],
  )

  const stepPersonalityForm = useForm({
    onSubmitted() {
      nextStep()
    },
    state: toRef(store, 'stepPersonalityState'),
    fields: {
      personality: {
        type: FormFieldType.Picker,
        validator: personalityValidator,
      },
    },
  })

  return {
    stepNameForm,
    stepSmokingDrinkingForm,
    stepInterestsForm,
    stepPersonalityForm,

    interestsOptions,
    frequencyOptions,
    personalityOptions,

    previousStep,
    currentStep,
  }
}
