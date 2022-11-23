<template>
  <header
    class="text-center header pb-2 bg-opaque-background w-full h-fit backdrop-blur-md"
  >
    <div v-if="$slots.left" class="absolute left-4 top-3">
      <slot name="left"></slot>
    </div>
    <FoxyMainLogo height="32" class="inline text-surface-900" />
  </header>
</template>

<script setup lang="ts">
  import FoxyMainLogo from '@/assets/svg/foxy-main-logo.svg?component'
</script>
<style scoped>
  .header {
    padding-top: calc(env(safe-area-inset-top, 0) + 1.5rem);
  }

  /* detecting iOS and standalone app */
  @supports (-webkit-touch-callout: none) {
    @media all and (display-mode: standalone) {
      .header {
        @apply bg-gradient-to-b from-surface-500 dark:from-opaque-background via-opaque-background to-opaque-background;
      }
    }
  }
</style>
