<template>
  <div :class="inputStyles.container">
    <input
      :id="id"
      :placeholder="label || 'Input'"
      :value="modelValue"
      :autocomplete="autocomplete"
      @input="onInput"
      :type="type"
      :class="inputStyles.inputElement(!!label, validationStatus)"
    />
    <label v-if="label" :class="inputStyles.labelElement" :for="id">
      <CustomTransition>
        <span v-if="errorString" :class="inputStyles.errorLabel">{{
          errorString
        }}</span>
        <span v-else :class="inputStyles.defaultLabel">
          {{ label }}
        </span>
      </CustomTransition>
    </label>

    <CustomTransition>
      <ExclamationIcon
        v-if="requirementNotSatisfied"
        :class="inputStyles.errorIcon"
        title="This field is required"
      />
    </CustomTransition>
  </div>
</template>

<script setup lang="ts">
  import ExclamationIcon from '~icons/heroicons-outline/exclamation'
  import CustomTransition from '@/components/ui/custom-transition.vue'

  import { ValidationStatus } from '@@/domain/validation'
  import { inputStyles } from './shared-styles'

  defineProps<{
    label?: string
    modelValue?: string
    id?: string
    type?: string
    errorString?: string
    validationStatus?: ValidationStatus
    requirementNotSatisfied?: boolean
    autocomplete?: string
    exceeded?: boolean
  }>()

  const emit = defineEmits<{
    (name: 'update:modelValue', newValue: string): void
  }>()

  const onInput = (event: Event) =>
    emit('update:modelValue', (event.target as HTMLInputElement)?.value)
</script>
