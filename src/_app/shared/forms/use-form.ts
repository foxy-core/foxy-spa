import { ValidationStatus, Validator } from '@@/domain/validation'
import { computed, reactive, ref, UnwrapNestedRefs } from 'vue'

type FormFieldOption<Obj, Val> = {
  initialValue?: Val
  validator?: Validator<Val, Obj>
}

type Form<Obj> = {
  [key in keyof Obj]: FormFieldOption<Obj, Obj[key]>
}

type FormOptions<Obj> = {
  onSubmitted?: (state: Obj) => Promise<void> | void
  fields: Form<Obj>
}

export const useForm = <T>({ onSubmitted, fields }: FormOptions<T>) => {
  const state = reactive<Partial<T>>({})
  const validationState = reactive<Record<string | number | symbol, boolean>>(
    {},
  )

  const isAllValid = computed(() =>
    Object.keys(fields).every(key => validationState[key]),
  )

  const isLoading = ref(false)
  const isFormSubmitted = ref(false)

  const submitForm = async () => {
    isFormSubmitted.value = true

    if (isAllValid.value) {
      isLoading.value = true
      // TODO: catch error here
      await onSubmitted?.(state as T)
      isLoading.value = false
    }
  }

  return {
    submitForm,
    isLoading,
    state: computed(() => state),
    inputs: Object.fromEntries(
      Object.entries(fields).map(entry => {
        const key = entry[0] as keyof T
        const { initialValue, validator } = entry[1] as FormFieldOption<
          T,
          T[keyof T]
        >

        if (initialValue) {
          state[key] = initialValue as UnwrapNestedRefs<Partial<T>>[keyof T]
        }

        const modelValue = computed(() => state[key])

        const onUpdate = (value: T[keyof T]) => {
          // @ts-ignore
          state[key] = value === '' ? undefined : value
        }

        const doValidate = computed(
          () =>
            isFormSubmitted.value ||
            (modelValue.value !== undefined &&
              modelValue.value !== null &&
              !isFormSubmitted.value),
        )

        const comp = computed(() => {
          const validated = validator?.(state[key] as T[keyof T], state as T)
          validationState[key] = validated
            ? validated.requirementSatisfied &&
              validated.validationStatus === ValidationStatus.Valid
            : true

          return {
            errorString: doValidate.value ? validated?.errorMessage : undefined,
            modelValue: modelValue.value,
            validationStatus: doValidate.value
              ? validated?.validationStatus
              : ValidationStatus.NotValidated,
            requirementNotSatisfied: doValidate.value
              ? !validated?.requirementSatisfied
              : false,
            'onUpdate:modelValue': onUpdate,
          }
        })

        return [key, comp]
      }),
    ),
  }
}
