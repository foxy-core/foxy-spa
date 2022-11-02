<template>
  <div
    data-test="default-layout"
    class="container mx-auto h-full w-full flex flex-col items-center justify-between"
  >
    <BaseHeader class="z-30">
      <template #left>
        <RouterView name="headerLeft"></RouterView>
      </template>
    </BaseHeader>
    <AppNotifications class="w-full fixed top-0 left-0 right-0 z-40" />

    <slot />

    <AuthorizedNavBar class="w-full max-w-md z-30 nav-bar" />
  </div>
</template>

<script setup lang="ts">
  import AuthorizedNavBar from '@/containers/base/authorized-nav-bar.vue'
  import BaseHeader from '@/containers/base/base-header.vue'
  import AppNotifications from '@/containers/notifications/app-notifications.vue'
</script>

<style scoped>
  .nav-bar {
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>
