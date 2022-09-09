<template>
  <div :class="multipickerStyles.container">
    <div :class="multipickerStyles.errorContainer">
      <CustomTransition type="bottom">
        <p v-if="errorString" :class="multipickerStyles.errorString">
          {{ errorString }}
        </p>
      </CustomTransition>
    </div>
    <div :class="multipickerStyles.row" v-for="(row, i) in options" :key="i">
      <div
        :class="multipickerStyles.cellWrapper"
        v-for="{ displayValue, key } in row"
        :key="key"
        @click="onClick(key)"
      >
        <div
          :class="
            multipickerStyles.cell(
              animatedKeys.includes(key),
              modelValue.includes(key),
            )
          "
        >
          {{ displayValue }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { PickerOption } from '@@/shared/ui-utils'
  import { nextTick } from 'vue'
  import { useAnimatedKeys } from '@@/shared/ui-utils'
  import CustomTransition from './custom-transition.vue'
  import { multipickerStyles } from './shared-styles'

  const props = defineProps<{
    options: PickerOption[][]
    modelValue: string[]
    errorString?: string
    exceeded?: boolean
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', modelValue: string[]): void
  }>()

  const { animatedKeys, animate } = useAnimatedKeys(500)

  const onClick = (key: string) => {
    if (props.modelValue.includes(key)) {
      emit(
        'update:modelValue',
        props.modelValue.filter(picked => picked !== key),
      )
    } else {
      emit('update:modelValue', [...props.modelValue, key])
    }

    nextTick(() => {
      if (props.exceeded) {
        animate(key)
      }
    })
  }
</script>
