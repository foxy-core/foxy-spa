<template>
  <div class="w-full flex flex-row space-x-2 overflow-hidden">
    <div
      v-for="{ tag, isHighlighted } in tags"
      :key="tag"
      class="py-1 px-3 rounded-full text-white whitespace-nowrap text-base"
      :class="isHighlighted ? 'bg-primary' : 'ring-inset ring-1 ring-white'"
    >
      {{ tag }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { CardTagVM } from '@@/domain/cards'

  defineProps<{
    tags: CardTagVM[]
  }>()
</script>
