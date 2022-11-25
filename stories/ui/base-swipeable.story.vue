<template>
  <Story title="BaseSwipeable">
    <div
      class="flex w-full max-w-sm h-screen justify-center items-center overflow-hidden"
    >
      <BaseSwipeable
        :key="key"
        class="w-[90%] aspect-[9/16] rounded-3xl shadow-xl overflow-hidden"
        @swipe="onSwipe"
      >
        <template #on-left>
          <FluentHeartBroken24Filled class="icon" />
        </template>
        <template #on-right>
          <FluentHeart24Filled class="icon" />
        </template>

        <template #default>
          <div
            class="w-full h-full bg-slate-600 rounded-3xl overflow-hidden touch-manipulation select-none touch-callout-none"
          >
            <img
              class="w-full h-full object-cover select-none touch-manipulation"
              :draggable="false"
              src="https://picsum.photos/720/1280"
            />
          </div>
        </template>
      </BaseSwipeable>
    </div>
  </Story>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import BaseSwipeable from '@/components/ui/base-swipeable.vue'

  import FluentHeart24Filled from '~icons/fluent/heart-24-filled'
  import FluentHeartBroken24Filled from '~icons/fluent/heart-broken-24-filled'

  const key = ref(0)

  const reset = () => key.value++

  const onSwipe = (direction: 'left' | 'right') => {
    console.log('swiped', direction)
    setTimeout(reset, 500)
  }
</script>

<style scoped>
  .icon {
    @apply text-red-500/80 w-28 h-28;
  }
</style>
