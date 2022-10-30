<template>
  <BaseTypography class="text-center w-full">
    <img
      class="mx-auto"
      width="128"
      height="128"
      src="@/assets/png/vk-fox-128.png"
    />
    <h1>Ожидайте</h1>
    <p class="animate-pulse">Авторизуем вас через VK...</p>
  </BaseTypography>
</template>

<script setup lang="ts">
  import BaseTypography from '@/components/ui/base-typography.vue'
  import { useAuthViaVk } from '@@/use-cases/auth'

  const authViaVk = useAuthViaVk()

  authViaVk()
</script>
