<template>
  <div :class="inputNumberStyles.container">
    <input
      :id="id"
      :placeholder="label || 'Input'"
      :value="modelValue"
      :autocomplete="autocomplete"
      @input="onInput"
      type="number"
      :class="inputNumberStyles.inputElement(!!label, validationStatus)"
    />
    <label v-if="label" :class="inputNumberStyles.labelElement" :for="id">
      <CustomTransition>
        <span v-if="errorString" :class="inputNumberStyles.errorLabel">{{
          errorString
        }}</span>
        <span v-else :class="inputNumberStyles.defaultLabel">
          {{ label }}
        </span>
      </CustomTransition>
    </label>

    <CustomTransition>
      <ExclamationIcon
        v-if="requirementNotSatisfied"
        :class="inputNumberStyles.errorIcon"
        title="This field is required"
      />
    </CustomTransition>

    <div :class="inputNumberStyles.controlsContainer">
      <MinusIcon
        :class="
          inputNumberStyles.controlsIcon(
            animatedKeys.includes(AnimatedKey.Decrement),
          )
        "
        @click="decrement"
        ref="decrementElement"
      />
      <PlusIcon
        :class="
          inputNumberStyles.controlsIcon(
            animatedKeys.includes(AnimatedKey.Increment),
          )
        "
        @click="increment"
        ref="incrementElement"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, ref } from 'vue'
  import CustomTransition from '@/components/ui/custom-transition.vue'

  import ExclamationIcon from '~icons/heroicons-outline/exclamation'
  import PlusIcon from '~icons/heroicons-outline/plus'
  import MinusIcon from '~icons/heroicons-outline/minus'

  import { useAnimatedKeys } from '@@/shared/ui-utils'
  import { ValidationStatus } from '@@/domain/validation'

  import { inputNumberStyles } from './shared-styles'

  const enum AnimatedKey {
    Increment = 'increment',
    Decrement = 'decrement',
  }

  const props = defineProps<{
    label?: string
    modelValue?: number
    id?: string
    type?: string
    errorString?: string
    validationStatus?: ValidationStatus
    requirementNotSatisfied?: boolean
    autocomplete?: string
    exceeded?: boolean
  }>()

  const decrementElement = ref<HTMLElement>()
  const incrementElement = ref<HTMLElement>()

  const emit = defineEmits<{
    (name: 'update:modelValue', newValue: number, manuallyTyped?: boolean): void
  }>()

  const { animatedKeys, animate } = useAnimatedKeys(500)

  const update = (value: number, key?: AnimatedKey) => {
    emit('update:modelValue', value, !key)

    if (key) {
      nextTick(() => {
        if (props.exceeded) {
          animate(key)
        }
      })
    }
  }

  const onInput = (event: Event) =>
    update(Number((event.target as HTMLInputElement)?.value))

  const increment = () =>
    update((props.modelValue ?? 0) + 1, AnimatedKey.Increment)
  const decrement = () =>
    update((props.modelValue ?? 0) - 1, AnimatedKey.Decrement)
</script>

<style scoped>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
</style>
