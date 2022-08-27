<template>
  <div
    class="bg-white bg-opacity-50 shadow-md backdrop-blur-md text-sm py-2 px-3 rounded-md relative overflow-hidden flex flex-row space-x-3"
  >
    <div
      v-if="icon"
      class="place-self-center"
      :class="{
        'text-green-400': type === 'success',
        'text-red-400': type === 'error',
        'text-amber-400': type === 'warning',
        'text-sky-400': type === 'info',
      }"
    >
      <component :is="icon" class="w-6 h-6" />
    </div>
    <p class="text-zinc-700 flex-1 place-self-center">{{ text }}</p>
    <div
      class="cursor-pointer w-5 h-5 text-zinc-400 hover:text-zinc-600 transition-colors duration-150"
      role="button"
      @click="close"
    >
      <CloseIcon class="w-5 h-5" />
    </div>

    <div
      class="absolute top-0 -left-3 h-0.5 w-full"
      :style="{ transition: `width ${duration}ms linear` }"
      :class="{
        'bg-green-400': type === 'success',
        'bg-red-400': type === 'error',
        'bg-amber-400': type === 'warning',
        'bg-sky-400': type === 'info',
        '!w-0': startCounter,
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'

  import CloseIcon from '~icons/heroicons-outline/x'
  import ExclamationIcon from '~icons/heroicons-outline/exclamation'
  import CheckIcon from '~icons/heroicons-outline/check'

  const props = defineProps<{
    duration: number
    text: string
    type: 'error' | 'success' | 'info' | 'warning'
  }>()

  const emit = defineEmits<{
    (event: 'close'): void
  }>()

  const close = () => emit('close')

  const icon = computed(() => {
    switch (props.type) {
      case 'success': {
        return CheckIcon
      }
      case 'error': {
        return ExclamationIcon
      }
      case 'warning': {
        return ExclamationIcon
      }
      case 'info': {
        return null
      }
    }
  })

  const startCounter = ref(false)

  onMounted(() => {
    setTimeout(() => (startCounter.value = true), 0)
  })
</script>
