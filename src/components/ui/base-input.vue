<template>
  <div class="relative h-12">
    <input
      class="peer h-12 text-surface-800 w-full appearance-none rounded-lg ring-1 bg-surface-50 px-4 transition-colors duration-100 placeholder:invisible placeholder:opacity-0 hover:bg-surface-100 focus:bg-surface-100 focus:outline-none"
      :id="id"
      :placeholder="label || 'Input'"
      :value="modelValue"
      :autocomplete="autocomplete"
      @input="onInput"
      :type="type"
      :class="[
        {
          'ring-surface-100':
            !validationStatus ||
            validationStatus === ValidationStatus.NotValidated,
          'ring-error-lightest dark:ring-error-lighter':
            validationStatus === ValidationStatus.Invalid,
          'ring-success-lightest dark:ring-success-lighter':
            validationStatus === ValidationStatus.Valid,
        },
        !!label ? 'pt-[1.125rem] pb-1' : 'py-3',
      ]"
    />
    <label
      v-if="label"
      class="pointer-events-none absolute top-1.5 left-4 select-none w-full text-xs text-surface-400 transition-all duration-100 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs"
      :for="id"
    >
      <CustomTransition>
        <span
          v-if="errorString"
          class="absolute top-0 left-0 text-error-lighter font-light"
          >{{ errorString }}</span
        >
        <span v-else class="absolute top-0 left-0">
          {{ label }}
        </span>
      </CustomTransition>
    </label>

    <CustomTransition>
      <ExclamationIcon
        v-if="requirementNotSatisfied"
        class="absolute w-6 h-6 text-error-lighter right-5 top-3"
        title="This field is required"
      />
    </CustomTransition>
  </div>
</template>

<script setup lang="ts">
  import ExclamationIcon from '~icons/heroicons-outline/exclamation'
  import CustomTransition from '@/components/ui/custom-transition.vue'

  import { ValidationStatus } from '@@/domain/validation'

  defineProps<{
    label?: string
    modelValue?: string
    id?: string
    type?: string
    errorString?: string
    validationStatus?: ValidationStatus
    requirementNotSatisfied?: boolean
    autocomplete?: string
  }>()

  const emit = defineEmits<{
    (name: 'update:modelValue', newValue: string): void
  }>()

  const onInput = (event: Event) =>
    emit('update:modelValue', (event.target as HTMLInputElement)?.value)
</script>
