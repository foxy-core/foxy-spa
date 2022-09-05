<template>
  <div class="flex flex-col w-full space-y-6">
    <p
      class="w-fit mx-auto transition-all duration-150 rounded-full text-center text-xs h-8 py-2 px-3 text-error-lighter"
      :class="
        errorString && 'bg-opaque-background backdrop-blur-md sticky top-20'
      "
    >
      <CustomTransition>
        <span v-if="errorString">{{ errorString }}</span>
      </CustomTransition>
    </p>
    <div
      class="ring-inset flex flex-row flex-wrap"
      v-for="(row, i) in options"
      :key="i"
    >
      <div
        class="flex-shrink-0 py-1.5 pr-2"
        v-for="{ displayValue, key } in row"
        :key="key"
        @click="onClick(key)"
      >
        <div
          class="px-4 py-1 rounded-full transition-all duration-100 ease-in-out select-none cursor-pointer"
          :class="
            modelValue.includes(key)
              ? 'ring-inset ring-[1.5px] ring-primary-lighter text-surface-800'
              : 'bg-surface-100 text-surface-600 media-hover:hover:bg-surface-50'
          "
        >
          {{ displayValue }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CustomTransition from './custom-transition.vue'
  export type PickerOption = {
    displayValue: string
    key: string
  }

  const props = defineProps<{
    options: PickerOption[][]
    modelValue: string[]
    errorString?: string
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', modelValue: string[]): void
  }>()

  const onClick = (key: string) => {
    if (props.modelValue.includes(key)) {
      emit(
        'update:modelValue',
        props.modelValue.filter(picked => picked !== key),
      )
    } else {
      emit('update:modelValue', [...props.modelValue, key])
    }
  }
</script>
