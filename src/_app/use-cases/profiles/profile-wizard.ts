import { computed, toRef } from 'vue'

import {
  ageValidator,
  interestsValidator,
  nameValidator,
  ProfileWizardStep,
} from '@@/domain/profiles'
import { FormFieldType, useForm } from '@@/shared/forms'
import { PickerOption } from '@@/shared/ui-utils'
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

  const interestsOptions = computed<PickerOption[][]>(() =>
    enums.value
      ? Object.values(
          Object.entries(enums.value.Interests)
            .map(([key, { category, value: displayValue }]) => ({
              key,
              category,
              displayValue,
            }))
            .reduce((acc, { key, category, displayValue }) => {
              acc[category] = acc[category]
                ? [...acc[category], { key, displayValue }]
                : [{ key, displayValue }]
              return acc
            }, {} as Record<string, PickerOption[]>),
        )
      : [],
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

  return {
    stepNameForm,
    stepInterestsForm,
    interestsOptions,
    previousStep,
    currentStep,
  }
}
