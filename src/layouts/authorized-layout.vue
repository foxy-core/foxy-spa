<template>
  <div
    data-test="default-layout"
    class="px-6 container mx-auto h-full w-full flex flex-col items-center"
  >
    <BaseHeader class="fixed top-0 left-0 z-50" />

    <main class="flex-1 w-full pt-24 lg:pt-64 pb-24 flex flex-col items-center">
      <slot />
    </main>

    <AuthorizedNavBar class="fixed bottom-0 left-0 right-0 z-50" />
  </div>
</template>
<script setup lang="ts">
  import BaseHeader from '@/containers/base/base-header.vue'
  import AuthorizedNavBar from '@/containers/base/authorized-nav-bar.vue'
</script>
