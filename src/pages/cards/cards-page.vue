<template>
  <CardsList />
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue'

  import CardsList from '@/containers/cards/cards-list.vue'

  onMounted(() => {
    document.querySelector('html')?.classList.add('overflow-hidden')
    document.querySelector('html')?.classList.add('fixed')
  })

  onUnmounted(() => {
    document.querySelector('html')?.classList.remove('overflow-hidden')
    document.querySelector('html')?.classList.remove('fixed')
  })
</script>
