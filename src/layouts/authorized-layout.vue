<template>
  <div
    data-test="default-layout"
    class="px-6 container mx-auto h-full w-full flex flex-col items-center"
  >
    <BaseHeader class="fixed top-0 left-0 z-40" />
    <AppNotifications class="w-full fixed top-0 left-0 right-0 z-50" />

    <main class="flex-1 w-full mt-24 pb-24 flex flex-col items-center">
      <slot />
    </main>

    <AuthorizedNavBar
      class="fixed bottom-0 w-screen max-w-md left-1/2 -translate-x-1/2 z-50 nav-bar"
    />
  </div>
</template>

<script setup lang="ts">
  import BaseHeader from '@/containers/base/base-header.vue'
  import AuthorizedNavBar from '@/containers/base/authorized-nav-bar.vue'
  import AppNotifications from '@/containers/notifications/app-notifications.vue'
</script>

<style scoped>
  .nav-bar {
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>
