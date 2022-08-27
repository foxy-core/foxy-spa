<template>
  <TransitionGroup
    enter-active-class="absolute transform-gpu opacity-0 -translate-y-full"
    leave-active-class="absolute transform-gpu"
    leave-to-class="opacity-0 -translate-x-full"
    tag="aside"
    class="p-4 pb-0 space-y-3 max-w-md"
  >
    <BaseNotification
      class="transition-all duration-300"
      v-for="{ id, type, text, duration } in reversed"
      :key="id"
      :type="type"
      :text="text"
      :duration="duration"
      @close="store.removeNotification(id)"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
  import { useNotificationsStore } from '@@/stores/notifications'
  import BaseNotification from '@/components/ui/base-notification.vue'
  import { computed } from 'vue'

  const store = useNotificationsStore()

  const reversed = computed(() => [...store.notifications].reverse())
</script>
