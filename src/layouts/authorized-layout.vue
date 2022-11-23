<template>
  <div
    data-test="default-layout"
    class="px-6 container mx-auto h-full w-full flex flex-col items-center"
  >
    <BaseHeader class="fixed top-0 left-0 z-40">
      <template #left>
        <RouterView name="headerLeft"></RouterView>
      </template>
    </BaseHeader>
    <AppNotifications class="w-full fixed top-0 left-0 right-0 z-50" />

    <main
      class="flex-1 w-full safe-margin-top pb-24 flex flex-col items-center"
    >
      <slot />
    </main>

    <AuthorizedNavBar
      class="fixed bottom-0 w-screen max-w-md left-1/2 -translate-x-1/2 z-50 nav-bar"
    />
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

  .safe-margin-top {
    margin-top: calc(env(safe-area-inset-top, 0) + 6rem);
  }
</style>
