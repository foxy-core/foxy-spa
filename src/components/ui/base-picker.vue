<template>
  <div :class="multipickerStyles.container">
    <div :class="multipickerStyles.row">
      <div
        :class="multipickerStyles.cellWrapper"
        v-for="{ displayValue, key } in options"
        :key="key"
        @click="onClick(key)"
      >
        <div :class="multipickerStyles.cell(false, modelValue === key)">
          {{ displayValue }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { PickerOption } from '@@/shared/ui-utils'
  import { multipickerStyles } from './shared-styles'

  const props = defineProps<{
    options: PickerOption[]
    modelValue: string
    requirementNotSatisfied?: boolean
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', modelValue?: string): void
  }>()

  const onClick = (key: string) => {
    if (props.modelValue !== key) {
      emit('update:modelValue', key)
    } else {
      emit('update:modelValue', undefined)
    }
  }
</script>
