<template>
  <div
    data-test="default-layout"
    class="px-6 container mx-auto h-full w-full flex flex-col items-center"
  >
    <BaseHeader class="fixed top-0 left-0 z-40" />
    <AppNotifications class="w-full fixed top-0 left-0 right-0 z-50" />

    <main class="flex-1 w-full safe-margin-top flex flex-col items-center">
      <slot />
    </main>

    <BaseFooter class="mt-6 pb-2" />
  </div>
</template>

<script setup lang="ts">
  import BaseFooter from '@/containers/base/base-footer.vue'
  import BaseHeader from '@/containers/base/base-header.vue'
  import AppNotifications from '@/containers/notifications/app-notifications.vue'
</script>

<style scoped>
  .safe-margin-top {
    margin-top: calc(env(safe-area-inset-top, 0) + 6rem);
  }
</style>
