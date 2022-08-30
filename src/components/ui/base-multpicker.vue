<template>
  <div class="flex flex-col w-full">
    <div
      class="ring-inset flex flex-row flex-wrap overflow-x-auto disable-scroll-bar snap-x py-1.5"
      v-for="(row, i) in options"
      :key="i"
    >
      <div
        class="flex-shrink-0 py-1 pr-2"
        v-for="{ displayValue, key } in row"
        :key="key"
        @click="onClick(key)"
      >
        <div
          class="px-4 py-1 rounded-full transition-all duration-100 ease-in-out select-none cursor-pointer"
          :class="
            modelValue.includes(key)
              ? 'ring-inset ring-[1.5px]  ring-secondary-lighter text-surface-800'
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
  export type PickerOption = {
    displayValue: string
    key: string
  }

  const props = defineProps<{
    options: PickerOption[][]
    modelValue: string[]
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
