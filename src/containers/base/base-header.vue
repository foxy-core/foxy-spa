<template>
  <header
    class="text-center pt-6 pb-2 bg-opaque-background w-full h-fit backdrop-blur-md"
  >
    <div v-if="$slots.left" class="absolute left-4 top-3">
      <slot name="left"></slot>
    </div>
    <FoxyMainLogo height="32" class="inline text-surface-900" />
  </header>
</template>

<script setup lang="ts">
  import FoxyMainLogo from '@/assets/svg/foxy-main-logo.svg'
</script>
