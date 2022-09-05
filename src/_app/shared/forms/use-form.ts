import { computed, ComputedRef, ref, Ref } from 'vue'

import { ValidationStatus, Validator } from '@@/domain/validation'
import { executeOrGet } from '@@/shared/lang-utils'
import { exists } from '@@/shared/guards'

const V_MODEL_VALUE_PROP = 'modelValue'
const V_MODEL_EVENT_PROP = 'onUpdate:modelValue'

export const enum FormFieldType {
  Input = 'input',
  Multipicker = 'multipicker',
}

type FormFieldOptions<T, F extends FormFieldType, O = {}> = O & {
  type: F
  initialValue?: T | (() => T)
  validator?: Validator<T, any>
  /**
   * @default false
   */
  immediate?: boolean
}

type FormFieldBinding<T, B = {}> = B & {
  [V_MODEL_VALUE_PROP]: T
  [V_MODEL_EVENT_PROP]: (value: T) => unknown
  validationStatus: ValidationStatus
  errorString?: string
}

type WithRequirement<T = {}> = T & {
  requirementNotSatisfied: boolean
}

type FormInputFieldType = string
type FormInputFieldOptions = FormFieldOptions<
  FormInputFieldType,
  FormFieldType.Input
>
type FormInputFieldBinding = FormFieldBinding<
  FormInputFieldType,
  WithRequirement
>

type FormMultipickerFieldType = string[]
type FormMultipickerFieldOptions = FormFieldOptions<
  FormMultipickerFieldType,
  FormFieldType.Multipicker
>
type FormMultipickerFieldBinding = FormFieldBinding<FormMultipickerFieldType>

type FormFieldResultOptions<T extends FormFieldType> =
  T extends FormFieldType.Input
    ? FormInputFieldOptions
    : T extends FormFieldType.Multipicker
    ? FormMultipickerFieldOptions
    : never

type FormFieldResultBinding<T extends FormFieldType> =
  T extends FormFieldType.Input
    ? FormInputFieldBinding
    : T extends FormFieldType.Multipicker
    ? FormMultipickerFieldBinding
    : never

type InferFieldType<T> = [T] extends [
  {
    type: infer F
  },
]
  ? F
  : never

type InferFieldStateType<T> = [T] extends [
  {
    type: infer F
  },
]
  ? F extends FormFieldType.Input
    ? FormInputFieldType
    : F extends FormFieldType.Multipicker
    ? FormMultipickerFieldType
    : never
  : never

type ExtractFieldTypes<O extends UseFormFieldsOption> = {
  [key in keyof O]: InferFieldType<O[key]>
}

type ExtractFieldStateTypes<O extends UseFormFieldsOption> = {
  [key in keyof O]: InferFieldStateType<O[key]>
}

type UseFormFieldsOption = Record<string, FormFieldResultOptions<FormFieldType>>

type UseFormOptions<
  F extends UseFormFieldsOption,
  S extends ExtractFieldStateTypes<F>,
> = {
  onSubmitted?(state: S): Promise<void> | void
  fields: F
  state?: Ref<Partial<S>>
}

type UseFormResult<
  F extends UseFormFieldsOption,
  T extends ExtractFieldTypes<F>,
  S extends ExtractFieldStateTypes<F>,
> = {
  submitForm(): Promise<void>
  isLoading: ComputedRef<boolean>
  state: ComputedRef<S>
  bindings: {
    [key in keyof T]: ComputedRef<
      FormFieldResultBinding<T[key] extends FormFieldType ? T[key] : never>
    >
  }
}

type ValidObjectKeys = string | number | symbol

type ValidationState = Record<ValidObjectKeys, boolean>

export const useForm = <
  F extends UseFormFieldsOption,
  T extends ExtractFieldTypes<F> = ExtractFieldTypes<F>,
  S extends ExtractFieldStateTypes<F> = ExtractFieldStateTypes<F>,
>({
  onSubmitted,
  fields,
  state = ref({}),
}: UseFormOptions<F, S>): UseFormResult<F, T, S> => {
  const validationState = ref<ValidationState>({})
  const isAllValid = computed(() =>
    Object.keys(fields).every(key => validationState.value[key]),
  )

  const isLoading = ref(false)
  const isFormSubmitted = ref(false)

  const submitForm = async () => {
    isFormSubmitted.value = true

    if (isAllValid.value) {
      isLoading.value = true
      await onSubmitted?.(state.value as S)
      isLoading.value = false
    }
  }

  const bindings = Object.fromEntries(
    Object.entries(fields).map(entry => {
      const key = entry[0] as keyof F
      const { initialValue, validator, immediate, type } =
        entry[1] as F[keyof F]

      if (exists(initialValue)) {
        state.value[key] = executeOrGet(initialValue) as S[keyof S]
      }

      const modelValue = computed(() => state.value[key])

      const onUpdate = (value: S[keyof S]) => {
        state.value[key] = value === '' ? undefined : (value as S[keyof S])
      }

      const doValidate = computed(
        () =>
          isFormSubmitted.value ||
          (modelValue.value !== undefined &&
            modelValue.value !== null &&
            !isFormSubmitted.value),
      )

      const comp = computed(() => {
        const validated = validator?.(
          state.value[key] as S[keyof S],
          state.value as S,
        )
        validationState.value[key] = validated
          ? validated.requirementSatisfied &&
            validated.validationStatus === ValidationStatus.Valid
          : true

        const binding = {
          errorString: doValidate.value ? validated?.errorMessage : undefined,
          modelValue: modelValue.value,
          validationStatus:
            immediate || doValidate.value
              ? validated?.validationStatus
              : ValidationStatus.NotValidated,
          'onUpdate:modelValue': onUpdate,
          ...(type === FormFieldType.Input
            ? {
                requirementNotSatisfied: doValidate.value
                  ? !validated?.requirementSatisfied
                  : false,
              }
            : {}),
        }

        return binding
      })

      return [key, comp]
    }),
  )

  return {
    submitForm,
    isLoading: computed(() => isLoading.value),
    state: computed(() => state.value as S),
    // @ts-ignore
    bindings: bindings,
  }
}
