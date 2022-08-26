<template>
  <div
    data-test="default-layout"
    class="px-6 container mx-auto h-full w-full flex flex-col items-center"
  >
    <BaseHeader class="fixed top-0 left-0 z-50" />

    <main
      class="flex-1 w-full mt-24 xs:mt-32 lg:mt-64 flex flex-col items-center"
    >
      <slot />
    </main>

    <BaseFooter class="mt-24 pb-8" />
  </div>
</template>

<script setup lang="ts">
  import BaseHeader from '@/containers/base/base-header.vue'
  import BaseFooter from '@/containers/base/base-footer.vue'
</script>
